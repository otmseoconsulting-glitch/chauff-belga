import type { Metadata } from 'next'
import type { CommuneRecord } from '@/lib/supabase/communes'

export function generateCommuneMetadata(commune: CommuneRecord): Metadata {
  const communeName = commune.name_fr
  const postal = commune.postal_codes?.[0] ?? ''
  const canonicalUrl = `https://chauffagiste-belga.be/chauffagiste-${commune.slug_fr}`

  const title = `Chauffagiste ${communeName} — Dépannage ≤ 24h & Entretien | 7j/7`
  const description = `Chauffagiste agréé Cerga à ${communeName} (${postal}). Dépannage d'urgence chaudière ≤ 24h, entretien annuel obligatoire PEB et installation. Devis gratuit 7j/7.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Chauffagiste-Belga',
      locale: 'fr_BE',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
