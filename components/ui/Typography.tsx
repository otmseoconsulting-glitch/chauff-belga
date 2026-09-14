import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextProps {
  children: ReactNode
  className?: string
  id?: string
}

export function H1({ children, className, id }: TextProps) {
  return (
    <h1
      id={id}
      className={cn(
        'font-display font-extrabold text-trust-blue',
        'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
        'leading-tight tracking-tight',
        className
      )}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, id }: TextProps) {
  return (
    <h2
      id={id}
      className={cn(
        'font-display font-bold text-trust-blue',
        'text-2xl sm:text-3xl md:text-4xl',
        'leading-snug',
        className
      )}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, id }: TextProps) {
  return (
    <h3
      id={id}
      className={cn(
        'font-display font-bold text-gray-950',
        'text-xl sm:text-2xl',
        'leading-snug',
        className
      )}
    >
      {children}
    </h3>
  )
}

export function BodyLarge({ children, className }: TextProps) {
  return (
    <p className={cn('font-body text-lg text-gray-800 leading-relaxed max-w-[65ch]', className)}>
      {children}
    </p>
  )
}

export function Body({ children, className }: TextProps) {
  return (
    <p className={cn('font-body text-base text-gray-700 leading-normal max-w-[65ch]', className)}>
      {children}
    </p>
  )
}
