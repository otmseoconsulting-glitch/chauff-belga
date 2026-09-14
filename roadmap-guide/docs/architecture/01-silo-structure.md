# 01 — Silo Structure
# Category & Geo-Silo Hierarchy: Focused ~337 Communes Model
# Project: Chauffagiste-Belga

---

## §1. Silo Architecture Philosophy

A **content silo** is a tightly clustered group of topically related pages that interlink cleanly, passing link equity without creating internal search cannibalization. For Chauffagiste-Belga, the architecture is intentionally streamlined to prevent the keyword conflicts common in multi-tier programmatic SEO:

1. **Focused Geographic Coverage** — Exclusively targeting French-speaking and peri-Brussels areas:
   - **Région de Bruxelles-Capitale**: 19 communes
   - **Région Wallonne**: 253 communes (Brabant Wallon, Hainaut, Liège, Namur, Luxembourg)
   - **Brabant Flamand** (Vlaams-Brabant): 65 communes
   - **Total**: Exactly ~337 communes. Excluded: Northern Flemish provinces (Anvers, Limbourg, Flandre-Orientale, Flandre-Occidentale).
2. **Zero Cannibalization Model** — All local search equity for a city is concentrated into a **single canonical Core Commune landing page** (`/chauffagiste-[commune]`). 
   - **No Province Hubs**: Low search volume ("chauffagiste province de liège") and conflicts with city names are eliminated.
   - **No Service × Commune pages**: Prevents thin content dilution and SERP splitting between generic city and specific service queries.
3. **National Service Silo** — 8 national service authority landing pages (`/nos-services/[service]`) building topical authority.

```
Total Indexable Pages:
~337 Core Commune Pages
+ 8 National Service Category Pages
+ 1 Service Hub (/nos-services)
+ 1 Homepage (/)
+ Marketing, Funnel & Blog Pages (~15)
= ~360 total indexable pages
```

---

## §2. Site Hierarchy & Structure

### 2.1 Tier Structure

```
Homepage (/) — National Belgian presence & emergency dispatch
├── Service Hub (/nos-services)
│   └── 8 National Service Guides (/nos-services/[service])
│       ├── depannage-chaudiere
│       ├── entretien-chaudiere
│       ├── installation-chauffage
│       ├── reparation-chaudiere
│       ├── regulation-thermostat
│       ├── chauffage-sol
│       ├── pompe-chaleur
│       └── debouchage
├── 337 Core Commune Landing Pages (/chauffagiste-[commune])
│   ├── Bruxelles-Capitale (19 communes)
│   ├── Wallonie (253 communes across 5 provinces)
│   └── Brabant Flamand (65 communes)
└── Conversion Funnel & Marketing
    ├── /devis (quote form)
    ├── /urgence (emergency 24/7 hotline)
    ├── /conseils (blog hub)
    └── /merci
```

### 2.2 Core Commune Pages (`/chauffagiste-[commune]`)

The commune page is the primary conversion workhorse of the website. Each page functions as an all-in-one local hub:
- **Target Keyword**: `chauffagiste [commune]`, `chauffagiste agréé [commune]`, `plombier chauffagiste [commune]`
- **Content Sections**:
  - Hero with local H1, Cerga certification badges, and immediate click-to-call button
  - Emergency banner: "Intervention en ≤ 2h à [Commune]"
  - Service breakdown grid: Dépannage, Entretien, Installation, Débouchage
  - Local Belgian context: postal code, response guarantee, local technician profile
  - Spintax-generated local narrative & FAQ (4–5 questions with schema)
  - Interactive lead quote form
  - **Nearby Communes Section**: Links to up to 8 neighboring sibling communes (within the same geographic area)

---

## §3. Service Silo Structure

### 3.1 Service Hub (`/nos-services`)

Top-level hub presenting all 8 HVAC and plumbing services offered across the covered Belgian territories.

### 3.2 Service Category Pages (`/nos-services/[service]`)

