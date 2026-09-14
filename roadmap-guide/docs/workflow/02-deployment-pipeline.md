# 02 — Deployment Pipeline
# Netlify Config, ISR Revalidation Triggers & Environment Management
# Project: Chauffagiste-Belga

---

## §1. Hosting Architecture

```
GitHub (source)
    ↓ push to main
Netlify (build & deploy)
    ↓
Next.js App Router on Netlify
    ├── Static pages (ISR)      ← ~4,700 pSEO pages, revalidate: 86400
    ├── Dynamic API routes      ← /api/* Server Actions
    └── Edge Middleware         ← URL normalization, redirects, rate limiting
```

### 1.1 Netlify Project Setup

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `20.x` |
| Runtime | `@netlify/plugin-nextjs` |
| Auto-deploy branches | `main` (production), `staging` (preview) |
| Deploy previews | Enabled for all PRs |

### 1.2 Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Headers for all pages
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(self)"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"

# Cache static assets aggressively
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Cache sitemap and robots for 1 hour
[[headers]]
  for = "/sitemap*.xml"
  [headers.values]
    Cache-Control = "public, max-age=3600, s-maxage=3600"

[[headers]]
  for = "/robots.txt"
  [headers.values]
    Cache-Control = "public, max-age=86400"

# Edge function for URL normalization
[[edge_functions]]
  function = "url-normalizer"
  path = "/*"
```

---

## §2. ISR (Incremental Static Regeneration) Strategy

### 2.1 Revalidation Times Per Page Type

| Page Type | `revalidate` | Rationale |
|-----------|-------------|-----------|
| Commune pages (`/chauffagiste-[slug]`) | `86400` (24h) | Stable — changes only via DB update |
| Service+Commune pages | `86400` (24h) | Same — long-tail, rarely edited |
| Province hub pages | `43200` (12h) | Slightly more dynamic (testimonials) |
| Homepage | `3600` (1h) | Blog preview, KPIs, testimonials change often |
| Blog posts | `300` (5min) | Sanity drafts → publish should be fast |
| `/nos-services/[service]` | `43200` (12h) | Stable content |
| `/devis`, `/urgence` | `false` (static) | No dynamic content — fully static |
| `/merci` | `false` (static) | No dynamic content |

### 2.2 ISR Revalidation in Next.js

```typescript
// app/chauffagiste-[commune]/page.tsx
export const revalidate = 86400 // 24 hours

