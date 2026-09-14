# 03 — Resend Email Flow
# Lead Routing, Webhook Logic & Urgent Email Alerts
# Project: Chauffagiste-Belga

---

## §1. Email Architecture Overview

```
User submits form
      ↓
Server Action (submit-lead.ts)
      ↓
Supabase INSERT (leads table)
      ↓
sendLeadNotification() [non-blocking, Promise.catch]
      ├── if isUrgent → sendUrgentAlert() [< 30s target]
      └── always → sendLeadReceipt() to user + sendInternalNotification()
```

---

## §2. Resend Client Setup

```typescript
// lib/resend/client.ts
import { Resend } from 'resend'
import { env } from '@/lib/env'

// Singleton pattern
let resendClient: Resend | null = null

export function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY)
  }
  return resendClient
}
```

---

## §3. Email Templates

### 3.1 Internal Lead Notification (to business)

```typescript
// lib/resend/templates/lead-notification.tsx
import {
  Html, Head, Body, Container, Section,
  Heading, Text, Button, Hr, Row, Column
} from '@react-email/components'
import type { LeadNotificationProps } from '../types'

export function LeadNotificationEmail({
  leadId, fullName, phone, email, postalCode,
  serviceType, message, communeName, isUrgent,
  sourceUrl, submittedAt,
}: LeadNotificationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f4', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#ffffff', borderRadius: 8 }}>

          {/* Urgency header */}
          {isUrgent && (
            <Section style={{ backgroundColor: '#C41E3A', padding: '16px 24px', borderRadius: '8px 8px 0 0' }}>
              <Heading style={{ color: '#ffffff', margin: 0, fontSize: 18 }}>
                🚨 DEMANDE URGENTE — Intervention requise
              </Heading>
            </Section>
          )}

          {/* Normal header */}
          {!isUrgent && (
            <Section style={{ backgroundColor: '#1B3A6B', padding: '16px 24px', borderRadius: '8px 8px 0 0' }}>
              <Heading style={{ color: '#ffffff', margin: 0, fontSize: 18 }}>
                Nouvelle demande — Chauffagiste-Belga
              </Heading>
            </Section>
          )}

          {/* Content */}
          <Section style={{ padding: '24px' }}>
            <Text style={{ fontSize: 14, color: '#666', margin: '0 0 16px' }}>
              Reçue le {new Date(submittedAt).toLocaleString('fr-BE')}
            </Text>

            <Row>
              <Column>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#999', margin: '0 0 4px', textTransform: 'uppercase' }}>Client</Text>
                <Text style={{ fontSize: 16, margin: '0 0 16px' }}>{fullName}</Text>
              </Column>
            </Row>

            <Row>
              <Column style={{ paddingRight: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#999', margin: '0 0 4px', textTransform: 'uppercase' }}>Téléphone</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#C41E3A', margin: '0 0 16px' }}>{phone}</Text>
              </Column>
              <Column>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#999', margin: '0 0 4px', textTransform: 'uppercase' }}>Code postal</Text>
                <Text style={{ fontSize: 16, margin: '0 0 16px' }}>{postalCode}{communeName ? ` — ${communeName}` : ''}</Text>
              </Column>
            </Row>

            {email && (
              <Row>
                <Column>
                  <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#999', margin: '0 0 4px', textTransform: 'uppercase' }}>Email</Text>
                  <Text style={{ fontSize: 16, margin: '0 0 16px' }}>{email}</Text>
                </Column>
              </Row>
            )}

            <Row>
              <Column>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#999', margin: '0 0 4px', textTransform: 'uppercase' }}>Service demandé</Text>
                <Text style={{ fontSize: 16, margin: '0 0 16px', textTransform: 'capitalize' }}>{serviceType}</Text>
              </Column>
            </Row>

            {message && (
              <Row>
                <Column>
                  <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#999', margin: '0 0 4px', textTransform: 'uppercase' }}>Message</Text>
                  <Text style={{ fontSize: 14, color: '#333', backgroundColor: '#f9f9f9', padding: 12, borderRadius: 4, margin: '0 0 16px', lineHeight: 1.6 }}>
                    {message}
                  </Text>
                </Column>
              </Row>
            )}

            {sourceUrl && (
              <Text style={{ fontSize: 12, color: '#999', margin: '8px 0' }}>
                Page source : <a href={sourceUrl} style={{ color: '#1B3A6B' }}>{sourceUrl}</a>
              </Text>
            )}

            <Hr style={{ margin: '16px 0' }} />

            <Button
              href={`tel:${phone.replace(/\s/g, '')}`}
              style={{
                backgroundColor: '#C41E3A',
                color: '#ffffff',
                borderRadius: 6,
                padding: '12px 24px',
                fontSize: 16,
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              📞 Appeler {fullName} maintenant
            </Button>

            <Text style={{ fontSize: 11, color: '#aaa', textAlign: 'center', margin: 0 }}>
              Lead ID: {leadId}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

### 3.2 Customer Receipt Email

```typescript
// lib/resend/templates/customer-receipt.tsx
export function CustomerReceiptEmail({
  fullName, serviceType, isUrgent, estimatedResponseTime
}: CustomerReceiptProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f4', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#ffffff', borderRadius: 8 }}>
          <Section style={{ backgroundColor: '#1B3A6B', padding: '24px', borderRadius: '8px 8px 0 0', textAlign: 'center' }}>
            <Heading style={{ color: '#ffffff', margin: 0 }}>✅ Demande reçue !</Heading>
          </Section>
          <Section style={{ padding: '24px' }}>
            <Text style={{ fontSize: 16, color: '#333' }}>Bonjour {fullName},</Text>
            <Text style={{ fontSize: 16, color: '#333', lineHeight: 1.6 }}>
              Nous avons bien reçu votre demande de <strong>{serviceType}</strong>.
              Notre équipe vous contactera dans les <strong>{estimatedResponseTime}</strong>.
            </Text>
            {isUrgent && (
              <Section style={{ backgroundColor: '#FFF3F3', border: '1px solid #C41E3A', borderRadius: 6, padding: 16, margin: '16px 0' }}>
                <Text style={{ margin: 0, color: '#C41E3A', fontWeight: 'bold' }}>
                  🚨 Demande urgente — Rappel sous 2 heures (heures ouvrables) ou dès que possible.
                </Text>
              </Section>
            )}
            <Hr />
            <Text style={{ fontSize: 14, color: '#666' }}>
              En cas d'urgence, appelez-nous directement :{' '}
              <a href="tel:+3247512345" style={{ color: '#C41E3A', fontWeight: 'bold' }}>0475 12 34 56</a>
              {' '}(7j/7, 24h/24)
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

