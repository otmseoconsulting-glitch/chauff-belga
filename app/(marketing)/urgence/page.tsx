import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Clock,
  ShieldAlert,
  Flame,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  FileCheck2,
  Wrench,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { LeadForm } from '@/components/forms/LeadForm'
import { CONTACT } from '@/lib/constants/contact'
import { siteUrl } from '@/lib/env'

export const metadata: Metadata = {
  title: 'Dépannage Chauffage Urgence 24/7 en Belgique | Chauffagiste-Belga',
  description:
    'Urgence chaudière et chauffage 7j/7, 24h/24 en Belgique. Intervention rapide en moins de 2h par un artisan chauffagiste agréé Cerga. Appel direct 0475 12 34 56.',
  alternates: {
    canonical: `${siteUrl}/urgence`,
  },
  openGraph: {
    title: 'Urgence Chauffagiste 24/7 Belgique | Chauffagiste-Belga',
    description:
      'Panne de chaudière, fuite de gaz ou absence de chauffage ? Techniciens d’astreinte disponibles immédiatement dans toute la Belgique.',
    url: `${siteUrl}/urgence`,
    type: 'website',
  },
}

const EMERGENCY_SERVICES = [
  {
    title: 'Panne totale de chauffage & eau chaude',
    desc: 'Diagnostic immédiat du brûleur, de la pompe de circulation ou de la carte électronique.',
    delay: '≤ 2h sur place',
    price: 'Dès 65 €',
    badge: 'Urgence absolue',
  },
  {
    title: 'Fuite d’eau sur chaudière ou radiateur',
    desc: 'Sécurisation immédiate du circuit hydraulique, colmatage et remplacement de raccords sous pression.',
    delay: '≤ 2h sur place',
    price: 'Dès 65 €',
    badge: 'Sécurisation',
  },
  {
    title: 'Code erreur bloquant (F28, F22, F4, EA...)',
    desc: 'Réinitialisation sécurisée et dépannage multi-marques : Vaillant, Bulex, Viessmann, Bosch, Junkers.',
    delay: 'Intervention jour même',
    price: 'Dès 65 €',
    badge: 'Multi-marques',
  },
  {
    title: 'Odeur suspecte ou mise en sécurité gaz',
    desc: 'Contrôle d’étanchéité à la bombe moussante et détecteur de monoxyde de carbone (CO) certifié.',
    delay: 'Priorité Vitale P0',
    price: 'Devis clair',
    badge: 'Agréé Cerga',
  },
]

const MAJOR_CITIES_EMERGENCY = [
  { name: 'Bruxelles & 19 communes', slug: 'bruxelles', delay: '30 à 45 min' },
  { name: 'Liège & Agglomération', slug: 'liege', delay: '30 à 50 min' },
  { name: 'Namur & Province', slug: 'namur', delay: '40 à 60 min' },
  { name: 'Charleroi & Hainaut', slug: 'charleroi', delay: '35 à 55 min' },
  { name: 'Mons & Borinage', slug: 'mons', delay: '40 à 60 min' },
  { name: 'Brabant Wallon (Wavre, Nivelles)', slug: 'wavre', delay: '30 à 45 min' },
]

