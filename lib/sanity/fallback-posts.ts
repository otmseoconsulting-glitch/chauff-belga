import type { Post } from '@/types/content'

export const FALLBACK_POSTS: Post[] = [
  {
    _id: 'post-1',
    title: 'Entretien de chaudière obligatoire en Belgique : législation PEB, fréquences et attestations',
    slug: 'entretien-chaudiere-obligatoire-belgique',
    publishedAt: '2026-01-15T08:00:00.000Z',
    category: 'Réglementation PEB',
    readTime: '6 min de lecture',
    excerpt:
      'En Belgique, le contrôle périodique et le nettoyage de votre chaudière sont une obligation légale stricte. Découvrez les périodicités pour le gaz et le mazout à Bruxelles et en Wallonie, ainsi que les risques d’assurance en cas de défaut.',
    author: {
      name: 'Marc De Smet',
      role: 'Chauffagiste Expert Cerga & Auditeur PEB',
      certifications: ['Agréé Cerga G1/G2', 'Habilité Mazout L', 'Conseiller PEB'],
      bio: 'Plus de 18 ans d’expérience en thermique du bâtiment et maintenance d’installations de chauffage central en Belgique.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'L’entretien régulier d’une chaudière ne constitue pas uniquement un gage de sécurité et d’économies d’énergie : en Belgique, il s’agit d’une obligation légale inscrite dans les réglementations régionales relatives à la performance énergétique des bâtiments (PEB). Que vous soyez propriétaire occupant, bailleur ou locataire, les règles de contrôle et de remise d’attestation diffèrent selon le combustible et votre région de résidence.',
      },
      {
        type: 'heading2',
        text: '1. Périodicité légale : Gaz vs Mazout',
      },
      {
        type: 'paragraph',
        text: 'La fréquence imposée par la loi varie selon le combustible utilisé par votre générateur thermique :',
      },
      {
        type: 'list',
        items: [
          'Chaudières au gaz (naturel ou propane) en Wallonie et à Bruxelles : entretien obligatoire tous les 2 ans (puissance entre 20 et 100 kW).',
          'Chaudières au mazout (chapeau L) dans toute la Belgique : entretien obligatoire chaque année (puissance supérieure à 20 kW).',
          'Chaudières à combustibles solides (pellets, bois) : ramonage et contrôle annuels obligatoires.',
        ],
      },
      {
        type: 'warning',
        text: 'Attention aux assurances incendie : en cas de sinistre (feu de cheminée, explosion de brûleur), votre compagnie d’assurance exigera les deux dernières attestations de contrôle périodique. L’absence de document officiel conforme peut entraîner le refus partiel ou total de votre indemnisation.',
      },
      {
        type: 'heading2',
        text: '2. Qui doit payer l’entretien : propriétaire ou locataire ?',
      },
      {
        type: 'paragraph',
        text: 'En droit locatif belge, la règle est claire : l’entretien périodique d’usage et le ramonage de la cheminée incombent au locataire occupant. Le locataire doit faire appel à un technicien agréé et transmettre une copie de l’attestation au propriétaire bailleur.',
      },
      {
        type: 'paragraph',
        text: 'En revanche, les grosses réparations, le remplacement de pièces d’usure majeure (corps de chauffe fendu, circulateur hors service non imputable à un manque d’entretien) ou le remplacement complet de la chaudière restent à la charge exclusive du propriétaire.',
      },
      {
        type: 'callout',
        text: 'Bon à savoir : Lors de l’intervention, le technicien doit impérativement vous remettre l’Attestation de Contrôle Périodique officielle (avec mesure du rendement, du taux de CO et des pertes par les fumées).',
      },
      {
        type: 'heading2',
        text: '3. Les points clés vérifiés par le chauffagiste agréé Cerga',
      },
      {
        type: 'list',
        items: [
          'Nettoyage approfondi du corps de chauffe et du brûleur.',
          'Contrôle des organes de sécurité (soupape 3 bars, vase d’expansion, thermocouple ou sonde d’ionisation).',
          'Mesure de combustion électronique (rendement minimal légal, teneur en monoxyde de carbone CO inférieure à 50 ppm).',
          'Contrôle du tirage de la cheminée et de l’étanchéité des conduits d’évacuation.',
          'Purge des radiateurs et ajustement de la pression d’eau du circuit à 1,5 bar.',
        ],
      },
    ],
    faq: [
      {
        question: 'Que risque-t-on en cas de contrôle sans attestation en Belgique ?',
        answer:
          'Les Régions prévoient des amendes administratives pouvant aller de 250 € à plusieurs milliers d’euros, mais le risque majeur réside dans la déchéance de garantie de votre assurance incendie en cas de sinistre.',
      },
      {
        question: 'Quel est le prix moyen d’un entretien chaudière conforme ?',
        answer:
          'En Belgique, le tarif d’un entretien complet par un technicien agréé se situe généralement entre 120 € et 180 € HTVA pour une chaudière au gaz, et entre 160 € et 240 € HTVA pour une chaudière au mazout.',
      },
    ],
  },
  {
    _id: 'post-2',
    title: 'Chaudière en panne en plein hiver : les 5 vérifications avant d’appeler le dépanneur',
    slug: 'panne-chaudiere-gaz-hiver-premiers-reflexes',
    publishedAt: '2026-01-28T10:00:00.000Z',
    category: 'Dépannage & Urgence',
    readTime: '5 min de lecture',
    excerpt:
      'Votre chaudière s’est mise en sécurité ou ne produit plus d’eau chaude ? Voici 5 contrôles simples et sécurisés que vous pouvez réaliser vous-même avant de solliciter une intervention d’urgence.',
    author: {
      name: 'Laurent Mercier',
      role: 'Responsable des Interventions d’Urgence',
      certifications: ['Technicien Brûleur G1/G2', 'Spécialiste Diagnostic Vaillant & Bulex'],
      bio: 'Coordonnateur de permanence d’urgence 24/7 sur l’axe Bruxelles-Wallonie, intervenant sur plus de 800 dépannages annuels.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Se réveiller un matin d’hiver sans eau chaude et avec des radiateurs glacés est une situation anxiogène. Pourtant, dans près de 30% des cas, la mise en sécurité de la chaudière provient d’une anomalie mineure facile à résoudre sans démontage.',
      },
      {
        type: 'warning',
        text: 'Avertissement de sécurité absolu : Si vous sentez une odeur de gaz ou suspectez une émanation de monoxyde de carbone (odeur âcre, étourdissements), n’essayez JAMAIS de rallumer la chaudière. Coupez le gaz, aérez et composez immédiatement le 112 ou notre numéro d’astreinte.',
      },
      {
        type: 'heading2',
        text: 'Étape 1 : Vérifier la pression d’eau du manomètre',
      },
      {
        type: 'paragraph',
        text: 'Une pression insuffisante est la première cause de mise en sécurité d’une chaudière murale. Le manomètre (aiguille ou affichage digital) doit se situer entre 1,2 et 1,8 bar (zone verte). En dessous de 0,8 bar, le capteur de pression coupe le brûleur pour éviter la surchauffe.',
      },
      {
        type: 'callout',
        text: 'Comment réagir : Ouvrez délicatement les vannes de remplissage situées sous la chaudière jusqu’à atteindre 1,5 bar, puis refermez-les fermement.',
      },
      {
        type: 'heading2',
        text: 'Étape 2 : Identifier le code d’erreur sur l’écran',
      },
      {
        type: 'paragraph',
        text: 'Les chaudières modernes (Vaillant, Bulex, Viessmann, Bosch, Junckers) affichent un code alphanumérique précieux :',
      },
      {
        type: 'list',
        items: [
          'Vaillant F28 / F29 : Problème d’arrivée de gaz ou d’allumage (détendeur compteur fermé, vanne fermée).',
          'Bulex F1 / F4 : Défaut d’allumage ou absence de flamme.',
          'Viessmann F4 : Verrouillage brûleur par défaut de signal d’ionisation.',
          'Bosch / Junckers EA : Pas de détection de flamme.',
        ],
      },
      {
        type: 'heading2',
        text: 'Étape 3 : Tenter une réinitialisation (Reset)',
      },
      {
        type: 'paragraph',
        text: 'Appuyez sur le bouton "Reset" (ou icône de flamme barrée) pendant 3 à 5 secondes. Si la chaudière redémarre puis se remet en sécurité après quelques secondes, n’insistez pas : le défaut provient d’un organe mécanique ou électronique (sonde, électrode, extracteur).',
      },
    ],
    faq: [
      {
        question: 'En combien de temps un dépanneur peut-il intervenir en Belgique ?',
        answer:
          'Notre service d’astreinte d’urgence garantit une prise en charge sous 2 heures partout dans les communes desservies pour les pannes totales en période hivernale.',
      },
    ],
  },
  {
    _id: 'post-3',
    title: 'Primes chauffage et remplacement de chaudière en Belgique en 2026 : montants et conditions',
    slug: 'primes-renovation-chauffage-belgique-2026',
    publishedAt: '2026-02-05T09:00:00.000Z',
    category: 'Primes & Économies',
    readTime: '7 min de lecture',
    excerpt:
      'Quelles sont les aides financières disponibles à Bruxelles (Renolution) et en Wallonie (Primes Habitation) pour installer une pompe à chaleur ou moderniser votre installation de chauffage central ? Le point complet.',
    author: {
      name: 'Sophie Lambert',
      role: 'Conseillère en Transition Énergétique & Primes Régionales',
      certifications: ['Experte Rénovation Énergétique', 'Conseillère Renolution'],
      bio: 'Spécialiste de l’accompagnement des particuliers belges pour l’optimisation des primes de chauffage et des déductions fiscales.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Avec les objectifs européens de décarbonation et la transition hors des énergies fossiles, les gouvernements régionaux belges ont profondément revu le barème des aides financières accordées aux ménages. En 2026, l’accent est massivement mis sur les pompes à chaleur (air-eau et géothermiques) et les chaudières hybrides.',
      },
      {
        type: 'heading2',
        text: '1. Région de Bruxelles-Capitale : Le régime Renolution 2026',
      },
      {
        type: 'paragraph',
        text: 'À Bruxelles, les primes sont modulées selon la catégorie de revenus du demandeur (de la catégorie I à la catégorie IV) :',
      },
      {
        type: 'list',
        items: [
          'Pompe à chaleur pour le chauffage central : de 4 250 € à plus de 7 000 € de prime.',
          'Chauffe-eau thermodynamique : prime forfaitaire de 1 400 € à 2 200 €.',
          'Remplacement des conduites et vannes thermostatiques : prime additionnelle jusqu’à 40% des frais.',
        ],
      },
      {
        type: 'heading2',
        text: '2. Région wallonne : Primes Habitation avec ou sans audit',
      },
      {
        type: 'paragraph',
        text: 'En Wallonie, les primes de base sont multipliées par un coefficient (de 1 à 6) selon les revenus du ménage :',
      },
      {
        type: 'list',
        items: [
          'Installation d’une pompe à chaleur chauffage ou combinée : prime de base de 1 500 € pouvant atteindre jusqu’à 9 000 € selon vos revenus.',
          'Chaudière biomasse (pellets) : jusqu’à 6 000 € de soutien.',
          'Prime chauffe-eau solaire : jusqu’à 3 000 €.',
        ],
      },
      {
        type: 'callout',
        text: 'Condition sine qua non : Tous les travaux doivent être réalisés par un installateur certifié (Cerga / ResCert). Une facture détaillée mentionnant les normes techniques est exigée par l’administration.',
      },
    ],
    faq: [
      {
        question: 'Peut-on encore installer une chaudière au gaz à condensation en 2026 ?',
        answer:
          'Oui, les chaudières au gaz à condensation à très haut rendement restent autorisées en remplacement d’une ancienne installation, mais elles ne bénéficient plus de primes directes à l’achat, sauf en configuration hybride avec pompe à chaleur.',
      },
    ],
  },
]
