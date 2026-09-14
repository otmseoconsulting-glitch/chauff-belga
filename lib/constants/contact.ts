export const CONTACT = {
  phone: {
    display: '0475 12 34 56',
    e164: '+3247512345',
    formatted: '0475 12 34 56',
  },
  email: {
    general: 'info@chauffagiste-belga.be',
    leads: 'leads@chauffagiste-belga.be',
    urgent: 'urgence@chauffagiste-belga.be',
  },
  availability: '7j/7 · 24h/24',
  responseTime: {
    urgent: '≤ 2 heures',
    standard: '≤ 24 heures',
    businessHours: 'Lun–Dim 07:00–20:00',
  },
} as const

export const FORM_SERVICE_OPTIONS = [
  { value: 'depannage', label: '🚨 Dépannage urgent (≤ 2h)' },
  { value: 'entretien', label: '🔧 Entretien annuel obligatoire PEB' },
  { value: 'installation', label: '🏠 Installation chaudière neuve' },
  { value: 'reparation', label: '⚙️ Réparation / remplacement pièces' },
  { value: 'devis', label: '📋 Demande de devis gratuit' },
  { value: 'other', label: '❓ Autre demande' },
] as const

export type ServiceTypeValue = (typeof FORM_SERVICE_OPTIONS)[number]['value']
