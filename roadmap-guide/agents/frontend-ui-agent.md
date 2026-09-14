# Agent: Frontend UI Engineer
# Role: High-Converting UI/UX, Components & Form Handlers
# Project: Chauffagiste-Belga

---

## Identity

**Role Name**: `frontend-ui`
**Primary Language**: TypeScript, React (RSC + Client Components), Tailwind CSS v4
**Access Level**: Write to `app/`, `components/`, `lib/` (non-SEO, non-DB utilities)

---

## Mission

Build the component library, page layouts, and conversion-optimized UI for Chauffagiste-Belga. Every interface decision must serve one of two goals: **convert a visitor into a lead** or **build trust that enables conversion**.

---

## Scope

### IN SCOPE ✅
- All React components (`components/`)
- Page layout shells (`app/(marketing)/layout.tsx`, `app/(funnel)/layout.tsx`)
- Lead capture forms (Server Actions integration)
- Postal code auto-lookup widget
- Emergency phone bar (mobile sticky)
- Navigation (desktop + mobile)
- Hero sections, service grids, testimonial carousels
- Province map widget
- FAQ accordion
- Cookie consent banner (GDPR / Belgian law)
- Loading skeletons and error states
- Icon system
- Animation (CSS only — no heavy JS animation libraries)

### OUT OF SCOPE ❌
- Data fetching logic (→ `lib/supabase/`, `lib/sanity/`)
- SEO meta generation (→ `lib/seo/`, `pseo-architect-agent`)
- Database schema (→ `db-engineer-agent`)
- Sanity Studio config (→ `cms-content-agent`)

---

## Component Architecture

### Directory Structure

```
components/
├── layout/
│   ├── Header.tsx              # Desktop nav + mobile hamburger
│   ├── Footer.tsx              # Links + legal + social
│   ├── EmergencyBar.tsx        # Sticky mobile bottom bar
│   ├── MobileMenu.tsx          # 'use client' — slide-out drawer
│   └── CookieBanner.tsx        # GDPR consent — 'use client'
├── sections/
│   ├── HeroSection.tsx         # RSC — commune-specific hero
│   ├── ServicesGrid.tsx        # RSC — 6-card service grid
│   ├── TrustBar.tsx            # Stats bar (10+ ans, 12500+, 4.8/5)
│   ├── ZonesSection.tsx        # Province map + list
│   ├── WhyChooseUs.tsx         # 4 value propositions
│   ├── TestimonialsSection.tsx # RSC — 3 testimonials
│   ├── CTABanner.tsx           # Mid-page conversion banner
│   ├── FAQSection.tsx          # Accordion — 'use client'
│   ├── NearbyCommunes.tsx      # Internal link grid
│   └── BlogPreview.tsx         # RSC — latest 3 posts
├── forms/
│   ├── LeadForm.tsx            # 'use client' — primary quote form
│   ├── EmergencyForm.tsx       # 'use client' — urgent 3-field form
│   └── PostalLookup.tsx        # 'use client' — zip → commune resolver
├── ui/
│   ├── Button.tsx              # Variant system: emergency/primary/outline/ghost
│   ├── ServiceCard.tsx         # Linked service card
│   ├── TestimonialCard.tsx     # Star rating + quote + verified badge
│   ├── StatCounter.tsx         # Animated number counter
│   ├── Badge.tsx               # Status/urgency badges
│   ├── Accordion.tsx           # FAQ accordion
│   ├── PhoneLink.tsx           # tel: link with tracking
│   └── Typography.tsx          # H1–H4, Body, Caption components
├── seo/
│   ├── JsonLd.tsx              # JSON-LD script injector
│   ├── Breadcrumb.tsx          # Semantic breadcrumb
│   └── HreflangLinks.tsx       # Language alternates
└── icons/
    └── index.tsx               # SVG icon system
```

---

## Critical Component Specifications

### Header Component

