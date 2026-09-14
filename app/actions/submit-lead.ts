'use server'

import { headers } from 'next/headers'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { validateBelgianPostalCode, validateBelgianPhone } from '@/lib/validation/belgian-postal'
import { dispatchLeadNotification } from '@/lib/resend/notifications'
import type { Result } from '@/types/common'

// Simple in-memory rate limiter per IP: max 5 requests per 3600 seconds
const ipSubmissionTimestamps = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const oneHourAgo = now - 3600 * 1000
  const timestamps = (ipSubmissionTimestamps.get(ip) || []).filter((t) => t > oneHourAgo)

  if (timestamps.length >= 5) {
    return false
  }

  timestamps.push(now)
  ipSubmissionTimestamps.set(ip, timestamps)
  return true
}

const leadSchema = z.object({
  fullName: z
    .string({ required_error: 'Le nom complet est obligatoire.' })
    .min(2, 'Le nom doit comporter au moins 2 caractères.')
    .max(100, 'Le nom est trop long.'),
  phone: z
    .string({ required_error: 'Le numéro de téléphone est obligatoire.' })
    .min(8, 'Numéro de téléphone incomplet.')
    .max(25, 'Numéro de téléphone trop long.'),
  email: z
    .string()
    .email('Adresse email invalide.')
    .optional()
    .or(z.literal('')),
  postalCode: z
    .string({ required_error: 'Le code postal est obligatoire.' })
    .regex(/^\d{4}$/, 'Le code postal doit contenir exactement 4 chiffres.'),
  serviceType: z.enum(
    ['depannage', 'entretien', 'installation', 'reparation', 'devis', 'other'],
    { errorMap: () => ({ message: 'Veuillez sélectionner un service valide.' }) }
  ),
  message: z.string().max(1000, 'Le message ne doit pas dépasser 1000 caractères.').optional(),
  isUrgent: z.boolean().default(false),
  website: z.string().optional(), // Honeypot field (must be empty)
  sourceUrl: z.string().optional(),
})

export type SubmitLeadInput = z.infer<typeof leadSchema>

export async function submitLead(
  formData: SubmitLeadInput
): Promise<Result<{ leadId?: string; isUrgent: boolean }>> {
  // 1. Honeypot check: if filled, quietly succeed to fool spam bots
  if (formData.website && formData.website.trim().length > 0) {
    console.warn('[submitLead] Spam detected via honeypot field:', formData.website)
    return { success: true, data: { isUrgent: false } }
  }

  // 2. Validate input schema
  const parsed = leadSchema.safeParse(formData)
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {}
    parsed.error.errors.forEach((err) => {
      const field = err.path[0]?.toString()
      if (field) {
        fieldErrors[field] = [...(fieldErrors[field] || []), err.message]
      }
    })
    return {
      success: false,
      error: 'Veuillez corriger les informations du formulaire.',
      fieldErrors,
    }
  }

  const data = parsed.data

  // 3. Strict Belgian postal code validation
  const postalValidation = validateBelgianPostalCode(data.postalCode)
  if (!postalValidation.valid) {
    return {
      success: false,
      error: postalValidation.error || 'Code postal belge invalide.',
      fieldErrors: { postalCode: [postalValidation.error || 'Code postal invalide.'] },
    }
  }

  // 4. Strict Belgian telephone validation
  const phoneValidation = validateBelgianPhone(data.phone)
  if (!phoneValidation.valid) {
    return {
      success: false,
      error: phoneValidation.error || 'Numéro de téléphone belge invalide.',
      fieldErrors: { phone: [phoneValidation.error || 'Numéro de téléphone invalide.'] },
    }
  }

  // 5. IP extraction and Rate Limit check
  const headerList = headers()
  const forwardedFor = headerList.get('x-forwarded-for')
  const clientIp = forwardedFor ? forwardedFor.split(',')[0]?.trim() || 'unknown' : 'unknown'

  if (clientIp !== 'unknown' && !checkRateLimit(clientIp)) {
    return {
      success: false,
      error: 'Trop de demandes envoyées. Pour toute urgence immédiate, veuillez nous contacter par téléphone au 0475 12 34 56.',
    }
  }

  const isUrgent = data.isUrgent || data.serviceType === 'depannage'

  // 6. Non-blocking database insertion
  let insertedLeadId: string | undefined
  try {
    const adminSupabase = createAdminClient()
    const { data: dbLead, error: dbError } = await adminSupabase
      .from('leads')
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        postal_code: data.postalCode,
        service_type: data.serviceType,
        message: data.message || null,
        is_urgent: isUrgent,
        source_url: data.sourceUrl || null,
        user_agent: headerList.get('user-agent') || null,
      })
      .select('id')
      .maybeSingle()

    if (dbError) {
      console.warn('[submitLead] Database insert notice (table might be pending migration):', dbError.message)
    } else if (dbLead) {
      insertedLeadId = dbLead.id
    }
  } catch (dbErr) {
    console.warn('[submitLead] Could not persist lead to Supabase:', dbErr)
  }

  // 7. Non-blocking email dispatch via Resend
  try {
    await dispatchLeadNotification({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || undefined,
      postalCode: data.postalCode,
      serviceType: data.serviceType,
      message: data.message || undefined,
      isUrgent,
      sourceUrl: data.sourceUrl || undefined,
    })
  } catch (emailErr) {
    console.error('[submitLead] Email notification error:', emailErr)
  }

  return {
    success: true,
    data: {
      isUrgent,
      ...(insertedLeadId ? { leadId: insertedLeadId } : {}),
    },
  }
}
