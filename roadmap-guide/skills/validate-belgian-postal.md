# Skill: Validate Belgian Postal Code
# NIS/INS Code & ZIP Code Validation
# Project: Chauffagiste-Belga

---

## Purpose

Validate Belgian postal codes (4-digit ZIP) and cross-reference NIS/INS administrative codes for commune identification. Used in lead forms, postal lookup widgets, and geo-targeting logic.

---

## Belgian Postal Code Rules

- **Format**: 4 digits, range 1000–9992
- **Leading zeros**: Never — all codes are 4-digit integers
- **Assignment**: Belgium Post (bpost) — not strictly geographic
- **Quirks**:
  - One postal code can cover multiple communes
  - One commune can have multiple postal codes
  - Postal codes ≠ NIS codes (NIS codes are 5-digit administrative identifiers)
  - Military/NATO codes exist but are excluded from this system

### Valid Ranges by Region

| Range | Region |
|-------|--------|
| 1000–1299 | Brussels-Capital Region |
| 1300–1499 | Brabant wallon (Walloon Brabant) |
| 1500–1999 | Flemish Brabant |
| 2000–2999 | Province of Antwerp |
| 3000–3499 | Flemish Brabant |
| 3500–3999 | Limburg |
| 4000–4999 | Province of Liège |
| 5000–5999 | Province of Namur |
| 6000–6599 | Province of Hainaut |
| 6600–6999 | Province of Luxembourg |
| 7000–7999 | Province of Hainaut |
| 8000–8999 | West Flanders |
| 9000–9992 | East Flanders |

### Known Invalid Postal Codes (gaps in bpost allocation)

Some ranges within the valid boundaries are unassigned. The validation approach is:
1. **Syntactic validation** (fast): check 4-digit format and numeric range
2. **Semantic validation** (authoritative): lookup against Supabase `communes.postal_codes` array

---

## TypeScript Implementation

```typescript
// lib/validation/belgian-postal.ts

/**
 * Result type for postal code validation
 */
export type PostalValidationResult =
  | { valid: true; postalCode: string; region: BelgianRegion }
  | { valid: false; error: string; code: PostalErrorCode }

export type BelgianRegion =
  | 'brussels-capital'
  | 'walloon-brabant'
  | 'flemish-brabant'
  | 'antwerp'
  | 'limburg'
  | 'liege'
  | 'namur'
  | 'hainaut'
  | 'luxembourg'
  | 'west-flanders'
  | 'east-flanders'

export type PostalErrorCode =
  | 'INVALID_FORMAT'    // Not 4 digits
  | 'OUT_OF_RANGE'      // Below 1000 or above 9992
  | 'KNOWN_INVALID'     // Known unassigned code

/**
 * Range definitions for regional detection
 */
const POSTAL_RANGES: Array<{
  min: number
  max: number
  region: BelgianRegion
}> = [
  { min: 1000, max: 1299, region: 'brussels-capital' },
  { min: 1300, max: 1499, region: 'walloon-brabant' },
  { min: 1500, max: 1999, region: 'flemish-brabant' },
  { min: 2000, max: 2999, region: 'antwerp' },
  { min: 3000, max: 3499, region: 'flemish-brabant' },
  { min: 3500, max: 3999, region: 'limburg' },
  { min: 4000, max: 4999, region: 'liege' },
  { min: 5000, max: 5999, region: 'namur' },
  { min: 6000, max: 6599, region: 'hainaut' },
  { min: 6600, max: 6999, region: 'luxembourg' },
  { min: 7000, max: 7999, region: 'hainaut' },
  { min: 8000, max: 8999, region: 'west-flanders' },
  { min: 9000, max: 9992, region: 'east-flanders' },
]

/**
 * Syntactic validation — runs client-side, no DB required.
 * Use this for instant form feedback before server roundtrip.
 */
export function validateBelgianPostalCode(
  input: string | number
): PostalValidationResult {
  // Normalize input
  const raw = String(input).trim().replace(/\s/g, '')

  // Format check: must be exactly 4 digits
  if (!/^\d{4}$/.test(raw)) {
    return {
      valid: false,
      error: 'Le code postal doit comporter exactement 4 chiffres.',
      code: 'INVALID_FORMAT',
    }
  }

  const numeric = parseInt(raw, 10)

  // Absolute range check
  if (numeric < 1000 || numeric > 9992) {
    return {
      valid: false,
      error: 'Code postal hors de la plage belge valide (1000–9992).',
      code: 'OUT_OF_RANGE',
    }
  }

  // Detect region
  const rangeMatch = POSTAL_RANGES.find(
    (r) => numeric >= r.min && numeric <= r.max
  )

  if (!rangeMatch) {
    return {
      valid: false,
      error: 'Code postal non attribué en Belgique.',
      code: 'KNOWN_INVALID',
    }
  }

  return {
    valid: true,
    postalCode: raw,
    region: rangeMatch.region,
  }
}

/**
 * Semantic validation — server-side only.
 * Cross-references Supabase database for confirmed commune match.
 */
export async function validateAndResolvePostalCode(
  postalCode: string
): Promise<{
  valid: boolean
  postalCode: string
  communes?: Array<{ id: string; nameFr: string; slug: string; province: string }>
  error?: string
}> {
  // First: syntactic check
  const syntactic = validateBelgianPostalCode(postalCode)
  if (!syntactic.valid) {
    return { valid: false, postalCode, error: syntactic.error }
  }

  // Second: DB lookup
  const { lookupByPostalCode } = await import('@/lib/supabase/geo')
  const communes = await lookupByPostalCode(postalCode)

  if (!communes || communes.length === 0) {
    return {
      valid: false,
      postalCode,
      error: `Aucune commune trouvée pour le code postal ${postalCode}. Vérifiez votre saisie.`,
    }
  }

  return {
    valid: true,
    postalCode,
    communes: communes.map((c) => ({
      id: c.id,
      nameFr: c.name_fr,
      slug: c.slug_fr,
      province: c.province_name_fr,
    })),
  }
}
```

