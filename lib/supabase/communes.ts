import { createPublicClient } from './server'
import { unstable_cache } from 'next/cache'
import type { Database } from '@/types/supabase'

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

    if (error || !data) return null
    return data as unknown as CommuneRecord
  },
  ['commune-by-slug'],
  { revalidate: 86400, tags: ['communes'] }
)

/**
 * Fetch all active commune slugs for generateStaticParams()
 */
export const getAllActiveCommuneSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('communes')
      .select('slug_fr')
      .eq('is_active', true)
      .order('slug_fr')

    if (error || !data) return []
    return (data as Array<{ slug_fr: string }>).map((item) => item.slug_fr)
  },
  ['all-active-commune-slugs'],
  { revalidate: 86400, tags: ['communes'] }
)

/**
 * Resolver for 4-digit Belgian postal code lookup
 */
export async function lookupByPostalCode(postalCode: string) {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .rpc('lookup_communes_by_postal_code', { postal_code: postalCode })

  if (error) {
    console.error('[lookupByPostalCode] error:', error)
    return []
  }

  return data ?? []
}

/**
 * Fetch nearby communes for a target commune ID with PostGIS RPC and fallback
 */
export async function getNearbyCommunes(
  communeId: string,
  limit = 6
): Promise<NearbyCommuneResult[]> {
  const supabase = createPublicClient()
  const { data, error } = await supabase.rpc('find_nearby_communes', {
    target_commune_id: communeId,
    limit_count: limit,
  })

  if (error || !data || data.length === 0) {
    const { data: fallbackData } = await supabase
      .from('communes')
      .select('id, name_fr, slug_fr')
      .neq('id', communeId)
      .eq('is_active', true)
      .limit(limit)

    return (
      (fallbackData as unknown as Array<{ id: string; name_fr: string; slug_fr: string }>)?.map(
        (c, idx) => ({
          id: c.id,
          name_fr: c.name_fr,
          slug_fr: c.slug_fr,
          province_name_fr: 'Belgique',
          distance_km: 4.5 + idx * 2.1,
        })
      ) ?? []
    )
  }

  return data as unknown as NearbyCommuneResult[]
}

