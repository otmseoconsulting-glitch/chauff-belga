// CLIENT: GDPR cookie consent banner
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('chauffagiste_cookie_consent')
      if (!consent) {
        setIsVisible(true)
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem('chauffagiste_cookie_consent', 'accepted')
    } catch {
      // Ignore
    }
    setIsVisible(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem('chauffagiste_cookie_consent', 'declined')
    } catch {
      // Ignore
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <aside
      role="dialog"
      aria-label="Gestion des traceurs et cookies"
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:right-auto sm:max-w-sm z-50 p-4 sm:p-5 bg-white/98 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 print:hidden"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-xl bg-blue-50 text-brand-blue shrink-0">
          <Shield className="w-5 h-5 text-brand-blue" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            Protection des données
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Nous utilisons des traceurs techniques essentiels et une mesure d&apos;audience anonyme (RGPD / APD Belgique).{' '}
            <Link
              href="/confidentialite"
              className="text-brand-blue font-medium underline underline-offset-2 hover:text-brand-dark"
            >
              En savoir plus
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={handleDecline}
          className="min-h-[44px] flex items-center justify-center text-xs font-bold px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition active:scale-95"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="min-h-[44px] flex items-center justify-center text-xs font-bold px-3 py-2 rounded-xl bg-brand-dark hover:bg-brand-navy text-white transition shadow-sm active:scale-95"
        >
          Accepter
        </button>
      </div>
    </aside>
  )
}

