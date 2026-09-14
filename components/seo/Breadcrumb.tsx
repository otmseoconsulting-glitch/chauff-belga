import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
  }>
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 text-xs text-[#64748B]">
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-500 hover:text-[#082B55] transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Accueil</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-[#082B55] transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
                </>
              ) : (
                <span className="font-semibold text-[#102A43]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
