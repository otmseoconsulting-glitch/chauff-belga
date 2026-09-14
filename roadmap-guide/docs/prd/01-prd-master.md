# 01 — Product Requirements Document (Master)
# Chauffagiste-Belga: Belgian HVAC & Plumbing pSEO Platform
# Version: 1.0.0

---

## §1. Executive Summary

**Product**: Chauffagiste-Belga — a programmatic SEO website capturing Belgian emergency HVAC and plumbing search traffic across ~337 communes.

**Business Model**: Lead generation — monetized via inbound calls and quote form submissions sold/referred to certified HVAC technicians operating nationally in Belgium.

**Primary Value Proposition**: A trusted, locally-relevant Belgian heating expert that appears for every `chauffagiste [commune]` and `dépannage chaudière [commune]` search in the country, converting urgent need into immediate phone contact.

---

## §2. Business Objectives

| Objective | KPI | Target (12 months) |
|-----------|-----|-------------------|
| Organic visibility | Indexed pSEO pages | ~337 pages (~337 communes) |
| Search ranking | Average position for `chauffagiste [commune]` | Top 5 |
| Traffic | Monthly organic sessions | 40,000+ |
| Lead volume | Monthly form submissions + calls | 500+ |
| Call conversion | Click-to-call rate on mobile | ≥ 8% |
| Form conversion | Lead form completion rate | ≥ 4% |
| Page speed | Core Web Vitals (LCP) | ≤ 2.0s on all pages |
| Content coverage | Belgian communes with indexed pages | 100% (337/337 targeted) |

---

## §3. Target Personas

### Persona 1: The Emergency Homeowner (60% of traffic)
- **Trigger**: Boiler stopped working in winter, no hot water, heating failure
- **Time pressure**: HIGH — needs help within hours
- **Device**: 80% mobile (typing from kitchen/living room in crisis)
- **Query**: `chauffagiste urgence [city]`, `dépannage chaudière [city]`
- **Decision speed**: < 2 minutes — calls first result with phone visible
- **Needs**: Visible phone number, availability confirmation (24/7), fast response promise

### Persona 2: The Annual Maintenance Booker (25% of traffic)
- **Trigger**: Received Belgian legal requirement reminder for annual boiler service
- **Time pressure**: MODERATE — needs appointment within 2–4 weeks
- **Device**: 55% desktop (deliberate research phase)
- **Query**: `entretien chaudière [city]`, `révision chaudière agréé [city]`
- **Decision speed**: Compares 2–3 options, reads reviews
- **Needs**: Certifications visible, price transparency, Google reviews prominently displayed

### Persona 3: The Installation Planner (15% of traffic)
- **Trigger**: New home, renovation, switching from fuel oil to gas/heat pump
- **Time pressure**: LOW — planning horizon 1–3 months
- **Device**: 65% desktop
- **Query**: `installation pompe à chaleur [city]`, `remplacement chaudière [city]`
- **Decision speed**: Multiple sessions, wants quote and site visit
- **Needs**: Detailed service info, energy savings calculator, subsidy information (Prime Habitation)

---

## §4. Conversion Funnel

```
AWARENESS (pSEO organic traffic)
    ↓ Google/AI search result click
LANDING (commune or service+commune page)
    ↓ CTA interaction
CONVERSION (one of four paths):
    ├── Path A: Click-to-call (immediate, high intent)
    │         → CRM entry → Technician dispatch
    ├── Path B: Quote form submission
    │         → Resend notification → Callback within 2h
    ├── Path C: Lead form → Thank you page
    │         → Email sequence → Appointment booked
    └── Path D: AI Emergency & Triage Chat (interactive triage)
              → Gas safety check → Error diagnosis → Call or Lead capture
```

---

## §5. Core Feature Requirements

### F01: Programmatic Landing Pages
- **Priority**: P0 (Critical)
- **Scope**: ~337 commune pages total
- **Generation**: Static at build time via `generateStaticParams`, ISR for updates
- **Content**: Spintax-resolved unique text, commune-specific schema, local FAQ
- **Acceptance**: All pages indexed by Google within 60 days of launch

### F02: Emergency Phone CTA
- **Priority**: P0 (Critical)
- **Scope**: Every page
- **Behaviour**: `tel:` link, sticky on mobile scroll, always-visible in header desktop
- **Analytics**: Track clicks as `click_to_call` conversion events
- **Acceptance**: Click-to-call rate ≥ 8% on mobile pages

