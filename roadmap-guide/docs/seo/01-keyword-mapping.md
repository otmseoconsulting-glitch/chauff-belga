# 01 — Keyword Mapping
# Search Intent Matrix: Dépannage, Entretien, Installation & Beyond
# Project: Chauffagiste-Belga

---

## §1. Keyword Research Methodology

### 1.1 Data Sources

1. **Google Search Console** — Post-launch query data (primary)
2. **Google Keyword Planner** — Volume estimates by region (Belgium FR/NL)
3. **Semrush / Ahrefs** — Competitive gap analysis
4. **People Also Ask** — FAQ mining for GEO content
5. **Google Autocomplete** — Long-tail discovery (`chauffagiste bruxelles` → suggestions)

### 1.2 Intent Classification System

| Intent Code | Description | Content Response |
|------------|-------------|-----------------|
| `T` | Transactional — ready to buy/call | pSEO landing page with CTA |
| `I` | Informational — researching | Blog post with soft CTA |
| `N` | Navigational — brand lookup | Homepage / About |
| `L` | Local — geo-specific service | Commune page |
| `C` | Comparative — evaluating options | Blog comparison post |

---

## §2. Core Service Keyword Matrix (Targeting Core Commune & Service Hub Pages)

> **Architectural Note**: Per [`04-pseo-content-strategy.md`](file:///d:/chauffagiste-belga/roadmap-guide/docs/seo/04-pseo-content-strategy.md), all local searches for a locality map strictly to the canonical **Core Commune Page** (`/chauffagiste-[commune]`), which serves as an Authority Hub (Major Cities) or Dispatch Page (Small Communes) handling mixed intents (Dépannage, Entretien, Installation) to eliminate cannibalization. Broad national informational/commercial queries map to National Service Guides (`/nos-services/[service]`) or Blog articles.

### 2.1 Dépannage Chaudière (Emergency — Highest Priority)

| Keyword Pattern | Monthly Vol (BE) | Intent | Target Page |
|----------------|-----------------|--------|------------|
| `chauffagiste [commune]` | 500–2,000 per city | T+L | `/chauffagiste-[commune]` |
| `dépannage chaudière [commune]` | 200–1,000 | T+L | `/chauffagiste-[commune]#depannage` |
| `chauffagiste urgence [commune]` | 100–500 | T+L | `/chauffagiste-[commune]#urgence` |
| `chaudière en panne [commune]` | 50–300 | T+L | `/chauffagiste-[commune]#depannage` |
| `plombier chauffagiste [commune]` | 100–400 | T+L | `/chauffagiste-[commune]` |
| `dépannage chaudière 24h [commune]` | 50–200 | T+L | `/chauffagiste-[commune]#urgence` |
| `réparateur chaudière [commune]` | 30–150 | T+L | `/chauffagiste-[commune]#depannage` |
| `chaudière ne chauffe plus` | 3,600 BE | I | Blog post → CTA |
| `panne chaudière que faire` | 2,400 BE | I | Blog post → CTA |
| `chaudière fuite eau` | 1,800 BE | I+T | Blog post + `/nos-services/depannage-chaudiere` |

### 2.2 Entretien Chaudière (Maintenance — High Volume, Recurring)

| Keyword Pattern | Monthly Vol (BE) | Intent | Target Page |
|----------------|-----------------|--------|------------|
| `entretien chaudière [commune]` | 100–600 | T+L | `/chauffagiste-[commune]#entretien` |
| `révision chaudière [commune]` | 50–200 | T+L | `/chauffagiste-[commune]#entretien` |
| `entretien chaudière prix [commune]` | 50–200 | T+C | `/chauffagiste-[commune]#tarifs` |
| `entretien chaudière obligatoire Belgique` | 2,400 | I | Blog post |
| `contrat entretien chaudière` | 1,200 | I+T | `/nos-services/entretien-chaudiere` |
| `entretien chaudière gaz prix` | 900 | I+C | Blog → `/nos-services/entretien-chaudiere` |
| `certification entretien chaudière` | 600 | I | Blog post |
| `rapport entretien chaudière Wallonie` | 400 | I | Blog post |

### 2.3 Installation Chauffage (High Value)

| Keyword Pattern | Monthly Vol (BE) | Intent | Target Page |
|----------------|-----------------|--------|------------|
| `installation chaudière [commune]` | 50–300 | T+L | `/chauffagiste-[commune]#installation` |
| `remplacement chaudière [commune]` | 30–150 | T+L | `/chauffagiste-[commune]#installation` |
| `installation chauffage central [commune]` | 30–100 | T+L | `/chauffagiste-[commune]#installation` |
| `installation chaudière à condensation` | 1,200 | I+T | `/nos-services/installation-chauffage` |
| `remplacement chaudière prix Belgique` | 900 | C | Blog → `/nos-services/installation-chauffage` |
| `quelle chaudière choisir Belgique` | 1,800 | I | Blog |
| `aide remplacement chaudière Wallonie` | 1,200 | I | Blog (prime habitation) |

### 2.4 Pompe à Chaleur (Growing — High Value)

| Keyword Pattern | Monthly Vol (BE) | Intent | Target Page |
|----------------|-----------------|--------|------------|
| `pompe à chaleur [commune]` | 50–200 | T+L | `/chauffagiste-[commune]#pompe-chaleur` |
| `installation pompe à chaleur [commune]` | 30–100 | T+L | `/chauffagiste-[commune]#pompe-chaleur` |
| `pompe à chaleur prix Belgique` | 2,400 | C | `/nos-services/pompe-chaleur` |
| `prime pompe à chaleur Bruxelles` | 1,800 | I | Blog (primes Renolution) |
| `prime pompe à chaleur Wallonie` | 1,500 | I | Blog (primes Habitation) |
| `avantages pompe à chaleur` | 1,200 | I | Blog → `/nos-services/pompe-chaleur` |
| `PAC air-air vs air-eau` | 600 | C | Blog |

### 2.5 Débouchage (Emergency Adjacent)

| Keyword Pattern | Monthly Vol (BE) | Intent | Target Page |
|----------------|-----------------|--------|------------|
| `débouchage [commune]` | 100–400 | T+L | `/chauffagiste-[commune]#debouchage` |
| `débouchage canalisation [commune]` | 50–200 | T+L | `/chauffagiste-[commune]#debouchage` |
| `WC bouché [commune]` | 30–100 | T+L | `/chauffagiste-[commune]#debouchage` |
| `débouchage urgent [commune]` | 20–80 | T+L | `/chauffagiste-[commune]#debouchage` |

---

## §3. Geographic Keyword Modifiers

### 3.1 Belgian Commune Volume Tiers

| Tier | Communes | Monthly Vol/Keyword | Priority |
|------|---------|---------------------|---------|
| Tier 1 | Bruxelles, Liège, Namur, Charleroi, Mons, Anvers, Gand, Bruges | 500–3,000 | P0 |
| Tier 2 | Major suburbs (Anderlecht, Ixelles, Schaerbeek, Seraing…) | 100–500 | P1 |
| Tier 3 | Mid-size communes (pop 20k–50k) | 30–100 | P2 |
| Tier 4 | Small communes (pop < 20k) | 5–30 | P3 |

### 3.2 Province-Level Modifier Volume

| Province Modifier | Estimated Monthly Vol (all services) |
|------------------|--------------------------------------|
| `chauffagiste bruxelles` (all) | 8,000–15,000 |
| `chauffagiste liège` (all) | 4,000–8,000 |
| `chauffagiste namur` (all) | 2,000–4,000 |
| `chauffagiste charleroi` (all) | 2,000–4,000 |
| `chauffagiste anvers` (all) | 3,000–6,000 |
| `chauffagiste gand` (all) | 2,500–5,000 |

---

## §4. Long-Tail Keyword Opportunities

### 4.1 Brand-Specific Repair Queries (High Conversion)

Target via blog posts that link to commune service pages:

```
Bulex / Bosch chaudière:
- "réparation chaudière Bulex [commune]"
- "panne chaudière Bulex erreur E9"
- "entretien chaudière Bosch [commune]"

Vaillant:
- "technicien agréé Vaillant [commune]"
- "panne chaudière Vaillant [commune]"

Viessmann:
- "service Viessmann [commune]"

De Dietrich, Saunier Duval, Junkers, Baxi, Ariston:
- Same pattern per brand
```

### 4.2 Regulatory / Compliance Queries

High informational intent → Blog posts → Soft CTA to maintenance service:

```
- "réglementation chaudière gaz Belgique"
- "entretien chaudière obligatoire propriétaire Belgique"
- "certificat PEB [commune]"
- "contrôle chaudière locataire propriétaire Belgique"
- "agrément Cerga chauffagiste Belgique"
```

### 4.3 Seasonal Trigger Queries

Content calendar hooks:

```
October–November (heating season start):
- "mettre en marche chaudière après été"
- "première mise en route chaudière condensation"

January–February (coldest months — peak emergency):
- "chaudière ne démarre plus froid"
- "radiateur froid chaudière en marche"

March–April (maintenance booking):
- "quand faire révision chaudière printemps"
- "bilan énergétique avant été"
```

---

## §5. Keyword-to-URL Mapping Rules

### 5.1 Primary Keyword in URL

Each pSEO page must have its **primary keyword directly in the URL**:

```
/chauffagiste-bruxelles       → Primary KW: "chauffagiste bruxelles"
/depannage-chaudiere-bruxelles → Primary KW: "dépannage chaudière bruxelles"
/entretien-chaudiere-liege    → Primary KW: "entretien chaudière liège"
```

### 5.2 Keyword Placement on Page

| Position | Requirement |
|----------|------------|
| URL | ✅ Primary keyword (stripped of diacritics) |
| `<title>` | ✅ Primary keyword in first 60 chars |
| `<meta description>` | ✅ Primary keyword + commune + USP |
| `<h1>` | ✅ Primary keyword (with diacritics restored) |
| First 100 words | ✅ Primary keyword + secondary keyword |
| At least 1 `<h2>` | ✅ Secondary keyword variation |
| Image alt text | ✅ Descriptive with keyword |
| JSON-LD `name` field | ✅ Primary keyword |

### 5.3 Keyword Cannibalization Prevention

**Rule**: Each keyword intent is served by exactly ONE page type.

| Query Type | Served By | NOT By |
|-----------|---------|--------|
| `chauffagiste [commune]` | `/chauffagiste-[commune]` | Service pages |
| `dépannage chaudière [commune]` | `/depannage-chaudiere-[commune]` | Commune page |
| `entretien chaudière [commune]` | `/entretien-chaudiere-[commune]` | Commune page |
| `chauffagiste [province]` | `/zones-intervention/[province]` | Commune pages |
| `entretien chaudière obligatoire` | Blog post | Service pages |

Cannibalization check: Run Semrush Position Tracking monthly. If 2 pages rank for the same query, consolidate with 301 redirect to winner.