---

## Zod Schema (Form Validation Integration)

```typescript
// lib/validation/schemas.ts
import { z } from 'zod'
import { validateBelgianPostalCode } from './belgian-postal'

export const belgianPostalCodeSchema = z
  .string()
  .trim()
  .min(4, 'Code postal requis (4 chiffres)')
  .max(4, 'Le code postal doit comporter 4 chiffres')
  .refine(
    (val) => validateBelgianPostalCode(val).valid,
    (val) => {
      const result = validateBelgianPostalCode(val)
      return { message: result.valid ? '' : result.error }
    }
  )

export const belgianPhoneSchema = z
  .string()
  .trim()
  .regex(
    /^(\+32|0032|0)[1-9]\d{7,8}$/,
    'Numéro de téléphone belge invalide. Format accepté : 0475 12 34 56 ou +32 475 12 34 56'
  )
  .transform((val) => val.replace(/\s/g, '')) // Normalize: strip spaces
```

---

## NIS Code Validation

```typescript
// lib/validation/nis-code.ts

/**
 * Validate Belgian NIS/INS administrative code
 * Format: 5 digits, first digit = province code
 * Brussels Communes: 21000–21015
 * Walloon Communes: 24000–99999 (partial)
 * Flemish Communes: 10000–49999 (partial)
 */

const NIS_PROVINCE_PREFIXES: Record<string, string> = {
  '01': 'Antwerp',
  '02': 'East Flanders',
  '03': 'Flemish Brabant / Brabant wallon',
  '04': 'Brussels-Capital',
  '05': 'Hainaut',
  '06': 'Liège',
  '07': 'Limburg',
  '08': 'Luxembourg',
  '09': 'Namur',
  '10': 'West Flanders',
}

export function validateNISCode(code: string | number): {
  valid: boolean
  province?: string
  error?: string
} {
  const raw = String(code).trim()

  if (!/^\d{5}$/.test(raw)) {
    return { valid: false, error: 'Le code NIS doit comporter exactement 5 chiffres.' }
  }

  const prefix = raw.slice(0, 2)
  const province = NIS_PROVINCE_PREFIXES[prefix]

  if (!province) {
    return { valid: false, error: `Préfixe NIS inconnu : ${prefix}` }
  }

  return { valid: true, province }
}
```

---

## Usage Examples

```typescript
// In a form Server Action
import { belgianPostalCodeSchema } from '@/lib/validation/schemas'

const schema = z.object({
  postalCode: belgianPostalCodeSchema,
  phone: belgianPhoneSchema,
})

// In a UI component (instant feedback)
import { validateBelgianPostalCode } from '@/lib/validation/belgian-postal'

function PostalInput({ onChange }) {
  const handleChange = (e) => {
    const result = validateBelgianPostalCode(e.target.value)
    if (result.valid) {
      // Show green indicator, trigger DB lookup
      onChange(result.postalCode)
    }
  }
}

// In middleware (geo-redirect)
import { validateBelgianPostalCode } from '@/lib/validation/belgian-postal'

const result = validateBelgianPostalCode(searchParams.get('postal') ?? '')
if (result.valid) {
  // Redirect to region-appropriate page
  const regionMap: Record<BelgianRegion, string> = {
    'brussels-capital': '/zones-intervention/bruxelles-capitale',
    'liege': '/zones-intervention/liege',
    // ...
  }
}
```

---

## Test Cases

```typescript
// __tests__/belgian-postal.test.ts
import { validateBelgianPostalCode } from '@/lib/validation/belgian-postal'

describe('validateBelgianPostalCode', () => {
  // Valid codes
  it('accepts 1000 (Brussels)', () => expect(validateBelgianPostalCode('1000')).toMatchObject({ valid: true, region: 'brussels-capital' }))
  it('accepts 4000 (Liège)', () => expect(validateBelgianPostalCode('4000')).toMatchObject({ valid: true, region: 'liege' }))
  it('accepts 9000 (Ghent)', () => expect(validateBelgianPostalCode('9000')).toMatchObject({ valid: true, region: 'east-flanders' }))
  it('accepts string with spaces', () => expect(validateBelgianPostalCode('10 00')).toMatchObject({ valid: false }))

  // Invalid codes
  it('rejects 999 (too short)', () => expect(validateBelgianPostalCode('999')).toMatchObject({ valid: false, code: 'INVALID_FORMAT' }))
  it('rejects 10000 (too long)', () => expect(validateBelgianPostalCode('10000')).toMatchObject({ valid: false, code: 'INVALID_FORMAT' }))
  it('rejects 0001 (below range)', () => expect(validateBelgianPostalCode('0001')).toMatchObject({ valid: false }))
  it('rejects 9999 (above range)', () => expect(validateBelgianPostalCode('9999')).toMatchObject({ valid: false, code: 'OUT_OF_RANGE' }))
  it('rejects letters', () => expect(validateBelgianPostalCode('B1000')).toMatchObject({ valid: false, code: 'INVALID_FORMAT' }))
})
```