### F03: Lead Capture Form
- **Priority**: P0 (Critical)
- **Scope**: Every commune page, dedicated `/devis` page, homepage
- **Fields**: Name, Phone (required), Email (optional), Postal code (required), Service type, Message
- **Validation**: Belgian phone regex, Belgian postal code validation
- **Routing**: Urgent leads (depannage) trigger immediate Resend notification
- **Acceptance**: Form submission → Resend email delivered within 30 seconds

### F04: Postal Code Lookup
- **Priority**: P1 (High)
- **Scope**: Homepage hero, `/devis` page
- **Behaviour**: 4-digit input → auto-lookup → show matching commune page links
- **Source**: Supabase `communes.postal_codes` array
- **Acceptance**: Returns results in < 500ms, handles all valid Belgian codes

### F05: AI Emergency & Triage Chat Assistant
- **Priority**: P1 (High)
- **Scope**: Floating chat widget on all commune pages & homepage (deferred lazy load to preserve Core Web Vitals)
- **Features**: Gas leak & CO safety intercept, Belgian boiler brand/error code diagnostic (Vaillant, Bulex, Viessmann, Junkers), zip/commune qualification, 1-click phone escalation, lead capture
- **Runtime**: Next.js Route Handler compatible with Netlify Functions / Netlify Edge, streaming UI via AI SDK, Supabase session persistence
- **Acceptance**: First stream token in < 600ms, 0 layout shift (CLS = 0.000), 100% emergency trigger on gas/CO terms

### F06: Blog / Content Hub
- **Priority**: P2 (Medium)
- **Scope**: `/conseils` hub + individual posts from Sanity CMS
- **Content**: Technical guides (entretien chaudière, économies énergie), regulatory info (PEB), seasonal content
- **Cadence**: 2 posts/month minimum to build topical authority
- **Acceptance**: Blog posts indexed within 24h of publication (ISR webhook)

### F07: Multilingual Support (FR/NL)
- **Priority**: Dropped (Strictly 100% French for Phase 1)
- **Scope**: N/A
- **URL pattern**: N/A
- **hreflang**: N/A
- **Acceptance**: N/A

### F08: Google Reviews Integration
- **Priority**: P1 (High)
- **Scope**: Testimonials section on all commune pages
- **Source**: Approved testimonials stored in Supabase `testimonials` table
- **Schema**: `AggregateRating` in JSON-LD on all pages
- **Acceptance**: Rich stars appear in Google search results within 30 days

---

## §6. Non-Functional Requirements

| Requirement | Specification |
|-------------|--------------|
| **Availability** | 99.9% uptime (Netlify SLA) |
| **Performance** | LCP < 2.0s, CLS < 0.05, INP < 100ms |
| **Security** | HTTPS only, CSP headers, input sanitization |
| **GDPR** | Cookie consent, privacy policy, data retention policy |
| **Accessibility** | WCAG 2.1 AA minimum |
| **Mobile** | Fully functional at 375px viewport minimum |
| **Indexability** | Valid sitemap, structured data, no crawl blocks on pSEO pages |
| **Scalability** | Architecture supports 10,000+ pSEO pages without code changes |

---

## §7. Out of Scope (v1.0)

- Customer portal / account login
- Real-time technician calendar booking
- Payment processing / on-site checkout
- Technician dispatch CRM (external integration)
- Native mobile app (iOS/Android)
- Native video file hosting (YouTube embedded guides supported via lite facade per docs/architecture/05-media-storage-strategy.md)
- User-generated reviews (sourced from Google only in v1.0)

---

## §8. Success Criteria for Launch

- [ ] All ~337 commune pages generated and accessible
- [ ] Core Web Vitals passing on 90%+ of pages (Lighthouse Mobile ≥ 92)
- [ ] Lead form working end-to-end (Resend delivery confirmed)
- [ ] Phone tracking configured (Google Analytics events)
- [ ] AI Emergency & Triage Chat functional with gas leak safety intercept
- [ ] Sitemap submitted to Google Search Console
- [ ] JSON-LD passing Google Rich Results Test on commune + blog pages
- [ ] GDPR cookie banner functional
- [ ] All pages have self-referencing canonical URLs
- [ ] Netlify deployment pipeline configured with ISR webhooks