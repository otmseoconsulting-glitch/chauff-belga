import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Clock,
  ShieldCheck,
  Flame,
  FileCheck2,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { ZoneSearchFilter } from '@/components/sections/zones/ZoneSearchFilter'
import { getAllCommunesGroupedByProvince } from '@/lib/supabase/communes'
import { CONTACT } from '@/lib/constants/contact'
import { siteUrl } from '@/lib/env'

export async function generateMetadata(): Promise<Metadata> {
  const pageUrl = `${siteUrl}/zones-intervention`
  const title = "Zones d'Intervention Chauffagiste en Belgique | Bruxelles & Wallonie | Belga"
  const description =
    "Découvrez toutes nos zones d'intervention 24/7 pour le dépannage, l'entretien et l'installation de chaudière. Chauffagistes agréés à Bruxelles, Brabant et Wallonie."

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        'fr-BE': pageUrl,
        'x-default': pageUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      locale: 'fr_BE',
      siteName: 'Chauffagiste-Belga',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

const FAQS = [
  {
    q: "Quels sont les délais moyens d'intervention d'urgence selon votre zone d'intervention en Belgique ?",
    a: "Nos artisans chauffagistes interviennent en moyenne en moins de 30 minutes sur les 19 communes de Bruxelles-Capitale et en moins de 45 minutes dans le Brabant Wallon, le Brabant Flamand, le Hainaut, Liège et Namur. Notre permanence téléphonique d'astreinte est active 24h/24 et 7j/7.",
  },
  {
    q: "Facturez-vous des frais de déplacement supplémentaires selon la commune de dépannage ?",
    a: "Non. Chauffagiste-Belga applique une politique tarifaire transparente : nos tarifs de dépannage démarrent à 65 € HTVA avec un forfait de déplacement fixe et sans surprise. Aucun surcoût caché n'est appliqué pour les communes de notre périmètre agréé.",
  },
  {
    q: "Vos techniciens sont-ils agréés par les autorités régionales (Bruxelles Environnement, SPW Énergie) ?",
    a: "Absolument. Chaque chauffagiste de notre réseau détient les certifications régionales obligatoires : Cerga, technicien chaudière gaz agréé G1/G2 (Bruxelles et Wallonie), technicien combustible liquide (mazout/Cedicol), et habilitation pour délivrer l'attestation légale de contrôle périodique PEB.",
  },
  {
    q: "Intervenez-vous pour un dépannage le week-end, la nuit et les jours fériés ?",
    a: "Oui. Nos équipes d'astreinte d'urgence sont opérationnelles 365 jours par an, y compris les dimanches et jours fériés, pour traiter les pannes totales de chauffage, fuites d'eau sur circuit ou codes erreur bloquants.",
  },
  {
    q: "Que faire en attendant l'arrivée du chauffagiste d'urgence à mon domicile ?",
    a: "En cas d'odeur de gaz suspecte, fermez immédiatement le compteur d'arrivée générale et aérez. En cas de fuite d'eau, coupez l'arrivée générale d'eau sanitaire et éteignez la chaudière via son interrupteur bipolaire. Notez le code d'erreur affiché sur l'écran (ex. F28, F22, EA) pour le communiquer à notre technicien.",
  },
]

export default async function ZonesInterventionPage() {
  const groups = await getAllCommunesGroupedByProvince()
  const pageUrl = `${siteUrl}/zones-intervention`

  // Total count of communes
  const totalCommunesCount = groups.reduce((acc, g) => acc + g.communes.length, 0)

  // Schema @graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
            name: "Zones d'intervention",
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'HVACBusiness',
        '@id': `${pageUrl}#business`,
        name: 'Chauffagiste-Belga — Service National Belgique',
        url: pageUrl,
        telephone: CONTACT.phone.e164,
        priceRange: '€€',
        inLanguage: 'fr-BE',
        description:
          "Réseau national d'artisans chauffagistes agréés Cerga intervenant en urgence et sur rendez-vous à Bruxelles, Brabant Wallon, Brabant Flamand, Hainaut, Liège et Namur.",
        areaServed: groups.map((g) => ({
          '@type': 'AdministrativeArea',
          name: g.name_fr,
        })),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  }

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <JsonLd schema={schemaGraph} />

      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-default py-3">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: "Zones d'intervention" },
            ]}
          />
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[#082B55] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="container-default relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold mb-4 backdrop-blur-xs border border-white/15">
            <ShieldCheck className="w-4 h-4 text-[#FF5400]" />
            <span>Couverture Nationale · Techniciens Agréés Régionaux</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-4xl text-white">
            Zones d&apos;Intervention Chauffagiste en Belgique : Bruxelles, Brabant &amp; Wallonie
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Besoin d&apos;un <strong>chauffagiste certifié en Belgique</strong> pour un{' '}
            <strong>dépannage de chaudière</strong>, un entretien annuel obligatoire ou une nouvelle
            installation ? Nos techniciens mobiles couvrent l&apos;ensemble de nos{' '}
            <strong>zones d&apos;intervention</strong> avec une permanence d&apos;astreinte 24h/24 et
            7j/7, garantissant une arrivée rapide à <strong>Bruxelles</strong>, dans le{' '}
            <strong>Brabant</strong> et en <strong>Wallonie</strong>.
          </p>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-[#FF5400]">
                {totalCommunesCount}+
              </div>
              <div className="text-xs text-slate-200 font-semibold mt-1">Communes desservies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-white">≤ 30 min</div>
              <div className="text-xs text-slate-200 font-semibold mt-1">Arrivée à Bruxelles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-white">24/7</div>
              <div className="text-xs text-slate-200 font-semibold mt-1">Astreinte d&apos;urgence</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-200 font-semibold mt-1">Agréé PEB &amp; Cerga</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Directory */}
      <main className="container-default py-10 sm:py-14">
        {/* Interactive Search & Filter */}
        <ZoneSearchFilter groups={groups} />

        {/* 24/7 Emergency Dispatch Banner */}
        <section className="bg-gradient-to-br from-[#051C38] to-[#082B55] rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-16 border border-blue-900/50 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-extrabold uppercase tracking-wide mb-3 border border-red-500/30">
                <Flame className="w-3.5 h-3.5 text-[#E5232E]" />
                Intervention d&apos;Urgence 24h/24 &middot; 7j/7
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Une panne totale de chaudière dans votre commune ?
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Nos équipes d&apos;astreinte sont en patrouille continue. Déplacement immédiat pour fuite
                d&apos;eau sous pression, absence d&apos;eau chaude ou code panne bloquant sur toutes marques
                (Vaillant, Bulex, Viessmann, Junkers, Bosch).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={`tel:${CONTACT.phone.e164}`}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-black text-base bg-[#E5232E] hover:bg-[#D01B25] text-white shadow-lg hover:scale-102 active:scale-98 transition"
              >
                <Phone className="w-5 h-5 fill-white" />
                <span>{CONTACT.phone.display}</span>
              </a>
              <Link
                href="/devis"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
              >
                <span>Demander un devis</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Regulatory Standards Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-16">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#155EEF] mb-2">
              <FileCheck2 className="w-4 h-4" />
              <span>Législation &amp; Sécurité</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#082B55] tracking-tight">
              Obligations Régionales : Contrôle Périodique PEB en Belgique
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              En Belgique, l&apos;entretien de chaudière n&apos;est pas seulement une recommandation
              constructeur : c&apos;est une obligation légale régie par chaque région administrative.
              Nos techniciens sont habilités à délivrer les attestations officielles requises par vos
              assurances habitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200">
              <div className="text-xs font-black text-[#155EEF] uppercase tracking-wider mb-1">
                Région de Bruxelles
              </div>
              <h3 className="text-base font-extrabold text-[#102A43] mb-2">
                Bruxelles Environnement
              </h3>
              <ul className="text-xs text-slate-700 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Gaz</strong> : tous les 2 ans (obligatoire).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mazout</strong> : chaque année.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Attestation PEB officielle remise sur place.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200">
              <div className="text-xs font-black text-[#155EEF] uppercase tracking-wider mb-1">
                Région Wallonne
              </div>
              <h3 className="text-base font-extrabold text-[#102A43] mb-2">
                Réglementation SPW Énergie
              </h3>
              <ul className="text-xs text-slate-700 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Gaz ≤ 100 kW</strong> : tous les 3 ans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Gaz &gt; 100 kW</strong> : tous les 2 ans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mazout</strong> : chaque année obligatoire.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200">
              <div className="text-xs font-black text-[#155EEF] uppercase tracking-wider mb-1">
                Région Flamande (Périphérie)
              </div>
              <h3 className="text-base font-extrabold text-[#102A43] mb-2">
                Décret Flamand VEKA
              </h3>
              <ul className="text-xs text-slate-700 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Gaz</strong> : tous les 2 ans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mazout</strong> : chaque année.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Rapport de combustion conforme aux normes belges.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#155EEF] mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Foire aux questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#082B55] tracking-tight">
              Questions Fréquentes sur nos Zones d&apos;Intervention
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Tout ce que vous devez savoir sur nos interventions, tarifs de déplacement et disponibilités locales.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="group border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/60 open:bg-white open:shadow-xs transition"
              >
                <summary className="font-bold text-sm sm:text-base text-[#102A43] cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 group-open:text-[#155EEF] transition-transform shrink-0" />
                </summary>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
