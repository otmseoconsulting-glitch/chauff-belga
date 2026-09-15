// CLIENT: interactive postal code and commune live search
'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, X, ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import type { RegionZoneGroup } from '@/lib/supabase/communes'

interface ZoneSearchFilterProps {
  groups: RegionZoneGroup[]
}

export function ZoneSearchFilter({ groups }: ZoneSearchFilterProps) {
  const [query, setQuery] = useState('')
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all')

  // Flatten all communes for fast searching
  const allCommunes = useMemo(() => {
    return groups.flatMap((g) =>
      g.communes.map((c) => ({
        ...c,
        regionName: g.name_fr,
        regionId: g.regionId,
        interventionDelay: g.interventionDelay,
      }))
    )
  }, [groups])

  // Filtered communes
  const filteredCommunes = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allCommunes.filter((c) => {
      const matchesRegion = selectedRegionId === 'all' || c.regionId === selectedRegionId
      if (!matchesRegion) return false

      if (!q) return true

      const matchesName = c.name_fr.toLowerCase().includes(q)
      const matchesPostal = c.postal_codes.some((cp) => cp.includes(q))
      const matchesRegionName = c.regionName.toLowerCase().includes(q)

      return matchesName || matchesPostal || matchesRegionName
    })
  }, [allCommunes, query, selectedRegionId])

  const totalCount = allCommunes.length

  return (
    <div className="w-full">
      {/* Search Input Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200 mb-8">
        <div className="relative">
          <label htmlFor="commune-search" className="sr-only">
            Rechercher votre commune ou code postal
          </label>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#155EEF]">
            <Search className="w-5 h-5 text-[#155EEF]" aria-hidden="true" />
          </div>
          <input
            id="commune-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Entrez votre commune ou code postal (ex. 1050, Ixelles, Waterloo, 7000...)"
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#102A43] placeholder:text-slate-400 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155EEF]/30 focus:border-[#155EEF] transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition"
              aria-label="Effacer la recherche"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Region filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setSelectedRegionId('all')}
            className={`px-3.5 py-2 rounded-full font-bold whitespace-nowrap transition cursor-pointer ${
              selectedRegionId === 'all'
                ? 'bg-[#082B55] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            Toutes les zones ({totalCount})
          </button>
          {groups.map((g) => (
            <button
              key={g.regionId}
              type="button"
              onClick={() => setSelectedRegionId(g.regionId)}
              className={`px-3.5 py-2 rounded-full font-bold whitespace-nowrap transition cursor-pointer ${
                selectedRegionId === g.regionId
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {g.name_fr.replace('Province du ', '').replace('Province de ', '').replace('Région de ', '')} ({g.communes.length})
            </button>
          ))}
        </div>

        {/* Live counter */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1.5 font-bold text-[#082B55]">
            <MapPin className="w-3.5 h-3.5 text-[#E5232E]" />
            {filteredCommunes.length} commune{filteredCommunes.length > 1 ? 's' : ''} disponible{filteredCommunes.length > 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            Intervention urgente en moins de 45 min
          </span>
        </div>
      </div>

      {/* When filtering / searching is active */}
      {(query.trim().length > 0 || selectedRegionId !== 'all') ? (
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-[#082B55] flex items-center gap-2">
              <span>Résultats de recherche</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-[#155EEF] font-bold">
                {filteredCommunes.length}
              </span>
            </h2>
            {(query || selectedRegionId !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setSelectedRegionId('all')
                }}
                className="text-xs text-[#155EEF] hover:text-[#082B55] hover:underline font-bold cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>

          {filteredCommunes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300">
              <p className="text-slate-700 font-semibold">
                Aucune commune trouvée pour &laquo;&nbsp;{query}&nbsp;&raquo;.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Nos équipes interviennent également dans toutes les entités limitrophes. Contactez notre permanence au 0475 12 34 56.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredCommunes.map((c) => (
                <Link
                  key={c.id}
                  href={`/chauffagiste-${c.slug_fr}`}
                  className="group bg-white rounded-xl p-4 border border-slate-200 hover:border-[#155EEF] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-extrabold text-sm text-[#082B55] group-hover:text-[#155EEF] transition">
                        {c.name_fr}
                      </span>
                      {c.is_major_hub && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                          Hub
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                      <span className="font-medium">CP : {c.postal_codes.join(', ')}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {c.interventionDelay}
                    </span>
                    <span className="text-[#155EEF] font-extrabold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                      Détails <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Default View: Regional Directory */
        <div className="space-y-12 mb-16">
          {groups.map((group) => (
            <section
              key={group.regionId}
              id={group.slug_fr}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm"
            >
              {/* Region Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200">
                      {group.badge}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {group.interventionDelay}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#082B55] tracking-tight">
                    {group.name_fr}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                    <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
                    <span>Agrément régional vérifié</span>
                  </div>
                </div>
              </div>

              {/* Communes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
                {group.communes.map((c) => (
                  <Link
                    key={c.id}
                    href={`/chauffagiste-${c.slug_fr}`}
                    className="group flex flex-col justify-between p-3.5 rounded-xl bg-slate-50/80 hover:bg-white hover:border-[#155EEF] border border-slate-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-bold text-xs sm:text-sm text-[#102A43] group-hover:text-[#155EEF] transition line-clamp-1">
                        {c.name_fr}
                      </span>
                      {c.is_major_hub && (
                        <span className="w-2 h-2 rounded-full bg-[#E5232E] shrink-0 mt-1" title="Centre d'intervention principal" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                      <span>{c.postal_codes[0]}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#155EEF] group-hover:translate-x-0.5 transition" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
