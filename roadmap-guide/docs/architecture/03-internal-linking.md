# 03 — Internal Linking
# Algorithmic Hub-and-Spoke Engine & Geo-Equity Routing
# Project: Chauffagiste-Belga

---

## §1. Internal Linking Philosophy

Internal links serve three primary search and UX mandates:

1. **PageRank & Geo-Equity Flow** — Channel link equity from Small Commune "Dispatch" pages laterally to neighbor clusters and **UP** to Major City "Authority Hubs" (and National Service pages).
2. **Crawl Efficiency** — Ensure Googlebot and AI search crawlers discover all ~337 commune pages and 8 national service pages within **≤ 2 hops** from the homepage.
3. **Zero Cannibalization** — Direct all geographic search signals for a locality to its single canonical page (`/chauffagiste-[commune]`). No competing service-commune or province hub URLs.

**Non-negotiable rule**: Every internal link must be contextually relevant and anchor-optimized. Sibling communes must share real road or geographic borders.

---

## §2. Link Graph Architecture: Hub-and-Spoke Model

```
                    Homepage (/)
                     │        │
         ┌───────────┘        └───────────┐
         ▼                                ▼
8 National Services (/nos-services/...)   Major City Authority Hubs (/chauffagiste-[big-city])
         │                                       ▲
         │ (Topical Link)                        │ (Upward Equity Flow)
         ▼                                       │
┌────────────────────────────────────────────────┴──────────────────────────────┐
│                         Small Commune Dispatch Pages                          │
│                         (/chauffagiste-[small-commune])                       │
│                                                                               │
│         [Small Commune A] ◄──────(Lateral Sibling Link)──────► [Small Commune B]│
└───────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Maximum Hops from Homepage

```
Homepage (/)
├── /nos-services                                [1 hop]
│   └── /nos-services/[service]                  [2 hops]  ← All 8 National Service Guides
├── /chauffagiste-[big-city]                     [1 hop]   ← Direct featured city links
│   └── /chauffagiste-[small-commune]            [2 hops]  ← ALL 337 communes reachable within 2 hops!
└── /conseils                                    [1 hop]
    └── /conseils/[slug]                         [2 hops]
```

Maximum depth: **2 hops** for all indexable pages on the entire domain.

---

## §3. Commune Page Internal Link Specifications

As defined in [`04-pseo-content-strategy.md`](file:///d:/chauffagiste-belga/roadmap-guide/docs/seo/04-pseo-content-strategy.md), pages are differentiated into **Major City Authority Hubs** and **Small Commune Dispatch Pages**.

### 3.1 Small Commune Link Budget (Dispatch Pages)

Small communes exist to capture local long-tail searches and funnel authority upwards:

| Section | Link Target | Count | Link Mechanism |
|---------|-------------|-------|----------------|
| **Breadcrumbs** | Homepage (`/`) | 1 | `Accueil › Chauffagiste [Commune]` |
| **Nearest Authority Hub** | Nearest Big City (`/chauffagiste-[major-city]`) | 1 | "Chauffagiste de référence pour la région de [Grand Pôle]" |
| **National Services Grid** | National Service Pages (`/nos-services/[service]`) | 3–4 | Links to Dépannage, Entretien, Installation authority pages |
| **Sibling Communes** | Adjacent Communes within 10–15 km | 5–8 | Lateral geographic cluster ("Communes voisines") |
| **Total** | | **10–14** | High-velocity, focused link profile |

### 3.2 Major City Link Budget (Authority Hubs)

Major cities are competitive mini-portals receiving equity from surrounding satellite towns:

| Section | Link Target | Count | Link Mechanism |
|---------|-------------|-------|----------------|
| **Breadcrumbs** | Homepage (`/`) | 1 | `Accueil › Chauffagiste [Commune]` |
| **National Services Hub** | `/nos-services/[service]` (all 8) | 8 | Deep topical connection to national service guides |
| **Key Surrounding Communes** | Top 8–12 surrounding satellites | 8–12 | Connecting to major residential suburbs |
| **Blog & Diagnostic Guides** | Symptom & error code articles | 3–4 | Long-tail troubleshooting references |
| **Total** | | **20–25** | Comprehensive authority hub |

---

## §4. Algorithmic Geo-Linking Engine

```typescript
// lib/seo/internal-links.ts
import { createServerClient } from '@/lib/supabase/server'

export interface InternalLink {
  href: string
  label: string
  type: 'hub' | 'sibling' | 'service' | 'blog'
}

/**
 * Hub-and-Spoke: Get the nearest Major City Authority Hub for a small commune.
 */
export async function getNearestMajorHub(communeId: string): Promise<InternalLink | null> {
  const supabase = createServerClient()
  
  const { data } = await supabase
    .rpc('get_nearest_major_city', { p_commune_id: communeId })
    .single()

  if (!data) return null

  return {
    href: `/chauffagiste-${data.slug_fr}`,
    label: `Chauffagiste ${data.name_fr}`,
    type: 'hub',
  }
}

/**
 * Lateral Linking: Get 5 to 8 adjacent sibling communes.
 */
export async function getSiblingCommunes(
  commune: { id: string; latitude: number; longitude: number; arrondissement_id: string },
  limit = 8
): Promise<InternalLink[]> {
  const supabase = createServerClient()

  // Priority: GPS proximity within 15km
  const { data: nearby } = await supabase
    .rpc('find_nearby_communes', {
      p_lat: commune.latitude,
      p_lng: commune.longitude,
      p_radius_km: 15,
      p_exclude_id: commune.id,
      p_limit: limit,
    })

  return (nearby ?? []).map((c: { name_fr: string; slug_fr: string }) => ({
    href: `/chauffagiste-${c.slug_fr}`,
    label: `Chauffagiste ${c.name_fr}`,
    type: 'sibling',
  }))
}
```

---

## §5. Breadcrumb Matrix

Under the flat URL structure, breadcrumb hierarchy is streamlined:

| Page Type | Breadcrumb Trail | Schema.org Validated |
|-----------|-----------------|----------------------|
| **Homepage** | `Accueil` | `WebSite` |
| **National Services Hub** | `Accueil › Nos services` | `BreadcrumbList` |
| **National Service Page** | `Accueil › Nos services › [Service]` | `BreadcrumbList` |
| **Commune Page (All)** | `Accueil › Chauffagiste [Commune]` | `BreadcrumbList` |
| **Blog Hub** | `Accueil › Conseils` | `BreadcrumbList` |
| **Blog Post** | `Accueil › Conseils › [Titre Article]` | `BreadcrumbList` |

---

## §6. Homepage & Navigation Equity Distribution

The homepage distributes equity directly to:
1. **The 8 National Service Pages** (`/nos-services/[service]`)
2. **Top 12 Major Authority Hub Cities** (Bruxelles, Liège, Charleroi, Namur, Mons, Wavre, Waterloo, Tournai, La Louvière, Verviers, Schaerbeek, Ixelles)
3. **Full Interactive Commune Finder & Directory** (Accessible within 1 click)
