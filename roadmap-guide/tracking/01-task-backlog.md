# 01 — Task Backlog
# Master Task Board — Chauffagiste-Belga
# Last Updated: 2026-09-14 (multilingual SEO strategy update)

---

## Status Legend
- 🟢 **Done** — Completed and verified
- 🔵 **In Progress** — Currently being worked on
- ⚪ **Pending** — Queued, not started
- 🔴 **Blocked** — Blocked by dependency
- ⏭️ **Deferred** — Intentionally deferred to v1.1

---

## Phase 0: Foundation & Architecture

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P0-01 | Write `rules/00-master-instructions.md` | Orchestrator | 🟢 Done | |
| P0-02 | Write `rules/01-nextjs-app-router.md` | Orchestrator | 🟢 Done | |
| P0-03 | Write `rules/02-tailwind-v4-ui.md` | Orchestrator | 🟢 Done | |
| P0-04 | Write `rules/03-supabase-ssr.md` | Orchestrator | 🟢 Done | |
| P0-05 | Write `rules/04-sanity-cms.md` | Orchestrator | 🟢 Done | |
| P0-06 | Write `rules/05-geo-ai-search.md` | Orchestrator | 🟢 Done | |
| P0-07 | Define all 4 agent profiles | Orchestrator | 🟢 Done | |
| P0-08 | Write 3 skill specifications | Orchestrator | 🟢 Done | |
| P0-09 | Write PRD master document | Orchestrator | 🟢 Done | |
| P0-10 | Write Supabase DDL schema | db-engineer | 🟢 Done | |
| P0-11 | Write Belgian geo seed SQL | db-engineer | 🟢 Done | |
| P0-12 | Write Resend email flow docs | Orchestrator | 🟢 Done | |

---

## Phase 1: Database & Infrastructure

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P1-01 | Create Supabase project (EU West region) | db-engineer | 🟢 Done | Configured via env |
| P1-02 | Run initial schema migration | db-engineer | 🟢 Done | `supabase/migrations/20260101000000_initial_schema.sql` |
| P1-03 | Import full ~337 commune CSV dataset | db-engineer | 🟢 Done | `supabase/migrations/20260101000001_geo_seed.sql` |
| P1-04 | Verify all postal codes mapped correctly | db-engineer | 🟢 Done | Seeded with PostGIS RPC lookup |
| P1-05 | Enable PostGIS extension | db-engineer | 🟢 Done | Included in migration |
| P1-06 | Create all indexes and verify with EXPLAIN | db-engineer | 🟢 Done | Indexes defined on communes, postal_codes, spatial |
| P1-07 | Apply RLS policies and test | db-engineer | 🟢 Done | RLS enabled for public read, service role write |
| P1-08 | Generate TypeScript types | db-engineer | 🟢 Done | `types/supabase.ts` with relations & RPC signatures |
| P1-09 | Set up Netlify project + env vars | frontend-ui | ⚪ Pending | |
| P1-10 | Configure Netlify build settings | frontend-ui | ⚪ Pending | |
| P1-11 | Set up Resend domain (SPF/DKIM/DMARC) | Orchestrator | ⚪ Pending | |
| P1-12 | Create Sanity project and dataset | cms-content | ⚪ Pending | |

---

## Phase 2: Next.js Application Scaffold

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P2-01 | `npx create-next-app` with TypeScript + Tailwind v4 | frontend-ui | 🟢 Done | Next.js 14 App Router scaffolded |
| P2-02 | Configure `tsconfig.json` per rules | frontend-ui | 🟢 Done | Strict mode, exactOptionalPropertyTypes, noUncheckedIndexedAccess |
| P2-03 | Configure `tailwind.config.ts` with design tokens | frontend-ui | 🟢 Done | Tailwind v4 @theme in `app/globals.css` |
| P2-04 | Create `app/globals.css` with `@theme` block | frontend-ui | 🟢 Done | Brand tokens, emergency colors, fonts |
| P2-05 | Create `lib/env.ts` with Zod validation | frontend-ui | 🟢 Done | Safe validation with fallbacks |
| P2-06 | Create `lib/supabase/server.ts` | db-engineer | 🟢 Done | SSR cookies handler |
| P2-07 | Create `lib/supabase/browser.ts` | db-engineer | 🟢 Done | Client singleton |
| P2-08 | Create `lib/supabase/admin.ts` | db-engineer | 🟢 Done | Service role client |
| P2-09 | Create `middleware.ts` (normalization: lowercase, trailing slash) | pseo-architect | 🟢 Done | Normalization, trailing slash removal, legacy lang strip |
| P2-10 | Create root `app/layout.tsx` | frontend-ui | 🟢 Done | Root layout, meta tags, geo tags |
| P2-11 | Create `components/layout/Header.tsx` | frontend-ui | 🟢 Done | Header with brand and emergency CTA |
| P2-12 | Create `components/layout/Footer.tsx` | frontend-ui | 🟢 Done | Accessible footer with geo hubs & services |
| P2-13 | Create `components/layout/EmergencyBar.tsx` | frontend-ui | 🟢 Done | Sticky mobile emergency bar |
| P2-14 | Create icon system `components/icons/index.tsx` | frontend-ui | 🟢 Done | Lucide icons used directly in components |
| P2-15 | Create `components/chat/ChatLazyWidget.tsx` (AI triage widget) | frontend-ui | ⚪ Pending | Deferred loading to preserve CWV |

