# 00 — Master Instructions: AI Orchestrator Protocol
# Project: Chauffagiste-Belga | Belgian HVAC & Plumbing pSEO Platform
# Version: 1.0.0 | Last Updated: 2026-09-13

---

## §1. Project Identity

| Key | Value |
|-----|-------|
| **Project Name** | chauffagiste-belga |
| **Domain** | chauffagiste-belga.be |
| **Primary Language** | French (fr-BE) — secondary: Dutch (nl-BE) |
| **Business Type** | Belgian HVAC & Plumbing Services (B2C + B2B Emergency) |
| **Core Strategy** | Programmatic SEO across 580+ Belgian communes |
| **Conversion Goal** | Emergency phone calls + Quote form submissions |

---

## §2. Master Orchestration Protocol

### 2.1 Zero-Drift Policy

The AI orchestrator **MUST NEVER**:
- Deviate from the established file structure without an explicit ADR (Architecture Decision Record) logged in `tracking/03-memory-context.md`
- Generate placeholder or "TODO" code in production files
- Use `any` types in TypeScript without an explicit `// eslint-disable-next-line` comment and justification
- Create client-side data fetching where a React Server Component suffices
- Add `console.log` statements to production code (use structured logging via `lib/logger.ts`)
- Duplicate geo data — single source of truth is the Supabase `communes` table

### 2.2 Decision Hierarchy

```
Business Requirements (PRD)
        ↓
Architecture Decisions (ADRs in tracking/)
        ↓
Rule Files (rules/*.md)  ←  YOU ARE HERE
        ↓
Agent Scopes (agents/*.md)
        ↓
Implementation (app/, components/, lib/)
```

When a conflict arises between files at the same level, **the more specific file wins**. When a conflict arises between levels, **the higher level always wins**.

### 2.3 Communication Protocol

Every AI response that modifies project files MUST:
1. State which file(s) are being created or modified
2. Log the action in `tracking/02-execution-log.md` with an ISO 8601 timestamp
3. Update `tracking/01-task-backlog.md` status if applicable
4. Flag any architectural concerns before implementing

---

## §3. Code Quality Standards

### 3.1 TypeScript Configuration

```json
// tsconfig.json mandated settings
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"]
    }
  }
}
```

### 3.2 Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Files (components) | PascalCase | `HeroSection.tsx` |
| Files (utilities) | kebab-case | `validate-postal.ts` |
| Files (routes) | Next.js convention | `page.tsx`, `layout.tsx` |
| Variables | camelCase | `communeName` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_LEAD_RETRY` |
| Types/Interfaces | PascalCase + `T`/`I` prefix for disambiguation | `CommuneRecord`, `ILeadPayload` |
| Database tables | snake_case | `communes`, `service_categories` |
| CSS classes | Tailwind utilities only — no custom class names unless via `@layer components` |
| URL slugs | lowercase kebab-case | `chauffagiste-bruxelles` |

### 3.3 Import Order (enforced by ESLint)

```typescript
// 1. React / Next.js
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

// 2. External packages
import { createClient } from '@supabase/ssr'

// 3. Internal aliases (@/)
import { HeroSection } from '@/components/sections/HeroSection'
import type { CommuneRecord } from '@/types/geo'

// 4. Relative imports
import { formatCommune } from './utils'
```

### 3.4 File Size Limits

| File Type | Max Lines | Action if Exceeded |
|-----------|-----------|-------------------|
| React Component | 250 lines | Extract sub-components |
| Server Action | 80 lines | Extract to service layer |
| Utility function | 100 lines | Split into focused modules |
| SQL migration | 500 lines | Split by entity domain |
| Type definition file | 200 lines | Split by domain |

---

## §4. Project Architecture Mandates

### 4.1 Data Flow Architecture

```
Supabase (PostgreSQL)
    ↓ Server Components / Route Handlers
    ↓ React Server Components (RSC)
    ↓ Suspense boundaries
    ↓ Client Components (islands)
    ↓ User browser
```

**Never** fetch data in Client Components unless it requires user-specific, real-time, or post-interaction data.

### 4.2 Environment Variables

All environment variables MUST:
- Be declared in `.env.example` with empty values and inline comments
- Be validated at startup via `lib/env.ts` using `zod`
- Never be accessed outside of `lib/env.ts` or server-side files

```typescript
// lib/env.ts — mandatory pattern
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().startsWith('re_'),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  SANITY_API_TOKEN: z.string().min(1),
})

