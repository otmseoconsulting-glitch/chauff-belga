import * as React from 'react'

export interface LeadClientEmailProps {
  fullName: string
  serviceType: string
  postalCode: string
  isUrgent: boolean
}

export function LeadClientEmail({
  fullName,
  serviceType,
  postalCode,
  isUrgent,
}: LeadClientEmailProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#F7F9FC', color: '#102A43' }}>
      <div style={{ backgroundColor: '#082B55', color: '#FFFFFF', padding: '24px 20px', borderRadius: '8px 8px 0 0', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold' }}>
          Chauffagiste-Belga
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#93C5FD' }}>
          Artisans chauffagistes agréés Cerga en Belgique
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', padding: '28px 24px', borderRadius: '0 0 8px 8px', border: '1px solid #E2E8F0', borderTop: 'none' }}>
        <h2 style={{ fontSize: '18px', marginTop: 0, color: '#082B55' }}>
          Bonjour {fullName},
        </h2>

        <p style={{ fontSize: '15px', lineHeight: '1.6' }}>
          Nous avons bien reçu votre demande pour : <strong style={{ color: '#E5232E' }}>{serviceType}</strong> dans le secteur postal <strong>{postalCode}</strong>.
        </p>

        <div style={{ padding: '16px', backgroundColor: isUrgent ? '#FEF2F2' : '#F0FDF4', borderLeft: `4px solid ${isUrgent ? '#E5232E' : '#16A34A'}`, margin: '20px 0', borderRadius: '0 6px 6px 0' }}>
          <strong style={{ display: 'block', fontSize: '15px', color: isUrgent ? '#991B1B' : '#166534', marginBottom: '4px' }}>
            {isUrgent ? 'Intervention d’urgence signalée' : 'Délai de traitement garanti'}
          </strong>
          <p style={{ margin: 0, fontSize: '14px', color: isUrgent ? '#7F1D1D' : '#14532D' }}>
            {isUrgent
              ? 'Un chauffagiste d’astreinte examine votre dossier et vous contacte par téléphone sous 2 heures.'
              : 'Un technicien qualifié va analyser vos informations et vous rappeler sous 24h ouvrables avec un devis détaillé sans engagement.'}
          </p>
        </div>

        <h3 style={{ fontSize: '15px', marginTop: '24px', marginBottom: '10px', color: '#082B55' }}>
          Vos garanties Chauffagiste-Belga :
        </h3>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8', color: '#475569' }}>
          <li>Techniciens certifiés Cerga, G1/G2 & Mazout</li>
          <li>Attestations officielles de conformité PEB remises après travaux</li>
          <li>Transparence totale : devis gratuit et prix fixes annoncés avant intervention</li>
        </ul>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#64748B' }}>
            Votre situation s’aggrave ? Besoin d’une intervention immédiate ?
          </p>
          <a
            href="tel:+3247512345"
            style={{
              display: 'inline-block',
              backgroundColor: '#E5232E',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '15px',
            }}
          >
            📞 Appeler l’astreinte 24/7 : 0475 12 34 56
          </a>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#94A3B8' }}>
        © {new Date().getFullYear()} Chauffagiste-Belga — Tous droits réservés.
      </div>
    </div>
  )
}
