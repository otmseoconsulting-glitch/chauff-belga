# 02 — Tailwind CSS v4: UI/UX Guidelines, Design Tokens & Accessibility
# Project: Chauffagiste-Belga

---

## §1. Design Token System

### 1.1 Core Palette (CSS Custom Properties via Tailwind v4)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* ── Brand Colors ── */
  --color-emergency-red:     #C41E3A;  /* Urgency CTAs, error states */
  --color-emergency-red-700: #991528;  /* Hover on emergency CTA */
  --color-trust-blue:        #1B3A6B;  /* Primary headings, nav, footer */
  --color-trust-blue-light:  #2D5FA6;  /* Secondary links, accents */
  --color-accent-orange:     #E8691A;  /* Secondary highlights (limited use) */

  /* ── Neutrals ── */
  --color-gray-950:  #0A0A0F;  /* Near-black body text */
  --color-gray-800:  #1F2026;  /* Secondary text */
  --color-gray-600:  #4B5060;  /* Captions, labels */
  --color-gray-200:  #E4E6EB;  /* Dividers, borders */
  --color-gray-50:   #F7F8FA;  /* Section backgrounds */
  --color-white:     #FFFFFF;

  /* ── Semantic ── */
  --color-success:   #1A7A4A;  /* Confirmation states */
  --color-warning:   #B45309;  /* Caution notices */

  /* ── Typography ── */
  --font-display: 'Syne', sans-serif;  /* Headlines, brand name */
  --font-body:    'Inter', sans-serif; /* Body, UI, forms */

  --font-size-xs:   0.75rem;    /* 12px */
  --font-size-sm:   0.875rem;   /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg:   1.125rem;   /* 18px */
  --font-size-xl:   1.25rem;    /* 20px */
  --font-size-2xl:  1.5rem;     /* 24px */
  --font-size-3xl:  1.875rem;   /* 30px */
  --font-size-4xl:  2.25rem;    /* 36px */
  --font-size-5xl:  3rem;       /* 48px */
  --font-size-6xl:  3.75rem;    /* 60px — hero headlines only */

  --line-height-tight:  1.2;
  --line-height-snug:   1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  /* ── Spacing ── */
  --spacing-section: 5rem;      /* Vertical section padding */
  --spacing-container: 1.5rem;  /* Horizontal container padding */

  /* ── Borders & Radii ── */
  --radius-sm:  0.25rem;
  --radius-md:  0.5rem;
  --radius-lg:  0.75rem;
  --radius-xl:  1rem;
  --radius-full: 9999px;

  /* ── Shadows ── */
  --shadow-card: 0 2px 12px 0 rgb(0 0 0 / 0.08);
  --shadow-card-hover: 0 8px 32px 0 rgb(0 0 0 / 0.14);
  --shadow-cta: 0 4px 16px 0 rgb(196 30 58 / 0.35);

  /* ── Transitions ── */
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --ease-standard:   cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 1.2 Semantic Color Usage Rules

| Token | Usage | NEVER Use For |
|-------|-------|---------------|
| `emergency-red` | Primary CTA buttons, emergency badge, phone number | Decorative borders, non-actionable elements |
| `trust-blue` | H1/H2 headings, navbar, footer background | Error states, urgency signals |
| `trust-blue-light` | Links, secondary buttons, icon fills | Text below 18px (contrast) |
| `accent-orange` | Badge highlights, "Nouveau" labels | Body text, large backgrounds |
| `gray-950` | All body text | Headings (use trust-blue instead) |
| `gray-50` | Alternating section backgrounds | Text on white backgrounds |

---

## §2. Typography Rules

### 2.1 Type Scale Application

```typescript
// components/ui/Typography.tsx — semantic heading components
export const H1 = ({ children, className }: TextProps) => (
  <h1 className={cn(
    'font-display font-extrabold text-trust-blue',
    'text-4xl md:text-5xl lg:text-6xl',
    'leading-tight tracking-tight',
    className
  )}>
    {children}
  </h1>
)

export const H2 = ({ children, className }: TextProps) => (
  <h2 className={cn(
    'font-display font-bold text-trust-blue',
    'text-2xl md:text-3xl lg:text-4xl',
    'leading-snug',
    className
  )}>
    {children}
  </h2>
)

export const H3 = ({ children, className }: TextProps) => (
  <h3 className={cn(
    'font-display font-bold text-gray-950',
    'text-xl md:text-2xl',
    'leading-snug',
    className
  )}>
    {children}
  </h3>
)

export const BodyLarge = ({ children, className }: TextProps) => (
  <p className={cn('font-body text-lg text-gray-800 leading-relaxed', className)}>
    {children}
  </p>
)
```

### 2.2 Typographic Constraints

- **Line length**: max `65ch` for body text (`max-w-[65ch]`)
- **Minimum font size**: `14px` (0.875rem) for any visible text
- **Heading hierarchy**: MUST follow H1 → H2 → H3 order — never skip levels
- **Font weight**: Display headings `font-extrabold` (800), body headings `font-bold` (700), body `font-normal` (400) or `font-medium` (500) for emphasis
- **Letter spacing**: Headlines use `tracking-tight`, body uses `tracking-normal`

