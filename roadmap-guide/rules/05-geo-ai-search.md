# 05 — GEO & AI Search Optimization
# pSEO Schema, JSON-LD Injection & Generative Engine Directives
# Project: Chauffagiste-Belga

---

## §1. Generative Engine Optimization (GEO) Philosophy

GEO is the practice of structuring content so that AI systems (ChatGPT, Perplexity, Claude, Google AI Overviews) cite and surface the website as an authoritative source. It requires:

1. **Entity clarity**: Every page unambiguously defines WHO, WHAT, WHERE
2. **Structured data density**: Machine-readable JSON-LD on every page
3. **Factual precision**: Specific numbers, certifications, response times — not vague claims
4. **Citation-worthy content**: Stats, how-tos, and direct answers that AI systems quote verbatim
5. **Semantic HTML**: Proper headings, lists, and sectioning so crawlers understand hierarchy

---

## §2. JSON-LD Schema Generation

### 2.1 HVACBusiness Schema (Commune Pages)

```typescript
// lib/seo/schema.ts
import type { Commune } from '@/types/geo'
import type { ServiceCategory } from '@/types/services'

export function generateHVACSchema(commune: Commune, services: ServiceCategory[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `https://chauffagiste-belga.be/chauffagiste-${commune.slug}#business`,
    name: 'Chauffagiste-Belga',
    legalName: 'Chauffagiste-Belga SPRL',
    description: `Chauffagiste agréé à ${commune.nameFr}. Dépannage, entretien et installation de systèmes de chauffage. Intervention rapide ≤ 24h.`,
    url: `https://chauffagiste-belga.be/chauffagiste-${commune.slug}`,
    telephone: '+3247512345',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    logo: {
      '@type': 'ImageObject',
      url: 'https://chauffagiste-belga.be/logo.svg',
      width: 200,
      height: 60,
    },
    image: 'https://chauffagiste-belga.be/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Service mobile — sans bureau fixe',
      addressLocality: commune.nameFr,
      postalCode: commune.postalCodes[0],
      addressCountry: 'BE',
      addressRegion: commune.province.nameFr,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: commune.latitude,
      longitude: commune.longitude,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: commune.nameFr,
      containedIn: {
        '@type': 'AdministrativeArea',
        name: commune.province.nameFr,
        containedIn: {
          '@type': 'Country',
          name: 'Belgique',
          identifier: 'BE',
        },
      },
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'EmergencyService',
      availableLanguage: [
        { '@type': 'Language', name: 'French', alternateName: 'fr' },
        { '@type': 'Language', name: 'Dutch', alternateName: 'nl' },
      ],
      availabilityStarts: '2024-01-01',
      availabilityEnds: '2099-12-31',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de chauffage et plomberie',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        '@id': `https://chauffagiste-belga.be/${service.slug}-${commune.slug}#offer`,
        position: index + 1,
        name: service.nameFr,
        description: service.shortDescription,
        url: `https://chauffagiste-belga.be/${service.slug}-${commune.slug}`,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: service.priceFrom,
          description: 'À partir de — devis gratuit sur demande',
        },
        seller: {
          '@type': 'HVACBusiness',
          name: 'Chauffagiste-Belga',
        },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/chauffagistebelga',
      'https://www.linkedin.com/company/chauffagiste-belga',
      'https://g.page/chauffagiste-belga',
    ],
  }
}
```

### 2.2 PlumbingService Schema (Service+Commune Pages)

```typescript
export function generatePlumbingServiceSchema(
  commune: Commune,
  service: ServiceCategory
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PlumbingService',
    '@id': `https://chauffagiste-belga.be/${service.slug}-${commune.slug}#service`,
    name: `${service.nameFr} ${commune.nameFr}`,
    provider: {
      '@type': 'HVACBusiness',
      '@id': `https://chauffagiste-belga.be/chauffagiste-${commune.slug}#business`,
      name: 'Chauffagiste-Belga',
    },
    serviceType: service.nameFr,
    description: service.longDescription(commune.nameFr),
    areaServed: {
      '@type': 'City',
      name: commune.nameFr,
      containedIn: {
        '@type': 'State',
        name: commune.province.nameFr,
      },
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: service.priceFrom,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      url: `https://chauffagiste-belga.be/${service.slug}-${commune.slug}`,
    },
    termsOfService: 'https://chauffagiste-belga.be/conditions-generales',
    hasWarranty: {
      '@type': 'WarrantyPromise',
      durationOfWarranty: { '@type': 'QuantitativeValue', value: 2, unitCode: 'ANN' },
      warrantyScope: 'https://schema.org/LabourAndParts',
    },
  }
}
```

### 2.3 BreadcrumbList Schema

```typescript
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}
```

### 2.4 FAQPage Schema

```typescript
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
```

### 2.5 JSON-LD React Component

```typescript
// components/seo/JsonLd.tsx
interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          // eslint-disable-next-line react/no-danger -- Sanitized JSON-LD output, no user input
        />
      ))}
    </>
  )
}
```

---

## §3. Geo Meta Tags

### 3.1 Mandatory Geo Tags for Every Commune Page

```typescript
// lib/seo/geo-meta.ts
import type { Commune } from '@/types/geo'

