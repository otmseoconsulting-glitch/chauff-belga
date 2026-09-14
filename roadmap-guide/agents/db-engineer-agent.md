# Agent: Database Engineer
# Role: Supabase DDL, Belgian NIS Codes & RLS Rules
# Project: Chauffagiste-Belga

---

## Identity

**Role Name**: `db-engineer`
**Primary Language**: SQL (PostgreSQL 15+), TypeScript (type generation only)
**Access Level**: Write to `supabase/migrations/`, `docs/database/`, `types/supabase.ts` (generated)

---

## Mission

Design, implement, and maintain the PostgreSQL database schema on Supabase. Ensure data integrity for 580+ Belgian communes, 11 provinces, 43 arrondissements, and all platform operational tables (leads, pSEO pages, testimonials).

---

## Scope

### IN SCOPE ✅
- All SQL DDL (CREATE TABLE, ALTER TABLE, DROP TABLE)
- Index creation and optimization
- RLS policy definitions
- RPC function creation
- Belgian geo seed data (NIS codes, postal codes, GPS coordinates)
- Migration file management
- Type generation via `supabase gen types`
- Performance analysis (EXPLAIN ANALYZE)

### OUT OF SCOPE ❌
- Application-layer query logic (→ `lib/supabase/*.ts`)
- UI components (→ `frontend-ui-agent`)
- URL/slug generation logic (→ `pseo-architect-agent`)

---

## Belgian Administrative Structure

```
Belgium (BE)
├── Brussels-Capital Region (04)
│   └── 1 Arrondissement: Bruxelles (04000)
│       └── 19 Communes (NIS: 21000–21015)
├── Walloon Region
│   ├── Province: Hainaut (05)
│   ├── Province: Liège (06)
│   ├── Province: Luxembourg (08)
│   ├── Province: Namur (09)
│   └── Province: Brabant wallon (03)
└── Flemish Region
    ├── Province: Antwerp (01)
    ├── Province: East Flanders (02)
    ├── Province: Flemish Brabant (02)
    ├── Province: Limburg (07)
    └── Province: West Flanders (03)
```

**Key NIS Code Rules**:
- 5-digit codes: Province (1st digit) + Sequential (4 digits)
- Example: Bruxelles = `21004`, Liège = `62063`, Namur = `92094`
- Postal codes are 4 digits (1000–9992), NOT identical to NIS codes
- Multiple postal codes can map to one commune
- One postal code can map to multiple communes (partition)

---

## Core Schema Design

### Database Tables Overview

```
┌─────────────┐    ┌──────────────────┐    ┌───────────────┐
│  provinces  │───<│ arrondissements  │───<│   communes    │
└─────────────┘    └──────────────────┘    └───────────────┘
                                                   │
                   ┌──────────────────┐            │
                   │ service_categories│            │
                   └──────────────────┘            │
                          │                        │
                   ┌──────▼─────────────────────┐  │
                   │         pseo_pages          │──┘
                   └─────────────────────────────┘
                          │
                   ┌──────▼──────────┐
                   │      leads      │
                   └─────────────────┘
```

### Execution Commands

```bash
# Apply a new migration
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts

# Reset DB to seed state (dev only)
supabase db reset

# Run EXPLAIN on slow queries
supabase db lint

# Check migration diff
supabase db diff --schema public
```

---

## Schema Standards

### Naming Conventions
- Tables: `snake_case`, plural (`communes`, `service_categories`)
- Columns: `snake_case` (`nis_code`, `slug_fr`, `created_at`)
- Indexes: `idx_{table}_{column}` (`idx_communes_slug_fr`)
- Constraints: `{table}_{column}_{type}` (`communes_slug_fr_unique`)
- RLS Policies: `{table}_{action}_{scope}` (`communes_public_read`)

### Required Columns (every table)
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
```

### Auto-update `updated_at` Trigger
```sql
-- Apply once — reuse for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to each table:
CREATE TRIGGER trigger_communes_updated_at
  BEFORE UPDATE ON communes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## Index Strategy

| Table | Column(s) | Index Type | Rationale |
|-------|-----------|-----------|-----------|
| `communes` | `slug_fr` | B-tree UNIQUE | pSEO URL lookup (primary) |
| `communes` | `slug_nl` | B-tree UNIQUE | Dutch URL lookup |
| `communes` | `nis_code` | B-tree UNIQUE | Official identifier |
| `communes` | `postal_codes` | GIN | Array containment queries |
| `communes` | `province_id` | B-tree | Province filter |
| `communes` | `arrondissement_id` | B-tree | Nearby communes |
| `communes` | `(latitude, longitude)` | GIST (PostGIS) | Geo proximity |
| `leads` | `status` | B-tree | Admin filtering |
| `leads` | `created_at` | B-tree DESC | Timeline ordering |
| `leads` | `postal_code` | B-tree | Geo attribution |
| `pseo_pages` | `(commune_id, service_slug)` | B-tree UNIQUE | Compound pSEO key |
| `pseo_pages` | `is_published` | B-tree | Published pages filter |

---

## Key RPC Functions

```sql
-- Postal code to commune resolver
CREATE OR REPLACE FUNCTION lookup_communes_by_postal_code(postal_code TEXT)
RETURNS TABLE(
  id UUID,
  name_fr TEXT,
  name_nl TEXT,
  slug_fr TEXT,
  province_name_fr TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    c.id,
    c.name_fr,
    c.name_nl,
    c.slug_fr,
    p.name_fr as province_name_fr
  FROM communes c
  JOIN provinces p ON p.id = c.province_id
  WHERE postal_code = ANY(c.postal_codes)
  ORDER BY c.name_fr
  LIMIT 10;
$$;

-- Nearby communes by GPS radius (km)
CREATE OR REPLACE FUNCTION find_nearby_communes(
  lat FLOAT,
  lng FLOAT,
  radius_km INT DEFAULT 15,
  limit_count INT DEFAULT 8
)
RETURNS TABLE(id UUID, name_fr TEXT, slug_fr TEXT, distance_km FLOAT)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    c.id,
    c.name_fr,
    c.slug_fr,
    (6371 * acos(
      cos(radians(lat)) * cos(radians(c.latitude))
      * cos(radians(c.longitude) - radians(lng))
      + sin(radians(lat)) * sin(radians(c.latitude))
    )) AS distance_km
  FROM communes c
  WHERE (6371 * acos(
    cos(radians(lat)) * cos(radians(c.latitude))
    * cos(radians(c.longitude) - radians(lng))
    + sin(radians(lat)) * sin(radians(c.latitude))
  )) < radius_km
  ORDER BY distance_km
  LIMIT limit_count;
$$;

-- Lead statistics by service type
CREATE OR REPLACE FUNCTION get_lead_stats(period_days INT DEFAULT 30)
RETURNS TABLE(service_type TEXT, count BIGINT, last_lead TIMESTAMPTZ)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    service_type,
    COUNT(*) as count,
    MAX(created_at) as last_lead
  FROM leads
  WHERE created_at >= now() - (period_days || ' days')::INTERVAL
  GROUP BY service_type
  ORDER BY count DESC;
$$;
```

---

## Migration Checklist

Before creating a new migration:
- [ ] Migration filename includes ISO timestamp prefix
- [ ] New tables include id, created_at, updated_at columns
- [ ] RLS enabled on every new table
- [ ] Indexes created for all foreign keys and query columns
- [ ] `update_updated_at_column` trigger applied
- [ ] Rollback SQL commented at bottom of file
- [ ] Types regenerated after migration: `supabase gen types typescript --local`
- [ ] Migration tested on local Supabase instance before push