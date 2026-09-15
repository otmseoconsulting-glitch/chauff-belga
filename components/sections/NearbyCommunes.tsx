import Link from 'next/link'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'

export interface NearbyCommuneItem {
  id: string
  name_fr: string
  slug_fr: string
  postal_code?: string
  distance_km?: number
}

export interface ParentMajorHubItem {
  id?: string
  name_fr: string
  slug_fr: string
  distance_km?: number
}

interface NearbyCommunesProps {
  currentCommuneName: string
  nearbyCommunes: NearbyCommuneItem[]
  parentMajorHub?: ParentMajorHubItem | null
}

export function NearbyCommunes({
  currentCommuneName,
  nearbyCommunes,
  parentMajorHub,
}: NearbyCommunesProps) {
  if ((!nearbyCommunes || nearbyCommunes.length === 0) && !parentMajorHub) return null

  return (
    <section className="section-padding bg-[#F7F9FC] border-t border-slate-200/80">
      <div className="container-default">
        {/* Upward Link to Major Authority Hub (Hub-and-Spoke Rule §4) */}
        {parentMajorHub && (
          <div className="mb-10 p-6 rounded-2xl bg-white border-2 border-[#155EEF]/20 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF] shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#155EEF] block">
                  Pôle d&apos;intervention régional principal
                </span>
                <h3 className="font-display text-lg font-bold text-[#102A43]">
                  Chauffagiste certifié à {parentMajorHub.name_fr}
                </h3>
                <p className="text-[13px] text-[#64748B]">
                  Notre centrale technique dessert {currentCommuneName} et l&apos;ensemble de l&apos;agglomération de {parentMajorHub.name_fr}.
                </p>
              </div>
            </div>

            <Link
              href={`/chauffagiste-${parentMajorHub.slug_fr}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#082B55] hover:bg-[#102A43] px-5 py-3 rounded-full transition-colors shrink-0 group"
            >
              <span>Voir le centre de {parentMajorHub.name_fr}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Lateral Neighboring Communes Grid */}
        {nearbyCommunes && nearbyCommunes.length > 0 && (
          <>
            <div className="max-w-3xl mb-10">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
                Maillage local & proximité
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#102A43] tracking-tight leading-tight">
                Chauffagistes disponibles près de {currentCommuneName}
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] font-normal mt-2 leading-relaxed">
                Nos équipes mobiles couvrent également les communes limitrophes sans surcoût de déplacement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {nearbyCommunes.map((commune) => (
                <Link
                  key={commune.slug_fr}
                  href={`/chauffagiste-${commune.slug_fr}`}
                  className="group flex flex-col justify-between p-5 rounded-xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card-hover hover:border-[#155EEF]/40 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[#082B55] group-hover:text-[#E5232E] transition-colors mb-2">
                      <MapPin className="h-4 w-4 text-[#E5232E] shrink-0" />
                      <span className="font-display font-bold text-[16px] leading-tight">
                        {commune.name_fr}
                      </span>
                    </div>
                    {commune.postal_code && (
                      <span className="text-[12px] text-slate-500 font-medium block">
                        Code postal : {commune.postal_code}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[12px] font-bold text-[#155EEF] pt-4 mt-3 border-t border-slate-100">
                    <span>
                      {typeof commune.distance_km === 'number'
                        ? `À ~${commune.distance_km.toFixed(1)} km`
                        : 'Secteur direct'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
