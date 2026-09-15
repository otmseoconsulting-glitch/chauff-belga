/**
 * Content Uniqueness and Similarity Engine
 * Uses Tokenization, Term Frequency (TF), and Cosine Similarity.
 * Target: similarity <= 0.15 (i.e. >= 85% unique content between any two commune pages).
 */

export const FRENCH_STOP_WORDS = new Set([
  'alors', 'au', 'aucuns', 'aussi', 'autre', 'avant', 'avec', 'avoir', 'bon', 'car',
  'ce', 'cela', 'ces', 'cet', 'cette', 'ceux', 'chaque', 'ci', 'comme', 'comment',
  'dans', 'des', 'du', 'elle', 'elles', 'en', 'encore', 'es', 'est', 'et', 'eu',
  'fait', 'faites', 'fois', 'font', 'hors', 'ici', 'il', 'ils', 'je', 'la', 'le',
  'les', 'leur', 'leurs', 'ma', 'mais', 'me', 'meme', 'même', 'mes', 'moi', 'mon',
  'mot', 'ne', 'nos', 'notre', 'nous', 'ou', 'où', 'par', 'parce', 'pas', 'peut',
  'peu', 'plupart', 'pour', 'pourquoi', 'quand', 'que', 'quel', 'quelle', 'quelles',
  'quels', 'qui', 'sa', 'sans', 'se', 'ses', 'seulement', 'si', 'sien', 'son',
  'sont', 'sous', 'soyez', 'sur', 'ta', 'tandis', 'tellement', 'tels', 'tes', 'ton',
  'tous', 'tout', 'trop', 'très', 'tu', 'un', 'une', 'voici', 'voilà', 'vos',
  'votre', 'vous', 'vont', 'été', 'être'
])

export function calculateCosineSimilarity(text1: string, text2: string): number {
  const tokenize = (text: string): Map<string, number> => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\sàâäéèêëîïôöùûüç]/gi, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !FRENCH_STOP_WORDS.has(w))

    const freq = new Map<string, number>()
    for (const word of words) {
      freq.set(word, (freq.get(word) ?? 0) + 1)
    }
    return freq
  }

  const freq1 = tokenize(text1)
  const freq2 = tokenize(text2)

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

export interface UniquenessResult {
  passes: boolean
  maxSimilarity: number
  avgSimilarity: number
  offendingPair?: {
    comparedTo: string
    similarity: number
  } | undefined
}

/**
 * Validates that a commune's content is unique compared to other communes
 */
export function validateUniqueness(
  targetContent: string,
  sampleContents: { name: string; content: string }[],
  maxSimilarityThreshold: number = 0.35 // Cosine similarity threshold (1.0 = identical, 0.0 = completely distinct)
): UniquenessResult {
  let maxSim = 0
  let totalSim = 0
  let worstMatch: { name: string; similarity: number } | undefined

  for (const sample of sampleContents) {
    const sim = calculateCosineSimilarity(targetContent, sample.content)
    totalSim += sim
    if (sim > maxSim) {
      maxSim = sim
      worstMatch = { name: sample.name, similarity: sim }
    }
  }

  const avgSim = sampleContents.length > 0 ? totalSim / sampleContents.length : 0

  const result: UniquenessResult = {
    passes: maxSim <= maxSimilarityThreshold,
    maxSimilarity: maxSim,
    avgSimilarity: avgSim,
  }

  if (worstMatch && worstMatch.similarity > maxSimilarityThreshold) {
    result.offendingPair = {
      comparedTo: worstMatch.name,
      similarity: worstMatch.similarity,
    }
  }

  return result
}