| Service | Slug | Emergency? | Price From |
|---------|------|-----------|-----------|
| Dépannage chaudière | `depannage-chaudiere` | ✅ Yes | €65 |
| Entretien chaudière | `entretien-chaudiere` | ❌ No | €99 |
| Installation chauffage | `installation-chauffage` | ❌ No | €350 |
| Réparation chaudière | `reparation-chaudiere` | ❌ No | €85 |
| Régulation & thermostat | `regulation-thermostat` | ❌ No | €120 |
| Chauffage au sol | `chauffage-sol` | ❌ No | €200 |
| Pompe à chaleur | `pompe-chaleur` | ❌ No | €800 |
| Débouchage | `debouchage` | ✅ Yes | €75 |

### 3.3 National Service Page Content

Each `/nos-services/[service]` page contains:
- In-depth technical guide (Belgian PEB legal requirements, Cerga standards, diagnostic steps)
- National pricing guide and transparent cost breakdowns
- National FAQ schema
- Call-to-action linking to `/devis` and urgent dispatch phone

---

## §4. Interlinking & Link Equity Flow

### 4.1 Allowed Link Directions

```
✅ Homepage → Core Communes (via footer directory / top communes module)
✅ Homepage ↔ Service Hub & Service Pages
✅ Commune → Sibling Commune (lateral link: same province/region, max 8)
✅ Commune → Service Hub (/nos-services) or Quote Funnel (/devis)
✅ Blog Post → Relevant National Service Page + Top Communes
❌ Never cross-link unrelated distant communes (e.g. Arlon directly to Wemmel)
```

### 4.2 Internal Link Budget Per Page

| Page Type | Target Internal Links | Breakdown |
|-----------|----------------------|-----------|
| Homepage | 40–50 | Top communes (Brussels + major cities) + 8 services + legal |
| Commune page | 12–16 | 8 sibling communes + 3 service links + 1 quote funnel + legal |
| Service category | 15–20 | Links to major commune hubs + related services + quote funnel |
| Blog post | 6–8 | 2 national services + 3 top commune landing pages |

---

## §5. Belgian Geo Taxonomy Reference (~337 Communes)

### 5.1 Geographic Distribution

| Zone / Province | Region | Communes | Key Cities Included |
|-----------------|--------|----------|---------------------|
| **Bruxelles-Capitale** | Brussels | 19 | Bruxelles (1000), Uccle, Ixelles, Schaerbeek, Anderlecht |
| **Brabant Wallon** | Wallonie | 27 | Wavre, Waterloo, Braine-l'Alleud, Nivelles, Ottignies-LLN |
| **Hainaut** | Wallonie | 69 | Charleroi, Mons, Tournai, La Louvière, Mouscron |
| **Liège** | Wallonie | 84 | Liège (4000), Seraing, Verviers, Herstal, Huy |
| **Namur** | Wallonie | 38 | Namur (5000), Sambreville, Andenne, Gembloux, Ciney |
| **Luxembourg** | Wallonie | 44 | Arlon, Bastogne, Marche-en-Famenne, Virton, Neufchâteau |
| **Brabant Flamand** | Flandre | 65 | Vilvorde, Hal (Halle), Zaventem, Dilbeek, Grimbergen, Tervuren |
| **Total** | | **337** | Full coverage of target operational zones |

### 5.2 Silo Completeness Requirement

**100% of the ~337 targeted communes** must have an active, high-quality `/chauffagiste-[commune]` page generated and indexed. Zero incomplete communes within the designated 7 operational zones.

---

## §6. Orphan Page Prevention

A page is considered an "orphan" if search crawlers cannot discover it through natural internal links:
1. Every commune page is linked from:
   - The dynamic XML sitemap (`/sitemap.xml`)
   - Nearby neighboring commune pages (lateral geographic ring)
   - The regional commune directory index
2. Build verification: Ensure `internal_links_in >= 4` for every published commune URL.
