import type { Metadata } from 'next'
import { Lock, ShieldCheck, Database, UserX, Eye, Mail } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Chauffagiste-Belga',
  description:
    'Protection des données personnelles et respect de la vie privée chez Chauffagiste-Belga. Découvrez comment nous traitons vos informations conformément aux normes belges et européennes.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/confidentialite',
  },
}

export default function ConfidentialitePage() {
  const breadcrumbItems = [
    { label: 'Politique de confidentialité', href: '/confidentialite' },
  ]

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
        <div className="container-default max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <Lock className="w-3.5 h-3.5 text-primary" />
            Protection de votre vie privée
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Chez Chauffagiste-Belga, la sécurité et la confidentialité de vos données personnelles sont au cœur de nos engagements d’artisan de confiance.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-default max-w-4xl space-y-8">
          {/* Responsable */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-brand-blue" />
              <h2 className="text-xl font-bold text-brand-dark">1. Responsable du traitement</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Le responsable du traitement des données à caractère personnel collectées sur ce site est la société <strong>Chauffagiste-Belga SRL</strong>, ayant son siège à Rue de la Loi 227, 1040 Bruxelles (BCE : BE 0745.892.314). Vous pouvez contacter notre délégué à la protection des données par courriel à <a href="mailto:privacy@chauffagiste-belga.be" className="text-brand-blue font-semibold hover:underline">privacy@chauffagiste-belga.be</a>.
            </p>
          </div>

          {/* Données collectées */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-brand-dark">2. Données personnelles collectées</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>Nous collectons uniquement les données strictement nécessaires à l’exécution de nos missions de dépannage et d’entretien :</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Données d’identification :</strong> Nom, prénom, numéro de téléphone, adresse e-mail.</li>
                <li><strong>Données de localisation :</strong> Adresse postale d’intervention (commune, code postal, rue) pour l’acheminement du chauffagiste.</li>
                <li><strong>Données techniques de l’installation :</strong> Marque de la chaudière, combustible (gaz/mazout), code panne signalé, historique des attestations PEB.</li>
                <li><strong>Données de facturation :</strong> Coordonnées de facturation, historique des règlements (les données bancaires ne sont jamais conservées sur nos serveurs).</li>
              </ul>
            </div>
          </div>

          {/* Finalités */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-brand-dark">3. Finalités du traitement</h2>
            </div>
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Vos informations sont traitées pour les finalités suivantes :</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Prise en charge et confirmation de votre demande d’intervention d’urgence ou de devis.</li>
                <li>Planification et déplacement du technicien certifié à votre domicile.</li>
                <li>Établissement et archivage des attestations réglementaires de contrôle périodique PEB exigées par les Régions wallonne et bruxelloise.</li>
                <li>Émission des factures avec attestation du taux de TVA réduit (6% ou 21%).</li>
                <li>Rappel amical de l’échéance légale de votre prochain entretien périodique.</li>
              </ul>
            </div>
          </div>

          {/* Durées de conservation */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <UserX className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl font-bold text-brand-dark">4. Durée de conservation des données</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Les données de contact des prospects sont conservées pendant un délai maximal de 3 ans après le dernier contact. Les données relatives aux factures et attestations de conformité PEB sont conservées pendant une durée de 10 ans conformément aux obligations comptables et à la responsabilité décennale belge.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-slate-700" />
              <h2 className="text-xl font-bold text-brand-dark">5. Exercice de vos droits</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Vous bénéficiez à tout moment d’un droit d’accès, de rectification, de portabilité et d’effacement de vos données personnelles. Pour exercer vos droits, écrivez-nous à <a href="mailto:privacy@chauffagiste-belga.be" className="text-brand-blue font-semibold hover:underline">privacy@chauffagiste-belga.be</a> ou consultez notre page <a href="/rgpd" className="text-brand-blue font-semibold hover:underline">dédiée au RGPD</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
