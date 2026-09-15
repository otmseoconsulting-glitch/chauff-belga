import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, ShieldCheck, Clock, FileText, CheckCircle2, ChevronRight, Wrench, Flame, Droplets, Zap, Shield, Sparkles } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { NATIONAL_SERVICES } from '@/lib/data/services-data'

export const metadata: Metadata = {
  title: 'Nos Services Chauffage & Plomberie en Belgique | Chauffagiste-Belga',
  description: 'Découvrez l’ensemble de nos prestations certifiées en Belgique : dépannage chaudière 24/7, entretien légal PEB, installation, pompe à chaleur et débouchage.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/nos-services',
  },
  openGraph: {
    title: 'Nos Services Chauffage & Plomberie en Belgique | Chauffagiste-Belga',
    description: 'Services certifiés Cerga et techniciens agréés PEB partout en Belgique. Dépannage en ≤ 2h, devis gratuit et prix transparents.',
    url: 'https://chauffagiste-belga.be/nos-services',
    siteName: 'Chauffagiste-Belga',
    locale: 'fr_BE',
    type: 'website',
  },
}

const SERVICE_ICONS: Record<string, typeof Wrench> = {
  'depannage-chaudiere': Flame,
  'entretien-chaudiere': ShieldCheck,
  'installation-chauffage': Wrench,
  'reparation-chaudiere': Wrench,
  'regulation-thermostat': Zap,
  'chauffage-sol': Sparkles,
  'pompe-chaleur': Zap,
  'debouchage': Droplets,
}

const TOP_REGIONAL_HUBS = [
  { name: 'Bruxelles', slug: 'bruxelles', postal: '1000' },
  { name: 'Liège', slug: 'liege', postal: '4000' },
  { name: 'Namur', slug: 'namur', postal: '5000' },
  { name: 'Charleroi', slug: 'charleroi', postal: '6000' },
  { name: 'Mons', slug: 'mons', postal: '7000' },
  { name: 'Wavre', slug: 'wavre', postal: '1300' },
]

