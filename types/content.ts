export interface Author {
  name: string
  role: string
  certifications?: string[]
  image?: string
  bio?: string
}

export interface Category {
  title: string
  slug: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PostSummary {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  category: string
  readTime: string
  image?: string
  author: Author
}

export interface Post extends PostSummary {
  content: Array<{
    type: 'paragraph' | 'heading2' | 'heading3' | 'callout' | 'warning' | 'list'
    text?: string
    items?: string[]
  }>
  faq?: FaqItem[]
  relatedCommunes?: string[]
}