---

## §3. Component Patterns

### 3.1 Emergency CTA Button (Primary)

```typescript
// components/ui/EmergencyCTA.tsx
import { PhoneIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

interface EmergencyCTAProps {
  phone?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function EmergencyCTA({
  phone = '0475 12 34 56',
  label = 'Appeler maintenant',
  size = 'md',
  className,
}: EmergencyCTAProps) {
  const sizes = {
    sm: 'py-2 px-4 text-sm min-h-[40px]',
    md: 'py-3 px-6 text-base min-h-[48px]',  // 48px min touch target
    lg: 'py-4 px-8 text-lg min-h-[56px]',
  }

  return (
    <a
      href={`tel:${phone.replace(/\s/g, '')}`}
      className={cn(
        'inline-flex items-center gap-2',
        'bg-emergency-red hover:bg-emergency-red-700',
        'text-white font-bold rounded-lg',
        'transition-all duration-fast ease-standard',
        'shadow-cta hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emergency-red focus-visible:ring-offset-2',
        'active:scale-95',
        sizes[size],
        className
      )}
      aria-label={`${label}: ${phone}`}
    >
      <PhoneIcon className="shrink-0" aria-hidden="true" />
      <span>{label}</span>
      <span className="text-red-200 text-sm">{phone}</span>
    </a>
  )
}
```

### 3.2 Sticky Emergency Bar (Mobile)

```typescript
// components/layout/EmergencyBar.tsx
'use client'

import { useEffect, useState } from 'react'
import { PhoneIcon, ClockIcon } from '@/components/icons'

export function EmergencyBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-emergency-red text-white',
        'px-4 py-3 safe-area-bottom',
        'flex items-center justify-between gap-3',
        'md:hidden',  // Desktop has nav CTA
        'transition-transform duration-base ease-standard',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
      role="banner"
      aria-label="Barre d'appel d'urgence"
    >
      <div className="flex items-center gap-2 text-sm">
        <ClockIcon className="shrink-0 text-red-200" aria-hidden />
        <span className="font-medium">Disponible 7j/7 · 24h/24</span>
      </div>
      <a
        href="tel:+3247512345"
        className="bg-white text-emergency-red font-bold py-2 px-4 rounded-md text-sm min-h-[40px] flex items-center gap-1.5 shrink-0"
        aria-label="Appeler le 0475 12 34 56"
      >
        <PhoneIcon size={14} aria-hidden />
        0475 12 34 56
      </a>
    </div>
  )
}
```

### 3.3 Service Card

```typescript
// components/ui/ServiceCard.tsx
import Link from 'next/link'
import type { ServiceCategory } from '@/types/services'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: ServiceCategory
  communeSlug?: string
  variant?: 'default' | 'compact' | 'featured'
}

export function ServiceCard({ service, communeSlug, variant = 'default' }: ServiceCardProps) {
  const href = communeSlug
    ? `/${service.slug}-${communeSlug}`
    : `/nos-services/${service.slug}`

  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-3 p-5 rounded-xl',
        'bg-white border border-gray-200',
        'hover:border-trust-blue-light hover:shadow-card-hover',
        'transition-all duration-base ease-standard',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trust-blue focus-visible:ring-offset-2',
        variant === 'featured' && 'bg-trust-blue text-white border-trust-blue',
        variant === 'compact' && 'flex-row items-center p-4'
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center',
        'bg-blue-50 text-trust-blue',
        'group-hover:bg-trust-blue group-hover:text-white',
        'transition-colors duration-base',
        variant === 'featured' && 'bg-white/10 text-white'
      )}>
        <service.Icon size={20} aria-hidden />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={cn(
          'font-bold text-base leading-snug',
          'text-gray-950 group-hover:text-trust-blue',
          variant === 'featured' && 'text-white group-hover:text-white'
        )}>
          {service.nameFr}
        </h3>
        {variant !== 'compact' && (
          <p className={cn(
            'text-sm text-gray-600 mt-1 line-clamp-2',
            variant === 'featured' && 'text-blue-200'
          )}>
            {service.shortDescription}
          </p>
        )}
      </div>

      <span className="text-trust-blue-light text-sm font-medium group-hover:translate-x-1 transition-transform duration-fast" aria-hidden>
        →
      </span>
    </Link>
  )
}
```

---

## §4. Layout & Spacing System

### 4.1 Section Spacing

```css
/* Consistent section vertical rhythm */
.section-padding {
  @apply py-16 md:py-20 lg:py-24;
}

.container-default {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.container-narrow {
  @apply max-w-3xl mx-auto px-4 sm:px-6;
}
```

### 4.2 Grid System

```typescript
// Grid patterns for pSEO pages
const GRID_PATTERNS = {
  services: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4',
  testimonials: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  provinces: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3',
  stats: 'grid grid-cols-2 md:grid-cols-4 gap-4',
  faq: 'grid grid-cols-1 gap-2 max-w-3xl',
}
```

---

