# 04 — Sanity CMS: Schema Rules, GROQ Queries & ISR Revalidation
# Project: Chauffagiste-Belga

---

## §1. Sanity Studio Configuration

```typescript
// sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemas'
import { structure } from './structure'

export default defineConfig({
  name: 'chauffagiste-belga',
  title: 'Chauffagiste-Belga CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

---

## §2. Schema Definitions

### 2.1 Blog Post Schema

```typescript
// sanity/schemas/post.ts
import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const post = defineType({
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required().max(80).warning('Optimal SEO: 50–70 caractères'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 80,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Strip diacritics
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim(),
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (R) =>
            R.required().error('Alt text obligatoire pour l\'accessibilité et le SEO'),
        }),
        defineField({
          name: 'caption',
          title: 'Légende',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé (meta description)',
      type: 'text',
      rows: 3,
      validation: (R) =>
        R.required()
         .min(100)
         .max(160)
         .warning('Optimal SEO: 120–155 caractères pour la meta description'),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'blockContent',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (JSON-LD FAQPage)',
      type: 'array',
      of: [{ type: 'faqItem' }],
      description: 'Questions fréquentes — génère automatiquement le schéma FAQPage',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Services liés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { value: 'depannage', title: 'Dépannage chaudière' },
          { value: 'entretien', title: 'Entretien chaudière' },
          { value: 'installation', title: 'Installation chauffage' },
          { value: 'reparation', title: 'Réparation chaudière' },
          { value: 'debouchage', title: 'Débouchage' },
        ],
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO avancé',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta description', type: 'text', rows: 2 }),
        defineField({ name: 'noIndex', title: 'Exclure du SEO (noindex)', type: 'boolean', initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('fr-BE') : 'Non publié'
      return {
        title,
        subtitle: `${author ?? 'Sans auteur'} · ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date de publication (récent en premier)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
```

### 2.2 Author Schema

```typescript
// sanity/schemas/author.ts
export const author = defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Texte alt' })],
    }),
    defineField({ name: 'bio', title: 'Biographie courte', type: 'text', rows: 3 }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      options: { list: ['Technicien chauffagiste', 'Expert HVAC', 'Rédacteur technique', 'Directeur technique'] },
    }),
    // JSON-LD Person schema
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
```

### 2.3 FAQ Item Schema

```typescript
// sanity/schemas/faq-item.ts
export const faqItem = defineType({
  name: 'faqItem',
  title: 'Question FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: R => R.required().max(200),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'text',
      rows: 4,
      validation: R => R.required().min(50).max(1000),
    }),
  ],
  preview: {
    select: { title: 'question' },
  },
})
```

### 2.4 Block Content Schema

```typescript
// sanity/schemas/block-content.ts
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenu riche',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            title: 'Lien URL',
            name: 'link',
            type: 'object',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'blank', type: 'boolean', title: 'Ouvrir dans nouvel onglet' },
            ],
          },
          {
            title: 'Lien interne (commune)',
            name: 'internalLink',
            type: 'object',
            fields: [
              { name: 'communeSlug', type: 'string', title: 'Slug commune' },
              { name: 'serviceSlug', type: 'string', title: 'Slug service (optionnel)' },
            ],
          },
        ],
      },
    },
    // Image blocks
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Texte alt', validation: R => R.required() },
        { name: 'caption', type: 'string', title: 'Légende' },
      ],
    },
    // Embedded CTA blocks
    {
      type: 'object',
      name: 'ctaBlock',
      title: 'Bloc CTA',
      fields: [
        { name: 'text', type: 'string', title: 'Texte du bouton' },
        { name: 'href', type: 'string', title: 'URL' },
        { name: 'variant', type: 'string', options: { list: ['emergency', 'primary', 'outline'] } },
      ],
    },
  ],
})
```

---

## §3. GROQ Query Patterns

### 3.1 Blog Post Queries

```typescript
// lib/sanity/queries.ts
import { groq } from 'next-sanity'

// All published posts (blog hub)
export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && publishedAt < now()]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "author": author-> { name, image, role },
    "categories": categories[]-> { title, slug },
    mainImage { asset->, alt },
  }
`

// Single post by slug (full content)
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    faq,
    relatedServices,
    "author": author-> {
      name, image, role, bio, certifications,
      "slug": slug.current
    },
    "categories": categories[]-> { title, "slug": slug.current },
    mainImage { asset->, alt, caption },
    seo,
  }
`

// All post slugs (for generateStaticParams)
export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] {
    "slug": slug.current
  }
`

// Posts by category
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post"
    && !(_id in path("drafts.**"))
    && $categorySlug in categories[]->slug.current
    && publishedAt < now()
  ] | order(publishedAt desc) [0...12] {
    _id, title, slug, publishedAt, excerpt,
    "author": author->{ name, image },
    mainImage { asset->, alt },
  }
`
```

### 3.2 Sanity Client Configuration

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity'
import { env } from '@/lib/env'

export const sanityClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // CDN for published content
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
})

