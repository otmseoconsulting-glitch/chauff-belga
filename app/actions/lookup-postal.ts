'use server'

import { z } from 'zod'
import { createPublicClient } from '@/lib/supabase/server'
import { validateBelgianPostalCode } from '@/lib/validation/belgian-postal'
import type { Result } from '@/types/common'

const schema = z.object({
  postalCode: z.string().regex(/^\d{4}$/, 'Code postal invalide (4 chiffres requis)'),
})

export interface CommuneSearchResult {
  id: string
  nameFr: string
  slug: string
  province: string
  postalCodes: string[]
}

export async function lookupPostal(
  postalCode: string
): Promise<Result<CommuneSearchResult[]>> {
  const parsed = schema.safeParse({ postalCode })
  if (!parsed.success) {
    return {
      success: false,
      error: 'Format de code postal invalide. 4 chiffres attendus.',
    }
  }

  const validation = validateBelgianPostalCode(postalCode)
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error || 'Code postal belge invalide.',
    }
  }

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.rpc('lookup_communes_by_postal_code', {
      postal_code: postalCode,
    })

    if (error || !data || data.length === 0) {
      // Fallback: search communes with postal_codes array containment
      const { data: fallbackData } = await supabase
        .from('communes')
        .select(`
          id,
          name_fr,
          slug_fr,
          postal_codes,
          provinces (
            name_fr
          )
        `)
        .contains('postal_codes', [postalCode])
        .eq('is_active', true)

      if (fallbackData && fallbackData.length > 0) {
        return {
          success: true,
          data: fallbackData.map((row) => ({
            id: row.id,
            nameFr: row.name_fr,
            slug: row.slug_fr,
            province: (row.provinces as unknown as { name_fr: string })?.name_fr || 'Belgique',
            postalCodes: row.postal_codes || [postalCode],
          })),
        }
      }

      return {
        success: false,
        error: `Aucune commune trouvée pour le code postal ${postalCode}. Nos équipes interviennent toutefois partout en Belgique.`,
      }
    }

    return {
      success: true,
      data: data.map((row) => ({
        id: row.id,
        nameFr: row.name_fr,
        slug: row.slug_fr,
        province: row.province_name_fr,
        postalCodes: [postalCode],
      })),
    }
  } catch (err) {
    console.error('[lookupPostal] error:', err)
    return {
      success: false,
      error: 'Impossible de vérifier le code postal actuellement.',
    }
  }
}