// Or for on-demand revalidation via route handler:
// This page will also be invalidated when Sanity publishes a testimonial
// or when the Supabase commune record is updated
```

### 2.3 On-Demand ISR Triggers

On-demand revalidation bypasses the timer and regenerates pages immediately:

| Trigger Source | Webhook Endpoint | Pages Invalidated |
|---------------|-----------------|-------------------|
| Sanity (post published) | `POST /api/revalidate/sanity` | Blog post page + blog hub |
| Sanity (testimonial approved) | `POST /api/revalidate/sanity` | Homepage + relevant commune |
| Supabase (commune updated) | `POST /api/revalidate/commune` | Commune page + all service+commune pages |
| Supabase (review count updated) | `POST /api/revalidate/ratings` | Homepage + all affected pages |
| Manual admin trigger | `POST /api/revalidate/all` | Full site (use sparingly — expensive) |

```typescript
// app/api/revalidate/sanity/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = request.headers.get('x-webhook-secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body: unknown = await request.json()
  // Type narrowing via Zod
  const parsed = sanityWebhookSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { type, slug } = parsed.data

  if (type === 'post') {
    revalidatePath(`/conseils/${slug}`)
    revalidatePath('/conseils')
    revalidateTag('blog')
  }

  if (type === 'testimonial') {
    revalidatePath('/')
    revalidateTag('testimonials')
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
```

---

## §3. Environment Management

### 3.1 Environment Tiers

| Tier | Branch | Domain | Supabase Project | Purpose |
|------|--------|--------|-----------------|---------|
| Local | Any | `localhost:3000` | Local or staging DB | Development |
| Preview | PR branch | `[deploy-id].netlify.app` | Staging DB | PR review |
| Staging | `staging` | `staging.chauffagiste-belga.be` | Staging DB | QA / client review |
| Production | `main` | `chauffagiste-belga.be` | Production DB | Live site |

### 3.2 Netlify Environment Variables

Set in Netlify UI under **Site configuration → Environment variables**:

| Variable | Local | Staging | Production |
|---------|-------|---------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Local URL | Staging project URL | Prod project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Local anon key | Staging anon key | Prod anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Local role key | Staging role key | Prod role key |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Same for all | Same for all | Same for all |
| `NEXT_PUBLIC_SANITY_DATASET` | `development` | `staging` | `production` |
| `SANITY_API_TOKEN` | Dev token | Staging token | Prod token |
| `RESEND_API_KEY` | Sandbox key | Test key | Live key |
| `REVALIDATION_SECRET` | `dev-secret-123` | Random 32-char | Random 32-char |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Empty (disabled) | Empty (disabled) | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://staging...` | `https://chauffagiste-belga.be` |

### 3.3 Secrets Management Rules

```
❌ NEVER commit .env.local to Git
❌ NEVER commit .env (any variant) to Git
❌ NEVER hardcode API keys in source code
❌ NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser
✅ All secrets managed in Netlify's encrypted env vars system
✅ Rotate REVALIDATION_SECRET every 90 days
✅ Use read-only DB tokens for Next.js server where possible
```

---

## §4. Database Migration Deployment

### 4.1 Supabase Migration Workflow

```bash
# 1. Create new migration locally
supabase migration new add_postal_codes_column

# 2. Edit the generated file in supabase/migrations/

# 3. Test locally
supabase db reset  # Applies all migrations from scratch

# 4. Push to staging
supabase db push --db-url=$STAGING_DB_URL

# 5. Verify on staging
# 6. Push to production (only after staging verified)
supabase db push --db-url=$PRODUCTION_DB_URL
```

### 4.2 Migration Naming Convention

```
supabase/migrations/YYYYMMDDHHMMSS_[description].sql

Examples:
20260101000001_create_communes_table.sql
20260101000002_create_leads_table.sql
20260115090000_add_postal_codes_column.sql
20260201000000_add_rls_policies.sql
```

---

## §5. Sitemap Generation & Submission

### 5.1 Sitemap Route Handler

```typescript
// app/sitemap.ts
import { createServerClient } from '@/lib/supabase/server'
import { MetadataRoute } from 'next'

export const revalidate = 43200 // 12 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient()
  const { data: communes } = await supabase
    .from('communes')
    .select('slug_fr, updated_at')
    .eq('is_active', true)

  const communeUrls = (communes ?? []).map((c) => ({
    url: `https://chauffagiste-belga.be/chauffagiste-${c.slug_fr}`,
    lastModified: c.updated_at,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Service+Commune URLs (generated from cross-product)
  const SERVICES = ['depannage-chaudiere', 'entretien-chaudiere', 'installation-chauffage',
    'reparation-chaudiere', 'pompe-chaleur', 'regulation-thermostat',
    'chauffage-sol', 'debouchage']

  const serviceUrls = (communes ?? []).flatMap((c) =>
    SERVICES.map((s) => ({
      url: `https://chauffagiste-belga.be/${s}-${c.slug_fr}`,
      lastModified: c.updated_at,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [
    { url: 'https://chauffagiste-belga.be', priority: 1.0, changeFrequency: 'daily' },
    { url: 'https://chauffagiste-belga.be/nos-services', priority: 0.9 },
    { url: 'https://chauffagiste-belga.be/zones-intervention', priority: 0.9 },
    { url: 'https://chauffagiste-belga.be/conseils', priority: 0.8 },
    ...communeUrls,
    ...serviceUrls,
  ]
}
```

### 5.2 Google Search Console Submission

After each major content deployment:
1. Ping sitemap: `https://www.google.com/ping?sitemap=https://chauffagiste-belga.be/sitemap.xml`
2. Log submission date in `tracking/04-seo-kpi-tracker.md`
3. Monitor "Indexed" vs "Discovered" ratio in GSC weekly

---

## §6. Deployment Verification Checklist

After every production deployment, verify:

```markdown
## Post-Deploy Verification
- [ ] Homepage loads at https://chauffagiste-belga.be
- [ ] Test commune page: /chauffagiste-bruxelles — H1 correct, breadcrumb visible
- [ ] Test service page: /depannage-chaudiere-bruxelles — JSON-LD present
- [ ] Sitemap accessible: /sitemap.xml — no 404
- [ ] Robots.txt accessible: /robots.txt — AI crawlers not blocked
- [ ] Phone number click works on mobile (tel: link)
- [ ] Lead form submits (test with real email)
- [ ] 404 page renders correctly for /non-existent-page
- [ ] Canonical URL correct on commune page (check page source)
- [ ] Google Rich Results Test passes for a commune page
- [ ] No console errors in browser DevTools
```
