import { sanityClient, isSanityConfigured } from './client'
import { ALL_POSTS_QUERY, POST_BY_SLUG_QUERY, ALL_POST_SLUGS_QUERY } from './queries'
import { FALLBACK_POSTS } from './fallback-posts'
import type { Post, PostSummary } from '@/types/content'

/**
 * Fetch all published blog articles with fallback
 */
export async function getAllPosts(): Promise<PostSummary[]> {
  if (isSanityConfigured) {
    try {
      const posts = await sanityClient.fetch<PostSummary[]>(
        ALL_POSTS_QUERY,
        {},
        { next: { revalidate: 3600, tags: ['posts'] } }
      )
      if (posts && posts.length > 0) return posts
    } catch (err) {
      console.warn('[getAllPosts] Failed to query Sanity, using fallback articles:', err)
    }
  }

  return FALLBACK_POSTS.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    publishedAt: p.publishedAt,
    excerpt: p.excerpt,
    category: p.category,
    readTime: p.readTime,
    author: p.author,
  }))
}

/**
 * Fetch a single blog post by its slug with fallback
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isSanityConfigured) {
    try {
      const post = await sanityClient.fetch<Post | null>(
        POST_BY_SLUG_QUERY,
        { slug },
        { next: { revalidate: 3600, tags: [`post:${slug}`] } }
      )
      if (post) return post
    } catch (err) {
      console.warn(`[getPostBySlug] Failed to query Sanity for ${slug}, using fallback:`, err)
    }
  }

  const fallback = FALLBACK_POSTS.find((p) => p.slug === slug)
  return fallback || null
}

/**
 * Fetch all published article slugs for generateStaticParams
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    try {
      const slugs = await sanityClient.fetch<Array<{ slug: string }>>(
        ALL_POST_SLUGS_QUERY,
        {},
        { next: { revalidate: 3600, tags: ['posts'] } }
      )
      if (slugs && slugs.length > 0) return slugs.map((s) => s.slug)
    } catch (err) {
      console.warn('[getAllPostSlugs] Failed to query Sanity slugs, using fallback:', err)
    }
  }

  return FALLBACK_POSTS.map((p) => p.slug)
}
