# 01 — Next.js App Router Rules
# RSC Architecture, Routing, Server Actions & Performance
# Project: Chauffagiste-Belga

---

## §1. React Server Components (RSC) Policy

### 1.1 Default: Everything is a Server Component

All components are RSC by default. A component MUST only become a Client Component (`'use client'`) when it requires:

- `useState` or `useReducer`
- `useEffect` or `useLayoutEffect`
- Browser-only APIs (`window`, `document`, `navigator`)
- Event handlers that cannot be Server Actions
- Third-party client-only libraries (maps, sliders, analytics)

### 1.2 pSEO Route RSC Requirements

All pSEO landing pages (`/chauffagiste-[commune]`) MUST:
- Be **pure RSC** with zero client JS in their primary rendering path
- Fetch data exclusively via RSC using the Supabase server client
- Use `<Suspense>` boundaries for any async sub-components
- Generate static params for all known communes at build time
- Operate strictly at flat root URLs (`/chauffagiste-[commune]`)

```typescript
// app/chauffagiste-[commune]/page.tsx — MANDATORY PATTERN

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCommuneBySlug, getAllCommuneSlugs } from '@/lib/supabase/geo'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ContactSection } from '@/components/sections/ContactSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateHVACSchema } from '@/lib/seo/schema'
import type { PageProps } from '@/types/next'

// Static generation for ~337 communes
export async function generateStaticParams() {
  const slugs = await getAllCommuneSlugs() // { slugFr: string }[]
  return slugs.map((c) => ({
    commune: c.slugFr,
  }))
}

// Dynamic metadata per commune (100% French)
export async function generateMetadata(
  { params }: PageProps<{ commune: string }>
): Promise<Metadata> {
  const commune = await getCommuneBySlug(params.commune)
  if (!commune) return {}

  const title = `Chauffagiste ${commune.nameFr} | Dépannage ≤24h — Chauffagiste-Belga`
  const description = `Chauffagiste agréé à ${commune.nameFr}. Dépannage chaudière, entretien et installation. Intervention rapide ≤24h. Devis gratuit. ☎ 0475 12 34 56`

  return {
    title,
    description,
    alternates: {
      canonical: `https://chauffagiste-belga.be/chauffagiste-${commune.slugFr}`,
    },
    openGraph: {
      title,
      description,
      url: `https://chauffagiste-belga.be/chauffagiste-${commune.slugFr}`,
      siteName: 'Chauffagiste-Belga',
      locale: 'fr_BE',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default async function CommunePage(
  { params }: PageProps<{ commune: string }>
) {
  const commune = await getCommuneBySlug(params.commune)
  if (!commune) notFound()

  const schema = generateHVACSchema(commune)

  return (
    <>
      <JsonLd schema={schema} />
      <HeroSection commune={commune} />
      <Suspense fallback={<ServicesGridSkeleton />}>
        <ServicesGrid commune={commune} />
      </Suspense>
      <Suspense fallback={null}>
        <ContactSection commune={commune} />
      </Suspense>
    </>
  )
}
```

### 1.3 RSC Data Fetching Pattern

```typescript
// lib/supabase/geo.ts — Server-side data fetching
import { createServerClient } from '@/lib/supabase/server'
import type { CommuneRecord } from '@/types/geo'

export async function getCommuneBySlug(slug: string): Promise<CommuneRecord | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('communes')
    .select(`
      id,
      nis_code,
      name_fr,
      name_nl,
      slug_fr,
      slug_nl,
      province_id,
      arrondissement_id,
      postal_codes,
      latitude,
      longitude,
      provinces ( name_fr, name_nl, slug_fr ),
      arrondissements ( name_fr, name_nl )
    `)
    .eq('slug_fr', slug)
    .single()

  if (error || !data) return null
  return data as CommuneRecord
}

