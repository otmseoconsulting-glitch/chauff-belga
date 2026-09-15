import { createPublicClient } from './server'
import { unstable_cache } from 'next/cache'
import type { Database } from '@/types/supabase'
import {
  FALLBACK_COMMUNES,
  getFallbackCommuneBySlug,
  getFallbackNearbyCommunes,
  getFallbackNearestMajorHub,
} from './fallback-communes'

export type CommuneRow = Database['public']['Tables']['communes']['Row']
export type ProvinceRow = Database['public']['Tables']['provinces']['Row']

export interface CommuneRecord extends CommuneRow {
  provinces?: {
    id: string
    name_fr: string
    name_nl: string
    slug_fr: string
  } | null
}

export interface NearbyCommuneResult {
  id: string
  name_fr: string
  slug_fr: string
  province_name_fr: string
  distance_km: number
}

export interface MajorCityResult {
  id: string
  name_fr: string
  slug_fr: string
  distance_km: number
}

/**
 * Fetch a single commune by French slug with 24h ISR tag caching
 */
export const getCommuneBySlug = unstable_cache(
  async (slug: string): Promise<CommuneRecord | null> => {
    try {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('communes')
        .select(`
          *,
          provinces (
            id,
            name_fr,
            name_nl,
            slug_fr
          )
        `)
        .eq('slug_fr', slug)
        .eq('is_active', true)
        .maybeSingle()

      if (!error && data) {
        return data as unknown as CommuneRecord
      }
    } catch (err) {
      console.warn(`[getCommuneBySlug] Supabase query notice for ${slug}:`, err)
    }

    return getFallbackCommuneBySlug(slug)
  },
  ['commune-by-slug'],
  { revalidate: 86400, tags: ['communes'] }
)

/**
 * Fetch all active commune slugs for generateStaticParams()
 */
export const getAllActiveCommuneSlugs = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('communes')
        .select('slug_fr')
        .eq('is_active', true)
        .order('slug_fr')

      if (!error && data && data.length > 0) {
        return (data as Array<{ slug_fr: string }>).map((item) => item.slug_fr)
      }
    } catch (err) {
      console.warn('[getAllActiveCommuneSlugs] Supabase query notice:', err)
    }

    return FALLBACK_COMMUNES.map((c) => c.slug_fr)
  },
  ['all-active-commune-slugs'],
  { revalidate: 86400, tags: ['communes'] }
)

/**
 * Resolver for 4-digit Belgian postal code lookup
 */
export async function lookupByPostalCode(postalCode: string) {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .rpc('lookup_communes_by_postal_code', { postal_code: postalCode })

    if (!error && data && data.length > 0) {
      return data
    }
  } catch (err) {
    console.warn('[lookupByPostalCode] Supabase RPC notice:', err)
  }

  // Fallback to local Belgian communes
  return FALLBACK_COMMUNES.filter((c) => c.postal_codes.includes(postalCode)).map((c) => ({
    id: c.id,
    name_fr: c.name_fr,
    slug_fr: c.slug_fr,
    province_name_fr: c.provinces?.name_fr || 'Belgique',
  }))
}

/**
 * Fetch nearby communes for a target commune ID with PostGIS RPC and fallback
 */
export async function getNearbyCommunes(
  communeId: string,
  limit = 6
): Promise<NearbyCommuneResult[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.rpc('find_nearby_communes', {
      target_commune_id: communeId,
      limit_count: limit,
    })

    if (!error && data && data.length > 0) {
      return data as unknown as NearbyCommuneResult[]
    }
  } catch (err) {
    console.warn('[getNearbyCommunes] Supabase RPC notice:', err)
  }

  return getFallbackNearbyCommunes(communeId, limit)
}

/**
 * Fetch the nearest Major City Authority Hub for Upward Link equity flow
 */
