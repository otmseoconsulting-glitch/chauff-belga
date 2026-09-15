import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ShieldCheck,
  Clock,
  FileCheck2,
  Euro,
  Wrench,
  Leaf,
  CheckCircle2,
  Phone,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'

export const metadata: Metadata = {
  title: 'Nos Engagements Qualité & Charte Confiance | Chauffagiste-Belga',
  description:
    'Découvrez la charte d’engagements de Chauffagiste-Belga : réactivité ≤ 24h, attestations légales PEB Cerga, pièces d’origine garanties et transparence tarifaire en Belgique.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/nos-engagements',
  },
}

const ENGAGEMENTS = [
  {
    icon: Clock,
    title: '1. Réactivité & Urgences 24h/24',
    desc: 'Face à un manque total de chauffage ou une fuite d’eau en hiver, nous mobilisons nos équipes pour intervenir en moins de 24h partout en Belgique.',
  },
  {
    icon: ShieldCheck,
    title: '2. Techniciens 100% Certifiés Cerga',
    desc: 'Chaque artisan intervenant à votre domicile possède les agréments officiels gaz (G1/G2) ou mazout (L) délivrés par Bruxelles Environnement ou la Région Wallonne.',
  },
  {
    icon: FileCheck2,
    title: '3. Délivrance de l’Attestation PEB Officielle',
    desc: 'Après chaque entretien, vous recevez sur place votre rapport de combustion et votre certificat officiel de conformité indispensable pour votre assurance habitation.',
  },
  {
    icon: Euro,
    title: '4. Transparence Tarifaire Sans Surprise',
    desc: 'Nos prix sont annoncés avant l’intervention. En cas de pièce à changer, un devis clair vous est soumis pour accord avant tout démontage ou réparation.',
  },
  {
    icon: Wrench,
    title: '5. Pièces Détachées d’Origine Constructeur',
    desc: 'Nous utilisons exclusivement des composants neufs certifiés par les constructeurs (Vaillant, Bulex, Viessmann, Bosch), couverts par la garantie d’usine.',
  },
  {
    icon: Leaf,
    title: '6. Économies d’Énergie & Éco-Responsabilité',
    desc: 'Nous réglons précisément votre brûleur et vos circulateurs pour maximiser le rendement calorifique et réduire jusqu’à 20% votre consommation de combustible.',
  },
]

export default function NosEngagementsPage() {
  const breadcrumbItems = [{ label: 'Nos engagements', href: '/nos-engagements' }]

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
        <div className="container-default max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-4 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Charte de confiance artisanale
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Nos 6 engagements pour votre confort et votre sécurité
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Parce qu’un problème de chauffage est toujours une source de stress, Chauffagiste-Belga applique une charte d’excellence stricte assurant rigueur technique, clarté administrative et respect du client.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-default max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENTS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-brand-blue/40 transition-colors"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-brand-dark mb-3">{item.title}</h2>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Engagement contractuel garanti</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reassurance Callout */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container-default max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-4">
            Testez l’exigence Chauffagiste-Belga chez vous
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-6">
            Prenez rendez-vous en ligne ou contactez notre permanence 24h/24 pour planifier votre intervention.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/devis"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              Demander un devis gratuit
            </Link>
            <a
              href="tel:0475123456"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E5232E] hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              0475 12 34 56 (24h/7j)
            </a>
          </div>
        </div>
      </section>

      <ReassuranceBar />
    </div>
  )
}
