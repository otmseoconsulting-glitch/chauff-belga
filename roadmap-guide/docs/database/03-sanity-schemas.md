# 03 — Sanity CMS Schemas
# Studio Schema Definitions: Posts, Authors, Categories, Testimonials & Service Guides
# Project: Chauffagiste-Belga
# Actual schema files live in: `studio/schemas/`

---

## §1. Schema Registry

| Schema | Type | Purpose |
|--------|------|---------|
| `post` | document | Blog articles for `/conseils` |
| `author` | document | Technician profiles & content authors |
| `category` | document | Blog/service category taxonomy |
| `faqItem` | object | Reusable FAQ question/answer block |
| `blockContent` | array | Portable Text rich-text field |
| `testimonial` | document | Customer reviews (moderated) |
| `serviceGuide` | document | Step-by-step service explainers |

---

## §2. Category Schema

```typescript
// studio/schemas/category.ts
import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 80,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim(),
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'serviceSlug',
      title: 'Service associé (slug pSEO)',
      type: 'string',
      description: 'Lien vers la page service pSEO correspondante',
      options: {
        list: [
          { value: 'depannage-chaudiere',    title: 'Dépannage chaudière' },
          { value: 'entretien-chaudiere',    title: 'Entretien chaudière' },
          { value: 'installation-chauffage', title: 'Installation chauffage' },
          { value: 'reparation-chaudiere',   title: 'Réparation chaudière' },
          { value: 'pompe-chaleur',          title: 'Pompe à chaleur' },
          { value: 'regulation-thermostat',  title: 'Régulation & thermostat' },
          { value: 'chauffage-sol',          title: 'Chauffage au sol' },
          { value: 'debouchage',             title: 'Débouchage' },
          { value: 'economies-energie',      title: "Économies d'énergie" },
          { value: 'reglementation',         title: 'Réglementation belge' },
          { value: 'conseils-pratiques',     title: 'Conseils pratiques' },
          { value: 'urgences-pannes',        title: 'Urgences & pannes' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
```

---

## §3. Testimonial Schema

```typescript
// studio/schemas/testimonial.ts
import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage client',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'authorName',     title: 'Nom du client',          type: 'string',  validation: (R) => R.required() }),
    defineField({ name: 'authorLocation', title: 'Ville / Commune',        type: 'string',  description: 'Commune du client (e.g., "Bruxelles", "Liège")' }),
    defineField({ name: 'rating',         title: 'Note (1–5)',             type: 'number',  validation: (R) => R.required().min(1).max(5).integer() }),
    defineField({ name: 'content',        title: 'Contenu du témoignage',  type: 'text',    rows: 4, validation: (R) => R.required().min(30).max(400) }),
    defineField({
      name: 'serviceType', title: 'Service concerné', type: 'string',
      options: { list: [
        { value: 'depannage-chaudiere',    title: 'Dépannage chaudière' },
        { value: 'entretien-chaudiere',    title: 'Entretien chaudière' },
        { value: 'installation-chauffage', title: 'Installation chauffage' },
        { value: 'reparation-chaudiere',   title: 'Réparation chaudière' },
        { value: 'pompe-chaleur',          title: 'Pompe à chaleur' },
        { value: 'debouchage',             title: 'Débouchage' },
      ]},
    }),
    defineField({ name: 'communeSlug',   title: 'Slug de la commune',       type: 'string',  description: 'Slug exact de la commune (e.g., "bruxelles")' }),
    defineField({ name: 'source',        title: 'Source',                   type: 'string',  initialValue: 'google', options: { list: [
      { value: 'google',     title: 'Google Reviews' },
      { value: 'facebook',   title: 'Facebook' },
      { value: 'direct',     title: 'Direct (formulaire site)' },
      { value: 'trustpilot', title: 'Trustpilot' },
    ]}},
    defineField({ name: 'sourceUrl',    title: "URL de l'avis original",   type: 'url' }),
    defineField({ name: 'reviewDate',   title: "Date de l'avis",           type: 'date' }),
    defineField({ name: 'isFeatured',   title: 'Mettre en avant (homepage)', type: 'boolean', initialValue: false }),
    defineField({ name: 'status', title: 'Statut', type: 'string', initialValue: 'pending',
      options: { list: [
        { value: 'pending',  title: '⏳ En attente de validation' },
        { value: 'approved', title: '✅ Approuvé' },
        { value: 'rejected', title: '❌ Rejeté' },
      ]},
    }),
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'authorLocation', rating: 'rating' },
    prepare({ title, subtitle, rating }: { title: string; subtitle: string; rating: number }) {
      return { title: `${'★'.repeat(rating)} ${title}`, subtitle: subtitle ?? 'Sans localisation' }
    },
  },
  orderings: [
    { title: 'Date (récent en premier)', name: 'reviewDateDesc', by: [{ field: 'reviewDate', direction: 'desc' }] },
    { title: 'Note (haute en premier)',  name: 'ratingDesc',     by: [{ field: 'rating', direction: 'desc' }] },
  ],
})
```

---

## §4. Service Guide Schema

