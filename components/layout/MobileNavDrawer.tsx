// CLIENT: interactive mobile navigation drawer with touch ergonomics & accessibility
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  X,
  Phone,
  Flame,
  ChevronDown,
  Clock,
  ShieldCheck,
  ArrowRight,
  FileText,
  HelpCircle,
  Users,
  Award,
  Sparkles,
  MapPin,
  Wrench,
  CheckCircle2,
  Hammer,
  Gauge,
  Layers,
  Zap,
  Droplets,
} from 'lucide-react'
import { CONTACT } from '@/lib/constants/contact'

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CORE_SERVICES = [
  {
    label: 'Dépannage chaudière',
    href: '/nos-services/depannage-chaudiere',
    icon: Flame,
    badge: 'Urgence ≤ 2h',
    badgeColor: 'text-[#FF5400] bg-orange-50 border-orange-200',
  },
  {
    label: 'Entretien chaudière',
    href: '/nos-services/entretien-chaudiere',
    icon: CheckCircle2,
    badge: 'Légal PEB',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    label: 'Installation chauffage',
    href: '/nos-services/installation-chauffage',
    icon: Wrench,
    badge: 'Primes',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  {
    label: 'Réparation chaudière',
    href: '/nos-services/reparation-chaudiere',
    icon: Hammer,
    badge: 'Toutes marques',
    badgeColor: 'text-slate-700 bg-slate-100 border-slate-200',
  },
  {
    label: 'Régulation & thermostat',
    href: '/nos-services/regulation-thermostat',
    icon: Gauge,
    badge: 'Éco énergie',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    label: 'Chauffage au sol',
    href: '/nos-services/chauffage-sol',
    icon: Layers,
    badge: 'Confort',
    badgeColor: 'text-slate-700 bg-slate-100 border-slate-200',
  },
  {
    label: 'Pompe à chaleur',
    href: '/nos-services/pompe-chaleur',
    icon: Zap,
    badge: 'Avenir',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  {
    label: 'Débouchage urgent',
    href: '/nos-services/debouchage',
    icon: Droplets,
    badge: '24/7',
    badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
  },
]

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false)

  // Body scroll lock on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation mobile"
      className="fixed inset-0 z-50 lg:hidden flex justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Container (Smooth Slide-in from right) */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-white h-full flex flex-col shadow-2xl z-10 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5"
            aria-label="Chauffagiste-Belga — Accueil"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#082B55] text-white shadow-xs">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight leading-none text-[#082B55]">
                Chauffagiste<span className="text-[#E5232E]">-Belga</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                Chauffage • Confort • Sécurité
              </span>
            </div>
          </Link>

          {/* Close button with 44px tap target */}
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-11 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Emergency Fast Call Banner */}
        <div className="p-4 bg-gradient-to-r from-[#082B55] to-[#123E73] text-white shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Permanence d’astreinte 24/7
            </span>
            <span className="text-[10px] text-slate-200">Arrivée ≤ 2h</span>
          </div>
          <a
            href={`tel:${CONTACT.phone.e164}`}
            className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-[#FF5400] hover:bg-[#E04B00] text-white font-extrabold text-sm shadow-md active:scale-98 transition-all"
            aria-label={`Appeler le ${CONTACT.phone.display}`}
          >
            <Phone className="w-4 h-4 fill-white animate-bounce" />
            <span>APPEL DIRECT : {CONTACT.phone.display}</span>
          </a>
        </div>

        {/* Scrollable Navigation Body */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-slate-100">
          {/* Main Quick Links */}
          <div className="space-y-1 pt-1">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold text-[#102A43] hover:bg-slate-50 active:bg-slate-100 min-h-[48px]"
            >
              <span>Accueil</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* Accordion: Nos Services */}
            <div>
              <button
                type="button"
                onClick={() => setServicesExpanded(!servicesExpanded)}
                aria-expanded={servicesExpanded}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold text-[#102A43] hover:bg-slate-50 active:bg-slate-100 min-h-[48px] text-left"
              >
                <span className="flex items-center gap-2">
                  <span>Nos services de chauffage</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue font-semibold border border-blue-100">
                    8
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    servicesExpanded ? 'rotate-180 text-brand-blue' : ''
                  }`}
                />
              </button>

              {servicesExpanded && (
                <div className="mt-1 ml-2 pl-3 border-l-2 border-slate-200 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/nos-services"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-brand-blue hover:bg-blue-50 min-h-[40px]"
                  >
                    <span>Tous nos services (Vue globale)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {CORE_SERVICES.map((srv) => {
                    const Icon = srv.icon
                    return (
                      <Link
                        key={srv.href}
                        href={srv.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-brand-dark hover:bg-slate-50 min-h-[42px]"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{srv.label}</span>
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${srv.badgeColor}`}
                        >
                          {srv.badge}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Urgence 24/7 dedicated link */}
            <Link
              href="/urgence"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-extrabold text-[#E5232E] hover:bg-red-50 active:bg-red-100 min-h-[48px]"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#E5232E]" />
                <span>Urgence Dépannage 24/7</span>
              </span>
              <span className="text-[10px] uppercase font-extrabold bg-[#E5232E] text-white px-2 py-0.5 rounded-full">
                Flash
              </span>
            </Link>

            <Link
              href="/tarifs"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 active:bg-slate-100 min-h-[48px]"
            >
              <span>Tarifs & Forfaits clairs</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/conseils"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 active:bg-slate-100 min-h-[48px]"
            >
              <span>Guides & Conseils PEB</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/avis-clients"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 active:bg-slate-100 min-h-[48px]"
            >
              <span>Avis clients vérifiés (4.9/5)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Institutional / Trust Links */}
          <div className="space-y-1 pt-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3.5 block mb-1">
              À propos & Informations
            </span>
            <Link
              href="/a-propos"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 min-h-[40px]"
            >
              <span>Qui sommes-nous ?</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
            <Link
              href="/nos-engagements"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 min-h-[40px]"
            >
              <span>Engagements qualité & certifications</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 min-h-[40px]"
            >
              <span>Contact & coordonnées</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
            <Link
              href="/faq"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 min-h-[40px]"
            >
              <span>Foire aux questions (FAQ)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
          </div>
        </nav>

        {/* Bottom Drawer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0 space-y-3">
          <Link
            href="/devis"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#E5232E] hover:bg-[#D01B25] text-white font-extrabold text-sm shadow-md transition-all active:scale-98"
          >
            <span>Demander un devis gratuit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Belgian Trust Badges */}
          <div className="flex items-center justify-around text-[11px] text-slate-500 font-medium pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Cerga Gaz
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-blue" />
              ≤ 2h sur place
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Agrément PEB
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
