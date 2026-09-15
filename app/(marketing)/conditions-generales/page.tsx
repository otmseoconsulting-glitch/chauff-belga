import type { Metadata } from 'next'
import { FileCheck2, AlertTriangle, ShieldCheck, CreditCard, Clock, Wrench } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente & d’Intervention | Chauffagiste-Belga',
  description:
    'Consultez les Conditions Générales de Vente (CGV) et d’Intervention de Chauffagiste-Belga : modalités de dépannage, garanties, devis, tarification et droit belge.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/conditions-generales',
  },
}

export default function ConditionsGeneralesPage() {
  const breadcrumbItems = [
    { label: 'Conditions générales', href: '/conditions-generales' },
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
            <FileCheck2 className="w-3.5 h-3.5 text-primary" />
            Conditions contractuelles de service
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Conditions Générales de Vente & d’Intervention
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Applicables à l’ensemble des prestations de dépannage, d’entretien périodique PEB, de réparation et d’installation de systèmes thermiques réalisées par Chauffagiste-Belga SRL en Belgique.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-default max-w-4xl space-y-8 text-sm text-slate-700">
          {/* Article 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-brand-dark mb-3">Article 1 — Champ d’application</h2>
            <p className="leading-relaxed">
              Les présentes Conditions Générales régissent sans réserve toutes les relations contractuelles entre la société Chauffagiste-Belga SRL (ci-après « le Prestataire ») et toute personne physique ou morale (ci-après « le Client ») commandant une intervention de dépannage d’urgence, d’entretien ou de travaux d’installation de chauffage, sanitaire et climatisation.
            </p>
          </div>

          {/* Article 2 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-brand-dark mb-3">Article 2 — Devis préalable & Formation du contrat</h2>
            <p className="leading-relaxed mb-3">
              Toute prestation donne lieu soit à un devis préalable écrit (remis par écrit ou voie électronique), soit à l’acceptation par le client d’un forfait d’intervention annoncé avant le départ du technicien :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>En situation de dépannage d’urgence, le forfait de déplacement et diagnostic initial est validé oralement ou par SMS avant l’arrivée du technicien.</li>
              <li>Si le remplacement de pièces détachées s’avère nécessaire sur place, le coût des pièces et de la main-d’œuvre supplémentaire est soumis à l’accord préalable du Client avant tout montage.</li>
              <li>Pour les chantiers de remplacement de chaudière ou de pompe à chaleur, le contrat n’est formé qu’après signature du bon de commande et versement de l’acompte convenu.</li>
            </ul>
          </div>

          {/* Article 3 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-brand-dark mb-3">Article 3 — Tarifs, Facturation & Taux de TVA</h2>
            <p className="leading-relaxed mb-3">
              Les tarifs applicables sont ceux en vigueur au moment de la commande, exprimés en Euros (€) hors et toutes taxes comprises.
            </p>
            <p className="leading-relaxed mb-3">
              <strong>Taux de TVA à 6% :</strong> Conformément à la législation fiscale belge (AR n° 20 du Code de la TVA), le taux réduit de 6% s’applique uniquement aux bâtiments d’habitation privée ayant plus de 10 ans d’ancienneté. Le Client certifie sur l’honneur l’exactitude de cette condition en signant la mention fiscale figurant sur la facture. À défaut, le taux normal de 21% est légalement applicable.
            </p>
          </div>

          {/* Article 4 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-brand-dark mb-3">Article 4 — Modalités de paiement</h2>
            <p className="leading-relaxed">
              Pour les dépannages d’urgence et les entretiens périodiques, le règlement s’effectue comptant dès la fin de l’intervention directement auprès du technicien par terminal Bancontact/carte bancaire sécurisé, application mobile de paiement (Payconiq) ou espèces contre reçu officiel. Pour les chantiers d’installation, le solde de la facture est payable à 8 jours de réception.
            </p>
          </div>

          {/* Article 5 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-brand-dark mb-3">Article 5 — Garanties & Responsabilité</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Pièces détachées :</strong> Les composants d’origine neufs bénéficient de la garantie constructeur légale (généralement 1 à 2 ans).</li>
              <li><strong>Travaux neufs :</strong> Les installations complètes relèvent de la garantie légale de conformité et de la responsabilité décennale pour le gros œuvre thermique.</li>
              <li><strong>Exclusions :</strong> La garantie ne couvre pas les désordres résultant d’une mauvaise utilisation par le client, d’un entartrage sévère non traité, de variations anormales de tension électrique ou d’un manque d’eau répété non signalé.</li>
            </ul>
          </div>

          {/* Article 6 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-brand-dark mb-3">Article 6 — Droit applicable & Juridiction compétente</h2>
            <p className="leading-relaxed">
              Le présent contrat est exclusivement soumis au droit belge. En cas de contestation ou de litige, et à défaut de règlement amiable ou de médiation de la consommation, les tribunaux francophones de l’arrondissement judiciaire de Bruxelles sont seuls compétents.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
