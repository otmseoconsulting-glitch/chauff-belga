# 03 — Memory Context
# Persistent Project State for AI Agent Handoffs
# Project: Chauffagiste-Belga
# Last Updated: 2026-09-14 (multilingual SEO strategy update)

---

> **Purpose**: This file gives any new AI agent instant project context so they can continue work without re-reading all documentation. Update the "Current State" section at the end of every work session.

---

## §1. Project Identity

| Field | Value |
|-------|-------|
| Project name | Chauffagiste-Belga |
| Client | Belgian HVAC/Plumbing service business |
| Language | 100% French (`fr-BE`) |
| Domain | `chauffagiste-belga.be` |
| Project root | `d:/chauffagiste-belga/` (documentation only — Next.js app not yet scaffolded) |
| Repository | TBD — not yet initialized |

---

## §2. Tech Stack (Resolved — No Ambiguity)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 14+ |
| Language | TypeScript strict mode | 5.x |
| Styling | Tailwind CSS | v4 |
| Components | shadcn/ui | latest |
| Database | Supabase (PostgreSQL) | Latest |
| Auth | Supabase Auth + `@supabase/ssr` | 0.5+ |
| CMS | Sanity Studio | v3 |
| Email | Resend | v3+ |
| Hosting | Netlify | Latest plugin |
| Analytics | GA4 | — |

---

## §3. Critical Constraints (Enforce Always)

1. **Zero `any`** — TypeScript strict, use `unknown` + type guards
2. **Server components by default** — `'use client'` requires comment justification
3. **Zod on every external input** — API responses, form data, Sanity webhooks
4. **`generateMetadata()` on every page** — canonical + og + twitter required
5. **One `<h1>` per page** — enforced in code review
6. **Tailwind only** — no inline styles, no CSS-in-JS, no raw CSS modules
7. **Named exports only** — no default exports from component files
8. **Never placeholder/TODO code in production files**
9. **All SQL migrations in `supabase/migrations/`** — no ad-hoc schema changes
10. **Internal links obey silo rules** — no cross-province links at commune level
11. **Flat root URLs** — all pSEO URLs live directly at root (`/chauffagiste-[commune]`). No `/fr/` or `/nl/` prefix.
12. **No hreflang tags** — single-language site targeting Belgium (`fr-BE`). Redundant hreflang is omitted per Google guidelines; self-referencing canonicals are standard.
13. **pSEO Content Archetypes** — Major cities (1,500–2,500w authority hubs) vs Small communes (800–1,200w dispatch pages) with upward Hub-and-Spoke link equity (`04-pseo-content-strategy.md`).
14. **AI Emergency & Triage Chat (F05)** — Gas leak & CO priority safety intercept, boiler diagnostics (Vaillant/Bulex/Viessmann), Netlify Edge streaming, and zero-CLS lazy loading (`skills/ai-dispatch-chat.md`).
15. **Media & Asset Storage** — Static UI in `/public/images/` via Netlify CDN, Blog media on Sanity CDN (`cdn.sanity.io`), Lead photos in Supabase Storage (`lead-attachments`), Videos strictly YouTube Embedded via lite facade (`docs/architecture/05-media-storage-strategy.md`).

---

## §4. Core Business Rules

| Rule | Value |
|------|-------|
| Phone number | `0475 12 34 56` (E.164: `+3247512345`) |
| Emergency hours | 7j/7, 24h/24 |
| Emergency response time | ≤ 2 hours |
| Standard response time | ≤ 24 hours |
| Dépannage base price | 65 € |
| Entretien base price | 99 € |
| Installation base price | 350 € |
| Réparation base price | 85 € |
| Débouchage base price | 75 € |
| Certifications | Cerga, Argb, PEB |
| Founded | 2014 |
| Total interventions | 12,500+ |
| Belgian language Belgian words | "septante" (70), "nonante" (90), "stoemelings" (secretly) |
| Belgian French urgency tone | Direct, trust-based, never aggressive sales |

---

## §5. pSEO Page Architecture

```
Total indexable pages: ~360
Communes: ~337
Services: 8
Blog posts: TBD (Sanity)
```

### 5.1 Service Slugs (Canonical — Never Change)

```
depannage-chaudiere
entretien-chaudiere
installation-chauffage
reparation-chaudiere
regulation-thermostat
chauffage-sol
pompe-chaleur
debouchage
```



---

## §6. Files Inventory (What Exists)

### Documentation (`d:/chauffagiste-belga/`)

