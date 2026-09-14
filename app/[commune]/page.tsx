import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, ShieldCheck, Clock, UserCheck, FileText, Star, Droplets, Navigation, CheckCircle2, ChevronDown } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NearbyCommunes } from '@/components/sections/NearbyCommunes'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { getCommuneBySlug, getAllActiveCommuneSlugs, getNearbyCommunes } from '@/lib/supabase/communes'
import { generateCommuneContent } from '@/lib/seo/spintax'
import { generateCommuneMetadata } from '@/lib/seo/meta'
import { buildCommuneSchemaGraph } from '@/lib/seo/schema'
import { getLocalFaqTemplates } from '@/lib/seo/spintax-data'

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

  const content = generateCommuneContent(commune)
  const nearby = await getNearbyCommunes(commune.id, 8)
  const schemas = buildCommuneSchemaGraph(commune)
  const localFaqs = getLocalFaqTemplates(commune.name_fr)
  const postalCode = commune.postal_codes?.[0] ?? ''

  return (
    <>
      <JsonLd schema={schemas} />

      {/* Top Breadcrumb Bar */}
      <div className="bg-[#F7F9FC] border-b border-slate-200/80">
        <div className="container-default">
          <Breadcrumb items={[{ label: `Chauffagiste ${commune.name_fr}` }]} />
        </div>
      </div>

      {/* 1. Localized Hero Section */}
      <section className="relative overflow-hidden bg-[#F7F9FC] pt-8 pb-14 lg:pt-14 lg:pb-18 border-b border-slate-200/70">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (Copy & Localized CTA) */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] mb-3">
                Chauffagiste Agréé à {commune.name_fr} ({postalCode})
              </span>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#102A43] tracking-tight leading-[1.12] mb-5">
                Votre <span className="text-[#E5232E]">chauffage</span> entre de bonnes mains à {commune.name_fr}
              </h1>

              <p className="text-base sm:text-[17px] text-[#64748B] max-w-xl font-normal leading-relaxed mb-8">
                {content.introDepannage}
              </p>

              {/* 4 Trust Feature Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
                <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-[13px] font-bold text-[#102A43] leading-tight">≤ 2h d&apos;attente</span>
                  <span className="text-[11px] text-[#64748B] font-medium mt-0.5">{commune.name_fr}</span>
                </div>

                <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <span className="text-[13px] font-bold text-[#102A43] leading-tight">Agréé Cerga</span>
                  <span className="text-[11px] text-[#64748B] font-medium mt-0.5">Certifié PEB</span>
                </div>

                <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-[13px] font-bold text-[#102A43] leading-tight">Devis gratuit</span>
                  <span className="text-[11px] text-[#64748B] font-medium mt-0.5">Sans surprise</span>
                </div>

                <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-[13px] font-bold text-[#102A43] leading-tight">Garantie 2 ans</span>
                  <span className="text-[11px] text-[#64748B] font-medium mt-0.5">Pièces & M.O.</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-7">
                <a
                  href="tel:0475123456"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-7 py-4 rounded-full shadow-cta-red transition-all text-[15px]"
                >
                  <Phone className="h-4 w-4 fill-white" />
                  <span>Appeler maintenant 0475 12 34 56</span>
                </a>

                <a
                  href="#devis"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#102A43] font-semibold px-7 py-4 rounded-full border border-slate-300 shadow-subtle transition-colors text-[15px] group"
                >
                  <span>Demander un devis à {commune.name_fr}</span>
                  <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-2 text-[14px] text-[#64748B] font-medium">
                <div className="flex items-center text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <span className="font-extrabold text-[#102A43]">4,8/5</span>
                <span>sur Google</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#64748B] font-semibold">Techniciens locaux à {commune.name_fr}</span>
              </div>
            </div>

            {/* Right Column: Visual Technician & Localized Badges */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-2xl bg-[#082B55] aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 flex items-center justify-center border border-slate-700/50">
                <div className="absolute inset-0 bg-linear-to-tr from-[#051C38] via-[#082B55] to-[#123E73] opacity-95" />

                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between text-slate-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-[#051C38]/80 px-3.5 py-1.5 rounded-lg border border-slate-700/60 backdrop-blur-xs">
                      <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
                      <span className="text-xs font-mono font-medium text-emerald-300">
                        Technicien de garde • Secteur {postalCode}
                      </span>
                    </div>
                  </div>

                  <div className="my-auto text-center px-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/30 text-[#E5232E] mb-3">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <p className="text-white font-display font-black text-xl tracking-tight">
                      Dépannage Chaudière à {commune.name_fr}
                    </p>
                    <p className="text-slate-300 text-[13px] mt-1.5 max-w-sm mx-auto">
                      Intervention rapide avec pièces détachées d&apos;origine en stock dans notre véhicule
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/80 pt-3.5">
                    <span className="font-medium text-slate-300">Code postal : {postalCode}</span>
                    <span className="font-bold text-white tracking-wide">Chauffagiste-Belga</span>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-20 bg-[#082B55]/95 border border-slate-600/80 text-white rounded-xl p-3.5 shadow-2xl backdrop-blur-xs flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#155EEF]/20 text-[#155EEF]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold tracking-wider text-[#155EEF] uppercase">Dépannage d&apos;urgence</span>
                    <span className="text-[17px] font-black text-white leading-none my-0.5">≤ 2h</span>
                    <span className="text-[10px] text-slate-300">sur {commune.name_fr}</span>
                  </div>
                </div>

                {/* Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 bg-white text-[#102A43] rounded-xl p-3.5 shadow-xl border border-slate-200/90 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-slate-300 shrink-0 shadow-xs">
                    <div className="grid grid-cols-3 h-full w-full">
                      <div className="bg-black h-full w-full" />
                      <div className="bg-[#FFD100] h-full w-full" />
                      <div className="bg-[#E5232E] h-full w-full" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#64748B]">Zone d&apos;intervention couverte</span>
                    <span className="text-[13px] font-bold text-[#102A43] leading-tight">
                      {commune.name_fr} & communes voisines
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Local Technical Data Section: Water Hardness & Local Logistics */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Water Hardness Box */}
            <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#E5232E] uppercase tracking-wider block">
                      Qualité de l&apos;eau à {commune.name_fr}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#102A43]">
                      Dureté de l&apos;eau : {commune.water_hardness_fh ?? 25} °fH
                    </h3>
                  </div>
                </div>
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                  {content.waterHardnessStatement}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#082B55]">
                <span>Contrôle calcaire inclus dans l&apos;entretien</span>
                <span className="text-[#155EEF]">Cerga Recommandé</span>
              </div>
            </div>

            {/* Local Logistics & Rapid Dispatch */}
            <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider block">
                      Logistique & Déplacement
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#102A43]">
                      Accès direct secteur {commune.name_fr}
                    </h3>
                  </div>
                </div>
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                  {commune.transit_axes && commune.transit_axes.length > 0
                    ? `Nos techniciens circulent quotidiennement via ${commune.transit_axes.join(', ')} afin de garantir un délai de route de moins de 2 heures.`
                    : `Nos unités mobiles disposent d'un stock de pièces de rechange d'origine pour résoudre 95% des pannes au premier passage sans délai d'attente.`}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#082B55]">
                <span>Déplacement standard sans surcoût</span>
                <span className="text-[#22C55E]">Disponible 7j/7</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <ServicesGrid />

      {/* 4. Local Editorial Content Block (Spintax rendered) */}
      <section className="section-padding bg-[#F7F9FC] border-y border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
              Expertise chauffage certifiée
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
              Chauffagiste-Belga : votre partenaire de confiance à {commune.name_fr}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#102A43] mb-3">
                  Entretien périodique légal PEB
                </h3>
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                  {content.introEntretien}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                <span>Rapport de combustion conforme aux assurances</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#102A43] mb-3">
                  Agréments officiels & sécurité
                </h3>
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                  {content.trustCertifications}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#155EEF]">
                <ShieldCheck className="h-4 w-4" />
                <span>Certification Cerga gaz naturel & mazout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Reassurance Bar */}
      <ReassuranceBar />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. Localized FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-default">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
                Foire aux questions
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
                Questions fréquentes — Chauffagiste {commune.name_fr}
              </h2>
            </div>

            <div className="space-y-3">
              {localFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-[#F7F9FC] border border-slate-200/80 p-5 sm:p-6"
                >
                  <h3 className="font-display font-bold text-[16px] text-[#102A43] mb-2 flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  </h3>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Nearby Communes Network (Hub-and-spoke PostGIS) */}
      <NearbyCommunes
        currentCommuneName={commune.name_fr}
        nearbyCommunes={nearby}
      />

      {/* 9. Final Local CTA */}
      <FinalCTASection />
    </>
  )
}