export async function getAllCommuneSlugs(): Promise<string[]> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('communes')
    .select('slug_fr')
    .order('name_fr')

  return data?.map((c) => c.slug_fr) ?? []
}
```

---

## §2. App Router Structure

### 2.1 Directory Layout

```
app/
├── (marketing)/                    # Route group — shared marketing layout
│   ├── layout.tsx                  # Header + Footer + EmergencyBar
│   ├── page.tsx                    # Homepage
│   ├── chauffagiste-[commune]/
│   │   └── page.tsx               # Commune landing page
│   ├── nos-services/
│   │   ├── page.tsx               # Services hub
│   │   └── [service]/
│   │       └── page.tsx           # Service category page
│   ├── conseils/
│   │   ├── page.tsx               # Blog hub
│   │   └── [slug]/
│   │       └── page.tsx           # Blog post (from Sanity)
│   ├── a-propos/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── (funnel)/                       # Route group — conversion funnel
│   ├── layout.tsx                  # Minimal layout: no distractions
│   ├── devis/
│   │   └── page.tsx               # Quote request form
│   ├── urgence/
│   │   └── page.tsx               # Emergency landing
│   └── merci/
│       └── page.tsx               # Thank you / confirmation
├── api/
│   ├── leads/
│   │   └── route.ts               # Lead ingestion endpoint
│   ├── revalidate/
│   │   └── route.ts               # Sanity ISR webhook handler
│   └── postal-lookup/
│       └── route.ts               # Postal code → commune resolver
├── sitemap.ts                      # Dynamic sitemap (~337 URLs)
├── robots.ts                       # Robots.txt generation
├── not-found.tsx                   # Custom 404 with CTA
├── error.tsx                       # Error boundary
├── loading.tsx                     # Root loading state
├── global-error.tsx                # Uncaught error handler
└── layout.tsx                      # Root layout
```

### 2.2 Root Layout Requirements

```typescript
// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter, Syne } from 'next/font/google'
import { Analytics } from '@/components/Analytics'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://chauffagiste-belga.be'),
  title: {
    template: '%s | Chauffagiste-Belga',
    default: 'Chauffagiste Belge — Dépannage ≤24h dans toute la Belgique',
  },
  description: 'Chauffagiste agréé en Belgique. Dépannage chaudière, entretien, installation. Intervention ≤24h. Devis gratuit.',
  verification: { google: 'GOOGLE_VERIFICATION_TOKEN' },
}

