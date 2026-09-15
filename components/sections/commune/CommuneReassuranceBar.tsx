import { MapPin, Clock, ShieldCheck, Star } from 'lucide-react'

interface CommuneReassuranceBarProps {
  communeName: string
}

export function CommuneReassuranceBar({ communeName }: CommuneReassuranceBarProps) {
  return (
    <section className="bg-[#051C38] text-white py-5 border-y border-slate-800">
      <div className="container-default">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center">
          
          {/* Item 1: Location */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white shrink-0">
              <MapPin className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">
                Intervention à {communeName}
              </span>
              <span className="text-[11px] text-slate-300 font-normal mt-0.5">
                et alentours
              </span>
            </div>
          </div>

          {/* Item 2: Speed */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white shrink-0">
              <Clock className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">
                Déplacement rapide
              </span>
              <span className="text-[11px] text-slate-300 font-normal mt-0.5">
                ≤ 45 minutes
              </span>
            </div>
          </div>

          {/* Item 3: Guarantee */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white shrink-0">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">
                Service professionnel
              </span>
              <span className="text-[11px] text-slate-300 font-normal mt-0.5">
                et garanti 2 ans
              </span>
            </div>
          </div>

          {/* Item 4: Rating */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400 shrink-0">
              <Star className="h-5 w-5 fill-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                4,9/5 sur Google
              </span>
              <span className="text-[11px] text-slate-300 font-normal mt-0.5">
                +1 200 avis clients
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
