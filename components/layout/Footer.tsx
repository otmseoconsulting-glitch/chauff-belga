// CLIENT: interactive mobile footer accordion & desktop 5-column layout
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  ChevronDown,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { CONTACT } from '@/lib/constants/contact'

export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    services: false,
    zones: false,
    about: false,
    legal: false,
  })

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <footer className="bg-[#051C38] text-slate-400 text-[13px] border-t border-slate-800">
      <div className="container-default py-12 lg:py-16">
        
        {/* Main Grid: Mobile Accordions / Desktop 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1: Brand, Trust & Contact (Always visible) */}
          <div className="flex flex-col items-start gap-4 sm:col-span-2 md:col-span-3 lg:col-span-1 border-b sm:border-b-0 border-slate-800/80 pb-6 sm:pb-0">
            <Link href="/" aria-label="Chauffagiste-Belga — Accueil" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#082B55] text-white shadow-xs">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2C9 6.5 6 9.5 6 14.5C6 18.09 8.91 21 12.5 21C16.09 21 19 18.09 19 14.5C19 11 17 8 14.5 5.5C14 7.5 12.5 9 10.5 9C9 9 7.8 7.8 8.5 6C10 4 11 2.8 12 2Z"
                    fill="#155EEF"
                  />
                  <path
                    d="M12.5 10C10.8 12.5 9.5 14.2 9.5 16C9.5 17.66 10.84 19 12.5 19C14.16 19 15.5 17.66 15.5 16C15.5 14 14.2 12.2 13.5 11C13.2 11.8 12.6 12.2 12 12.2C11.5 12.2 11.2 11.8 11.5 11.2C11.8 10.8 12.2 10.4 12.5 10Z"
                    fill="#E5232E"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg text-white tracking-tight leading-tight">
                  Chauffagiste<span className="text-[#E5232E]">-Belga</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Chauffage • Confort • Performance
                </span>
              </div>
            </Link>

            <p className="text-[12px] text-slate-400 leading-relaxed max-w-xs">
              Spécialiste agréé du chauffage en Belgique : dépannage d’urgence ≤ 2h, entretien obligatoire PEB et installation de chaudières & pompes à chaleur.
            </p>

            {/* Direct Call Box */}
            <a
              href={`tel:${CONTACT.phone.e164}`}
              className="flex items-center gap-3 w-full sm:w-auto p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors group"
              aria-label={`Appeler le service de permanence au ${CONTACT.phone.display}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5232E] text-white shrink-0 shadow-md">
                <Phone className="h-4 w-4 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm text-white tracking-tight leading-tight group-hover:text-red-300 transition-colors">
                  {CONTACT.phone.display}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Permanence d’astreinte 24/7
                </span>
              </div>
            </a>

            {/* Belgian Trust Credentials */}
            <div className="grid grid-cols-2 gap-2 w-full pt-1 text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Agrément Cerga Gaz
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Technicien PEB
              </span>
            </div>
          </div>

          {/* Col 2: NOS SERVICES */}
          <div className="border-b sm:border-b-0 border-slate-800/80 pb-4 sm:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('services')}
              aria-expanded={openSections['services']}
              className="w-full flex items-center justify-between sm:pointer-events-none py-2 sm:py-0 text-left"
            >
              <span className="font-bold text-white text-[14px] uppercase tracking-wider">Nos services</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 sm:hidden transition-transform duration-200 ${
                  openSections['services'] ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            <div
              className={`flex flex-col gap-2 pt-3 sm:pt-4 ${
                openSections['services'] ? 'block' : 'hidden sm:flex'
              }`}
            >
              <Link href="/nos-services" className="font-bold text-red-400 hover:text-white py-1 transition-colors">
                Tous les services &rarr;
              </Link>
              <Link href="/nos-services/depannage-chaudiere" className="hover:text-white py-1 transition-colors">Dépannage chaudière</Link>
              <Link href="/nos-services/entretien-chaudiere" className="hover:text-white py-1 transition-colors">Entretien chaudière</Link>
              <Link href="/nos-services/installation-chauffage" className="hover:text-white py-1 transition-colors">Installation chauffage</Link>
              <Link href="/nos-services/reparation-chaudiere" className="hover:text-white py-1 transition-colors">Réparation chaudière</Link>
              <Link href="/nos-services/regulation-thermostat" className="hover:text-white py-1 transition-colors">Régulation & thermostat</Link>
              <Link href="/nos-services/chauffage-sol" className="hover:text-white py-1 transition-colors">Chauffage au sol</Link>
              <Link href="/nos-services/pompe-chaleur" className="hover:text-white py-1 transition-colors">Pompe à chaleur</Link>
              <Link href="/nos-services/debouchage" className="hover:text-white py-1 transition-colors">Débouchage urgent</Link>
            </div>
          </div>

          {/* Col 3: ZONES D'INTERVENTION */}
          <div className="border-b sm:border-b-0 border-slate-800/80 pb-4 sm:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('zones')}
              aria-expanded={openSections['zones']}
              className="w-full flex items-center justify-between sm:pointer-events-none py-2 sm:py-0 text-left"
            >
              <span className="font-bold text-white text-[14px] uppercase tracking-wider">Zones d&apos;intervention</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 sm:hidden transition-transform duration-200 ${
                  openSections['zones'] ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            <div
              className={`flex flex-col gap-2 pt-3 sm:pt-4 ${
                openSections['zones'] ? 'block' : 'hidden sm:flex'
              }`}
            >
              <Link href="/zones-intervention" className="font-bold text-red-400 hover:text-white py-1 transition-colors">
                Toutes les communes (Hub 24/7) &rarr;
              </Link>
              <Link href="/chauffagiste-bruxelles" className="hover:text-white py-1 transition-colors">Bruxelles (19 communes)</Link>
              <Link href="/chauffagiste-liege" className="hover:text-white py-1 transition-colors">Liège & Agglomération</Link>
              <Link href="/chauffagiste-namur" className="hover:text-white py-1 transition-colors">Namur & Meuse</Link>
              <Link href="/chauffagiste-charleroi" className="hover:text-white py-1 transition-colors">Charleroi & Hainaut</Link>
              <Link href="/chauffagiste-mons" className="hover:text-white py-1 transition-colors">Mons & Borinage</Link>
              <Link href="/chauffagiste-wavre" className="hover:text-white py-1 transition-colors">Brabant wallon (Wavre, Nivelles)</Link>
              <Link href="/chauffagiste-ixelles" className="hover:text-white py-1 transition-colors">Ixelles, Uccle, Schaerbeek</Link>
            </div>
          </div>

          {/* Col 4: À PROPOS & RESSOURCES */}
          <div className="border-b sm:border-b-0 border-slate-800/80 pb-4 sm:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('about')}
              aria-expanded={openSections['about']}
              className="w-full flex items-center justify-between sm:pointer-events-none py-2 sm:py-0 text-left"
            >
              <span className="font-bold text-white text-[14px] uppercase tracking-wider">À propos & Blog</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 sm:hidden transition-transform duration-200 ${
                  openSections['about'] ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            <div
              className={`flex flex-col gap-2 pt-3 sm:pt-4 ${
                openSections['about'] ? 'block' : 'hidden sm:flex'
              }`}
            >
              <Link href="/a-propos" className="hover:text-white py-1 transition-colors">Qui sommes-nous ?</Link>
              <Link href="/notre-equipe" className="hover:text-white py-1 transition-colors">Notre équipe d’artisans</Link>
              <Link href="/nos-engagements" className="hover:text-white py-1 transition-colors">Nos engagements qualité</Link>
              <Link href="/avis-clients" className="hover:text-white py-1 transition-colors">Avis clients (Vérifiés)</Link>
              <Link href="/conseils" className="hover:text-white py-1 transition-colors">Guides & Blog chauffage</Link>
              <Link href="/contact" className="hover:text-white py-1 transition-colors">Contactez-nous</Link>
              <Link href="/faq" className="hover:text-white py-1 transition-colors">Foire aux questions</Link>
            </div>
          </div>

          {/* Col 5: INFORMATIONS LÉGALES & TARIFS */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('legal')}
              aria-expanded={openSections['legal']}
              className="w-full flex items-center justify-between sm:pointer-events-none py-2 sm:py-0 text-left"
            >
              <span className="font-bold text-white text-[14px] uppercase tracking-wider">Tarifs & Légal</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 sm:hidden transition-transform duration-200 ${
                  openSections['legal'] ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            <div
              className={`flex flex-col gap-2 pt-3 sm:pt-4 ${
                openSections['legal'] ? 'block' : 'hidden sm:flex'
              }`}
            >
              <Link href="/tarifs" className="hover:text-white py-1 transition-colors">Grille tarifaire transparente</Link>
              <Link href="/devis" className="hover:text-white py-1 transition-colors">Demande de devis gratuit</Link>
              <Link href="/urgence" className="hover:text-white py-1 transition-colors">Service urgence 24/7</Link>
              <Link href="/mentions-legales" className="hover:text-white py-1 transition-colors">Mentions légales</Link>
              <Link href="/confidentialite" className="hover:text-white py-1 transition-colors">Politique de confidentialité</Link>
              <Link href="/rgpd" className="hover:text-white py-1 transition-colors">Conformité RGPD</Link>
              <Link href="/conditions-generales" className="hover:text-white py-1 transition-colors">Conditions générales (CGV)</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Regional Badge */}
        <div className="pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-400 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Chauffagiste-Belga. Tous droits réservés.</p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-slate-800 text-slate-300 text-xs">
            <span className="text-sm">🇧🇪</span>
            <span>Permanence certifiée active dans toute la Belgique</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