export default function ServicesHubPage() {
  const servicesList = Object.values(NATIONAL_SERVICES)

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://chauffagiste-belga.be',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Nos services',
        item: 'https://chauffagiste-belga.be/nos-services',
      },
    ],
  }

  return (
    <>
      <JsonLd schema={[breadcrumbSchema]} />

      {/* Top Breadcrumb Bar */}
      <div className="bg-[#F7F9FC] border-b border-slate-200/80">
        <div className="container-default">
          <Breadcrumb items={[{ label: 'Nos services' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F7F9FC] pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200/70">
        <div className="container-default">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] mb-3 block">
              Expertise HVAC & Plomberie en Belgique
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#102A43] tracking-tight leading-[1.12] mb-5">
              Nos services de <span className="text-[#E5232E]">chauffage</span> certifiés Cerga & PEB
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
              Du dépannage d’urgence 24/7 à l’installation de pompes à chaleur de dernière génération, nos équipes
              mobiles certifiées interviennent avec rigueur et transparence tarifaire dans toute la Belgique.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:0475123456"
                className="inline-flex items-center justify-center gap-2.5 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-8 py-4 rounded-full shadow-cta-red transition-all text-[15px] w-full sm:w-auto"
              >
                <Phone className="h-4 w-4 fill-white" />
                <span>Urgence dépannage 0475 12 34 56</span>
              </a>

              <Link
                href="/devis"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#102A43] font-semibold px-8 py-4 rounded-full border border-slate-300 shadow-subtle transition-colors text-[15px] w-full sm:w-auto group"
              >
                <span>Demander un devis en ligne</span>
                <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (All 8 National Services) */}
      <section className="section-padding bg-white border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mb-12">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
              Catalogue des prestations
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#102A43] tracking-tight leading-tight">
              8 services techniques pour votre confort thermique
            </h2>
            <p className="text-[15px] text-[#64748B] mt-2">
              Cliquez sur un service pour découvrir le protocole complet, les exigences légales belges et les grilles de prix détaillées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Wrench

              return (
                <div
                  key={service.slug}
                  className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 shadow-subtle hover:shadow-card-hover hover:border-[#155EEF]/50 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF] group-hover:bg-[#155EEF] group-hover:text-white transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      {service.isEmergency ? (
                        <span className="text-[11px] font-extrabold uppercase tracking-wider bg-red-100 text-[#E5232E] px-2.5 py-1 rounded-md">
                          Urgence 24/7
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          Agréé Cerga
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#102A43] mb-2 group-hover:text-[#155EEF] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-[13px] text-[#64748B] leading-relaxed mb-5">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between mb-4">
                      <span className="text-xs text-slate-500 font-medium">Tarif transparent</span>
                      <span className="font-display font-extrabold text-[#102A43] text-base">
                        Dès {service.priceFrom} €
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/nos-services/${service.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#082B55] hover:bg-[#102A43] text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-colors"
                      >
                        <span>Guide complet</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        href="/devis"
                        className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[#082B55] text-xs font-semibold py-2.5 px-3 rounded-lg border border-slate-300 transition-colors"
                      >
                        <span>Devis</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Belgian Legal Framework Table */}
      <section className="section-padding bg-[#F7F9FC] border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
              Conformité & Cadre Réglementaire
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
              Obligations légales de chauffage en Belgique
            </h2>
            <p className="text-[15px] text-[#64748B] mt-2">
              Ce que la loi belge (législation PEB et baux locatifs) impose à chaque propriétaire et locataire.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-[#082B55] text-white text-xs uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-4 px-6">Type d’équipement</th>
                    <th className="py-4 px-6">Fréquence obligatoire</th>
                    <th className="py-4 px-6">Région</th>
                    <th className="py-4 px-6">Document légal remis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[#102A43]">Chaudière Gaz naturel</td>
                    <td className="py-4 px-6">Tous les 2 ans</td>
                    <td className="py-4 px-6">Bruxelles & Wallonie</td>
                    <td className="py-4 px-6 text-emerald-700 font-bold">Attestation PEB Gaz</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-4 px-6 font-semibold text-[#102A43]">Chaudière Mazout (fioul)</td>
                    <td className="py-4 px-6">Chaque année (annuel)</td>
                    <td className="py-4 px-6">Toute la Belgique</td>
                    <td className="py-4 px-6 text-emerald-700 font-bold">Attestation PEB Mazout + Ramonage</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[#102A43]">Nouvelle Installation Gaz</td>
                    <td className="py-4 px-6">À la mise en service</td>
                    <td className="py-4 px-6">Toute la Belgique</td>
                    <td className="py-4 px-6 text-emerald-700 font-bold">Certificat Cerga Art. 48</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-4 px-6 font-semibold text-[#102A43]">Pompe à chaleur (&gt; 5t CO2)</td>
                    <td className="py-4 px-6">Chaque année</td>
                    <td className="py-4 px-6">Toute la Belgique</td>
                    <td className="py-4 px-6 text-emerald-700 font-bold">Contrôle d’étanchéité RESCert</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Hub-to-Spoke Geographic Connection */}
      <section className="section-padding bg-white border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mb-10">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#155EEF] block mb-2">
              Réseau d’intervention local
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#102A43] tracking-tight leading-tight">
              Nos chauffagistes dans votre agglomération
            </h2>
            <p className="text-[14px] text-[#64748B] mt-2">
              Retrouvez nos équipes locales et nos délais garantis pour votre commune spécifique.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOP_REGIONAL_HUBS.map((hub) => (
              <Link
                key={hub.slug}
                href={`/chauffagiste-${hub.slug}`}
                className="p-4 rounded-xl bg-[#F7F9FC] border border-slate-200/80 hover:border-[#155EEF]/50 hover:bg-white transition-all text-center group"
              >
                <span className="text-xs text-slate-400 block font-mono">Code {hub.postal}</span>
                <strong className="font-display text-[15px] text-[#102A43] group-hover:text-[#E5232E] transition-colors block mt-1">
                  {hub.name}
                </strong>
                <span className="text-[11px] text-[#155EEF] font-semibold mt-1 inline-flex items-center gap-0.5">
                  Voir secteur <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance Bar */}
      <ReassuranceBar />

      {/* Final CTA */}
      <FinalCTASection />
    </>
  )
}
