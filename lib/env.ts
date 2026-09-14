import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().catch('https://placeholder.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).catch('placeholder_anon_key'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).catch('placeholder_service_role_key'),
  RESEND_API_KEY: z.string().catch('re_placeholder'),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().catch('placeholder_sanity_id'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  SANITY_API_TOKEN: z.string().catch('placeholder_sanity_token'),
  SANITY_WEBHOOK_SECRET: z.string().catch('placeholder_secret'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('https://chauffagiste-belga.be'),
  REVALIDATION_SECRET: z.string().catch('dev-secret-token'),
  OPENAI_API_KEY: z.string().optional(),
})

export const env = envSchema.parse(process.env)
