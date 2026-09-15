// CLIENT: interactive FAQ accordion state and quote form
'use client'

import { useState, useTransition } from 'react'
import { Phone, ArrowRight, Lock, ChevronDown, Loader2 } from 'lucide-react'
import { submitLead } from '@/app/actions/submit-lead'

const FAQ_ITEMS = [
  {
    q: 'Intervenez-vous en urgence 24h/24 ?',
    a: 'Oui, notre permanence technique est active 24h/24 et 7j/7 pour les urgences absolues (fuite de gaz, panne totale de chauffage en période hivernale, fuite d\'eau majeure).',
  },
  {
    q: 'Dans quelles régions intervenez-vous ?',
    a: 'Nous intervenons sur l\'ensemble de la Région de Bruxelles-Capitale, en Brabant wallon, en Brabant flamand ainsi que dans toutes les provinces de Wallonie (Liège, Namur, Hainaut, Luxembourg).',
  },
  {
    q: 'Quel est le coût d\'une intervention ?',
    a: 'Nos tarifs sont clairs et transparents dès le premier appel : diagnostic d\'urgence à partir de 95€ HTVA et entretien annuel certifié dès 120€ HTVA avec attestation légale.',
  },
  {
    q: 'Le devis est-il gratuit ?',
    a: 'Absolument. Toute demande de devis pour une nouvelle installation, un remplacement de chaudière ou une pompe à chaleur est 100% gratuite et sans engagement.',
  },
  {
    q: 'Combien de temps faut-il pour intervenir ?',
    a: 'Pour les dépannages d\'urgence, nos techniciens se déplacent en moins de 2 heures selon votre commune. Pour les entretiens programmés, un créneau précis vous est confirmé sous 24h.',
  },
  {
    q: 'Proposez-vous un contrat d\'entretien ?',
    a: 'Oui, nous proposons des formules d\'entretien périodique incluant le contrôle obligatoire PEB, le nettoyage du corps de chauffe et une priorité absolue en cas de dépannage.',
  },
  {
    q: 'Installez-vous des pompes à chaleur ?',
    a: 'Oui, nous sommes certifiés pour l\'installation, le dimensionnement et la maintenance des pompes à chaleur air-eau et hybrides des marques Daikin, Viessmann, Vaillant et Bosch.',
  },
]

