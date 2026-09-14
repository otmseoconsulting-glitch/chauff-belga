// CLIENT: interactive postal code auto-lookup widget
'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import { Search, MapPin, Loader2, ArrowRight, Phone } from 'lucide-react'
import { lookupPostal, type CommuneSearchResult } from '@/app/actions/lookup-postal'
import { CONTACT } from '@/lib/constants/contact'

interface PostalLookupProps {
  className?: string
  placeholder?: string
  buttonLabel?: string
  onSelectCommune?: (commune: CommuneSearchResult) => void
}

export function PostalLookup({
  className = '',
  placeholder = 'Entrez votre code postal (ex: 1000, 4000, 7000...)',
  buttonLabel = 'Vérifier',
  onSelectCommune,
}: PostalLookupProps) {
  const [postalCode, setPostalCode] = useState('')
  const [results, setResults] = useState<CommuneSearchResult[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (code: string) => {
    const trimmed = code.trim()
    setErrorMessage(null)
    setResults([])
    setHasSearched(false)

    if (trimmed.length < 4) {
      return
    }

    startTransition(async () => {
      setHasSearched(true)
      const res = await lookupPostal(trimmed)
      if (res.success) {
        setResults(res.data)
      } else {
        setErrorMessage(res.error)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPostalCode(value)
    if (value.length === 4) {
      handleSearch(value)
    } else {
      setResults([])
      setErrorMessage(null)
      setHasSearched(false)
    }
  }

  return (
    <div className={`relative w-full max-w-xl ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(postalCode)
        }}
        className="flex items-stretch gap-2 bg-white p-1.5 rounded-xl shadow-md border border-slate-200 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition"
      >
        <div className="relative flex-1 flex items-center pl-3">
          <MapPin className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={postalCode}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full bg-transparent text-slate-900 text-sm md:text-base outline-none font-medium placeholder:text-slate-400"
            aria-label="Code postal belge"
          />
          {isPending && (
            <Loader2 className="w-5 h-5 text-brand-blue animate-spin shrink-0 mr-2" />
          )}
        </div>

        <button
          type="submit"
          disabled={postalCode.length !== 4 || isPending}
          className="bg-primary hover:bg-primary-hover text-white text-sm md:text-base font-bold px-5 py-3 rounded-lg transition flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
            {results.length} commune{results.length > 1 ? 's' : ''} trouvée{results.length > 1 ? 's' : ''} pour {postalCode}
          </div>
          <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
            {results.map((item) => (
              <li key={item.id}>
                {onSelectCommune ? (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCommune(item)
                      setResults([])
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50/50 flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-brand-blue transition">
                        Chauffagiste {item.nameFr}
                      </div>
                      <div className="text-xs text-slate-500">
                        Province de {item.province} • Dépannage ≤ 24h
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-brand-blue bg-blue-50 group-hover:bg-brand-blue group-hover:text-white px-2.5 py-1 rounded-full transition">
                      Sélectionner
                    </span>
                  </button>
                ) : (
                  <Link
                    href={`/chauffagiste-${item.slug}`}
                    className="px-4 py-3 hover:bg-blue-50/50 flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-brand-blue transition">
                        Chauffagiste {item.nameFr}
                      </div>
                      <div className="text-xs text-slate-500">
                        Province de {item.province} • Dépannage ≤ 24h
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-brand-blue">
                      <span>Voir la page locale</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error / No Result Alert */}
      {hasSearched && !isPending && errorMessage && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-amber-200 p-4 z-50 animate-in fade-in duration-200">
          <p className="text-sm text-slate-700 mb-2">
            {errorMessage}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Besoin d&apos;assistance immédiate ?</span>
            <a
              href={`tel:${CONTACT.phone.e164}`}
              className="font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CONTACT.phone.display}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
