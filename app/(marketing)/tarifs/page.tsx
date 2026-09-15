import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Euro,
  CheckCircle2,
  AlertCircle,
  Phone,
  FileCheck,
  ShieldCheck,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'

export const metadata: Metadata = {
  title: 'Tarifs Chauffagiste Belgique 2026 : Prix Dépannage & Entretien | Chauffagiste-Belga',
  description:
    'Grille tarifaire officielle 2026 pour le dépannage, l’entretien légal PEB et l’installation de chaudière en Belgique. Tarifs transparents sans frais cachés, TVA 6% ou 21%. Devis gratuit.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/tarifs',
  },
}

interface PriceItem {
  name: string
  price: string
  period?: string
  vatNote: string
  description: string
  features: string[]
  popular?: boolean
  link: string
}

const PRICING_ITEMS: PriceItem[] = [
  {
    name: 'Dépannage d’urgence Chaudière',
    price: '65 €',
    period: 'déplacement & diagnostic inclus',
    vatNote: 'TVA 6% comprise si logement > 10 ans',
    description:
      'Intervention rapide 24h/24 et 7j/7 sur panne totale, perte de pression, code erreur ou fuite d’eau.',
    features: [
      'Diagnostic complet sur place par technicien certifié',
      'Contrôle des organes de sécurité et étanchéité gaz',
      'Devis immédiat pour les pièces avant tout remplacement',
      'Intervention en moins de 24h garantie',
    ],
    popular: true,
    link: '/nos-services/depannage-chaudiere',
  },
  {
    name: 'Entretien Légal PEB Chaudière Gaz',
    price: '99 €',
    period: 'forfait complet',
    vatNote: 'Obligation biennale en Wallonie & Bruxelles',
    description:
      'Entretien réglementaire obligatoire pour conserver la garantie constructeur et votre couverture d’assurance incendie.',
    features: [
      'Nettoyage approfondi brûleur et corps de chauffe',
      'Analyse de combustion électronique (rendement & CO)',
      'Remise de l’attestation légale officielle PEB Cerga',
      'Vignette fiscale de conformité apposée sur la chaudière',
    ],
    popular: true,
    link: '/nos-services/entretien-chaudiere',
  },
  {
    name: 'Entretien Légal PEB Chaudière Mazout',
    price: '140 €',
    period: 'forfait complet',
    vatNote: 'Obligation annuelle dans toute la Belgique',
    description:
      'Nettoyage complet, ramonage de la buse d’évacuation et réglage optimal de la ligne gicleur mazout.',
    features: [
      'Ramonage du conduit de fumée et boîte à suie',
      'Nettoyage et réglage complet du brûleur mazout',
      'Remplacement standard du gicleur (si requis)',
      'Attestation de conformité officielle de combustion',
    ],
    link: '/nos-services/entretien-chaudiere',
  },
  {
    name: 'Débouchage & Curage Sanitaire',
    price: '75 €',
    period: 'intervention rapide',
    vatNote: 'Canalisations & sanitaires',
    description:
      'Élimination des bouchons tenaces dans vos canalisations, WC, éviers ou colonnes d’évacuation.',
    features: [
      'Débouchage mécanique au furet haute performance',
      'Hydrocurage haute pression si nécessaire',
      'Inspection caméra disponible sur demande',
      'Assainissement et désinfection de l’installation',
    ],
    link: '/nos-services/debouchage',
  },
  {
    name: 'Régulation & Thermostat Connecté',
    price: '120 €',
    period: 'pose & paramétrage',
    vatNote: 'Hors fourniture du boîtier',
    description:
      'Installation et raccordement de thermostat intelligent modulant (Nest, Tado, Netatmo, Somfy).',
    features: [
      'Raccordement direct sur bus eBUS / OpenTherm chaudière',
      'Configuration wifi et application smartphone du client',
      'Optimisation de la courbe de chauffe selon la météo',
      'Économie d’énergie jusqu’à 25% sur la facture de gaz',
    ],
    link: '/nos-services/regulation-thermostat',
  },
  {
    name: 'Désembouage Chauffage au Sol / Radiateurs',
    price: '200 €',
    period: 'par circuit',
    vatNote: 'Nettoyage hydrodynamique',
    description:
      'Rinçage chimique et hydrodynamique pour éliminer les boues magnétiques, rétablir la chaleur uniforme et protéger la pompe.',
    features: [
      'Désembouage mécanique à l’eau et à l’air pulsé',
      'Injection d’inhibiteur anticorrosion longue durée',
      'Contrôle du pH et purge complète des boucles',
      'Gain immédiat en confort thermique et rendement',
    ],
    link: '/nos-services/chauffage-sol',
  },
]

