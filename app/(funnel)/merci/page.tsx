import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Home,
} from 'lucide-react'
import { CONTACT } from '@/lib/constants/contact'

export const metadata: Metadata = {
  title: 'Demande bien reçue — Merci | Chauffagiste-Belga',
  description: 'Votre demande a été transmise avec succès à nos artisans chauffagistes.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MerciPage() {
  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 md:py-20">
      <div className="container-default max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-center">
          {/* Success Check Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            Demande enregistrée
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight mb-4">
            Merci ! Votre demande a été transmise à notre équipe.
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Un artisan chauffagiste agréé Cerga va prendre connaissance de vos indications techniques et vous contacter par téléphone très rapidement.
          </p>

          {/* Timeline of Next Steps */}
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 text-left mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-blue" />
              Ce qui va se passer maintenant :
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">
                    Analyse technique du dossier
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                    Vérification de la marque de votre chaudière, des codes d&apos;erreur et de la disponibilité des pièces d&apos;origine dans votre commune.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">
                    Appel téléphonique de confirmation
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                    Le technicien valide le devis forfaitaire avec vous et fixe le créneau d&apos;intervention (sous 2h si urgence dépannage).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">
                    Intervention & attestation officielle
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                    Dépannage ou entretien réalisé dans les règles de l&apos;art avec remise immédiate de l&apos;attestation de conformité PEB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Escalation Banner */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4" />
                Votre situation s&apos;est aggravée ?
              </div>
              <p className="text-sm text-slate-700">
                En cas de fuite d&apos;eau importante ou de panne totale en période de gel, appelez directement notre permanence :
              </p>
            </div>
            <a
              href={`tel:${CONTACT.phone.e164}`}
              className="bg-primary hover:bg-primary-hover text-white font-black px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm shrink-0 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT.phone.display}</span>
            </a>
          </div>

          {/* Back Home Link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-blue transition"
            >
              <Home className="w-4 h-4" />
              <span>Retourner à l&apos;accueil</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
