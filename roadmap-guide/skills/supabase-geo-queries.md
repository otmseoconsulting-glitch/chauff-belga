# Skill: Supabase Geo Queries & Server Client
# Type-Safe Spatial Queries, PostGIS RPCs & SSR Data Layer
# Project: Chauffagiste-Belga

---

## Purpose

Provide standard, robust patterns for querying Belgian geographic entities, calculating postal proximity, finding nearest Major City Hubs, and executing PostGIS spatial functions using `@supabase/ssr`.

---

## PostgreSQL / PostGIS Spatial Database Functions

These SQL functions must exist in `supabase/migrations/`:

```sql
-- 1. Find nearby sibling communes within a radius (excluding current)
CREATE OR REPLACE FUNCTION find_nearby_communes(
  p_lat DOUBLE PRECISION,
  p_lng DOUBLE PRECISION,
  p_radius_km DOUBLE PRECISION DEFAULT 15.0,
  p_exclude_id UUID DEFAULT NULL,
  p_limit INT DEFAULT 8
)
RETURNS TABLE (
  id UUID,
  name_fr TEXT,
  slug_fr TEXT,
  postal_codes TEXT[],
  distance_km DOUBLE PRECISION
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    c.id,
    c.name_fr,
    c.slug_fr,
    c.postal_codes,
    ROUND(
      (ST_Distance(
        c.geom,
        ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography
      ) / 1000.0)::numeric, 1
    )::DOUBLE PRECISION AS distance_km
  FROM communes c
  WHERE c.is_active = TRUE
    AND (p_exclude_id IS NULL OR c.id != p_exclude_id)
    AND ST_DWithin(
      c.geom,
      ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
      p_radius_km * 1000.0
    )
  ORDER BY distance_km ASC
  LIMIT p_limit;
$$;

-- 2. Find nearest Major City Authority Hub for upward link equity
CREATE OR REPLACE FUNCTION get_nearest_major_city(
  p_commune_id UUID
)
RETURNS TABLE (
  id UUID,
  name_fr TEXT,
  slug_fr TEXT,
  distance_km DOUBLE PRECISION
)
LANGUAGE sql
STABLE
AS $$
  WITH target AS (
    SELECT geom FROM communes WHERE id = p_commune_id
  )
  SELECT 
    c.id,
    c.name_fr,
    c.slug_fr,
    ROUND(
      (ST_Distance(c.geom, t.geom) / 1000.0)::numeric, 1
    )::DOUBLE PRECISION AS distance_km
  FROM communes c, target t
  WHERE c.is_major_hub = TRUE
    AND c.id != p_commune_id
    AND c.is_active = TRUE
  ORDER BY c.geom <-> t.geom
  LIMIT 1;
$$;
```

---

## TypeScript Client Implementation

```typescript
// lib/supabase/communes.ts
import { createServerClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'

export interface CommuneRecord {
  id: string
  name_fr: string
  slug_fr: string
  postal_codes: string[]
  latitude: number
  longitude: number
  is_major_hub: boolean
  region: 'bruxelles' | 'wallonie' | 'brabant_flamand'
  arrondissement_id: string
}

/**
 * Fetch a single commune by slug with Next.js ISR tag caching
 */
export const getCommuneBySlug = unstable_cache(
  async (slug: string): Promise<CommuneRecord | null> => {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('communes')
      .select('id, name_fr, slug_fr, postal_codes, latitude, longitude, is_major_hub, region, arrondissement_id')
      .eq('slug_fr', slug)
      .eq('is_active', true)
      .maybeSingle()

    if (error || !data) return null
    return data as CommuneRecord
  },
  ['commune-by-slug'],
  { revalidate: 86400, tags: ['communes'] }
)

/**
 * Fetch all ~337 active commune slugs for generateStaticParams()
 */
export const getAllActiveCommuneSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('communes')
      .select('slug_fr')
      .eq('is_active', true)
      .order('slug_fr')

    if (error || !data) return []
    return data.map((item) => item.slug_fr)
  },
  ['all-active-commune-slugs'],
  { revalidate: 86400, tags: ['communes'] }
)
```
