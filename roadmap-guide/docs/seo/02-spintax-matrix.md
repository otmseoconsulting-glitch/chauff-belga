# 02 — Spintax Content Matrix
# Content Variation Blocks for 580+ Belgian Commune pSEO Pages
# Project: Chauffagiste-Belga

---

## §1. How Spintax Works

Spintax uses `{option A|option B|option C}` syntax where one variant is selected at render time. The engine uses a **seeded pseudo-random function** to ensure:

1. The same commune always gets the same variant for the same block (deterministic)
2. Different blocks for the same commune use different seeds (internal variance)
3. No manual selection is needed — 580+ pages generate automatically

**Seed formula**: `xorshift32(nisCode + charCodeSum(blockId))`

**Replace `{commune}` before resolving spintax.** It is a literal token, not a spintax branch.

---

## §2. Block Specifications

| Block ID | Placement | Category | Min Words |
|----------|-----------|----------|-----------|
| `intro-general-01` | intro-paragraph | general | 45 |
| `intro-depannage-01` | intro-paragraph | depannage-chaudiere | 50 |
| `intro-entretien-01` | intro-paragraph | entretien-chaudiere | 50 |
| `intro-installation-01` | intro-paragraph | installation-chauffage | 50 |
| `intro-pompe-chaleur-01` | intro-paragraph | pompe-chaleur | 50 |
| `intro-debouchage-01` | intro-paragraph | debouchage | 40 |
| `trust-statement-01` | trust-statement | general | 30 |
| `trust-certifications-01` | trust-statement | general | 25 |
| `urgency-01` | urgency-paragraph | depannage-chaudiere | 35 |
| `urgency-winter-01` | urgency-paragraph | depannage-chaudiere | 35 |
| `service-overview-01` | service-description | general | 40 |
| `service-description-depannage-01` | service-description | depannage-chaudiere | 50 |
| `price-overview-01` | service-description | general | 30 |
| `closing-cta-01` | closing-cta | general | 20 |
| `closing-cta-urgence-01` | closing-cta | depannage-chaudiere | 20 |
| `faq-intro-01` | faq-intro | general | 15 |
| `nearby-intro-01` | trust-statement | general | 10 |

**Minimum uniqueness requirement**: `0.85` (85% difference between any two commune pages, same service, same block)

---

## §3. Content Blocks

### 3.1 General Intro

```
Block: intro-general-01
```

```
{Chauffagiste-Belga intervient|Notre équipe de chauffagistes certifiés intervient|Nos techniciens agréés interviennent} à {commune} pour {tous vos besoins en chauffage et plomberie|l'ensemble de vos besoins de chauffage|tous vos projets et urgences de chauffage}. {Dépannage|Réparation|Entretien}, {installation|pose} ou {réparation|maintenance} : {notre équipe est disponible|nos techniciens sont joignables|nous sommes disponibles} {7 jours sur 7|7j/7|toute la semaine}, {24 heures sur 24|24h/24|même la nuit et les week-ends}. {Délai d'intervention garanti|Intervention garantie} : {moins de 24 heures|≤ 24h|sous 24 heures maximum}.
```

### 3.2 Dépannage Intro

```
Block: intro-depannage-01
```

```
{Chauffagiste-Belga intervient|Notre équipe de chauffagistes intervient|Nos techniciens certifiés interviennent} {rapidement|en urgence|dans les meilleurs délais} à {commune} pour tout {dépannage|problème|dysfonctionnement} de {chaudière|chauffage central|installation de chauffage}. {Panne, fuite, perte de pression|Chaudière en panne, fuite d'eau, perte de chaleur|Problème de chaudière, fuite ou pression insuffisante|Chaudière qui ne démarre plus, erreur de brûleur ou fuite} : {nous sommes disponibles 7j/7, 24h/24|notre équipe est joignable 7 jours sur 7|nous intervenons en urgence à toute heure|nos techniciens restent disponibles sans interruption}. {Délai d'intervention à {commune}|Intervention à {commune}} : {inférieur à 24h pour les demandes standard|sous 24 heures maximum|sous 2 heures pour les urgences critiques}.
```

### 3.3 Entretien Intro

```
Block: intro-entretien-01
```

```
{L'entretien annuel de votre chaudière|Le contrôle annuel de votre installation de chauffage|La révision annuelle de votre chaudière} à {commune} est {obligatoire selon la réglementation belge|imposé par la loi belge|requis par les normes belges en vigueur}. {Chauffagiste-Belga|Notre équipe certifiée Cerga|Nos techniciens agréés} {réalise|effectue|assure} {cet entretien réglementaire|cette révision obligatoire|ce contrôle annuel réglementaire} {à {commune}|dans votre commune} avec {soin et professionnalisme|rigueur et expertise|tout le sérieux requis}, en {émettant le rapport de conformité|délivrant le certificat d'entretien|fournissant le document réglementaire nécessaire}. {Prix à partir de 99 €|Tarif : dès 99 €|À partir de 99 € TTC}.
```

