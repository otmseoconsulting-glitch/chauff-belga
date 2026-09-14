# Skill: Spintax Engine
# Content Uniqueness & Variation Validator
# Project: Chauffagiste-Belga

---

## Purpose

Generate deterministic, unique content variants for 580+ Belgian commune pages using spintax templates seeded with the commune's NIS code. Ensures ≥85% content uniqueness across all pages while maintaining grammatical correctness in French.

---

## Why Deterministic?

Next.js SSR and RSC require that the same input always produces the same output. Using `Math.random()` would cause hydration mismatches between server-rendered HTML and client-side React reconciliation. The NIS code seed ensures:
- Same commune always gets same content variant (reproducible)
- Different communes get different variants (uniqueness)
- No hydration errors from SSR/client mismatch

---

## Core Algorithm

```typescript
// lib/seo/spintax.ts

/**
 * Deterministic pseudo-random number generator (PRNG)
 * Uses xorshift32 seeded with commune NIS code
 * Output: float in [0, 1) — equivalent to Math.random()
 */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0 // Ensure 32-bit unsigned integer

  return function () {
    // xorshift32 algorithm
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    // Normalize to [0, 1)
    return (state >>> 0) / 4294967296
  }
}

/**
 * Resolve a spintax string deterministically.
 *
 * Spintax format: {option1|option2|option3}
 * Nested spintax: {option1|{sub-option1|sub-option2}|option3}
 *
 * @param template - Spintax template string
 * @param nisSeed - Commune NIS code as integer (e.g., 21004 for Bruxelles)
 * @returns Resolved string with all variants selected
 *
 * @example
 * resolveSpintax('{Dépannage|Réparation} chaudière', 21004)
 * // → 'Réparation chaudière' (deterministic for NIS 21004)
 */
export function resolveSpintax(template: string, nisSeed: number): string {
  const rng = seededRandom(nisSeed)

  function resolve(input: string): string {
    // No spintax markers — return as-is
    if (!input.includes('{')) return input

    let result = ''
    let i = 0

    while (i < input.length) {
      if (input[i] === '{') {
        // Find matching closing brace (handles nesting)
        let depth = 1
        let j = i + 1
        while (j < input.length && depth > 0) {
          if (input[j] === '{') depth++
          if (input[j] === '}') depth--
          j++
        }

        // Extract the spintax group content
        const group = input.slice(i + 1, j - 1)

        // Split by | at depth 0 only (avoid splitting nested groups)
        const options = splitSpintaxOptions(group)

        // Select option using seeded RNG
        const selectedIndex = Math.floor(rng() * options.length)
        const selected = options[selectedIndex] ?? options[0] ?? ''

        // Recursively resolve the selected option (for nested spintax)
        result += resolve(selected)
        i = j
      } else {
        result += input[i]
        i++
      }
    }

    return result
  }

  return resolve(template)
}

/**
 * Split spintax options at depth-0 pipe characters
 * Handles: {A|{B|C}|D} → ['A', '{B|C}', 'D']
 */
function splitSpintaxOptions(group: string): string[] {
  const options: string[] = []
  let current = ''
  let depth = 0

  for (const char of group) {
    if (char === '{') {
      depth++
      current += char
    } else if (char === '}') {
      depth--
      current += char
    } else if (char === '|' && depth === 0) {
      options.push(current)
      current = ''
    } else {
      current += char
    }
  }

  if (current) options.push(current)
  return options
}
```

---

## Spintax Matrix Structure

```typescript
// types/spintax.ts
export interface SpintaxBlock {
  id: string               // Unique block identifier
  placement: BlockPlacement // Where in the page this block appears
  template: string          // Spintax template
  minWords: number          // Expected minimum word count after resolution
  category: string          // Service category this block is for
}

export type BlockPlacement =
  | 'hero-subheadline'
  | 'intro-paragraph'
  | 'service-description'
  | 'trust-statement'
  | 'urgency-paragraph'
  | 'closing-cta'
  | 'faq-intro'
```

---

## Content Block Examples (from `docs/seo/02-spintax-matrix.json`)

