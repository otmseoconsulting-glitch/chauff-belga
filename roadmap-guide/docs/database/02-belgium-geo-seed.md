# 02 — Belgium Geo Seed Data
# Provinces, Arrondissements & Key Commune Inserts
# Project: Chauffagiste-Belga
# Migration file: `supabase/migrations/20260101000001_geo_seed.sql`

---

## §1. Seeding Strategy

| Dataset | Method | Count |
|---------|--------|-------|
| Provinces | SQL INSERT (this file) | 11 |
| Arrondissements | SQL INSERT (this file) | 14 shown (43 total) |
| Key communes | SQL INSERT (this file) | 29 shown |
| All 580+ communes | CSV import `supabase/seed/03_communes.csv` | 580+ |
| pSEO page stubs | SQL (Brussels sample) | 19 × 8 = 152 pages |

---

## §2. Geo Seed SQL

```sql
-- ============================================================
-- Chauffagiste-Belga: Belgian Geographic Seed Data
-- Migration: 20260101000001_geo_seed
-- Contains: 11 provinces, sample arrondissements & communes
-- Full dataset: 580+ communes loaded via CSV import
-- ============================================================

-- ============================================================
-- PROVINCES (11 total including Brussels-Capital)
-- ============================================================

INSERT INTO provinces (nis_code, name_fr, name_nl, slug_fr, slug_nl, region, capital_fr, latitude, longitude) VALUES
-- Brussels-Capital Region
('04', 'Bruxelles-Capitale',     'Brussel Hoofdstedelijk Gewest', 'bruxelles-capitale',   'brussel-hoofdstedelijk-gewest', 'brussels',  'Bruxelles',   50.8503, 4.3517),
-- Wallonia
('05', 'Hainaut',                'Henegouwen',                    'hainaut',               'henegouwen',                   'wallonia',  'Mons',        50.4542, 3.9562),
('06', 'Liège',                  'Luik',                          'liege',                 'luik',                         'wallonia',  'Liège',       50.6326, 5.5797),
('08', 'Luxembourg',             'Luxemburg',                     'luxembourg',             'luxemburg',                    'wallonia',  'Arlon',       49.6831, 5.8163),
('09', 'Namur',                  'Namen',                         'namur',                 'namen',                        'wallonia',  'Namur',       50.4669, 4.8675),
('03', 'Brabant wallon',         'Waals-Brabant',                 'brabant-wallon',         'waals-brabant',                'wallonia',  'Wavre',       50.7175, 4.6122),
-- Flanders
('01', 'Anvers',                 'Antwerpen',                     'anvers',                'antwerpen',                    'flanders',  'Anvers',      51.2213, 4.4051),
('02', 'Flandre orientale',      'Oost-Vlaanderen',               'flandre-orientale',      'oost-vlaanderen',              'flanders',  'Gand',        51.0543, 3.7174),
('10', 'Flandre occidentale',    'West-Vlaanderen',               'flandre-occidentale',    'west-vlaanderen',              'flanders',  'Bruges',      51.2093, 3.2247),
('07', 'Limbourg',               'Limburg',                       'limbourg',              'limburg',                      'flanders',  'Hasselt',     50.9311, 5.3378),
('20', 'Brabant flamand',        'Vlaams-Brabant',                'brabant-flamand',        'vlaams-brabant',               'flanders',  'Louvain',     50.8798, 4.7005);

-- ============================================================
-- ARRONDISSEMENTS (14 shown — 43 total in full dataset)
-- ============================================================

INSERT INTO arrondissements (nis_code, name_fr, name_nl, slug_fr, slug_nl, province_id) VALUES
-- Brussels-Capital
('04000', 'Bruxelles',          'Brussel',           'bruxelles',          'brussel',
  (SELECT id FROM provinces WHERE nis_code = '04')),
-- Hainaut
('05000', 'Charleroi',          'Charleroi',         'charleroi',          'charleroi',
  (SELECT id FROM provinces WHERE nis_code = '05')),
('05100', 'Mons',               'Bergen',            'mons',               'bergen',
  (SELECT id FROM provinces WHERE nis_code = '05')),
('05200', 'Tournai',            'Doornik',           'tournai',            'doornik',
  (SELECT id FROM provinces WHERE nis_code = '05')),
('05300', 'Mouscron',           'Moeskroen',         'mouscron',           'moeskroen',
  (SELECT id FROM provinces WHERE nis_code = '05')),
-- Liège
('06000', 'Liège',              'Luik',              'liege',              'luik',
  (SELECT id FROM provinces WHERE nis_code = '06')),
('06100', 'Huy',                'Hoei',              'huy',                'hoei',
  (SELECT id FROM provinces WHERE nis_code = '06')),
('06200', 'Verviers',           'Verviers',          'verviers',           'verviers',
  (SELECT id FROM provinces WHERE nis_code = '06')),
-- Namur
('09000', 'Namur',              'Namen',             'namur',              'namen',
  (SELECT id FROM provinces WHERE nis_code = '09')),
('09100', 'Dinant',             'Dinant',            'dinant',             'dinant',
  (SELECT id FROM provinces WHERE nis_code = '09')),
-- Brabant wallon
('03000', 'Nivelles',           'Nijvel',            'nivelles',           'nijvel',
  (SELECT id FROM provinces WHERE nis_code = '03')),
-- Antwerp
('01000', 'Anvers',             'Antwerpen',         'anvers-arr',         'antwerpen-arr',
  (SELECT id FROM provinces WHERE nis_code = '01')),
('01100', 'Malines',            'Mechelen',          'malines',            'mechelen',
  (SELECT id FROM provinces WHERE nis_code = '01')),
-- East Flanders
('02000', 'Gand',               'Gent',              'gand',               'gent',
  (SELECT id FROM provinces WHERE nis_code = '02'));

-- ============================================================
-- COMMUNES — Brussels-Capital Region (all 19)
-- ============================================================

INSERT INTO communes (nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude, province_id, arrondissement_id, population) VALUES
('21004', 'Bruxelles',              'Brussel',                'bruxelles',              'brussel',                ARRAY['1000','1020','1120','1130'], 50.8503, 4.3517, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 185103),
('21001', 'Anderlecht',             'Anderlecht',             'anderlecht',             'anderlecht',             ARRAY['1070'],                     50.8364, 4.3074, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 120455),
('21009', 'Ixelles',                'Elsene',                 'ixelles',                'elsene',                 ARRAY['1050'],                     50.8236, 4.3726, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 89120),
('21013', 'Schaerbeek',             'Schaarbeek',             'schaerbeek',             'schaarbeek',             ARRAY['1030'],                     50.8675, 4.3789, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 133657),
('21015', 'Molenbeek-Saint-Jean',   'Sint-Jans-Molenbeek',   'molenbeek-saint-jean',   'sint-jans-molenbeek',   ARRAY['1080'],                     50.8523, 4.3222, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 98671),
('21008', 'Etterbeek',              'Etterbeek',              'etterbeek',              'etterbeek',              ARRAY['1040'],                     50.8328, 4.3878, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 48062),
('21003', 'Forest',                 'Vorst',                  'forest',                 'vorst',                  ARRAY['1190'],                     50.8156, 4.3397, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 56040),
('21005', 'Uccle',                  'Ukkel',                  'uccle',                  'ukkel',                  ARRAY['1180'],                     50.7985, 4.3625, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 83703),
('21012', 'Saint-Gilles',           'Sint-Gillis',            'saint-gilles',           'sint-gillis',            ARRAY['1060'],                     50.8273, 4.3436, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 50165),
('21014', 'Woluwe-Saint-Lambert',   'Sint-Lambrechts-Woluwe', 'woluwe-saint-lambert',  'sint-lambrechts-woluwe', ARRAY['1200'],                     50.8491, 4.4234, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 58175),
('21018', 'Woluwe-Saint-Pierre',    'Sint-Pieters-Woluwe',   'woluwe-saint-pierre',    'sint-pieters-woluwe',   ARRAY['1150'],                     50.8351, 4.4368, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 41927),
('21002', 'Auderghem',              'Oudergem',               'auderghem',              'oudergem',               ARRAY['1160'],                     50.8199, 4.4321, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 35090),
('21016', 'Watermael-Boitsfort',    'Watermaal-Bosvoorde',   'watermael-boitsfort',    'watermaal-bosvoorde',   ARRAY['1170'],                     50.7989, 4.4213, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 24748),
('21006', 'Ganshoren',              'Ganshoren',              'ganshoren',              'ganshoren',              ARRAY['1083'],                     50.8706, 4.3094, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 24718),
('21007', 'Jette',                  'Jette',                  'jette',                  'jette',                  ARRAY['1090'],                     50.8795, 4.3241, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 51829),
('21010', 'Koekelberg',             'Koekelberg',             'koekelberg',             'koekelberg',             ARRAY['1081'],                     50.8640, 4.3288, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 22153),
('21011', 'Laeken',                 'Laken',                  'laeken',                 'laken',                  ARRAY['1020'],                     50.8897, 4.3531, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 45000),
('21017', 'Berchem-Sainte-Agathe', 'Sint-Agatha-Berchem',   'berchem-sainte-agathe',  'sint-agatha-berchem',   ARRAY['1082'],                     50.8717, 4.2969, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 24894),
('21019', 'Saint-Josse-ten-Noode', 'Sint-Joost-ten-Node',   'saint-josse-ten-noode',  'sint-joost-ten-node',   ARRAY['1210'],                     50.8555, 4.3699, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 27144),

-- ============================================================
-- COMMUNES — Major Walloon Cities
-- ============================================================
('62063', 'Liège',      'Luik',      'liege-ville',  'luik-stad',    ARRAY['4000','4020','4030'], 50.6326, 5.5797, (SELECT id FROM provinces WHERE nis_code = '06'), (SELECT id FROM arrondissements WHERE nis_code = '06000'), 197386),
('92094', 'Namur',      'Namen',     'namur-ville',  'namen-stad',   ARRAY['5000','5001','5020'], 50.4669, 4.8675, (SELECT id FROM provinces WHERE nis_code = '09'), (SELECT id FROM arrondissements WHERE nis_code = '09000'), 113296),
('52011', 'Charleroi',  'Charleroi', 'charleroi',    'charleroi',    ARRAY['6000','6001','6010'], 50.4109, 4.4444, (SELECT id FROM provinces WHERE nis_code = '05'), (SELECT id FROM arrondissements WHERE nis_code = '05000'), 201555),
('55022', 'Mons',       'Bergen',    'mons',         'bergen',       ARRAY['7000','7012'],        50.4542, 3.9562, (SELECT id FROM provinces WHERE nis_code = '05'), (SELECT id FROM arrondissements WHERE nis_code = '05100'), 96994),
('25112', 'Wavre',      'Waver',     'wavre',        'waver',        ARRAY['1300'],               50.7175, 4.6122, (SELECT id FROM provinces WHERE nis_code = '03'), (SELECT id FROM arrondissements WHERE nis_code = '03000'), 33801),

-- ============================================================
-- COMMUNES — Major Flemish Cities
-- ============================================================
('11002', 'Anvers',  'Antwerpen', 'anvers-ville', 'antwerpen-stad', ARRAY['2000','2018','2020'], 51.2213, 4.4051, (SELECT id FROM provinces WHERE nis_code = '01'), (SELECT id FROM arrondissements WHERE nis_code = '01000'), 530504),
('44021', 'Gand',    'Gent',      'gand',         'gent',           ARRAY['9000','9030','9032'], 51.0543, 3.7174, (SELECT id FROM provinces WHERE nis_code = '02'), (SELECT id FROM arrondissements WHERE nis_code = '02000'), 263927),
('31005', 'Bruges',  'Brugge',    'bruges',       'brugge',         ARRAY['8000','8200'],        51.2093, 3.2247, (SELECT id FROM provinces WHERE nis_code = '10'), NULL, 118704),
('71022', 'Hasselt', 'Hasselt',   'hasselt',      'hasselt',        ARRAY['3500'],               50.9311, 5.3378, (SELECT id FROM provinces WHERE nis_code = '07'), NULL, 80066),
('24062', 'Louvain', 'Leuven',    'louvain',      'leuven',         ARRAY['3000','3001'],        50.8798, 4.7005, (SELECT id FROM provinces WHERE nis_code = '20'), NULL, 103293);

-- ============================================================
-- SERVICE CATEGORIES (8 core services)
-- ============================================================

INSERT INTO service_categories (slug, name_fr, name_nl, short_desc_fr, short_desc_nl, price_from, is_emergency, priority_order) VALUES
('depannage-chaudiere',    'Dépannage chaudière',     'Herstelling verwarmingsketel', 'Panne, fuite, perte de pression',                       'Pech, lek, drukprobleem',                     65,  true,  1),
('entretien-chaudiere',    'Entretien chaudière',     'Onderhoud verwarmingsketel',   'Plus de performance, moins de pannes',                   'Betere prestaties, minder storingen',         99,  false, 2),
('installation-chauffage', 'Installation chauffage',  'Installatie verwarming',       'Chaudières, radiateurs, pompes à chaleur',               'Ketels, radiatoren, warmtepompen',            350, false, 3),
('reparation-chaudiere',   'Réparation chaudière',    'Reparatie verwarmingsketel',   'Toutes marques',                                         'Alle merken',                                 85,  false, 4),
('regulation-thermostat',  'Régulation & thermostat', 'Regeling & thermostaat',       'Confort et économies d''énergie',                        'Comfort en energiebesparing',                 120, false, 5),
('chauffage-sol',          'Chauffage au sol',        'Vloerverwarming',              'Installation et entretien',                              'Installatie en onderhoud',                    200, false, 6),
('pompe-chaleur',          'Pompe à chaleur',         'Warmtepomp',                   'Solutions performantes pour réduire votre consommation', 'Performante oplossingen voor lager verbruik', 800, false, 7),
('debouchage',             'Débouchage',              'Ontstopping',                  'Canalisations, évacuations, WC',                         'Leidingen, afvoeren, toilet',                 75,  true,  8);

-- ============================================================
-- PSEO PAGE STUBS — Brussels communes (sample)
-- Full generation is programmatic at build time
-- ============================================================

-- Commune-level pages
INSERT INTO pseo_pages (commune_id, service_slug, full_slug, page_type, is_published)
SELECT c.id, NULL, 'chauffagiste-' || c.slug_fr, 'commune', true
FROM communes c
WHERE c.province_id = (SELECT id FROM provinces WHERE nis_code = '04')
ON CONFLICT (commune_id, service_slug) DO NOTHING;

-- Service × commune pages for Brussels
INSERT INTO pseo_pages (commune_id, service_slug, full_slug, page_type, is_published)
SELECT c.id, s.slug, s.slug || '-' || c.slug_fr, 'service_commune', true
FROM communes c
CROSS JOIN service_categories s
WHERE c.province_id = (SELECT id FROM provinces WHERE nis_code = '04')
  AND c.is_active = true AND s.is_active = true
ON CONFLICT (commune_id, service_slug) DO NOTHING;
```

---

## §3. Slug Conflict Notes

| Commune | Auto-Slug | Conflict With | Resolved Slug |
|---------|-----------|--------------|--------------|
| Liège (city) | `liege` | Province slug `liege` | `liege-ville` |
| Namur (city) | `namur` | Province slug `namur` | `namur-ville` |
| Anvers (city) | `anvers` | Province slug `anvers` | `anvers-ville` |

Disambiguated slugs are hardcoded in this seed file and must match `communes.slug_fr` exactly.
