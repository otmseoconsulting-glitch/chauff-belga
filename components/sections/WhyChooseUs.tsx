import Link from 'next/link'
import { ArrowRight, Award, Zap, Users, ShieldCheck } from 'lucide-react'

const ADVANTAGES = [
  {
    title: 'Expertise reconnue',
    description: 'Nos chauffagistes sont formés et certifiés pour toutes marques de chaudières.',
    icon: Award,
    bgGradient: 'from-[#082B55] to-[#123E73]',
    tag: 'Toutes marques',
  },
  {
    title: 'Économies d\'énergie',
    description: 'Des solutions performantes pour réduire votre consommation.',
    icon: Zap,
    bgGradient: 'from-[#063328] to-[#082B55]',
    tag: 'Haute efficacité',
  },
  {
    title: 'Service de proximité',
    description: 'Une équipe locale, proche de vous, dans toute la Belgique.',
    icon: Users,
    bgGradient: 'from-[#0B3B6F] to-[#082B55]',
    tag: 'Intervention locale',
  },
  {
    title: 'Qualité garantie',
    description: 'Des installations durables avec une garantie de 2 ans.',
    icon: ShieldCheck,
    bgGradient: 'from-[#1E1B4B] to-[#082B55]',
    tag: 'Garantie 2 ans',
  },
]

export function WhyChooseUs() {
  return (
    <section id="a-propos" className="section-padding bg-[#F7F9FC] border-b border-slate-200/80">
      <div className="container-default">
        
        {/* Top Header & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
              Pourquoi choisir Chauffagiste-Belga ?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#102A43] tracking-tight leading-tight">
              Plus qu&apos;un dépannage. Votre <span className="text-[#E5232E]">confort</span>, <span className="text-[#E5232E]">notre priorité</span>.
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#64748B] font-normal mt-3 max-w-2xl leading-relaxed">
              Depuis plus de 10 ans, nous accompagnons les particuliers et les professionnels en Belgique avec un service de chauffage fiable, rapide et de qualité.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/#a-propos"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#102A43] font-semibold px-6 py-3.5 rounded-full border border-slate-300 shadow-subtle transition-colors group text-[14px]"
            >
              <span>En savoir plus</span>
              <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300"
              >
                {/* Visual Header with contextual gradient illustration */}
                <div className={`relative h-44 bg-linear-to-br ${card.bgGradient} p-5 flex flex-col justify-between text-white overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                  <span className="self-end inline-block px-2.5 py-1 rounded-md bg-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-200 backdrop-blur-xs">
                    {card.tag}
                  </span>
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-300">Belga Certifié</span>
                  </div>
                </div>

                {/* Overlapping Pill Icon */}
                <div className="relative -mt-6 ml-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-md text-[#155EEF] group-hover:text-[#E5232E] transition-colors">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Card Body */}
                <div className="p-6 pt-3 flex flex-col grow">
                  <h3 className="font-display font-bold text-[17px] text-[#102A43] group-hover:text-[#E5232E] transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[14px] text-[#64748B] font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
