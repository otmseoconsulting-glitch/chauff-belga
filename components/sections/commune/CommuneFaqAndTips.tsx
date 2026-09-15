import Link from 'next/link'
import {
  ChevronDown,
  ArrowRight,
  BookOpen,
  Sparkles,
  Flame,
} from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface CommuneFaqAndTipsProps {
  communeName: string
  faqs?: FaqItem[]
}

export function CommuneFaqAndTips({ communeName, faqs }: CommuneFaqAndTipsProps) {
  const defaultFaqs: FaqItem[] = [
    {
      question: `Intervenez-vous 24h/24 à ${communeName} ?`,
      answer: `Oui, notre équipe technique d'astreinte est mobilisée 24h/24 et 7j/7 pour les dépannages urgents (manque de chauffage, fuite d’eau ou alerte gaz) sur toute la commune de ${communeName}.`,
    },
    {
      question: 'Combien coûte une intervention de chauffage ?',
      answer:
        'Le déplacement et le diagnostic sont facturés dès 65 € TTC (TVA 6% comprise pour les logements de plus de 10 ans). L’entretien légal PEB pour chaudière au gaz est au forfait transparent de 99 €.',
    },
    {
      question: 'Le devis est-il gratuit ?',
      answer:
        'Oui, nos devis pour le remplacement de chaudière, l’installation de pompe à chaleur ou les réparations sont 100% gratuits, détaillés et sans engagement.',
    },
    {
      question: 'Combien de temps pour une intervention ?',
      answer:
        'En urgence, notre chauffagiste intervient en moins de 45 minutes à 2 heures. La réparation moyenne sur panne de chaudière est résolue en 1 heure chrono.',
    },
    {
      question: 'Proposez-vous un contrat d’entretien ?',
      answer:
        'Oui, nous proposons des contrats de maintenance biennale (gaz) ou annuelle (mazout) incluant le contrôle PEB, le nettoyage et la priorité en cas de panne.',
    },
  ]

  const activeFaqs = faqs && faqs.length >= 4 ? faqs.slice(0, 5) : defaultFaqs

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Heading + Intro + Link to /conseils */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight leading-tight mb-3">
                Chauffagiste à {communeName} : conseils et informations
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Découvrez nos conseils d’experts pour entretenir votre chaudière, respecter les normes PEB belges, économiser de l’énergie et améliorer le confort de votre logement.
              </p>
              <Link
                href="/conseils"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-blue hover:text-[#FF5400] transition-colors group mb-8"
              >
                <span>Voir tous nos conseils</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Visual Guide Card with Photo Placeholder (Right/Bottom in layout) */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-linear-to-br from-[#082B55] to-[#051C38] p-6 text-white relative shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Guide Pratique Belgique</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                Optimisez votre chauffage et faites jusqu’à 25% d’économies
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Retrouvez nos fiches techniques sur le désembouage, les thermostats connectés et les primes régionales.
              </p>
              <Link
                href="/conseils"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Lire nos conseils</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: FAQ Accordion (5 items) */}
          <div className="lg:col-span-8">
            <h3 className="text-lg font-bold text-brand-dark mb-4">
              Questions fréquentes
            </h3>

            <div className="space-y-3">
              {activeFaqs.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-[#F7F9FC] p-4 sm:p-5 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 text-sm font-bold text-brand-dark">
                    <span>{item.question}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 pt-2 border-t border-slate-200/60">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
