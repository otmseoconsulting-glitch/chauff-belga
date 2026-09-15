import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Flame,
  ShieldCheck,
  Award,
  Users,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'

export const metadata: Metadata = {
  title: 'À Propos de Chauffagiste-Belga : Réseau d’Artisans Agréés en Belgique',
  description:
    'Découvrez Chauffagiste-Belga : notre histoire, nos valeurs d’artisanat de proximité, nos certifications Cerga et notre mission pour votre confort thermique partout en Belgique.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/a-propos',
  },
}

export default function AProposPage() {
  const breadcrumbItems = [{ label: 'À propos de nous', href: '/a-propos' }]

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'HVACBusiness',
      name: 'Chauffagiste-Belga',
      url: 'https://chauffagiste-belga.be',
      telephone: '+32475123456',
      description:
        'Réseau d’artisans chauffagistes agréés Cerga intervenant 24/7 pour le dépannage, l’entretien légal PEB et l’installation de chaudières en Belgique.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rue de la Loi 227',
        addressLocality: 'Bruxelles',
        postalCode: '1040',
        addressCountry: 'BE',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Belgique',
      },
    },
  }

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 bg-white border-b border-slate-200/80">
        <div className="container-default max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <Flame className="w-3.5 h-3.5 text-primary" />
            L’artisanat chauffagiste d’excellence en Belgique
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-6">
            Votre partenaire de confiance pour un chauffage sûr, économique et durable
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Fondé par des passionnés du génie climatique, Chauffagiste-Belga fédère les meilleurs artisans chauffagistes certifiés Cerga pour apporter une réponse rapide, honnête et irréprochable à chaque foyer belge.
          </p>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="container-default">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-brand-blue mb-1">15 000+</div>
              <div className="text-xs md:text-sm text-slate-300 font-medium">Interventions réalisées</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-brand-blue mb-1">24h/7j</div>
              <div className="text-xs md:text-sm text-slate-300 font-medium">Permanence d’urgence</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">100%</div>
              <div className="text-xs md:text-sm text-slate-300 font-medium">Agréés Cerga & PEB</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">4.9 / 5</div>
              <div className="text-xs md:text-sm text-slate-300 font-medium">+850 avis clients vérifiés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission & Valeurs */}
      <section className="py-16 md:py-20">
        <div className="container-default max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Réactivité immédiate</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Une chaudière en panne en plein hiver ne peut pas attendre. Grâce à notre maillage local sur Bruxelles, la Wallonie et la Flandre, nous dépêchons un technicien en moins de 24h.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Transparence totale</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pas de devis flou ni de factures surprises. Nos forfaits sont annoncés à l’avance, avec pièces d’origine certifiées constructeurs et devis validé avant toute réparation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Expertise certifiée</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tous nos intervenants détiennent les labels officiels Cerga (gaz) et combustibles liquides (mazout), habilités à délivrer les attestations légales exigées par votre assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container-default max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-4">
            Besoin d’un chauffagiste qualifié près de chez vous ?
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-6">
            Découvrez nos services d’entretien, de dépannage et d’installation ou contactez notre équipe 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/nos-services"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              Consulter nos prestations
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
            >
              Contacter notre équipe
            </Link>
          </div>
        </div>
      </section>

      <ReassuranceBar />
    </div>
  )
}
