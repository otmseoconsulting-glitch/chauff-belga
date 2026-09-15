import type { MetadataRoute } from 'next'
import { getAllActiveCommuneSlugs } from '@/lib/supabase/communes'
import { getAllPostSlugs } from '@/lib/sanity/blog'
import { getAllServiceSlugs } from '@/lib/data/services-data'
import { siteUrl } from '@/lib/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [communeSlugs, postSlugs] = await Promise.all([
    getAllActiveCommuneSlugs(),
    getAllPostSlugs(),
  ])
  const serviceSlugs = getAllServiceSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/urgence`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/nos-services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/devis`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tarifs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/conseils`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${siteUrl}/avis-clients`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${siteUrl}/notre-equipe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/nos-engagements`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/rgpd`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/conditions-generales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${siteUrl}/conseils/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/nos-services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const communeRoutes: MetadataRoute.Sitemap = communeSlugs.map((slug) => ({
    url: `${siteUrl}/chauffagiste-${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...communeRoutes]
}
