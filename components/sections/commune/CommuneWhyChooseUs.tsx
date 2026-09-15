import Link from 'next/link'
import {
  MapPin,
  Clock,
  Receipt,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface CommuneWhyChooseUsProps {
  communeName: string
}

export function CommuneWhyChooseUs({ communeName }: CommuneWhyChooseUsProps) {
  const cards = [
    {
      title: 'Expertise locale',
      desc: `Nous connaissons parfaitement les spécificités de chauffe et la qualité de l’eau de la région de ${communeName}.`,
      icon: MapPin,
    },
    {
      title: 'Intervention rapide',
      desc: 'Notre équipe mobile de techniciens d’astreinte se déplace en moins de 45 minutes sur le secteur.',
      icon: Clock,
    },
    {
      title: 'Prix transparents',
      desc: 'Devis clair, forfaitaire et sans mauvaise surprise validé avec vous avant toute intervention.',
      icon: Receipt,
    },
    {
      title: 'Garantie 2 ans',
      desc: 'Couverture intégrale sur la main-d’œuvre et les pièces détachées d’origine installées.',
      icon: ShieldCheck,
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading + Subtitle + CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight leading-tight mb-4">
              Pourquoi choisir notre chauffagiste à {communeName} ?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Plus qu’un simple dépannage d’urgence, votre sécurité et la longévité de votre installation sont notre priorité absolue.
            </p>
            <Link
              href="/notre-equipe"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#082B55] hover:bg-[#051C38] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs group"
            >
              <span>Découvrir notre équipe</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: 2x2 Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 hover:border-brand-blue/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-3.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-brand-dark mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
