const fs = require('fs');
const { ALL_COMMUNES_DATA, slugify } = require('./generate-300-communes.cjs');

let sql = `-- ============================================================
-- Chauffagiste-Belga: Scaled Hybrid pSEO & Proximity RPC Fix
-- Migration: 20260101000002_scale_hybrid_pseo
-- ============================================================

-- 1. Ensure missing arrondissements exist
INSERT INTO arrondissements (nis_code, name_fr, name_nl, slug_fr, slug_nl, province_id) VALUES
('08000', 'Arlon', 'Aarlen', 'arlon', 'aarlen', (SELECT id FROM provinces WHERE nis_code = '08')),
('23000', 'Hal-Vilvorde', 'Halle-Vilvoorde', 'hal-vilvorde', 'halle-vilvoorde', (SELECT id FROM provinces WHERE nis_code = '20')),
('24000', 'Louvain', 'Leuven', 'louvain', 'leuven', (SELECT id FROM provinces WHERE nis_code = '20'))
ON CONFLICT (nis_code) DO NOTHING;

-- 2. Create Overloaded find_nearby_communes taking (target_commune_id, limit_count, max_distance_km)
CREATE OR REPLACE FUNCTION find_nearby_communes(
  target_commune_id UUID,
  limit_count INT DEFAULT 8,
  max_distance_km FLOAT DEFAULT 35
)
RETURNS TABLE(id UUID, name_fr TEXT, slug_fr TEXT, province_name_fr TEXT, distance_km FLOAT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH target AS (
    SELECT latitude, longitude, id FROM communes WHERE id = target_commune_id
  )
  SELECT c.id, c.name_fr, c.slug_fr, p.name_fr AS province_name_fr,
    ROUND((6371 * acos(LEAST(1.0,
      cos(radians(t.latitude)) * cos(radians(c.latitude))
      * cos(radians(c.longitude) - radians(t.longitude))
      + sin(radians(t.latitude)) * sin(radians(c.latitude))
    )))::numeric, 1)::FLOAT AS distance_km
  FROM communes c
  JOIN provinces p ON p.id = c.province_id
  CROSS JOIN target t
  WHERE c.is_active = true
    AND c.id != t.id
    AND ABS(c.latitude - t.latitude) < (max_distance_km::FLOAT / 111.0)
    AND ABS(c.longitude - t.longitude) < (max_distance_km::FLOAT / (111.0 * cos(radians(t.latitude))))
  ORDER BY distance_km LIMIT limit_count;
$$;

-- 3. Upsert Communes (All Key Entities)
`;

for (const c of ALL_COMMUNES_DATA) {
  const slug = slugify(c.name);
  const slugNl = slugify(c.nl);
  const postalsSql = `ARRAY[${c.postal.map((p) => `'${p}'`).join(',')}]`;
  const transitSql = c.transit ? `ARRAY[${c.transit.map((t) => `'${t}'`).join(',')}]` : 'ARRAY[]::text[]';
  const nameEsc = c.name.replace(/'/g, "''");
  const nameNlEsc = c.nl.replace(/'/g, "''");

  sql += `
INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '${c.nis}', '${nameEsc}', '${nameNlEsc}', '${slug}', '${slugNl}', ${postalsSql}, ${c.lat}, ${c.lng},
  ${c.pop}, ${c.hub ? 'true' : 'false'}, ${c.fh}, ${transitSql}, true,
  (SELECT id FROM provinces WHERE nis_code = '${c.province_nis}'),
  (SELECT id FROM arrondissements WHERE nis_code = '${c.arr_nis}')
)
ON CONFLICT (nis_code) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  slug_fr = EXCLUDED.slug_fr,
  postal_codes = EXCLUDED.postal_codes,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  population = EXCLUDED.population,
  is_major_hub = EXCLUDED.is_major_hub,
  water_hardness_fh = EXCLUDED.water_hardness_fh,
  transit_axes = EXCLUDED.transit_axes,
  is_active = true;
`;
}

sql += `
-- 4. Sync pseo_pages for all active communes
INSERT INTO pseo_pages (commune_id, full_slug, page_type, is_published, is_indexed)
SELECT id, 'chauffagiste-' || slug_fr, 'commune', true, true
FROM communes
WHERE is_active = true
ON CONFLICT DO NOTHING;
`;

fs.writeFileSync('supabase/migrations/20260101000002_scale_hybrid_pseo.sql', sql, 'utf8');
console.log('Migration generated successfully: supabase/migrations/20260101000002_scale_hybrid_pseo.sql');
