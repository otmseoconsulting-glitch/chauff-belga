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



