export interface ServiceFaqItem {
  question: string
  answer: string
}

export interface ServicePricingTier {
  label: string
  price: string
  description: string
  popular?: boolean
}

export interface ServiceStep {
  number: string
  title: string
  description: string
}

export interface NationalServiceData {
  slug: string
  title: string
  h1: string
  metaTitle: string
  metaDescription: string
  priceFrom: number
  isEmergency: boolean
  tagline: string
  shortDesc: string
  legalObligationText: string
  longDescription: string[]
  pricingTiers: ServicePricingTier[]
  interventionSteps: ServiceStep[]
  commonProblems: string[]
  supportedBrands: string[]
  faqs: ServiceFaqItem[]
}

export const NATIONAL_SERVICES: Record<string, NationalServiceData> = {
  'depannage-chaudiere': {
    slug: 'depannage-chaudiere',
    title: 'Dépannage chaudière',
    h1: 'Dépannage Chaudière en Belgique : Intervention d’Urgence 24h/24 & 7j/7',
    metaTitle: 'Dépannage Chaudière Belgique ≤ 24h | Agréé Cerga 24/7',
    metaDescription: 'Dépannage d’urgence chaudière gaz et mazout en Belgique. Techniciens agréés Cerga sur place en ≤ 2h. Diagnostic immédiat, pièces d’origine garanties.',
    priceFrom: 65,
    isEmergency: true,
    tagline: 'Intervention d’urgence en moins de 2 heures pour toute panne de chauffage ou fuite de gaz',
    shortDesc: 'Panne de chauffage, bruit suspect, fuite d’eau ou code erreur bloquant : nos techniciens agréés interviennent 7j/7 dans toute la Belgique.',
    legalObligationText: 'En cas de panne totale en période hivernale (novembre à mars), la législation belge et les contrats de bail protègent les occupants en imposant une obligation de moyens pour le rétablissement du chauffage dans les 24 à 48 heures. Nos attestations d’intervention technique sont agréées par toutes les compagnies d’assurance belges (Ethias, AXA, AG Insurance, KBC/CBC).',
    longDescription: [
      'Une chaudière en panne en plein hiver représente une situation d’urgence absolue pour le confort et la sécurité des occupants. Qu’il s’agisse d’une absence totale de chauffage, d’eau chaude sanitaire coupée, d’une perte de pression brutale ou d’un bruit anormal de circulateur, nos équipes de techniciens chauffagistes agréés Cerga sont mobilisées jour et nuit pour intervenir sans délai.',
      'Nos camionnettes d’intervention sillonnent quotidiennement les axes majeurs de Bruxelles et de la Wallonie (R0, E40, E411, E25). Chaque véhicule embarque un stock de plus de 200 pièces détachées d’origine (sondes d’ionisation, vases d’expansion, circulateurs Wilo/Grundfos, électrodes d’allumage, échangeurs à plaques, vannes trois voies). Cela nous permet de résoudre plus de 95% des pannes dès notre premier passage, sans immobilisation prolongée de votre installation.',
      'Avant tout remplacement de composant, notre chauffagiste réalise un diagnostic méthodique et vous soumet un devis transparent et détaillé. Aucune réparation n’est entreprise sans votre accord écrit préalable.',
    ],
    pricingTiers: [
      {
        label: 'Diagnostic Express & Réarmement',
        price: 'À partir de 65 €',
        description: 'Contrôle électrique, test des sécurités, diagnostic du code d’erreur et réarmement sécurisé de la chaudière.',
      },
      {
        label: 'Dépannage Standard avec Pièce',
        price: 'À partir de 125 €',
        description: 'Remplacement de petite pièce d’usure (sonde, thermocouple, électrode, purgeur automatique) + main-d’œuvre.',
        popular: true,
      },
      {
        label: 'Intervention Lourde d’Urgence',
        price: 'Sur devis précis',
        description: 'Remplacement circulateur, échangeur à plaques entartré, vanne gaz ou réfection de tuyauterie étanche.',
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Diagnostic de sécurité & analyse des codes',
        description: 'Contrôle immédiat de l’étanchéité du circuit de gaz naturel ou mazout, test du tirage et lecture des codes erreurs constructeur.',
      },
      {
        number: '02',
        title: 'Isolation de la panne & devis sur place',
        description: 'Identification précise du composant défectueux (vase d’expansion, pompe, brûleur) et communication d’un prix fixe tout compris.',
      },
      {
        number: '03',
        title: 'Réparation avec pièces d’origine certifiées',
        description: 'Remplacement de la pièce défaillante par un composant d’origine garanti 2 ans par le fabricant.',
      },
      {
        number: '04',
        title: 'Contrôle de combustion & remise en service',
        description: 'Test complet en charge, mesure du rendement et remise du rapport d’intervention conforme pour vos assurances.',
      },
    ],
    commonProblems: [
      'Chaudière qui s’éteint toute seule et affiche un voyant rouge',
      'Pression qui descend régulièrement sous 1 bar (besoin de remplissage quotidien)',
      'Bruit de bouillonnement ou de claquement dans le corps de chauffe',
      'Radiateurs froids alors que la chaudière semble tourner',
      'Eau sanitaire tiède ou froide malgré une demande maximale',
      'Odeur inhabituelle à proximité du brûleur (fermer immédiatement le compteur gaz)',
    ],
    supportedBrands: ['Vaillant', 'Bulex', 'Viessmann', 'Junkers', 'Bosch', 'ACV', 'Buderus', 'Chappée', 'Remeha', 'De Dietrich'],
    faqs: [
      {
        question: 'En combien de temps un dépanneur peut-il intervenir chez moi en Belgique ?',
        answer: 'Pour les situations d’urgence (absence de chauffage avec enfants en bas âge, personnes vulnérables ou fuite d’eau active), nos techniciens de garde interviennent en moyenne en moins de 2 heures dans les zones de Bruxelles, du Brabant wallon, de Liège, de Namur et du Hainaut.',
      },
      {
        question: 'Le dépannage de chaudière est-il à charge du locataire ou du propriétaire ?',
        answer: 'En Belgique, selon le Code civil, l’entretien régulier et les petites réparations d’usage sont à la charge du locataire. En revanche, les réparations majeures dues à la vétusté ou le remplacement d’un composant structurel coûteux incombent au bailleur.',
      },
      {
        question: 'Combien coûte un dépannage chaudière d’urgence le week-end ?',
        answer: 'Notre forfait de diagnostic démarre à 65 € en semaine. Les week-ends et jours fériés font l’objet d’une majoration de garde transparente qui vous est systématiquement précisée dès votre appel téléphonique avant validation du déplacement.',
      },
      {
        question: 'Mes réparations sont-elles garanties ?',
        answer: 'Absolument. Toutes nos pièces détachées d’origine constructeur et notre main-d’œuvre bénéficient d’une garantie totale de 2 ans.',
      },
    ],
  },

  'entretien-chaudiere': {
    slug: 'entretien-chaudiere',
    title: 'Entretien chaudière',
    h1: 'Entretien Chaudière Gaz & Mazout en Belgique : Attestation PEB Obligatoire',
    metaTitle: 'Entretien Chaudière Belgique dès 99€ | Attestation PEB & Cerga',
    metaDescription: 'Entretien périodique obligatoire chaudière gaz (tous les 2 ans) et mazout (annuel). Attestation de combustion PEB conforme assurances délivrée sur place.',
    priceFrom: 99,
    isEmergency: false,
    tagline: 'Respectez la législation PEB belge, réduisez votre facture d’énergie de 12% et prévenez 80% des pannes',
    shortDesc: 'Contrôle légal périodique gaz et mazout. Nettoyage méticuleux du brûleur, analyse des fumées et certificat PEB officiel délivré sur place.',
    legalObligationText: 'En Région de Bruxelles-Capitale et en Région Wallonne, le contrôle périodique PEB est une obligation légale stricte : tous les 2 ans pour les chaudières au gaz naturel, et chaque année pour les chaudières au mazout (fioul). En cas de sinistre (incendie, intoxication au CO), votre compagnie d’assurance exigera l’attestation de contrôle périodique signée par un technicien agréé PEB.',
    longDescription: [
      'L’entretien régulier de votre système de chauffage n’est pas seulement une exigence administrative légale en Belgique : c’est le garant direct de votre sécurité, de votre pouvoir d’achat et de la longévité de votre chaudière. Un appareil entretenu selon les normes constructeur consomme entre 8% et 12% de combustible en moins et voit son risque de panne hivernale divisé par cinq.',
      'Nos techniciens certifiés Cerga et techniciens PEB agréés par Bruxelles Environnement et le Service Public de Wallonie (SPW Énergie) procèdent à un nettoyage exhaustif. Ils démontent et récurrent le brûleur, nettoient le corps de chauffe en fonte d’aluminium ou inox, vérifient les électrodes d’allumage et contrôlent la pression du vase d’expansion.',
      'À l’issue de la prestation, une analyse de combustion électronique est effectuée à l’aide d’un analyseur de gaz étalonné. Le technicien vérifie les émissions de monoxyde de carbone (CO), le taux de dioxyde de carbone (CO2) et le rendement de l’appareil, puis vous remet immédiatement votre attestation officielle numérotée avec rapport de combustion.',
    ],
    pricingTiers: [
      {
        label: 'Entretien Chaudière Gaz',
        price: 'À partir de 99 €',
        description: 'Nettoyage complet, analyse de combustion, réglage brûleur et attestation PEB 2 ans.',
        popular: true,
      },
      {
        label: 'Entretien Chaudière Mazout',
        price: 'À partir de 160 €',
        description: 'Nettoyage foyer, ramonage conduit, remplacement gicleur mazout et attestation PEB annuelle.',
      },
      {
        label: 'Formule Confort Sérénité (Gaz)',
        price: '149 € / an',
        description: 'Entretien bisannuel inclus + assistance dépannage prioritaire avec main-d’œuvre offerte en cas d’urgence.',
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Démontage & nettoyage méticuleux',
        description: 'Dépose du brûleur, dépoussiérage du ventilateur et nettoyage approfondi des échangeurs thermiques.',
      },
      {
        number: '02',
        title: 'Vérification des organes de sécurité',
        description: 'Contrôle de la soupape 3 bars, du vase d’expansion et de l’étanchéité absolue de l’arrivée de combustible.',
      },
      {
        number: '03',
        title: 'Analyse électronique des fumées de combustion',
        description: 'Mesure précise du CO, CO2, excès d’air et température des fumées pour garantir le rendement maximal.',
      },
      {
        number: '04',
        title: 'Délivrance de l’attestation PEB officielle',
        description: 'Remise en main propre ou par email du certificat officiel numéroté pour votre propriétaire et votre assureur.',
      },
    ],
    commonProblems: [
      'Consommation de gaz ou de mazout en hausse anormale sur votre décompte annuel',
      'Encrassement prématuré du corps de chauffe dû à la poussière domestique',
      'Risque mortel d’intoxication au monoxyde de carbone (CO) en cas de mauvaise évacuation',
      'Refus d’indemnisation par l’assurance habitation en cas de sinistre sans certificat PEB',
    ],
    supportedBrands: ['Vaillant', 'Bulex', 'Viessmann', 'Junkers', 'Bosch', 'ACV', 'Buderus', 'Chappée', 'Remeha', 'Weishaupt'],
    faqs: [
      {
        question: 'À quelle fréquence l’entretien de la chaudière est-il obligatoire en Belgique ?',
        answer: 'Pour les chaudières au gaz naturel, l’obligation est bisannuelle (tous les 2 ans) en Wallonie et à Bruxelles. Pour les chaudières au mazout (fioul), l’entretien est strictement annuel sur tout le territoire belge.',
      },
      {
        question: 'L’attestation PEB remise est-elle valable pour les compagnies d’assurance ?',
        answer: 'Oui. Nos techniciens possèdent les agréments officiels Cerga et PEB (habilitations GI/GII gaz et combustible liquide). Le certificat délivré comporte leur numéro d’agrément officiel, exigé par les compagnies d’assurance belges.',
      },
      {
        question: 'Puis-je bénéficier du taux de TVA réduit à 6% sur l’entretien ?',
        answer: 'Oui, si votre logement privé a plus de 10 ans d’ancienneté, la TVA applicable sur la prestation et les pièces est de 6% au lieu de 21%. Il suffit de signer l’attestation légale que nous fournissons.',
      },
    ],
  },

  'installation-chauffage': {
    slug: 'installation-chauffage',
    title: 'Installation chauffage',
    h1: 'Installation & Remplacement de Chaudière en Belgique : Gaz Condensation & Hybride',
    metaTitle: 'Installation Chaudière Belgique | Primes Régionales & Devis Gratuit',
    metaDescription: 'Installation et remplacement de chaudières à condensation haute performance en Belgique. Agréé Cerga, devis gratuit sous 24h et éligibilité aux primes Renolution/SPW.',
    priceFrom: 350,
    isEmergency: false,
    tagline: 'Modernisez votre installation, gagnez jusqu’à 35% d’économies d’énergie et touchez jusqu’à 4 250 € de primes',
    shortDesc: 'Pose et remplacement de chaudières murales ou sol à condensation. Dimensionnement thermique précis, matériel haut rendement et montage certifié Cerga.',
    legalObligationText: 'Depuis 2015, la directive européenne ErP interdit l’installation de chaudières traditionnelles non étanches : seules les chaudières à condensation de classe A ou les systèmes hybrides sont autorisés. Les installations doivent obligatoirement faire l’objet d’un certificat de conformité gaz (attestation Cerga Art. 48) pour ouvrir le compteur ou valider les garanties constructeurs.',
    longDescription: [
      'Remplacer une chaudière vétuste de plus de 15 ans par une chaudière gaz à condensation moderne permet de réduire votre facture annuelle de gaz de 25% à 35% dès le premier hiver. Grâce à la récupération de la chaleur latente contenue dans la vapeur d’eau des fumées, ces générateurs atteignent des rendements saisonniers supérieurs à 108%.',
      'Notre bureau d’études thermiques réalise un bilan de puissance personnalisé de votre habitation : volume à chauffer, qualité de l’isolation, nombre de points d’eau et type d’émetteurs (radiateurs haute température ou basse température). Nous évitons ainsi tout surdimensionnement coûteux ou sous-dimensionnement inconfortable.',
      'Nous vous accompagnons également dans le montage de vos dossiers de primes régionales (Primes Renolution en Région bruxelloise, Primes Habitation SPW en Région wallonne). Nos devis et factures intègrent toutes les mentions techniques exigées par l’administration pour garantir un versement rapide de vos subventions.',
    ],
    pricingTiers: [
      {
        label: 'Remplacement Standard Chaudière Murale',
        price: 'À partir de 1 850 € TTC',
        description: 'Démontage ancienne chaudière, pose nouvelle chaudière condensation classe A, raccordements et mise en service.',
        popular: true,
      },
      {
        label: 'Rénovation Complète Chauffage Central',
        price: 'Sur étude thermique gratuite',
        description: 'Générateur haute performance + tubage cheminée ventouse inox + pose thermostat connecté modulation.',
      },
      {
        label: 'Solution Hybride (Chaudière + PAC)',
        price: 'À partir de 4 900 € TTC',
        description: 'Couplage d’une chaudière gaz et d’une pompe à chaleur pour optimiser le coût du kWh en temps réel.',
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Visite technique gratuite & audit thermique',
        description: 'Analyse sur place de vos besoins, relevé des diamètres de tuyauterie et choix de la puissance optimale.',
      },
      {
        number: '02',
        title: 'Devis détaillé ferme sous 24 heures',
        description: 'Chiffrage transparent sans aucun coût caché avec déduction des primes régionales estimées.',
      },
      {
        number: '03',
        title: 'Installation soignée en 1 journée',
        description: 'Dépose de l’ancien appareil, pose de la nouvelle chaudière, tubage étanche et rinçage du circuit.',
      },
      {
        number: '04',
        title: 'Mise en service & certificat Cerga',
        description: 'Réglage des paramètres de chauffe, formation à l’utilisation et remise de l’attestation de conformité légale.',
      },
    ],
    commonProblems: [
      'Chaudière actuelle âgée de plus de 15 ans avec pannes répétées et coûteuses',
      'Facture énergétique disproportionnée par rapport à la taille de l’habitation',
      'Pièces de rechange introuvables car arrêtées par le fabricant',
      'Volonté de valoriser la note PEB de son bien immobilier en vue d’une vente ou location',
    ],
    supportedBrands: ['Vaillant', 'Bulex', 'Viessmann', 'Bosch', 'ACV', 'Buderus', 'Remeha', 'Daikin'],
    faqs: [
      {
        question: 'Quel est le montant des primes régionales pour une nouvelle chaudière en Belgique ?',
        answer: 'À Bruxelles, les primes Renolution peuvent atteindre jusqu’à 1 200 € pour une chaudière gaz condensation performante et jusqu’à 4 250 € pour une pompe à chaleur. En Wallonie, les Primes Habitation SPW octroient des subventions substantielles calculées selon votre catégorie de revenus.',
      },
      {
        question: 'Combien de temps durent les travaux de remplacement ?',
        answer: 'Dans 90% des cas, le remplacement d’une chaudière murale s’effectue en une seule journée de travail (6 à 8 heures), sans coupure prolongée de chauffage.',
      },
    ],
  },

  'reparation-chaudiere': {
    slug: 'reparation-chaudiere',
    title: 'Réparation chaudière',
    h1: 'Réparation de Chaudière en Belgique : Pièces d’Origine Toutes Marques',
    metaTitle: 'Réparation Chaudière Belgique | Pièces Garanties 2 Ans',
    metaDescription: 'Réparation experte de chaudières toutes marques en Belgique (Vaillant, Bulex, Viessmann, Bosch). Pièces détachées d’origine constructeur et devis clair.',
    priceFrom: 85,
    isEmergency: false,
    tagline: 'Prolongez la durée de vie de votre chaudière sans la remplacer inutilement',
    shortDesc: 'Diagnostic approfondi des composants défaillants. Remplacement de pièces d’origine certifiées avec garantie constructeur.',
    legalObligationText: 'Toute intervention sur les circuits de gaz ou d’évacuation des fumées doit être exécutée par un professionnel qualifié Cerga pour conserver la validité des assurances et la garantie fabricant de l’appareil.',
    longDescription: [
      'Votre chaudière commence à montrer des signes de fatigue ? Plutôt que d’engager prématurément le coût d’un remplacement intégral, la réparation ciblée d’un organe mécanique ou électronique est souvent la solution la plus économique et écologique.',
      'Nos techniciens disposent d’une expertise multimarque pointue. Qu’il s’agisse d’une défaillance de carte électronique (PCB), d’un bloc gaz grippé, d’une vanne distributrice 3 voies bloquée ou d’un vase d’expansion dégonflé, nous identifions la cause racine du dysfonctionnement sans tâtonnement.',
    ],
    pricingTiers: [
      {
        label: 'Petite Réparation & Électronique',
        price: 'À partir de 85 €',
        description: 'Sondes, aquastat, manomètre, réarmement sécurité surchauffe.',
      },
      {
        label: 'Remplacement Composant Majeur',
        price: 'À partir de 180 €',
        description: 'Circulateur haute efficacité, vase d’expansion, échangeur secondaire.',
        popular: true,
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Diagnostic précis des composants',
        description: 'Contrôle des tensions électriques, des résistances de sondes et des débits d’eau.',
      },
      {
        number: '02',
        title: 'Devis de réparation immédiat',
        description: 'Prix fixe comprenant la pièce détachée d’origine et la main-d’œuvre.',
      },
      {
        number: '03',
        title: 'Pose de la pièce certifiée',
        description: 'Remplacement selon les préconisations techniques du manuel constructeur.',
      },
      {
        number: '04',
        title: 'Test d’endurance et validation',
        description: 'Essai sous contrainte en mode chauffage et eau chaude sanitaire.',
      },
    ],
    commonProblems: [
      'Goutte-à-goutte continu sous la chaudière au niveau de la soupape',
      'Chaudière qui fait disjoncter le compteur électrique de l’habitation',
      'Variations subites de température sous la douche (eau écossaise)',
    ],
    supportedBrands: ['Vaillant', 'Bulex', 'Viessmann', 'Junkers', 'Bosch', 'ACV', 'Buderus', 'Chappée', 'Remeha'],
    faqs: [
      {
        question: 'Vaut-il mieux réparer ou remplacer ma chaudière ?',
        answer: 'Si votre chaudière a moins de 10 à 12 ans et que le coût de réparation est inférieur à 30% du prix d’un appareil neuf, la réparation est fortement conseillée. Au-delà de 15 ans ou si le corps de chauffe principal est percé, le remplacement est plus rentable.',
      },
    ],
  },

  'regulation-thermostat': {
    slug: 'regulation-thermostat',
    title: 'Régulation & thermostat',
    h1: 'Régulation Chauffage & Thermostats Connectés en Belgique',
    metaTitle: 'Thermostat Connecté & Régulation Belgique | Économies 15-25%',
    metaDescription: 'Installation de thermostats connectés (Nest, Tado, Netatmo, vSMART) et régulation climatique par sonde extérieure. Optimisez votre confort et réduisez vos factures.',
    priceFrom: 120,
    isEmergency: false,
    tagline: 'Pilotez votre confort au degré près et réalisez jusqu’à 25% d’économies sur vos factures',
    shortDesc: 'Installation de thermostats intelligents modulants, vannes thermostatiques connectées et régulation climatique par sonde extérieure.',
    legalObligationText: 'La législation PEB impose l’installation de systèmes de régulation efficaces (thermostat d’ambiance à horloge et vannes thermostatiques sur chaque radiateur) pour limiter le gaspillage énergétique dans les logements neufs ou rénovés.',
    longDescription: [
      'Avoir une chaudière à haut rendement ne suffit pas si le système de régulation est obsolète ou mal réglé. En installant un thermostat connecté intelligent modulant (protocole OpenTherm ou eBUS), la chaudière ajuste en permanence la température de l’eau circulant dans les radiateurs au lieu de fonctionner par à-coups énergivores.',
      'Pilotez votre chauffage à distance depuis votre smartphone, programmez des plages de chauffe adaptées à vos heures de présence et profitez de la géolocalisation pour baisser la température dès que vous quittez votre domicile.',
    ],
    pricingTiers: [
      {
        label: 'Pose Thermostat Connecté Simple',
        price: 'À partir de 120 €',
        description: 'Installation et configuration d’un thermostat intelligent filaire ou sans fil.',
      },
      {
        label: 'Pack Régulation Complète Multizone',
        price: 'À partir de 290 €',
        description: 'Thermostat central modulant + têtes thermostatiques connectées pièce par pièce.',
        popular: true,
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Vérification de la compatibilité chaudière',
        description: 'Contrôle du bus de communication (OpenTherm, relais contact sec ou protocole propriétaire).',
      },
      {
        number: '02',
        title: 'Installation du récepteur et de la passerelle',
        description: 'Raccordement électrique sécurisé sur la carte mère de la chaudière.',
      },
      {
        number: '03',
        title: 'Configuration de l’application mobile',
        description: 'Appairage Wi-Fi, programmation horaire sur mesure et test de portée radio.',
      },
      {
        number: '04',
        title: 'Explication et formation utilisateur',
        description: 'Prise en main des fonctions clés d’optimisation énergétique.',
      },
    ],
    commonProblems: [
      'Pièces surchauffées alors que d’autres restent froides',
      'Chaudière qui tourne inutilement la journée quand le logement est vide',
      'Ancien thermostat mécanique avec imprécision de plus de 2°C',
    ],
    supportedBrands: ['Google Nest', 'Tado', 'Netatmo', 'Vaillant vSMART', 'Bulex MiGo', 'Honeywell Lyric', 'Somfy'],
    faqs: [
      {
        question: 'Un thermostat connecté est-il compatible avec toutes les chaudières ?',
        answer: 'Quasiment toutes les chaudières récentes ou de moins de 20 ans disposent d’une entrée contact sec ou modulant compatible avec les marques majeures (Tado, Netatmo, Nest). Nos techniciens valident la compatibilité avant toute pose.',
      },
    ],
  },

  'chauffage-sol': {
    slug: 'chauffage-sol',
    title: 'Chauffage au sol',
    h1: 'Chauffage au Sol en Belgique : Pose, Entretien & Désembouage Professionnel',
    metaTitle: 'Chauffage au Sol Belgique | Désembouage & Installation',
    metaDescription: 'Spécialiste du plancher chauffant basse température en Belgique. Désembouage hydrodynamique, équilibrage des collecteurs et pose certifiée.',
    priceFrom: 200,
    isEmergency: false,
    tagline: 'Le confort ultime de la chaleur douce et homogène, sans radiateurs encombrants',
    shortDesc: 'Installation neuve ou rénovation, désembouage des serpentins à l’eau pulsée et rééquilibrage thermique des débits.',
    legalObligationText: 'Les circuits de chauffage au sol en PER sont soumis au phénomène de perméabilité à l’oxygène, favorisant la formation rapide de boues et d’algues corrosives. Les normes techniques sanitaires recommandent un rinçage et traitement inhibiteur tous les 5 à 7 ans.',
    longDescription: [
      'Le plancher chauffant offre un confort thermique inégalé grâce à une diffusion douce et parfaitement homogène de la chaleur par rayonnement sur toute la surface de la pièce. Fonctionnant à très basse température (eau entre 30°C et 35°C), il est le partenaire idéal des pompes à chaleur et des chaudières à condensation.',
      'Cependant, avec le temps, des boues d’oxydation et des bactéries s’accumulent dans les serpentins, provoquant des zones froides sur le carrelage et une surconsommation d’énergie. Nous réalisons un désembouage hydrodynamique complet à haute pression d’air et d’eau pulsée pour restaurer les performances d’origine de vos circuits.',
    ],
    pricingTiers: [
      {
        label: 'Désembouage Hydrodynamique 1 à 4 circuits',
        price: 'À partir de 380 €',
        description: 'Rinçage circuit par circuit à la centrale pulsée + réinjection produit inhibiteur.',
        popular: true,
      },
      {
        label: 'Équilibrage Collecteurs & Débitmètres',
        price: 'À partir de 150 €',
        description: 'Réglage des vannes micrométriques pour une température égale dans toutes les pièces.',
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Diagnostic thermique à la caméra infrarouge',
        description: 'Visualisation directe des zones bouchées et des différences de température au sol.',
      },
      {
        number: '02',
        title: 'Raccordement de la centrale de désembouage',
        description: 'Branchement sur les clarinettes de distribution sans démonter le carrelage.',
      },
      {
        number: '03',
        title: 'Rinçage à l’eau et impulsions d’air comprimé',
        description: 'Évacuation totale des boues et sédiments accumulés boucle par boucle.',
      },
      {
        number: '04',
        title: 'Traitement préventif et passivation',
        description: 'Injection d’un fluide inhibiteur de corrosion longue durée et purge d’air.',
      },
    ],
    commonProblems: [
      'Sol tiède ou froid à certains endroits du salon ou des chambres',
      'Chaudière qui tourne en permanence sans réussir à chauffer la dalle',
      'Débitmètres sur le collecteur devenus totalement noirs et opaques',
    ],
    supportedBrands: ['Rehau', 'Begetube', 'Comap', 'Wavin', 'Roth', 'Giacomini'],
    faqs: [
      {
        question: 'À quelle fréquence faut-il désembouer un chauffage au sol ?',
        answer: 'Il est conseillé de réaliser un désembouage tous les 5 à 7 ans pour préserver l’échangeur de la chaudière et maintenir un rendement thermique optimal.',
      },
    ],
  },

  'pompe-chaleur': {
    slug: 'pompe-chaleur',
    title: 'Pompe à chaleur',
    h1: 'Pompes à Chaleur en Belgique : Installation, Primes & Entretien Certifié',
    metaTitle: 'Pompe à Chaleur Belgique | Primes Régionales jusqu’à 4250€',
    metaDescription: 'Installation de pompes à chaleur air-eau et hybrides en Belgique. Réduisez vos factures de 60%. Installateurs certifiés RESCert et devis gratuit.',
    priceFrom: 800,
    isEmergency: false,
    tagline: 'Divisez par trois votre empreinte carbone et profitez des aides régionales maximales',
    shortDesc: 'Pompes à chaleur air-eau, air-air et systèmes hybrides. Étude de faisabilité, dimensionnement thermodynamique et certification RESCert.',
    legalObligationText: 'En Belgique, les installations de pompes à chaleur contenant plus de 5 tonnes équivalent CO2 de fluide frigorigène sont soumises à un contrôle d’étanchéité annuel obligatoire par un frigoriste certifié RESCert. Seuls les installateurs certifiés permettent d’accéder aux primes régionales Renolution et Habitation SPW.',
    longDescription: [
      'La pompe à chaleur (PAC) air-eau est la technologie reine de la transition énergétique en Belgique. En puisant jusqu’à 75% de son énergie gratuitement dans les calories de l’air extérieur pour 25% d’électricité consommée, elle affiche un coefficient de performance (COP) souvent supérieur à 4.',
      'Que ce soit en remplacement complet d’une cuve à mazout ou en solution hybride en relève d’une chaudière gaz existante, nos techniciens certifiés RESCert vous guident vers l’équipement le plus pertinent selon le niveau d’isolation de votre logement.',
      'Nous prenons en charge l’ensemble de votre dossier administratif pour solliciter les primes régionales les plus avantageuses (jusqu’à 4 250 € à Bruxelles avec les primes Renolution, et des montants substantiels en Wallonie avec les Primes Habitation).',
    ],
    pricingTiers: [
      {
        label: 'Entretien & Contrôle Étanchéité PAC',
        price: 'À partir de 180 €',
        description: 'Contrôle des pressions de fluide frigorigène, nettoyage unité extérieure et filtres.',
      },
      {
        label: 'Installation PAC Air-Eau Complète',
        price: 'À partir de 7 500 € TTC (hors primes)',
        description: 'Unité extérieure + module hydraulique intérieur + raccordements et mise en service certifiée.',
        popular: true,
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Étude thermique et calcul du COP annuel',
        description: 'Analyse des déperditions du bâtiment et dimensionnement sans surcoût.',
      },
      {
        number: '02',
        title: 'Sélection de l’emplacement de l’unité extérieure',
        description: 'Respect des distances de voisinage et intégration acoustique soignée.',
      },
      {
        number: '03',
        title: 'Pose frigorifique et hydraulique par frigoriste agréé',
        description: 'Tirage au vide, test d’étanchéité sous azote et raccordements au réseau.',
      },
      {
        number: '04',
        title: 'Dossier de primes régionales clé en main',
        description: 'Délivrance de l’attestation RESCert et accompagnement au dépôt des primes.',
      },
    ],
    commonProblems: [
      'Facture d’électricité excessive due à un appoint électrique qui s’enclenche en continu',
      'Unité extérieure bruyante ou givrée qui ne dégivre plus correctement',
      'Doute sur la compatibilité des radiateurs existants avec une PAC basse température',
    ],
    supportedBrands: ['Daikin', 'Mitsubishi Electric', 'Viessmann', 'Vaillant aroTHERM', 'Panasonic Aquarea', 'Atlantic', 'NIBE'],
    faqs: [
      {
        question: 'Puis-je installer une pompe à chaleur avec des radiateurs classiques ?',
        answer: 'Oui, grâce aux pompes à chaleur haute température (qui chauffent l’eau jusqu’à 65°C ou 75°C), il est possible de conserver ses radiateurs existants sans avoir à refaire les sols.',
      },
      {
        question: 'Quelles sont les primes pour une pompe à chaleur en 2026 en Belgique ?',
        answer: 'À Bruxelles, la prime Renolution s’élève de 2 500 € à 4 250 € selon les revenus. En Wallonie, les primes Habitation SPW soutiennent massivement les pompes à chaleur pour encourager la sortie des énergies fossiles.',
      },
    ],
  },

  'debouchage': {
    slug: 'debouchage',
    title: 'Débouchage',
    h1: 'Débouchage d’Urgence en Belgique : Canalisations, WC & Évacuations 24h/24',
    metaTitle: 'Débouchage Canalisations Belgique 24/7 | Haute Pression & Caméra',
    metaDescription: 'Débouchage urgent de canalisations, WC, éviers et égouts en Belgique. Déboucheurs équipés de caméras d’inspection et hydrocureuses haute pression.',
    priceFrom: 75,
    isEmergency: true,
    tagline: 'Intervention d’urgence en moins de 2 heures pour refoulement d’égout ou sanitaires bouchés',
    shortDesc: 'Débouchage haute pression de canalisations, colonnes d’immeuble, WC et éviers. Inspection caméra vidéo et curage préventif.',
    legalObligationText: 'En cas de refoulement d’eaux usées dans les parties privatives ou communes d’un immeuble, un débouchage d’urgence est impératif pour éviter la détérioration des sols et la prolifération bactérienne. Nos interventions sont certifiées pour les déclarations d’assurance dégât des eaux.',
    longDescription: [
      'Un WC complètement obstrué, une douche qui ne s’évacue plus ou un refoulement nauséabond dans la cave constitue un cauchemar domestique nécessitant une réaction immédiate. Nos artisans déboucheurs interviennent 24h/24 et 7j/7 avec un équipement professionnel de pointe.',
      'Pour venir à bout des bouchons les plus tenaces (amas de graisse, lingettes, tartre calcaire, racines dans les canalisations extérieures), nous utilisons des furets mécaniques professionnels ainsi que des hydrocureuses haute pression propulsant jusqu’à 200 bars d’eau.',
      'Si le bouchon est récurrent, nous réalisons une inspection vidéo par caméra endoscopique étanche pour visualiser l’intérieur de la canalisation, repérer d’éventuelles cassures, affaissements ou contre-pentes, et vous fournir un enregistrement précis pour votre assurance.',
    ],
    pricingTiers: [
      {
        label: 'Débouchage Manuel / Furet Mécanique',
        price: 'À partir de 75 €',
        description: 'Débouchage d’évier, siphon, lavabo ou WC accessible sans démontage lourd.',
      },
      {
        label: 'Débouchage Haute Pression Hydrocurage',
        price: 'À partir de 160 €',
        description: 'Nettoyage complet de la colonne ou canalisation extérieure au jet haute pression 200 bars.',
        popular: true,
      },
      {
        label: 'Inspection Caméra Vidéo Haute Définition',
        price: 'À partir de 120 €',
        description: 'Passage caméra, détection de casse ou racine + rapport pour assurance habitation.',
      },
    ],
    interventionSteps: [
      {
        number: '01',
        title: 'Localisation du bouchon & sécurisation',
        description: 'Arrêt de l’écoulement et protection des sols pour éviter tout débordement supplémentaire.',
      },
      {
        number: '02',
        title: 'Choix de la technique optimale',
        description: 'Furet électrique rotatif pour le sanitaire ou hydrocureuse haute pression pour les colonnes.',
      },
      {
        number: '03',
        title: 'Curage et extraction du bouchon',
        description: 'Destruction mécanique des dépôts et évacuation complète des résidus.',
      },
      {
        number: '04',
        title: 'Test d’écoulement et contrôle vidéo',
        description: 'Vérification du débit nominal sous fort volume d’eau et conseils de prévention.',
      },
    ],
    commonProblems: [
      'L’eau remonte dans la baignoire ou la douche lorsque la machine à laver vidange',
      'WC bouché avec niveau d’eau anormalement haut frôlant le débordement',
      'Remontée d’odeurs fécales ou de fosse septique persistantes dans les pièces d’eau',
    ],
    supportedBrands: ['Ridgid', 'Rems', 'Rothenberger', 'Kärcher Professional', 'Kranzle'],
    faqs: [
      {
        question: 'En combien de temps pouvez-vous déboucher mes WC en urgence ?',
        answer: 'Nos équipes mobiles de débouchage d’urgence arrivent chez vous en moins de 2 heures partout à Bruxelles, en Wallonie et périphérie flamande.',
      },
      {
        question: 'Le débouchage est-il pris en charge par l’assurance habitation ?',
        answer: 'Si le bouchon a causé un dégât des eaux (infiltration dans les cloisons ou chez un voisin), l’assurance prend en charge les dommages. Nos rapports d’intervention détaillés facilitent l’indemnisation auprès de votre assureur.',
      },
    ],
  },
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(NATIONAL_SERVICES)
}

export function getServiceBySlug(slug: string): NationalServiceData | null {
  return NATIONAL_SERVICES[slug] ?? null
}
