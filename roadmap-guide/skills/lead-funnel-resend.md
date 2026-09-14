# Skill: Lead Funnel & Resend Dispatch
# High-Converting Quote/Emergency Server Actions & Email Notifications
# Project: Chauffagiste-Belga

---

## Purpose

Capture emergency dispatch calls and installation/maintenance quote requests through type-safe Next.js Server Actions, validate Belgian telephone numbers and postal codes with Zod, persist leads to Supabase, and dispatch transactional notifications via the Resend API.

---

## Architecture Flow

```
[User Form / Emergency Modal]
             │ (Client-side fast feedback)
             ▼
[Server Action: submitLeadAction]
             │
    ┌────────┴────────┐
    ▼                 ▼
[Zod Schema]    [Rate Limiter (IP/Cookie)]
    │
    ├─► [Supabase `leads` Table Insert]
    └─► [Resend API: Dispatch Dispatcher Alert + Customer SMS/Email]
```

---

## Implementation Code

```typescript
// app/actions/lead-actions.ts
'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { createServerClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Belgian phone regex: +32 or 04xx
const BELGIAN_PHONE_REGEX = /^(?:(?:\+|00)32|0)\s*[1-9](?:[\s.-]*\d{2}){3,4}$/

const LeadFormSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est requis'),
  phone: z.string().regex(BELGIAN_PHONE_REGEX, 'Numéro de téléphone belge invalide'),
  email: z.string().email('Adresse email invalide').optional().or(z.literal('')),
  postalCode: z.string().regex(/^[1-9][0-9]{3}$/, 'Code postal belge invalide (4 chiffres)'),
  communeSlug: z.string().min(1),
  serviceType: z.enum([
    'depannage-urgence',
    'entretien-chaudiere',
    'installation-chaudiere',
    'pompe-a-chaleur',
    'autre',
  ]),
  urgency: z.enum(['immediate_2h', 'within_24h', 'flexible']),
  description: z.string().max(1000).optional(),
})

export type LeadInput = z.infer<typeof LeadFormSchema>

export interface ActionResponse {
  success: boolean
  message: string
  leadId?: string
  errors?: Record<string, string[]>
}

export async function submitLeadAction(formData: unknown): Promise<ActionResponse> {
  const result = LeadFormSchema.safeParse(formData)

  if (!result.success) {
    return {
      success: false,
      message: 'Veuillez corriger les erreurs dans le formulaire.',
      errors: result.error.flatten().fieldErrors,
    }
  }

  const lead = result.data
  const supabase = createServerClient()

  try {
    // 1. Persist lead in database
    const { data: dbLead, error: dbError } = await supabase
      .from('leads')
      .insert({
        full_name: lead.fullName,
        phone: lead.phone,
        email: lead.email || null,
        postal_code: lead.postalCode,
        commune_slug: lead.communeSlug,
        service_type: lead.serviceType,
        urgency: lead.urgency,
        notes: lead.description || null,
        status: 'new',
      })
      .select('id')
      .single()

    if (dbError) throw dbError

    // 2. Dispatch email notification to technicians/dispatch team
    await resend.emails.send({
      from: 'Chauffagiste Belga Dispatch <alertes@chauffagiste-belga.be>',
      to: ['dispatch@chauffagiste-belga.be'],
      subject: `🚨 [URGENCE ${lead.urgency.toUpperCase()}] Demande à ${lead.postalCode} - ${lead.fullName}`,
      html: `
        <h2>Nouvelle demande d'intervention</h2>
        <p><strong>Client:</strong> ${lead.fullName}</p>
        <p><strong>Téléphone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
        <p><strong>Zone:</strong> ${lead.postalCode} (${lead.communeSlug})</p>
        <p><strong>Service:</strong> ${lead.serviceType}</p>
        <p><strong>Délai souhaité:</strong> ${lead.urgency}</p>
        <p><strong>Détails:</strong> ${lead.description || 'Aucun détail précisé'}</p>
      `,
    })

    return {
      success: true,
      message: 'Votre demande a été transmise. Un technicien vous contacte sous peu.',
      leadId: dbLead.id,
    }
  } catch (error) {
    console.error('Lead submission error:', error)
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi. Veuillez nous appeler directement au 0475 12 34 56.",
    }
  }
}
```