| File | Status | Content |
|------|--------|---------|
| `rules/00-master-instructions.md` | ✅ Complete | Master AI rules, coding standards |
| `rules/01-nextjs-app-router.md` | ✅ Complete | RSC, routing, Server Actions |
| `rules/02-tailwind-v4-ui.md` | ✅ Complete | UI/UX guidelines, design tokens |
| `rules/03-supabase-ssr.md` | ✅ Complete | Supabase client, RLS, middleware |
| `rules/04-sanity-cms.md` | ✅ Complete | Studio schemas, GROQ, ISR |
| `rules/05-geo-ai-search.md` | ✅ Complete | pSEO, JSON-LD, GEO directives |
| `agents/pseo-architect-agent.md` | ✅ Complete | pSEO page generation role |
| `agents/db-engineer-agent.md` | ✅ Complete | Supabase schema, RLS, migrations |
| `agents/cms-content-agent.md` | ✅ Complete | Sanity blog, FAQ, testimonials |
| `agents/frontend-ui-agent.md` | ✅ Complete | Next.js components, Tailwind |
| `skills/generate-json-ld.md` | ✅ Complete | JSON-LD generation skill |
| `skills/spintax-engine.md` | ✅ Complete | Spintax resolution skill |
| `skills/validate-belgian-postal.md` | ✅ Complete | Postal code validation skill |
| `docs/architecture/01-silo-structure.md` | ✅ Complete | Silo hierarchy |
| `docs/architecture/02-url-architecture.md` | ✅ Complete | URL rules, canonicals |
| `docs/architecture/03-internal-linking.md` | ✅ Complete | Link engine, breadcrumbs |
| `docs/architecture/04-geo-ai-search-spec.md` | ✅ Complete | AI/GEO strategy |
| `docs/database/01-supabase-schema.md` | ✅ Complete | Full Supabase schema |
| `docs/database/02-belgium-geo-seed.md` | ✅ Complete | Belgium geo seed data |
| `docs/database/03-sanity-schemas.md` | ✅ Complete | Sanity TypeScript schemas |
| `docs/prd/01-prd-master.md` | ✅ Complete | Master PRD |
| `docs/prd/02-feature-specs.md` | ✅ Complete | Feature specs (F02, F03, F04) |
| `docs/seo/01-keyword-mapping.md` | ✅ Complete | Keyword intent matrix |
| `docs/seo/02-spintax-matrix.md` | ✅ Complete | 16 spintax blocks + 6 FAQ templates |
| `docs/seo/03-schema-jsonld-specs.md` | ✅ Complete | Full JSON-LD library |
| `docs/workflow/01-development-workflow.md` | ✅ Complete | Git, commits, local setup |
| `docs/workflow/02-deployment-pipeline.md` | ✅ Complete | Netlify, ISR, migrations |
| `docs/workflow/03-resend-email-flow.md` | ✅ Complete | Resend email integration |
| `tracking/01-task-backlog.md` | ✅ Complete | Task phases P0–P6 |
| `tracking/02-execution-log.md` | ✅ Complete | Execution log |
| `tracking/03-memory-context.md` | ✅ Complete | This file |
| `tracking/04-seo-kpi-tracker.md` | ✅ Complete | KPI dashboard |

**Total: 43/43 files complete. Phase 0 documentation & specialized skills are 100% done.**

---

## §7. Current State (Updated at End of Each Session)

### What's Done
- **Phase 0**: All 43 architecture, SEO, workflow, database, and skills files written and complete
- 12 production skills in `skills/` (JSON-LD, Spintax, Postal Validation, Next.js ISR, Supabase Geo, Resend Lead Funnel, CWV Optimizer, pSEO Data Injector, Hub-Spoke Linker, SEO Audit Checker, Local CRO, AI Dispatch Chat)

### What's Next (Phase 1)
- Scaffold the actual Next.js application under `d:/chauffagiste-belga/app/`
- Run `npx create-next-app@latest ./` with App Router, TypeScript, Tailwind v4
- Set up Supabase project and apply migrations from `docs/database/01-supabase-schema.sql`
- Initialize Sanity Studio in `/studio` subdirectory
- Build commune page template (`app/chauffagiste-[commune]/page.tsx`)

### Open Decisions / Questions
- **Client approval needed**: Final phone number (placeholder `0475 12 34 56` used throughout)
- **Map integration**: Province page — confirm whether to use Mapbox, Google Maps, or SVG Belgium map
- **Review data source**: Auto-import from Google Reviews API or manual entry via Sanity?

### Resolved Decisions
- ✅ **Language scope**: Strictly 100% French (`fr-BE`) — Dutch (NL) is out of scope
- ✅ **URL structure**: Pure flat URLs at root domain (e.g. `/chauffagiste-bruxelles`). No `/fr/` prefix
- ✅ **Hosting**: Netlify (`@netlify/plugin-nextjs`) — all Edge routes and ISR configured for Netlify deployment
- ✅ **hreflang**: Omitted entirely — single-language single-market website uses self-referencing canonicals only
- ✅ **pSEO Content Blueprint**: Major Cities = Multi-intent Authority Hubs (1,500–2,500w) with real data injection; Small Communes = Transactional Dispatch Pages (800–1,200w) with lateral & upward Hub-and-Spoke link equity routing. Documented in `docs/seo/04-pseo-content-strategy.md` and `docs/architecture/03-internal-linking.md`.
- ✅ **F05 AI Emergency & Triage Chat**: 24/7 AI chat with gas/CO safety protocol, boiler error diagnostic, zip triage, Netlify Edge streaming, and zero-CLS lazy loading.
- ✅ **Media & Asset Storage Strategy**: Static UI in `/public/images/` via Netlify CDN, Blog on Sanity CDN (`cdn.sanity.io`), customer uploads in Supabase Storage (`lead-attachments`), videos strictly embedded via YouTube lite facade. Documented in `docs/architecture/05-media-storage-strategy.md`.

### Known Risks
- Slug conflict resolution for commune vs province names (Liège, Namur) — documented in `02-url-architecture.md` §3.3 but must be enforced at DB level before launch
- ~337 commune pages = ~337 `generateStaticParams()` entries at build time (fast, lightweight build)

---

*Last updated by: Antigravity (Flat French-only URL architecture update) — 2026-09-14*
