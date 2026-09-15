import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  ShieldCheck,
  Award,
  Wrench,
  Flame,
  PhoneCall,
  CheckCircle2,
  BadgeCheck,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'

export const metadata: Metadata = {
  title: 'Notre Équipe de Chauffagistes Agréés Cerga | Chauffagiste-Belga',
  description:
    'Faites connaissance avec les techniciens chauffagistes certifiés Cerga, G1, G2 et L de Chauffagiste-Belga. Des artisans passionnés au service de votre sécurité en Belgique.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/notre-equipe',
  },
}

const ROLES = [
  {
    title: 'Techniciens Gaz Agréés G1 & G2 (Cerga)',
    badge: 'Spécialistes Gaz & Condensation',
    desc: 'Spécialistes de la combustion gaz (atmosphérique et pulsé), habilités à régler les brûleurs, réaliser les analyses de fumée obligatoires et délivrer les attestations PEB légales.',
    skills: ['Vaillant ecoTEC', 'Bulex ThemaFast', 'Viessmann Vitodens', 'Bosch Condens'],
  },
  {
    title: 'Techniciens Combustibles Liquides (Label L)',
    badge: 'Spécialistes Mazout & Ramonage',
    desc: 'Artisans expérimentés sur brûleurs fioul/mazout, assurant le ramonage minutieux des conduits, le changement des gicleurs et le contrôle rigoureux de la suie et du CO.',
    skills: ['Ramonage mécanique', 'Réglage gicleur Danfoss', 'Corps de chauffe fonte', 'Test Bacharach'],
  },
  {
    title: 'Frigoristes & Installateurs Pompe à Chaleur',
    badge: 'Transition Énergétique PAC',
    desc: 'Ingénieurs et techniciens formés à la manipulation des fluides frigorigènes (F-Gas) pour la pose et la maintenance des pompes à chaleur air-eau et hybrides.',
    skills: ['PAC Air-Eau Daikin / Mitsubishi', 'Dimensionnement RT', 'Dossiers primes Renolution / SPW'],
  },
  {
    title: 'Pôle Dispatching & Permanence 24/7',
    badge: 'Coordination & Urgences',
    desc: 'Une équipe réactive qui analyse votre panne au téléphone dès la première minute, évalue le degré d’urgence et dépêche le technicien le plus proche de votre commune.',
    skills: ['Pré-diagnostic téléphonique', 'Acheminement GPS d’urgence', 'Suivi satisfaction client'],
  },
]

export default function NotreEquipePage() {
  const breadcrumbItems = [{ label: 'Notre équipe', href: '/notre-equipe' }]

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
        <div className="container-default max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <Users className="w-3.5 h-3.5 text-primary" />
            Des professionnels qualifiés & passionnés
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Une équipe d’artisans chauffagistes agréés à vos côtés
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Chez Chauffagiste-Belga, nos intervenants ne sont pas de simples dépanneurs : ce sont des techniciens frigoristes et thermiciens diplômés, formés en continu aux dernières technologies des grands constructeurs européens.
          </p>
        </div>
      </section>

      {/* Grid des métiers */}
      <section className="py-12 md:py-16">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROLES.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block mb-3 px-3 py-1 rounded-lg bg-blue-50 text-brand-blue text-xs font-bold">
                    {role.badge}
                  </div>
                  <h2 className="text-xl font-bold text-brand-dark mb-3">{role.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {role.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Domaines d’intervention :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formation & Sécurité */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container-default max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-4">
            Formation continue aux exigences Cerga & constructeurs
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
            Chaque chauffagiste de notre réseau suit un programme annuel de recyclage technique auprès des centres de formation officiels Vaillant, Bulex, Viessmann et ACV pour maîtriser les cartes électroniques de dernière génération, les sondes d’ambiance et les exigences de dépollution de l’air.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              Demander l’intervention d’un technicien agréé
            </Link>
          </div>
        </div>
      </section>

      <ReassuranceBar />
    </div>
  )
}
