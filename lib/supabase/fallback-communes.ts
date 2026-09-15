import type { CommuneRecord, NearbyCommuneResult, MajorCityResult } from './communes'

const RAW_FALLBACK_COMMUNES = [
  {
    id: 'c-bruxelles',
    nis_code: '21004',
    name_fr: 'Bruxelles',
    name_nl: 'Brussel',
    slug_fr: 'bruxelles',
    slug_nl: 'brussel',
    postal_codes: ['1000', '1020', '1120', '1130'],
    latitude: 50.8503,
    longitude: 4.3517,
    province_id: 'p-bruxelles',
    arrondissement_id: 'a-bruxelles',
    population: 185103,
    area_km2: 32.61,
    is_active: true,
    is_major_hub: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-bruxelles',
      name_fr: 'Bruxelles-Capitale',
      name_nl: 'Brussel Hoofdstedelijk Gewest',
      slug_fr: 'bruxelles-capitale',
    },
  },
  {
    id: 'c-ixelles',
    nis_code: '21009',
    name_fr: 'Ixelles',
    name_nl: 'Elsene',
    slug_fr: 'ixelles',
    slug_nl: 'elsene',
    postal_codes: ['1050'],
    latitude: 50.8236,
    longitude: 4.3726,
    province_id: 'p-bruxelles',
    arrondissement_id: 'a-bruxelles',
    population: 89120,
    area_km2: 6.34,
    is_active: true,
    is_major_hub: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-bruxelles',
      name_fr: 'Bruxelles-Capitale',
      name_nl: 'Brussel Hoofdstedelijk Gewest',
      slug_fr: 'bruxelles-capitale',
    },
  },
  {
    id: 'c-uccle',
    nis_code: '21005',
    name_fr: 'Uccle',
    name_nl: 'Ukkel',
    slug_fr: 'uccle',
    slug_nl: 'ukkel',
    postal_codes: ['1180'],
    latitude: 50.7985,
    longitude: 4.3625,
    province_id: 'p-bruxelles',
    arrondissement_id: 'a-bruxelles',
    population: 83703,
    area_km2: 22.91,
    is_active: true,
    is_major_hub: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-bruxelles',
      name_fr: 'Bruxelles-Capitale',
      name_nl: 'Brussel Hoofdstedelijk Gewest',
      slug_fr: 'bruxelles-capitale',
    },
  },
  {
    id: 'c-schaerbeek',
    nis_code: '21013',
    name_fr: 'Schaerbeek',
    name_nl: 'Schaarbeek',
    slug_fr: 'schaerbeek',
    slug_nl: 'schaarbeek',
    postal_codes: ['1030'],
    latitude: 50.8675,
    longitude: 4.3789,
    province_id: 'p-bruxelles',
    arrondissement_id: 'a-bruxelles',
    population: 133657,
    area_km2: 8.14,
    is_active: true,
    is_major_hub: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-bruxelles',
      name_fr: 'Bruxelles-Capitale',
      name_nl: 'Brussel Hoofdstedelijk Gewest',
      slug_fr: 'bruxelles-capitale',
    },
  },
  {
    id: 'c-anderlecht',
    nis_code: '21001',
    name_fr: 'Anderlecht',
    name_nl: 'Anderlecht',
    slug_fr: 'anderlecht',
    slug_nl: 'anderlecht',
    postal_codes: ['1070'],
    latitude: 50.8364,
    longitude: 4.3074,
    province_id: 'p-bruxelles',
    arrondissement_id: 'a-bruxelles',
    population: 120455,
    area_km2: 17.74,
    is_active: true,
    is_major_hub: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-bruxelles',
      name_fr: 'Bruxelles-Capitale',
      name_nl: 'Brussel Hoofdstedelijk Gewest',
      slug_fr: 'bruxelles-capitale',
    },
  },
  {
    id: 'c-etterbeek',
    nis_code: '21008',
    name_fr: 'Etterbeek',
    name_nl: 'Etterbeek',
    slug_fr: 'etterbeek',
    slug_nl: 'etterbeek',
    postal_codes: ['1040'],
    latitude: 50.8328,
    longitude: 4.3878,
    province_id: 'p-bruxelles',
    arrondissement_id: 'a-bruxelles',
    population: 48062,
    area_km2: 3.15,
    is_active: true,
    is_major_hub: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-bruxelles',
      name_fr: 'Bruxelles-Capitale',
      name_nl: 'Brussel Hoofdstedelijk Gewest',
      slug_fr: 'bruxelles-capitale',
    },
  },
  {
    id: 'c-liege',
    nis_code: '62063',
    name_fr: 'Liège',
    name_nl: 'Luik',
    slug_fr: 'liege',
    slug_nl: 'luik-stad',
    postal_codes: ['4000', '4020', '4030'],
    latitude: 50.6326,
    longitude: 5.5797,
    province_id: 'p-liege',
    arrondissement_id: 'a-liege',
    population: 197386,
    area_km2: 69.39,
    is_active: true,
    is_major_hub: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-liege',
      name_fr: 'Liège',
      name_nl: 'Luik',
      slug_fr: 'liege',
    },
  },
  {
    id: 'c-namur',
    nis_code: '92094',
    name_fr: 'Namur',
    name_nl: 'Namen',
    slug_fr: 'namur',
    slug_nl: 'namen-stad',
    postal_codes: ['5000', '5001', '5020'],
    latitude: 50.4669,
    longitude: 4.8675,
    province_id: 'p-namur',
    arrondissement_id: 'a-namur',
    population: 113296,
    area_km2: 175.69,
    is_active: true,
    is_major_hub: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-namur',
      name_fr: 'Namur',
      name_nl: 'Namen',
      slug_fr: 'namur',
    },
  },
  {
    id: 'c-charleroi',
    nis_code: '52011',
    name_fr: 'Charleroi',
    name_nl: 'Charleroi',
    slug_fr: 'charleroi',
    slug_nl: 'charleroi',
    postal_codes: ['6000', '6001', '6010'],
    latitude: 50.4109,
    longitude: 4.4444,
    province_id: 'p-hainaut',
    arrondissement_id: 'a-charleroi',
    population: 201555,
    area_km2: 102.08,
    is_active: true,
    is_major_hub: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-hainaut',
      name_fr: 'Hainaut',
      name_nl: 'Henegouwen',
      slug_fr: 'hainaut',
    },
  },
  {
    id: 'c-mons',
    nis_code: '55022',
    name_fr: 'Mons',
    name_nl: 'Bergen',
    slug_fr: 'mons',
    slug_nl: 'bergen',
    postal_codes: ['7000', '7012'],
    latitude: 50.4542,
    longitude: 3.9562,
    province_id: 'p-hainaut',
    arrondissement_id: 'a-mons',
    population: 96994,
    area_km2: 146.56,
    is_active: true,
    is_major_hub: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-hainaut',
      name_fr: 'Hainaut',
      name_nl: 'Henegouwen',
      slug_fr: 'hainaut',
    },
  },
  {
    id: 'c-wavre',
    nis_code: '25112',
    name_fr: 'Wavre',
    name_nl: 'Waver',
    slug_fr: 'wavre',
    slug_nl: 'waver',
    postal_codes: ['1300'],
    latitude: 50.7175,
    longitude: 4.6122,
    province_id: 'p-brabant-wallon',
    arrondissement_id: 'a-nivelles',
    population: 33801,
    area_km2: 41.8,
    is_active: true,
    is_major_hub: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-brabant-wallon',
      name_fr: 'Brabant wallon',
      name_nl: 'Waals-Brabant',
      slug_fr: 'brabant-wallon',
    },
  },
  {
    id: 'c-waterloo',
    nis_code: '25110',
    name_fr: 'Waterloo',
    name_nl: 'Waterloo',
    slug_fr: 'waterloo',
    slug_nl: 'waterloo',
    postal_codes: ['1410'],
    latitude: 50.7177,
    longitude: 4.3986,
    province_id: 'p-brabant-wallon',
    arrondissement_id: 'a-nivelles',
    population: 30174,
    area_km2: 21.03,
    is_active: true,
    is_major_hub: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-brabant-wallon',
      name_fr: 'Brabant wallon',
      name_nl: 'Waals-Brabant',
      slug_fr: 'brabant-wallon',
    },
  },
  {
    id: 'c-tournai',
    nis_code: '57081',
    name_fr: 'Tournai',
    name_nl: 'Doornik',
    slug_fr: 'tournai',
    slug_nl: 'doornik',
    postal_codes: ['7500'],
    latitude: 50.6056,
    longitude: 3.3881,
    province_id: 'p-hainaut',
    arrondissement_id: 'a-tournai',
    population: 69554,
    area_km2: 213.76,
    is_active: true,
    is_major_hub: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-hainaut',
      name_fr: 'Hainaut',
      name_nl: 'Henegouwen',
      slug_fr: 'hainaut',
    },
  },
]
 