### 3.4 Installation Intro

```
Block: intro-installation-01
```

```
{Vous souhaitez installer|Vous envisagez de poser|Vous planifiez l'installation d'} {une nouvelle chaudière|un système de chauffage moderne|un nouveau système de chauffage} à {commune} ? {Chauffagiste-Belga|Notre équipe de techniciens certifiés|Nos installateurs agréés} {vous accompagne|vous guide|prend en charge votre projet} de {l'étude thermique à la mise en service|la conception au démarrage|l'audit à l'installation complète}. {Toutes marques|Bulex, Vaillant, Viessmann, De Dietrich et bien d'autres|Toutes les grandes marques belges et européennes}. {Devis gratuit|Estimation gratuite|Devis détaillé sans engagement} {sous 48h|en 2 jours ouvrables|rapidement}.
```

### 3.5 Pompe à Chaleur Intro

```
Block: intro-pompe-chaleur-01
```

```
{La pompe à chaleur|Une pompe à chaleur air-eau ou géothermique} est {la solution de chauffage la plus économique|une des solutions les plus performantes|le système de chauffage le plus écologique} {à {commune} et dans toute la Belgique|pour les habitations belges}. {Chauffagiste-Belga|Nos techniciens certifiés PAC|Notre équipe spécialisée} {installe et entretient|pose et assure la maintenance de|installe, programme et maintient} {vos équipements|votre installation PAC|vos systèmes de pompe à chaleur}. {Profitez des primes énergétiques belges|Bénéficiez des aides à l'installation|Cumulez les primes régionales} {pour réduire votre investissement|pour financer une partie de votre installation|pour maximiser votre retour sur investissement}.
```

### 3.6 Débouchage Intro

```
Block: intro-debouchage-01
```

```
{Canalisation bouchée|Evacuations bloquées|WC bouché ou évier colmaté} à {commune} ? {Chauffagiste-Belga intervient en urgence|Notre équipe de plombiers déboucheurs intervient rapidement|Nos techniciens spécialisés en débouchage interviennent} {pour déboucher|afin de débloquer|pour résoudre} {vos canalisations, évacuations et WC|tout type de bouchon dans vos canalisations|vos problèmes d'évacuation}. {Intervention rapide|Délai garanti} : {moins de 2 heures pour les urgences|sous 2h en cas d'urgence|dès que possible selon disponibilité}. {Tarif dès 75 €|Prix de départ : 75 €|À partir de 75 €}.
```

### 3.7 Trust Statements

```
Block: trust-statement-01
{Depuis plus de 10 ans|Fort de plus d'une décennie d'expérience|Avec plus de 10 années d'expertise dans le secteur}, Chauffagiste-Belga {accompagne|aide|assiste} {les particuliers et professionnels|les ménages belges|les clients résidentiels et commerciaux} de {commune} {et des environs|} avec {un service fiable et de qualité|des interventions rapides et durables|un service chauffage de confiance}. {Plus de 12 500 interventions réalisées|12 500+ clients satisfaits en Belgique|Plus de 12 000 dépannages réussis} depuis notre {création|fondation} en 2014.

Block: trust-certifications-01
Tous nos techniciens intervenant à {commune} sont {agréés Cerga et certifiés Argb|certifiés par les organismes belges de référence (Cerga, Argb)|accrédités selon les normes belges en vigueur}. {Cette certification|Cet agrément|Cette accréditation} {est obligatoire en Belgique|garantit le respect des normes de sécurité|est gage de qualité et de sécurité} {pour toute intervention sur les installations à gaz|pour les travaux sur chaudières à gaz naturel|pour les travaux de chauffage conformes à la loi}.
```

### 3.8 Urgency Paragraphs

```
Block: urgency-01
{En cas de panne|Pour toute urgence chauffage|Si votre chaudière tombe en panne} à {commune}, {n'attendez pas|ne perdez pas de temps|contactez-nous immédiatement}. {Un technicien qualifié|Notre technicien agréé|Un de nos chauffagistes certifiés} peut {intervenir chez vous en moins de 2 heures|être chez vous en 2h maximum|arriver sur place rapidement} pour les {urgences chauffage|pannes critiques|situations d'urgence sans chauffage ni eau chaude}. {Disponible 7j/7 et 24h/24|Joignable à toute heure|Accessible même les jours fériés}.

Block: urgency-winter-01
{En hiver|Lors des périodes de grand froid|Pendant la saison froide}, une panne de chaudière à {commune} est {une urgence absolue|une situation critique|un problème qui ne peut attendre}. {Chauffagiste-Belga|Notre équipe} {intervient en priorité|priorise les interventions|traite en urgence} les {logements sans chauffage|maisons et appartements sans chauffage ni eau chaude|habitations privées d'eau chaude ou de chaleur} avec {un délai garanti de moins de 2 heures|une arrivée sur place sous 2h|une réponse dans l'heure pour les cas les plus graves}.
```