// Authenticated client for draft preview
export const previewClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
})
```

### 3.3 Type-Safe GROQ Fetchers

```typescript
// lib/sanity/blog.ts
import { sanityClient } from './client'
import {
  ALL_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_POST_SLUGS_QUERY,
} from './queries'
import type { Post, PostSummary } from '@/types/content'

export async function getAllPosts(): Promise<PostSummary[]> {
  return sanityClient.fetch<PostSummary[]>(
    ALL_POSTS_QUERY,
    {},
    { next: { revalidate: 3600, tags: ['posts'] } }
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch<Post | null>(
    POST_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: false, tags: [`post:${slug}`] } }
  )
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<{ slug: string }[]>(
    ALL_POST_SLUGS_QUERY,
    {},
    { next: { revalidate: 3600, tags: ['post-slugs'] } }
  )
  return results.map((r) => r.slug)
}
```

---

## §4. On-Demand ISR Revalidation

### 4.1 Sanity Webhook Configuration

In Sanity Studio → API → Webhooks, create:

```
Name: Netlify ISR Revalidation
URL: https://chauffagiste-belga.be/api/revalidate
Dataset: production
Trigger on: Create, Update, Delete
Filter: _type in ["post", "author", "category"]
Secret: [SANITY_WEBHOOK_SECRET env var]
HTTP method: POST
```

### 4.2 Revalidation Route Handler

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { createHmac } from 'crypto'
import { env } from '@/lib/env'

const VALID_TYPES = ['post', 'author', 'category'] as const
type SanityDocType = (typeof VALID_TYPES)[number]

export async function POST(request: NextRequest) {
  // Verify Sanity webhook signature
  const body = await request.text()
  const signature = request.headers.get('sanity-webhook-signature') ?? ''

  const expectedSig = createHmac('sha256', env.SANITY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

  if (signature !== `sha256=${expectedSig}`) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let payload: { _type?: string; slug?: { current?: string } }
  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const docType = payload._type
  if (!docType || !VALID_TYPES.includes(docType as SanityDocType)) {
    return NextResponse.json({ revalidated: false, message: 'Unknown type' })
  }

  // Revalidate by tag
  revalidateTag('posts')
  revalidateTag('post-slugs')

  if (payload.slug?.current) {
    revalidateTag(`post:${payload.slug.current}`)
  }

  return NextResponse.json({
    revalidated: true,
    type: docType,
    slug: payload.slug?.current,
    timestamp: new Date().toISOString(),
  })
}
```

---

## §5. Image Handling

```typescript
// lib/sanity/image.ts
import createImageUrlBuilder from '@sanity/image-url'
import { env } from '@/lib/env'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageBuilder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
})

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source)
}

// Predefined image presets for consistency
export const sanityImagePresets = {
  blogHero: (source: SanityImageSource) =>
    urlFor(source).width(1200).height(630).format('webp').quality(85).url(),

  blogCard: (source: SanityImageSource) =>
    urlFor(source).width(400).height(250).format('webp').quality(80).url(),

  authorAvatar: (source: SanityImageSource) =>
    urlFor(source).width(80).height(80).format('webp').quality(90).fit('crop').url(),
}
```

---

## §6. Draft Preview Mode

```typescript
// app/api/draft/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { env } from '@/lib/env'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  if (!slug) {
    return new Response('Missing slug', { status: 400 })
  }

  draftMode().enable()
  redirect(`/conseils/${slug}`)
}
```