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
| P1-01 | Create Supabase project (EU West region) | db-engineer | ⚪ Pending | |
| P1-02 | Run initial schema migration | db-engineer | ⚪ Pending | Depends on P1-01 |
| P1-03 | Import full ~337 commune CSV dataset | db-engineer | ⚪ Pending | Source: statbel.fgov.be |
| P1-04 | Verify all postal codes mapped correctly | db-engineer | ⚪ Pending | |
| P1-05 | Enable PostGIS extension | db-engineer | ⚪ Pending | |
| P1-06 | Create all indexes and verify with EXPLAIN | db-engineer | ⚪ Pending | |
| P1-07 | Apply RLS policies and test | db-engineer | ⚪ Pending | |
| P1-08 | Generate TypeScript types | db-engineer | ⚪ Pending | |
| P1-09 | Set up Netlify project + env vars | frontend-ui | ⚪ Pending | |
| P1-10 | Configure Netlify build settings | frontend-ui | ⚪ Pending | |
| P1-11 | Set up Resend domain (SPF/DKIM/DMARC) | Orchestrator | ⚪ Pending | |
| P1-12 | Create Sanity project and dataset | cms-content | ⚪ Pending | |

---

## Phase 2: Next.js Application Scaffold

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P2-01 | `npx create-next-app` with TypeScript + Tailwind v4 | frontend-ui | ⚪ Pending | |
| P2-02 | Configure `tsconfig.json` per rules | frontend-ui | ⚪ Pending | |
| P2-03 | Configure `tailwind.config.ts` with design tokens | frontend-ui | ⚪ Pending | |
| P2-04 | Create `app/globals.css` with `@theme` block | frontend-ui | ⚪ Pending | |
| P2-05 | Create `lib/env.ts` with Zod validation | frontend-ui | ⚪ Pending | |
| P2-06 | Create `lib/supabase/server.ts` | db-engineer | ⚪ Pending | |
| P2-07 | Create `lib/supabase/browser.ts` | db-engineer | ⚪ Pending | |
| P2-08 | Create `lib/supabase/admin.ts` | db-engineer | ⚪ Pending | |
| P2-09 | Create `middleware.ts` (normalization: lowercase, trailing slash) | pseo-architect | ⚪ Pending | See §9.3 in `02-url-architecture.md` |
| P2-10 | Create root `app/layout.tsx` | frontend-ui | ⚪ Pending | |
| P2-11 | Create `components/layout/Header.tsx` | frontend-ui | ⚪ Pending | |
| P2-12 | Create `components/layout/Footer.tsx` | frontend-ui | ⚪ Pending | |
| P2-13 | Create `components/layout/EmergencyBar.tsx` | frontend-ui | ⚪ Pending | |
| P2-14 | Create icon system `components/icons/index.tsx` | frontend-ui | ⚪ Pending | |
| P2-15 | Create `components/chat/ChatLazyWidget.tsx` (AI triage widget) | frontend-ui | ⚪ Pending | Deferred loading to preserve CWV |

---

## Phase 3: pSEO Core Pages

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P3-01 | `lib/supabase/geo.ts` — all query functions | db-engineer | ⚪ Pending | |
| P3-02 | `lib/seo/schema.ts` — all JSON-LD generators | pseo-architect | ⚪ Pending | |
| P3-03 | `lib/seo/spintax.ts` — resolver engine | pseo-architect | ⚪ Pending | |
| P3-04 | `lib/seo/slugs.ts` — slug generation | pseo-architect | ⚪ Pending | |
| P3-05 | `lib/seo/meta.ts` — meta title/description templates | pseo-architect | ⚪ Pending | |
| P3-06 | `docs/seo/02-spintax-matrix.json` — all blocks | cms-content | ⚪ Pending | Need 5+ blocks per service |
| P3-07 | `app/chauffagiste-[commune]/page.tsx` | frontend-ui | ⚪ Pending | |
| P3-08 | `components/sections/HeroSection.tsx` | frontend-ui | ⚪ Pending | |
| P3-09 | `components/sections/ServicesGrid.tsx` | frontend-ui | ⚪ Pending | |
| P3-10 | `components/sections/TestimonialsSection.tsx` | frontend-ui | ⚪ Pending | |
| P3-11 | `components/sections/FAQSection.tsx` | frontend-ui | ⚪ Pending | |
| P3-12 | `components/sections/NearbyCommunes.tsx` | frontend-ui | ⚪ Pending | |
| P3-13 | `components/seo/JsonLd.tsx` | pseo-architect | ⚪ Pending | |
| P3-14 | `components/seo/Breadcrumb.tsx` | pseo-architect | ⚪ Pending | |
| P3-15 | `app/sitemap.ts` — Dynamic XML sitemap | pseo-architect | ⚪ Pending | Single sitemap for ~337 communes + services |
| P3-16 | `app/robots.ts` | pseo-architect | ⚪ Pending | |
| P3-17 | Validate commune pages with Google Rich Results | pseo-architect | ⚪ Pending | |

---

## Phase 4: Lead Capture & Conversion

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P4-01 | `app/actions/submit-lead.ts` Server Action | frontend-ui | ⚪ Pending | |
| P4-02 | `lib/validation/belgian-postal.ts` | frontend-ui | ⚪ Pending | |
| P4-03 | `components/forms/LeadForm.tsx` | frontend-ui | ⚪ Pending | |
| P4-04 | `components/forms/PostalLookup.tsx` | frontend-ui | ⚪ Pending | |
| P4-05 | `app/actions/lookup-postal.ts` | frontend-ui | ⚪ Pending | |
| P4-06 | `lib/resend/client.ts` | frontend-ui | ⚪ Pending | |
| P4-07 | `lib/resend/templates/` — email templates | frontend-ui | ⚪ Pending | |
| P4-08 | `lib/resend/notifications.ts` | frontend-ui | ⚪ Pending | |
| P4-09 | `app/(funnel)/devis/page.tsx` | frontend-ui | ⚪ Pending | |
| P4-10 | `app/(funnel)/merci/page.tsx` | frontend-ui | ⚪ Pending | |
| P4-11 | E2E test: form → Supabase → Resend | Orchestrator | ⚪ Pending | |
| P4-12 | Rate limiting implementation | frontend-ui | ⚪ Pending | |
| P4-13 | GDPR cookie banner | frontend-ui | ⚪ Pending | |
| P4-14 | `app/api/chat/route.ts` Netlify Edge streaming handler | frontend-ui | ⚪ Pending | Gas safety intercept + AI triage |

---

## Phase 5: Content & Blog

| ID | Task | Agent | Status | Notes |
|----|------|-------|--------|-------|
| P5-01 | Sanity schema: post, author, category, faqItem | cms-content | ⚪ Pending | |
| P5-02 | Sanity Studio structure config | cms-content | ⚪ Pending | |
| P5-03 | `lib/sanity/client.ts` | cms-content | ⚪ Pending | |
| P5-04 | `lib/sanity/queries.ts` — all GROQ queries | cms-content | ⚪ Pending | |
| P5-05 | `app/(marketing)/conseils/page.tsx` | frontend-ui | ⚪ Pending | |
| P5-06 | `app/(marketing)/conseils/[slug]/page.tsx` | frontend-ui | ⚪ Pending | |
| P5-07 | `app/api/revalidate/route.ts` — ISR webhook | cms-content | ⚪ Pending | |
| P5-08 | Sanity webhook configured in Studio dashboard | cms-content | ⚪ Pending | |
| P5-09 | Seed 5 initial blog posts | cms-content | ⚪ Pending | |

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