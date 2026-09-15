import Link from 'next/link'
import {
  Flame,
  FileCheck2,
  Wrench,
  SlidersHorizontal,
  Waves,
  ArrowRight,
} from 'lucide-react'

interface CommuneServicesGridProps {
  communeName: string
}

export function CommuneServicesGrid({ communeName }: CommuneServicesGridProps) {
  const services = [
    {
      title: 'Dépannage chauffage',
      desc: 'Plus de chauffage ? Nous intervenons rapidement 24/7.',
      link: '/nos-services/depannage-chaudiere',
      icon: Flame,
      color: 'text-red-500 bg-red-50 border-red-100',
    },
    {
      title: 'Entretien chaudière',
      desc: 'Prolongez la durée de vie et attestations PEB obligatoires.',
      link: '/nos-services/entretien-chaudiere',
      icon: FileCheck2,
      color: 'text-blue-500 bg-blue-50 border-blue-100',
    },
    {
      title: 'Installation chaudière',
      desc: 'Chaudières modernes à condensation et haute performance.',
      link: '/nos-services/installation-chauffage',
      icon: Wrench,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Réglage & thermostat',
      desc: 'Confort optimisé et jusqu’à 25% d’économies d’énergie.',
      link: '/nos-services/regulation-thermostat',
      icon: SlidersHorizontal,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Chauffage au sol',
      desc: 'Désembouage hydrodynamique et régulation discrète.',
      link: '/nos-services/chauffage-sol',
      icon: Waves,
      color: 'text-sky-500 bg-sky-50 border-sky-100',
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="container-default">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight mb-3">
            Nos services de chauffage à {communeName}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Une équipe de professionnels agréés pour tous vos besoins en dépannage, chaudière et entretien périodique.
          </p>
        </div>

        {/* 6 Cards Grid (Exact template layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.title}
                href={s.link}
                className="group flex flex-col p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-brand-blue/60 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${s.color} mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-brand-dark group-hover:text-brand-blue transition-colors mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </Link>
            )
          })}

          {/* 6th Card: "Voir tous nos services ->" */}
          <Link
            href="/nos-services"
            className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 hover:bg-blue-50/50 hover:border-brand-blue/60 transition-all duration-200"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-brand-blue group-hover:gap-3 transition-all">
              <span>Voir tous nos services</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Pompe à chaleur, débouchage, contrat d’entretien & urgences
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
