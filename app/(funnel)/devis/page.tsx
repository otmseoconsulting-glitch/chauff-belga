import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  Star,
  Zap,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { LeadForm } from '@/components/forms/LeadForm'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { CONTACT } from '@/lib/constants/contact'

export const metadata: Metadata = {
  title: 'Demande de Devis Chauffagiste Gratuit & Sans Engagement | Chauffagiste-Belga',
  description:
    'Obtenez un devis gratuit et précis pour votre chaudière en Belgique. Dépannage sous 2h, entretien annuel obligatoire PEB ou nouvelle installation. Artisans agréés Cerga.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/devis',
  },
}

export default function DevisPage() {
  const breadcrumbItems = [
    { label: 'Demande de devis gratuit', href: '/devis' },
  ]

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* Breadcrumb strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Form & Reassurance Grid */}
      <section className="py-10 md:py-16">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Reassurance & Guarantees (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-brand-blue font-bold text-xs uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  Devis clair en moins de 24h
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight leading-tight">
                  Demandez votre devis gratuit en 2 minutes
                </h1>
                <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                  Remplissez notre formulaire pour recevoir une estimation transparente et sans engagement d&apos;un chauffagiste agréé Cerga actif dans votre commune.
                </p>
              </div>

              {/* Key Benefits List */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Nos 4 engagements de transparence
                </h2>

                <ul className="space-y-3.5 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Prix fixes et fermes :</strong> Aucun frais surprise, le devis est validé avec vous avant chaque intervention.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Artisans 100% certifiés :</strong> Habilitations officielles Cerga, G1/G2 (gaz) et L (mazout).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Attestation légale PEB :</strong> Conformité garantie pour vos obligations de propriétaire et d&apos;assurance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Pièces constructeur d&apos;origine :</strong> Compatible toutes marques (Vaillant, Bulex, Viessmann, Bosch...).
                    </span>
                  </li>
                </ul>
              </div>

              {/* Emergency Call Box */}
              <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-md border border-brand-navy">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" />
                  Urgence absolue ?
                </div>
                <h3 className="font-black text-lg mb-1">
                  Chaudière en panne ou fuite d&apos;eau ?
                </h3>
                <p className="text-slate-300 text-xs md:text-sm mb-4">
                  Ne perdez pas de temps par formulaire. Appelez immédiatement notre permanence technique pour un dépannage express en moins de 2h.
                </p>
                <a
                  href={`tel:${CONTACT.phone.e164}`}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CONTACT.phone.display} (Ligne 24/7)</span>
                </a>
              </div>

              {/* Customer Rating snippet */}
              <div className="flex items-center gap-3 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  <strong>4.8 / 5</strong> sur plus de 1 200 avis clients vérifiés en Belgique
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form (7 cols) */}
            <div className="lg:col-span-7">
              <LeadForm variant="full" sourceUrl="/devis" />
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Bar */}
      <ReassuranceBar />
    </div>
  )
}
