import type { MetadataRoute } from 'next'
import { getAllActiveCommuneSlugs } from '@/lib/supabase/communes'
import { getAllPostSlugs } from '@/lib/sanity/blog'

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://chauffagiste-belga.be'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [communeSlugs, postSlugs] = await Promise.all([
    getAllActiveCommuneSlugs(),
    getAllPostSlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/devis`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/conseils`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
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

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${SITE_URL}/conseils/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const communeRoutes: MetadataRoute.Sitemap = communeSlugs.map((slug) => ({
    url: `${SITE_URL}/chauffagiste-${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticRoutes, ...postRoutes, ...communeRoutes]
}
