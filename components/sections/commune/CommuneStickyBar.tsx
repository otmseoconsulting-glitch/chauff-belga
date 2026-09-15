import Link from 'next/link'
import { Phone, Flame, FileText } from 'lucide-react'

export function CommuneStickyBar() {
  return (
    <aside aria-label="Actions rapides mobiles" className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
      {/* Phone */}
      <a
        href="tel:0475123456"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-brand-blue" />
        <span>Appeler</span>
      </a>

      {/* Urgence Orange Pill */}
      <a
        href="tel:0475123456"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FF5400] text-white font-extrabold text-xs shadow-sm"
      >
        <Flame className="w-3.5 h-3.5 fill-white" />
        <span>Urgence</span>
      </a>

      {/* Devis */}
      <Link
        href="/devis"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
      >
        <FileText className="w-3.5 h-3.5 text-slate-600" />
        <span>Devis</span>
      </Link>
    </aside>
  )
}
