export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validates a Belgian 4-digit postal code.
 * Belgian postal codes range from 1000 to 9992.
 */
export function validateBelgianPostalCode(code: string): ValidationResult {
  const trimmed = code.trim()

  if (!/^\d{4}$/.test(trimmed)) {
    return {
      valid: false,
      error: 'Le code postal doit être composé de 4 chiffres (ex: 1000).',
    }
  }

  const num = parseInt(trimmed, 10)
  if (num < 1000 || num > 9992) {
    return {
      valid: false,
      error: 'Code postal belge hors plage valide (1000–9992).',
    }
  }

  return { valid: true }
}

/**
 * Validates Belgian telephone numbers.
 * Accepts formats:
 * - Local: 0475123456, 021234567, 04 75 12 34 56
 * - International: +32 475 12 34 56, +32475123456, 0032...
 * Strictly rejects French numbers starting with 06 or 07.
 */
export function validateBelgianPhone(phone: string): ValidationResult {
  const cleaned = phone.replace(/[\s.\-/()]/g, '')

  // Reject French phone prefixes (06, 07)
  if (/^0[67]\d{8}$/.test(cleaned) || /^\+33[67]\d{8}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Veuillez saisir un numéro belge (+32 ou 04xx...). Les numéros français ne sont pas acceptés.',
    }
  }

  // Belgian format: +32 (or 0032) or 0, followed by 1-9, then 7 or 8 digits
  const belgianPhoneRegex = /^(?:\+32|0032|0)[1-9]\d{7,8}$/

  if (!belgianPhoneRegex.test(cleaned)) {
    return {
      valid: false,
      error: 'Numéro de téléphone invalide (ex: 0475 12 34 56 ou +32 475 12 34 56).',
    }
  }

  return { valid: true }
}