export default function TarifsPage() {
  const breadcrumbItems = [{ label: 'Tarifs & Prix 2026', href: '/tarifs' }]

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
        <div className="container-default">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-4 border border-emerald-200">
              <Euro className="w-3.5 h-3.5 text-emerald-600" />
              Transparence tarifaire 2026 • Belgique
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
              Tarifs clairs, forfaits sans surprise & devis gratuit
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Chez Chauffagiste-Belga, nos tarifs sont annoncés avant toute intervention. Aucun frais dissimulé, devis écrit validé avec le client, et application stricte du taux de TVA réduit à 6% pour les logements éligibles.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-12 md:py-16">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRICING_ITEMS.map((item) => (
              <div
                key={item.name}
                className={`relative flex flex-col rounded-2xl bg-white p-7 border transition-all hover:shadow-lg ${
                  item.popular
                    ? 'border-brand-blue ring-2 ring-brand-blue/20 shadow-sm'
                    : 'border-slate-200'
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-3 right-6 rounded-full bg-brand-blue px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                    Populaire
                  </span>
                )}

                <div className="mb-4">
                  <h2 className="font-bold text-xl text-brand-dark mb-2">{item.name}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed min-h-[40px]">
                    {item.description}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase">dès</span>
                    <span className="text-4xl font-black text-brand-dark tracking-tight">
                      {item.price}
                    </span>
                  </div>
                  {item.period && (
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      {item.period}
                    </span>
                  )}
                  <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    {item.vatNote}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {item.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Link
                    href={item.link}
                    className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-brand-blue hover:text-white text-slate-800 transition-colors"
                  >
                    En savoir plus sur la prestation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Belgian VAT rules */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container-default max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-3">
              Comprendre la TVA applicable en Belgique : 6% ou 21% ?
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Législation fiscale belge sur les travaux de rénovation et d’entretien du chauffage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-black text-emerald-700">Taux réduit à 6%</span>
              </div>
              <p className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-3">
                Habitations privées de plus de 10 ans
              </p>
              <ul className="space-y-2 text-xs text-emerald-950">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Le logement doit avoir plus de 10 ans d’ancienneté à la date des travaux.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Utilisé exclusivement ou principalement comme habitation privée.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>S’applique au matériel et à la main-d’œuvre fournie par notre artisan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Simple attestation légale sur facture à valider par le propriétaire.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-black text-slate-700">Taux standard à 21%</span>
              </div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                Logements de moins de 10 ans & Locaux commerciaux
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>Constructions neuves et habitations de moins de 10 ans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>Bâtiments professionnels, bureaux et commerces non affectés au logement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>Achat de matériel seul sans prestation de pose par notre technicien.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 md:py-16">
        <div className="container-default max-w-4xl">
          <div className="bg-gradient-to-br from-[#082B55] to-[#051C38] rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-4">
              Besoin d’un chiffrage précis ou d’un dépannage immédiat ?
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
              Nos conseillers techniques et artisans chauffagistes sont joignables 24h/24 et 7j/7 dans toute la Belgique pour vous fournir un devis sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:0475123456"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E5232E] hover:bg-red-700 text-white font-black text-sm tracking-wide transition-colors shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Appel d’urgence : 0475 12 34 56
              </a>
              <Link
                href="/devis"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide transition-colors border border-white/20"
              >
                Demander un devis en ligne
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ReassuranceBar />
    </div>
  )
}
