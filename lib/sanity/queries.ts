import { groq } from 'next-sanity'

export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && publishedAt < now()]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "category": categories[0]->title,
    "author": author-> { name, role, bio },
    mainImage { asset->, alt }
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    faq,
    "category": categories[0]->title,
    "author": author-> { name, role, bio, certifications },
    mainImage { asset->, alt },
    seo
  }
`

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] {
    "slug": slug.current
  }
`
