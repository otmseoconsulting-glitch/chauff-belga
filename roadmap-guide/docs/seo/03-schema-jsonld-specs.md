# 03 — Schema JSON-LD Specifications
# Complete Structured Data Library: Templates, Rules & Validation
# Project: Chauffagiste-Belga

---

## §1. Global Schema Rules

### 1.1 Non-Negotiables

1. **Every page** must have at least one JSON-LD `<script>` block
2. Use `@graph` arrays — multiple schema types on one page share one script tag
3. Entity `@id` values are **immutable** after first publish — changing them breaks Knowledge Graph associations
4. All `@id` values must use **absolute URLs** pointing to the live canonical domain
5. Dates must be ISO 8601 format: `2026-01-15` or `2026-01-15T10:00:00+01:00`
6. Phone numbers must be in E.164 format in schema: `+3247512345`
7. `AggregateRating` on `LocalBusiness` must reflect **real, current** data from Supabase
8. **`inLanguage`** must be set to `"fr-BE"` across all schema objects (100% French website targeting Belgium)

### 1.2 Implementation Component

```typescript
// components/seo/JsonLd.tsx
// SERVER COMPONENT — renders <script> tag with JSON-LD
interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ schema }: JsonLdProps) {
  const jsonString = JSON.stringify(
    Array.isArray(schema) ? { '@context': 'https://schema.org', '@graph': schema } : schema
  )

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
```

---

## §2. LocalBusiness / HVACBusiness (Homepage & Commune Pages)

### 2.1 Commune Page Schema (Full)

```typescript
// lib/seo/schema/hvac-business.ts
export function buildHVACBusinessSchema(params: {
  communeName: string
  communeSlug: string
  postalCode: string
  province: string
  latitude: number
  longitude: number
  reviewCount: number
  ratingValue: number
}): Record<string, unknown> {
  return {
    inLanguage: 'fr-BE',
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `https://chauffagiste-belga.be/chauffagiste-${params.communeSlug}#business`,
    name: `Chauffagiste-Belga — ${params.communeName}`,
    url: `https://chauffagiste-belga.be/chauffagiste-${params.communeSlug}`,
    telephone: '+3247512345',
    email: 'info@chauffagiste-belga.be',
    priceRange: '€€',
    image: 'https://chauffagiste-belga.be/images/og/og-default.jpg',
    logo: 'https://chauffagiste-belga.be/images/logo/logo-light.svg',
    foundingDate: '2014',
    slogan: 'Votre chauffagiste agréé en Belgique — Intervention ≤ 24h',
    description: `Chauffagiste-Belga intervient à ${params.communeName} pour le dépannage, l'entretien et l'installation de chaudières et systèmes de chauffage. Techniciens agréés Cerga. Disponible 7j/7, 24h/24. Délai garanti ≤ 24h.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: params.communeName,
      postalCode: params.postalCode,
      addressRegion: params.province,
      addressCountry: 'BE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: params.latitude,
      longitude: params.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: params.communeName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: params.province,
      },
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de chauffage et plomberie',
      itemListElement: [
        buildServiceOfferSchema('Dépannage chaudière', 65, params.communeSlug, 'depannage-chaudiere'),
        buildServiceOfferSchema('Entretien chaudière annuel', 99, params.communeSlug, 'entretien-chaudiere'),
        buildServiceOfferSchema('Installation chauffage', 350, params.communeSlug, 'installation-chauffage'),
        buildServiceOfferSchema('Réparation chaudière', 85, params.communeSlug, 'reparation-chaudiere'),
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: params.ratingValue,
      reviewCount: params.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    knowsAbout: [
      'Dépannage chaudière à gaz',
      'Entretien chaudière obligatoire Belgique',
      'Installation pompe à chaleur',
      'Réglementation PEB Wallonie',
      'Chaudière Bulex, Vaillant, Viessmann',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Agrément Cerga',
        credentialCategory: 'Certification professionnelle belge chauffage gaz',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Argb',
        credentialCategory: 'Accréditation gaz naturel Belgique',
      },
    ],
  }
}

function buildServiceOfferSchema(
  name: string,
  priceFrom: number,
  communeSlug: string,
  serviceSlug: string
): Record<string, unknown> {
  return {
    '@type': 'Offer',
    name,
    url: `https://chauffagiste-belga.be/${serviceSlug}-${communeSlug}`,
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: priceFrom,
      priceCurrency: 'EUR',
      description: `À partir de ${priceFrom} €`,
    },
    eligibleRegion: { '@type': 'Country', name: 'BE' },
    availability: 'https://schema.org/InStock',
  }
}
```

---



## §4. FAQPage Schema

```typescript
// lib/seo/schema/faq.ts
export type FAQItem = { question: string; answer: string }

export function buildFAQSchema(items: FAQItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
```

---

## §5. BreadcrumbList Schema

```typescript
// lib/seo/schema/breadcrumb.ts
export type BreadcrumbItem = { name: string; url?: string }

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}
```

---

## §6. Article Schema (Blog Posts)

```typescript
// lib/seo/schema/article.ts
export function buildArticleSchema(params: {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  authorName: string
  authorSlug: string
  imageUrl: string
  imageAlt: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://chauffagiste-belga.be/conseils/${params.slug}#article`,
    headline: params.title,
    description: params.excerpt,
    url: `https://chauffagiste-belga.be/conseils/${params.slug}`,
    datePublished: params.publishedAt,
    dateModified: params.updatedAt,
    author: {
      '@type': 'Person',
      '@id': `https://chauffagiste-belga.be/auteurs/${params.authorSlug}#author`,
      name: params.authorName,
      url: `https://chauffagiste-belga.be/auteurs/${params.authorSlug}`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://chauffagiste-belga.be#business',
      name: 'Chauffagiste-Belga',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chauffagiste-belga.be/images/logo/logo-light.svg',
      },
    },
    image: {
      '@type': 'ImageObject',
      url: params.imageUrl,
      description: params.imageAlt,
    },
    inLanguage: 'fr-BE',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://chauffagiste-belga.be#website',
    },
  }
}
```

---

## §7. WebSite + SearchAction (Homepage Only)

```typescript
// lib/seo/schema/website.ts
export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://chauffagiste-belga.be#website',
    url: 'https://chauffagiste-belga.be',
    name: 'Chauffagiste-Belga',
    description: 'Votre chauffagiste agréé en Belgique — dépannage, entretien et installation 7j/7',
    inLanguage: 'fr-BE',
    publisher: { '@id': 'https://chauffagiste-belga.be#business' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://chauffagiste-belga.be/recherche?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
```

---

## §8. Schema Validation Checklist

Before any deployment, validate all JSON-LD using:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Automated check** (CI/CD):

```bash
# Run in pre-deploy hook
npx schema-dts-check src/lib/seo/schema/**/*.ts
```

### 8.1 Required Schema Coverage Per Page Type

| Page Type | LocalBusiness | FAQPage | BreadcrumbList | Article | WebSite |
|-----------|:---:|:---:|:---:|:---:|:---:|
| Homepage | ✅ | — | — | — | ✅ |
| Commune page | ✅ | ✅ | ✅ | — | — |
| Blog post | — | ✅ | ✅ | ✅ | — |
