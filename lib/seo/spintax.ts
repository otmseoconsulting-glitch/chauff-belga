import { SPINTAX_BLOCKS } from './spintax-data'
import type { CommuneRecord } from '@/lib/supabase/communes'

/**
 * Deterministic XORShift32 pseudo-random number generator
 */
function xorshift32(seed: number): number {
  let x = seed === 0 ? 123456789 : seed
  x ^= x << 13
  x ^= x >> 17
  x ^= x << 5
  return x >>> 0
}

/**
 * Returns a deterministic float between [0, 1) based on a numeric seed
 */
function seededRandom(seed: number): number {
  return xorshift32(seed) / 0xffffffff
}

/**
 * Build a deterministic seed per commune NIS code + block ID
 */
export function buildBlockSeed(nisCode: string, blockId: string): number {
  const parsedNis = parseInt(nisCode.replace(/\D/g, ''), 10) || 1000
  const blockSum = blockId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return parsedNis * 1000 + blockSum
}

/**
 * Resolves spintax syntax: {Option A|Option B|Option C}
 */
export function resolveSpintax(template: string, seed: number): string {
  let currentSeed = seed

  return template.replace(/\{([^{}]+)\}/g, (_, options: string) => {
    currentSeed = xorshift32(currentSeed)
    const choices = options.split('|')
    const index = Math.floor(seededRandom(currentSeed) * choices.length)
    return choices[index] ?? choices[0] ?? ''
  })
}

/**
 * Helper to describe water hardness in French
 */
export function getWaterHardnessDescription(hardness: number | null): string {
  if (!hardness) return 'eau moyennement calcaire'
  if (hardness < 15) return 'eau très douce'
  if (hardness <= 25) return 'eau moyennement dure'
  if (hardness <= 35) return 'eau dure à forte teneur en calcaire'
  return 'eau très dure et très calcaire'
}

export interface GeneratedCommuneContent {
  introGeneral: string
  introDepannage: string
  introEntretien: string
  trustStatement: string
  trustCertifications: string
  urgencyStatement: string
  waterHardnessStatement: string
  closingCta: string
}

/**
 * Generate 100% deterministic, unique editorial copy for a specific commune
 */
export function generateCommuneContent(commune: CommuneRecord): GeneratedCommuneContent {
  const nis = commune.nis_code || '1000'
  const communeName = commune.name_fr
  const postal = commune.postal_codes?.[0] ?? ''
  const province = commune.provinces?.name_fr ?? 'Belgique'
  const hardness = commune.water_hardness_fh ?? 25
  const hardnessDesc = getWaterHardnessDescription(commune.water_hardness_fh)

  const replaceTokens = (text: string) =>
    text
      .replace(/{commune}/g, communeName)
      .replace(/{postal_code}/g, postal)
      .replace(/{province}/g, province)
      .replace(/{water_hardness}/g, hardness.toString())
      .replace(/{water_hardness_desc}/g, hardnessDesc)

  const resolveBlock = (blockId: string): string => {
    const template = SPINTAX_BLOCKS[blockId] ?? ''
    const withTokens = replaceTokens(template)
    const seed = buildBlockSeed(nis, blockId)
    return resolveSpintax(withTokens, seed)
  }

  return {
    introGeneral: resolveBlock('intro-general-01'),
    introDepannage: resolveBlock('intro-depannage-01'),
    introEntretien: resolveBlock('intro-entretien-01'),
    trustStatement: resolveBlock('trust-statement-01'),
    trustCertifications: resolveBlock('trust-certifications-01'),
    urgencyStatement: resolveBlock('urgency-01'),
    waterHardnessStatement: resolveBlock('water-hardness-01'),
    closingCta: resolveBlock('closing-cta-01'),
  }
}