```typescript
// studio/schemas/service-guide.ts
import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const serviceGuide = defineType({
  name: 'serviceGuide',
  title: 'Guide de service',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({ name: 'title',       title: 'Titre du guide',  type: 'string',  validation: (R) => R.required().max(80) }),
    defineField({ name: 'slug',        title: 'Slug URL',        type: 'slug',    options: { source: 'title', maxLength: 80 }, validation: (R) => R.required() }),
    defineField({ name: 'serviceSlug', title: 'Service associé', type: 'string',  validation: (R) => R.required(),
      options: { list: [
        { value: 'depannage-chaudiere',    title: 'Dépannage chaudière' },
        { value: 'entretien-chaudiere',    title: 'Entretien chaudière' },
        { value: 'installation-chauffage', title: 'Installation chauffage' },
        { value: 'reparation-chaudiere',   title: 'Réparation chaudière' },
        { value: 'pompe-chaleur',          title: 'Pompe à chaleur' },
        { value: 'regulation-thermostat',  title: 'Régulation & thermostat' },
        { value: 'chauffage-sol',          title: 'Chauffage au sol' },
        { value: 'debouchage',             title: 'Débouchage' },
      ]},
    }),
    defineField({ name: 'summary', title: 'Résumé court', type: 'text', rows: 3, validation: (R) => R.max(200) }),
    defineField({
      name: 'steps', title: 'Étapes du service', type: 'array',
      of: [{
        type: 'object', name: 'step', title: 'Étape',
        fields: [
          defineField({ name: 'stepNumber',   type: 'number', title: "N° d'étape",        validation: (R) => R.required().integer().min(1) }),
          defineField({ name: 'title',        type: 'string', title: "Titre de l'étape",  validation: (R) => R.required() }),
          defineField({ name: 'description',  type: 'text',   title: 'Description',        validation: (R) => R.required() }),
          defineField({ name: 'duration',     type: 'string', title: 'Durée estimée (e.g., "30 min")' }),
          defineField({ name: 'price',        type: 'string', title: "Coût de l'étape (optionnel)" }),
        ],
        preview: { select: { title: 'title', stepNumber: 'stepNumber' },
          prepare({ title, stepNumber }: { title: string; stepNumber: number }) {
            return { title: `${stepNumber}. ${title}` }
          },
        },
      }],
    }),
    defineField({
      name: 'priceRange', title: 'Fourchette de prix', type: 'object',
      fields: [
        defineField({ name: 'from', type: 'number', title: 'À partir de (€)', validation: (R) => R.min(0) }),
        defineField({ name: 'to',   type: 'number', title: "Jusqu'à (€)",     validation: (R) => R.min(0) }),
        defineField({ name: 'note', type: 'string', title: 'Note tarifaire' }),
      ],
    }),
    defineField({ name: 'faq',         title: 'FAQ spécifique au service', type: 'array', of: [{ type: 'faqItem' }], validation: (R) => R.min(3) }),
    defineField({ name: 'publishedAt', title: 'Date de publication',       type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', serviceSlug: 'serviceSlug' },
    prepare({ title, serviceSlug }: { title: string; serviceSlug: string }) {
      return { title, subtitle: serviceSlug }
    },
  },
})
```

---

## §5. TypeScript Types (for Next.js consumers)

```typescript
// types/sanity.ts — generated from schema above

export type SanityPost = {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  publishedAt: string
  _updatedAt?: string
  excerpt: string
  body: SanityBlock[]
  faq?: Array<{ question: string; answer: string }>
  relatedServices?: string[]
  author: { name: string; slug: { current: string }; image?: SanityImage; role?: string; bio?: string; certifications?: string[] }
  categories: Array<{ title: string; slug: { current: string } }>
  mainImage?: SanityImage & { alt: string; caption?: string }
  seo?: { metaTitle?: string; metaDescription?: string; noIndex?: boolean }
}

export type SanityBlock = {
  _type: 'block'; _key: string; style: string
  children: Array<{ _type: 'span'; text: string; marks?: string[] }>
}

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
  alt?: string; caption?: string; url?: string
}

export type SanityTestimonial = {
  _id: string; _type: 'testimonial'
  authorName: string; authorLocation?: string; rating: number
  content: string; serviceType?: string; communeSlug?: string
  source: 'google' | 'facebook' | 'direct' | 'trustpilot'
  reviewDate?: string; isFeatured: boolean
  status: 'pending' | 'approved' | 'rejected'
}

export type SanityFAQ = { question: string; answer: string }
```

---

## §6. GROQ Query Reference

```groq
// All approved testimonials for a commune
*[_type == "testimonial" && status == "approved" && communeSlug == $slug] | order(rating desc) {
  authorName, authorLocation, rating, content, serviceType, reviewDate
}

// Latest 3 blog posts (for blog preview widgets)
*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0..2] {
  title, "slug": slug.current, excerpt, publishedAt, mainImage { asset, alt }
}

// Single post by slug
*[_type == "post" && slug.current == $slug][0] {
  ..., "author": author->{ name, "slug": slug.current, role, bio, image { asset, alt } },
  "categories": categories[]->{ title, "slug": slug.current }
}
```
