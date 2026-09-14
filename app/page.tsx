import { JsonLd } from '@/components/seo/JsonLd'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ZonesAndPromoSection } from '@/components/sections/ZonesAndPromoSection'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { StatsBar } from '@/components/sections/StatsBar'
import { ConversionAndFaqSection } from '@/components/sections/ConversionAndFaqSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': 'https://chauffagiste-belga.be#business',
    name: 'Chauffagiste-Belga',
    url: 'https://chauffagiste-belga.be',
    telephone: '+3247512345',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BE',
      addressRegion: 'Belgique',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.8503,
      longitude: 4.3517,
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

  return (
    <>
      <JsonLd schema={websiteSchema} />

      {/* 1. Hero Section (Split 45% / 55%) */}
      <HeroSection />

      {/* 2. Services Section (6-card grid) */}
      <ServicesGrid />

      {/* 3. Heating Performance Feature & Zones d'intervention */}
      <ZonesAndPromoSection />

      {/* 4. Trust Strip (5 elements) */}
      <ReassuranceBar />

      {/* 5. Why Choose Us (4 benefit cards) */}
      <WhyChooseUs />

      {/* 6. Reviews (Dark Navy container #082B55) */}
      <TestimonialsSection />

      {/* 7. Statistics (Horizontal block) */}
      <StatsBar />

      {/* 8. Quote + Emergency + FAQ Section (Split 3 columns) */}
      <ConversionAndFaqSection />

      {/* 9. Final Full-Width CTA */}
      <FinalCTASection />
    </>
  )
}