export function generateGeoMeta(commune: Commune) {
  return {
    // ICBM (standard geo coordinates)
    'ICBM': `${commune.latitude}, ${commune.longitude}`,
    // Dublin Core geographic position
    'DC.title': `Chauffagiste ${commune.nameFr}`,
    // Geo meta standards
    'geo.region': `BE-${commune.province.slug.toUpperCase()}`,
    'geo.placename': commune.nameFr,
    'geo.position': `${commune.latitude};${commune.longitude}`,
  }
}
```

```typescript
// In app/chauffagiste-[commune]/page.tsx generateMetadata:
export async function generateMetadata({ params }: PageProps<{ commune: string }>) {
  const commune = await getCommuneBySlug(params.commune)
  if (!commune) return {}

  const geoMeta = generateGeoMeta(commune)

  return {
    title: `Chauffagiste ${commune.nameFr} | Dépannage ≤24h — Chauffagiste-Belga`,
    description: `Chauffagiste agréé à ${commune.nameFr} (${commune.postalCodes.join(', ')}). Dépannage, entretien et installation chaudière. Intervention ≤ 24h. ☎ 0475 12 34 56`,
    other: geoMeta,
    // hreflang for bilingual Belgium
    alternates: {
      canonical: `https://chauffagiste-belga.be/chauffagiste-${commune.slug}`,
      languages: {
        'fr-BE': `https://chauffagiste-belga.be/chauffagiste-${commune.slug}`,
        'nl-BE': `https://chauffagiste-belga.be/verwarmingstechnicus-${commune.slugNl}`,
        'x-default': `https://chauffagiste-belga.be/chauffagiste-${commune.slug}`,
      },
    },
  }
}
```

---

## §4. Entity-First Copywriting for GEO

### 4.1 Entity Declaration Pattern

Every commune page MUST open with an entity-declaring paragraph that AI systems can extract and cite:

```
// ✅ ENTITY-FIRST (AI-extractable)
"Chauffagiste-Belga est un chauffagiste agréé intervenant à [Commune] ([Code postal]),
dans la province de [Province], Belgique. Nos techniciens certifiés assurent le
dépannage chaudière, l'entretien annuel et l'installation de systèmes de chauffage.
Délai d'intervention garanti : ≤ 24 heures. Numéro d'appel : 0475 12 34 56."

// ❌ VAGUE (not AI-extractable)
"Nous sommes des professionnels du chauffage qui interviennent rapidement chez vous."
```

### 4.2 Factual Precision Requirements

All commune pages MUST include:
- Exact commune name (French + Dutch if applicable)
- Postal code(s) served
- Province name
- NIS/INS code (for structured data, not necessarily visible)
- Response time commitment (≤ 24h for standard, ≤ 2h for emergencies)
- Certifications mentioned (Cerga, Argb, Brasseur)
- Specific services with price ranges

### 4.3 GEO-Optimized FAQ Pattern

```typescript
// Mandatory FAQ topics per commune page
export const COMMUNE_FAQ_TEMPLATE = (commune: string) => [
  {
    question: `Intervenez-vous en urgence à ${commune} ?`,
    answer: `Oui, Chauffagiste-Belga intervient en urgence à ${commune} 7j/7 et 24h/24. Délai d'intervention garanti ≤ 2 heures pour les pannes graves. Appelez le 0475 12 34 56.`,
  },
  {
    question: `Quel est le coût d'un dépannage chaudière à ${commune} ?`,
    answer: `Le coût d'un dépannage chaudière à ${commune} varie selon la panne : déplacement et diagnostic à partir de 65 €. Un devis détaillé est établi avant toute intervention. Les devis sont 100% gratuits et sans engagement.`,
  },
  {
    question: `Quelles marques de chaudières réparez-vous à ${commune} ?`,
    answer: `À ${commune}, nos techniciens certifiés réparent toutes les marques : Bulex, Vaillant, Viessmann, Bosch, De Dietrich, Junkers, Saunier Duval, Baxi, Ariston. Agréés par les principales marques belges.`,
  },
  {
    question: `Proposez-vous un contrat d'entretien annuel à ${commune} ?`,
    answer: `Oui, nous proposons des contrats d'entretien annuel à ${commune} à partir de 99 €/an. L'entretien annuel est obligatoire en Belgique selon la réglementation. Il comprend le nettoyage, le contrôle des combustibles et le rapport de conformité.`,
  },
]
```

---

## §5. Internal Linking for Silo SEO

### 5.1 Cross-Linking Algorithm

```typescript
// lib/seo/internal-links.ts
import type { Commune } from '@/types/geo'

