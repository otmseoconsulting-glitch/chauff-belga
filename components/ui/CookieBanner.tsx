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
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="container-default flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-xs md:text-sm text-slate-700 max-w-3xl">
          <Shield className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
          <p>
            Nous utilisons des traceurs techniques strictement nécessaires et des outils d&apos;analyse d&apos;audience anonymes (RGPD / APD Belgique) pour assurer la sécurité et mesurer la qualité de nos services.{' '}
            <Link
              href="/politique-confidentialite"
              className="text-brand-blue underline hover:text-brand-dark"
            >
              En savoir plus
            </Link>
            .
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
          <button
            type="button"
            onClick={handleDecline}
            className="text-xs font-semibold px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="text-xs font-bold px-5 py-2 rounded-lg bg-brand-dark text-white hover:bg-brand-navy transition shadow-sm"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
