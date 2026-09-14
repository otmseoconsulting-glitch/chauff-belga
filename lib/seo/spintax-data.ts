export interface SpintaxBlock {
  id: string
  category: string
  template: string
}

export const SPINTAX_BLOCKS: Record<string, string> = {
  'intro-general-01':
    '{Chauffagiste-Belga intervient|Notre équipe de chauffagistes certifiés intervient|Nos techniciens agréés interviennent} à {commune} pour {tous vos besoins en chauffage et plomberie|l\'ensemble de vos besoins de chauffage|tous vos projets et urgences de chauffage}. {Dépannage|Réparation|Entretien}, {installation|pose} ou {réparation|maintenance} : {notre équipe est disponible|nos techniciens sont joignables|nous sommes disponibles} {7 jours sur 7|7j/7|toute la semaine}, {24 heures sur 24|24h/24|même la nuit et les week-ends}. {Délai d\'intervention garanti|Intervention garantie} : {moins de 24 heures|≤ 24h|sous 24 heures maximum}.',

  'intro-depannage-01':
    '{Chauffagiste-Belga intervient|Notre équipe de chauffagistes intervient|Nos techniciens certifiés interviennent} {rapidement|en urgence|dans les meilleurs délais} à {commune} pour tout {dépannage|problème|dysfonctionnement} de {chaudière|chauffage central|installation de chauffage}. {Panne, fuite, perte de pression|Chaudière en panne, fuite d\'eau, perte de chaleur|Problème de chaudière, fuite ou pression insuffisante} : {nous sommes disponibles 7j/7, 24h/24|notre équipe est joignable 7 jours sur 7|nous intervenons en urgence à toute heure}. {Délai d\'intervention à {commune}|Intervention à {commune}} : {inférieur à 24h pour les demandes standard|sous 24 heures maximum|sous 2 heures pour les urgences critiques}.',

  'intro-entretien-01':
    '{L\'entretien annuel de votre chaudière|Le contrôle périodique de votre installation de chauffage|La révision annuelle de votre chaudière} à {commune} est {obligatoire selon la réglementation belge|imposé par la législation régionale|requis par les normes PEB en vigueur}. {Chauffagiste-Belga|Notre équipe certifiée Cerga|Nos techniciens agréés} {réalise|effectue|assure} {cet entretien réglementaire|cette révision obligatoire|ce contrôle périodique} {à {commune}|dans votre secteur} avec {soin et professionnalisme|rigueur et expertise|tout le sérieux requis}, en {délivrant l\'attestation légale de conformité|remettant le certificat d\'entretien PEB officiel|fournissant le rapport de combustion obligatoire}.',

  'trust-statement-01':
    '{Depuis plus de 10 ans|Fort de plus d\'une décennie d\'expérience|Avec plus de 10 années d\'expertise dans le secteur}, Chauffagiste-Belga {accompagne|assiste|conseille} {les particuliers et professionnels|les ménages belges|les propriétaires et locataires} de {commune} {et de sa région|} avec {un service fiable et de haute technicité|des interventions rapides et pérennes|un service de chauffage certifié et réactif}. {Plus de 12 500 interventions réalisées|12 500+ interventions réussies en Belgique|Plus de 12 000 dépannages exécutés} avec un taux de satisfaction de 4,8/5.',

  'trust-certifications-01':
    'Tous nos chauffagistes intervenant à {commune} sont {agréés Cerga et habilités gaz|certifiés par les organismes belges de référence (Cerga, Argb)|techniciens gaz et mazout certifiés}. {Cet agrément officiel|Cette habilitation stricte|Cette certification} {est indispensable en Belgique|garantit le respect absolu des normes de sécurité|vous protège et garantit la conformité de vos installations} {pour toute intervention sur chaudière à condensation|pour les travaux sur réseaux gaz et mazout|pour conserver la validité de votre assurance habitation}.',

  'urgency-01':
    '{En cas de panne brutale|Pour toute urgence chauffage|Si votre chaudière se met en sécurité} à {commune}, {n\'attendez pas|contactez immédiatement notre permanence|ne prenez aucun risque}. {Un technicien qualifié de garde|Notre chauffagiste d\'urgence|Un artisan chauffagiste certifié} peut {intervenir chez vous en moins de 2 heures|arriver sur place sous 2h|sécuriser votre installation sans délai} pour les {urgences prioritaires sans chauffage ni eau chaude|pannes critiques en plein hiver|fuites d\'eau et défauts d\'allumage}.',

  'water-hardness-01':
    'L\'eau distribuée à {commune} présente une dureté d\'environ {water_hardness} °fH ({water_hardness_desc}). {Cette teneur calcaire requiert une vigilance particulière|Un entartrage rapide du corps de chauffe et de l\'échangeur à plaques est fréquent|Cette dureté accentue les dépôts de tartre sur vos résistances et échangeurs}. {Un désembouage régulier et un réglage précis de l\'adoucisseur prolongent la durée de vie de votre chaudière|Nos techniciens effectuent un détartrage préventif lors de chaque entretien|Nous vérifions systématiquement l\'état de vos échangeurs thermiques face au calcaire}.',

  'closing-cta-01':
    '{Besoin d\'un chauffagiste fiable à {commune}|Vous cherchez un professionnel certifié à {commune}|Un projet d\'installation ou un dépannage à {commune}} ? {Contactez notre permanence|Appelez nos équipes sans tarder|Demandez votre estimation en ligne} : {devis 100% gratuit|intervention rapide garantie|service joignable} {7j/7 et 24h/24|du lundi au dimanche|sans interruption}. ☎ 0475 12 34 56.',
}

