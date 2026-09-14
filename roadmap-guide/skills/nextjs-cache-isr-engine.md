# Skill: Next.js Cache & ISR Engine
# Production-Grade Static & Dynamic Rendering for ~337 Communes
# Project: Chauffagiste-Belga

---

## Purpose

Manage the build, caching, and revalidation lifecycle of ~337 Core Commune landing pages, 8 National Service guides, and dynamic blog routes. Enforce optimal TTFB (< 150ms), zero client waterfall rendering, and automated on-demand cache revalidation when CRM/CMS data updates.

---

## Key Principles

1. **Pre-render All ~337 Communes at Build Time**: Use `generateStaticParams()` to create static HTML/RSC payloads during `next build`.
2. **On-Demand Incremental Static Regeneration (ISR)**: Use `revalidateTag()` via Supabase/Sanity webhooks rather than expensive full-site rebuilds.
3. **Strict Server/Client Boundary**: Data fetching lives solely in Server Components; Client Components are isolated leaves for interactivity (drawers, forms, sticky bars).

---

## Code Implementation

```typescript
// app/chauffagiste-[commune]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCommuneBySlug, getAllActiveCommuneSlugs } from '@/lib/supabase/communes'
import { getNearestMajorHub, getSiblingCommunes } from '@/lib/seo/internal-links'
import { getDynamicCommuneData } from '@/lib/seo/data-injector'
import { CommuneHero } from '@/components/geo/CommuneHero'
import { ServicesGrid } from '@/components/geo/ServicesGrid'
import { DiagnosticSection } from '@/components/geo/DiagnosticSection'
import { SiblingCluster } from '@/components/geo/SiblingCluster'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateHVACSchema } from '@/lib/seo/schema'

interface PageProps {
  params: {
    commune: string
  }
}

// 1. Build-time static generation for ~337 communes
export async function generateStaticParams() {
  const slugs = await getAllActiveCommuneSlugs()
  return slugs.map((commune) => ({
    commune,
  }))
}

// 2. SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const commune = await getCommuneBySlug(params.commune)
  if (!commune) return {}

  const isMajorCity = commune.is_major_hub
  const title = isMajorCity
    ? `Chauffagiste ${commune.name_fr} (Agréé) | Dépannage 24/7 & Entretien Chaudière`
    : `Chauffagiste ${commune.name_fr} | Dépannage Rapide & Entretien Chaudière`

  const description = `Besoin d'un chauffagiste agréé à ${commune.name_fr} ? Dépannage d'urgence 24h/24, entretien légal PEB et installation de chaudière. Devis gratuit.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://chauffagiste-belga.be/chauffagiste-${commune.slug_fr}`,
    },
    openGraph: {
      title,
      description,
      url: `https://chauffagiste-belga.be/chauffagiste-${commune.slug_fr}`,
      locale: 'fr_BE',
      type: 'website',
    },
  }
}

// 3. Server Component Page Body
export default async function CommunePage({ params }: PageProps) {
  const commune = await getCommuneBySlug(params.commune)
  if (!commune) notFound()

  // Parallel data fetching
  const [dynamicData, hubLink, siblingLinks] = await Promise.all([
    getDynamicCommuneData(commune.id),
    getNearestMajorHub(commune.id),
    getSiblingCommunes(commune),
  ])

  const schema = generateHVACSchema(commune, dynamicData)

  return (
    <>
      <JsonLd schema={schema} />
      <main className="min-h-screen bg-slate-50">
        <CommuneHero 
          commune={commune} 
          dynamicData={dynamicData} 
        />
        <ServicesGrid 
          commune={commune} 
          isMajorCity={commune.is_major_hub} 
        />
        {commune.is_major_hub && (
          <DiagnosticSection communeName={commune.name_fr} />
        )}
        <SiblingCluster 
          currentCommune={commune} 
          hubLink={hubLink} 
          siblings={siblingLinks} 
        />
      </main>
    </>
  )
}
```

### On-Demand Revalidation Webhook

```typescript
// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.REVALIDATION_SECRET_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { slug, tag } = body

  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  }

  if (slug) {
    revalidatePath(`/chauffagiste-${slug}`)
    return NextResponse.json({ revalidated: true, path: `/chauffagiste-${slug}` })
  }

  return NextResponse.json({ message: 'Nothing to revalidate' }, { status: 400 })
}
```
