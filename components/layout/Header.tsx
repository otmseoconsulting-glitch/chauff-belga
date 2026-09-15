import Link from 'next/link'
import { Phone } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Accueil', href: '/', isActive: true },
  { label: 'Nos services', href: '/nos-services', isActive: false },
  { label: "Zones d'intervention", href: '/#zones', isActive: false },
  { label: 'À propos', href: '/#a-propos', isActive: false },
  { label: 'Avis clients', href: '/#avis', isActive: false },
  { label: 'Conseils', href: '/conseils', isActive: false },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="container-default">
        <div className="flex items-center justify-between h-[76px]">
          
          {/* Brand Logo */}
          <Link href="/" aria-label="Chauffagiste-Belga — Accueil" className="flex items-center gap-3 shrink-0">
            {/* Distinctive Logo Flame Icon: Blue core flame + Vivid Red flame accent */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#082B55] text-white shadow-xs">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {/* Outer/Back Blue Flame */}
                <path
                  d="M12 2C9 6.5 6 9.5 6 14.5C6 18.09 8.91 21 12.5 21C16.09 21 19 18.09 19 14.5C19 11 17 8 14.5 5.5C14 7.5 12.5 9 10.5 9C9 9 7.8 7.8 8.5 6C10 4 11 2.8 12 2Z"
                  fill="#155EEF"
                />
                {/* Inner Vivid Red Flame */}
                <path
                  d="M12.5 10C10.8 12.5 9.5 14.2 9.5 16C9.5 17.66 10.84 19 12.5 19C14.16 19 15.5 17.66 15.5 16C15.5 14 14.2 12.2 13.5 11C13.2 11.8 12.6 12.2 12 12.2C11.5 12.2 11.2 11.8 11.5 11.2C11.8 10.8 12.2 10.4 12.5 10Z"
                  fill="#E5232E"
                />
              </svg>
            </div>
            
            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight leading-none text-[#082B55]">
                Chauffagiste<span className="text-[#E5232E]">-Belga</span>
              </span>
              <span className="text-[11px] font-medium text-[#64748B] tracking-wide mt-1">
                Chauffage • Confort • Performance
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-2 text-[14px] transition-colors ${
                  item.isActive
                    ? 'font-bold text-[#102A43] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#E5232E] after:rounded-full'
                    : 'font-medium text-[#64748B] hover:text-[#082B55]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Red Primary CTA: Demander un devis */}
            <a
              href="#devis"
              className="hidden sm:inline-flex items-center justify-center bg-[#E5232E] hover:bg-[#D01B25] text-white text-[13px] font-bold py-2.5 px-5 rounded-full shadow-cta-red transition-all duration-200"
            >
              Demander un devis
            </a>

            {/* Direct Phone Number + Status Indicator */}
            <a
              href="tel:0475123456"
              className="flex items-center gap-2.5 group"
              aria-label="Appeler Chauffagiste-Belga au 0475 12 34 56"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 group-hover:bg-red-50 text-[#082B55] group-hover:text-[#E5232E] transition-colors">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm sm:text-[15px] font-black text-[#102A43] group-hover:text-[#E5232E] transition-colors tracking-tight leading-none">
                  0475 12 34 56
                </span>
                <span className="text-[11px] text-[#64748B] font-medium flex items-center gap-1.5 mt-1">
                  <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                  Disponible 24/7
                </span>
              </div>
            </a>

          </div>

        </div>
      </div>
    </header>
  )
}