```json
[
  {
    "id": "intro-depannage-01",
    "placement": "intro-paragraph",
    "category": "depannage-chaudiere",
    "minWords": 40,
    "template": "{Chauffagiste-Belga intervient|Notre équipe de chauffagistes intervient|Nos techniciens certifiés interviennent} {rapidement|en urgence|dans les meilleurs délais} à {commune} pour tout {dépannage|problème|dysfonctionnement} de {chaudière|chauffage central|installation de chauffage}. {Panne, fuite, perte de pression|Chaudière en panne, fuite d'eau, perte de chaleur|Problème de chaudière, fuite ou pression insuffisante} : {nous sommes disponibles 7j/7, 24h/24|notre équipe est joignable 7 jours sur 7|nous intervenons en urgence à toute heure}."
  },
  {
    "id": "trust-statement-01",
    "placement": "trust-statement",
    "category": "general",
    "minWords": 25,
    "template": "{Depuis plus de 10 ans|Fort de plus d'une décennie d'expérience|Avec plus de 10 années d'expertise}, Chauffagiste-Belga {accompagne|aide|assiste} {les particuliers et professionnels|les ménages belges|les clients résidentiels et commerciaux} de {commune} avec {un service fiable et de qualité|des interventions rapides et durables|un service chauffage de confiance}."
  },
  {
    "id": "urgency-01",
    "placement": "urgency-paragraph",
    "category": "depannage-chaudiere",
    "minWords": 30,
    "template": "{En cas de panne|Pour toute urgence|Si votre chaudière tombe en panne} à {commune}, {n'attendez pas|ne perdez pas de temps|contactez-nous immédiatement}. {Un technicien qualifié|Notre technicien agréé|Un de nos chauffagistes certifiés} peut {intervenir chez vous en moins de 2 heures|être chez vous en 2h maximum|arriver sur place rapidement} pour les {urgences chauffage|pannes critiques|situations d'urgence}."
  },
  {
    "id": "entretien-intro-01",
    "placement": "intro-paragraph",
    "category": "entretien-chaudiere",
    "minWords": 45,
    "template": "{L'entretien annuel de votre chaudière|Le contrôle annuel de votre installation de chauffage|La révision annuelle de votre chaudière} à {commune} est {obligatoire selon la réglementation belge|imposé par la loi belge|requis par les normes belges en vigueur}. {Chauffagiste-Belga|Notre équipe certifiée|Nos techniciens agréés Cerga} {réalise|effectue|assure} {cet entretien réglementaire|cette révision obligatoire|ce contrôle annuel réglementaire} avec {soin et professionnalisme|rigueur et expertise|tout le sérieux requis}, en {émettant le rapport de conformité nécessaire|délivrant le certificat d'entretien|fournissant le document réglementaire}."
  },
  {
    "id": "closing-cta-01",
    "placement": "closing-cta",
    "category": "general",
    "minWords": 20,
    "template": "{Besoin d'un chauffagiste à {commune}|Vous cherchez un chauffagiste de confiance à {commune}|Un problème de chauffage à {commune}} ? {Contactez-nous maintenant|Appelez notre équipe|Demandez votre devis} : {devis gratuit|intervention rapide|service disponible} {7j/7 et 24h/24|tous les jours|sans délai}. ☎ 0475 12 34 56."
  }
]
```

---

## Content Resolver

```typescript
// lib/seo/content-resolver.ts
import { resolveSpintax } from './spintax'
import spintaxMatrix from '@/docs/seo/02-spintax-matrix.json'
import type { SpintaxBlock, BlockPlacement } from '@/types/spintax'

const matrix = spintaxMatrix as SpintaxBlock[]

/**
 * Resolve all content blocks for a specific commune page.
 * Replaces {commune} placeholders with actual commune name.
 *
 * @param communeNameFr - Commune name in French
 * @param nisCode - NIS code as integer seed
 * @param category - Service category filter
 */
export function resolvePageContent(
  communeNameFr: string,
  nisCode: number,
  category: string = 'general'
): Record<BlockPlacement, string> {
  const relevantBlocks = matrix.filter(
    (block) => block.category === category || block.category === 'general'
  )

  const resolved: Partial<Record<BlockPlacement, string>> = {}

  for (const block of relevantBlocks) {
    // Replace {commune} placeholder with actual commune name
    const withCommune = block.template.replace(/{commune}/g, communeNameFr)

    // Resolve spintax with NIS-seeded RNG
    // Add block index offset to NIS code to ensure different blocks get different variations
    const blockSeed = nisCode + block.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const resolvedText = resolveSpintax(withCommune, blockSeed)

    resolved[block.placement] = resolvedText
  }

  return resolved as Record<BlockPlacement, string>
}
```

