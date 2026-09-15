-- ============================================================
-- Chauffagiste-Belga: Belgian Geographic Seed Data
-- Migration: 20260101000001_geo_seed
-- Contains: 11 provinces, sample arrondissements & communes
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
('20', 'Brabant flamand',        'Vlaams-Brabant',                'brabant-flamand',        'vlaams-brabant',               'flanders',  'Louvain',     50.8798, 4.7005)
ON CONFLICT (nis_code) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  slug_fr = EXCLUDED.slug_fr;

-- ============================================================
-- ARRONDISSEMENTS (Sample)
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
  (SELECT id FROM provinces WHERE nis_code = '02'))
ON CONFLICT (nis_code) DO NOTHING;

-- ============================================================
-- COMMUNES — Brussels-Capital Region (all 19)
-- ============================================================

INSERT INTO communes (nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude, province_id, arrondissement_id, population, is_major_hub) VALUES
('21004', 'Bruxelles',              'Brussel',                'bruxelles',              'brussel',                ARRAY['1000','1020','1120','1130'], 50.8503, 4.3517, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 185103, true),
('21001', 'Anderlecht',             'Anderlecht',             'anderlecht',             'anderlecht',             ARRAY['1070'],                     50.8364, 4.3074, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 120455, true),
('21009', 'Ixelles',                'Elsene',                 'ixelles',                'elsene',                 ARRAY['1050'],                     50.8236, 4.3726, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 89120, true),
('21013', 'Schaerbeek',             'Schaarbeek',             'schaerbeek',             'schaarbeek',             ARRAY['1030'],                     50.8675, 4.3789, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 133657, true),
('21015', 'Molenbeek-Saint-Jean',   'Sint-Jans-Molenbeek',   'molenbeek-saint-jean',   'sint-jans-molenbeek',   ARRAY['1080'],                     50.8523, 4.3222, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 98671, false),
('21008', 'Etterbeek',              'Etterbeek',              'etterbeek',              'etterbeek',              ARRAY['1040'],                     50.8328, 4.3878, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 48062, false),
('21003', 'Forest',                 'Vorst',                  'forest',                 'vorst',                  ARRAY['1190'],                     50.8156, 4.3397, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 56040, false),
('21005', 'Uccle',                  'Ukkel',                  'uccle',                  'ukkel',                  ARRAY['1180'],                     50.7985, 4.3625, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 83703, true),
('21012', 'Saint-Gilles',           'Sint-Gillis',            'saint-gilles',           'sint-gillis',            ARRAY['1060'],                     50.8273, 4.3436, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 50165, false),
('21014', 'Woluwe-Saint-Lambert',   'Sint-Lambrechts-Woluwe', 'woluwe-saint-lambert',  'sint-lambrechts-woluwe', ARRAY['1200'],                     50.8491, 4.4234, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 58175, false),
('21018', 'Woluwe-Saint-Pierre',    'Sint-Pieters-Woluwe',   'woluwe-saint-pierre',    'sint-pieters-woluwe',   ARRAY['1150'],                     50.8351, 4.4368, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 41927, false),
('21002', 'Auderghem',              'Oudergem',               'auderghem',              'oudergem',               ARRAY['1160'],                     50.8199, 4.4321, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 35090, false),
('21016', 'Watermael-Boitsfort',    'Watermaal-Bosvoorde',   'watermael-boitsfort',    'watermaal-bosvoorde',   ARRAY['1170'],                     50.7989, 4.4213, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 24748, false),
('21006', 'Ganshoren',              'Ganshoren',              'ganshoren',              'ganshoren',              ARRAY['1083'],                     50.8706, 4.3094, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 24718, false),
('21007', 'Jette',                  'Jette',                  'jette',                  'jette',                  ARRAY['1090'],                     50.8795, 4.3241, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 51829, false),
('21010', 'Koekelberg',             'Koekelberg',             'koekelberg',             'koekelberg',             ARRAY['1081'],                     50.8640, 4.3288, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 22153, false),
('21011', 'Laeken',                 'Laken',                  'laeken',                 'laken',                  ARRAY['1020'],                     50.8897, 4.3531, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 45000, false),
('21017', 'Berchem-Sainte-Agathe', 'Sint-Agatha-Berchem',   'berchem-sainte-agathe',  'sint-agatha-berchem',   ARRAY['1082'],                     50.8717, 4.2969, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 24894, false),
('21019', 'Saint-Josse-ten-Noode', 'Sint-Joost-ten-Node',   'saint-josse-ten-noode',  'sint-joost-ten-node',   ARRAY['1210'],                     50.8555, 4.3699, (SELECT id FROM provinces WHERE nis_code = '04'), (SELECT id FROM arrondissements WHERE nis_code = '04000'), 27144, false)
ON CONFLICT (nis_code) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  slug_fr = EXCLUDED.slug_fr,
  postal_codes = EXCLUDED.postal_codes;

