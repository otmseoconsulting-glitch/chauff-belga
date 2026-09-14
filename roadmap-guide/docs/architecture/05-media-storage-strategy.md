# 05 — Media, Image & Video Storage Strategy
# Asset Delivery Architecture, Sanity Pipeline, Supabase Storage & YouTube Embeds
# Project: Chauffagiste-Belga

---

## §1. Executive Summary & Media Matrix

To sustain sub-second mobile page loads (LCP < 2.0s, CLS = 0.000) while presenting rich visual social proof and educational content, all media assets are partitioned into four distinct tiers:

| Media Tier | Content Types | Primary Storage & CDN | Delivery / Optimization Pattern | Cache / Security Policy |
|------------|---------------|----------------------|--------------------------------|-------------------------|
| **1. Static UI & pSEO** | Logos, Hero technician photos, trust badges (Cerga, PEB), boilerplate UI icons | Local `/public/images/` via Netlify Global Edge CDN | Next.js `<Image>` component (`next/image`) with WebP/AVIF auto-formatting | Immutable cache (`max-age=31536000, immutable`) |
| **2. Editorial & Blog** | Blog post banners, technical diagnostic diagrams, author avatars, FAQ illustrations | Sanity Asset Pipeline (`cdn.sanity.io`) | `@sanity/image-url` builder with focal-point hotspot cropping & responsive `srcset` | Global Cloudflare CDN via Sanity SLA |
| **3. Customer Attachments** | Boiler nameplate photos, error code screenshots, leak snapshots sent via quote/chat | Supabase Storage bucket (`lead-attachments`) | Private storage bucket accessed via short-lived signed URLs (15-min expiry) | RLS policies: Anon upload with strict MIME & 5MB cap, Admin/Service Role read |
| **4. Videos** | Explainer guides, boiler maintenance tutorials, heating subsidy walkthroughs | **YouTube Embedded** | Lite facade pattern (`@next/third-parties/google` or `lite-youtube-embed`) | Zero initial JavaScript overhead; iframe fetched only upon user interaction |

---

## §2. Tier 1: Static UI & pSEO Assets (Netlify Edge CDN)

### 2.1 File Organization & Formats

All recurring UI assets reside in the Next.js `public/` directory:

```
public/
├── images/
│   ├── hero/
│   │   ├── hero-technicien-belga.webp     (1200x900, source for LCP hero)
│   │   └── hero-depannage-mobile.webp     (750x560)
│   ├── badges/
│   │   ├── cerga-gaz-agree.svg            (Vector SVG)
│   │   ├── peb-wallonie-bruxelles.svg     (Vector SVG)
│   │   └── qualifio-artisan.svg           (Vector SVG)
│   ├── brands/                            (Boiler manufacturer logos)
│   │   ├── vaillant.svg
│   │   ├── bulex.svg
│   │   ├── viessmann.svg
│   │   └── junkers-bosch.svg
│   └── og/
│       └── og-default-chauffagiste.jpg    (1200x630, OpenGraph social card)
```

### 2.2 Next.js `<Image>` Implementation Rules

Every image rendered from `/public` must strictly follow Core Web Vitals constraints:

```typescript
// components/ui/SafeImage.tsx
import Image from 'next/image'

interface HeroProps {
  cityName: string
}

export function HeroImage({ cityName }: HeroProps) {
  return (
    <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl bg-slate-100 shadow-xl">
      <Image
        src="/images/hero/hero-technicien-belga.webp"
        alt={`Chauffagiste certifié intervenant à ${cityName} pour dépannage chaudière`}
        fill
        priority // CRITICAL: Preloads image above the fold (LCP candidate)
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
        className="object-cover"
      />
    </div>
  )
}
```

---

## §3. Tier 2: Editorial & Blog Images (Sanity Asset CDN)

### 3.1 Next.js Configuration (`next.config.mjs`)

To allow Next.js image optimization on Sanity-hosted assets, the Sanity CDN domain must be registered:

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
      },
    ],
  },
}

export default nextConfig
```

### 3.2 Sanity Image Builder Utility

```typescript
// lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
```

---

## §4. Tier 3: Customer Lead Attachments (Supabase Storage)

Homeowners requesting emergency repair or quotes often upload photos of:
- The boiler data plate (containing exact model, serial number, and year).
- The current pressure manometer or digital error code (`F28`, `F22`).
- The leaking valve or pipe connection.

### 4.1 Bucket Specification

- **Bucket Name**: `lead-attachments`
- **Visibility**: **Private** (Not publicly crawlable)
- **Max File Size**: 5 MB per file
- **Allowed MIME Types**: `image/jpeg`, `image/png`, `image/webp`, `image/heic`

### 4.2 Supabase Storage RLS & Upload Pattern

```typescript
// lib/supabase/storage.ts
import { createServerClient } from '@/lib/supabase/server'

export async function uploadLeadAttachment(file: File, leadId: string): Promise<string | null> {
  const supabase = createServerClient()
  const fileExt = file.name.split('.').pop()
  const filePath = `leads/${leadId}/${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('lead-attachments')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    console.error('Storage upload error:', uploadError)
    return null
  }

  // Generate short-lived signed URL for dispatcher email notification
  const { data: signedUrlData } = await supabase.storage
    .from('lead-attachments')
    .createSignedUrl(filePath, 60 * 60 * 24) // 24 hours validity

  return signedUrlData?.signedUrl ?? null
}
```

---

## §5. Tier 4: Video Strategy (YouTube Embedded Facade)

### 5.1 Why No Native Video Hosting?
- Video binaries (`.mp4`, `.mov`) bloat the Git repository and consume server bandwidth.
- Raw `<video>` tags create high layout shifts (CLS) and stall network queues on mobile devices.
- Hosting on YouTube provides **secondary organic search visibility** on YouTube search and Google Video SERP carousels.

### 5.2 Lightweight Facade Pattern (Zero CWV Penalty)

Instead of loading the heavy standard YouTube `<iframe>` (which injects ~1.2 MB of scripts and stylesheets on page load), we render a lightweight static thumbnail facade. The actual iframe is loaded only when the user explicitly clicks the play button:

```typescript
// components/media/YouTubeEmbed.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

interface YouTubeEmbedProps {
  videoId: string
  title: string
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    )
  }

  return (
    <div 
      onClick={() => setIsPlaying(true)}
      className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-900 shadow-lg"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 700px, 800px"
        className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
        <button
          aria-label={`Lire la vidéo : ${title}`}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition group-hover:scale-110 group-hover:bg-red-700"
        >
          <Play className="h-8 w-8 fill-white ml-1" />
        </button>
      </div>
    </div>
  )
}
```

---

## §6. Pre-Deployment Media Verification Checklist

- [ ] All UI icons are inline SVGs or Lucide React components (0 HTTP requests).
- [ ] No image in `/public/images/` exceeds 250 KB.
- [ ] Hero image has `priority={true}` and explicit `sizes` attribute.
- [ ] `next.config.mjs` has `cdn.sanity.io` whitelisted in `remotePatterns`.
- [ ] Videos are strictly embedded via the YouTube facade component with `youtube-nocookie.com`.
- [ ] Supabase Storage bucket `lead-attachments` has RLS enabled with 5 MB file size limit.
