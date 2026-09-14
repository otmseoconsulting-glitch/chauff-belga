# 03 — Supabase SSR: Client Architecture, Middleware & RLS Policies
# Project: Chauffagiste-Belga

---

## §1. Client Instantiation Patterns

**Critical Rule**: There is EXACTLY ONE way to create a Supabase client per context. Never improvise.

### 1.1 Server Component Client

```typescript
// lib/supabase/server.ts
import { createServerClient as _createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import type { Database } from '@/types/supabase'

export function createServerClient() {
  const cookieStore = cookies()

  return _createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — cookies can only be set in middleware or Route Handlers
          }
        },
      },
    }
  )
}
```

### 1.2 Service Role Client (Admin Operations Only)

```typescript
// lib/supabase/admin.ts
// WARNING: This client bypasses RLS. ONLY use in:
// - Server Actions that require admin operations
// - Cron jobs / background tasks
// - Database seeding scripts
// NEVER expose this client to browser or import from client components

import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import type { Database } from '@/types/supabase'

// Singleton pattern — one instance per server process
let adminClient: ReturnType<typeof createClient<Database>> | null = null

export function createAdminClient() {
  if (adminClient) return adminClient

  adminClient = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  return adminClient
}
```

### 1.3 Browser Client (Client Components Only)

```typescript
// lib/supabase/browser.ts
import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'
import type { Database } from '@/types/supabase'

// Singleton — prevents multiple GoTrueClient instances
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getBrowserClient() {
  if (browserClient) return browserClient

  browserClient = createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  return browserClient
}
```

### 1.4 Middleware Client

```typescript
// middleware.ts (extract: Supabase session refresh)
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from '@/lib/env'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — MUST be called before any other Supabase operation
  await supabase.auth.getUser()

  return supabaseResponse
}
```

---

## §2. Database Query Patterns

### 2.1 Type-Safe Query Builder

```typescript
// lib/supabase/geo.ts — exemplar query patterns

// Pattern 1: Single record with null safety
export async function getCommuneBySlug(slug: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('communes')
    .select(`
      id, nis_code, name_fr, name_nl, slug_fr, slug_nl,
      latitude, longitude, postal_codes,
      provinces!inner ( id, name_fr, name_nl, slug_fr ),
      arrondissements ( id, name_fr, name_nl )
    `)
    .eq('slug_fr', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // No rows found
    throw new Error(`[getCommuneBySlug] ${error.message}`)
  }

  return data
}

// Pattern 2: Paginated list
export async function getCommunesByProvince(
  provinceId: string,
  { page = 1, pageSize = 50 }: PaginationOptions = {}
) {
  const supabase = createServerClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('communes')
    .select('id, name_fr, name_nl, slug_fr, postal_codes', { count: 'exact' })
    .eq('province_id', provinceId)
    .order('name_fr')
    .range(from, to)

  if (error) throw new Error(`[getCommunesByProvince] ${error.message}`)

  return {
    communes: data ?? [],
    total: count ?? 0,
    pages: Math.ceil((count ?? 0) / pageSize),
  }
}

// Pattern 3: RPC for complex operations
export async function lookupByPostalCode(postalCode: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .rpc('lookup_communes_by_postal_code', { postal_code: postalCode })

  if (error) throw new Error(`[lookupByPostalCode] ${error.message}`)
  return data
}
```

### 2.2 Forbidden Query Patterns

```typescript
// ❌ BANNED: Raw SQL string interpolation
await supabase.rpc(`SELECT * FROM communes WHERE slug = '${slug}'`)

// ❌ BANNED: Selecting all columns on large tables
await supabase.from('communes').select('*')

// ❌ BANNED: Missing error handling
const { data } = await supabase.from('leads').insert({...})

// ❌ BANNED: Client component data fetching for non-user data
// In 'use client' component:
useEffect(() => {
  supabase.from('communes').select('*').then(...)
}, [])
```

---

## §3. Row Level Security (RLS) Policies

### 3.1 RLS Policy Matrix

| Table | Public SELECT | Authenticated SELECT | Public INSERT | Admin UPDATE/DELETE |
|-------|:------------:|:-------------------:|:-------------:|:------------------:|
| `provinces` | ✅ | ✅ | ❌ | ✅ |
| `arrondissements` | ✅ | ✅ | ❌ | ✅ |
| `communes` | ✅ | ✅ | ❌ | ✅ |
| `service_categories` | ✅ | ✅ | ❌ | ✅ |
| `leads` | ❌ | ✅ (own) | ✅ (anon) | ✅ |
| `pseo_pages` | ✅ | ✅ | ❌ | ✅ |
| `testimonials` | ✅ (approved) | ✅ | ❌ | ✅ |

### 3.2 RLS Policy SQL Definitions