---

## §4. Notification Service

```typescript
// lib/resend/notifications.ts
import { getResendClient } from './client'
import { render } from '@react-email/render'
import { LeadNotificationEmail } from './templates/lead-notification'
import { CustomerReceiptEmail } from './templates/customer-receipt'
import { createAdminClient } from '@/lib/supabase/admin'

const FROM_ADDRESS = 'Chauffagiste-Belga <no-reply@chauffagiste-belga.be>'
const INTERNAL_EMAIL = process.env.INTERNAL_LEAD_EMAIL ?? 'leads@chauffagiste-belga.be'
const URGENT_EMAIL = process.env.URGENT_LEAD_EMAIL ?? 'urgence@chauffagiste-belga.be'

interface LeadNotificationInput {
  leadId: string
  fullName: string
  phone: string
  email?: string
  postalCode: string
  serviceType: string
  message?: string
  communeId?: string
  isUrgent: boolean
}

export async function sendLeadNotification(lead: LeadNotificationInput): Promise<void> {
  const resend = getResendClient()
  const supabase = createAdminClient()

  // Resolve commune name for context
  let communeName: string | undefined
  if (lead.communeId) {
    const { data } = await supabase
      .from('communes')
      .select('name_fr')
      .eq('id', lead.communeId)
      .single()
    communeName = data?.name_fr
  }

  const props = {
    ...lead,
    communeName,
    submittedAt: new Date().toISOString(),
    sourceUrl: '',
  }

  const estimatedResponseTime = lead.isUrgent
    ? '2 heures'
    : 'les prochaines heures ouvrables (lun–dim 7h–20h)'

  // Send in parallel
  await Promise.allSettled([
    // 1. Internal notification (to business)
    resend.emails.send({
      from: FROM_ADDRESS,
      to: lead.isUrgent ? URGENT_EMAIL : INTERNAL_EMAIL,
      subject: `${lead.isUrgent ? '🚨 URGENT — ' : ''}Nouvelle demande ${lead.serviceType} — ${lead.fullName} (${lead.postalCode})`,
      html: render(LeadNotificationEmail(props)),
    }),

    // 2. Customer receipt (if email provided)
    lead.email && resend.emails.send({
      from: FROM_ADDRESS,
      to: lead.email,
      replyTo: INTERNAL_EMAIL,
      subject: 'Votre demande a bien été reçue — Chauffagiste-Belga',
      html: render(CustomerReceiptEmail({
        fullName: lead.fullName,
        serviceType: lead.serviceType,
        isUrgent: lead.isUrgent,
        estimatedResponseTime,
      })),
    }),
  ])
}
```

---

## §5. Email Deliverability Requirements

| Setting | Value |
|---------|-------|
| SPF | `v=spf1 include:_spf.resend.com ~all` |
| DKIM | Configured via Resend domain verification |
| DMARC | `v=DMARC1; p=quarantine; rua=mailto:dmarc@chauffagiste-belga.be` |
| Sending domain | `@chauffagiste-belga.be` (not `@resend.dev`) |
| From name | `Chauffagiste-Belga <no-reply@chauffagiste-belga.be>` |
| Reply-to | `leads@chauffagiste-belga.be` |

---

## §6. Alert Routing Logic

```
Is lead urgent? (isUrgent = true OR serviceType = 'depannage')
    ├── YES → Send to urgence@chauffagiste-belga.be + SMS webhook
    └── NO  → Send to leads@chauffagiste-belga.be

Business hours (07:00–20:00 Belgium time)?
    ├── YES → Standard queue
    └── NO  → After-hours urgent alert with "Received outside business hours" flag
```

---

## §7. SLA Targets

| Lead Type | Notification Delivery | Team Response |
|-----------|----------------------|--------------|
| Urgent (depannage) | < 30 seconds | < 2 hours |
| Standard (entretien/installation) | < 2 minutes | < 4 business hours |
| Quote request | < 2 minutes | < 1 business day |