import { Flame, Phone } from 'lucide-react'

interface CommuneBannerCtaProps {
  communeName: string
}

export function CommuneBannerCta({ communeName }: CommuneBannerCtaProps) {
  return (
    <section className="py-10 bg-white">
      <div className="container-default">
        <div className="rounded-3xl overflow-hidden shadow-xl bg-[#051C38] flex flex-col md:flex-row items-stretch justify-between">
          
          {/* Left Side: Dark Navy info */}
          <div className="p-8 md:p-10 flex items-center gap-5 text-white flex-1">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <Flame className="w-7 h-7 text-[#FF5400]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                Besoin d’un chauffagiste à {communeName} ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Notre équipe est disponible 24h/24 et 7j/7 pour tous vos dépannages et urgences.
              </p>
            </div>
          </div>

          {/* Right Side: Curved Orange CTA box */}
          <div className="bg-[#FF5400] text-white p-8 md:p-10 flex flex-col justify-center items-start sm:items-center text-left sm:text-center md:min-w-[320px]">
            <span className="text-xs uppercase font-extrabold tracking-wider text-orange-100 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 fill-current" />
              Appeler maintenant
            </span>
            <a
              href="tel:0475123456"
              className="text-2xl sm:text-3xl font-black tracking-tight text-white hover:text-slate-100 transition-colors block my-1"
            >
              0475 12 34 56
            </a>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-100 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Disponible actuellement</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
