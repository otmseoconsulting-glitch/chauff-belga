import type { MetadataRoute } from 'next'
import { getAllActiveCommuneSlugs } from '@/lib/supabase/communes'

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://chauffagiste-belga.be'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const communeSlugs = await getAllActiveCommuneSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const communeRoutes: MetadataRoute.Sitemap = communeSlugs.map((slug) => ({
    url: `${SITE_URL}/chauffagiste-${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticRoutes, ...communeRoutes]
}