export const viewport: Viewport = {
  themeColor: '#C41E3A',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="geo.region" content="BE" />
        <meta name="geo.placename" content="Belgium" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## §3. Server Actions

### 3.1 Server Action Rules

- All Server Actions live in `app/actions/` (not co-located with components)
- All actions MUST be annotated with `'use server'` directive at file level
- All actions MUST validate input with `zod` before processing
- All actions MUST return typed `Result<T>` objects (never throw to client)
- Rate limiting MUST be applied to all public-facing actions

```typescript
// app/actions/submit-lead.ts
'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { createServerClient } from '@/lib/supabase/server'
import { sendLeadNotification } from '@/lib/resend/notifications'
import { checkRateLimit } from '@/lib/rate-limit'
import type { Result } from '@/types/common'

const leadSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().regex(/^(\+32|0)[1-9]\d{7,8}$/, 'Numéro belge invalide'),
  email: z.string().email().optional().or(z.literal('')),
  postalCode: z.string().regex(/^\d{4}$/, 'Code postal belge invalide (4 chiffres)'),
  serviceType: z.enum(['depannage', 'entretien', 'installation', 'reparation', 'devis']),
  message: z.string().max(1000).optional(),
  communeId: z.string().uuid().optional(),
  isUrgent: z.boolean().default(false),
  // Honeypot — must be empty
  website: z.string().max(0, 'Bot detected'),
})

export type LeadInput = z.infer<typeof leadSchema>

export async function submitLead(
  formData: FormData
): Promise<Result<{ leadId: string }>> {
  // Rate limiting by IP
  const ip = headers().get('x-forwarded-for') ?? 'unknown'
  const rateLimit = await checkRateLimit(`lead:${ip}`, { limit: 5, window: '1h' })
  if (!rateLimit.success) {
    return { success: false, error: 'Trop de demandes. Réessayez dans une heure.' }
  }

  // Parse and validate
  const raw = Object.fromEntries(formData)
  const parsed = leadSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]
    return { success: false, error: firstError?.message ?? 'Données invalides' }
  }

  const { website: _honeypot, ...leadData } = parsed.data

  // Persist to Supabase
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('leads')
    .insert({
      full_name: leadData.fullName,
      phone: leadData.phone,
      email: leadData.email || null,
      postal_code: leadData.postalCode,
      service_type: leadData.serviceType,
      message: leadData.message || null,
      commune_id: leadData.communeId || null,
      is_urgent: leadData.isUrgent,
      ip_address: ip,
      source_url: headers().get('referer') ?? '',
      status: 'new',
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('[submitLead] DB error:', error)
    return { success: false, error: 'Erreur serveur. Veuillez appeler directement.' }
  }

  // Send notifications (non-blocking)
  sendLeadNotification({ ...leadData, leadId: data.id }).catch(console.error)

  return { success: true, data: { leadId: data.id } }
}
```

### 3.2 Form Component Pattern with Server Actions

```typescript
// components/forms/LeadForm.tsx
'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { submitLead } from '@/app/actions/submit-lead'
import { PhoneIcon, LoaderIcon } from '@/components/icons'

const initialState = { success: false, error: '' }

export function LeadForm({ communeId, isUrgent = false }: LeadFormProps) {
  const [state, formAction] = useActionState(submitLead, initialState)

  useEffect(() => {
    if (state.success) {
      // Track conversion
      window.gtag?.('event', 'lead_submit', { commune_id: communeId })
    }
  }, [state.success, communeId])

  if (state.success) {
    return <LeadSuccessState leadId={state.data?.leadId} />
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Honeypot field — hidden from users */}
      <input type="text" name="website" className="sr-only" tabIndex={-1} aria-hidden />
      <input type="hidden" name="communeId" value={communeId ?? ''} />
      <input type="hidden" name="isUrgent" value={String(isUrgent)} />

      {/* Form fields */}
      <FormField name="fullName" label="Nom complet" required />
      <FormField name="phone" label="Téléphone" type="tel" required />
      <FormField name="email" label="Email" type="email" />
      <FormField name="postalCode" label="Code postal" maxLength={4} required />

      {state.error && (
        <p role="alert" className="text-red-600 text-sm">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-60 min-h-[52px]"
      aria-label={pending ? 'Envoi en cours...' : 'Envoyer ma demande'}
    >
      {pending ? (
        <LoaderIcon className="animate-spin mx-auto" aria-hidden />
      ) : (
        'Envoyer ma demande →'
      )}
    </button>
  )
}
```

---

## §4. Dynamic Route Handling

### 4.1 Catch-All vs. Dynamic Segments

| Pattern | Use Case | Example |
|---------|----------|---------|
| `[commune]` | Single dynamic segment | `/chauffagiste-[commune]` |
| `(group)/[param]` | Route group for shared layouts | `(marketing)/nos-services/[service]` |
| `[[...slug]]` | Optional catch-all (avoid for pSEO routes) | — |

### 4.2 Middleware Normalization

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Normalize: remove trailing slash, enforce lowercase
  if (pathname !== pathname.toLowerCase() || pathname.endsWith('/')) {
    const normalized = pathname.toLowerCase().replace(/\/$/, '')
    return NextResponse.redirect(new URL(normalized, request.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

---

## §5. Performance Mandates

### 5.1 Image Optimization

```typescript
// All images MUST use next/image with explicit dimensions
import Image from 'next/image'

// ✅ CORRECT
<Image
  src="/hero-technicien.webp"
  alt="Technicien chauffagiste Chauffagiste-Belga intervenant sur une chaudière à Bruxelles"
  width={640}
  height={480}
  priority  // Only on above-the-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
  className="rounded-lg object-cover"
/>

// ❌ BANNED: Missing alt, missing dimensions
<Image src="/hero.jpg" alt="" />
```

### 5.2 Font Loading

- Use `next/font` exclusively — never load fonts from external CDN URLs in CSS
- Maximum 2 font families (display + body)
- Always set `display: 'swap'` to prevent FOIT

### 5.3 Script Loading

```typescript
// Third-party scripts MUST use next/script with appropriate strategy
import Script from 'next/script'

// Analytics — afterInteractive (non-blocking)
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="afterInteractive"
/>

// Non-critical widgets — lazyOnload
<Script src="https://widget.trustpilot.com/..." strategy="lazyOnload" />
```

### 5.4 Revalidation Strategy

| Route Type | Strategy | Revalidation |
|------------|----------|-------------|
| Commune pages | ISR | `revalidate = 86400` (24h) + on-demand |
| Homepage | ISR | `revalidate = 3600` (1h) |
| Blog posts | ISR | On-demand via Sanity webhook |
| Lead form API | Dynamic | No caching |
| Geo lookup API | ISR | `revalidate = 604800` (7 days) |

```typescript
// In RSC page files
export const revalidate = 86400 // 24 hours for commune pages
export const dynamic = 'force-static' // Build-time static for pSEO
```

---

## §6. Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllCommuneSlugs } from '@/lib/supabase/geo'
import { getAllBlogSlugs } from '@/lib/sanity/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [communeSlugs, blogSlugs] = await Promise.all([
    getAllCommuneSlugs(),
    getAllBlogSlugs(),
  ])

  const baseUrl = 'https://chauffagiste-belga.be'
  const now = new Date()

  const communeUrls = communeSlugs.map((slug) => ({
    url: `${baseUrl}/chauffagiste-${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/conseils/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/nos-services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...communeUrls,
    ...blogUrls,
  ]
}
```