# 02 — URL Architecture
# Canonical Rules, Lowercase Normalization & Redirect Strategy
# Project: Chauffagiste-Belga

---

## §1. URL Design Principles

All URLs on Chauffagiste-Belga follow these immutable principles:

1. **Lowercase only** — zero uppercase characters anywhere in the path
2. **No trailing slashes** — enforced via middleware 301 redirect
3. **Hyphen-delimited** — spaces, underscores, and special chars → hyphens
4. **Diacritics stripped** — `é` → `e`, `è` → `e`, `ç` → `c`, etc.
5. **No URL parameters for pSEO content** — all content at clean paths
6. **Canonical tag on every page** — always pointing to self (absolute URL)
7. **Flat URL root structure** — zero locale subdirectories (`/chauffagiste-[commune]` directly under root domain)
8. **No hreflang markup** — strictly single-language website targeting Belgium in French (`fr-BE`). Redundant hreflang is omitted per Google guidelines; self-referencing canonicals are standard

---

## §2. URL Pattern Registry

### 2.1 Core URL Patterns (100% French Flat URLs)

| Page Type | Production Pattern | Example URL |
|-----------|-------------------|-------------|
| Homepage | `/` | `https://chauffagiste-belga.be/` |
| Services hub | `/nos-services` | `https://chauffagiste-belga.be/nos-services` |
| Service category | `/nos-services/[service]` | `https://chauffagiste-belga.be/nos-services/entretien-chaudiere` |
| Commune page | `/chauffagiste-[commune]` | `https://chauffagiste-belga.be/chauffagiste-bruxelles` |
| Blog hub | `/conseils` | `https://chauffagiste-belga.be/conseils` |
| Blog post | `/conseils/[slug]` | `https://chauffagiste-belga.be/conseils/entretien-chaudiere-gaz-obligations` |
| Quote funnel | `/devis` | `https://chauffagiste-belga.be/devis` |
| Emergency | `/urgence` | `https://chauffagiste-belga.be/urgence` |
| Thank you | `/merci` | `https://chauffagiste-belga.be/merci` |
| About | `/a-propos` | `https://chauffagiste-belga.be/a-propos` |
| Contact | `/contact` | `https://chauffagiste-belga.be/contact` |
| Privacy | `/confidentialite` | `https://chauffagiste-belga.be/confidentialite` |
| Legal | `/mentions-legales` | `https://chauffagiste-belga.be/mentions-legales` |
| 404 | `not-found.tsx` | Auto-handled by Next.js |

> **Rationale**: Flat URLs at the root domain maximize link equity flow, eliminate directory nesting, and produce clean, memorable, keyword-dense URLs for Belgian local search queries.

### 2.2 Normalization & Legacy Redirect Rules

| Request | Middleware Action |
|---------|------------------|
| `/fr` or `/fr/` | 301 → `/` |
| `/nl` or `/nl/` | 301 → `/` |
| `/fr/:path*` | 301 → `/:path*` |
| `/nl/:path*` | 301 → `/:path*` |
| Uppercase characters | 301 → lowercase |
| Trailing slashes (except `/`) | 301 → without trailing slash |

---

## §3. Slug Generation Rules

### 3.1 Commune Slug Algorithm

```typescript
// lib/seo/slugs.ts
export function normalizeToSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')                        // Decompose unicode (é → e + ́)
    .replace(/[\u0300-\u036f]/g, '')         // Strip combining diacritical marks
    .replace(/[''ʼ]/g, '')                  // Remove apostrophes (Saint'Josse → SaintJosse)
    .replace(/[^a-z0-9\s-]/g, '')           // Remove non-alphanumeric (except space/hyphen)
    .replace(/\s+/g, '-')                   // Spaces → hyphens
    .replace(/-+/g, '-')                    // Collapse multiple hyphens
    .replace(/^-|-$/g, '')                  // Trim leading/trailing hyphens
}
```

### 3.2 Diacritic Mapping (Belgian French)

| Original | Slug | Communes Affected |
|----------|------|------------------|
| `é`, `è`, `ê`, `ë` | `e` | Liège → `liege`, Etterbeek → `etterbeek` |
| `à`, `â`, `ä` | `a` | — |
| `ù`, `û`, `ü` | `u` | — |
| `ô`, `ö` | `o` | — |
| `î`, `ï` | `i` | — |
| `ç` | `c` | — |
| `œ` | `oe` | — |
| `'` (apostrophe) | `` (removed) | Saint-Josse-ten-Noode → `saint-josse-ten-noode` |

