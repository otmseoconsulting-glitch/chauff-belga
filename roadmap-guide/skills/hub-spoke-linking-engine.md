# Skill: Hub-and-Spoke Geo Linking Engine
# Algorithmic Link Equity Distribution & Sibling Clustering
# Project: Chauffagiste-Belga

---

## Purpose

Automate internal link graph computation across ~337 communes. Build lateral geographic clusters (5–8 sibling communes) and route link equity upward from Small Communes to Major City Authority Hubs, preserving PageRank flow and keeping site crawl depth ≤ 2 hops.

---

## The Hub-and-Spoke Link Topology

```
                  ┌──────────────────────────────┐
                  │    MAJOR CITY AUTHORITY HUB  │
                  │   (/chauffagiste-[big-city]) │
                  └──────────────▲───────────────┘
                                 │
                 ▲ Upward Anchor │ (Equity Flow)
                 │               │
     ┌───────────────────────────┴───────────────────────────┐
     │                                                       │
┌────┴────────────────────────┐             ┌────────────────┴────────────┐
│    SMALL COMMUNE SIBLING    │◄───────────►│    SMALL COMMUNE SIBLING    │
│  (/chauffagiste-[communeA]) │   Lateral   │  (/chauffagiste-[communeB]) │
└─────────────────────────────┘   Cluster   └─────────────────────────────┘
```

---

## Link Generator & Anchor Engine

```typescript
// lib/seo/internal-links.ts
import { createServerClient } from '@/lib/supabase/server'
import type { CommuneRecord } from '@/lib/supabase/communes'

export interface GeoLink {
  href: string
  label: string
  subtext: string
  distanceKm?: number
  isHub?: boolean
}

/**
 * Generates upward equity link from small commune to nearest Major City Hub.
 */
export async function getNearestMajorHub(communeId: string): Promise<GeoLink | null> {
  const supabase = createServerClient()

  const { data } = await supabase
    .rpc('get_nearest_major_city', { p_commune_id: communeId })
    .single()

  if (!data) return null

  return {
    href: `/chauffagiste-${data.slug_fr}`,
    label: `Chauffagiste ${data.name_fr}`,
    subtext: `Pôle régional d'intervention (${data.distance_km} km)`,
    distanceKm: data.distance_km,
    isHub: true,
  }
}

/**
 * Generates 5 to 8 lateral links to adjacent sibling communes.
 */
export async function getSiblingCommunes(
  commune: CommuneRecord,
  limit = 8
): Promise<GeoLink[]> {
  const supabase = createServerClient()

  const { data: siblings } = await supabase
    .rpc('find_nearby_communes', {
      p_lat: commune.latitude,
      p_lng: commune.longitude,
      p_radius_km: 15,
      p_exclude_id: commune.id,
      p_limit: limit,
    })

  if (!siblings || siblings.length === 0) return []

  const ANCHOR_VARIATIONS = [
    (name: string) => `Dépannage chaudière ${name}`,
    (name: string) => `Chauffagiste agréé ${name}`,
    (name: string) => `Entretien chaudière ${name}`,
    (name: string) => `Réparation chauffage ${name}`,
  ]

  return siblings.map((sib: { name_fr: string; slug_fr: string; distance_km: number }, index: number) => {
    const anchorFn = ANCHOR_VARIATIONS[index % ANCHOR_VARIATIONS.length]
    return {
      href: `/chauffagiste-${sib.slug_fr}`,
      label: anchorFn(sib.name_fr),
      subtext: `À ${sib.distance_km} km de ${commune.name_fr}`,
      distanceKm: sib.distance_km,
      isHub: false,
    }
  })
}
```
