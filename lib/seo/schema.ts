import type { CommuneRecord } from '@/lib/supabase/communes'
import { getLocalFaqTemplates } from './spintax-data'
import { siteUrl } from '@/lib/env'

export function buildCommuneSchemaGraph(commune: CommuneRecord): Record<string, unknown>[] {
  const communeName = commune.name_fr
  const slug = commune.slug_fr
  const postal = commune.postal_codes?.[0] ?? '1000'
  const province = commune.provinces?.name_fr ?? 'Belgique'
  const pageUrl = `${siteUrl}/chauffagiste-${slug}`

  // 1. HVACBusiness Local Schema
  const businessSchema: Record<string, unknown> = {
    '@type': 'HVACBusiness',
    '@id': `${pageUrl}#business`,
    name: `Chauffagiste-Belga ${communeName}`,
    url: pageUrl,
    telephone: '+3247512345',
    priceRange: '€€',
    inLanguage: 'fr-BE',
    description: `Chauffagiste certifié Cerga à ${communeName} (${postal}). Dépannage urgent 24h/24, entretien périodique obligatoire PEB et pose de chaudières & pompes à chaleur.`,
    address: {
      '@type': 'PostalAddress',
      postalCode: postal,
      addressLocality: communeName,
      addressRegion: province,
      addressCountry: 'BE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: commune.latitude,
      longitude: commune.longitude,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${communeName}, Belgique`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  }

  // 2. BreadcrumbList Schema
  const breadcrumbSchema: Record<string, unknown> = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Chauffagiste ${communeName}`,
        item: pageUrl,
      },
    ],
  }

  // 3. FAQPage Schema
  const faqs = getLocalFaqTemplates(communeName)
  const faqSchema: Record<string, unknown> = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return [businessSchema, breadcrumbSchema, faqSchema]
}