## §5. Accessibility Standards (WCAG 2.1 AA)

### 5.1 Color Contrast Requirements

| Combination | Ratio | Requirement |
|-------------|-------|-------------|
| White text on `emergency-red` | 5.4:1 | ✅ AA |
| White text on `trust-blue` | 9.1:1 | ✅ AAA |
| `gray-950` on white | 18.5:1 | ✅ AAA |
| `trust-blue-light` on white | 4.6:1 | ✅ AA (large text) |
| `gray-600` on white | 5.9:1 | ✅ AA |

**RULE**: Never use `accent-orange` as text on white backgrounds (3.1:1 ratio — fails AA).

### 5.2 Touch Target Requirements

```typescript
// Minimum touch targets — WCAG 2.5.5 (AAA) / WCAG 2.5.8 (AA in 2.2)
const TOUCH_TARGETS = {
  button: 'min-h-[48px] min-w-[48px]',       // Primary CTAs
  link: 'min-h-[44px] inline-flex items-center', // Navigation links
  checkbox: 'w-5 h-5',                          // Form controls
  iconButton: 'p-3 min-h-[48px] min-w-[48px]', // Icon-only buttons
}
```

### 5.3 Focus Management

```css
/* Consistent focus ring — override browser defaults */
:focus-visible {
  outline: 2px solid var(--color-trust-blue);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Emergency CTAs get a red focus ring */
.focus-emergency:focus-visible {
  outline-color: var(--color-emergency-red);
}
```

### 5.4 Motion & Animation

```css
/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }

  .animate-pulse,
  .animate-bounce,
  .animate-spin {
    animation: none !important;
  }
}
```

### 5.5 Semantic HTML Mandates

```typescript
// ✅ CORRECT: Semantic landmark regions
<header>
  <nav aria-label="Navigation principale">...</nav>
</header>
<main id="main-content">
  <article>
    <section aria-labelledby="services-heading">
      <h2 id="services-heading">Nos services</h2>
    </section>
  </article>
</main>
<aside aria-label="Formulaire de contact">...</aside>
<footer>...</footer>

// ❌ BANNED: div soup
<div class="header">
  <div class="nav">
    <div class="nav-item">Services</div>
  </div>
</div>
```

### 5.6 ARIA Requirements

```typescript
// Required ARIA on all interactive elements
// Phone numbers as links
<a href="tel:+3247512345" aria-label="Appeler le 0475 12 34 56">
  0475 12 34 56
</a>

// Form labels — visible labels only, no aria-label replacing <label>
<label htmlFor="phone-input" className="block text-sm font-medium text-gray-700">
  Téléphone <span aria-hidden="true">*</span>
  <span className="sr-only">(obligatoire)</span>
</label>
<input id="phone-input" type="tel" name="phone" required aria-required="true" />

// Error states
<input
  id="email-input"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && (
  <p id="email-error" role="alert" className="text-red-600 text-sm mt-1">
    {errorMessage}
  </p>
)}
```

---

## §6. Responsive Design Breakpoints

```
Mobile first — target 375px minimum viewport width
sm:  640px   Landscape phones
md:  768px   Tablets
lg:  1024px  Desktop
xl:  1280px  Large desktop
2xl: 1536px  Wide screens
```

### 6.1 Mobile-First Component Examples

```typescript
// Hero section — mobile-first responsive
<section className="
  pt-8 pb-12             /* mobile */
  md:pt-16 md:pb-20     /* tablet */
  lg:pt-20 lg:pb-24     /* desktop */
  bg-gray-50
">
  <div className="container-default">
    <div className="
      flex flex-col gap-6    /* mobile: stack */
      lg:flex-row lg:gap-12  /* desktop: side-by-side */
      lg:items-center
    ">
      <div className="lg:flex-1">
        <H1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Votre chauffage entre<br />
          <span className="text-emergency-red">de bonnes mains</span>
        </H1>
      </div>
      <div className="lg:flex-1 lg:flex lg:justify-end">
        {/* Hero image */}
      </div>
    </div>
  </div>
</section>
```

---

## §7. Dark Mode Policy

**Chauffagiste-Belga does NOT implement a dark mode** in v1.0. The trust-building visual strategy relies on consistent white/light backgrounds with emergency-red and trust-blue accents. Adding dark mode introduces contrast complexity with emergency signals.

Add `<meta name="color-scheme" content="light only">` to enforce this.

---

## §8. Brand Voice in UI Copy

| Situation | Tone | Example |
|-----------|------|---------|
| Hero headline | Confident, reassuring | "Votre chauffage entre de bonnes mains" |
| CTA buttons | Urgent, action-first | "Appeler maintenant" / "Demander un devis gratuit" |
| Trust badges | Factual, specific | "4,8/5 sur Google · +1 200 avis" |
| Error messages | Direct, helpful, non-blaming | "Numéro invalide. Format: 0475 12 34 56" |
| Empty states | Redirect to action | "Aucun résultat pour ce code postal. Appelez-nous directement." |
| Availability | Specific, not vague | "Disponible 7j/7 · 24h/24 · Intervention ≤ 24h" |