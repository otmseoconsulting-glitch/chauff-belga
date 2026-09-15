import type { Metadata } from 'next'
import { Scale, Building2, ShieldCheck, Server, FileText } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Mentions Légales & Informations Juridiques | Chauffagiste-Belga',
  description:
    'Mentions légales, identification de l’éditeur, numéro BCE / TVA, agréments Cerga et hébergement de Chauffagiste-Belga en Belgique.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/mentions-legales',
  },
}

export default function MentionsLegalesPage() {
  const breadcrumbItems = [{ label: 'Mentions légales', href: '/mentions-legales' }]

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
            <Scale className="w-3.5 h-3.5 text-primary" />
            Cadre légal & réglementaire belge
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
            Mentions Légales
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Conformément aux dispositions du Code de droit économique belge (Livre XII) et aux obligations d’information des prestataires de services.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-default max-w-4xl space-y-8">
          {/* Editeur */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-brand-blue" />
              <h2 className="text-xl font-bold text-brand-dark">1. Éditeur du site</h2>
            </div>
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p><strong>Dénomination sociale :</strong> Chauffagiste-Belga SRL</p>
              <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée de droit belge</p>
              <p><strong>Siège social :</strong> Rue de la Loi 227, 1040 Bruxelles, Belgique</p>
              <p><strong>Numéro d’entreprise (BCE) :</strong> BE 0745.892.314</p>
              <p><strong>Numéro de TVA intracommunautaire :</strong> BE 0745.892.314</p>
              <p><strong>Téléphone :</strong> <a href="tel:0475123456" className="text-brand-blue font-semibold hover:underline">0475 12 34 56</a> (permanence 24/7)</p>
              <p><strong>Courriel de contact :</strong> <a href="mailto:contact@chauffagiste-belga.be" className="text-brand-blue font-semibold hover:underline">contact@chauffagiste-belga.be</a></p>
            </div>
          </div>

          {/* Agréments professionnels */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-brand-dark">2. Habilitations & Agréments professionnels</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Les interventions techniques de dépannage, de contrôle périodique et d’installation sont exécutées exclusivement par des techniciens titulaires des habilitations officielles délivrées par les autorités régionales compétentes en Belgique :
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Habilitation Gaz G1 :</strong> Chaudières et appareils individuels au gaz à brûleur atmosphérique.</li>
                <li><strong>Habilitation Gaz G2 :</strong> Chaudières au gaz à brûleur à air pulsé.</li>
                <li><strong>Habilitation Mazout / Combustible liquide (L) :</strong> Générateurs de chaleur au mazout.</li>
                <li><strong>Label Cerga :</strong> Installateur professionnel du gaz habilité à délivrer l’attestation de conformité officielle.</li>
                <li><strong>Bruxelles Environnement & SPW Énergie :</strong> Numéros d’agrément pour le contrôle périodique PEB légal.</li>
              </ul>
            </div>
          </div>

          {/* Hébergement */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-6 h-6 text-slate-700" />
              <h2 className="text-xl font-bold text-brand-dark">3. Hébergement du site</h2>
            </div>
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p><strong>Centre de données :</strong> Francfort (fra1), Union Européenne (garantie de souveraineté et conformité RGPD)</p>
              <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">https://vercel.com</a></p>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-slate-700" />
              <h2 className="text-xl font-bold text-brand-dark">4. Propriété intellectuelle & Médiation</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                L’ensemble des contenus, textes, infographies, logotypes et codes sources présents sur ce site relèvent de la législation belge et internationale sur le droit d’auteur et la propriété intellectuelle. Toute reproduction, intégrale ou partielle, est strictement interdite sans accord préalable écrit de Chauffagiste-Belga SRL.
              </p>
              <p>
                <strong>Médiation de la consommation :</strong> En cas de litige non résolu directement avec notre service clientèle, le client consommateur peut s’adresser au Service de Médiation pour le Consommateur (North Gate II, Boulevard du Roi Albert II 8 bte 1, 1000 Bruxelles — <a href="https://www.mediationconsommateur.be" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">www.mediationconsommateur.be</a>).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