export const FALLBACK_COMMUNES: CommuneRecord[] = RAW_FALLBACK_COMMUNES.map((c) => ({
  name_de: null,
  water_hardness_fh: 28,
  transit_axes: ['R0', 'E40'],
  ...c,
}))

export function getFallbackCommuneBySlug(slug: string): CommuneRecord | null {
  const normalized = slug.toLowerCase().trim()
  return (
    FALLBACK_COMMUNES.find(
      (c) => c.slug_fr === normalized || c.slug_fr.replace(/-/g, '') === normalized
    ) || null
  )
}

export function getFallbackNearbyCommunes(
  currentId: string,
  limit = 6
): NearbyCommuneResult[] {
  return FALLBACK_COMMUNES.filter((c) => c.id !== currentId)
    .slice(0, limit)
    .map((c, i) => ({
      id: c.id,
      name_fr: c.name_fr,
      slug_fr: c.slug_fr,
      province_name_fr: c.provinces?.name_fr || 'Belgique',
      distance_km: Number((3.2 + i * 2.1).toFixed(1)),
    }))
}

export function getFallbackNearestMajorHub(
  currentId: string,
  provinceId?: string
): MajorCityResult | null {
  const current = FALLBACK_COMMUNES.find((c) => c.id === currentId)
  if (current?.is_major_hub) {
    if (current.slug_fr !== 'bruxelles' && current.province_id === 'p-bruxelles') {
      const bxl = FALLBACK_COMMUNES.find((c) => c.slug_fr === 'bruxelles')
      if (bxl) {
        return {
          id: bxl.id,
          name_fr: bxl.name_fr,
          slug_fr: bxl.slug_fr,
          distance_km: 4.2,
        }
      }
    }
    return null
  }

  const hubs = FALLBACK_COMMUNES.filter((c) => c.is_major_hub && c.id !== currentId)
  if (hubs.length === 0) return null

  if (provinceId === 'p-bruxelles' || current?.provinces?.slug_fr === 'bruxelles-capitale') {
    const bxl = hubs.find((c) => c.slug_fr === 'bruxelles')
    if (bxl) return { id: bxl.id, name_fr: bxl.name_fr, slug_fr: bxl.slug_fr, distance_km: 5.0 }
  }

  const sameProvinceHub = hubs.find((c) => c.province_id === (provinceId || current?.province_id))
  if (sameProvinceHub) {
    return {
      id: sameProvinceHub.id,
      name_fr: sameProvinceHub.name_fr,
      slug_fr: sameProvinceHub.slug_fr,
      distance_km: 8.5,
    }
  }

  const first = hubs[0]!
  return {
    id: first.id,
    name_fr: first.name_fr,
    slug_fr: first.slug_fr,
    distance_km: 12.0,
  }
}

