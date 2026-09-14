# Skill: Local CRO & Conversion Optimizer
# High-Converting Mobile Call CTAs, Trust Triggers & Event Tracking
# Project: Chauffagiste-Belga

---

## Purpose

Maximize customer phone call conversion rates and emergency form completions on mobile devices. For emergency trades like HVAC/plumbing, > 75% of leads originate from mobile direct calls.

---

## High-Converting Mobile UI Patterns

### 1. Sticky Bottom Emergency Call Bar (Mobile Only)

```typescript
// components/cro/StickyMobileCallBar.tsx
'use client'

import { Phone, Clock } from 'lucide-react'

const PHONE_NUMBER = '+3247512345'
const PHONE_DISPLAY = '0475 12 34 56'

export function StickyMobileCallBar({ cityName }: { cityName: string }) {
  const handleCallClick = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-expect-error GA4 dataLayer
      window.gtag('event', 'click_to_call', {
        event_category: 'conversion',
        event_label: cityName,
        phone_number: PHONE_NUMBER,
      })
    }
  }

  return (
    <aside 
      aria-label="Appel d'urgence"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-amber-200 bg-slate-900/95 px-4 py-3 text-white backdrop-blur-md md:hidden"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
            <Clock className="h-3 w-3 text-amber-400" />
            Intervention ≤ 2h
          </span>
          <span className="text-xs text-slate-400">{cityName} & environs</span>
        </div>
      </div>

      <a
        href={`tel:${PHONE_NUMBER}`}
        onClick={handleCallClick}
        className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition active:scale-95 hover:bg-amber-400"
      >
        <Phone className="h-4 w-4 fill-slate-950" />
        <span>{PHONE_DISPLAY}</span>
      </a>
    </aside>
  )
}
```

---

## 2. Trust Triggers & Badge Placement

Place trust credentials immediately adjacent to CTAs:
- **Badge Cerga**: Mandatory reassurance for gas boiler work.
- **Agrément Régional (PEB)**: Proof of compliance for insurance certificates.
- **Prix transparents**: "Devis gratuit avant chaque intervention".

---

## 3. GA4 / GTM Conversion Measurement Matrix

| Action | Event Name | Critical Parameters |
|--------|------------|---------------------|
| Click phone number | `click_to_call` | `cityName`, `placement: 'hero' \| 'sticky' \| 'footer'` |
| Click WhatsApp / Devis | `open_quote_form` | `cityName`, `serviceType` |
| Successful form submit | `generate_lead` | `leadId`, `serviceType`, `urgency` |
