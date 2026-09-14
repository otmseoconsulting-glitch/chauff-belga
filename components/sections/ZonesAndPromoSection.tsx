import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const REGIONS_COL_1 = [
  'Bruxelles',
  'Brabant flamand',
  'Brabant wallon',
  'Hainaut',
  'Liège',
]

const REGIONS_COL_2 = [
  'Namur',
  'Luxembourg',
  'Flandre occidentale',
  'Flandre orientale',
]

export function ZonesAndPromoSection() {
  return (
    <section id="zones" className="py-14 bg-[#F7F9FC] border-y border-slate-200/80">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Warm Living Room & Savings Promo Card in Deep Navy #082B55 */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#082B55] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl min-h-[400px]">
            {/* Dark Navy Warmth Gradient */}
            <div className="absolute inset-0 bg-linear-to-tr from-[#051C38] via-[#082B55] to-[#123E73] pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#E5232E]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-red-200 mb-4 backdrop-blur-xs">
                Performance & Confort
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-4 tracking-tight">
                Un chauffage performant, c&apos;est des économies toute l&apos;année
              </h3>
              <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed font-normal max-w-sm">
                Nous vous aidons à optimiser votre installation pour plus de confort et une consommation maîtrisée.
              </p>
            </div>

            <div className="relative z-10 pt-8">
              <Link
                href="/#devis"
                className="inline-flex items-center gap-2 bg-[#E5232E] hover:bg-[#D01B25] text-white text-[14px] font-bold px-6 py-3.5 rounded-full shadow-md transition-colors"
              >
                <span>Nos solutions chauffage</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: Nos zones d'intervention with Belgian Map and Region List */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
                Nos zones d&apos;intervention
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] font-normal mt-1.5 mb-8">
                Une équipe proche de chez vous, partout en Belgique.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Simplified elegant Belgium map illustration */}
                <div className="sm:col-span-5 relative flex items-center justify-center p-5 bg-[#F7F9FC] rounded-2xl border border-slate-100">
                  <svg className="w-full max-w-[200px] h-auto text-slate-300" viewBox="0 0 200 160" fill="currentColor">
                    <path d="M40 20 C60 10, 100 15, 140 25 C170 35, 180 60, 175 90 C170 120, 140 145, 100 140 C60 135, 30 110, 25 80 C20 50, 25 30, 40 20 Z" />
                  </svg>
                  
                  {/* Location Pin Indicators */}
                  <span className="absolute top-[38%] left-[50%] flex h-3 w-3 -translate-x-1/2 -translate-y-1/2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E5232E]" />
                  </span>
                  <span className="absolute top-[52%] left-[40%] flex h-2.5 w-2.5 rounded-full bg-[#E5232E]" />
                  <span className="absolute top-[44%] left-[64%] flex h-2.5 w-2.5 rounded-full bg-[#E5232E]" />
                  <span className="absolute top-[62%] left-[58%] flex h-2.5 w-2.5 rounded-full bg-[#E5232E]" />
                  <span className="absolute top-[68%] left-[44%] flex h-2.5 w-2.5 rounded-full bg-[#E5232E]" />
                </div>

                {/* 2-Column Provinces / Regions List */}
                <div className="sm:col-span-7 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] sm:text-[14px]">
                  <div className="flex flex-col gap-2.5">
                    {REGIONS_COL_1.map((region) => (
                      <div key={region} className="flex items-center gap-2 text-[#102A43] font-medium">
                        <MapPin className="h-3.5 w-3.5 text-[#E5232E] shrink-0" />
                        <span>{region}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {REGIONS_COL_2.map((region) => (
                      <div key={region} className="flex items-center gap-2 text-[#102A43] font-medium">
                        <MapPin className="h-3.5 w-3.5 text-[#E5232E] shrink-0" />
                        <span>{region}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 mt-6 flex justify-end">
              <Link
                href="/#zones"
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#102A43] hover:text-[#E5232E] group transition-colors"
              >
                <span>Voir toutes les zones</span>
                <ArrowRight className="h-4 w-4 text-[#E5232E] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
