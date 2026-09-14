import { render } from '@react-email/render'
import { getResendClient } from './client'
import { LeadAdminEmail } from './templates/LeadAdminEmail'
import { LeadClientEmail } from './templates/LeadClientEmail'
import { CONTACT } from '@/lib/constants/contact'

export interface DispatchLeadNotificationParams {
  fullName: string
  phone: string
  email?: string | undefined
  postalCode: string
  serviceType: string
  message?: string | undefined
  isUrgent: boolean
  sourceUrl?: string | undefined
}

export async function dispatchLeadNotification(
  params: DispatchLeadNotificationParams
): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient()
  const createdAt = new Date().toLocaleString('fr-BE', {
    timeZone: 'Europe/Brussels',
    dateStyle: 'short',
    timeStyle: 'short',
  })

  // Safe fallback if Resend is not configured with live API key
  if (!resend) {
    console.warn(
      '[dispatchLeadNotification] Resend API key not configured or dummy. Notification payload logged to console:',
      { ...params, createdAt }
    )
    return { success: true }
  }

  try {
    const adminRecipient = params.isUrgent ? CONTACT.email.urgent : CONTACT.email.leads
    const subjectPrefix = params.isUrgent ? '🚨 URGENCE 2H' : '📋 DEVIS'

    const adminHtml = await render(
      LeadAdminEmail({
        fullName: params.fullName,
        phone: params.phone,
        email: params.email,
        postalCode: params.postalCode,
        serviceType: params.serviceType,
        message: params.message,
        isUrgent: params.isUrgent,
        sourceUrl: params.sourceUrl,
        createdAt,
      })
    )

    // 1. Dispatch internal technician/admin alert
    await resend.emails.send({
      from: 'Chauffagiste-Belga <notifications@chauffagiste-belga.be>',
      to: [adminRecipient],
      subject: `${subjectPrefix} — ${params.serviceType} (${params.postalCode}) — ${params.fullName}`,
      html: adminHtml,
      ...(params.email ? { replyTo: params.email } : {}),
    })

    // 2. Dispatch customer confirmation if email was provided
    if (params.email) {
      const clientHtml = await render(
        LeadClientEmail({
          fullName: params.fullName,
          serviceType: params.serviceType,
          postalCode: params.postalCode,
          isUrgent: params.isUrgent,
        })
      )

      await resend.emails.send({
        from: 'Chauffagiste-Belga <contact@chauffagiste-belga.be>',
        to: [params.email],
        subject: `Confirmation de votre demande : ${params.serviceType} — Chauffagiste-Belga`,
        html: clientHtml,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('[dispatchLeadNotification] Failed to send email notifications:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur envoi notification email',
    }
  }
}
