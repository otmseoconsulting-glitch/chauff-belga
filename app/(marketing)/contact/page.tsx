import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { LeadForm } from '@/components/forms/LeadForm'

export const metadata: Metadata = {
  title: 'Contact Chauffagiste Belgique : Dépannage 24/7 & Devis Gratuit | Chauffagiste-Belga',
  description:
    'Contactez Chauffagiste-Belga 24h/24 et 7j/7 au 0475 12 34 56. Devis gratuit pour dépannage chaudière d’urgence, entretien PEB et installation partout en Belgique.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/contact',
  },
}

export default function ContactPage() {
  const breadcrumbItems = [{ label: 'Contactez-nous', href: '/contact' }]

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Chauffagiste-Belga',
    url: 'https://chauffagiste-belga.be/contact',
    mainEntity: {
      '@type': 'HVACBusiness',
      name: 'Chauffagiste-Belga',
      telephone: '+32475123456',
      email: 'contact@chauffagiste-belga.be',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rue de la Loi 227',
        addressLocality: 'Bruxelles',
        postalCode: '1040',
        addressCountry: 'BE',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
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
      <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
        <div className="container-default max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-red-700 font-bold text-xs uppercase tracking-wider mb-4 border border-red-200">
            <Phone className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            Permanence téléphonique 24h/24 & 7j/7
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Contactez notre équipe de chauffagistes agréés
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Une panne urgente ou un projet d’installation ? Nos techniciens interviennent sous 24h dans toutes les communes belges.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-12 md:py-16">
        <div className="container-default max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Cards Col */}
            <div className="space-y-4">
              {/* Phone card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-brand-dark mb-1">Urgences & Dépannage</h2>
                <p className="text-xs text-slate-500 mb-4">Ligne directe avec le dispatcher technique</p>
                <a
                  href="tel:0475123456"
                  className="block text-center py-2.5 px-4 rounded-xl bg-[#E5232E] hover:bg-red-700 text-white font-black text-sm tracking-wide transition-colors"
                >
                  0475 12 34 56
                </a>
                <span className="block text-center text-[11px] text-slate-400 mt-2">
                  Disponible 24h/24 y compris dimanche et jours fériés
                </span>
              </div>

              {/* Email & Support */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-brand-dark mb-1">Demandes Administratives & Devis</h2>
                <p className="text-xs text-slate-500 mb-3">Réponse garantie en moins de 2 heures ouvrées</p>
                <a
                  href="mailto:contact@chauffagiste-belga.be"
                  className="text-sm font-bold text-brand-blue hover:underline break-all"
                >
                  contact@chauffagiste-belga.be
                </a>
              </div>

              {/* Siège social */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-brand-dark mb-1">Siège Administratif</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rue de la Loi 227<br />
                  1040 Bruxelles, Belgique<br />
                  BCE : BE 0745.892.314
                </p>
                <span className="block text-[11px] text-slate-400 mt-2">
                  Nos techniciens mobiles rayonnent depuis Bruxelles, Liège, Namur, Charleroi et Mons.
                </span>
              </div>
            </div>

            {/* Quick Form */}
            <div className="lg:col-span-2">
              <LeadForm
                variant="full"
                sourceUrl="/contact"
                className="shadow-xs border border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      <ReassuranceBar />
    </div>
  )
}