export default function UrgencePage() {
  const emergencySchema = {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    name: 'Chauffagiste-Belga — Service d’Urgence Chauffage 24/7',
    telephone: CONTACT.phone.e164,
    url: `${siteUrl}/urgence`,
    areaServed: {
      '@type': 'Country',
      name: 'Belgium',
    },
    openingHoursSpecification: {
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
    serviceType: 'Dépannage Chauffage & Chaudière d’Urgence',
  }

  return (
    <div className="bg-white min-h-screen">
      <JsonLd schema={emergencySchema} />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container-default py-3">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Dépannage d’urgence 24/7' },
            ]}
          />
        </div>
      </div>

      {/* 1. Hero Section - Red / Amber Emergency High Conversion */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#082B55] via-[#0B396E] to-[#082B55] text-white py-12 md:py-20">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider mb-6 animate-pulse">
                <Flame className="w-4 h-4 text-amber-300" />
                Service d’Astreinte 24h/24 & 7j/7 en Belgique
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Urgence Chauffage & Dépannage Chaudière{' '}
                <span className="text-[#FF5400] underline decoration-[#FF5400]/40">
                  ≤ 2 heures sur place
                </span>
              </h1>

              <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-2xl">
                Plus d’eau chaude ou radiateurs glacés ? Nos techniciens chauffagistes agréés{' '}
                <strong className="text-white font-bold">Cerga & PEB</strong> interviennent en urgence absolue dans tout Bruxelles, le Brabant et la Wallonie.
              </p>

              {/* Direct Emergency Call Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <a
                  href={`tel:${CONTACT.phone.e164}`}
                  className="flex items-center justify-center gap-3.5 px-8 py-5 rounded-2xl bg-[#FF5400] hover:bg-[#E04B00] text-white font-extrabold text-xl shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="w-7 h-7 fill-white animate-bounce" />
                  <span>APPELER LE {CONTACT.phone.display}</span>
                </a>
                <span className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 text-center">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  Ligne directe sans attente • 24h/24 7j/7
                </span>
              </div>

              {/* Trust Reassurance Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/15 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Agrément Cerga Gaz</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Arrivée garantie ≤ 2h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tarif annoncé avant travaux</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900">
                <div className="mb-5 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#FF5400] uppercase tracking-wider block">
                    Formulaire Prioritaire
                  </span>
                  <h2 className="text-xl font-black text-brand-dark">
                    Demander une intervention d’urgence
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Un technicien d’astreinte vous rappelle sous 15 minutes.
                  </p>
                </div>
                <LeadForm
                  variant="emergency"
                  initialService="depannage-chaudiere"
                  sourceUrl="/urgence"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Critical Gas & CO Safety Intercept Box */}
      <section className="py-8 bg-red-50 border-y border-red-200">
        <div className="container-default">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 bg-white p-6 rounded-2xl border-2 border-red-500 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-black text-red-700">
                Vous suspectez une odeur de gaz ou une fuite de monoxyde de carbone (CO) ?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                <strong>Consignes immédiates :</strong> Ne touchez à aucun interrupteur électrique ni sonnette. Fermez immédiatement le compteur général de gaz, aérez toutes les pièces, évacuez les occupants et composez depuis l’extérieur le <strong>112</strong> (Pompiers) ou notre permanence d’urgence au{' '}
                <a href={`tel:${CONTACT.phone.e164}`} className="underline font-bold text-red-700">
                  {CONTACT.phone.display}
                </a>.
              </p>
            </div>
            <a
              href={`tel:${CONTACT.phone.e164}`}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shrink-0 whitespace-nowrap shadow-md transition-colors"
            >
              Appel d’urgence immédiat
            </a>
          </div>
        </div>
      </section>

      {/* 3. Emergency Breakdown Types Grid */}
      <section className="py-16 bg-white">
        <div className="container-default">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#FF5400] uppercase tracking-wider block mb-2">
              Dépannage Toutes Marques
            </span>
            <h2 className="text-3xl font-black text-brand-dark tracking-tight">
              Pannes traitées en priorité par nos équipes
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Nos camionnettes d’intervention sont équipées des pièces d’usure d’origine des principales marques agréées en Belgique (Vaillant, Bulex, Viessmann, Bosch, Junkers).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EMERGENCY_SERVICES.map((srv, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#FF5400] uppercase bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {srv.badge}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {srv.delay}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-brand-dark mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{srv.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-brand-dark">{srv.price}</span>
                  <a
                    href={`tel:${CONTACT.phone.e164}`}
                    className="text-xs font-bold text-[#FF5400] hover:underline flex items-center gap-1"
                  >
                    Dépanner <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Coverage Zones for Emergency Dispatch */}
      <section className="py-14 bg-slate-50 border-t border-slate-200/80">
        <div className="container-default">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#FF5400] uppercase tracking-wider block mb-1">
                Permanence Nationale
              </span>
              <h2 className="text-2xl font-black text-brand-dark">
                Zones d’astreinte rapide en Belgique
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Des artisans chauffagistes locaux sont géolocalisés en continu pour acheminer les pièces et réparer votre installation au plus vite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MAJOR_CITIES_EMERGENCY.map((city, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-dark">{city.name}</h3>
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      Délai moyen : {city.delay}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/chauffagiste-${city.slug}`}
                  className="text-xs text-slate-400 hover:text-brand-dark p-2 rounded-lg hover:bg-slate-50"
                  aria-label={`Voir la page dépannage ${city.name}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sticky Bottom Action on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#082B55] p-3 shadow-2xl border-t border-white/20">
        <a
          href={`tel:${CONTACT.phone.e164}`}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FF5400] text-white font-extrabold text-base shadow-lg"
        >
          <Phone className="w-5 h-5 fill-white animate-bounce" />
          <span>URGENCE DÉPANNAGE : {CONTACT.phone.display}</span>
        </a>
      </div>
    </div>
  )
}