```sql
-- ─────────────────────────────────────────────
-- GEO TABLES: Public read, admin write
-- ─────────────────────────────────────────────

-- Provinces
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "provinces_public_read"
  ON provinces FOR SELECT
  USING (true);

CREATE POLICY "provinces_admin_write"
  ON provinces FOR ALL
  USING (auth.role() = 'service_role');

-- Communes (same pattern)
ALTER TABLE communes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "communes_public_read"
  ON communes FOR SELECT
  USING (true);

CREATE POLICY "communes_admin_write"
  ON communes FOR ALL
  USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────
-- LEADS: Anonymous insert, owner read
-- ─────────────────────────────────────────────

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anonymous users can create leads (public form submission)
CREATE POLICY "leads_anon_insert"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (
    -- Enforce required fields at RLS level (defense in depth)
    full_name IS NOT NULL AND
    phone IS NOT NULL AND
    postal_code IS NOT NULL AND
    service_type IS NOT NULL
  );

-- Authenticated users can read their own leads (future: customer portal)
CREATE POLICY "leads_auth_read_own"
  ON leads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role has full access (admin dashboard)
CREATE POLICY "leads_admin_all"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────
-- TESTIMONIALS: Public read approved only
-- ─────────────────────────────────────────────

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials_public_read_approved"
  ON testimonials FOR SELECT
  USING (status = 'approved');

CREATE POLICY "testimonials_admin_all"
  ON testimonials FOR ALL
  USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────
-- PSEO_PAGES: Public read published only
-- ─────────────────────────────────────────────

ALTER TABLE pseo_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pseo_pages_public_read_published"
  ON pseo_pages FOR SELECT
  USING (is_published = true);

CREATE POLICY "pseo_pages_admin_all"
  ON pseo_pages FOR ALL
  USING (auth.role() = 'service_role');
```

---

## §4. Supabase Type Generation

### 4.1 Type Generation Command

```bash
# Generate types from production database
npx supabase gen types typescript \
  --project-id "$SUPABASE_PROJECT_ID" \
  --schema public \
  > types/supabase.ts

# Run this after EVERY migration
```

### 4.2 Type Extension Pattern

```typescript
// types/geo.ts — extend generated Supabase types with domain types
import type { Database } from './supabase'

// Base type from generated schema
type CommuneRow = Database['public']['Tables']['communes']['Row']

// Extended type with joined data
export interface CommuneRecord extends CommuneRow {
  provinces: {
    id: string
    name_fr: string
    name_nl: string
    slug_fr: string
  }
  arrondissements: {
    id: string
    name_fr: string
    name_nl: string
  } | null
}

// Convenience alias with camelCase for component use
export interface Commune {
  id: string
  nisCode: string
  nameFr: string
  nameNl: string
  slug: string
  slugNl: string
  latitude: number
  longitude: number
  postalCodes: string[]
  province: {
    nameFr: string
    nameNl: string
    slug: string
  }
}

export function toCommuneDomain(row: CommuneRecord): Commune {
  return {
    id: row.id,
    nisCode: row.nis_code,
    nameFr: row.name_fr,
    nameNl: row.name_nl,
    slug: row.slug_fr,
    slugNl: row.slug_nl,
    latitude: row.latitude,
    longitude: row.longitude,
    postalCodes: row.postal_codes,
    province: {
      nameFr: row.provinces.name_fr,
      nameNl: row.provinces.name_nl,
      slug: row.provinces.slug_fr,
    },
  }
}
```

---

## §5. Database Connection & Performance

### 5.1 Connection Pooling

```typescript
// next.config.ts — Supabase connection pooler (required for serverless)
// Use Transaction mode pooler URL for server-side operations
// Use Session mode pooler URL for long-lived connections (migrations only)

// In .env
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_DB_URL=postgresql://postgres.[project-ref]:[password]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

### 5.2 Query Performance Requirements

- All queries on `communes.slug_fr` MUST use the `idx_communes_slug_fr` index
- All queries on `communes.postal_codes` MUST use the GIN index `idx_communes_postal_codes`
- Queries joining communes + provinces MUST select only required columns (no `*`)
- pSEO page queries MUST complete in < 50ms (monitored via Supabase Dashboard)

### 5.3 Caching Strategy

```typescript
// lib/supabase/cached-queries.ts
import { unstable_cache } from 'next/cache'
import { getAllCommuneSlugs as _getAllCommuneSlugs } from './geo'

// Cache commune slugs for 24h (changes rarely)
export const getAllCommuneSlugs = unstable_cache(
  _getAllCommuneSlugs,
  ['all-commune-slugs'],
  {
    revalidate: 86400, // 24 hours
    tags: ['communes'],
  }
)

// Cache individual commune data for 24h
export const getCommuneBySlug = unstable_cache(
  async (slug: string) => {
    const { getCommuneBySlug: _get } = await import('./geo')
    return _get(slug)
  },
  ['commune-by-slug'],
  {
    revalidate: 86400,
    tags: ['communes'],
  }
)
```

---

## §6. Migrations Protocol

```
supabase/
├── migrations/
│   ├── 20260101000000_create_geo_tables.sql
│   ├── 20260101000001_create_service_tables.sql
│   ├── 20260101000002_create_leads_table.sql
│   ├── 20260101000003_create_pseo_tables.sql
│   ├── 20260101000004_create_rls_policies.sql
│   ├── 20260101000005_create_indexes.sql
│   └── 20260101000006_create_rpc_functions.sql
└── seed/
    ├── 01_provinces.sql
    ├── 02_arrondissements.sql
    ├── 03_communes.sql
    └── 04_service_categories.sql
```

**Migration Rules**:
1. Migrations are **never edited after merge** — create a new migration to fix
2. Every migration has a corresponding rollback comment block
3. Run `supabase db diff` before pushing to verify changes
4. All new tables get RLS policies in the same migration file