export const env = envSchema.parse(process.env)
```

### 4.3 Error Handling

All Server Actions and Route Handlers MUST return typed result objects — never throw raw errors to the client:

```typescript
// Mandatory error result pattern
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }
```

### 4.4 Security Mandates

- **Input validation**: All user inputs validated with `zod` before database writes
- **Rate limiting**: All public form submissions rate-limited via Supabase RPC or Upstash
- **CORS**: Explicit `next.config.ts` headers — no wildcard in production
- **RLS**: Every Supabase table has Row Level Security enabled; no exceptions
- **SQL injection**: Only parameterized queries via Supabase client — no raw string interpolation
- **XSS**: Never use `dangerouslySetInnerHTML` without explicit sanitization via `DOMPurify`

---

## §5. pSEO & Geographic Mandates

### 5.1 URL Slug Policy

- All commune-based URLs: `/chauffagiste-[commune-slug]` (no trailing slash, lowercase, diacritics stripped)
- All service+commune URLs: `/[service-slug]-[commune-slug]`
- Canonical tag on every pSEO page pointing to self
- `hreflang` tags: `fr-BE` and `nl-BE` equivalents for bilingual pages
- Redirect map maintained in `supabase/migrations/` — never hard-code redirects in code

### 5.2 Content Uniqueness

- Minimum **85% unique content** per commune page (measured by cosine similarity)
- Spintax engine MUST use commune NIS code as deterministic seed
- Meta title formula: `[Service] [Commune] | Chauffagiste-Belga — Dépannage ≤24h`
- Meta description formula: max 155 chars, include commune name + primary service + urgency signal

### 5.3 Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | < 2.0s | `next/image` with priority on hero |
| CLS | < 0.05 | Reserved dimensions on all images |
| INP | < 100ms | No heavy JS in critical path |
| TTFB | < 600ms | Netlify Edge + Supabase regional |
| FID | < 50ms | Defer non-critical scripts |

---

## §6. Agent Coordination Rules

### 6.1 Agent Boundaries

| Agent | Owns | MUST NOT touch |
|-------|------|----------------|
| `pseo-architect-agent` | URL structure, sitemap, spintax logic | Database DDL, UI components |
| `db-engineer-agent` | SQL schemas, migrations, seed data | Frontend code, SEO meta |
| `frontend-ui-agent` | Components, forms, animations | Database queries, SEO schemas |
| `cms-content-agent` | Sanity schemas, GROQ queries | Next.js routing, DB migrations |

### 6.2 Shared Contracts (Types)

All inter-agent data contracts live in `types/` and are **read-only** for all agents except `db-engineer-agent` (for database-derived types) and the orchestrator:

```
types/
├── geo.ts          # CommuneRecord, ProvinceRecord, ArondissementRecord
├── services.ts     # ServiceCategory, ServicePage
├── leads.ts        # LeadPayload, LeadStatus
├── content.ts      # SanityPost, SanityFAQ
└── seo.ts          # MetaConfig, JsonLdSchema, BreadcrumbItem
```

---

## §7. Prohibited Patterns

The following patterns are **BANNED** and must be flagged during code review:

```typescript
// ❌ BANNED: useEffect for data fetching
useEffect(() => { fetch('/api/communes') }, [])

// ❌ BANNED: Raw SQL string interpolation
supabase.rpc(`SELECT * FROM communes WHERE slug = '${slug}'`)

// ❌ BANNED: Untyped API responses
const data: any = await response.json()

// ❌ BANNED: Hardcoded commune data in components
const communes = ['Bruxelles', 'Liège', 'Namur'] // Must come from DB

// ❌ BANNED: Missing alt text on images
<Image src={url} width={400} height={300} />

// ❌ BANNED: Non-semantic HTML for CTAs
<div onClick={handleCall}>Appeler maintenant</div>

// ❌ BANNED: Missing aria-label on icon-only buttons
<button><PhoneIcon /></button>
```

---

## §8. Glossary

| Term | Definition |
|------|-----------|
| **Commune** | Belgian administrative municipality (580+ total) |
| **NIS/INS Code** | Belgian National Institute of Statistics unique numeric identifier per commune |
| **pSEO** | Programmatic SEO: systematic generation of location/service landing pages at scale |
| **GEO** | Generative Engine Optimization: structuring content for AI search tools (ChatGPT, Perplexity, Claude) |
| **Silo** | Thematic content cluster with tight internal linking: e.g., all dépannage pages |
| **Spintax** | Template syntax `{A|B|C}` for generating content variants from a single template |
| **RSC** | React Server Component — renders on server, zero client JS by default |
| **ISR** | Incremental Static Regeneration — Next.js page revalidation strategy |
| **ADR** | Architecture Decision Record — log of architectural choices with context and rationale |