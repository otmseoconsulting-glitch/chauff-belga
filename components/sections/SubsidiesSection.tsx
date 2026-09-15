import Link from 'next/link'
import { Euro, Award, FileCheck2, ArrowRight } from 'lucide-react'

interface SubsidiesSectionProps {
  communeName: string
  provinceSlug?: string | undefined
}

export function SubsidiesSection({ communeName, provinceSlug }: SubsidiesSectionProps) {
  const isBrussels = provinceSlug === 'bruxelles-capitale' || provinceSlug === 'p-bruxelles'
  const isFlanders = provinceSlug?.includes('flandre') || provinceSlug?.includes('vlaams')

  const regionalTitle = isBrussels
    ? 'Primes Renolution à Bruxelles'
    : isFlanders
      ? 'Mijn VerbouwPremie en Région Flamande'
      : 'Primes Habitation SPW en Wallonie'

  const regionalBadge = isBrussels
    ? 'Région de Bruxelles-Capitale'
    : isFlanders
      ? 'Vlaams Gewest'
      : 'Région Wallonne'

  const subsidyPoints = isBrussels
    ? [
        {
          title: 'Primes Renolution Chaudière & PAC',
          desc: 'Jusqu’à 4 250 € pour l’installation d’une pompe à chaleur air-eau ou d’un système hybride performant selon votre catégorie de revenus (A, B ou C).',
        },
        {
          title: 'Audit Énergétique & Bonus Bonus Sortie Mazout',
          desc: 'Prime majorée lors de la dépose d’une ancienne cuve à mazout et du passage au gaz condensation ou à l’aérothermie.',
        },
        {
          title: 'Dossier Cerga Conforme',
          desc: 'Nos installateurs certifiés Cerga vous fournissent le certificat de conformité et l’attestation requise pour votre demande auprès de Bruxelles Environnement.',
        },
      ]
    : [
        {
          title: 'Primes Habitation SPW Chauffage',
          desc: 'Subventions régionales substantielles pour le remplacement d’un générateur de chaleur vétuste par une pompe à chaleur ou chaudière gaz à haut rendement.',
        },
        {
          title: 'Chauffe-eau Thermodynamique',
          desc: 'Primes spécifiques pour la production d’eau chaude sanitaire écologique, amortie en moins de 3 à 5 ans avec les aides de la Région wallonne.',
        },
        {
          title: 'Attestations Techniques Clé en Main',
          desc: 'Tous nos devis et factures intègrent les mentions réglementaires indispensables pour valider vos primes auprès du SPW Énergie sans contestation.',
        },
      ]

  return (
    <section className="section-padding bg-[#F7F9FC] border-b border-slate-200/80">
      <div className="container-default">
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
            Aides financières & Transition énergétique
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#102A43] tracking-tight leading-tight mb-4">
            {regionalTitle} : réduisez le coût de votre installation à {communeName}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed">
            Profitez des incitations publiques régionales pour financer jusqu’à 40% à 70% de vos travaux de rénovation
            énergétique. Nos techniciens certifiés assurent la conformité technique nécessaire pour débloquer vos aides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {subsidyPoints.map((point, index) => (
            <div
              key={point.title}
              className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E5232E] mb-5">
                  {index === 0 ? <Euro className="h-5 w-5" /> : index === 1 ? <Award className="h-5 w-5" /> : <FileCheck2 className="h-5 w-5" />}
                </div>
                <h3 className="font-display font-bold text-[17px] text-[#102A43] mb-2 leading-snug">
                  {point.title}
                </h3>
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{regionalBadge}</span>
                <span className="text-emerald-600">Éligible 2026</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-bold text-[16px] text-[#102A43]">
              Besoin d&apos;un devis certifié pour introduire votre demande de prime ?
            </h4>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              Recevez une offre détaillée sous 24h avec toutes les caractéristiques techniques requises par la Région.
            </p>
          </div>
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-2 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-6 py-3 rounded-full shadow-cta-red transition-all text-[14px] shrink-0"
          >
            <span>Simuler mon devis gratuit</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