```typescript
// components/layout/Header.tsx
import Link from 'next/link'
import { PhoneLink } from '@/components/ui/PhoneLink'
import { MobileMenu } from './MobileMenu'
import { Logo } from '@/components/icons'

const NAV_ITEMS = [
  { label: 'Nos services', href: '/nos-services' },
  { label: "Zones d'intervention", href: '/zones-intervention' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Avis clients', href: '/avis-clients' },
  { label: 'Conseils', href: '/conseils' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-default">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" aria-label="Chauffagiste-Belga — Accueil" className="flex-shrink-0">
            <Logo className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-trust-blue rounded-md transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA cluster */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 text-sm">
              <Link href="/" className="font-bold text-trust-blue" lang="fr" aria-label="Français">FR</Link>
              <span className="text-gray-300" aria-hidden>|</span>
              <Link href="/nl" className="text-gray-500 hover:text-trust-blue" lang="nl" aria-label="Nederlands">NL</Link>
            </div>
            <Link
              href="/devis"
              className="bg-trust-blue text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-trust-blue/90 transition-colors min-h-[44px] flex items-center"
            >
              Demander un devis
            </Link>
            <PhoneLink
              phone="0475 12 34 56"
              className="flex items-center gap-1.5 text-trust-blue font-bold text-sm"
              showAvailability
            />
          </div>

          {/* Mobile hamburger */}
          <MobileMenu navItems={NAV_ITEMS} />
        </div>
      </div>
    </header>
  )
}
```

### Hero Section (RSC, Commune-Aware)

```typescript
// components/sections/HeroSection.tsx
import Image from 'next/image'
import { EmergencyCTA } from '@/components/ui/Button'
import { ShieldCheckIcon, ClockIcon, StarIcon } from '@/components/icons'
import type { Commune } from '@/types/geo'

interface HeroSectionProps {
  commune?: Commune
}

const TRUST_BADGES = [
  { icon: ClockIcon, label: 'Intervention rapide', sub: '(≤ 24h)' },
  { icon: ShieldCheckIcon, label: 'Techniciens agréés', sub: '& expérimentés' },
  { icon: StarIcon, label: 'Devis gratuit', sub: '& transparent' },
  { icon: ShieldCheckIcon, label: 'Garantie', sub: '2 ans' },
]

export function HeroSection({ commune }: HeroSectionProps) {
  const headline = commune
    ? `Votre chauffagiste à ${commune.nameFr}`
    : 'Votre chauffage entre\nde bonnes mains'

  const subheadline = commune
    ? `Dépannage, entretien, installation : intervention rapide à ${commune.nameFr} (${commune.postalCodes.slice(0, 3).join(', ')}), ${commune.province.nameFr}.`
    : "Dépannage, entretien, installation : notre équipe de chauffagistes intervient rapidement dans toute la Belgique."

  return (
    <section
      className="bg-gray-50 pt-8 pb-12 md:pt-14 md:pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="container-default">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Content */}
          <div className="flex-1 max-w-2xl">
            {commune && (
              <p className="text-emergency-red font-bold text-sm uppercase tracking-wide mb-3">
                Spécialiste du chauffage en Belgique
              </p>
            )}
            <h1
              id="hero-heading"
              className="font-display font-extrabold text-trust-blue text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight"
            >
              {headline.split('\n').map((line, i) => (
                <span key={i} className={i === 1 ? 'block' : ''}>
                  {i === 1 ? (
                    <>de <span className="text-emergency-red">bonnes mains</span></>
                  ) : line}
                </span>
              ))}
            </h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed max-w-[60ch]">
              {subheadline}
            </p>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <Icon className="shrink-0 text-trust-blue-light" size={18} aria-hidden />
                  <span>
                    <span className="font-medium text-gray-900">{label}</span>
                    <span className="text-gray-500 block text-xs">{sub}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <EmergencyCTA size="lg" />
              <a
                href="/devis"
                className="inline-flex items-center justify-center gap-2 border-2 border-trust-blue text-trust-blue font-bold py-4 px-6 rounded-lg hover:bg-trust-blue hover:text-white transition-colors min-h-[56px]"
              >
                Demander un devis gratuit →
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
              <span className="text-yellow-400 text-base" aria-hidden>★★★★★</span>
              <span><strong className="text-gray-900">4,8/5</strong> sur Google</span>
              <span className="text-gray-300" aria-hidden>·</span>
              <span>+ 1 200 avis clients</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative lg:flex-1 lg:flex lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[3/4] max-w-md lg:max-w-none lg:w-full">
              <Image
                src="/images/hero-technicien.webp"
                alt="Technicien Chauffagiste-Belga intervenant sur une chaudière"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating urgency badge */}
            <div
              className="absolute -top-3 -right-3 lg:top-4 lg:right-4 bg-trust-blue text-white rounded-xl p-3 shadow-lg text-center"
              aria-label="Intervention rapide en moins de 24 heures dans toute la Belgique"
            >
              <ClockIcon className="mx-auto mb-1 text-blue-300" size={20} aria-hidden />
              <p className="font-bold text-sm leading-tight">INTERVENTION</p>
              <p className="font-bold text-sm leading-tight">RAPIDE</p>
              <p className="text-emergency-red font-extrabold text-lg leading-none mt-1">≤ 24h</p>
              <p className="text-blue-300 text-xs mt-1">dans toute la Belgique</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Postal Code Lookup Widget

```typescript
// components/forms/PostalLookup.tsx
'use client'

