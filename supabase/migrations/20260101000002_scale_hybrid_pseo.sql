-- ============================================================
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21004', 'Bruxelles', 'Brussel', 'bruxelles', 'brussel', ARRAY['1000','1020','1120','1130'], 50.8503, 4.3517,
  185103, true, 32, ARRAY['R0','A12','E19'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21001', 'Anderlecht', 'Anderlecht', 'anderlecht', 'anderlecht', ARRAY['1070'], 50.8364, 4.3074,
  120455, false, 30, ARRAY['R0','N6'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21002', 'Auderghem', 'Oudergem', 'auderghem', 'oudergem', ARRAY['1160'], 50.8167, 4.4333,
  34400, false, 28, ARRAY['E411','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21003', 'Berchem-Sainte-Agathe', 'Sint-Agatha-Berchem', 'berchem-sainte-agathe', 'sint-agatha-berchem', ARRAY['1082'], 50.8653, 4.2936,
  25500, false, 29, ARRAY['R0','N9'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21005', 'Etterbeek', 'Etterbeek', 'etterbeek', 'etterbeek', ARRAY['1040'], 50.8364, 4.3894,
  48500, false, 28, ARRAY['N3','N4'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21006', 'Evere', 'Evere', 'evere', 'evere', ARRAY['1140'], 50.8719, 4.4031,
  42600, false, 30, ARRAY['R21','N2'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21007', 'Forest', 'Vorst', 'forest', 'vorst', ARRAY['1190'], 50.8114, 4.3189,
  56500, false, 29, ARRAY['R0','N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21008', 'Ganshoren', 'Ganshoren', 'ganshoren', 'ganshoren', ARRAY['1083'], 50.8717, 4.3094,
  25100, false, 30, ARRAY['R0','N9'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21009', 'Ixelles', 'Elsene', 'ixelles', 'elsene', ARRAY['1050'], 50.8236, 4.3726,
  89120, false, 29, ARRAY['N4','N24'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21010', 'Jette', 'Jette', 'jette', 'jette', ARRAY['1090'], 50.8767, 4.3314,
  52700, false, 30, ARRAY['R0','A12'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21011', 'Koekelberg', 'Koekelberg', 'koekelberg', 'koekelberg', ARRAY['1081'], 50.8614, 4.3297,
  22000, false, 30, ARRAY['N9','R20'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21012', 'Molenbeek-Saint-Jean', 'Sint-Jans-Molenbeek', 'molenbeek-saint-jean', 'sint-jans-molenbeek', ARRAY['1080'], 50.8523, 4.3222,
  98671, false, 30, ARRAY['R0','N8'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21013', 'Saint-Gilles', 'Sint-Gillis', 'saint-gilles', 'sint-gillis', ARRAY['1060'], 50.8258, 4.3458,
  50000, false, 29, ARRAY['N5','R20'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21014', 'Saint-Josse-ten-Noode', 'Sint-Joost-ten-Node', 'saint-josse-ten-noode', 'sint-joost-ten-node', ARRAY['1210'], 50.8519, 4.3708,
  27500, false, 30, ARRAY['R20','N2'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21015', 'Schaerbeek', 'Schaarbeek', 'schaerbeek', 'schaarbeek', ARRAY['1030'], 50.8675, 4.3789,
  133657, false, 30, ARRAY['N2','N22'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21016', 'Uccle', 'Ukkel', 'uccle', 'ukkel', ARRAY['1180'], 50.7985, 4.3625,
  83703, false, 28, ARRAY['N5','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21017', 'Watermael-Boitsfort', 'Watermaal-Bosvoorde', 'watermael-boitsfort', 'watermaal-bosvoorde', ARRAY['1170'], 50.8033, 4.4103,
  25200, false, 28, ARRAY['E411','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21018', 'Woluwe-Saint-Lambert', 'Sint-Lambrechts-Woluwe', 'woluwe-saint-lambert', 'sint-lambrechts-woluwe', ARRAY['1200'], 50.8447, 4.4317,
  58500, false, 29, ARRAY['E40','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '21019', 'Woluwe-Saint-Pierre', 'Sint-Pieters-Woluwe', 'woluwe-saint-pierre', 'sint-pieters-woluwe', ARRAY['1150'], 50.8319, 4.4536,
  42000, false, 28, ARRAY['E411','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '04'),
  (SELECT id FROM arrondissements WHERE nis_code = '04000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25110', 'Wavre', 'Waver', 'wavre', 'waver', ARRAY['1300'], 50.7175, 4.6122,
  34305, true, 27, ARRAY['E411','N25'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25119', 'Waterloo', 'Waterloo', 'waterloo', 'waterloo', ARRAY['1410'], 50.7167, 4.3986,
  30376, true, 28, ARRAY['R0','N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25014', 'Braine-l’Alleud', 'Eigenbrakel', 'braine-l-alleud', 'eigenbrakel', ARRAY['1420'], 50.6833, 4.3667,
  40000, true, 29, ARRAY['R0','N253'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25072', 'Nivelles', 'Nijvel', 'nivelles', 'nijvel', ARRAY['1400'], 50.5975, 4.3236,
  28883, true, 30, ARRAY['E19','N25'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25121', 'Ottignies-Louvain-la-Neuve', 'Ottignies-Louvain-la-Neuve', 'ottignies-louvain-la-neuve', 'ottignies-louvain-la-neuve', ARRAY['1340','1348'], 50.6667, 4.5667,
  31385, true, 26, ARRAY['E411','N25'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25105', 'Tubize', 'Tubeke', 'tubize', 'tubeke', ARRAY['1480'], 50.6933, 4.2047,
  26280, false, 32, ARRAY['E429','N6'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25091', 'Rixensart', 'Rixensart', 'rixensart', 'rixensart', ARRAY['1330','1332'], 50.7139, 4.5322,
  22500, false, 26, ARRAY['E411','N275'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25031', 'Genappe', 'Genepiën', 'genappe', 'genepien', ARRAY['1470'], 50.6125, 4.4514,
  15400, false, 28, ARRAY['N5','N25'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25048', 'Jodoigne', 'Geldenaken', 'jodoigne', 'geldenaken', ARRAY['1370'], 50.7247, 4.8681,
  14200, false, 25, ARRAY['N29','N240'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25037', 'Grez-Doiceau', 'Graven', 'grez-doiceau', 'graven', ARRAY['1390'], 50.7389, 4.6958,
  13800, false, 25, ARRAY['N25','E411'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25018', 'Chaumont-Gistoux', 'Chaumont-Gistoux', 'chaumont-gistoux', 'chaumont-gistoux', ARRAY['1325'], 50.6806, 4.7194,
  11500, false, 25, ARRAY['E411','N243'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25023', 'Court-Saint-Étienne', 'Court-Saint-Étienne', 'court-saint-etienne', 'court-saint-etienne', ARRAY['1490'], 50.6431, 4.5681,
  10500, false, 27, ARRAY['N25'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25118', 'Lasne', 'Lasne', 'lasne', 'lasne', ARRAY['1380'], 50.6861, 4.4833,
  14200, false, 27, ARRAY['N5','N253'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25050', 'La Hulpe', 'Terhulpen', 'la-hulpe', 'terhulpen', ARRAY['1310'], 50.7319, 4.4861,
  7400, false, 26, ARRAY['N275'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25124', 'Walhain', 'Walhain', 'walhain', 'walhain', ARRAY['1457'], 50.6181, 4.6986,
  7300, false, 26, ARRAY['E411','N4'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25107', 'Villers-la-Ville', 'Villers-la-Ville', 'villers-la-ville', 'villers-la-ville', ARRAY['1495'], 50.5792, 4.5292,
  10700, false, 28, ARRAY['N273','N93'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25084', 'Perwez', 'Perwijs', 'perwez', 'perwijs', ARRAY['1360'], 50.6278, 4.8139,
  9400, false, 25, ARRAY['E411','N29'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25005', 'Beauvechain', 'Bevekom', 'beauvechain', 'bevekom', ARRAY['1320'], 50.7806, 4.7722,
  7200, false, 25, ARRAY['N25','N3'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25117', 'Chastre', 'Chastre', 'chastre', 'chastre', ARRAY['1450'], 50.6097, 4.6361,
  7600, false, 27, ARRAY['N4'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25043', 'Hélécine', 'Heilissem', 'helecine', 'heilissem', ARRAY['1357'], 50.7486, 4.9819,
  3500, false, 24, ARRAY['E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25044', 'Incourt', 'Incourt', 'incourt', 'incourt', ARRAY['1315'], 50.6972, 4.7958,
  5400, false, 25, ARRAY['N91'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25045', 'Ittre', 'Itter', 'ittre', 'itter', ARRAY['1460','1461'], 50.6486, 4.2611,
  6900, false, 30, ARRAY['E19','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25068', 'Mont-Saint-Guibert', 'Mont-Saint-Guibert', 'mont-saint-guibert', 'mont-saint-guibert', ARRAY['1435'], 50.6347, 4.6111,
  7700, false, 26, ARRAY['N4','N25'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25078', 'Orp-Jauche', 'Orp-Jauche', 'orp-jauche', 'orp-jauche', ARRAY['1350'], 50.6972, 4.9889,
  8900, false, 24, ARRAY['E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25089', 'Ramillies', 'Ramillies', 'ramillies', 'ramillies', ARRAY['1367'], 50.6389, 4.8833,
  6400, false, 25, ARRAY['N91'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25096', 'Rebecq', 'Roosbeek', 'rebecq', 'roosbeek', ARRAY['1430'], 50.6653, 4.1333,
  11000, false, 32, ARRAY['E429'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '25015', 'Braine-le-Château', 'Kasteelbrakel', 'braine-le-chateau', 'kasteelbrakel', ARRAY['1440'], 50.6833, 4.2833,
  10400, false, 30, ARRAY['R0','E19'], true,
  (SELECT id FROM provinces WHERE nis_code = '03'),
  (SELECT id FROM arrondissements WHERE nis_code = '03000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52011', 'Charleroi', 'Charleroi', 'charleroi', 'charleroi', ARRAY['6000','6001','6010','6020','6030','6031','6032','6040','6041','6042','6043','6044','6060','6061'], 50.4108, 4.4446,
  202421, true, 28, ARRAY['R3','E42','A54','E420'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '53053', 'Mons', 'Bergen', 'mons', 'bergen', ARRAY['7000','7011','7012','7020','7021','7022','7024','7030','7031','7032','7033','7034'], 50.4542, 3.9562,
  95299, true, 31, ARRAY['E19','E42','R5'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '57081', 'Tournai', 'Doornik', 'tournai', 'doornik', ARRAY['7500','7501','7502','7503','7504','7520','7521','7522','7530','7531','7532','7533','7534','7536','7540','7542','7543','7548'], 50.6056, 3.3878,
  69554, true, 33, ARRAY['E42','E403','A8'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '54007', 'Mouscron', 'Moeskroen', 'mouscron', 'moeskroen', ARRAY['7700','7711','7712'], 50.7444, 3.2167,
  58234, true, 35, ARRAY['E403','E17'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55022', 'La Louvière', 'La Louvière', 'la-louviere', 'la-louviere', ARRAY['7100','7110'], 50.4794, 4.1856,
  80944, true, 27, ARRAY['E19','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52012', 'Châtelet', 'Châtelet', 'chatelet', 'chatelet', ARRAY['6200'], 50.4042, 4.5283,
  36000, false, 27, ARRAY['R3','N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52015', 'Courcelles', 'Courcelles', 'courcelles', 'courcelles', ARRAY['6180','6181','6182','6183'], 50.4611, 4.3756,
  31300, false, 28, ARRAY['A54','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52021', 'Fleurus', 'Fleurus', 'fleurus', 'fleurus', ARRAY['6220','6221','6222','6223','6224'], 50.4819, 4.5514,
  22700, false, 26, ARRAY['E42','N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52022', 'Fontaine-l’Évêque', 'Fontaine-l’Évêque', 'fontaine-l-eveque', 'fontaine-l-eveque', ARRAY['6140','6141','6142'], 50.4089, 4.3217,
  17800, false, 29, ARRAY['R3','N90'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52055', 'Pont-à-Celles', 'Pont-à-Celles', 'pont-a-celles', 'pont-a-celles', ARRAY['6230','6238'], 50.5111, 4.3625,
  17300, false, 29, ARRAY['A54','N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55004', 'Binche', 'Binche', 'binche', 'binche', ARRAY['7130','7131','7133','7134'], 50.4139, 4.1653,
  33400, false, 28, ARRAY['N55','N90'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55050', 'Soignies', 'Zinnik', 'soignies', 'zinnik', ARRAY['7060','7061','7062','7063'], 50.5778, 4.0722,
  28000, false, 30, ARRAY['N57','N6'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55010', 'Braine-le-Comte', '’s-Gravenbrakel', 'braine-le-comte', 's-gravenbrakel', ARRAY['7090'], 50.6111, 4.1361,
  22000, false, 30, ARRAY['N6'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '51004', 'Ath', 'Aat', 'ath', 'aat', ARRAY['7800','7801','7802','7803','7804','7810','7811','7812','7822','7823'], 50.6306, 3.7778,
  29400, false, 32, ARRAY['A8','N7'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '56078', 'Thuin', 'Thuin', 'thuin', 'thuin', ARRAY['6530','6531','6532','6533','6534','6536'], 50.3389, 4.2861,
  14700, false, 26, ARRAY['N53'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '53070', 'Saint-Ghislain', 'Saint-Ghislain', 'saint-ghislain', 'saint-ghislain', ARRAY['7330','7331','7332','7333','7334'], 50.4472, 3.8194,
  23300, false, 32, ARRAY['E19','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '53014', 'Boussu', 'Boussu', 'boussu', 'boussu', ARRAY['7300','7301'], 50.4333, 3.7958,
  20000, false, 32, ARRAY['N51'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '53065', 'Quaregnon', 'Quaregnon', 'quaregnon', 'quaregnon', ARRAY['7390'], 50.4417, 3.8639,
  19000, false, 31, ARRAY['N51'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '53020', 'Colfontaine', 'Colfontaine', 'colfontaine', 'colfontaine', ARRAY['7340'], 50.4056, 3.8528,
  20700, false, 30, ARRAY['N545'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '53028', 'Frameries', 'Frameries', 'frameries', 'frameries', ARRAY['7080'], 50.4056, 3.8972,
  21900, false, 30, ARRAY['N544'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55085', 'Manage', 'Manage', 'manage', 'manage', ARRAY['7170'], 50.5056, 4.2389,
  23100, false, 27, ARRAY['E19','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55086', 'Morlanwelz', 'Morlanwelz', 'morlanwelz', 'morlanwelz', ARRAY['7140','7141'], 50.4556, 4.2417,
  19100, false, 27, ARRAY['N59'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55040', 'Écaussinnes', 'Écaussinnes', 'ecaussinnes', 'ecaussinnes', ARRAY['7190','7191'], 50.5694, 4.175,
  11100, false, 28, ARRAY['E19'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '55068', 'Seneffe', 'Seneffe', 'seneffe', 'seneffe', ARRAY['7180','7181'], 50.5278, 4.2583,
  11400, false, 27, ARRAY['E19','A54'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52010', 'Chapelle-lez-Herlaimont', 'Chapelle-lez-Herlaimont', 'chapelle-lez-herlaimont', 'chapelle-lez-herlaimont', ARRAY['7160'], 50.4722, 4.2833,
  14700, false, 28, ARRAY['E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52025', 'Gerpinnes', 'Gerpinnes', 'gerpinnes', 'gerpinnes', ARRAY['6280'], 50.3361, 4.5278,
  12700, false, 26, ARRAY['N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52048', 'Montigny-le-Tilleul', 'Montigny-le-Tilleul', 'montigny-le-tilleul', 'montigny-le-tilleul', ARRAY['6110','6111'], 50.3806, 4.3778,
  10100, false, 27, ARRAY['R3'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '52037', 'Ham-sur-Heure-Nalinnes', 'Ham-sur-Heure-Nalinnes', 'ham-sur-heure-nalinnes', 'ham-sur-heure-nalinnes', ARRAY['6120'], 50.3222, 4.3889,
  13600, false, 26, ARRAY['N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '56005', 'Beaumont', 'Beaumont', 'beaumont', 'beaumont', ARRAY['6500'], 50.2361, 4.2361,
  7100, false, 25, ARRAY['N53'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '56016', 'Chimay', 'Chimay', 'chimay', 'chimay', ARRAY['6460','6461','6462','6463','6464'], 50.0472, 4.3139,
  9800, false, 22, ARRAY['N53','N99'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '51065', 'Lessines', 'Lessen', 'lessines', 'lessen', ARRAY['7860','7861','7862','7863','7864','7866'], 50.7111, 3.8306,
  18600, false, 30, ARRAY['A8'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '51067', 'Enghien', 'Edingen', 'enghien', 'edingen', ARRAY['7850'], 50.6944, 4.0417,
  14000, false, 29, ARRAY['A8','E429'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '57050', 'Leuze-en-Hainaut', 'Leuze-en-Hainaut', 'leuze-en-hainaut', 'leuze-en-hainaut', ARRAY['7900','7901','7903','7904','7906'], 50.5972, 3.6194,
  13800, false, 32, ARRAY['A8','N7'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '57064', 'Péruwelz', 'Péruwelz', 'peruwelz', 'peruwelz', ARRAY['7600','7601','7602','7603','7604','7608'], 50.5111, 3.5917,
  17100, false, 33, ARRAY['N60'], true,
  (SELECT id FROM provinces WHERE nis_code = '05'),
  (SELECT id FROM arrondissements WHERE nis_code = '05000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62063', 'Liège', 'Luik', 'liege', 'luik', ARRAY['4000','4020','4030','4031','4032'], 50.6326, 5.5797,
  195278, true, 18, ARRAY['E40','E25','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62096', 'Seraing', 'Seraing', 'seraing', 'seraing', ARRAY['4100','4101','4102'], 50.5972, 5.5056,
  64157, true, 18, ARRAY['A604','N90'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63079', 'Verviers', 'Verviers', 'verviers', 'verviers', ARRAY['4800','4801','4802'], 50.5917, 5.8639,
  55198, true, 15, ARRAY['E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62051', 'Herstal', 'Herstal', 'herstal', 'herstal', ARRAY['4040','4041','4042'], 50.6639, 5.6278,
  40000, true, 19, ARRAY['E25','E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62003', 'Ans', 'Ans', 'ans', 'ans', ARRAY['4430','4431','4432'], 50.6611, 5.5194,
  28500, false, 20, ARRAY['E40','E25'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62038', 'Flémalle', 'Flémalle', 'flemalle', 'flemalle', ARRAY['4400'], 50.5944, 5.4667,
  26300, false, 19, ARRAY['E42','N90'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62047', 'Grâce-Hollogne', 'Grâce-Hollogne', 'grace-hollogne', 'grace-hollogne', ARRAY['4460'], 50.6389, 5.4972,
  22800, false, 20, ARRAY['E42','E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62022', 'Chaudfontaine', 'Chaudfontaine', 'chaudfontaine', 'chaudfontaine', ARRAY['4050','4051','4052','4053'], 50.5889, 5.6417,
  20900, false, 17, ARRAY['N30','E25'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62032', 'Esneux', 'Esneux', 'esneux', 'esneux', ARRAY['4130'], 50.5333, 5.5667,
  13000, false, 16, ARRAY['N633'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62015', 'Beyne-Heusay', 'Beyne-Heusay', 'beyne-heusay', 'beyne-heusay', ARRAY['4610'], 50.6222, 5.6556,
  12000, false, 18, ARRAY['N3'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62039', 'Fléron', 'Fléron', 'fleron', 'fleron', ARRAY['4620','4621','4623','4624'], 50.6222, 5.6833,
  16500, false, 18, ARRAY['N3'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62099', 'Soumagne', 'Soumagne', 'soumagne', 'soumagne', ARRAY['4630','4631','4632','4633'], 50.6111, 5.75,
  17000, false, 17, ARRAY['E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62079', 'Oupeye', 'Oupeye', 'oupeye', 'oupeye', ARRAY['4680','4681','4682','4683','4684'], 50.7083, 5.65,
  25400, false, 20, ARRAY['E25'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62108', 'Visé', 'Wezet', 'vise', 'wezet', ARRAY['4600','4601','4602'], 50.7333, 5.6944,
  17800, false, 21, ARRAY['E25'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63035', 'Herve', 'Herve', 'herve', 'herve', ARRAY['4650','4651','4652','4653','4654'], 50.6417, 5.7944,
  17600, false, 16, ARRAY['E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '61031', 'Huy', 'Hoei', 'huy', 'hoei', ARRAY['4500'], 50.5189, 5.2333,
  21293, true, 22, ARRAY['N90','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '61072', 'Wanze', 'Wanze', 'wanze', 'wanze', ARRAY['4520'], 50.5333, 5.2167,
  13800, false, 22, ARRAY['N90','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '61003', 'Amay', 'Amay', 'amay', 'amay', ARRAY['4540'], 50.5486, 5.3167,
  14400, false, 21, ARRAY['N90'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '64074', 'Waremme', 'Borgworm', 'waremme', 'borgworm', ARRAY['4300'], 50.6972, 5.2556,
  15300, true, 24, ARRAY['E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '64034', 'Hannut', 'Hannuit', 'hannut', 'hannuit', ARRAY['4280'], 50.6694, 5.0778,
  16600, false, 25, ARRAY['E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63072', 'Spa', 'Spa', 'spa', 'spa', ARRAY['4900'], 50.4917, 5.8667,
  10300, false, 8, ARRAY['N62'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63045', 'Malmedy', 'Malmedy', 'malmedy', 'malmedy', ARRAY['4960'], 50.4278, 6.0278,
  12800, false, 6, ARRAY['E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63073', 'Stavelot', 'Stavelot', 'stavelot', 'stavelot', ARRAY['4970'], 50.3944, 5.9306,
  7200, false, 7, ARRAY['N68'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63020', 'Dison', 'Dison', 'dison', 'dison', ARRAY['4820','4821'], 50.6111, 5.85,
  15300, false, 15, ARRAY['E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63058', 'Pepinster', 'Pepinster', 'pepinster', 'pepinster', ARRAY['4860','4861'], 50.5694, 5.8056,
  9700, false, 14, ARRAY['N61'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '63076', 'Theux', 'Theux', 'theux', 'theux', ARRAY['4910'], 50.5333, 5.8167,
  12100, false, 12, ARRAY['E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62006', 'Aywaille', 'Aywaille', 'aywaille', 'aywaille', ARRAY['4920'], 50.4722, 5.675,
  12400, false, 14, ARRAY['E25'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62100', 'Sprimont', 'Sprimont', 'sprimont', 'sprimont', ARRAY['4140','4141'], 50.5056, 5.6611,
  14700, false, 16, ARRAY['E25'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '62070', 'Neupré', 'Neupré', 'neupre', 'neupre', ARRAY['4120','4121','4122'], 50.5333, 5.4833,
  10000, false, 18, ARRAY['N63'], true,
  (SELECT id FROM provinces WHERE nis_code = '06'),
  (SELECT id FROM arrondissements WHERE nis_code = '06000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92094', 'Namur', 'Namen', 'namur', 'namen', ARRAY['5000','5001','5002','5003','5004','5020','5021','5022','5024'], 50.4669, 4.8675,
  111603, true, 25, ARRAY['E411','E42','N4'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92142', 'Gembloux', 'Gembloers', 'gembloux', 'gembloers', ARRAY['5030','5031','5032'], 50.56, 4.6936,
  26014, true, 26, ARRAY['N4','E411'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92137', 'Sambreville', 'Sambreville', 'sambreville', 'sambreville', ARRAY['5060'], 50.4419, 4.6047,
  28317, false, 27, ARRAY['N90','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92003', 'Andenne', 'Andenne', 'andenne', 'andenne', ARRAY['5300'], 50.4889, 5.0972,
  27500, false, 24, ARRAY['N90','E42'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '91034', 'Ciney', 'Ciney', 'ciney', 'ciney', ARRAY['5590'], 50.2953, 5.1006,
  16698, false, 23, ARRAY['N4','E411'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '91054', 'Dinant', 'Dinant', 'dinant', 'dinant', ARRAY['5500'], 50.2589, 4.9122,
  13382, true, 22, ARRAY['N97','N92'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92140', 'Jemeppe-sur-Sambre', 'Jemeppe-sur-Sambre', 'jemeppe-sur-sambre', 'jemeppe-sur-sambre', ARRAY['5190'], 50.4667, 4.6667,
  19100, false, 26, ARRAY['N90'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92048', 'Fosses-la-Ville', 'Fosses-la-Ville', 'fosses-la-ville', 'fosses-la-ville', ARRAY['5070'], 50.3972, 4.6972,
  10400, false, 25, ARRAY['N98'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92045', 'Floreffe', 'Floreffe', 'floreffe', 'floreffe', ARRAY['5150'], 50.4333, 4.75,
  8100, false, 25, ARRAY['N90'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92101', 'Profondeville', 'Profondeville', 'profondeville', 'profondeville', ARRAY['5170'], 50.3778, 4.8694,
  12200, false, 23, ARRAY['N92'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92138', 'Sombreffe', 'Sombreffe', 'sombreffe', 'sombreffe', ARRAY['5140'], 50.5306, 4.6,
  8400, false, 26, ARRAY['N29'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '92035', 'Éghezée', 'Éghezée', 'eghezee', 'eghezee', ARRAY['5310'], 50.5917, 4.9083,
  16500, false, 25, ARRAY['E411','N91'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '91114', 'Rochefort', 'Rochefort', 'rochefort', 'rochefort', ARRAY['5580'], 50.1583, 5.2222,
  12600, false, 20, ARRAY['N86'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '93056', 'Philippeville', 'Philippeville', 'philippeville', 'philippeville', ARRAY['5600'], 50.1972, 4.5444,
  9200, false, 22, ARRAY['N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '93014', 'Couvin', 'Couvin', 'couvin', 'couvin', ARRAY['5660'], 50.05, 4.4944,
  13800, false, 20, ARRAY['N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '93088', 'Walcourt', 'Walcourt', 'walcourt', 'walcourt', ARRAY['5650','5651'], 50.2528, 4.4333,
  18400, false, 24, ARRAY['N5'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '93022', 'Florennes', 'Florennes', 'florennes', 'florennes', ARRAY['5620'], 50.25, 4.6028,
  11300, false, 23, ARRAY['N97'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '91013', 'Beauraing', 'Beauraing', 'beauraing', 'beauraing', ARRAY['5570'], 50.1083, 4.9556,
  9100, false, 20, ARRAY['N40'], true,
  (SELECT id FROM provinces WHERE nis_code = '09'),
  (SELECT id FROM arrondissements WHERE nis_code = '09000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '81001', 'Arlon', 'Aarlen', 'arlon', 'aarlen', ARRAY['6700'], 49.6831, 5.8163,
  30000, true, 22, ARRAY['E411','N4'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '82003', 'Bastogne', 'Bastenaken', 'bastogne', 'bastenaken', ARRAY['6600'], 50.0033, 5.7183,
  16000, true, 14, ARRAY['E25','N4'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '83034', 'Marche-en-Famenne', 'Marche-en-Famenne', 'marche-en-famenne', 'marche-en-famenne', ARRAY['6900'], 50.2272, 5.3442,
  17500, true, 18, ARRAY['N4','N63'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84077', 'Virton', 'Virton', 'virton', 'virton', ARRAY['6760'], 49.5678, 5.5333,
  11400, true, 20, ARRAY['N88'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84043', 'Neufchâteau', 'Neufchâteau', 'neufchateau', 'neufchateau', ARRAY['6840'], 49.8406, 5.4347,
  7800, true, 16, ARRAY['E411'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84035', 'Libramont-Chevigny', 'Libramont-Chevigny', 'libramont-chevigny', 'libramont-chevigny', ARRAY['6800'], 49.9167, 5.3833,
  11300, false, 15, ARRAY['E411','N89'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '83012', 'Durbuy', 'Durbuy', 'durbuy', 'durbuy', ARRAY['6940','6941'], 50.3528, 5.4561,
  11400, false, 16, ARRAY['N63'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '81004', 'Aubange', 'Aubange', 'aubange', 'aubange', ARRAY['6790','6791','6792'], 49.5667, 5.8056,
  17000, false, 24, ARRAY['A28','E411'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84010', 'Bouillon', 'Bouillon', 'bouillon', 'bouillon', ARRAY['6830','6831','6832'], 49.7944, 5.0681,
  5400, false, 12, ARRAY['N89'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84050', 'Paliseul', 'Paliseul', 'paliseul', 'paliseul', ARRAY['6850'], 49.9056, 5.1361,
  5300, false, 13, ARRAY['N89'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84009', 'Bertrix', 'Bertrix', 'bertrix', 'bertrix', ARRAY['6880'], 49.8556, 5.2528,
  8800, false, 14, ARRAY['N89'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '82036', 'Vielsalm', 'Vielsalm', 'vielsalm', 'vielsalm', ARRAY['6690'], 50.2861, 5.9194,
  7800, false, 10, ARRAY['N68'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84029', 'Habay', 'Habay', 'habay', 'habay', ARRAY['6720','6723','6724'], 49.7333, 5.6528,
  8500, false, 18, ARRAY['E411'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '84016', 'Florenville', 'Florenville', 'florenville', 'florenville', ARRAY['6820'], 49.7, 5.3111,
  5600, false, 17, ARRAY['N88'], true,
  (SELECT id FROM provinces WHERE nis_code = '08'),
  (SELECT id FROM arrondissements WHERE nis_code = '08000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23094', 'Vilvorde', 'Vilvoorde', 'vilvorde', 'vilvoorde', ARRAY['1800'], 50.9308, 4.4319,
  45000, true, 33, ARRAY['R0','E19'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23102', 'Zaventem', 'Zaventem', 'zaventem', 'zaventem', ARRAY['1930','1932'], 50.8833, 4.4667,
  34000, true, 30, ARRAY['R0','E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23039', 'Kraainem', 'Kraainem', 'kraainem', 'kraainem', ARRAY['1950'], 50.8667, 4.4667,
  13700, false, 29, ARRAY['R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23100', 'Wezembeek-Oppem', 'Wezembeek-Oppem', 'wezembeek-oppem', 'wezembeek-oppem', ARRAY['1970'], 50.8417, 4.4944,
  14400, false, 29, ARRAY['R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23088', 'Tervuren', 'Tervuren', 'tervuren', 'tervuren', ARRAY['3080'], 50.825, 4.5139,
  22600, false, 28, ARRAY['R0','N3'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23062', 'Overijse', 'Overijse', 'overijse', 'overijse', ARRAY['3090'], 50.7806, 4.5361,
  25500, false, 27, ARRAY['E411'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23033', 'Hoeilaart', 'Hoeilaart', 'hoeilaart', 'hoeilaart', ARRAY['1560'], 50.7667, 4.4667,
  11400, false, 28, ARRAY['R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23012', 'Drogenbos', 'Drogenbos', 'drogenbos', 'drogenbos', ARRAY['1620'], 50.7889, 4.3167,
  5700, false, 30, ARRAY['R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23044', 'Linkebeek', 'Linkebeek', 'linkebeek', 'linkebeek', ARRAY['1630'], 50.7722, 4.3361,
  4700, false, 29, ARRAY['R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23101', 'Rhode-Saint-Genèse', 'Sint-Genesius-Rode', 'rhode-saint-genese', 'sint-genesius-rode', ARRAY['1640'], 50.7444, 4.3583,
  18500, false, 28, ARRAY['N5','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23103', 'Wemmel', 'Wemmel', 'wemmel', 'wemmel', ARRAY['1780'], 50.9083, 4.3,
  16700, false, 30, ARRAY['R0','A12'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23025', 'Grimbergen', 'Grimbergen', 'grimbergen', 'grimbergen', ARRAY['1850','1851','1852'], 50.9333, 4.3667,
  38000, false, 32, ARRAY['R0','A12'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23047', 'Machelen', 'Machelen', 'machelen', 'machelen', ARRAY['1830'], 50.9139, 4.4361,
  15400, false, 31, ARRAY['R0','E19'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23086', 'Steenokkerzeel', 'Steenokkerzeel', 'steenokkerzeel', 'steenokkerzeel', ARRAY['1820'], 50.9167, 4.5167,
  12100, false, 30, ARRAY['E19','N21'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23038', 'Kortenberg', 'Kortenberg', 'kortenberg', 'kortenberg', ARRAY['3070','3071','3078'], 50.8861, 4.5889,
  20300, false, 29, ARRAY['E40','N2'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23002', 'Asse', 'Asse', 'asse', 'asse', ARRAY['1730','1731'], 50.9111, 4.1972,
  33800, false, 31, ARRAY['N9','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23016', 'Dilbeek', 'Dilbeek', 'dilbeek', 'dilbeek', ARRAY['1700','1701','1702','1703'], 50.8472, 4.2611,
  43400, false, 30, ARRAY['R0','N8'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23027', 'Hal', 'Halle', 'hal', 'halle', ARRAY['1500','1501','1502'], 50.7361, 4.2333,
  40000, true, 32, ARRAY['E19','R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23003', 'Beersel', 'Beersel', 'beersel', 'beersel', ARRAY['1650','1651','1652','1653','1654'], 50.7667, 4.3,
  25400, false, 30, ARRAY['R0'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23077', 'Leeuw-Saint-Pierre', 'Sint-Pieters-Leeuw', 'leeuw-saint-pierre', 'sint-pieters-leeuw', ARRAY['1600','1601','1602'], 50.7806, 4.2444,
  34600, false, 31, ARRAY['R0','N6'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23052', 'Meise', 'Meise', 'meise', 'meise', ARRAY['1860','1861'], 50.9417, 4.325,
  19400, false, 31, ARRAY['A12'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23049', 'Merchtem', 'Merchtem', 'merchtem', 'merchtem', ARRAY['1785'], 50.9583, 4.2333,
  16500, false, 32, ARRAY['N211'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '24062', 'Louvain', 'Leuven', 'louvain', 'leuven', ARRAY['3000','3001','3010','3012','3018'], 50.8798, 4.7005,
  102126, true, 27, ARRAY['E40','E314'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '24038', 'Herent', 'Herent', 'herent', 'herent', ARRAY['3020'], 50.9083, 4.6722,
  22000, false, 28, ARRAY['N26'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '24009', 'Bertem', 'Bertem', 'bertem', 'bertem', ARRAY['3060'], 50.8639, 4.6278,
  10000, false, 27, ARRAY['E40'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

INSERT INTO communes (
  nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude,
  population, is_major_hub, water_hardness_fh, transit_axes, is_active,
  province_id, arrondissement_id
) VALUES (
  '23032', 'Huldenberg', 'Huldenberg', 'huldenberg', 'huldenberg', ARRAY['3040'], 50.7889, 4.5806,
  9900, false, 26, ARRAY['N253'], true,
  (SELECT id FROM provinces WHERE nis_code = '20'),
  (SELECT id FROM arrondissements WHERE nis_code = '23000')
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

-- 4. Sync pseo_pages for all active communes
INSERT INTO pseo_pages (commune_id, full_slug, page_type, is_published, is_indexed)
SELECT id, 'chauffagiste-' || slug_fr, 'commune', true, true
FROM communes
WHERE is_active = true
ON CONFLICT DO NOTHING;