export async function getNearestMajorHub(
  commune: CommuneRecord
): Promise<MajorCityResult | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('communes')
      .select('id, name_fr, slug_fr, is_major_hub, province_id')
      .eq('is_major_hub', true)
      .eq('is_active', true)
      .neq('id', commune.id)

    if (!error && data && data.length > 0) {
      const sameProv = data.find((h) => h.province_id === commune.province_id)
      const selected = sameProv || data[0]
      if (selected) {
        return {
          id: selected.id,
          name_fr: selected.name_fr,
          slug_fr: selected.slug_fr,
          distance_km: sameProv ? 7.5 : 15.0,
        }
      }
    }
  } catch (err) {
    console.warn('[getNearestMajorHub] Notice:', err)
  }

  return getFallbackNearestMajorHub(commune.id, commune.province_id)
}

export interface RegionZoneGroup {
  regionId: string
  name_fr: string
  slug_fr: string
  badge: string
  interventionDelay: string
  description: string
  communes: Array<{
    id: string
    name_fr: string
    slug_fr: string
    postal_codes: string[]
    is_major_hub?: boolean
    population?: number | null
  }>
}

const REGION_METADATA: Record<string, { name_fr: string; slug_fr: string; badge: string; interventionDelay: string; description: string }> = {
  'bruxelles-capitale': {
    name_fr: 'Région de Bruxelles-Capitale',
    slug_fr: 'bruxelles-capitale',
    badge: '19 Communes · 24/7',
    interventionDelay: '≤ 30 min',
    description: 'Permanence technique 24h/24 et 7j/7 sur les 19 communes bruxelloises. Techniciens agréés Bruxelles Environnement (PEB & Cerga G1/G2).',
  },
  'brabant-wallon': {
    name_fr: 'Province du Brabant Wallon',
    slug_fr: 'brabant-wallon',
    badge: 'Axe E411 & N25',
    interventionDelay: '≤ 45 min',
    description: 'Intervention urgente et entretien annuel certifié SPW Énergie à Wavre, Waterloo, Braine-l’Alleud, Nivelles, Ottignies et environs.',
  },
  'brabant-flamand': {
    name_fr: 'Brabant Flamand (Périphérie bruxelloise)',
    slug_fr: 'brabant-flamand',
    badge: 'Ring R0 & Périphérie',
    interventionDelay: '≤ 35 min',
    description: 'Dépannage d’urgence et maintenance sur le Rand bruxellois : Zaventem, Vilvorde, Kraainem, Wezembeek-Oppem, Halle, Dilbeek, Asse.',
  },
  'hainaut': {
    name_fr: 'Province de Hainaut',
    slug_fr: 'hainaut',
    badge: 'Charleroi · Mons · Tournai',
    interventionDelay: '≤ 45 min',
    description: 'Présence continue sur les grands bassins urbains de Wallonie picarde et du Hainaut : Charleroi, Mons, La Louvière, Tournai, Mouscron.',
  },
  'liege': {
    name_fr: 'Province de Liège',
    slug_fr: 'liege',
    badge: 'Agglomération Liégeoise',
    interventionDelay: '≤ 45 min',
    description: 'Permanence pour chaudières gaz et mazout sur l’agglomération de Liège, Seraing, Herstal, Verviers et l’axe autoroutier E40 / E25.',
  },
  'namur': {
    name_fr: 'Province de Namur',
    slug_fr: 'namur',
    badge: 'Axe E42 & E411',
    interventionDelay: '≤ 45 min',
    description: 'Techniciens mobiles intervenant rapidement à Namur centre, Gembloux, Sambreville, Andenne, Ciney et Dinant.',
  },
}

/**
 * Fetch all active communes grouped by province/region for the /zones-intervention hub page
 */
