const fs = require('fs');
const path = require('path');
const { ALL_MASTER, slugify } = require('./build-complete-316-migration.cjs');

const seen = new Set();
const deduped = [];
for (const item of ALL_MASTER) {
  const s = slugify(item.name);
  if (!seen.has(s)) {
    seen.add(s);
    deduped.push({ ...item, slug_fr: s, slug_nl: slugify(item.nl) });
  }
}

let sql = `-- ============================================================
-- Chauffagiste-Belga: Exhaustive 315 Communes Geographic Dataset
-- Migration: 20260101000003_complete_316_communes
-- Direct Truncate & Clean Master Seed
-- ============================================================

-- 1. Ensure all 7 Provinces exist
INSERT INTO provinces (nis_code, name_fr, name_nl, slug_fr, slug_nl, region, capital_fr, latitude, longitude) VALUES
('04', 'Bruxelles-Capitale', 'Brussel Hoofdstedelijk Gewest', 'bruxelles-capitale', 'brussel-hoofdstedelijk-gewest', 'brussels', 'Bruxelles', 50.8503, 4.3517),
('03', 'Brabant wallon', 'Waals-Brabant', 'brabant-wallon', 'waals-brabant', 'wallonia', 'Wavre', 50.7175, 4.6122),
('05', 'Hainaut', 'Henegouwen', 'hainaut', 'henegouwen', 'wallonia', 'Mons', 50.4542, 3.9562),
('06', 'Liège', 'Luik', 'liege', 'luik', 'wallonia', 'Liège', 50.6326, 5.5797),
('08', 'Luxembourg', 'Luxemburg', 'luxembourg', 'luxemburg', 'wallonia', 'Arlon', 49.6831, 5.8163),
('09', 'Namur', 'Namen', 'namur', 'namen', 'wallonia', 'Namur', 50.4669, 4.8675),
('20', 'Brabant flamand', 'Vlaams-Brabant', 'brabant-flamand', 'vlaams-brabant', 'flanders', 'Louvain', 50.8798, 4.7005)
ON CONFLICT (nis_code) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  slug_fr = EXCLUDED.slug_fr;

-- 2. Ensure find_nearby_communes PostGIS RPC function is up to date
CREATE OR REPLACE FUNCTION find_nearby_communes(
    target_commune_id UUID,
    limit_count INT DEFAULT 6
)
RETURNS TABLE (
    id UUID,
    name_fr VARCHAR,
    slug_fr VARCHAR,
    province_name_fr VARCHAR,
    distance_km FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    target_lat FLOAT;
    target_lng FLOAT;
BEGIN
    SELECT latitude, longitude INTO target_lat, target_lng
    FROM communes
    WHERE communes.id = target_commune_id;

    IF target_lat IS NULL OR target_lng IS NULL THEN
        RETURN;
    END IF;

    RETURN QUERY
    SELECT 
        c.id,
        c.name_fr,
        c.slug_fr,
        p.name_fr AS province_name_fr,
        ROUND(
            (6371 * acos(
                LEAST(1.0, GREATEST(-1.0,
                    cos(radians(target_lat)) * cos(radians(c.latitude)) *
                    cos(radians(c.longitude) - radians(target_lng)) +
                    sin(radians(target_lat)) * sin(radians(c.latitude))
                ))
            ))::numeric, 1
        )::FLOAT AS distance_km
    FROM communes c
    JOIN provinces p ON c.province_id = p.id
    WHERE c.id != target_commune_id
      AND c.is_active = TRUE
      AND c.latitude IS NOT NULL
      AND c.longitude IS NOT NULL
    ORDER BY (
        6371 * acos(
            LEAST(1.0, GREATEST(-1.0,
                cos(radians(target_lat)) * cos(radians(c.latitude)) *
                cos(radians(c.longitude) - radians(target_lng)) +
                sin(radians(target_lat)) * sin(radians(c.latitude))
            ))
        )
    ) ASC
    LIMIT limit_count;
END;
$$;

-- 3. Clear existing communes table cleanly
TRUNCATE TABLE communes CASCADE;

-- 4. Direct insertion of all 314 official Belgian municipalities
INSERT INTO communes (
  nis_code,
  name_fr,
  name_nl,
  slug_fr,
  slug_nl,
  postal_codes,
  latitude,
  longitude,
  province_id,
  population,
  is_major_hub,
  water_hardness_fh,
  transit_axes,
  is_active
) VALUES
`;

const values = deduped.map((c) => {
  const postals = `ARRAY[${c.postal.map((p) => `'${p}'`).join(',')}]::text[]`;
  const transit = c.transit && c.transit.length > 0 
    ? `ARRAY[${c.transit.map((t) => `'${t}'`).join(',')}]::text[]`
    : `'{}'::text[]`;
  const nameFr = c.name.replace(/'/g, "''");
  const nameNl = c.nl.replace(/'/g, "''");

  return `(
    '${c.nis}',
    '${nameFr}',
    '${nameNl}',
    '${c.slug_fr}',
    '${c.slug_nl}',
    ${postals},
    ${c.lat},
    ${c.lng},
    (SELECT id FROM provinces WHERE nis_code = '${c.prov_code}'),
    ${c.pop},
    ${c.hub ? 'TRUE' : 'FALSE'},
    ${c.fh},
    ${transit},
    TRUE
  )`;
});

sql += values.join(',\n') + `;\n`;

const targetFile = path.resolve('supabase/migrations/20260101000003_complete_316_communes.sql');
fs.writeFileSync(targetFile, sql, 'utf8');
console.log('Successfully generated clean truncate migration at:', targetFile, 'Lines:', sql.split('\n').length);
