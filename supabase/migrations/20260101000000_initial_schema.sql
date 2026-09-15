-- ============================================================
-- Chauffagiste-Belga: Production Database Schema
-- Migration: 20260101000000_initial_schema
-- Database: Supabase PostgreSQL 15+
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";  -- For geo proximity queries

-- ============================================================
-- UTILITY: Auto-update updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TABLE: provinces
-- Belgium has 10 provinces + Brussels-Capital Region (11 total)
-- ============================================================

CREATE TABLE IF NOT EXISTS provinces (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nis_code        CHAR(2) NOT NULL UNIQUE,   -- 2-digit NIS province code (e.g., '04' = Brussels)
  name_fr         TEXT NOT NULL,             -- French name
  name_nl         TEXT NOT NULL,             -- Dutch name
  name_de         TEXT,                      -- German name (for eastern cantons)
  slug_fr         TEXT NOT NULL UNIQUE,      -- URL slug in French
  slug_nl         TEXT NOT NULL UNIQUE,      -- URL slug in Dutch
  region          TEXT NOT NULL              -- 'brussels' | 'wallonia' | 'flanders'
                  CHECK (region IN ('brussels', 'wallonia', 'flanders')),
  capital_fr      TEXT,                      -- Province capital city (French)
  latitude        FLOAT,                     -- Geographic center latitude
  longitude       FLOAT,                     -- Geographic center longitude
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_provinces_updated_at ON provinces;
CREATE TRIGGER trigger_provinces_updated_at
  BEFORE UPDATE ON provinces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE: arrondissements
-- 43 Belgian arrondissements (judicial/administrative divisions)
-- ============================================================

CREATE TABLE IF NOT EXISTS arrondissements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nis_code        CHAR(5) NOT NULL UNIQUE,   -- 5-digit NIS code
  name_fr         TEXT NOT NULL,
  name_nl         TEXT NOT NULL,
  slug_fr         TEXT NOT NULL UNIQUE,
  slug_nl         TEXT NOT NULL UNIQUE,
  province_id     UUID NOT NULL REFERENCES provinces(id) ON DELETE RESTRICT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_arrondissements_province_id ON arrondissements(province_id);

DROP TRIGGER IF EXISTS trigger_arrondissements_updated_at ON arrondissements;
CREATE TRIGGER trigger_arrondissements_updated_at
  BEFORE UPDATE ON arrondissements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE: communes
-- 580+ Belgian municipalities (communes/gemeenten)
-- Single source of truth for all geo data
-- ============================================================

CREATE TABLE IF NOT EXISTS communes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nis_code            CHAR(5) NOT NULL UNIQUE,     -- Official 5-digit NIS/INS code
  name_fr             TEXT NOT NULL,                -- Official French name
  name_nl             TEXT NOT NULL,                -- Official Dutch name
  name_de             TEXT,                         -- German name (eastern cantons only)
  slug_fr             TEXT NOT NULL UNIQUE,         -- pSEO URL slug (French)
  slug_nl             TEXT NOT NULL UNIQUE,         -- pSEO URL slug (Dutch)
  postal_codes        TEXT[] NOT NULL DEFAULT '{}', -- Array of 4-digit postal codes
  latitude            FLOAT NOT NULL,               -- Geographic centroid
  longitude           FLOAT NOT NULL,               -- Geographic centroid
  province_id         UUID NOT NULL REFERENCES provinces(id) ON DELETE RESTRICT,
  arrondissement_id   UUID REFERENCES arrondissements(id) ON DELETE SET NULL,
  population          INTEGER,                      -- Latest census population
  area_km2            FLOAT,                        -- Surface area in km²
  is_major_hub        BOOLEAN NOT NULL DEFAULT false, -- Authority Hub vs Dispatch Page
  water_hardness_fh   INTEGER DEFAULT 28,           -- Water hardness in French degrees
  transit_axes        TEXT[] DEFAULT '{}',          -- Major roads/highways
  is_active           BOOLEAN NOT NULL DEFAULT true, -- Include in pSEO generation
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for pSEO URL resolution (most critical queries)
CREATE UNIQUE INDEX IF NOT EXISTS idx_communes_slug_fr ON communes(slug_fr);
CREATE UNIQUE INDEX IF NOT EXISTS idx_communes_slug_nl ON communes(slug_nl);
CREATE UNIQUE INDEX IF NOT EXISTS idx_communes_nis_code ON communes(nis_code);

-- GIN index for postal code array containment queries
CREATE INDEX IF NOT EXISTS idx_communes_postal_codes ON communes USING GIN(postal_codes);

-- B-tree indexes for foreign key joins
CREATE INDEX IF NOT EXISTS idx_communes_province_id ON communes(province_id);
CREATE INDEX IF NOT EXISTS idx_communes_arrondissement_id ON communes(arrondissement_id);

-- Partial index for active communes only (used in sitemap generation)
CREATE INDEX IF NOT EXISTS idx_communes_active ON communes(slug_fr) WHERE is_active = true;

-- GiST index for geographic proximity queries (PostGIS)
CREATE INDEX IF NOT EXISTS idx_communes_geo ON communes USING GIST(
  ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
);

DROP TRIGGER IF EXISTS trigger_communes_updated_at ON communes;
CREATE TRIGGER trigger_communes_updated_at
  BEFORE UPDATE ON communes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE: service_categories
-- ============================================================

CREATE TABLE IF NOT EXISTS service_categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  name_fr         TEXT NOT NULL,
  name_nl         TEXT NOT NULL,
  short_desc_fr   TEXT NOT NULL,
  short_desc_nl   TEXT NOT NULL,
  long_desc_fr    TEXT,
  icon_name       TEXT NOT NULL DEFAULT 'Wrench',
  price_from      INTEGER NOT NULL,
  is_emergency    BOOLEAN NOT NULL DEFAULT false,
  priority_order  SMALLINT NOT NULL DEFAULT 99,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_categories_priority ON service_categories(priority_order)
  WHERE is_active = true;

DROP TRIGGER IF EXISTS trigger_service_categories_updated_at ON service_categories;
CREATE TRIGGER trigger_service_categories_updated_at
  BEFORE UPDATE ON service_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE: pseo_pages
-- ============================================================

CREATE TABLE IF NOT EXISTS pseo_pages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commune_id      UUID NOT NULL REFERENCES communes(id) ON DELETE CASCADE,
  service_slug    TEXT REFERENCES service_categories(slug) ON DELETE SET NULL,
  full_slug       TEXT NOT NULL UNIQUE,
  page_type       TEXT NOT NULL
                  CHECK (page_type IN ('commune', 'service_commune', 'province')),
  is_published    BOOLEAN NOT NULL DEFAULT false,
  is_indexed      BOOLEAN NOT NULL DEFAULT false,
  last_crawled_at TIMESTAMPTZ,
  serp_position   FLOAT,
  impressions_30d INTEGER DEFAULT 0,
  clicks_30d      INTEGER DEFAULT 0,
  word_count      INTEGER,
  uniqueness_score FLOAT
                  CHECK (uniqueness_score IS NULL OR uniqueness_score BETWEEN 0 AND 1),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (commune_id, service_slug)
);

