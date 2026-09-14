# 02 — Feature Specifications
# Emergency Call System, Zip Detector & Quote Engine
# Project: Chauffagiste-Belga

---

## §1. F02 — Emergency Phone CTA System

### 1.1 Component Hierarchy

```
EmergencyPhoneSystem
├── Header → PhoneLink (desktop — always visible)
├── EmergencyBar → PhoneLink (mobile — sticky on scroll)
├── HeroSection → EmergencyCTA (primary above-fold CTA)
├── CTABanner → EmergencyCTA (mid-page trigger)
└── Footer → PhoneLink (fallback)
```

### 1.2 Phone Number Configuration

```typescript
// lib/constants/contact.ts
export const CONTACT = {
  phone: {
    display: '0475 12 34 56',
    e164: '+3247512345',        // Used in tel: links and JSON-LD
    formatted: '0475 12 34 56', // Display format
  },
  email: {
    general: 'info@chauffagiste-belga.be',
    leads: 'leads@chauffagiste-belga.be',
    urgent: 'urgence@chauffagiste-belga.be',
  },
  availability: '7j/7 · 24h/24',
  responseTime: {
    urgent: '≤ 2 heures',
    standard: '≤ 24 heures',
    businessHours: 'Lun–Dim 07:00–20:00',
  },
} as const
```

### 1.3 Click-to-Call Tracking

```typescript
// components/ui/PhoneLink.tsx
'use client'

import { CONTACT } from '@/lib/constants/contact'

interface PhoneLinkProps {
  className?: string
  showAvailability?: boolean
  trackingLabel?: string // Context for analytics event
}

export function PhoneLink({ className, showAvailability, trackingLabel }: PhoneLinkProps) {
  const handleClick = () => {
    // GA4 conversion event
    window.gtag?.('event', 'click_to_call', {
      event_category: 'engagement',
      event_label: trackingLabel ?? 'unknown',
      phone_number: CONTACT.phone.display,
    })
    // Meta Pixel (if installed)
    window.fbq?.('track', 'Contact', { content_name: 'phone_click' })
  }

  return (
    <a
      href={`tel:${CONTACT.phone.e164}`}
      onClick={handleClick}
      className={className}
      aria-label={`Appeler Chauffagiste-Belga au ${CONTACT.phone.display}`}
    >
      <span aria-hidden>{CONTACT.phone.display}</span>
      {showAvailability && (
        <span className="block text-xs opacity-75">{CONTACT.availability}</span>
      )}
    </a>
  )
}
```

### 1.4 Emergency Bar Behaviour Specification

| State | Trigger | Behaviour |
|-------|---------|-----------|
| Hidden | Page load | `translateY(100%)` — below viewport |
| Visible | Scroll > 300px | `translateY(0)` — slide up (250ms ease) |
| Hidden again | Scroll back < 300px | `translateY(100%)` — slide down |
| Always visible | User on `/urgence` page | Permanently shown, pulsing animation |

### 1.5 Acceptance Criteria

- [ ] Phone number renders as `<a href="tel:...">` on all devices
- [ ] Click triggers `click_to_call` GA4 event
- [ ] Emergency bar visible after 300px scroll on mobile (375px viewport)
- [ ] Emergency bar hidden on desktop (uses nav CTA instead)
- [ ] Click-to-call rate ≥ 8% on mobile pSEO pages (measured in GA4)
- [ ] Phone number in header, footer, and at least one body location per page

---

## §2. F04 — Postal Code Zip Detector

### 2.1 Functional Specification

The Zip Detector is a **real-time commune lookup widget** that:
1. Accepts a 4-digit Belgian postal code
2. Queries Supabase for matching communes
3. Returns clickable links to their pSEO landing pages
4. Guides the user to their local service page

### 2.2 UI States

```
State 1: Empty input
  → Placeholder: "Code postal (ex: 1000)"
  → No results shown

State 2: 1–3 digits typed
  → No query fired (wait for 4 digits)
  → Show subtle "..." loading hint if user pauses

State 3: 4 digits typed (valid format)
  → Fire lookup immediately (debounce: 0ms for 4-digit trigger)
  → Show spinner in input field

State 4: Results returned (1–N communes)
  → Show dropdown with commune names + province
  → Each item links to /chauffagiste-[commune-slug]

State 5: No results found
  → Show: "Aucune commune trouvée pour ce code postal."
  → CTA: "Appelez-nous directement: 0475 12 34 56"

State 6: Invalid format (not 4 digits or letters)
  → Show inline error: "Code postal belge : 4 chiffres (ex: 1000)"
```

### 2.3 Server Action for Postal Lookup

