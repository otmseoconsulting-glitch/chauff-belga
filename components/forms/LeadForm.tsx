// CLIENT: interactive lead capture quote engine
'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Phone,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  ArrowRight,
  MapPin,
} from 'lucide-react'
import { submitLead, type SubmitLeadInput } from '@/app/actions/submit-lead'
import { FORM_SERVICE_OPTIONS, CONTACT } from '@/lib/constants/contact'
import { validateBelgianPostalCode, validateBelgianPhone } from '@/lib/validation/belgian-postal'

interface LeadFormProps {
  variant?: 'full' | 'emergency' | 'sidebar'
  initialPostalCode?: string
  initialCommuneName?: string
  initialService?: string
  sourceUrl?: string
  className?: string
}

export function LeadForm({
  variant = 'full',
  initialPostalCode = '',
  initialCommuneName = '',
  initialService = 'devis',
  sourceUrl,
  className = '',
}: LeadFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

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

  // Client-side validator for a single field
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Le nom et prénom sont obligatoires.'
        if (value.trim().length < 2) return 'Veuillez renseigner au moins 2 caractères.'
        return null

      case 'phone': {
        if (!value.trim()) return 'Le numéro de téléphone est obligatoire pour vous rappeler.'
        const phoneValidation = validateBelgianPhone(value)
        if (!phoneValidation.valid) {
          return (
            phoneValidation.error ||
            'Veuillez entrer un numéro de téléphone belge valide (ex: 0470 12 34 56).'
          )
        }
        return null
      }

      case 'postalCode': {
        if (!value.trim()) return 'Le code postal belge est obligatoire.'
        const postalValidation = validateBelgianPostalCode(value)
        if (!postalValidation.valid) {
          return postalValidation.error || 'Code postal belge à 4 chiffres requis (ex: 1000).'
        }
        return null
      }

      case 'email': {
        const trimmed = value.trim()
        if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return 'Veuillez entrer une adresse email valide (ex: jean@exemple.be).'
        }
        return null
      }

      default:
        return null
    }
  }

  // Handle onBlur for non-intrusive validation
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const rawVal =
      field === 'isUrgent'
        ? String(formData.isUrgent)
        : (formData[field as keyof SubmitLeadInput] as string) || ''
    const error = validateField(field, rawVal)

    setFieldErrors((prev) => {
      const next = { ...prev }
      if (error) {
        next[field] = [error]
      } else {
        delete next[field]
      }
      return next
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: val }))

    // If field was already touched, re-validate live to remove error as soon as fixed
    if (touched[name]) {
      const err = validateField(name, String(val))
      setFieldErrors((prev) => {
        const next = { ...prev }
        if (err) {
          next[name] = [err]
        } else {
          delete next[name]
        }
        return next
      })
    }
  }

  const handlePostalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData((prev) => ({ ...prev, postalCode: val }))

    if (touched['postalCode']) {
      const err = validateField('postalCode', val)
      setFieldErrors((prev) => {
        const next = { ...prev }
        if (err) {
          next['postalCode'] = [err]
        } else {
          delete next['postalCode']
        }
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    // Run client validation across all required fields
    const allTouched = {
      fullName: true,
      phone: true,
      postalCode: true,
      email: !!formData.email,
    }
    setTouched((prev) => ({ ...prev, ...allTouched }))

    const clientErrors: Record<string, string[]> = {}
    const nameErr = validateField('fullName', formData.fullName)
    if (nameErr) clientErrors['fullName'] = [nameErr]

    const phoneErr = validateField('phone', formData.phone)
    if (phoneErr) clientErrors['phone'] = [phoneErr]

    const postalErr = validateField('postalCode', formData.postalCode)
    if (postalErr) clientErrors['postalCode'] = [postalErr]

    if (formData.email) {
      const emailErr = validateField('email', formData.email)
      if (emailErr) clientErrors['email'] = [emailErr]
    }

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors)
      return
    }

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

  // Field validation helpers for rendering styles & icons
  const getFieldError = (name: string): string | null => {
    const errs = fieldErrors[name]
    return errs && errs.length > 0 ? (errs[0] ?? null) : null
  }

  const isFieldValid = (name: string, value: string) => {
    return !!touched[name] && !fieldErrors[name] && value.trim().length > 0
  }

  const hasFieldError = (name: string) => {
    return (!!touched[name] || !!fieldErrors[name]) && !!getFieldError(name)
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
            ? '🚨 Urgence signalée : un chauffagiste d’astreinte vous rappelle sous 15 minutes.'
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

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">
          {variant === 'emergency' ? '🚨 Dépannage Chauffage Express' : 'Devis Gratuit & Sans Engagement'}
        </h3>
        <p className="text-slate-500 text-xs md:text-sm">
          {variant === 'emergency'
            ? 'Intervention garantie sous 2h en Belgique • Chauffagistes agréés Cerga'
            : 'Tarif clair sans surprise • Réponse garantie sous 24h ouvrées'}
        </p>

        {/* Contextual Commune Pre-fill Badge */}
        {(initialCommuneName || initialPostalCode) && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200/70 text-brand-blue text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
            <span>
              Secteur présélectionné :{' '}
              <strong className="text-slate-900">
                {initialCommuneName ? `${initialCommuneName} ` : ''}({formData.postalCode})
              </strong>
            </span>
          </div>
        )}
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

      {/* Single-Column Vertical Layout (Baymard/NNG standard: +22% completion on mobile) */}
      <div className="space-y-4 sm:space-y-5">
        {/* 1. Service selection (top-aligned label) */}
        {variant !== 'emergency' && (
          <div>
            <label
              htmlFor="serviceType"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Service souhaité <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                onBlur={() => handleBlur('serviceType')}
                className="w-full h-12 min-h-[48px] px-4 rounded-xl border text-base font-medium bg-slate-50 text-slate-900 outline-none transition focus:bg-white focus:border-[#082B55] focus:ring-2 focus:ring-[#082B55]/20 border-slate-300"
              >
                {FORM_SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {getFieldError('serviceType') && (
              <div
                id="serviceType-error"
                role="alert"
                className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{getFieldError('serviceType')}</span>
              </div>
            )}
          </div>
        )}

        {/* 2. Full Name (top-aligned label + native autocomplete) */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Nom et Prénom <span className="text-primary">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={() => handleBlur('fullName')}
              placeholder="Ex: Jean Dupont"
              aria-invalid={hasFieldError('fullName')}
              aria-describedby={hasFieldError('fullName') ? 'fullName-error' : undefined}
              className={`w-full h-12 min-h-[48px] px-4 pr-11 rounded-xl border text-base text-slate-900 outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-2 ${
                hasFieldError('fullName')
                  ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20'
                  : isFieldValid('fullName', formData.fullName)
                  ? 'border-emerald-500 bg-white focus:border-emerald-600 focus:ring-emerald-500/20'
                  : 'border-slate-300 focus:border-[#082B55] focus:ring-[#082B55]/20'
              }`}
            />
            <div className="absolute right-3.5 pointer-events-none flex items-center">
              {isFieldValid('fullName', formData.fullName) && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in fade-in zoom-in-75 duration-200" />
              )}
              {hasFieldError('fullName') && (
                <AlertCircle className="w-5 h-5 text-red-500 animate-in fade-in zoom-in-75 duration-200" />
              )}
            </div>
          </div>
          {hasFieldError('fullName') && (
            <div
              id="fullName-error"
              role="alert"
              className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{getFieldError('fullName')}</span>
            </div>
          )}
        </div>

        {/* 3. Mobile Phone (top-aligned label, inputmode=tel, autocomplete=tel, touch target >= 48px) */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Téléphone mobile <span className="text-primary">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              placeholder="Ex: 0475 12 34 56"
              aria-invalid={hasFieldError('phone')}
              aria-describedby={hasFieldError('phone') ? 'phone-error' : undefined}
              className={`w-full h-12 min-h-[48px] px-4 pr-11 rounded-xl border text-base text-slate-900 outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-2 ${
                hasFieldError('phone')
                  ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20'
                  : isFieldValid('phone', formData.phone)
                  ? 'border-emerald-500 bg-white focus:border-emerald-600 focus:ring-emerald-500/20'
                  : 'border-slate-300 focus:border-[#082B55] focus:ring-[#082B55]/20'
              }`}
            />
            <div className="absolute right-3.5 pointer-events-none flex items-center">
              {isFieldValid('phone', formData.phone) && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in fade-in zoom-in-75 duration-200" />
              )}
              {hasFieldError('phone') && (
                <AlertCircle className="w-5 h-5 text-red-500 animate-in fade-in zoom-in-75 duration-200" />
              )}
            </div>
          </div>
          {hasFieldError('phone') ? (
            <div
              id="phone-error"
              role="alert"
              className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{getFieldError('phone')}</span>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 mt-1">
              Un artisan vous contactera directement sur ce numéro.
            </p>
          )}
        </div>

        {/* 4. Belgian Postal Code (inputmode=numeric, pattern=[0-9]*, autocomplete=postal-code) */}
        <div>
          <label
            htmlFor="postalCode"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Code postal (Belgique) <span className="text-primary">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="postal-code"
              value={formData.postalCode}
              onChange={handlePostalChange}
              onBlur={() => handleBlur('postalCode')}
              placeholder="Ex: 1000, 1930, 4000..."
              aria-invalid={hasFieldError('postalCode')}
              aria-describedby={hasFieldError('postalCode') ? 'postalCode-error' : undefined}
              className={`w-full h-12 min-h-[48px] px-4 pr-11 rounded-xl border text-base text-slate-900 outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-2 ${
                hasFieldError('postalCode')
                  ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20'
                  : isFieldValid('postalCode', formData.postalCode)
                  ? 'border-emerald-500 bg-white focus:border-emerald-600 focus:ring-emerald-500/20'
                  : 'border-slate-300 focus:border-[#082B55] focus:ring-[#082B55]/20'
              }`}
            />
            <div className="absolute right-3.5 pointer-events-none flex items-center">
              {isFieldValid('postalCode', formData.postalCode) && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in fade-in zoom-in-75 duration-200" />
              )}
              {hasFieldError('postalCode') && (
                <AlertCircle className="w-5 h-5 text-red-500 animate-in fade-in zoom-in-75 duration-200" />
              )}
            </div>
          </div>
          {hasFieldError('postalCode') && (
            <div
              id="postalCode-error"
              role="alert"
              className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{getFieldError('postalCode')}</span>
            </div>
          )}
        </div>

        {/* 5. Email (Optional for receipt & devis confirmation) */}
        {variant === 'full' && (
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Adresse email{' '}
              <span className="text-slate-400 text-xs font-normal">
                (optionnel — pour recevoir la copie du devis)
              </span>
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="jean.dupont@exemple.be"
                aria-invalid={hasFieldError('email')}
                aria-describedby={hasFieldError('email') ? 'email-error' : undefined}
                className={`w-full h-12 min-h-[48px] px-4 pr-11 rounded-xl border text-base text-slate-900 outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-2 ${
                  hasFieldError('email')
                    ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20'
                    : isFieldValid('email', formData.email || '')
                    ? 'border-emerald-500 bg-white focus:border-emerald-600 focus:ring-emerald-500/20'
                    : 'border-slate-300 focus:border-[#082B55] focus:ring-[#082B55]/20'
                }`}
              />
              <div className="absolute right-3.5 pointer-events-none flex items-center">
                {isFieldValid('email', formData.email || '') && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in fade-in zoom-in-75 duration-200" />
                )}
                {hasFieldError('email') && (
                  <AlertCircle className="w-5 h-5 text-red-500 animate-in fade-in zoom-in-75 duration-200" />
                )}
              </div>
            </div>
            {hasFieldError('email') && (
              <div
                id="email-error"
                role="alert"
                className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{getFieldError('email')}</span>
              </div>
            )}
          </div>
        )}

        {/* 6. Message / Symptoms (for full variant) */}
        {variant !== 'emergency' && (
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Précisions / Marque de la chaudière{' '}
              <span className="text-slate-400 text-xs font-normal">(optionnel)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Ex: Chaudière Vaillant en code erreur F28, pas d'eau chaude depuis ce matin..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base text-slate-900 outline-none transition focus:border-[#082B55] focus:ring-2 focus:ring-[#082B55]/20 resize-none placeholder:text-slate-500"
            />
          </div>
        )}

        {/* 7. Emergency toggle */}
        {variant !== 'emergency' && (
          <label className="flex items-center gap-3 p-3.5 bg-red-50/70 border border-red-200 rounded-xl cursor-pointer hover:bg-red-50 transition">
            <input
              type="checkbox"
              name="isUrgent"
              checked={formData.isUrgent}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded border-red-300 focus:ring-primary shrink-0"
            />
            <span className="text-xs sm:text-sm font-bold text-red-900">
              🚨 Demande d&apos;urgence prioritaire (intervention garantie sous 2h)
            </span>
          </label>
        )}
      </div>

      {/* 5. Benefit-oriented CTA Button (Full width on mobile, min height 52px, loading state) */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-6 bg-primary hover:bg-primary-hover text-white font-extrabold h-[52px] min-h-[48px] px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base sm:text-lg disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Transmission en cours...</span>
          </>
        ) : (
          <>
            <span>
              {variant === 'emergency'
                ? 'Demander une intervention rapide (≤ 2h)'
                : 'Obtenir mon devis gratuit & sans engagement'}
            </span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </>
        )}
      </button>

      {/* Trust reassurance below button */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          Agréé Cerga & PEB
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-brand-blue shrink-0" />
          Rappel rapide & sans attente
        </span>
        <span className="text-slate-400">•</span>
        <span>100% Gratuit & Sans engagement</span>
      </div>
    </form>
  )
}