### 3.3 Conflict Resolution

Some communes produce identical slugs after normalization. These require manual disambiguation:

| Commune FR | Auto-slug | Problem | Resolved slug |
|-----------|-----------|---------|--------------|
| Liège (city) | `liege` | Same as province slug | `liege-ville` |
| Namur (city) | `namur` | Same as province slug | `namur-ville` |
| Anvers (city) | `anvers` | Same as province slug | `anvers-ville` |
| Gand | `gand` | Same as arrondissement | `gand` (no conflict in practice) |

**Rule**: When a commune slug conflicts with a province slug, append `-ville`. Store the resolved slug in `communes.slug_fr` — the database is the single source of truth.

---

## §4. Canonical Tag Implementation

### 4.1 Canonical on Every Page (Non-Negotiable)

```typescript
// Pattern in generateMetadata() — applies to ALL page types
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://chauffagiste-belga.be${buildCanonicalPath(params)}`,
    },
    // ... rest of metadata
  }
}
```

### 4.2 Canonical Path Builders

```typescript
// lib/seo/canonical.ts
export const canonicalPaths = {
  home: () =>
    `https://chauffagiste-belga.be/`,

  commune: (slug: string) =>
    `https://chauffagiste-belga.be/chauffagiste-${slug}`,

  blog: (slug: string) =>
    `https://chauffagiste-belga.be/conseils/${slug}`,

  service: (slug: string) =>
    `https://chauffagiste-belga.be/nos-services/${slug}`,
}
```

### 4.3 Self-Referencing Canonical Rule

All pSEO pages use **self-referencing canonicals** (canonical = current URL). The only exceptions:

| Scenario | Canonical Points To |
|---------|-------------------|
| Paginated results (if used) | First page only |
| Print stylesheet version | Same URL (no print-specific URLs) |
| UTM-tracked landing URL | Clean URL without UTM params |
| AMP (not used in this project) | N/A |

---

## §5. Redirect Strategy

### 5.1 Redirect Priority Hierarchy

```
1. Supabase redirect table (permanent, database-driven)
2. next.config.ts redirects (static patterns)
3. Middleware redirects (normalization — lowercase, trailing slash)
```

### 5.2 Middleware Normalization Redirects

These are applied to **every request** via `middleware.ts`:

```typescript
// middleware.ts — URL normalization (301 permanent)
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Rule 1: Enforce lowercase
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url, { status: 301 })
  }

  // Rule 2: Remove trailing slash (except homepage)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}