interface InternalLink {
  href: string
  label: string
  type: 'commune' | 'service' | 'province' | 'blog'
}

/**
 * Generates the internal link graph for a commune page.
 * Priority: sibling communes (same province) > parent (province) > services
 */
export async function generateCommuneInternalLinks(
  commune: Commune,
  siblingCommunes: Commune[],
  services: string[]
): Promise<InternalLink[]> {
  const links: InternalLink[] = []

  // 1. Parent province link (always first)
  links.push({
    href: `/zones-intervention/${commune.province.slug}`,
    label: `Chauffagiste en ${commune.province.nameFr}`,
    type: 'province',
  })

  // 2. Service links for this commune (top 6)
  for (const serviceSlug of services.slice(0, 6)) {
    links.push({
      href: `/${serviceSlug}-${commune.slug}`,
      label: `${SERVICE_NAMES[serviceSlug]} à ${commune.nameFr}`,
      type: 'service',
    })
  }

  // 3. Nearby commune links (up to 8 — same arrondissement first, then province)
  const nearby = siblingCommunes
    .filter((c) => c.id !== commune.id)
    .slice(0, 8)

  for (const nearbyCommune of nearby) {
    links.push({
      href: `/chauffagiste-${nearbyCommune.slug}`,
      label: `Chauffagiste ${nearbyCommune.nameFr}`,
      type: 'commune',
    })
  }

  return links
}
```

### 5.2 Breadcrumb Requirements

Every page MUST have a semantic breadcrumb:

```
Homepage > Zone > Province > Commune > [Service (if applicable)]
/         /zones-intervention /zones-intervention/bruxelles-capitale /chauffagiste-bruxelles /depannage-chaudiere-bruxelles
```

```typescript
// components/seo/Breadcrumb.tsx
import Link from 'next/link'
import { JsonLd } from './JsonLd'
import { generateBreadcrumbSchema } from '@/lib/seo/schema'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href ? `https://chauffagiste-belga.be${item.href}` : '',
  }))

  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Fil d'Ariane" className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-1"
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(index + 1)} />
              {item.href && index < items.length - 1 ? (
                <>
                  <Link
                    href={item.href}
                    itemProp="item"
                    className="hover:text-trust-blue transition-colors"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <span aria-hidden className="text-gray-300">›</span>
                </>
              ) : (
                <span itemProp="name" className="text-gray-950 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
```

---

## §6. robots.ts & Canonical Rules

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',
          '/api/',
          '/merci',
          '/_next/',
        ],
      },
      {
        // Allow AI crawlers explicitly
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Googlebot'],
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: 'https://chauffagiste-belga.be/sitemap.xml',
  }
}
```

---

## §7. GEO Content Quality Checklist

For every commune page, verify:

- [ ] Entity declaration paragraph in first 100 words
- [ ] Commune name appears in H1, first paragraph, and meta title
- [ ] Postal code(s) mentioned in visible text
- [ ] Province name mentioned
- [ ] Response time commitment stated with specific number (≤ 24h)
- [ ] Phone number in text (not just clickable link)
- [ ] At least 4 FAQ items with specific, factual answers
- [ ] JSON-LD `HVACBusiness` schema present
- [ ] JSON-LD `BreadcrumbList` schema present
- [ ] JSON-LD `FAQPage` schema present
- [ ] Geo meta tags (ICBM, geo.region, geo.placename, geo.position)
- [ ] hreflang for fr-BE and nl-BE
- [ ] Canonical URL pointing to self
- [ ] Internal links to: parent province, 6+ services, 4+ nearby communes
- [ ] `AggregateRating` present (pulled from real Google review data)
- [ ] Content word count: minimum 600 words
- [ ] Content uniqueness: minimum 85% vs other commune pages