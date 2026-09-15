import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HelpCircle,
  AlertTriangle,
  FileCheck2,
  Euro,
  Flame,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'

export const metadata: Metadata = {
  title: 'Foire Aux Questions (FAQ) Chauffage & Entretien PEB Belgique | Chauffagiste-Belga',
  description:
    'Toutes les réponses à vos questions sur le dépannage de chaudière, l’obligation légale d’entretien PEB en Belgique, les primes régionales 2026 et nos tarifs.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/faq',
  },
}

interface FaqItem {
  q: string
  a: string
}

interface FaqCategory {
  category: string
  icon: typeof HelpCircle
  items: FaqItem[]
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    category: '1. Dépannage & Urgences Chaudière',
    icon: Flame,
    items: [
      {
        q: 'Quel est votre délai d’intervention en cas de panne totale ?',
        a: 'Nos équipes d’astreinte interviennent en moins de 24 heures pour les situations d’urgence (manque total de chauffage en période hivernale, fuite d’eau ou sécurité gaz) dans toutes les provinces belges.',
      },
      {
        q: 'Que faire si je suspecte une fuite de gaz ou une odeur suspecte ?',
        a: 'Coupez immédiatement l’alimentation générale de gaz au compteur, aérez largement en ouvrant fenêtres et portes, n’actionnez aucun interrupteur électrique ni flamme, quittez le logement et contactez immédiatement notre permanence au 0475 12 34 56 ou votre gestionnaire de réseau (Sibelga à Bruxelles, ORES ou RESA en Wallonie, Fluvius en Flandre).',
      },
      {
        q: 'Réparez-vous toutes les marques de chaudières ?',
        a: 'Oui. Nos techniciens certifiés disposent d’un outillage multimarque et de pièces détachées d’origine pour l’ensemble des constructeurs présents en Belgique : Vaillant, Bulex, Viessmann, Bosch, Junkers, ACV, De Dietrich, Remeha, Ferroli et Daikin.',
      },
    ],
  },
  {
    category: '2. Entretien Légal & Réglementation PEB',
    icon: FileCheck2,
    items: [
      {
        q: 'Quelle est la fréquence légale d’entretien d’une chaudière en Belgique ?',
        a: 'Pour une chaudière au gaz naturel : l’entretien est obligatoire tous les 2 ans en Région de Bruxelles-Capitale et en Région Wallonne (tous les 2 ans en Flandre également pour les générateurs ≥ 20 kW). Pour une chaudière au mazout (combustible liquide) : l’entretien et le ramonage sont strictement annuels dans les 3 Régions.',
      },
      {
        q: 'L’attestation d’entretien est-elle obligatoire pour mon assurance incendie ?',
        a: 'Absolument. En cas de sinistre (dégât des eaux causé par le circuit de chauffage, incendie ou intoxication au CO), votre compagnie d’assurance exigera la présentation des attestations de contrôle périodique délivrées par un technicien agréé pour débloquer les indemnisations.',
      },
      {
        q: 'Que comprend la formule d’entretien légal PEB à 99 € ?',
        a: 'Le nettoyage complet du brûleur et du corps de chauffe, le contrôle des sécurités gaz, l’analyse électronique de la combustion (mesure du CO, CO2 et rendement), la remise de l’attestation légale officielle PEB Cerga et l’apposition de la vignette de conformité.',
      },
    ],
  },
  {
    category: '3. Tarifs, TVA & Devis',
    icon: Euro,
    items: [
      {
        q: 'Comment bénéficier du taux de TVA réduit à 6% en Belgique ?',
        a: 'Votre habitation doit être âgée de plus de 10 ans et être principalement affectée à un usage de logement privé. Notre technicien vous fait signer une mention légale simplifiée sur la facture pour appliquer directement la TVA à 6% au lieu de 21%.',
      },
      {
        q: 'Y a-t-il des frais cachés ou des suppléments de déplacement imprévus ?',
        a: 'Non. Tous nos forfaits de base incluent le déplacement et le diagnostic. Si une pièce d’usure (sonde, électrode, vase d’expansion, circulateur) nécessite d’être remplacée, un devis clair est établi et validé avec vous avant toute intervention.',
      },
      {
        q: 'Quels sont les modes de règlement acceptés ?',
        a: 'Vous pouvez régler directement sur place auprès du technicien par Bancontact (terminal mobile sécurisé), via l’application Payconiq ou en espèces avec délivrance immédiate d’une facture acquittée.',
      },
    ],
  },
  {
    category: '4. Remplacement de Chaudière & Primes Énergie',
    icon: HelpCircle,
    items: [
      {
        q: 'Existe-t-il des primes pour remplacer ma vieille chaudière ?',
        a: 'Oui. Selon votre région de résidence, vous pouvez prétendre aux primes Renolution (à Bruxelles) ou aux Primes Habitation SPW (en Wallonie) pour l’installation d’une chaudière gaz à condensation haute performance ou d’une pompe à chaleur. Nos conseillers vous assistent dans le montage de vos dossiers administratifs.',
      },
      {
        q: 'Combien de temps prend l’installation d’une nouvelle chaudière ?',
        a: 'Le remplacement standard d’une chaudière murale gaz existante par un modèle à condensation est généralement réalisé en une seule journée de travail (6 à 8 heures), raccordement des fumées et mise en route inclus.',
      },
    ],
  },
]

export default function FaqPage() {
  const breadcrumbItems = [{ label: 'Foire aux questions (FAQ)', href: '/faq' }]

  const allItems = FAQ_CATEGORIES.flatMap((c) => c.items)
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            Centre d’aide & Réponses d’experts
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Questions Fréquentes sur le Chauffage en Belgique
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Retrouvez toutes les réponses claires de nos artisans chauffagistes agréés Cerga concernant vos obligations légales, nos tarifs et la gestion des pannes.
          </p>
        </div>
      </section>

      {/* Categories & Questions */}
      <section className="py-12 md:py-16">
        <div className="container-default max-w-4xl space-y-12">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <div key={cat.category} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-brand-dark">{cat.category}</h2>
                </div>

                <div className="space-y-4">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs"
                    >
                      <h3 className="font-bold text-base text-brand-dark mb-2 flex items-start gap-2.5">
                        <span className="text-brand-blue font-black shrink-0">Q.</span>
                        <span>{item.q}</span>
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container-default max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-3">
            Vous ne trouvez pas la réponse à votre question ?
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-6">
            Nos conseillers thermiciens sont à votre disposition par téléphone ou par message pour vous guider en toute neutralité.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              Poser une question à notre équipe
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
