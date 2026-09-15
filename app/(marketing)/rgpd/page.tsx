import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, UserCheck, KeyRound, Download, Trash2, HelpCircle, Mail } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Conformité RGPD & Droits des Utilisateurs | Chauffagiste-Belga',
  description:
    'Découvrez vos droits en vertu du RGPD chez Chauffagiste-Belga : droit d’accès, de rectification, de portabilité et de suppression de vos données personnelles.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/rgpd',
  },
}

const RIGHTS = [
  {
    icon: EyeIcon,
    title: '1. Droit d’accès',
    desc: 'Vous pouvez nous demander une copie intégrale des informations personnelles que nous détenons à votre sujet.',
  },
  {
    icon: UserCheck,
    title: '2. Droit de rectification',
    desc: 'Vous avez le droit de mettre à jour ou de corriger toute coordonnée inexacte ou incomplète (nouvelle adresse, nouveau numéro).',
  },
  {
    icon: Trash2,
    title: '3. Droit à l’effacement (« Droit à l’oubli »)',
    desc: 'Vous pouvez exiger la suppression de vos données, sous réserve des délais légaux de conservation fiscale et des attestations PEB.',
  },
  {
    icon: Download,
    title: '4. Droit à la portabilité',
    desc: 'Vous pouvez recevoir vos données techniques et de facturation dans un format structuré et lisible par machine.',
  },
]

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

export default function RgpdPage() {
  const breadcrumbItems = [{ label: 'Conformité RGPD', href: '/rgpd' }]

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
        <div className="container-default max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-4 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Règlement Général sur la Protection des Données (UE 2016/679)
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Conformité RGPD & Vos Droits
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Chauffagiste-Belga applique scrupuleusement le Règlement Général sur la Protection des Données (RGPD) et la loi belge du 30 juillet 2018 relative à la protection des personnes physiques à l’égard des traitements de données à caractère personnel.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-default max-w-4xl space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RIGHTS.map((right) => {
              const Icon = right.icon
              return (
                <div key={right.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-brand-blue">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="font-bold text-base text-brand-dark">{right.title}</h2>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {right.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-brand-blue" />
              Comment exercer vos droits ?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Pour exercer l’un de vos droits, il vous suffit de nous adresser une demande accompagnée d’une justification de votre identité par l’un des canaux suivants :
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-1.5 text-slate-700">
              <p><strong>Par courriel sécurisé :</strong> <a href="mailto:rgpd@chauffagiste-belga.be" className="text-brand-blue font-semibold hover:underline">rgpd@chauffagiste-belga.be</a></p>
              <p><strong>Par courrier postal :</strong> Chauffagiste-Belga SRL — À l’attention du DPO — Rue de la Loi 227, 1040 Bruxelles</p>
              <p><strong>Délai de réponse :</strong> Nous nous engageons à traiter votre requête sous un délai maximal de 30 jours calendaires.</p>
            </div>
            <p className="text-xs text-slate-500">
              Si vous estimez après nous avoir contactés que vos droits ne sont pas respectés, vous avez le droit d’introduire une réclamation auprès de l’Autorité de Protection des Données en Belgique (APD — <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">www.autoriteprotectiondonnees.be</a>, Rue de la Presse 35, 1000 Bruxelles).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