```typescript
// app/actions/lookup-postal.ts
'use server'

import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { validateBelgianPostalCode } from '@/lib/validation/belgian-postal'
import type { Result } from '@/types/common'

const schema = z.object({
  postalCode: z.string().regex(/^\d{4}$/, 'Code postal invalide'),
})

export type CommuneSearchResult = {
  id: string
  nameFr: string
  slug: string
  province: string
  postalCodes: string[]
}

export async function lookupByPostalCode(
  postalCode: string
): Promise<Result<CommuneSearchResult[]>> {
  const parsed = schema.safeParse({ postalCode })
  if (!parsed.success) {
    return { success: false, error: 'Format de code postal invalide.' }
  }

  // Syntactic validation first (no DB hit)
  const validation = validateBelgianPostalCode(postalCode)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .rpc('lookup_communes_by_postal_code', { postal_code: postalCode })

  if (error) {
    return { success: false, error: 'Erreur serveur. Veuillez réessayer.' }
  }

  if (!data || data.length === 0) {
    return {
      success: false,
      error: `Aucune commune trouvée pour le code postal ${postalCode}.`,
    }
  }

  return {
    success: true,
    data: data.map((row) => ({
      id: row.id,
      nameFr: row.name_fr,
      slug: row.slug_fr,
      province: row.province_name_fr,
      postalCodes: [],
    })),
  }
}
```

### 2.4 Placement Specification

| Location | Context | Variant |
|----------|---------|---------|
| Homepage hero | Primary lookup — "Trouvez votre chauffagiste" | Full width |
| `/devis` page | Pre-fills form commune field | Inline |
| 404 page | "Cherchez votre commune" | Recovery CTA |
| `/zones-intervention` | Province/commune explorer | With map |

### 2.5 Acceptance Criteria

- [ ] Results appear in < 500ms for all valid Belgian postal codes
- [ ] Handles shared postal codes (multiple communes) — shows all matches
- [ ] Invalid format shows inline error without page reload
- [ ] Mobile keyboard set to `inputMode="numeric"` for number pad
- [ ] Accessible: `aria-live` region announces results to screen readers
- [ ] Tracks `postal_lookup` GA4 event on each search

---

## §3. F03 — Quote Engine (Lead Capture Form)

### 3.1 Form Field Specification

| Field | Type | Required | Validation |
|-------|------|---------|-----------|
| `fullName` | text | ✅ | min 2 chars, max 100 chars |
| `phone` | tel | ✅ | Belgian phone regex: `^(\+32\|0)[1-9]\d{7,8}$` |
| `email` | email | ❌ | Valid email format if provided |
| `postalCode` | text | ✅ | Exactly 4 digits, Belgian range 1000–9992 |
| `serviceType` | select | ✅ | One of 6 service types |
| `message` | textarea | ❌ | Max 1000 chars |
| `isUrgent` | checkbox | ❌ | Defaults false |
| `website` | text (honeypot) | — | Must be empty (bot detection) |

### 3.2 Service Type Options (Form Select)

```typescript
export const FORM_SERVICE_OPTIONS = [
  { value: 'depannage', label: '🚨 Dépannage urgent' },
  { value: 'entretien', label: '🔧 Entretien annuel' },
  { value: 'installation', label: '🏠 Installation neuve' },
  { value: 'reparation', label: '⚙️ Réparation / pièces' },
  { value: 'devis', label: '📋 Demande de devis' },
  { value: 'other', label: '❓ Autre' },
] as const
```

### 3.3 Form Variants

| Variant | Fields Shown | Use Case |
|---------|-------------|---------|
| `full` | All 7 fields | `/devis` page, commune page sidebar |
| `emergency` | Name, Phone, Postal (3 fields) | Homepage hero, EmergencyBar |
| `minimal` | Name, Phone only | Exit-intent popup (v1.1) |

### 3.4 Post-Submission Flow

```
Form submitted
      ↓
submitLead() Server Action
      ↓
Zod validation + honeypot check
      ↓
Rate limit check (5 submissions/hour/IP)
      ↓
INSERT to Supabase leads table
      ↓ (non-blocking)
sendLeadNotification() → Resend
      ↓
Form shows <LeadSuccessState>
      ↓
setTimeout(3000) → redirect to /merci
```

### 3.5 Success State Content

```typescript
// components/forms/LeadSuccessState.tsx
function LeadSuccessState({ isUrgent }: { isUrgent: boolean }) {
  return (
    <div role="status" aria-live="polite">
      <h3>✅ Demande envoyée !</h3>
      <p>
        {isUrgent
          ? 'Notre équipe vous rappelle dans les 2 heures.'
          : 'Nous vous répondons dans les prochaines heures ouvrables (lun–dim 7h–20h).'}
      </p>
      <p>
        Besoin urgent ? Appelez directement :{' '}
        <a href="tel:+3247512345">0475 12 34 56</a>
      </p>
    </div>
  )
}
```

