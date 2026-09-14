# 01 — Development Workflow
# Branching Strategy, Commit Convention & Local Dev Setup
# Project: Chauffagiste-Belga

---

## §1. Branch Strategy

### 1.1 Branch Hierarchy

```
main                ← Production branch (auto-deploys to Netlify)
  └── staging       ← QA / review branch (deploys to staging.chauffagiste-belga.be)
        └── develop ← Integration branch for feature work
              └── feat/[feature-name]    ← Feature branches
              └── fix/[bug-description]  ← Bug fix branches
              └── seo/[page-or-topic]    ← SEO content branches
              └── chore/[task]           ← Maintenance (deps, config)
```

### 1.2 Branch Lifecycle

```
1. Create from develop: git checkout -b feat/zip-detector develop
2. Work locally, commit frequently
3. Push: git push origin feat/zip-detector
4. Open PR → develop (target)
5. CI passes (lint, type-check, build)
6. Code review (self-review or pair)
7. Squash merge to develop
8. Merge develop → staging for QA (weekly or on demand)
9. Merge staging → main for production release
```

### 1.3 Branch Naming Rules

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/[noun-description]` | `feat/commune-page-template` |
| Bug fix | `fix/[what-was-broken]` | `fix/breadcrumb-missing-province` |
| SEO work | `seo/[scope]` | `seo/json-ld-faqpage` |
| Refactor | `refactor/[scope]` | `refactor/supabase-client-pattern` |
| Chore | `chore/[description]` | `chore/update-dependencies` |
| Hotfix | `hotfix/[critical-issue]` | `hotfix/broken-phone-link` |

**Rule**: No direct commits to `main` or `staging`. All work via PRs.

---

## §2. Commit Convention (Conventional Commits)

### 2.1 Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### 2.2 Types

| Type | Use When |
|------|---------|
| `feat` | New feature or page template |
| `fix` | Bug fix |
| `seo` | SEO-related changes (metadata, schema, redirects) |
| `perf` | Performance optimization |
| `refactor` | Code restructuring without behavior change |
| `style` | CSS / Tailwind changes with no logic change |
| `test` | Adding or updating tests |
| `docs` | Documentation updates |
| `chore` | Build scripts, dependency updates, config changes |
| `ci` | CI/CD pipeline changes |
| `db` | Supabase migration or seed changes |
| `content` | Sanity schema or spintax changes |

### 2.3 Examples

```bash
feat(commune-page): add NearbyCommunes section with GPS proximity sort
fix(breadcrumb): restore province link missing from service+commune pages
seo(json-ld): add PlumbingService schema to all service+commune pages
perf(images): convert all OG images to WebP, add explicit width/height
db(migration): add postal_codes jsonb column to communes table
content(spintax): add 3 new intro variants for depannage-chaudiere block
chore(deps): upgrade @supabase/ssr to 0.6.0
```

### 2.4 Commit Scope Reference

| Scope | Maps To |
|-------|--------|
| `commune-page` | `/app/chauffagiste-[commune]` |
| `service-page` | `/app/[service]-[commune]` |
| `province-page` | `/app/zones-intervention/[province]` |
| `blog` | `/app/conseils` and Sanity |
| `breadcrumb` | `components/seo/Breadcrumb.tsx` |
| `json-ld` | `lib/seo/schema/*` |
| `forms` | Lead form, devis form |
| `navigation` | Header, footer, EmergencyBar |
| `supabase` | `lib/supabase/*` |
| `spintax` | `lib/seo/spintax.ts` |
| `migration` | `supabase/migrations/*` |

---

## §3. Local Development Setup

### 3.1 Prerequisites

```bash
Node.js >= 20.x (use nvm: nvm use 20)
npm >= 10.x
Git >= 2.40
Supabase CLI >= 1.x (npm i -g supabase)
Sanity CLI >= 3.x (npm i -g @sanity/cli)
```

### 3.2 Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Required variables:

```env
# Supabase (from Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Server-side only — never expose to client

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...  # Write token for ISR webhook

# Resend
RESEND_API_KEY=re_...

# Analytics (optional locally)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3.3 First-Time Setup

```bash
# 1. Clone and install
git clone https://github.com/[org]/chauffagiste-belga.git
cd chauffagiste-belga
npm install

# 2. Set up Supabase locally (optional — can use remote)
supabase start
supabase db reset  # Applies migrations + seeds

# 3. Start development server
npm run dev

# 4. Open Sanity Studio (separate terminal)
cd studio
npm install
npx sanity dev  # Starts at http://localhost:3333
```

### 3.4 Available npm Scripts

```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server locally
npm run lint         # ESLint
npm run type-check   # TypeScript strict mode check
npm run format       # Prettier format
npm run db:types     # Generate Supabase TypeScript types
npm run db:migrate   # Apply pending migrations
npm run db:reset     # Reset local DB + re-seed
npm run sitemap      # Preview generated sitemap
```

---

## §4. CI/CD Pre-Merge Checklist

Every PR to `develop`, `staging`, or `main` must pass:

```yaml
# .github/workflows/ci.yml (reference)
checks:
  - npm run lint         # No ESLint errors
  - npm run type-check   # No TypeScript errors (strict mode)
  - npm run build        # Build succeeds
  - slug uniqueness test # No duplicate commune slugs in DB
  - schema validation    # All JSON-LD valid
```

---

## §5. Code Review Guidelines

### 5.1 Review Priority

| Priority | Check |
|---------|-------|
| P0 | Canonical URL correct and self-referencing |
| P0 | `generateMetadata()` exported from every page |
| P0 | No `any` TypeScript types |
| P1 | JSON-LD schema present and valid |
| P1 | Server component by default, `'use client'` justified |
| P1 | No inline styles (Tailwind only) |
| P2 | Images have explicit `width`, `height`, `alt` |
| P2 | Internal links follow silo rules |
| P3 | Comments explain non-obvious business logic |

### 5.2 Self-Review Before PR

```markdown
## PR Self-Review Checklist
- [ ] Canonical URL set in generateMetadata()
- [ ] JSON-LD schema tested in Rich Results Test
- [ ] No TypeScript errors (npm run type-check)
- [ ] No ESLint warnings (npm run lint)
- [ ] Mobile responsive (tested at 375px)
- [ ] No new `any` types introduced
- [ ] Server Actions use Zod validation
- [ ] Database changes have corresponding migration file
```
