'use client'

import { useEffect, useState } from 'react'
import { Phone, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export function EmergencyBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <aside
      role="banner"
      aria-label="Barre d'appel d'urgence 24/7"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden',
        'bg-emergency-red text-white px-4 py-3 shadow-2xl',
        'flex items-center justify-between gap-3',
        'transition-transform duration-base ease-standard',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-red-200 shrink-0" aria-hidden="true" />
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-xs">Urgence 7j/7 · 24h/24</span>
          <span className="text-[11px] text-red-100">Intervention ≤ 2h</span>
        </div>
      </div>

      <a
        href="tel:+3247512345"
        className="flex items-center gap-1.5 bg-white text-emergency-red font-extrabold py-2 px-3.5 rounded-lg text-sm shadow-sm active:scale-95 transition-transform shrink-0"
        aria-label="Appeler d'urgence le 0475 12 34 56"
      >
        <Phone className="h-4 w-4 fill-emergency-red" aria-hidden="true" />
        <span>0475 12 34 56</span>
      </a>
    </aside>
  )
}