CREATE INDEX IF NOT EXISTS idx_pseo_pages_commune_id ON pseo_pages(commune_id);
CREATE INDEX IF NOT EXISTS idx_pseo_pages_published ON pseo_pages(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_pseo_pages_full_slug ON pseo_pages(full_slug);

DROP TRIGGER IF EXISTS trigger_pseo_pages_updated_at ON pseo_pages;
CREATE TRIGGER trigger_pseo_pages_updated_at
  BEFORE UPDATE ON pseo_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE: leads
-- ============================================================

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM (
    'new', 'contacted', 'qualified', 'converted', 'lost', 'spam'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE service_type AS ENUM (
    'depannage', 'entretien', 'installation', 'reparation', 'devis', 'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  postal_code     CHAR(4) NOT NULL,
  service_type    service_type NOT NULL DEFAULT 'devis',
  message         TEXT,
  commune_id      UUID REFERENCES communes(id) ON DELETE SET NULL,
  commune_slug    TEXT,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_urgent       BOOLEAN NOT NULL DEFAULT false,
  status          lead_status NOT NULL DEFAULT 'new',
  source_url      TEXT,
  ip_address      INET,
  user_agent      TEXT,
  notes           TEXT,
  contacted_at    TIMESTAMPTZ,
  converted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_postal_code ON leads(postal_code);
CREATE INDEX IF NOT EXISTS idx_leads_is_urgent ON leads(is_urgent) WHERE is_urgent = true;
CREATE INDEX IF NOT EXISTS idx_leads_commune_id ON leads(commune_id);

DROP TRIGGER IF EXISTS trigger_leads_updated_at ON leads;
CREATE TRIGGER trigger_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE: testimonials
-- ============================================================

DO $$ BEGIN
  CREATE TYPE testimonial_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS testimonials (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name     TEXT NOT NULL,
  author_location TEXT,
  rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content         TEXT NOT NULL,
  service_type    TEXT,
  commune_id      UUID REFERENCES communes(id) ON DELETE SET NULL,
  source          TEXT NOT NULL DEFAULT 'google',
  source_url      TEXT,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  status          testimonial_status NOT NULL DEFAULT 'pending',
  review_date     DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured)
  WHERE status = 'approved' AND is_featured = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_commune ON testimonials(commune_id)
  WHERE status = 'approved';

DROP TRIGGER IF EXISTS trigger_testimonials_updated_at ON testimonials;
CREATE TRIGGER trigger_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE: chat_sessions & chat_messages
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_sessions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token    TEXT NOT NULL UNIQUE,       -- Client anonymous session identifier
  commune_id       UUID REFERENCES communes(id) ON DELETE SET NULL,
  postal_code      VARCHAR(4),
  boiler_brand     TEXT,                       -- e.g. 'Vaillant', 'Bulex', 'Viessmann'
  error_code       TEXT,                       -- e.g. 'F28', 'F22', 'F1'
  is_emergency     BOOLEAN NOT NULL DEFAULT FALSE,
  safety_triggered BOOLEAN NOT NULL DEFAULT FALSE, -- Gas leak / CO alert fired
  lead_id          UUID REFERENCES leads(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON chat_sessions;
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS chat_messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id       UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role             VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content          TEXT NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_token ON chat_sessions(session_token);

-- ============================================================
-- RPC FUNCTIONS
-- ============================================================

-- 1. Postal code to commune resolver
CREATE OR REPLACE FUNCTION lookup_communes_by_postal_code(postal_code TEXT)
RETURNS TABLE(
  id UUID, name_fr TEXT, name_nl TEXT, slug_fr TEXT,
  province_name_fr TEXT, arrondissement_name_fr TEXT
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT c.id, c.name_fr, c.name_nl, c.slug_fr,
    p.name_fr AS province_name_fr, a.name_fr AS arrondissement_name_fr
  FROM communes c
  JOIN provinces p ON p.id = c.province_id
  LEFT JOIN arrondissements a ON a.id = c.arrondissement_id
  WHERE postal_code = ANY(c.postal_codes) AND c.is_active = true
  ORDER BY c.name_fr LIMIT 10;
$$;

-- 2. Nearby communes by Haversine distance
CREATE OR REPLACE FUNCTION find_nearby_communes(
  p_lat FLOAT, p_lng FLOAT, p_radius_km INT DEFAULT 20,
  p_exclude_id UUID DEFAULT NULL, p_limit INT DEFAULT 8
)
RETURNS TABLE(id UUID, name_fr TEXT, slug_fr TEXT, province_name_fr TEXT, distance_km FLOAT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT c.id, c.name_fr, c.slug_fr, p.name_fr AS province_name_fr,
    ROUND((6371 * acos(LEAST(1.0,
      cos(radians(p_lat)) * cos(radians(c.latitude))
      * cos(radians(c.longitude) - radians(p_lng))
      + sin(radians(p_lat)) * sin(radians(c.latitude))
    )))::numeric, 1)::FLOAT AS distance_km
  FROM communes c
  JOIN provinces p ON p.id = c.province_id
  WHERE c.is_active = true
    AND (p_exclude_id IS NULL OR c.id != p_exclude_id)
    AND ABS(c.latitude - p_lat) < (p_radius_km::FLOAT / 111.0)
    AND ABS(c.longitude - p_lng) < (p_radius_km::FLOAT / (111.0 * cos(radians(p_lat))))
  ORDER BY distance_km LIMIT p_limit;
$$;

-- 3. Find nearest Major City Authority Hub for upward link equity
CREATE OR REPLACE FUNCTION get_nearest_major_city(
  p_commune_id UUID
)
RETURNS TABLE (
  id UUID,
  name_fr TEXT,
  slug_fr TEXT,
  distance_km FLOAT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH target AS (
    SELECT latitude, longitude FROM communes WHERE id = p_commune_id
  )
  SELECT 
    c.id,
    c.name_fr,
    c.slug_fr,
    ROUND((6371 * acos(LEAST(1.0,
      cos(radians(t.latitude)) * cos(radians(c.latitude))
      * cos(radians(c.longitude) - radians(t.longitude))
      + sin(radians(t.latitude)) * sin(radians(c.latitude))
    )))::numeric, 1)::FLOAT AS distance_km
  FROM communes c, target t
  WHERE c.is_major_hub = TRUE
    AND c.id != p_commune_id
    AND c.is_active = TRUE
  ORDER BY distance_km ASC
  LIMIT 1;
$$;

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE arrondissements ENABLE ROW LEVEL SECURITY;
ALTER TABLE communes ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pseo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "provinces_public_read" ON provinces FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "provinces_service_role_all" ON provinces FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "arrondissements_public_read" ON arrondissements FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "arrondissements_service_role_all" ON arrondissements FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "communes_public_read" ON communes FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "communes_service_role_all" ON communes FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "service_categories_public_read" ON service_categories FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "service_categories_service_role_all" ON service_categories FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "pseo_pages_public_read" ON pseo_pages FOR SELECT USING (is_published = true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "pseo_pages_service_role_all" ON pseo_pages FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "leads_anon_insert" ON leads FOR INSERT TO anon
    WITH CHECK (full_name IS NOT NULL AND phone IS NOT NULL AND postal_code IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "leads_auth_read_own" ON leads FOR SELECT TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "leads_service_role_all" ON leads FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (status = 'approved');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "testimonials_service_role_all" ON testimonials FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "chat_sessions_anon_insert" ON chat_sessions FOR INSERT TO anon WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "chat_sessions_anon_update" ON chat_sessions FOR UPDATE TO anon USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "chat_sessions_service_role_all" ON chat_sessions FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "chat_messages_anon_insert" ON chat_messages FOR INSERT TO anon WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "chat_messages_service_role_all" ON chat_messages FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN null; END $$;
