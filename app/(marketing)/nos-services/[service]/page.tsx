import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronRight, AlertCircle, FileText, Wrench, HelpCircle } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/data/services-data'

export const revalidate = 43200 // 12h

interface ServicePageProps {
  params: {
    service: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs()
  return slugs.map((slug) => ({
    service: slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.service)
  if (!service) return {}

  const canonicalUrl = `https://chauffagiste-belga.be/nos-services/${service.slug}`

  return {
    title: `${service.metaTitle} | Chauffagiste-Belga`,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.metaTitle} | Chauffagiste-Belga`,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: 'Chauffagiste-Belga',
      locale: 'fr_BE',
      type: 'article',
    },
  }
}

const TOP_REGIONAL_HUBS = [
  { name: 'Bruxelles', slug: 'bruxelles', postal: '1000' },
  { name: 'Liège', slug: 'liege', postal: '4000' },
  { name: 'Namur', slug: 'namur', postal: '5000' },
  { name: 'Charleroi', slug: 'charleroi', postal: '6000' },
  { name: 'Mons', slug: 'mons', postal: '7000' },
  { name: 'Wavre', slug: 'wavre', postal: '1300' },
]

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.service)
  if (!service) {
    notFound()
  }

  const pageUrl = `https://chauffagiste-belga.be/nos-services/${service.slug}`

  const serviceSchema: Record<string, unknown> = {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.shortDesc,
    url: pageUrl,
    provider: {
      '@type': 'HVACBusiness',
      name: 'Chauffagiste-Belga',
      telephone: '+3247512345',
      url: 'https://chauffagiste-belga.be',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BE',
        addressLocality: 'Bruxelles',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Belgique',
    },
    offers: {
      '@type': 'Offer',
      price: service.priceFrom.toString(),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumbSchema: Record<string, unknown> = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
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
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: pageUrl,
      },
    ],
  }

  const faqSchema: Record<string, unknown> = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd schema={[serviceSchema, breadcrumbSchema, faqSchema]} />

      {/* Top Breadcrumb Bar */}
      <div className="bg-[#F7F9FC] border-b border-slate-200/80">
        <div className="container-default">
          <Breadcrumb
            items={[
              { label: 'Nos services', href: '/nos-services' },
              { label: service.title },
            ]}
          />
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#F7F9FC] pt-8 pb-14 lg:pt-14 lg:pb-18 border-b border-slate-200/70">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E]">
                  Prestation Certifiée en Belgique
                </span>
                {service.isEmergency && (
                  <span className="text-[11px] font-bold bg-red-100 text-[#E5232E] px-2 py-0.5 rounded">
                    Service d’Urgence 24/7
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#102A43] tracking-tight leading-[1.15] mb-5">
                {service.h1}
              </h1>

              <p className="text-base sm:text-[17px] text-[#64748B] font-normal leading-relaxed mb-6">
                {service.tagline}
              </p>

              {/* 3 Quick Badges */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-lg mb-8">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Tarif transparent</span>
                  <span className="font-display font-extrabold text-[#102A43] text-base sm:text-lg">
                    Dès {service.priceFrom} €
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Agrément</span>
                  <span className="font-display font-extrabold text-[#102A43] text-base sm:text-lg">
                    Cerga & PEB
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Garantie</span>
                  <span className="font-display font-extrabold text-[#102A43] text-base sm:text-lg">
                    2 ans pièces
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-4">
                <a
                  href="tel:0475123456"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-7 py-4 rounded-full shadow-cta-red transition-all text-[15px]"
                >
                  <Phone className="h-4 w-4 fill-white" />
                  <span>Appeler maintenant 0475 12 34 56</span>
                </a>

                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#102A43] font-semibold px-7 py-4 rounded-full border border-slate-300 shadow-subtle transition-colors text-[15px] group"
                >
                  <span>Demander un devis gratuit</span>
                  <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <span className="text-xs text-slate-500">
                Interventions dans tout le territoire belge • Devis sans engagement
              </span>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-2xl bg-[#082B55] text-white shadow-xl border border-slate-700/60">
                <div className="flex items-center gap-2 mb-4 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Conformité & Normes Belges</span>
                </div>

                <h3 className="font-display text-2xl font-bold mb-3 text-white">
                  {service.title} certifié en Belgique
                </h3>

                <p className="text-[14px] text-slate-300 leading-relaxed mb-6">
                  Nos techniciens interviennent avec l’outillage homologué et délivrent les documents officiels conformes
                  aux exigences des assureurs et des administrations régionales (Bruxelles Environnement et SPW Énergie).
                </p>

                <div className="space-y-3 border-t border-slate-700/80 pt-5 text-[13px] text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Attestation de conformité officielle signée</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Facture détaillée avec TVA 6% (logements &gt; 10 ans)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Pièces d’origine fabricant garanties 24 mois</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Disponibilité immédiate</span>
                  <span className="text-xs font-bold text-white bg-[#155EEF] px-3 py-1 rounded-full">
                    7j/7 sans interruption
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Detailed Technical Guide & Editorial Deep-Dive */}
      <section className="section-padding bg-white border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-slate max-w-none text-[16px] leading-relaxed text-slate-700">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102A43] mb-6">
                Guide d’expert : tout ce qu’il faut savoir sur le service {service.title.toLowerCase()}
              </h2>

              {service.longDescription.map((paragraph, i) => (
                <p key={i} className="mb-5 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Legal Obligation Callout Box */}
              <div className="my-8 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-base text-amber-900 mb-1.5">
                    Cadre légal et exigences des assurances en Belgique
                  </h3>
                  <p className="text-[14px] text-amber-800 leading-relaxed m-0">
                    {service.legalObligationText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Transparent Pricing Tiers */}
      <section className="section-padding bg-[#F7F9FC] border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mb-12">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
              Transparence budgétaire
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#102A43] tracking-tight leading-tight">
              Tarifs indicatifs pour {service.title.toLowerCase()}
            </h2>
            <p className="text-[15px] text-[#64748B] mt-2">
              Prix clairs et sans surprise. Taux de TVA réduit à 6% applicable pour les logements privés de plus de 10 ans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {service.pricingTiers.map((tier) => (
              <div
                key={tier.label}
                className={`p-7 rounded-2xl bg-white border flex flex-col justify-between transition-all ${
                  tier.popular
                    ? 'border-[#155EEF] shadow-lg relative ring-2 ring-[#155EEF]/20'
                    : 'border-slate-200/80 shadow-subtle'
                }`}
              >
                <div>
                  {tier.popular && (
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider bg-[#155EEF] text-white px-3 py-1 rounded-full mb-3">
                      Recommandé
                    </span>
                  )}
                  <h3 className="font-display font-bold text-lg text-[#102A43] mb-2">
                    {tier.label}
                  </h3>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#102A43] mb-4">
                    {tier.price}
                  </div>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="/devis"
                    className={`inline-flex items-center justify-center gap-2 w-full font-bold py-3 px-4 rounded-xl text-xs transition-colors ${
                      tier.popular
                        ? 'bg-[#E5232E] hover:bg-[#D01B25] text-white shadow-cta-red'
                        : 'bg-slate-100 hover:bg-slate-200 text-[#102A43]'
                    }`}
                  >
                    <span>Sélectionner cette formule</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 4-Step Technical Protocol */}
      <section className="section-padding bg-white border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mb-12">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#155EEF] block mb-2">
              Méthodologie professionnelle
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#102A43] tracking-tight leading-tight">
              Comment se déroule notre intervention en 4 étapes
            </h2>
            <p className="text-[15px] text-[#64748B] mt-2">
              Une rigueur technique absolue pour assurer la sécurité et la conformité légale de votre installation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.interventionSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-[#155EEF] mb-3 block">
                    {step.number}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#102A43] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Common Problems Checklist & Brands */}
      <section className="section-padding bg-[#F7F9FC] border-b border-slate-200/80">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Problems list */}
            <div className="lg:col-span-7">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
                Signaux d’alerte fréquents
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102A43] mb-6">
                Quand devez-vous solliciter ce service ?
              </h2>

              <div className="space-y-3.5">
                {service.commonProblems.map((problem, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/80">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[14px] text-slate-700 font-medium leading-relaxed">
                      {problem}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Supported Brands */}
            <div className="lg:col-span-5">
              <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider block mb-2">
                  Agrément constructeur
                </span>
                <h3 className="font-display font-bold text-xl text-[#102A43] mb-3">
                  Marques prises en charge
                </h3>
                <p className="text-[13px] text-[#64748B] mb-6">
                  Nos camionnettes disposent de pièces d’origine pour l’ensemble des fabricants distribués en Belgique :
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.supportedBrands.map((brand) => (
                    <span
                      key={brand}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-[#102A43] border border-slate-200"
                    >
                      {brand}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/devis"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#082B55] hover:bg-[#102A43] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors"
                  >
                    <span>Vérifier ma marque pour un devis</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="section-padding bg-white border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
                Foire aux questions
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
                Questions fréquentes sur le service {service.title.toLowerCase()}
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-[#F7F9FC] border border-slate-200/80 p-6"
                >
                  <h3 className="font-display font-bold text-base sm:text-[17px] text-[#102A43] mb-2 flex items-center justify-between">
                    <span>{faq.question}</span>
                    <HelpCircle className="h-5 w-5 text-slate-400 shrink-0 ml-3" />
                  </h3>
                  <p className="text-[14px] text-[#64748B] leading-relaxed m-0">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Hub-to-Spoke Geographic Interlinking Bridge */}
      <section className="section-padding bg-[#F7F9FC] border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl mb-8">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#155EEF] block mb-2">
              Proximité régionale
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102A43]">
              Faire intervenir un chauffagiste pour « {service.title} » dans votre agglomération
            </h2>
            <p className="text-[14px] text-[#64748B] mt-2">
              Consultez notre disponibilité immédiate et nos délais de route par pôle urbain :
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {TOP_REGIONAL_HUBS.map((hub) => (
              <Link
                key={hub.slug}
                href={`/chauffagiste-${hub.slug}`}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#155EEF]/50 transition-all text-center group shadow-subtle"
              >
                <strong className="font-display text-[15px] text-[#102A43] group-hover:text-[#E5232E] transition-colors block">
                  {hub.name}
                </strong>
                <span className="text-xs text-slate-400 font-mono block mt-0.5">Secteur {hub.postal}</span>
                <span className="text-[11px] font-bold text-[#155EEF] mt-2 inline-flex items-center gap-0.5">
                  Intervention locale <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Reassurance Bar */}
      <ReassuranceBar />

      {/* 9. Final CTA */}
      <FinalCTASection />
    </>
  )
}
