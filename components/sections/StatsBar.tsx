import { Award, CheckSquare, Star, Clock, MapPin } from 'lucide-react'

const STATS = [
  {
    value: '10+',
    label: 'Années d\'expérience',
    icon: Award,
  },
  {
    value: '12 500+',
    label: 'Interventions réalisées',
    icon: CheckSquare,
  },
  {
    value: '4,8/5',
    label: 'Note moyenne Google',
    icon: Star,
  },
  {
    value: '7j/7',
    label: 'Disponibilité',
    icon: Clock,
  },
  {
    value: '3',
    label: 'Régions d\'intervention',
    icon: MapPin,
  },
]

export function StatsBar() {
  return (
    <div className="py-12 bg-[#F7F9FC] border-y border-slate-200/80">
      <div className="container-default">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 items-center">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF] shrink-0 border border-blue-100 shadow-subtle">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black text-2xl sm:text-[28px] text-[#082B55] leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[12px] sm:text-[13px] text-[#64748B] font-medium mt-1 leading-snug">
                    {stat.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
