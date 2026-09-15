import Link from 'next/link'
import { Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#051C38] text-slate-400 text-[13px] border-t border-slate-800">
      <div className="container-default py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Contact */}
          <div className="flex flex-col items-start gap-4">
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

            <p className="text-[12px] text-slate-400 leading-relaxed max-w-xs mt-1">
              Spécialiste agréé du chauffage en Belgique : dépannage rapide, entretien légal PEB et installation haute performance.
            </p>

            <a
              href="tel:0475123456"
              className="flex items-center gap-3 mt-1 text-white hover:text-red-400 transition-colors group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-[#E5232E]/20 group-hover:text-red-400 transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm text-white leading-tight">0475 12 34 56</span>
                <span className="text-[11px] text-slate-400">Disponible 24/7</span>
              </div>
            </a>

            <div className="flex items-center gap-3 pt-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors text-xs font-bold">f</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors text-xs font-bold">in</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors text-xs font-bold">ig</span>
            </div>
          </div>

          {/* Col 2: NOS SERVICES */}
          <div className="flex flex-col gap-2.5">
            <Link href="/nos-services" className="font-bold text-white text-[14px] uppercase tracking-wider mb-2 hover:text-red-400 transition-colors">Nos services</Link>
            <Link href="/nos-services/depannage-chaudiere" className="hover:text-white transition-colors">Dépannage chaudière</Link>
            <Link href="/nos-services/entretien-chaudiere" className="hover:text-white transition-colors">Entretien chaudière</Link>
            <Link href="/nos-services/installation-chauffage" className="hover:text-white transition-colors">Installation chauffage</Link>
            <Link href="/nos-services/reparation-chaudiere" className="hover:text-white transition-colors">Réparation chaudière</Link>
            <Link href="/nos-services/regulation-thermostat" className="hover:text-white transition-colors">Régulation & thermostat</Link>
            <Link href="/nos-services/chauffage-sol" className="hover:text-white transition-colors">Chauffage au sol</Link>
            <Link href="/nos-services/pompe-chaleur" className="hover:text-white transition-colors">Pompe à chaleur</Link>
            <Link href="/nos-services/debouchage" className="hover:text-white transition-colors">Débouchage urgent</Link>
          </div>

          {/* Col 3: ZONES D'INTERVENTION */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-white text-[14px] uppercase tracking-wider mb-2">Zones d&apos;intervention</span>
            <Link href="/#zones" className="hover:text-white transition-colors">Bruxelles</Link>
            <Link href="/#zones" className="hover:text-white transition-colors">Brabant flamand</Link>
            <Link href="/#zones" className="hover:text-white transition-colors">Brabant wallon</Link>
            <Link href="/#zones" className="hover:text-white transition-colors">Liège</Link>
            <Link href="/#zones" className="hover:text-white transition-colors">Namur</Link>
            <Link href="/#zones" className="hover:text-white transition-colors">Hainaut</Link>
            <Link href="/#zones" className="hover:text-white transition-colors">Luxembourg</Link>
            <Link href="/#zones" className="hover:text-white transition-colors">Toute la Belgique</Link>
          </div>

          {/* Col 4: À PROPOS */}
          <div className="flex flex-col gap-2.5">
            <Link href="/a-propos" className="font-bold text-white text-[14px] uppercase tracking-wider mb-2 hover:text-red-400 transition-colors">À propos</Link>
            <Link href="/notre-equipe" className="hover:text-white transition-colors">Notre équipe</Link>
            <Link href="/nos-engagements" className="hover:text-white transition-colors">Nos engagements</Link>
            <Link href="/avis-clients" className="hover:text-white transition-colors">Avis clients</Link>
            <Link href="/conseils" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>

          {/* Col 5: INFORMATIONS */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-white text-[14px] uppercase tracking-wider mb-2">Informations</span>
            <Link href="/tarifs" className="hover:text-white transition-colors">Tarifs</Link>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="/rgpd" className="hover:text-white transition-colors">RGPD</Link>
            <Link href="/conditions-generales" className="hover:text-white transition-colors">Conditions générales</Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} Chauffagiste-Belga. Tous droits réservés.</p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-slate-800 text-slate-300">
            <span className="text-sm">🇧🇪</span>
            <span>Intervention partout en Belgique</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
