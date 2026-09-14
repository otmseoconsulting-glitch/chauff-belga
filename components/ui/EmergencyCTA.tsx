import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmergencyCTAProps {
  phone?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function EmergencyCTA({
  phone = '0475 12 34 56',
  label = 'Appeler maintenant',
  size = 'md',
  className,
}: EmergencyCTAProps) {
  const sizes = {
    sm: 'py-2.5 px-4 text-sm min-h-[44px]',
    md: 'py-3.5 px-6 text-base min-h-[48px]',
    lg: 'py-4 px-8 text-lg min-h-[56px]',
  }

  const telLink = phone.replace(/\s/g, '')

  return (
    <a
      href={`tel:${telLink}`}
      className={cn(
        'inline-flex items-center justify-center gap-2.5',
        'bg-emergency-red hover:bg-emergency-red-700',
        'text-white font-bold rounded-lg',
        'transition-all duration-fast ease-standard',
        'shadow-cta hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emergency-red focus-visible:ring-offset-2',
        'active:scale-95',
        sizes[size],
        className
      )}
      aria-label={`${label} : ${phone}`}
    >
      <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{label}</span>
      <span className="text-red-100 text-sm font-semibold">({phone})</span>
    </a>
  )
}