### 3.6 Acceptance Criteria

- [ ] Form submits via Server Action (no client-side fetch)
- [ ] Belgian phone validation rejects `06` prefix (French numbers)
- [ ] Honeypot catches bot submissions silently (no error shown to bot)
- [ ] Rate limiting: max 5 submissions per IP per hour
- [ ] Resend notification delivered in < 30s (verified in testing)
- [ ] Urgent leads (`serviceType === 'depannage'`) routed to `urgence@` email
- [ ] `lead_submit` GA4 conversion event fires on success
- [ ] Form works without JavaScript (progressive enhancement via Server Action)

---

## §4. F05 — World-Class AI HVAC Emergency & Triage Chat Engine

### 4.1 System Overview & Conversational Triage Flow

The chat feature operates as an intelligent 24/7 HVAC triage agent for Belgian homeowners. It is designed for ultra-high conversion, strict safety compliance, and zero impact on initial Core Web Vitals.

```
                    [User Opens Chat / Trigger]
                                │
                 Is Gas / CO / Smoke Mentioned?
                                │
               ┌────────────────┴────────────────┐
             YES                                 NO
               ▼                                 ▼
    [CRITICAL RED ALERT]              [Interactive Technical Triage]
 "Coupez le compteur de gaz,         1. Boiler Brand / Model identification
  ouvrez les fenêtres, évacuez"      2. Error code / Symptom diagnosis
               │                     3. Belgian Postal Code / Commune check
               ▼                                 │
     [Direct 1-Click Call]                       ▼
      [0475 12 34 56]                 [Instant Resolution or Booking]
                                      ├── Guided Self-Help (e.g. remettre de l'eau)
                                      ├── Direct Emergency Call (≤ 2h)
                                      └── Callback Lead Form (Resend dispatch)
```

### 4.2 Critical Safety Intercept Protocol (Gas & CO Protection)

If user prompt matches any hazardous entity regex:
`/(gaz|odeur|fuite|monoxyde|co\b|étourdissement|flamme jaune|fumée|brûlé)/i`

The chat engine **immediately halts generic generation** and renders the hardcoded emergency alert:
- **Banner**: Red pulsing alert (`bg-red-600 text-white font-bold`).
- **Instructions**:
  1. *Coupez immédiatement votre vanne générale de gaz.*
  2. *N'actionnez aucun interrupteur électrique ni briquet.*
  3. *Ouvrez portes et fenêtres en grand.*
  4. *Évacuez le logement et appelez les secours (112) ou notre hotline d'urgence.*
- **Primary CTA**: `<a href="tel:+3247512345" class="bg-white text-red-700 font-extrabold">Appeler le 0475 12 34 56 (Urgence 24/7)</a>`.

### 4.3 Technical Diagnostic Knowledge Base (Belgian Fleet)

The system prompt is primed with common Belgian boiler error resolutions:
- **Vaillant**: `F28` / `F29` (Défaut d'allumage gaz / détendeur), `F22` (Manque d'eau / pression < 0.8 bar), `F75` (Défaut capteur de pression / pompe).
- **Bulex / Saunier Duval**: `F1` / `F4` (Défaut d'allumage), `F9` (Pression d'eau insuffisante).
- **Viessmann**: `F4` / `F5` (Défaut de flamme brûleur), `F2` (Surchauffe thermostat de sécurité).
- **Junkers / Bosch**: `EA` (Absence de courant d'ionisation), `E9` (Limiteur de température déclenché).
- **Pression basse générale**: Si pression < 1.2 bar, l'assistant explique comment ouvrir le robinet de remplissage bleu/double disconnecteur pour remonter à 1.5 bar.

### 4.4 Netlify-Compatible Streaming Architecture

The API route runs as a Next.js Route Handler fully compatible with Netlify deployment (`@netlify/plugin-nextjs`):

```typescript
// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai'
// Or @ai-sdk/openai with standard Response streaming
export const runtime = 'edge' // Executes on Netlify Edge Functions

export async function POST(req: Request) {
  // Edge streaming logic compatible with Netlify
}
```

### 4.5 Acceptance Criteria

- [ ] Chat widget deferred until user interaction or 4s idle (0ms impact on initial mobile LCP/TBT).
- [ ] 100% intercept accuracy on hazardous gas/CO terms with immediate red safety UI.
- [ ] Validates Belgian postal codes (4 digits) and identifies associated commune.
- [ ] Captures lead phone numbers and posts directly to Supabase `leads` and `chat_sessions`.
- [ ] Deployed and tested seamlessly on Netlify without timeout issues.