export const getAllCommunesGroupedByProvince = unstable_cache(
  async (): Promise<RegionZoneGroup[]> => {
    let allCommunes: CommuneRecord[] = []

    try {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('communes')
        .select(`
          id,
          name_fr,
          slug_fr,
          postal_codes,
          province_id,
          is_major_hub,
          population,
          provinces (
            id,
            name_fr,
            name_nl,
            slug_fr
          )
        `)
        .eq('is_active', true)
        .order('name_fr')

      if (!error && data && data.length > 0) {
        const fetched = data as unknown as CommuneRecord[]
        const existingSlugs = new Set(fetched.map((c) => c.slug_fr))
        const fallbacksToAdd = FALLBACK_COMMUNES.filter((c) => !existingSlugs.has(c.slug_fr))
        allCommunes = [...fetched, ...fallbacksToAdd]
      }
    } catch (err) {
      console.warn('[getAllCommunesGroupedByProvince] Supabase notice, using fallbacks:', err)
    }

    if (allCommunes.length === 0) {
      allCommunes = FALLBACK_COMMUNES
    }

    const getRegionKey = (c: CommuneRecord): string => {
      const pSlug = c.provinces?.slug_fr
      if (pSlug) {
        if (pSlug.includes('bruxelles')) return 'bruxelles-capitale'
        if (pSlug.includes('wallon')) return 'brabant-wallon'
        if (pSlug.includes('flamand') || pSlug.includes('vlaams')) return 'brabant-flamand'
        if (pSlug.includes('hainaut')) return 'hainaut'
        if (pSlug.includes('liege')) return 'liege'
        if (pSlug.includes('namur')) return 'namur'
        return pSlug
      }

      if (c.province_id) {
        const stripped = c.province_id.replace(/^p-/, '')
        if (stripped.includes('bruxelles')) return 'bruxelles-capitale'
        if (stripped.includes('wallon')) return 'brabant-wallon'
        if (stripped.includes('flamand') || stripped.includes('vlaams')) return 'brabant-flamand'
        if (stripped.includes('hainaut')) return 'hainaut'
        if (stripped.includes('liege')) return 'liege'
        if (stripped.includes('namur')) return 'namur'
        return stripped
      }

      return 'bruxelles-capitale'
    }

    // Group communes by normalized region key
    const groupsMap = new Map<string, Array<{
      id: string
      name_fr: string
      slug_fr: string
      postal_codes: string[]
      is_major_hub?: boolean
      population?: number | null
      province_name_fr?: string | undefined
    }>>()

    // Pre-initialize preferred order
    const orderedRegionKeys = [
      'bruxelles-capitale',
      'brabant-wallon',
      'brabant-flamand',
      'hainaut',
      'liege',
      'namur',
    ]

    for (const key of orderedRegionKeys) {
      groupsMap.set(key, [])
    }

    for (const c of allCommunes) {
      const regKey = getRegionKey(c)
      if (!groupsMap.has(regKey)) {
        groupsMap.set(regKey, [])
      }
      groupsMap.get(regKey)?.push({
        id: c.id,
        name_fr: c.name_fr,
        slug_fr: c.slug_fr,
        postal_codes: c.postal_codes || [],
        is_major_hub: c.is_major_hub,
        population: c.population,
        province_name_fr: c.provinces?.name_fr,
      })
    }

    const result: RegionZoneGroup[] = []

    for (const [key, items] of groupsMap.entries()) {
      if (items.length === 0) continue
      const sampleProvinceName = items.find((i) => i.province_name_fr)?.province_name_fr
      const meta = REGION_METADATA[key] || {
        name_fr: sampleProvinceName ? `Province de ${sampleProvinceName}` : `Zone ${key}`,
        slug_fr: key,
        badge: sampleProvinceName || 'Belgique',
        interventionDelay: '≤ 45 min',
        description: 'Dépannage et entretien de chaudière par des professionnels agréés.',
      }

      // Sort items: major hubs first, then alphabetical
      items.sort((a, b) => {
        if (a.is_major_hub && !b.is_major_hub) return -1
        if (!a.is_major_hub && b.is_major_hub) return 1
        return a.name_fr.localeCompare(b.name_fr, 'fr')
      })

      result.push({
        regionId: key,
        name_fr: meta.name_fr,
        slug_fr: meta.slug_fr,
        badge: meta.badge,
        interventionDelay: meta.interventionDelay,
        description: meta.description,
        communes: items,
      })
    }

    return result
  },
  ['all-communes-grouped-by-province'],

  { revalidate: 86400, tags: ['communes'] }
)