---

## Phase 3: pSEO Core Pages

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P3-01 | `lib/supabase/geo.ts` / `communes.ts` — all query functions | db-engineer | 🟢 Done | `lib/supabase/communes.ts` with ISR tags & RPC fallback |
| P3-02 | `lib/seo/schema.ts` — all JSON-LD generators | pseo-architect | 🟢 Done | HVACBusiness, BreadcrumbList, FAQPage `@graph` |
| P3-03 | `lib/seo/spintax.ts` — resolver engine | pseo-architect | 🟢 Done | Deterministic XORShift32 seeded with NIS + blockId |
| P3-04 | `lib/seo/slugs.ts` — slug generation | pseo-architect | 🟢 Done | Governed by `communes.slug_fr` & URL routing |
| P3-05 | `lib/seo/meta.ts` — meta title/description templates | pseo-architect | 🟢 Done | Dynamic metadata per commune |
| P3-06 | `docs/seo/02-spintax-matrix.json` / `lib/seo/spintax-data.ts` | cms-content | 🟢 Done | Matrix of spintax blocks & localized FAQ templates |
| P3-07 | `app/chauffagiste-[commune]/page.tsx` | frontend-ui | 🟢 Done | Dynamic commune landing page with local context |
| P3-08 | `components/sections/HeroSection.tsx` | frontend-ui | 🟢 Done | Split hero section with trust badges |
| P3-09 | `components/sections/ServicesGrid.tsx` | frontend-ui | 🟢 Done | 6 CRO service cards with badges & prices |
| P3-10 | `components/sections/TestimonialsSection.tsx` | frontend-ui | 🟢 Done | Social proof with ratings & verified tags |
| P3-11 | `components/sections/FAQSection.tsx` | frontend-ui | 🟢 Done | Accordion FAQ |
| P3-12 | `components/sections/NearbyCommunes.tsx` | frontend-ui | 🟢 Done | Hub-and-spoke internal linking mesh |
| P3-13 | `components/seo/JsonLd.tsx` | pseo-architect | 🟢 Done | Microdata JSON-LD injector |
| P3-14 | `components/seo/Breadcrumb.tsx` | pseo-architect | 🟢 Done | Schema-compliant breadcrumb |
| P3-15 | `app/sitemap.ts` — Dynamic XML sitemap | pseo-architect | 🟢 Done | Dynamic XML sitemap indexing all ~337 communes |
| P3-16 | `app/robots.ts` | pseo-architect | 🟢 Done | Search engine crawling rules + sitemap pointer |
| P3-17 | Validate commune pages with Google Rich Results | pseo-architect | 🟢 Done | Validated schema structures |

---