export function ConversionAndFaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [nom, setNom] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [cp, setCp] = useState('')
  const [service, setService] = useState<'depannage' | 'entretien' | 'installation' | 'reparation' | 'devis' | 'other'>('devis')
  const [demande, setDemande] = useState('')
  const [website, setWebsite] = useState('') // honeypot

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    startTransition(async () => {
      const res = await submitLead({
        fullName: nom,
        phone: tel,
        email: email || undefined,
        postalCode: cp,
        serviceType: service,
        message: demande || undefined,
        isUrgent: service === 'depannage',
        website: website || undefined,
        sourceUrl: '/',
      })

      if (res.success) {
        setIsSubmitted(true)
      } else {
        setErrorMsg(res.error)
      }
    })
  }

  return (
    <section id="devis" className="section-padding bg-white">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Emergency Callout Banner (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden bg-[#082B55] text-white p-8 sm:p-9 shadow-xl flex flex-col justify-between min-h-[480px] relative">
            <div className="absolute inset-0 bg-linear-to-b from-[#051C38] via-[#082B55] to-[#051C38] pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E5232E]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-[28px] font-black text-white leading-tight mb-4 tracking-tight">
                Besoin d&apos;un chauffagiste maintenant ?
              </h3>
              <p className="text-[14px] sm:text-[15px] text-slate-300 font-normal leading-relaxed">
                Notre équipe est disponible 7j/7 et 24h/24 pour vos urgences et vos demandes de devis.
              </p>
            </div>

            <div className="relative z-10 pt-8 flex flex-col gap-4">
              <a
                href="tel:0475123456"
                className="inline-flex items-center justify-center gap-2.5 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-6 py-4 rounded-full shadow-cta-red transition-colors text-[14px] sm:text-[15px]"
              >
                <Phone className="h-4 w-4 fill-white" />
                <span>Appeler maintenant 0475 12 34 56</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[12px] font-semibold text-[#22C55E]">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span>Disponible actuellement</span>
              </div>
            </div>
          </div>

          {/* Center: Quote Form Card in Dark Navy #082B55 (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#082B55] text-white p-8 shadow-2xl border border-slate-700/60">
            <h3 className="font-display text-[22px] font-black text-white leading-snug tracking-tight">
              Demander un devis gratuit
            </h3>
            <p className="text-[12px] text-slate-300 mt-1 mb-6">
              Une réponse sous 2 heures pendant les heures ouvrables.
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 text-lg font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-white text-base">Demande enregistrée !</h4>
                <p className="text-[12px] text-slate-300 mt-1">
                  Notre équipe technique prend contact avec vous sous 2h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <div className="opacity-0 absolute -z-10 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Single-Column Vertical Layout */}
                <div>
                  <label htmlFor="form-service" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Service souhaité <span className="text-[#E5232E]">*</span>
                  </label>
                  <select
                    id="form-service"
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value as typeof service)}
                    className="w-full h-12 min-h-[48px] px-4 rounded-xl bg-[#051C38] border border-slate-700 text-white text-base focus:border-[#E5232E] focus:ring-2 focus:ring-[#E5232E]/20 focus:outline-none"
                  >
                    <option value="depannage">🚨 Dépannage urgent (≤ 2h)</option>
                    <option value="entretien">🔧 Entretien annuel chaudière PEB</option>
                    <option value="installation">🏠 Installation neuve chaudière</option>
                    <option value="reparation">⚙️ Réparation / remplacement pièces</option>
                    <option value="devis">📋 Demande de devis gratuit</option>
                    <option value="other">❓ Autre demande</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="form-nom" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Nom et Prénom <span className="text-[#E5232E]">*</span>
                  </label>
                  <input
                    id="form-nom"
                    required
                    type="text"
                    autoComplete="name"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ex: Jean Dupont"
                    className="w-full h-12 min-h-[48px] px-4 rounded-xl bg-[#051C38] border border-slate-700 text-white placeholder:text-slate-400 text-base focus:border-[#E5232E] focus:ring-2 focus:ring-[#E5232E]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="form-tel" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Téléphone mobile <span className="text-[#E5232E]">*</span>
                  </label>
                  <input
                    id="form-tel"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="Ex: 0475 12 34 56"
                    className="w-full h-12 min-h-[48px] px-4 rounded-xl bg-[#051C38] border border-slate-700 text-white placeholder:text-slate-400 text-base focus:border-[#E5232E] focus:ring-2 focus:ring-[#E5232E]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="form-cp" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Code postal (Belgique) <span className="text-[#E5232E]">*</span>
                  </label>
                  <input
                    id="form-cp"
                    required
                    type="text"
                    maxLength={4}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="postal-code"
                    value={cp}
                    onChange={(e) => setCp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="Ex: 1000, 4000..."
                    className="w-full h-12 min-h-[48px] px-4 rounded-xl bg-[#051C38] border border-slate-700 text-white placeholder:text-slate-400 text-base focus:border-[#E5232E] focus:ring-2 focus:ring-[#E5232E]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="form-email" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Adresse email <span className="text-slate-400 text-xs font-normal">(optionnel)</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean.dupont@exemple.be"
                    className="w-full h-12 min-h-[48px] px-4 rounded-xl bg-[#051C38] border border-slate-700 text-white placeholder:text-slate-400 text-base focus:border-[#E5232E] focus:ring-2 focus:ring-[#E5232E]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="form-demande" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Précisions / Marque de la chaudière <span className="text-slate-400 text-xs font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    id="form-demande"
                    rows={2}
                    value={demande}
                    onChange={(e) => setDemande(e.target.value)}
                    placeholder="Ex: Chaudière Vaillant en panne d'eau chaude..."
                    className="w-full px-4 py-3 rounded-xl bg-[#051C38] border border-slate-700 text-white placeholder:text-slate-400 text-base focus:border-[#E5232E] focus:ring-2 focus:ring-[#E5232E]/20 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 bg-[#E5232E] hover:bg-[#D01B25] text-white font-extrabold h-[52px] min-h-[48px] px-4 rounded-xl shadow-md transition-all text-base disabled:opacity-60 cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Transmission en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Obtenir mon devis gratuit & sans engagement</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-[11px] text-slate-300 flex flex-col gap-1 text-center">
                  <span className="flex items-center justify-center gap-1 font-medium">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    Vos données sont protégées (RGPD)
                  </span>
                  <span className="text-slate-400">100% gratuit • Réponse garantie sous 2h • Sans engagement</span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Clean FAQ Accordion (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 p-8 shadow-subtle">
            <h3 className="font-display text-2xl font-black text-[#102A43] tracking-tight mb-6">
              Questions fréquentes
            </h3>

            <div className="space-y-2.5">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={item.q}
                    className="rounded-xl bg-white border border-slate-200/70 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-3.5 text-left font-bold text-[13px] text-[#102A43] hover:text-[#E5232E] transition-colors gap-3"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#E5232E]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-[12px] text-[#64748B] leading-relaxed font-normal border-t border-slate-100 pt-2">
                        {item.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="pt-5 mt-4 border-t border-slate-200/60">
              <a
                href="#faq"
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#102A43] hover:text-[#E5232E] transition-colors group"
              >
                <span>Voir toutes les questions</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#E5232E] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
