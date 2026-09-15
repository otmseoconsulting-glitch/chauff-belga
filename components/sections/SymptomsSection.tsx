import Link from 'next/link'
import { AlertTriangle, Wrench, Flame, HelpCircle, ArrowRight, ShieldAlert, Phone } from 'lucide-react'

interface SymptomsSectionProps {
  communeName: string
}

interface ErrorCodeItem {
  brand: string
  code: string
  label: string
  cause: string
  solution: string
}

const COMMON_ERROR_CODES: ErrorCodeItem[] = [
  {
    brand: 'Vaillant',
    code: 'F28 / F29',
    label: "Défaut d'allumage ou perte de flamme",
    cause: 'Pression de gaz insuffisante, électrode d’ionisation encrassée ou vanne gaz bloquée.',
    solution: 'Vérifier l’arrivée de gaz générale. Si le problème persiste après un reset, intervention d’un technicien agréé Cerga.',
  },
  {
    brand: 'Vaillant',
    code: 'F22',
    label: 'Manque d’eau / Pression circuit insuffisante',
    cause: 'Pression tombée sous le seuil critique de 0,8 bar ou fuite sur le circuit de chauffage.',
    solution: 'Rajouter de l’eau via les robinets de remplissage jusqu’à 1,5–1,8 bar. Si la pression rechute, vérifier le vase d’expansion.',
  },
  {
    brand: 'Bulex',
    code: 'F1 / F01',
    label: 'Surchauffe chaudière ou défaut circulateur',
    cause: 'Pompe de circulation bloquée, filtre encrassé ou présence importante de boues de chauffage.',
    solution: 'Laisser refroidir l’appareil. Nécessite généralement un désembouage ou le déblocage du circulateur.',
  },
  {
    brand: 'Bulex',
    code: 'F4 / F14',
    label: 'Échec de détection de flamme',
    cause: 'Électrode d’allumage défectueuse, encrassement du brûleur ou coupure temporaire d’alimentation gaz.',
    solution: 'Effectuer un réarmement (bouton Reset). Ne pas forcer si l’allumage ne démarre pas après deux tentatives.',
  },
  {
    brand: 'Viessmann',
    code: 'F4 / Brûleur verrouillé',
    label: 'Absence de signal de flamme',
    cause: 'Coffret de sécurité en défaut, sonde d’ionisation HS ou problème de tirage cheminée / ventouse.',
    solution: 'Contrôle obligatoire des organes de combustion par un chauffagiste certifié PEB.',
  },
  {
    brand: 'Junkers / Bosch',
    code: 'EA / E9',
    label: 'Courant d’ionisation non détecté',
    cause: 'Pas d’alimentation en combustible, siphon de condensats bouché ou carte électronique.',
    solution: 'Vérifier l’évacuation des condensats. Si le code persiste, remplacement de l’électrode nécessaire.',
  },
]

export function SymptomsSection({ communeName }: SymptomsSectionProps) {
  return (
    <section className="section-padding bg-white border-b border-slate-200/80">
      <div className="container-default">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
            Diagnostic & Résolution de pannes
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#102A43] tracking-tight leading-tight mb-4">
            Codes erreurs et pannes fréquentes de chaudière à {communeName}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed">
            Votre chaudière est tombée en sécurité ou affiche un voyant rouge ? Nos chauffagistes dépannent
            quotidiennement l’ensemble des marques agréées en Belgique. Retrouvez ici la signification des codes les plus
            courants et les bons réflexes de sécurité.
          </p>
        </div>

        {/* Error Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {COMMON_ERROR_CODES.map((item) => (
            <div
              key={`${item.brand}-${item.code}`}
              className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 flex flex-col justify-between hover:border-[#155EEF]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[#102A43]">
                    {item.brand}
                  </span>
                  <span className="font-mono text-xs font-extrabold text-[#E5232E] bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                    Code {item.code}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[16px] text-[#102A43] mb-2 leading-snug">
                  {item.label}
                </h3>
                <p className="text-[13px] text-[#64748B] mb-3 leading-relaxed">
                  <strong className="text-slate-700">Cause probable :</strong> {item.cause}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70">
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  <strong className="text-[#155EEF]">Solution :</strong> {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Safety Notice & Emergency CTA */}
        <div className="p-8 rounded-2xl bg-[#082B55] text-white border border-slate-700/60 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 border border-red-500/30 text-[#E5232E] shrink-0 mt-1">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1.5">
                Urgence Odeur de Gaz ou Suspicion de Monoxyde de Carbone (CO)
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed">
                En cas d’odeur persistante de gaz à {communeName} : n’actionnez aucun interrupteur électrique, coupez le compteur de gaz, aérez largement et contactez immédiatement notre service d’urgence ou le gestionnaire de réseau Sibelga / ORES.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:0475123456"
              className="inline-flex items-center justify-center gap-2 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-6 py-3.5 rounded-full shadow-cta-red transition-all text-[14px]"
            >
              <Phone className="h-4 w-4 fill-white" />
              <span>Dépannage d&apos;urgence 0475 12 34 56</span>
            </a>
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full border border-white/20 transition-colors text-[14px]"
            >
              <span>Demander un diagnostic</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
