import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Droplets, Navigation, ShieldCheck } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { getCommuneBySlug, getAllActiveCommuneSlugs, getNearbyCommunes, getNearestMajorHub } from '@/lib/supabase/communes'
import { generateCommuneContent } from '@/lib/seo/spintax'
import { generateCommuneMetadata } from '@/lib/seo/meta'
import { buildCommuneSchemaGraph } from '@/lib/seo/schema'
import { getLocalFaqTemplates } from '@/lib/seo/spintax-data'
import { SymptomsSection } from '@/components/sections/SymptomsSection'
import { SubsidiesSection } from '@/components/sections/SubsidiesSection'

// Modular components matching template-landing-page-chauffagiste-city.png
import { CommuneHero } from '@/components/sections/commune/CommuneHero'
import { CommuneReassuranceBar } from '@/components/sections/commune/CommuneReassuranceBar'
import { CommuneServicesGrid } from '@/components/sections/commune/CommuneServicesGrid'
import { CommuneCoverageSection } from '@/components/sections/commune/CommuneCoverageSection'
import { CommuneWhyChooseUs } from '@/components/sections/commune/CommuneWhyChooseUs'
import { CommuneReviewsDark } from '@/components/sections/commune/CommuneReviewsDark'
import { CommuneFaqAndTips } from '@/components/sections/commune/CommuneFaqAndTips'
import { CommuneBannerCta } from '@/components/sections/commune/CommuneBannerCta'
import { CommuneStickyBar } from '@/components/sections/commune/CommuneStickyBar'

export const revalidate = 86400 // ISR 24h

interface CommunePageProps {
  params: {
    commune: string
  }
}

/**
 * Generate static paths for active Belgian communes
 */
export async function generateStaticParams() {
  const slugs = await getAllActiveCommuneSlugs()
  return slugs.map((slug) => ({
    commune: `chauffagiste-${slug}`,
  }))
}

/**
 * Dynamic SEO metadata per commune
 */
export async function generateMetadata({ params }: CommunePageProps): Promise<Metadata> {
  if (!params.commune.startsWith('chauffagiste-')) return {}
  const slug = params.commune.replace(/^chauffagiste-/, '')
  const commune = await getCommuneBySlug(slug)
  if (!commune) return {}
  return generateCommuneMetadata(commune)
}

export default async function CommunePage({ params }: CommunePageProps) {
  if (!params.commune.startsWith('chauffagiste-')) {
    notFound()
  }

  const slug = params.commune.replace(/^chauffagiste-/, '')
  const commune = await getCommuneBySlug(slug)
  if (!commune) {
    notFound()
  }

  const isMajorCity = Boolean(commune.is_major_hub)
  const content = generateCommuneContent(commune)
  const nearby = await getNearbyCommunes(commune, isMajorCity ? 12 : 8)
  const parentMajorHub = !isMajorCity ? await getNearestMajorHub(commune) : null
  const schemas = buildCommuneSchemaGraph(commune)
  const localFaqs = getLocalFaqTemplates(commune.name_fr).slice(0, isMajorCity ? 6 : 5)
  const postalCode = commune.postal_codes?.[0] ?? ''

  return (
    <div className="bg-white min-h-screen pb-16 sm:pb-0">
      <JsonLd schema={schemas} />

      {/* 1. Hero Split Section with Lead Capture Form Card */}
      <CommuneHero commune={commune} introText={content.introGeneral} />

      {/* 2. Full-Width Dark Blue Reassurance Bar (📍, ⏱, 🛡, ⭐) */}
      <CommuneReassuranceBar communeName={commune.name_fr} />

      {/* 3. "Nos services de chauffage à [Commune]" (6 Cards Grid) */}
      <CommuneServicesGrid communeName={commune.name_fr} />

      {/* 4. Local Technical & Water Data Box */}
      <section className="py-8 bg-slate-50 border-b border-slate-200/80">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Water Hardness */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#FF5400] uppercase tracking-wider block">
                      Qualité de l’eau à {commune.name_fr}
                    </span>
                    <h3 className="font-bold text-base text-brand-dark">
                      Dureté moyenne : {commune.water_hardness_fh ?? 25} °fH
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {content.waterHardnessStatement}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span>Détartrage & désembouage préconisés</span>
                <span className="text-emerald-600">Attestation Cerga</span>
              </div>
            </div>

            {/* Local Logistics & Rapid Dispatch */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      Permanence locale 24h/24
                    </span>
                    <h3 className="font-bold text-base text-brand-dark">
                      Secteur {commune.name_fr} ({postalCode})
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {commune.transit_axes && commune.transit_axes.length > 0
                    ? `Nos unités mobiles de dépannage circulent quotidiennement via ${commune.transit_axes.join(', ')} afin d’assurer une arrivée rapide en moins de 45 minutes.`
                    : `Techniciens locaux équipés de pièces d’origine pour solutionner 95% des pannes au premier passage.`}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span>Sans surcoût de déplacement</span>
                <span className="text-brand-blue">Disponible 7j/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Major City Hub: Symptoms & Boiler Error Codes Diagnostic */}
      {isMajorCity && <SymptomsSection communeName={commune.name_fr} />}

      {/* 6. Zone d’intervention & Communes Limitrophes (3-Part Layout) */}
      <CommuneCoverageSection
        communeName={commune.name_fr}
        nearbyCommunes={nearby}
        parentMajorHub={parentMajorHub}
      />

      {/* 7. "Pourquoi choisir notre chauffagiste à [Commune] ?" (Left text, Right 2x2 cards) */}
      <CommuneWhyChooseUs
        communeName={commune.name_fr}
        trustStatement={content.trustStatement}
      />

      {/* 8. Major City Hub: Regional Energy Subsidies (Renolution / SPW) */}
      {isMajorCity && (
        <SubsidiesSection
          communeName={commune.name_fr}
          provinceSlug={commune.provinces?.slug_fr}
        />
      )}

      {/* 9. "Ils nous font confiance" (Dark Navy Background + 3 White Review Cards) */}
      <CommuneReviewsDark communeName={commune.name_fr} />

      {/* 10. "Chauffagiste à [Commune] : conseils et informations" + FAQ Locale Accordion */}
      <CommuneFaqAndTips
        communeName={commune.name_fr}
        faqs={localFaqs}
      />

      {/* 11. Full-Width Two-Tone CTA Banner (Dark Navy + Orange Curve) */}
      <CommuneBannerCta
        communeName={commune.name_fr}
        ctaText={content.closingCta}
      />

      {/* 12. Mobile Sticky Quick Action Bar */}
      <CommuneStickyBar />
    </div>
  )
}