---

## Uniqueness Validator

```typescript
// lib/seo/uniqueness.ts

/**
 * Calculate cosine similarity between two text strings.
 * Used to ensure commune pages are sufficiently unique.
 * Target: similarity < 0.15 (i.e., >85% unique) between any two pages.
 */
export function calculateCosineSimilarity(text1: string, text2: string): number {
  const tokenize = (text: string): Map<string, number> => {
    const words = text.toLowerCase().split(/\W+/).filter(Boolean)
    const freq = new Map<string, number>()
    for (const word of words) {
      freq.set(word, (freq.get(word) ?? 0) + 1)
    }
    return freq
  }

  const freq1 = tokenize(text1)
  const freq2 = tokenize(text2)

  // Union of all terms
  const allTerms = new Set([...freq1.keys(), ...freq2.keys()])

  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  for (const term of allTerms) {
    const v1 = freq1.get(term) ?? 0
    const v2 = freq2.get(term) ?? 0
    dotProduct += v1 * v2
    magnitude1 += v1 * v1
    magnitude2 += v2 * v2
  }

  if (magnitude1 === 0 || magnitude2 === 0) return 0

  return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2))
}

/**
 * Validate that a resolved page content is unique enough.
 * Run this against a sample of other commune pages during build.
 */
export function validateUniqueness(
  targetContent: string,
  sampleContents: string[],
  threshold: number = 0.15 // Max allowed similarity
): { passes: boolean; maxSimilarity: number; offendingIndex?: number } {
  let maxSimilarity = 0
  let offendingIndex: number | undefined

  for (let i = 0; i < sampleContents.length; i++) {
    const similarity = calculateCosineSimilarity(targetContent, sampleContents[i]!)
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity
      if (similarity > threshold) {
        offendingIndex = i
      }
    }
  }

  return {
    passes: maxSimilarity <= threshold,
    maxSimilarity,
    offendingIndex,
  }
}
```

---

## Build-Time Validation Script

```typescript
// scripts/validate-content-uniqueness.ts
import { resolvePageContent } from '@/lib/seo/content-resolver'
import { validateUniqueness } from '@/lib/seo/uniqueness'
import { getAllCommunes } from '@/lib/supabase/geo'

async function main() {
  const communes = await getAllCommunes()
  const resolvedContents: string[] = []

  for (const commune of communes) {
    const content = resolvePageContent(commune.nameFr, parseInt(commune.nisCode), 'depannage-chaudiere')
    const fullText = Object.values(content).join(' ')
    resolvedContents.push(fullText)
  }

  let failures = 0

  for (let i = 0; i < resolvedContents.length; i++) {
    const target = resolvedContents[i]!
    const others = [...resolvedContents.slice(0, i), ...resolvedContents.slice(i + 1)]

    // Sample 20 random comparisons (not all 580 — too slow)
    const sample = others.sort(() => Math.random() - 0.5).slice(0, 20)

    const result = validateUniqueness(target, sample)

    if (!result.passes) {
      console.error(`❌ Commune ${communes[i]?.nameFr} (NIS: ${communes[i]?.nisCode}): similarity ${(result.maxSimilarity * 100).toFixed(1)}% > 15%`)
      failures++
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} commune(s) failed uniqueness validation. Add more spintax variants.`)
    process.exit(1)
  } else {
    console.log(`✅ All ${communes.length} communes pass uniqueness validation (>85% unique).`)
  }
}

main().catch(console.error)
```

---

## Uniqueness Targets

| Comparison | Max Similarity | Enforcement |
|-----------|---------------|-------------|
| Same service, different communes | ≤ 15% | Build-time script |
| Different services, same commune | ≤ 25% | Spot-check |
| Same commune, French vs Dutch | ≤ 10% | Translation review |

## Minimum Spintax Requirements

To achieve ≥85% uniqueness across 580 communes, each content block needs:
- **Minimum 3 options** per `{...}` group
- **Minimum 3 spintax groups** per block
- **Total variant combinations**: 3³ = 27 per block (covers 580 communes with overlap)
- **Recommended**: 4 options × 4 groups = 256 combinations

If uniqueness fails for a block, **add more option branches** to the spintax template — never modify the seeding algorithm.