import { Phone, ArrowRight, Flame } from 'lucide-react'

export function FinalCTASection() {
  return (
    <section className="bg-[#082B55] text-white py-16 border-t border-slate-700/60 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#155EEF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#E5232E]/10 blur-3xl pointer-events-none" />

      <div className="container-default relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          <div className="max-w-2xl flex flex-col lg:flex-row items-center lg:items-start gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#E5232E] shrink-0 border border-white/15">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-tight mb-2">
                Votre problème de chauffage mérite une vraie solution.
              </h2>
              <p className="text-[15px] text-slate-300 font-normal leading-relaxed">
                Une équipe professionnelle, disponible quand vous en avez besoin.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:0475123456"
              className="inline-flex items-center justify-center gap-2.5 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-7 py-4 rounded-full shadow-cta-red transition-colors text-[15px]"
            >
              <Phone className="h-4 w-4 fill-white" />
              <span>Appeler maintenant</span>
            </a>

            <a
              href="#devis"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-full border border-white/20 transition-colors text-[15px] backdrop-blur-xs group"
            >
              <span>Demander un devis gratuit</span>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
