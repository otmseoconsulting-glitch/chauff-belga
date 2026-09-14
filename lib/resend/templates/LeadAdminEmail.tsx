import * as React from 'react'

export interface LeadAdminEmailProps {
  fullName: string
  phone: string
  email?: string | undefined
  postalCode: string
  serviceType: string
  message?: string | undefined
  isUrgent: boolean
  sourceUrl?: string | undefined
  createdAt: string
}

export function LeadAdminEmail({
  fullName,
  phone,
  email,
  postalCode,
  serviceType,
  message,
  isUrgent,
  sourceUrl,
  createdAt,
}: LeadAdminEmailProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#F7F9FC', color: '#102A43' }}>
      <div style={{ backgroundColor: isUrgent ? '#E5232E' : '#082B55', color: '#FFFFFF', padding: '16px 20px', borderRadius: '8px 8px 0 0' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
          {isUrgent ? '🚨 NOUVELLE URGENCE CHAUFFAGE (≤ 2h)' : '📋 NOUVELLE DEMANDE DE DEVIS'}
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.9 }}>
          Reçu le {createdAt}
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '0 0 8px 8px', border: '1px solid #E2E8F0', borderTop: 'none' }}>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: isUrgent ? '#FEF2F2' : '#F0F7FF', borderRadius: '6px' }}>
          <strong style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', color: '#64748B' }}>Service demandé</strong>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: isUrgent ? '#E5232E' : '#082B55' }}>
            {serviceType}
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0', color: '#64748B', width: '140px' }}>Nom complet :</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{fullName}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#64748B' }}>Téléphone :</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ color: '#155EEF', textDecoration: 'none' }}>
                  📞 {phone}
                </a>
              </td>
            </tr>
            {email && (
              <tr>
                <td style={{ padding: '8px 0', color: '#64748B' }}>Email :</td>
                <td style={{ padding: '8px 0' }}>
                  <a href={`mailto:${email}`} style={{ color: '#155EEF', textDecoration: 'none' }}>
                    {email}
                  </a>
                </td>
              </tr>
            )}
            <tr>
              <td style={{ padding: '8px 0', color: '#64748B' }}>Code postal :</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>📍 {postalCode}</td>
            </tr>
            {sourceUrl && (
              <tr>
                <td style={{ padding: '8px 0', color: '#64748B' }}>Page source :</td>
                <td style={{ padding: '8px 0', fontSize: '13px', wordBreak: 'break-all' }}>{sourceUrl}</td>
              </tr>
            )}
          </tbody>
        </table>

        {message && (
          <div style={{ marginBottom: '20px' }}>
            <strong style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Détails / Symptômes de la panne :</strong>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '14px', lineHeight: '1.5' }}>
              {message}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            style={{
              display: 'inline-block',
              backgroundColor: isUrgent ? '#E5232E' : '#082B55',
              color: '#FFFFFF',
              padding: '12px 28px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '15px',
            }}
          >
            Rappeler le client immédiatement
          </a>
        </div>
      </div>
    </div>
  )
}
