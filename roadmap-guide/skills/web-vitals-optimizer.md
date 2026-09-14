# Skill: Core Web Vitals & Performance Optimizer
# Mobile-First Lighthouse ≥ 92 Optimization Rules
# Project: Chauffagiste-Belga

---

## Purpose

Enforce strict engineering standards to ensure all ~337 landing pages load in under 1.2s on mobile 4G networks, pass Google Core Web Vitals assessment (LCP < 2.0s, CLS = 0, INP < 100ms), and achieve Lighthouse Mobile score ≥ 92.

---

## 1. Largest Contentful Paint (LCP < 2.0s)

The Hero section on commune pages contains the LCP candidate (usually the technician badge or hero image):

```typescript
// components/geo/HeroImage.tsx
import Image from 'next/image'

interface HeroImageProps {
  alt: string
  cityName: string
}

export function HeroImage({ alt, cityName }: HeroImageProps) {
  return (
    <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl shadow-xl bg-slate-100">
      <Image
        src="/images/hero-technicien-belga.webp"
        alt={`${alt} intervenant à ${cityName}`}
        fill
        priority // CRITICAL: Tells browser to fetch this image immediately
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  )
}
```

---

## 2. Cumulative Layout Shift (CLS = 0.000)

Layout shifts destroy mobile conversions and trigger SEO penalties:

1. **Explicit Dimensions on All Dynamic Content**: Never insert content dynamically above the fold without a pre-reserved bounding box skeleton.
2. **Font Loading Strategy**: Use `next/font` with fallback metrics to eliminate FOIT/FOUT.

```typescript
// app/layout.tsx
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/globals.css'

const fontHeading = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
})

const fontBody = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}
```

---

## 3. Interaction to Next Paint (INP < 100ms)

1. **Server Components Default**: Zero megabytes of unneeded React component hydrates.
2. **Third-Party Script Isolation**: Load Google Analytics / Tag Manager via `@next/third-parties` after interactive.

```typescript
// app/layout.tsx
import { GoogleTagManager } from '@next/third-parties/google'

// Loaded lazily after critical hydration
<GoogleTagManager gtmId="GTM-XXXXXXX" />
```

---

## 4. Pre-Commit Performance Checklist

- [ ] Hero image has `priority` prop and explicit `sizes` attribute.
- [ ] No layout shift on sticky mobile emergency bar (`h-[64px]` reserved padding at bottom of `<body>`).
- [ ] Tailwind CSS v4 utilizes modern `@theme` utilities without unused CSS overhead.
- [ ] Zero un-tree-shaken icon libraries (use Lucide React with direct named imports).
