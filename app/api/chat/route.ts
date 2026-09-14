import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CONTACT } from '@/lib/constants/contact'

const HAZARD_REGEX = /(gaz|odeur|fuite\s+de\s+gaz|monoxyde|co\b|étourdissement|flamme\s+jaune|fumée|brûlé)/i

const HAZARD_RESPONSE = `⚠️ ALERTE SÉCURITÉ CRITIQUE : RISQUE GAZ / MONOXYDE DE CARBONE (CO)

1. COUPEZ IMMÉDIATEMENT le compteur de gaz général ou l'alimentation de la chaudière.
2. OUVREZ EN GRAND toutes les fenêtres et portes pour aérer le bâtiment.
3. N'ACTIONNEZ AUCUN interrupteur électrique, téléphone portable ou flamme à l'intérieur.
4. ÉVACUEZ IMMÉDIATEMENT les lieux avec tous les occupants.
5. DEPUIS L'EXTÉRIEUR, composez le 112 (Pompiers) ou appelez notre astreinte d'urgence 24/7 au ${CONTACT.phone.display}.`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messages: ChatMessage[] = body.messages || []
    const latestUserMessage = messages.filter((m) => m.role === 'user').pop()?.content || ''

    // 1. Critical Gas / CO Safety Intercept Protocol (0ms bypass)
    if (HAZARD_REGEX.test(latestUserMessage)) {
      return NextResponse.json({
        isEmergency: true,
        hazardType: 'gas_co',
        content: HAZARD_RESPONSE,
      })
    }

    // 2. Technical HVAC Expert Heuristic Engine
    const lower = latestUserMessage.toLowerCase()
    let responseText = ''

    if (lower.includes('pression') || lower.includes('bar') || lower.includes('0.') || lower.includes('f22')) {
      responseText = `🔧 Diagnostic Pression d'Eau :
Votre circuit de chauffage requiert une pression entre 1,2 et 1,8 bar (zone verte du manomètre). Si la pression est inférieure à 1 bar :
1. Repérez les deux petites vannes de remplissage sous la chaudière.
2. Ouvrez-les lentement jusqu'à atteindre 1,5 bar, puis refermez-les bien.
3. Si la pression rechute régulièrement après remplissage, votre vase d'expansion est probablement dégonflé ou percé.
Souhaitez-vous qu'un chauffagiste agréé intervienne pour vérifier votre vase d'expansion ?`
    } else if (lower.includes('f28') || lower.includes('f29') || lower.includes('allumage') || lower.includes('f1') || lower.includes('f4')) {
      responseText = `🚨 Diagnostic Défaut d'Allumage (Code F28 / F4 / F1) :
Ce code signale que le brûleur n'a pas détecté de flamme :
1. Vérifiez que la vanne jaune d'arrivée de gaz sous la chaudière est bien ouverte (dans l'alignement du tuyau).
2. Appuyez 5 secondes sur le bouton Reset (flamme barrée).
3. Si la chaudière tente de démarrer 3 fois puis se remet en sécurité, l'électrode d'allumage ou le bloc gaz doit être vérifié par un technicien agréé Cerga.
Nos techniciens peuvent intervenir sous 2h en dépannage d'urgence.`
    } else if (lower.includes('entretien') || lower.includes('peb') || lower.includes('obligation') || lower.includes('prix')) {
      responseText = `📋 Réglementation Entretien PEB en Belgique :
- Chaudière Gaz : Entretien obligatoire tous les 2 ans à Bruxelles et en Wallonie (dès 120 € HTVA).
- Chaudière Mazout : Entretien annuel obligatoire (dès 160 € HTVA).
Nos techniciens agréés Cerga vous délivrent immédiatement l'Attestation légale de contrôle périodique exigée par les assurances.
Vous pouvez réserver directement via notre formulaire ou au ${CONTACT.phone.display}.`
    } else if (lower.includes('radiateur') || lower.includes('froid') || lower.includes('bruit') || lower.includes('glouglou')) {
      responseText = `🌡️ Diagnostic Radiateur :
- Si le radiateur est chaud en bas et froid en haut : il y a de l'air dans le circuit. Utilisez une clé de purge pour chasser l'air jusqu'à ce qu'un filet d'eau sorte.
- Si le radiateur reste totalement froid : le pointeau de la vanne thermostatique est sans doute bloqué. Dévissez la tête et tapotez doucement sur la tige métallique.`
    } else {
      responseText = `Bonjour, je suis l'assistant technique de Chauffagiste-Belga.
Pour vous aider précisément :
1. Quelle est la marque de votre chaudière (Vaillant, Bulex, Viessmann, Bosch...) ?
2. Rencontrez-vous une panne d'eau chaude, de chauffage ou un code d'erreur sur l'écran ?
Pour toute urgence immédiate, notre permanence technique est joignable 7j/7 au ${CONTACT.phone.display}.`
    }

    return NextResponse.json({
      isEmergency: false,
      content: responseText,
    })
  } catch (error) {
    console.error('[Chat API] Error processing message:', error)
    return NextResponse.json(
      {
        isEmergency: false,
        content: `Notre permanence technique est joignable 24h/24 et 7j/7 au ${CONTACT.phone.display} pour toute assistance immédiate.`,
      },
      { status: 200 }
    )
  }
}
