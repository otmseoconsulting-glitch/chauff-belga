import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/merci', '/_next/'],
      },
      {
        // Explicitly allow AI search crawlers for GEO visibility
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Googlebot'],
        allow: '/',
        disallow: ['/api/', '/merci'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