```

### 5.3 Static Redirect Patterns (`next.config.ts`)

```typescript
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      // Legacy URL patterns from any previous site
      { source: '/chauffagiste/:commune/depannage', destination: '/depannage-chaudiere-:commune', permanent: true },
      { source: '/services/:service', destination: '/nos-services/:service', permanent: true },
      { source: '/blog/:slug', destination: '/conseils/:slug', permanent: true },
      // www → non-www (handled at DNS/Netlify level, but belt-and-suspenders)
      { source: '/:path*', has: [{ type: 'host', value: 'www.chauffagiste-belga.be' }],
        destination: 'https://chauffagiste-belga.be/:path*', permanent: true },
    ]
  },
}
```

### 5.4 Database-Driven Redirect Table

For bulk commune URL changes (e.g., slug corrections after launch):

```sql
-- supabase/migrations/20260101000010_create_redirects.sql
CREATE TABLE redirects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path   TEXT NOT NULL UNIQUE,  -- e.g., '/old-commune-slug'
  to_path     TEXT NOT NULL,          -- e.g., '/new-commune-slug'
  status_code SMALLINT NOT NULL DEFAULT 301,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  reason      TEXT,                   -- Why this redirect exists
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_redirects_from_path ON redirects(from_path) WHERE is_active = true;
```

```typescript
// middleware.ts — check redirect table
const redirect = await fetchRedirect(pathname) // Uses edge-cached query
if (redirect) {
  return NextResponse.redirect(
    new URL(redirect.to_path, request.url),
    { status: redirect.status_code }
  )
}
```

---

## §6. hreflang Implementation Policy

> **Single-Language Website Policy**:
> Chauffagiste-Belga is a **100% French website exclusively targeting Belgium** (`fr-BE`).
> Per official Google Search Central guidelines:
> - Websites operating in a single language for a single country do **not** require `hreflang` tags.
> - Emitting self-referencing `hreflang="fr-BE"` on a single-language site provides zero indexing benefit and creates unnecessary DOM/header weight.
> - Self-referencing **Canonical tags** (`rel="canonical"`) on every page are fully sufficient to define indexable endpoints.
> - In `generateMetadata()`, the `alternates.languages` property is omitted.

---

## §7. URL Forbidden Patterns

The following URL patterns are **explicitly banned** and must trigger automated alerts if detected:

```
❌ /Chauffagiste-Bruxelles              (uppercase)
❌ /chauffagiste-bruxelles/             (trailing slash)
❌ /chauffagiste_bruxelles              (underscore)
❌ /chauffagiste-bruxelles?utm=x        (UTM in canonical)
❌ /chauffagiste-bruxelles.html         (file extension)
❌ /fr/chauffagiste-bruxelles           (locale prefix forbidden — 301 to flat)
❌ /nl/verwarmingstechnicus-brussel     (Dutch locale forbidden — 301 to /)
❌ /?lang=fr                            (query-param locale — never use)
❌ fr.chauffagiste-belga.be             (subdomain locale — never use)
❌ /chauffagiste/bruxelles              (slash between prefix and commune)
❌ /chauffagiste-bruxelles-capitale     (province used as commune slug)
```

---

## §8. URL Uniqueness Guarantee

Every generated URL must be unique. Enforced at three levels:

1. **Database**: `UNIQUE` constraint on `communes.slug_fr`, `pseo_pages.full_slug`
2. **Build-time**: `generateStaticParams()` deduplicates before returning
3. **Monitoring**: `pseo_pages` table `full_slug` collisions trigger build failure

```sql
-- Verify no duplicate slugs before any deployment
SELECT full_slug, COUNT(*) 
FROM pseo_pages 
GROUP BY full_slug 
HAV COUNT(*) > 1;
-- Must return 0 rows
```

---

## §9. Next.js App Router Directory Architecture

### 9.1 App Directory Structure (Flat Root Routes)

```
app/
├── layout.tsx                      ← Root layout (sets lang="fr-BE", loads Outfit/Inter fonts)
├── page.tsx                        ← Homepage
├── chauffagiste-[commune]/
│   └── page.tsx                    ← /chauffagiste-liege
├── nos-services/
│   ├── page.tsx                    ← /nos-services
│   └── [service]/page.tsx          ← /nos-services/entretien-chaudiere
├── conseils/
│   ├── page.tsx                    ← /conseils
│   └── [slug]/page.tsx             ← /conseils/entretien-chaudiere-gaz-obligations
├── devis/
│   └── page.tsx                    ← /devis
├── urgence/
│   └── page.tsx                    ← /urgence
├── merci/
│   └── page.tsx                    ← /merci
├── sitemap.ts                      ← Dynamic XML sitemap (~337 communes + services)
├── robots.ts                       ← robots.txt configuration
└── not-found.tsx                   ← 404 page
```

### 9.2 Static Generation in generateStaticParams

```typescript
// app/chauffagiste-[commune]/page.tsx
import { getAllCommuneSlugs } from '@/lib/supabase/geo'

export async function generateStaticParams() {
  const slugs = await getAllCommuneSlugs() // { slugFr: string }[]
  return slugs.map((c) => ({
    commune: c.slugFr,
  }))
}
```

### 9.3 Middleware Normalization

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Strip legacy /fr or /nl prefixes (301 permanent)
  if (/^\/(fr|nl)(\/|$)/.test(pathname)) {
    const cleanPath = pathname.replace(/^\/(fr|nl)/, '') || '/'
    const url = request.nextUrl.clone()
    url.pathname = cleanPath
    return NextResponse.redirect(url, { status: 301 })
  }

  // Enforce lowercase
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url, { status: 301 })
  }

  // Remove trailing slash (except homepage)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}
```