-- ============================================================
-- COMMUNES — Major Walloon Cities
-- ============================================================
INSERT INTO communes (nis_code, name_fr, name_nl, slug_fr, slug_nl, postal_codes, latitude, longitude, province_id, arrondissement_id, population, is_major_hub) VALUES
('62063', 'Liège',      'Luik',      'liege',        'luik-stad',    ARRAY['4000','4020','4030'], 50.6326, 5.5797, (SELECT id FROM provinces WHERE nis_code = '06'), (SELECT id FROM arrondissements WHERE nis_code = '06000'), 197386, true),
('92094', 'Namur',      'Namen',     'namur',        'namen-stad',   ARRAY['5000','5001','5020'], 50.4669, 4.8675, (SELECT id FROM provinces WHERE nis_code = '09'), (SELECT id FROM arrondissements WHERE nis_code = '09000'), 113296, true),
('52011', 'Charleroi',  'Charleroi', 'charleroi',    'charleroi',    ARRAY['6000','6001','6010'], 50.4109, 4.4444, (SELECT id FROM provinces WHERE nis_code = '05'), (SELECT id FROM arrondissements WHERE nis_code = '05000'), 201555, true),
('55022', 'Mons',       'Bergen',    'mons',         'bergen',       ARRAY['7000','7012'],        50.4542, 3.9562, (SELECT id FROM provinces WHERE nis_code = '05'), (SELECT id FROM arrondissements WHERE nis_code = '05100'), 96994, true),
('25112', 'Wavre',      'Waver',     'wavre',        'waver',        ARRAY['1300'],               50.7175, 4.6122, (SELECT id FROM provinces WHERE nis_code = '03'), (SELECT id FROM arrondissements WHERE nis_code = '03000'), 33801, true)
ON CONFLICT (nis_code) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  slug_fr = EXCLUDED.slug_fr,
  postal_codes = EXCLUDED.postal_codes;

-- ============================================================
-- SERVICE CATEGORIES (8 core services)
-- ============================================================

INSERT INTO service_categories (slug, name_fr, name_nl, short_desc_fr, short_desc_nl, icon_name, price_from, is_emergency, priority_order) VALUES
('depannage-chaudiere',    'Dépannage chaudière',     'Herstelling verwarmingsketel', 'Panne, fuite, perte de pression',                       'Pech, lek, drukprobleem',                     'Flame',        65,  true,  1),
('entretien-chaudiere',    'Entretien chaudière',     'Onderhoud verwarmingsketel',   'Plus de performance, moins de pannes',                   'Betere prestaties, minder storingen',         'CheckCircle2', 99,  false, 2),
('installation-chauffage', 'Installation chauffage',  'Installatie verwarming',       'Chaudières, radiateurs, pompes à chaleur',               'Ketels, radiatoren, warmtepompen',            'Wrench',       350, false, 3),
('reparation-chaudiere',   'Réparation chaudière',    'Reparatie verwarmingsketel',   'Toutes marques',                                         'Alle merken',                                 'Hammer',       85,  false, 4),
('regulation-thermostat',  'Régulation & thermostat', 'Regeling & thermostaat',       'Confort et économies d''énergie',                        'Comfort en energiebesparing',                 'Gauge',        120, false, 5),
('chauffage-sol',          'Chauffage au sol',        'Vloerverwarming',              'Installation et entretien',                              'Installatie en onderhoud',                    'Layers',       200, false, 6),
('pompe-chaleur',          'Pompe à chaleur',         'Warmtepomp',                   'Solutions performantes pour réduire votre consommation', 'Performante oplossingen voor lager verbruik', 'Zap',          800, false, 7),
('debouchage',             'Débouchage',              'Ontstopping',                  'Canalisations, évacuations, WC',                         'Leidingen, afvoeren, toilet',                 'Droplets',     75,  true,  8)
ON CONFLICT (slug) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  icon_name = EXCLUDED.icon_name,
  price_from = EXCLUDED.price_from;

-- ============================================================
-- PSEO PAGE STUBS (Commune-level pages)
-- ============================================================

INSERT INTO pseo_pages (commune_id, service_slug, full_slug, page_type, is_published)
SELECT c.id, NULL, 'chauffagiste-' || c.slug_fr, 'commune', true
FROM communes c
WHERE c.is_active = true
ON CONFLICT (commune_id, service_slug) DO NOTHING;
