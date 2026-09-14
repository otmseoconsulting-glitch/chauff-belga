import { UserCheck, Clock, FileText, ShieldCheck, Headphones } from 'lucide-react'

const REASSURANCE_ITEMS = [
  {
    title: 'Techniciens agréés',
    subtitle: 'et qualifiés',
    icon: UserCheck,
  },
  {
    title: 'Disponible 7/7',
    subtitle: 'et 24h/24',
    icon: Clock,
  },
  {
    title: 'Devis gratuit',
    subtitle: 'et sans engagement',
    icon: FileText,
  },
  {
    title: 'Garantie 2 ans',
    subtitle: 'sur nos interventions',
    icon: ShieldCheck,
  },
  {
    title: 'Service client réactif',
    subtitle: 'et à l\'écoute',
    icon: Headphones,
  },
]

export function ReassuranceBar() {
  return (
    <div className="bg-white border-b border-slate-200/80 py-7">
      <div className="container-default">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-5 items-center justify-between">
          {REASSURANCE_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF] shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[13px] sm:text-[14px] font-bold text-[#102A43] leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#64748B] font-normal mt-0.5">
                    {item.subtitle}
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
