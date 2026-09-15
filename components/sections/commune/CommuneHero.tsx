import Link from 'next/link'
import {
  Phone,
  ArrowRight,
  Clock,
  UserCheck,
  Receipt,
  ShieldCheck,
  Send,
  Lock,
  User,
  Mail,
  FileText,
  MapPin,
  Sparkles,
} from 'lucide-react'
import type { CommuneRecord } from '@/lib/supabase/communes'

interface CommuneHeroProps {
  commune: CommuneRecord
}

export function CommuneHero({ commune }: CommuneHeroProps) {
  const postal = commune.postal_codes?.[0] ?? ''
  const regionName = commune.provinces?.name_fr ?? 'belge'

  return (
    <section className="relative bg-white pt-6 pb-12 lg:pt-8 lg:pb-16 border-b border-slate-100 overflow-hidden">
      <div className="container-default">
        
        {/* Breadcrumb line from template: Accueil > Chauffagiste > Commune */}
        <nav aria-label="Fil d'Ariane" className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-800 transition-colors">Accueil</Link>
          <span>&gt;</span>
          <Link href="/nos-services" className="hover:text-slate-800 transition-colors">Chauffagiste</Link>
          <span>&gt;</span>
          <span className="font-bold text-[#FF5400]">{commune.name_fr}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Heading + Copy + Badges + CTAs + Visual */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Pre-title */}
              <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF5400]" />
                <span>CHAUFFAGISTE À {commune.name_fr.toUpperCase()}</span>
              </div>

              {/* H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-brand-dark tracking-tight leading-[1.15] mb-4">
                Votre chauffagiste à{' '}
                <span className="text-[#FF5400]">{commune.name_fr}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Dépannage, entretien et installation de votre système de chauffage. Intervention rapide dans toute la région {regionName} ({postal}).
              </p>

              {/* 4 Trust Badges in 2x2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7 max-w-xl">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-snug">
                      Intervention rapide
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      24h/24 – 7j/7
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue shrink-0">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-snug">
                      Techniciens agréés
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Certifiés Cerga & PEB
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue shrink-0">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-snug">
                      Devis gratuit
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Clair et transparent
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-snug">
                      Garantie 2 ans
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Pièces & main-d’œuvre
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                <a
                  href="tel:0475123456"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FF5400] hover:bg-[#E54A00] text-white font-black text-sm tracking-wide transition-all shadow-md hover:shadow-lg"
                >
                  <Phone className="h-4 w-4 fill-white" />
                  <span>0475 12 34 56</span>
                </a>

                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-colors group"
                >
                  <span>Demander un devis gratuit</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Visual Photo Placeholder of Technician & Skyline */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-linear-to-r from-[#051C38] via-[#082B55] to-[#155EEF]/80 p-6 sm:p-8 text-white min-h-[160px] flex items-center justify-between shadow-xs">
              <div className="relative z-10 max-w-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold mb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Artisans en tournée • Secteur {postal}
                </span>
                <p className="font-black text-lg sm:text-xl text-white tracking-tight">
                  Techniciens locaux équipés pour 95% des réparations immédiates
                </p>
                <p className="text-slate-300 text-xs mt-1">
                  Pièces d’origine multimarques (Vaillant, Bulex, Viessmann, Bosch) en stock dans nos véhicules d’intervention.
                </p>
              </div>

              {/* Stylized Technician Avatar/Badge */}
              <div className="hidden sm:flex flex-col items-center justify-center h-24 w-24 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs text-center p-2 shrink-0">
                <ShieldCheck className="w-8 h-8 text-white mb-1" />
                <span className="text-[10px] font-extrabold uppercase text-white tracking-wider">Agréé Cerga</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form Card (Exact template match) */}
          <div id="lead-form" className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 sm:p-7 border border-slate-200 shadow-xl relative">
              <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight leading-snug">
                  Besoin d’un chauffagiste à {commune.name_fr} ?
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Recevez une réponse rapide sous 2h.
                </p>
              </div>

              <form action="/devis" method="GET" className="space-y-3.5">
                {/* Nom */}
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nom complet"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5400]/30 focus:border-[#FF5400] transition-colors"
                  />
                </div>

                {/* Téléphone */}
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Téléphone"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5400]/30 focus:border-[#FF5400] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Votre email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5400]/30 focus:border-[#FF5400] transition-colors"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                  <select
                    name="service"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5400]/30 focus:border-[#FF5400] transition-colors"
                  >
                    <option value="">Type de service</option>
                    <option value="depannage">Dépannage d’urgence</option>
                    <option value="entretien">Entretien chaudière obligatoire</option>
                    <option value="installation">Installation / Remplacement</option>
                    <option value="regulation">Réglage & thermostat</option>
                    <option value="chauffage-sol">Chauffage au sol</option>
                    <option value="pompe-chaleur">Pompe à chaleur</option>
                    <option value="debouchage">Débouchage canalisations</option>
                  </select>
                </div>

                {/* Textarea */}
                <div>
                  <textarea
                    rows={3}
                    name="details"
                    placeholder="Décrivez votre demande..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5400]/30 focus:border-[#FF5400] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FF5400] hover:bg-[#E54A00] text-white font-extrabold text-sm tracking-wide transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Envoyer ma demande</span>
                </button>

                {/* Privacy note */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <Lock className="h-3 w-3 text-slate-400" />
                  <span>Vos données sont protégées (RGPD)</span>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