export interface LocalFaqItem {
  question: string
  answer: string
}

export function getLocalFaqTemplates(communeName: string): LocalFaqItem[] {
  return [
    {
      question: `Intervenez-vous en urgence à ${communeName} ?`,
      answer: `Oui, Chauffagiste-Belga assure une permanence technique à ${communeName} 7j/7 et 24h/24. Pour les pannes totales en période hivernale ou les fuites de gaz, un chauffagiste intervient en moins de 2 heures.`,
    },
    {
      question: `Quel est le prix d'un dépannage chaudière à ${communeName} ?`,
      answer: `Le diagnostic d'urgence à ${communeName} débute à 95 € HTVA (déplacement et recherche de panne inclus). Un devis précis et transparent vous est présenté avant tout remplacement de pièce.`,
    },
    {
      question: `L'entretien annuel de chaudière est-il obligatoire à ${communeName} ?`,
      answer: `Oui, la réglementation belge (PEB) impose un entretien périodique certifié pour toutes les chaudières à gaz et mazout. À ${communeName}, nos techniciens agréés Cerga vous délivrent immédiatement l'attestation légale officielle demandée par les assurances.`,
    },
    {
      question: `Quelles marques de chaudières dépannez-vous à ${communeName} ?`,
      answer: `Nous intervenons sur l'ensemble des marques du marché belge à ${communeName} : Vaillant, Bulex, Viessmann, Bosch, Junkers, ACV, Buderus, Daikin, Remeha et Chappée, avec un stock de pièces détachées d'origine.`,
    },
    {
      question: `Quel est le délai pour obtenir un devis d'installation à ${communeName} ?`,
      answer: `Pour une nouvelle chaudière ou une pompe à chaleur à ${communeName}, un chauffagiste réalise une visite technique préalable et vous transmet un devis détaillé gratuit sous 24 à 48 heures ouvrables, avec simulation des primes régionales.`,
    },
    {
      question: `Vos pièces et réparations sont-elles garanties ?`,
      answer: `Absolument. Toute réparation effectuée à ${communeName} bénéficie d'une garantie légale de 2 ans sur les pièces d'origine et la main-d'œuvre.`,
    },
  ]
}
