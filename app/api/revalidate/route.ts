import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { createHmac } from 'crypto'
import { env } from '@/lib/env'

const VALID_TYPES = ['post', 'author', 'category'] as const
type SanityDocType = (typeof VALID_TYPES)[number]

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('sanity-webhook-signature') ?? ''
  const secret = env.SANITY_WEBHOOK_SECRET

  // In production verify HMAC signature
  if (secret && secret !== 'placeholder_secret' && secret !== 'dummy-secret') {
    const expectedSig = createHmac('sha256', secret).update(body).digest('hex')
    if (signature !== `sha256=${expectedSig}`) {
      return NextResponse.json({ error: 'Signature webhook invalide' }, { status: 401 })
    }
  }

  let payload: { _type?: string; slug?: { current?: string } }
  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Payload JSON invalide' }, { status: 400 })
  }

  const docType = payload._type
  if (!docType || !VALID_TYPES.includes(docType as SanityDocType)) {
    return NextResponse.json({ revalidated: false, message: 'Type de document ignoré' })
  }

  // Revalidate post tags
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
