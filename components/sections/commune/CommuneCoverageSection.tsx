import Link from 'next/link'
import { MapPin, Navigation, ArrowRight, ChevronRight, Building, ShieldCheck } from 'lucide-react'
import type { NearbyCommuneResult } from '@/lib/supabase/communes'

interface CommuneCoverageSectionProps {
  communeName: string
  nearbyCommunes: NearbyCommuneResult[]
  parentMajorHub?: { name_fr: string; slug_fr: string } | null
}

export function CommuneCoverageSection({
  communeName,
  nearbyCommunes,
  parentMajorHub,
}: CommuneCoverageSectionProps) {
  const nearbyNames = nearbyCommunes.slice(0, 5).map((c) => c.name_fr).join(', ')

  return (
    <section className="py-12 md:py-16 bg-[#F7F9FC] border-b border-slate-200/80">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Col 1: Photo Landmark / Local City View Placeholder */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 min-h-[260px] flex flex-col justify-end p-6 text-white shadow-sm">
            {/* Background gradient simulating photographic tone */}
            <div className="absolute inset-0 bg-linear-to-t from-[#051C38] via-[#082B55]/70 to-transparent z-10" />
            
            {/* Visual placeholder backdrop illustration */}
            <div className="absolute inset-0 bg-[#082B55] flex items-center justify-center opacity-40">
              <Building className="w-28 h-28 text-white/20" />
            </div>

            <div className="relative z-20">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold backdrop-blur-xs mb-2">
                <MapPin className="w-3 h-3 text-[#FF5400]" />
                Secteur {communeName}
              </span>
              <h3 className="text-xl font-black text-white leading-snug">
                Patrimoine architectural & spécificités de chauffe locales
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Connaissance experte des circuits de chauffe anciens comme des nouvelles constructions basse énergie.
              </p>
            </div>
          </div>

          {/* Col 2: Text Description & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF5400] uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>{communeName}</span>
              </div>
              <h3 className="text-xl font-black text-brand-dark mb-3">
                Notre zone d’intervention locale
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Nos équipes mobiles circulent quotidiennement dans tous les quartiers de <strong>{communeName}</strong> ainsi que dans les localités voisines{nearbyNames ? ` : ${nearbyNames}` : ''}. Aucun surcoût de déplacement n’est appliqué sur le secteur.
              </p>
            </div>

            {parentMajorHub && (
              <div className="mb-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-brand-dark">
                <span className="font-bold block text-brand-blue mb-0.5">Pôle régional de rattachement :</span>
                <Link
                  href={`/chauffagiste-${parentMajorHub.slug_fr}`}
                  className="font-bold underline hover:text-[#FF5400] transition-colors"
                >
                  Chauffagiste {parentMajorHub.name_fr} & grands axes
                </Link>
              </div>
            )}

            <div>
              <Link
                href="/zones-intervention"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-xs font-bold text-slate-800 transition-colors"
              >
                <span>Voir toutes les communes couvertes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Col 3: Stylized Map & List of Neighbouring Communes */}
          <div id="communes-list" className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-brand-dark uppercase tracking-wider">
                  Communes limitrophes & Proximité
                </h4>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  ≤ 20 km
                </span>
              </div>

              {/* 2-column list matching template */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                {nearbyCommunes.map((c) => (
                  <Link
                    key={c.slug_fr}
                    href={`/chauffagiste-${c.slug_fr}`}
                    className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#FF5400] transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#FF5400] shrink-0" />
                    <span className="font-medium truncate">{c.name_fr}</span>
                    {c.distance_km !== undefined && (
                      <span className="text-[10px] text-slate-400 shrink-0">
                        ~{c.distance_km}km
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Intervention express 7j/7</span>
              <a
                href="tel:0475123456"
                className="font-bold text-[#FF5400] hover:underline"
              >
                0475 12 34 56
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