### 3.9 Closing CTAs

```
Block: closing-cta-01
{Besoin d'un chauffagiste à {commune}|Vous cherchez un chauffagiste fiable à {commune}|Un problème de chauffage à {commune}} ? {Contactez-nous maintenant|Appelez notre équipe|Demandez votre devis} : {devis gratuit|intervention rapide|service disponible} {7j/7 et 24h/24|tous les jours|sans délai}. ☎ 0475 12 34 56.

Block: closing-cta-urgence-01
{Urgence chaudière à {commune}|Panne de chaudière à {commune}|Votre chaudière est en panne à {commune}} ? {Appelez immédiatement|Ne perdez pas une minute — appelez|Contactez notre équipe d'urgence} : ☎ 0475 12 34 56 — {disponible 7j/7 · 24h/24|ouvert sans interruption|joignable jour et nuit}. {Intervention garantie sous 2h|Nous arrivons sous 2 heures|Délai maximal garanti : 2 heures}.
```

---

## §4. FAQ Templates (6 mandatory topics)

### 4.1 Urgence

**Question**: `Intervenez-vous en urgence à {commune} ?`

**Answer**: Oui, Chauffagiste-Belga intervient en urgence à {commune} 7j/7 et 24h/24. Pour les pannes graves (plus de chauffage en hiver, suspicion de fuite de gaz), notre délai d'intervention est garanti inférieur à 2 heures. Pour les urgences non-critiques, comptez un délai maximal de 24 heures. Appelez directement le 0475 12 34 56.

### 4.2 Prix dépannage

**Question**: `Quel est le coût d'un dépannage chaudière à {commune} ?`

**Answer**: Le tarif de départ pour un dépannage chaudière à {commune} est de 65 € (diagnostic et déplacement inclus). Ce montant couvre l'identification de la panne. Si des pièces ou des travaux supplémentaires sont nécessaires, un devis détaillé vous est remis avant toute intervention — sans engagement. Paiement en espèces, carte bancaire ou virement bancaire.

### 4.3 Marques

**Question**: `Quelles marques de chaudières réparez-vous à {commune} ?`

**Answer**: À {commune}, nos techniciens certifiés réparent et entretiennent toutes les marques de chaudières : Bulex (Bosch), Vaillant, Viessmann, De Dietrich, Junkers, Saunier Duval, Baxi, Ariston, Ferroli, Chappée, Atlantic, et bien d'autres. Nous sommes également agréés par les principales marques pour les travaux sous garantie.

### 4.4 Entretien légal

**Question**: `L'entretien annuel de ma chaudière est-il obligatoire à {commune} ?`

**Answer**: Oui, l'entretien annuel de votre chaudière à gaz est obligatoire en Belgique, quelle que soit votre commune (y compris {commune}). La réglementation impose un entretien périodique réalisé par un technicien agréé Cerga. À l'issue de la révision, un rapport de conformité vous est remis. Le défaut d'entretien peut entraîner l'invalidation de votre assurance habitation en cas de sinistre.

### 4.5 Délai

**Question**: `Quel est votre délai d'intervention à {commune} ?`

**Answer**: Pour une urgence chauffage à {commune}, notre délai d'intervention garanti est inférieur à 2 heures (24h/24, 7j/7). Pour les demandes standard (entretien, installation, devis), nous intervenons dans les 24 à 48 heures ouvrables. Vous pouvez nous joindre à tout moment au 0475 12 34 56 ou via notre formulaire de devis en ligne.

### 4.6 Devis

**Question**: `Comment obtenir un devis pour {commune} ?`

**Answer**: Pour obtenir un devis gratuit à {commune}, vous pouvez : (1) Appeler directement le 0475 12 34 56 — un technicien évalue votre besoin en quelques minutes. (2) Remplir le formulaire de devis en ligne sur cette page — réponse sous 30 minutes en heures ouvrables. (3) Envoyer un email à info@chauffagiste-belga.be. Le devis est entièrement gratuit et sans engagement.

---

## §5. Spintax Engine Implementation Reference

```typescript
// lib/seo/spintax.ts
function xorshift32(seed: number): number {
  let x = seed
  x ^= x << 13
  x ^= x >> 17
  x ^= x << 5
  return x >>> 0
}

function seededRandom(seed: number): number {
  return (xorshift32(seed) / 0xFFFFFFFF)
}

export function resolveSpintax(template: string, seed: number): string {
  return template.replace(/\{([^{}]+)\}/g, (_, options: string) => {
    const choices = options.split('|')
    const index = Math.floor(seededRandom(seed) * choices.length)
    return choices[index]
  })
}

// Usage: same NIS code + block ID = always same variant
export function buildBlockSeed(nisCode: string, blockId: string): number {
  const blockSum = blockId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return parseInt(nisCode, 10) * 1000 + blockSum
}
```

**Placeholder tokens** (replace before resolving spintax):
- `{commune}` → French commune name
- `{province}` → French province name
- `{service}` → French service name
