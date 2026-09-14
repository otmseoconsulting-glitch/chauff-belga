import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { env } from '@/lib/env'

const rawProjectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const isValidProjectId =
  /^[a-z0-9-]+$/i.test(rawProjectId) &&
  rawProjectId.length >= 8 &&
  !rawProjectId.includes('dummy') &&
  !rawProjectId.includes('placeholder') &&
  !rawProjectId.includes('your-sanity')

export const isSanityConfigured = isValidProjectId

// Safe projectId matching Sanity validation rules (a-z, 0-9, dashes only)
const safeProjectId = isValidProjectId ? rawProjectId : 'ctwjdiqw'
const safeDataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId: safeProjectId,
  dataset: safeDataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

type SanityImageSource = Parameters<typeof builder.image>[0]

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
