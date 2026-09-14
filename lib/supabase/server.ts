import { createClient } from '@supabase/supabase-js'
import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import type { Database } from '@/types/supabase'

let publicClient: SupabaseClient<Database> | null = null

/**
 * Public client for static generation, sitemaps, ISR cache, and read-only public queries.
 * Does NOT read or write cookies, preserving static pre-rendering.
 */
export function createPublicClient(): SupabaseClient<Database> {
  if (publicClient) return publicClient

  publicClient = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  return publicClient
}

export function createServerClient(): SupabaseClient<Database> {
  const cookieStore = cookies()

  return _createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — cookies can only be set in Server Actions or Route Handlers
          }
        },
      },
    }
  ) as unknown as SupabaseClient<Database>
}

