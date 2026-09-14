import { Resend } from 'resend'
import { env } from '@/lib/env'

let resendInstance: Resend | null = null

export function getResendClient(): Resend | null {
  if (resendInstance) return resendInstance

  const apiKey = env.RESEND_API_KEY
  if (!apiKey || apiKey === 're_123456789' || apiKey.trim() === '') {
    return null
  }

  resendInstance = new Resend(apiKey)
  return resendInstance
}
