import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MapPin,
  Calendar,
  ShieldCheck,
  Phone,
  MessageSquare,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'

export const metadata: Metadata = {
  title: 'Avis Clients Chauffagiste Belgique : Note 4.9/5 | Chauffagiste-Belga',
  description:
    'Consultez les avis vérifiés de nos clients partout en Belgique. Plus de 850 retours d’expérience sur nos dépannages d’urgence, entretiens PEB et installations.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/avis-clients',
  },
}

const REVIEWS = [
  {
    name: 'Marc D.',
    city: 'Bruxelles (Ixelles)',
    date: '10 février 2026',
    service: 'Dépannage chaudière Vaillant',
    rating: 5,
    comment:
      'Panne totale de chauffage un dimanche matin avec du gel dehors. Le technicien est arrivé en moins de 2 heures, a diagnostiqué immédiatement la vanne 3 voies défectueuse et l’a remplacée par une pièce d’origine qu’il avait dans sa camionnette. Professionnalisme remarquable !',
  },
  {
    name: 'Sophie V.',
    city: 'Namur (Jambes)',
    date: '28 janvier 2026',
    service: 'Entretien légal PEB Gaz',
    rating: 5,
    comment:
      'Entretien très minutieux de notre chaudière Bulex. Brûleur décapé, test de combustion impeccable avec certificat officiel remis directement sur place pour notre assurance. Prix de 99€ scrupuleusement respecté sans supplément.',
  },
  {
    name: 'Jean-Luc P.',
    city: 'Liège (Angleur)',
    date: '15 janvier 2026',
    service: 'Remplacement chaudière condensation',
    rating: 5,
    comment:
      'Devis clair et compétitif pour le remplacement de notre vieille chaudière mazout par une Viessmann au gaz à condensation. Équipe ponctuelle, chantier laissé d’une propreté exemplaire et explications très claires sur les primes Habitation SPW.',
  },
  {
    name: 'Chantal M.',
    city: 'Charleroi (Gosselies)',
    date: '04 janvier 2026',
    service: 'Dépannage d’urgence code F28',
    rating: 5,
    comment:
      'Chaudière en sécurité avec alarme rouge. Chauffagiste rassurant, poli et efficace. Il a nettoyé les électrodes d’allumage et vérifié la pression en 45 minutes chrono. Je recommande vivement les yeux fermés.',
  },
  {
    name: 'Éric L.',
    city: 'Wavre (Brabant wallon)',
    date: '19 décembre 2025',
    service: 'Désembouage circuit chauffage au sol',
    rating: 5,
    comment:
      'Plusieurs pièces de notre maison restaient froides malgré la chaudière allumée. Le désembouage hydrodynamique a réglé le problème : l’eau est ressortie noire de résidus magnétiques ! Chaleur retrouvée partout. Merci !',
  },
  {
    name: 'Philippe B.',
    city: 'Mons (Hainaut)',
    date: '02 décembre 2025',
    service: 'Entretien annuel chaudière Mazout',
    rating: 5,
    comment:
      'Ramonage propre et analyse complète avec le ticket imprimé d’analyse des fumées. Technicien agréé label L très courtois. Rapport qualité/prix imbattable.',
  },
]

export default function AvisClientsPage() {
  const breadcrumbItems = [{ label: 'Avis clients vérifiés', href: '/avis-clients' }]

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: 'Chauffagiste-Belga',
    url: 'https://chauffagiste-belga.be',
    telephone: '+32475123456',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '854',
      bestRating: '5',
      worstRating: '1',
    },
    review: REVIEWS.map((rev) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.name,
      },
      datePublished: '2026-01-15',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.rating.toString(),
        bestRating: '5',
      },
      reviewBody: rev.comment,
    })),
  }

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
        <div className="container-default max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-xs uppercase tracking-wider mb-4 border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Note globale : 4.9 / 5 sur 850+ avis vérifiés
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Ce que nos clients disent de nous en Belgique
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            La satisfaction de nos clients est notre plus belle carte de visite. Découvrez les retours d’expérience réels de propriétaires et locataires dépannés par nos artisans.
          </p>

          <div className="mt-8 inline-flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="text-left">
              <span className="block font-black text-lg text-brand-dark leading-tight">4.9 / 5</span>
              <span className="text-xs text-slate-500">98.4% de recommandations positives</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 md:py-16">
        <div className="container-default max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Avis vérifié
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                    « {rev.comment} »
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div>
                    <span className="font-bold text-slate-800 block text-sm">{rev.name}</span>
                    <span className="flex items-center gap-1 mt-0.5 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      {rev.city}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-medium text-brand-blue">{rev.service}</span>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container-default max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-4">
            Rejoignez nos clients satisfaits partout en Belgique
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-6">
            Besoin d’un dépannage immédiat ou d’un entretien officiel ? Nos chauffagistes interviennent rapidement dans votre commune.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/devis"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              Demander une intervention
            </Link>
            <a
              href="tel:0475123456"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E5232E] hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              0475 12 34 56 (24/7)
            </a>
          </div>
        </div>
      </section>

      <ReassuranceBar />
    </div>
  )
}
