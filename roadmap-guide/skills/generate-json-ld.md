# Skill: Generate JSON-LD Schema
# Dynamic Schema Generator for HVAC/Plumber Pages
# Project: Chauffagiste-Belga

---

## Purpose

Generate valid, Google-compliant JSON-LD structured data for all page types. Schemas must pass Google's Rich Results Test and provide maximum entity clarity for AI search engines.

---

## Supported Schema Types

| Schema Type | Page Type | Priority |
|------------|-----------|---------|
| `HVACBusiness` | All commune pages | Critical |
| `PlumbingService` | Service+commune pages | Critical |
| `BreadcrumbList` | All pages | Critical |
| `FAQPage` | Commune + blog pages | High |
| `LocalBusiness` | Homepage | High |
| `Article` | Blog posts | High |
| `Person` | Author pages | Medium |
| `AggregateRating` | Embedded in Business schemas | Critical |
| `WebSite` + `SearchAction` | Homepage | Medium |

---

## Complete Schema Library

```typescript
// lib/seo/schema.ts
import type { Commune } from '@/types/geo'
import type { ServiceCategory } from '@/types/services'
import type { Post, Author } from '@/types/content'

const BASE_URL = 'https://chauffagiste-belga.be'
const PHONE = '+3247512345'
const PHONE_DISPLAY = '0475 12 34 56'
const BUSINESS_NAME = 'Chauffagiste-Belga'
const AGGREGATE_RATING = { ratingValue: '4.8', reviewCount: '1247', bestRating: '5', worstRating: '1' }

// ─────────────────────────────────────────────────────────
// 1. HVAC BUSINESS (commune landing pages)
// ─────────────────────────────────────────────────────────
export function generateHVACSchema(commune: Commune, services: ServiceCategory[]) {
  return {
    '@context': 'https://schema.org',
    '@type': ['HVACBusiness', 'LocalBusiness'],
    '@id': `${BASE_URL}/chauffagiste-${commune.slug}#business`,
    name: BUSINESS_NAME,
    alternateName: 'Chauffagiste Belga',
    legalName: 'Chauffagiste-Belga SPRL',
    description: `Chauffagiste agréé à ${commune.nameFr} (${commune.postalCodes.slice(0,3).join(', ')}). Dépannage chaudière, entretien annuel et installation de systèmes de chauffage. Intervention ≤ 24h, 7j/7.`,
    url: `${BASE_URL}/chauffagiste-${commune.slug}`,
    telephone: PHONE,
    email: 'info@chauffagiste-belga.be',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Visa, Mastercard, Virement bancaire',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.svg`,
      contentUrl: `${BASE_URL}/logo.svg`,
      width: 200,
      height: 60,
    },
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: commune.nameFr,
      postalCode: commune.postalCodes[0],
      addressRegion: commune.province.nameFr,
      addressCountry: 'BE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: commune.latitude,
      longitude: commune.longitude,
    },
    areaServed: commune.postalCodes.map((code) => ({
      '@type': 'City',
      name: commune.nameFr,
      postalCode: code,
      addressCountry: 'BE',
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '09:00',
        closes: '17:00',
        description: 'Urgences uniquement',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Services de chauffage à ${commune.nameFr}`,
      itemListElement: services.map((service, i) => ({
        '@type': 'Offer',
        position: i + 1,
        name: service.nameFr,
        url: `${BASE_URL}/${service.slug}-${commune.slug}`,
        priceCurrency: 'EUR',
        price: service.priceFrom.toString(),
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: service.priceFrom.toString(),
          description: 'Prix de départ — devis gratuit sur demande',
        },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ...AGGREGATE_RATING,
    },
    sameAs: [
      'https://www.facebook.com/chauffagistebelga',
      'https://www.linkedin.com/company/chauffagiste-belga',
      'https://g.page/chauffagiste-belga',
    ],
    foundingDate: '2014',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 12,
    },
    knowsAbout: [
      'Dépannage chaudière',
      'Entretien chaudière',
      'Installation chauffage',
      'Pompe à chaleur',
      'Chauffage au sol',
      'Réglementation PEB Belgique',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Agréé Cerga',
        credentialCategory: 'Certification professionnelle belge',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certifié Argb',
        credentialCategory: 'Accréditation gaz naturel Belgique',
      },
    ],
  }
}

// ─────────────────────────────────────────────────────────
// 2. PLUMBING SERVICE (service+commune pages)
// ─────────────────────────────────────────────────────────
export function generatePlumbingServiceSchema(
  commune: Commune,
  service: ServiceCategory
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PlumbingService',
    '@id': `${BASE_URL}/${service.slug}-${commune.slug}#service`,
    name: `${service.nameFr} à ${commune.nameFr}`,
    provider: {
      '@type': 'HVACBusiness',
      '@id': `${BASE_URL}/chauffagiste-${commune.slug}#business`,
      name: BUSINESS_NAME,
      telephone: PHONE,
    },
    serviceType: service.nameFr,
    description: `${service.nameFr} à ${commune.nameFr} par Chauffagiste-Belga. Techniciens agréés, intervention ≤ 24h, devis gratuit. ${service.shortDescription}`,
    areaServed: {
      '@type': 'City',
      name: commune.nameFr,
      postalCode: commune.postalCodes[0],
      addressCountry: 'BE',
    },
    offers: {
      '@type': 'Offer',
      name: service.nameFr,
      priceCurrency: 'EUR',
      price: service.priceFrom.toString(),
      priceValidUntil: getNextYearDate(),
      availability: 'https://schema.org/InStock',
      areaServed: commune.nameFr,
      seller: {
        '@type': 'HVACBusiness',
        name: BUSINESS_NAME,
        telephone: PHONE,
      },
    },
    hasWarranty: {
      '@type': 'WarrantyPromise',
      durationOfWarranty: {
        '@type': 'QuantitativeValue',
        value: 2,
        unitCode: 'ANN',
        description: '2 ans de garantie pièces et main-d\'œuvre',
      },
      warrantyScope: 'https://schema.org/LabourAndParts',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ...AGGREGATE_RATING,
    },
  }
}

// ─────────────────────────────────────────────────────────
// 3. BREADCRUMB LIST
// ─────────────────────────────────────────────────────────
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

// ─────────────────────────────────────────────────────────
// 4. FAQ PAGE
// ─────────────────────────────────────────────────────────
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
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

// ─────────────────────────────────────────────────────────
// 5. BLOG ARTICLE
// ─────────────────────────────────────────────────────────
export function generateArticleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${BASE_URL}/conseils/${post.slug.current}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    image: {
      '@type': 'ImageObject',
      url: post.mainImage?.url ?? `${BASE_URL}/og-default.jpg`,
      width: 1200,
      height: 630,
      caption: post.mainImage?.caption ?? post.title,
    },
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/auteurs/${post.author?.slug}#person`,
      name: post.author?.name ?? BUSINESS_NAME,
      jobTitle: post.author?.role ?? 'Expert chauffage',
      url: post.author?.slug ? `${BASE_URL}/auteurs/${post.author.slug}` : BASE_URL,
      image: post.author?.image?.url ?? undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/conseils/${post.slug.current}`,
    },
    keywords: post.relatedServices?.join(', ') ?? '',
    inLanguage: 'fr-BE',
    about: {
      '@type': 'Thing',
      name: 'Chauffage et plomberie en Belgique',
    },
  }
}

// ─────────────────────────────────────────────────────────
// 6. LOCAL BUSINESS (Homepage)
// ─────────────────────────────────────────────────────────
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HVACBusiness', 'LocalBusiness'],
    '@id': `${BASE_URL}#business`,
    name: BUSINESS_NAME,
    legalName: 'Chauffagiste-Belga SPRL',
    description: 'Chauffagiste agréé intervenant dans toute la Belgique. Dépannage, entretien et installation de systèmes de chauffage. Intervention ≤ 24h, 7j/7.',
    url: BASE_URL,
    telephone: PHONE,
    priceRange: '€€',
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.svg`, width: 200, height: 60 },
    image: `${BASE_URL}/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BE',
      addressRegion: 'Belgique',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Belgique',
      identifier: 'BE',
    },
    aggregateRating: { '@type': 'AggregateRating', ...AGGREGATE_RATING },
    sameAs: [
      'https://www.facebook.com/chauffagistebelga',
      'https://www.linkedin.com/company/chauffagiste-belga',
    ],
    foundingDate: '2014',
  }
}

// ─────────────────────────────────────────────────────────
// 7. WEBSITE + SEARCH ACTION (Homepage)
// ─────────────────────────────────────────────────────────
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}#website`,
    url: BASE_URL,
    name: BUSINESS_NAME,
    inLanguage: ['fr-BE', 'nl-BE'],
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}#business`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/chauffagiste-{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────
function getNextYearDate(): string {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  return d.toISOString().split('T')[0]!
}
```

---

## Validation

Before deploying any page with JSON-LD:
1. Test at [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Test at [Schema.org Validator](https://validator.schema.org/)
3. Verify no errors in Google Search Console → Enhancements

### Common Errors to Avoid

| Error | Cause | Fix |
|-------|-------|-----|
| `Missing field "telephone"` | Phone not in business schema | Always include `telephone` |
| `Invalid URL` | Relative URLs in `@id` | Use absolute URLs with domain |
| `Rating out of range` | `ratingValue` > `bestRating` | Ensure 4.8 ≤ 5.0 |
| `Missing required field` | `priceRange` omitted | Always include `priceRange` |
| `Duplicate @id` | Same ID on two schemas | Use page-specific fragment IDs |