import { useState, useTransition } from 'react'
import { lookupByPostalCode } from '@/app/actions/lookup-postal'
import type { CommuneSummary } from '@/types/geo'

export function PostalLookup() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CommuneSummary[]>([])
  const [isPending, startTransition] = useTransition()

  const handleInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    setQuery(digits)

    if (digits.length === 4) {
      startTransition(async () => {
        const communes = await lookupByPostalCode(digits)
        setResults(communes)
      })
    } else {
      setResults([])
    }
  }

  return (
    <div className="relative">
      <label htmlFor="postal-input" className="sr-only">
        Entrez votre code postal
      </label>
      <div className="flex gap-2">
        <input
          id="postal-input"
          type="text"
          inputMode="numeric"
          pattern="\d{4}"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Code postal (ex: 1000)"
          maxLength={4}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          aria-describedby={results.length > 0 ? 'postal-results' : undefined}
          aria-busy={isPending}
        />
        {isPending && (
          <div className="flex items-center px-3 text-gray-500" aria-live="polite">
            <span className="sr-only">Recherche en cours...</span>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <ul
          id="postal-results"
          className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
          role="listbox"
          aria-label="Communes correspondantes"
        >
          {results.map((commune) => (
            <li key={commune.id} role="option" aria-selected={false}>
              <a
                href={`/chauffagiste-${commune.slug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-sm transition-colors"
              >
                <span className="font-medium text-gray-900">{commune.nameFr}</span>
                <span className="text-trust-blue-light text-xs">{commune.province.nameFr} →</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## Conversion Optimization Rules

1. **Above-the-fold CTA**: Every page variant MUST have a phone link and/or form visible without scrolling on mobile (375px viewport)
2. **Emergency visual signals**: Red color ONLY for emergency CTAs and error states — no decorative red
3. **Social proof placement**: Testimonials or star rating MUST appear within the first 2 sections
4. **Form friction**: Primary lead form MUST have ≤ 5 fields above the fold
5. **Phone number visibility**: Must be clickable (`tel:`) on mobile, visible in header and footer on desktop
6. **Loading states**: Every form button MUST show a loading state during submission
7. **Success confirmation**: Form success state MUST show estimated callback time (2h during business hours)

---

## Accessibility Checklist (per component)

- [ ] Semantic HTML element used (not `<div>` for interactive elements)
- [ ] All images have descriptive `alt` text
- [ ] All form inputs have associated `<label>` elements
- [ ] Error messages use `role="alert"` and `aria-describedby`
- [ ] Interactive elements meet 48px minimum touch target
- [ ] Color is never the sole conveyor of meaning
- [ ] Focus ring visible on keyboard navigation
- [ ] Dynamic content changes announced via `aria-live`
- [ ] Icons marked `aria-hidden="true"` with text alternatives