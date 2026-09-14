// CLIENT: interactive lead capture quote engine
'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Phone,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Send,
  ArrowRight,
} from 'lucide-react'
import { submitLead, type SubmitLeadInput } from '@/app/actions/submit-lead'
import { FORM_SERVICE_OPTIONS, CONTACT } from '@/lib/constants/contact'

interface LeadFormProps {
  variant?: 'full' | 'emergency' | 'sidebar'
  initialPostalCode?: string
  initialService?: string
  sourceUrl?: string
  className?: string
}

export function LeadForm({
  variant = 'full',
  initialPostalCode = '',
  initialService = 'devis',
  sourceUrl,
  className = '',
}: LeadFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  // Form state
  const [formData, setFormData] = useState<SubmitLeadInput>({
    fullName: '',
    phone: '',
    email: '',
    postalCode: initialPostalCode,
    serviceType: (initialService as SubmitLeadInput['serviceType']) || 'devis',
    message: '',
    isUrgent: variant === 'emergency',
    website: '', // honeypot
    sourceUrl: sourceUrl || (typeof window !== 'undefined' ? window.location.pathname : undefined),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: val }))

    // Clear specific field error upon typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)
    setFieldErrors({})

    startTransition(async () => {
      const result = await submitLead(formData)

      if (!result.success) {
        setGeneralError(result.error)
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }
        return
      }

      setIsSuccess(true)

      // Redirect to /merci after 2.5 seconds
      setTimeout(() => {
        router.push('/merci')
      }, 2500)
    })
  }

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`bg-white rounded-2xl p-6 md:p-8 border border-emerald-200 shadow-xl text-center animate-in fade-in zoom-in-95 duration-300 ${className}`}
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
          Demande reçue avec succès !
        </h3>
        <p className="text-slate-600 text-sm md:text-base mb-6">
          {formData.isUrgent || formData.serviceType === 'depannage'
            ? '🚨 Urgence signalée : un chauffagiste d’astreinte vous rappelle sous 2 heures.'
            : 'Un artisan chauffagiste examine votre demande et vous recontacte sous 24h avec un devis détaillé sans engagement.'}
        </p>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 mb-6">
          Redirection vers la confirmation en cours...
        </div>

        <div className="pt-4 border-t border-slate-100 text-sm">
          <span className="text-slate-500 block mb-1">Besoin d&apos;une aide immédiate ?</span>
          <a
            href={`tel:${CONTACT.phone.e164}`}
            className="inline-flex items-center gap-1.5 font-black text-primary hover:text-primary-hover text-base"
          >
            <Phone className="w-4 h-4" />
            <span>{CONTACT.phone.display} (24/7)</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xl transition relative ${className}`}
    >
      {/* Honeypot field for bot suppression */}
      <div className="opacity-0 absolute -z-10 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">
          {variant === 'emergency' ? '🚨 Dépannage Chauffage Express' : 'Devis Gratuit & Sans Engagement'}
        </h3>
        <p className="text-slate-500 text-xs md:text-sm">
          {variant === 'emergency'
            ? 'Intervention sous 2h en Belgique • Chauffagistes agréés Cerga'
            : 'Réponse rapide sous 24h • Prix fixes annoncés avant intervention'}
        </p>
      </div>

      {generalError && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5"
        >
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>{generalError}</div>
        </div>
      )}

      <div className="space-y-4">
        {/* Service selection */}
        {variant !== 'emergency' && (
          <div>
            <label htmlFor="serviceType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Service souhaité <span className="text-primary">*</span>
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium bg-slate-50 text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-brand-blue/20 ${
                fieldErrors['serviceType'] ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
              }`}
            >
              {FORM_SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {fieldErrors['serviceType'] && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors['serviceType'][0]}</p>
            )}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Nom et Prénom <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ex: Jean Dupont"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-blue/20 ${
              fieldErrors['fullName'] ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
            }`}
          />
          {fieldErrors['fullName'] && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors['fullName'][0]}</p>
          )}
        </div>

        {/* Phone & Postal Code Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Téléphone mobile <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="0475 12 34 56"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-blue/20 ${
                fieldErrors['phone'] ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
              }`}
            />
            {fieldErrors['phone'] && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors['phone'][0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Code postal (Belgique) <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              maxLength={4}
              inputMode="numeric"
              value={formData.postalCode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4)
                setFormData((prev) => ({ ...prev, postalCode: val }))
                if (fieldErrors['postalCode']) {
                  setFieldErrors((prev) => {
                    const next = { ...prev }
                    delete next['postalCode']
                    return next
                  })
                }
              }}
              placeholder="Ex: 1000"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-blue/20 ${
                fieldErrors['postalCode'] ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
              }`}
            />
            {fieldErrors['postalCode'] && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors['postalCode'][0]}</p>
            )}
          </div>
        </div>

        {/* Email (Optional for full variant) */}
        {variant === 'full' && (
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Adresse email <span className="text-slate-400 text-xs font-normal">(optionnel — pour recevoir la confirmation)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean.dupont@exemple.be"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-blue/20 ${
                fieldErrors['email'] ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
              }`}
            />
            {fieldErrors['email'] && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors['email'][0]}</p>
            )}
          </div>
        )}

        {/* Message / Symptoms (for full variant) */}
        {variant !== 'emergency' && (
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Précisions / Marque de la chaudière <span className="text-slate-400 text-xs font-normal">(optionnel)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Ex: Chaudière Vaillant en code erreur F28, pas d'eau chaude depuis ce matin..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 resize-none"
            />
          </div>
        )}

        {/* Emergency switch */}
        {variant !== 'emergency' && (
          <label className="flex items-center gap-3 p-3 bg-red-50/70 border border-red-200 rounded-xl cursor-pointer hover:bg-red-50 transition">
            <input
              type="checkbox"
              name="isUrgent"
              checked={formData.isUrgent}
              onChange={handleChange}
              className="w-4 h-4 text-primary rounded border-red-300 focus:ring-primary shrink-0"
            />
            <span className="text-xs md:text-sm font-bold text-red-800">
              🚨 Demande d&apos;urgence prioritaire (intervention sous 2 heures)
            </span>
          </label>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-6 bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-base disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Transmission en cours...</span>
          </>
        ) : (
          <>
            <span>{variant === 'emergency' ? 'Demander un rappel d’urgence' : 'Envoyer ma demande de devis'}</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Trust reassurance below button */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Agréé Cerga
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-brand-blue" />
          Rappel rapide
        </span>
        <span>Sans engagement</span>
      </div>
    </form>
  )
}