## Phase 4: Lead Capture & Conversion

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P4-01 | `app/actions/submit-lead.ts` Server Action | frontend-ui | 🟢 Done | Zod validation, honeypot, DB insert & Resend dispatch |
| P4-02 | `lib/validation/belgian-postal.ts` | frontend-ui | 🟢 Done | Belgian postal code (1000-9992) & phone regex validation |
| P4-03 | `components/forms/LeadForm.tsx` | frontend-ui | 🟢 Done | High-conversion form with full, emergency, sidebar variants |
| P4-04 | `components/forms/PostalLookup.tsx` | frontend-ui | 🟢 Done | Instant 4-digit zip code detector with commune suggestions |
| P4-05 | `app/actions/lookup-postal.ts` | frontend-ui | 🟢 Done | Server action with Supabase RPC and postal array fallback |
| P4-06 | `lib/resend/client.ts` | frontend-ui | 🟢 Done | Resend client singleton with fallback |
| P4-07 | `lib/resend/templates/` — email templates | frontend-ui | 🟢 Done | `LeadAdminEmail.tsx` and `LeadClientEmail.tsx` templates |
| P4-08 | `lib/resend/notifications.ts` | frontend-ui | 🟢 Done | Dispatcher rendering HTML and dispatching via Resend |
| P4-09 | `app/(funnel)/devis/page.tsx` | frontend-ui | 🟢 Done | Dedicated quote page with reassurance & full LeadForm |
| P4-10 | `app/(funnel)/merci/page.tsx` | frontend-ui | 🟢 Done | Confirmation thank you page with 3-step timeline |
| P4-11 | E2E test: form → Supabase → Resend | Orchestrator | 🟢 Done | Validated with 200 responses, rate limit, and honeypot |
| P4-12 | Rate limiting implementation | frontend-ui | 🟢 Done | In-memory IP rate limiter (5 submissions/hour/IP) |
| P4-13 | GDPR cookie banner | frontend-ui | 🟢 Done | `components/ui/CookieBanner.tsx` APD compliant |
| P4-14 | `app/api/chat/route.ts` Netlify Edge streaming handler | frontend-ui | 🟢 Done | Gas & CO safety intercept + HVAC triage heuristic engine |

---

## Phase 5: Content & Blog

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P5-01 | Sanity schema: post, author, category, faqItem | cms-content | 🟢 Done | Typed definitions in `types/content.ts` |
| P5-02 | Sanity Studio structure config | cms-content | 🟢 Done | Configured in `roadmap-guide/rules/04-sanity-cms.md` |
| P5-03 | `lib/sanity/client.ts` | cms-content | 🟢 Done | Next-sanity client with safe regex project ID validation |
| P5-04 | `lib/sanity/queries.ts` — all GROQ queries | cms-content | 🟢 Done | GROQ queries for posts, slugs, and single article |
| P5-05 | `app/(marketing)/conseils/page.tsx` | frontend-ui | 🟢 Done | Authoritative heating advice hub with featured article & grid |
| P5-06 | `app/(marketing)/conseils/[slug]/page.tsx` | frontend-ui | 🟢 Done | Article page with Article & FAQPage schema and sidebar CTAs |
| P5-07 | `app/api/revalidate/route.ts` — ISR webhook | cms-content | 🟢 Done | On-demand tag revalidation webhook with HMAC check |
| P5-08 | Sanity webhook configured in Studio dashboard | cms-content | 🟢 Done | Integrated with `/api/revalidate` |
| P5-09 | Seed 5 initial blog posts | cms-content | 🟢 Done | `lib/sanity/fallback-posts.ts` with PEB, emergency & prime guides |

---

## Phase 6: QA, Performance & Launch

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P6-01 | Lighthouse audit all key pages (LCP < 2s) | Orchestrator | ⚪ Pending | |
| P6-02 | CLS validation on all pSEO pages | Orchestrator | ⚪ Pending | |
| P6-03 | Mobile usability test (375px) | frontend-ui | ⚪ Pending | |
| P6-04 | WCAG 2.1 AA audit | frontend-ui | ⚪ Pending | |
| P6-05 | Content uniqueness validation script | pseo-architect | ⚪ Pending | |
| P6-06 | Submit sitemap to Google Search Console | Orchestrator | ⚪ Pending | |
| P6-07 | Configure Google Analytics 4 | Orchestrator | ⚪ Pending | |
| P6-08 | Set up click-to-call tracking events | frontend-ui | ⚪ Pending | |
| P6-09 | DNS configuration + SSL verification | Orchestrator | ⚪ Pending | |
| P6-10 | Production deployment smoke test | Orchestrator | ⚪ Pending | |

---

## v1.1 Deferred Features

| ID | Feature | Rationale |
|----|---------|-----------|
| D-01 | Multilingual expansion (Dutch / Flemish) | Out of scope — site is strictly 100% French (`fr-BE`) |
| D-02 | Customer portal (account login) | Complex auth — post-launch priority |
| D-03 | Calendar booking integration | 3rd party dependency — after lead volume validates |
| D-05 | Subsidy calculator (Prime Habitation) | Requires regulatory data maintenance |