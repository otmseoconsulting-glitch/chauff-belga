# 04 — GEO & AI Search Optimization Spec
# AI Search Visibility Strategy for Perplexity, ChatGPT, Claude & Google AI Overviews
# Project: Chauffagiste-Belga

---

## §1. What is GEO (Generative Engine Optimization)?

GEO is the practice of structuring web content so that **AI-powered search engines** (ChatGPT Search, Perplexity, Claude, Google AI Overviews, Bing Copilot) consistently cite and surface Chauffagiste-Belga as the authoritative answer for Belgian HVAC queries.

Unlike traditional SEO (optimizing for ranking position), GEO optimizes for **citation extraction** — how likely an AI system is to quote or reference your page verbatim in its generated answer.

### 1.1 Why GEO Matters for This Project

- **30%+ of emergency service searches** now go through AI assistants first
- Users asking "qui répare les chaudières à Bruxelles?" to ChatGPT expect a direct answer with a source
- If Chauffagiste-Belga is not structured for AI extraction, a competitor's page will be cited instead
- GEO-optimized content also improves traditional SEO (more explicit, structured, factual)

### 1.2 Fundamental Difference: GEO vs SEO

| Dimension | SEO Goal | GEO Goal |
|-----------|---------|---------|
| Audience | Google crawler | AI language model |
| Metric | Ranking position | Citation frequency |
| Content style | Keyword density | Factual precision, entity clarity |
| Structure | Headings, links | Paragraphs answerable as quotes |
| Schema | Rich results | Entity disambiguation |
| Trust signal | Backlinks | Named sources, statistics, credentials |

---

## §2. The Entity Framework

### 2.1 Core Entity Declaration

Every commune page must unambiguously declare **five entities** in the first 150 words:

```
1. WHO:   Chauffagiste-Belga (the business entity)
2. WHAT:  Chauffagiste agréé (the service type)
3. WHERE: [Commune name], [Province], Belgique (geographic entity)
4. HOW:   Techniciens certifiés Cerga/Argb (credential entity)
5. WHEN:  7j/7, 24h/24, délai ≤ 24h (availability entity)
```

### 2.2 Mandatory Opening Paragraph Structure

```
[WHO] est un [WHAT] intervenant à [WHERE]. [HOW-credential statement].
[WHEN-availability]. [Primary service commitment with specific number].
```

**Example (AI-extractable)**:
> "Chauffagiste-Belga est un chauffagiste agréé Cerga intervenant à Liège (4000), dans la province de Liège, Belgique. Nos techniciens certifiés assurent le dépannage, l'entretien et l'installation de chaudières toutes marques. Disponibles 7j/7, 24h/24. Délai d'intervention garanti : ≤ 24 heures, ≤ 2 heures pour les urgences. Numéro d'appel : 0475 12 34 56."

**AI systems can extract and cite this verbatim.** It answers "qui répare les chaudières à Liège?" definitively.

### 2.3 Entity @id Consistency

The `@id` values in JSON-LD must be **identical across all pages** for the same business entity:

```typescript
// lib/constants/entities.ts — READ ONLY — do not change @id values after launch
export const ENTITY_IDS = {
  business: 'https://chauffagiste-belga.be#business',        // LocalBusiness root
  website:  'https://chauffagiste-belga.be#website',          // WebSite entity
  // Per-page entities use page-specific fragments:
  // commune: `https://chauffagiste-belga.be/chauffagiste-${slug}#business`
  // service: `https://chauffagiste-belga.be/${service}-${commune}#service`
} as const
```

---

## §3. Content Signals AI Systems Extract

### 3.1 High-Extraction Content Patterns

Research on AI citation behavior shows these content types are preferentially extracted:

| Content Type | Extraction Likelihood | Implementation |
|-------------|----------------------|---------------|
| Direct answers to questions | Very High | FAQ section with `<dt>/<dd>` or H3+P |
| Specific numbers/statistics | Very High | "≤ 24h", "€65 minimum", "1,247 avis" |
| Named credentials | High | "Agréé Cerga, certifié Argb" |
| Geographic specificity | High | Commune name + postal code + province |
| Step-by-step procedures | High | "1. Appelez le 0475 12 34 56…" |
| Comparison tables | Medium | Price comparison, service comparison |
| Vague marketing claims | Very Low | "Meilleur service", "Experts passionnés" |

### 3.2 Prohibited Content Patterns (AI-Invisible)

```
❌ "Nous sommes les meilleurs du secteur"      — Non-verifiable, AI ignores
❌ "Service de qualité à prix compétitif"       — Vague, AI skips
❌ "Contactez-nous pour en savoir plus"          — No actionable info
❌ "Avec des années d'expérience..."             — No specific number
✅ "Fondée en 2014, plus de 12,500 interventions réalisées en Belgique"
✅ "Devis gratuit — délai de réponse : 30 minutes en heures ouvrables"
✅ "Prix de départ : 65 € pour un diagnostic chaudière (pièces en sus)"
```

---

## §4. Structured Data for AI Disambiguation

### 4.1 Mandatory Schemas Per Page Type

| Page Type | Required Schemas |
|-----------|-----------------|
| Homepage | `WebSite` + `SearchAction` + `LocalBusiness` + `AggregateRating` |
| Province hub | `LocalBusiness` (areaServed = province) + `BreadcrumbList` |
| Commune page | `HVACBusiness` + `BreadcrumbList` + `FAQPage` + geo meta tags |
| Service+Commune | `PlumbingService` + `BreadcrumbList` + `FAQPage` + `Offer` |
| Blog post | `Article` + `Person` (author) + `BreadcrumbList` + `FAQPage` |

### 4.2 AI-Specific Schema Additions

Add these fields specifically for AI entity resolution (beyond standard SEO):

```typescript
// In HVACBusiness schema — AI-specific fields
{
  knowsAbout: [
    'Dépannage chaudière à gaz',
    'Entretien chaudière obligatoire Belgique',
    'Réglementation PEB Wallonie',
    'Primes énergie Bruxelles',
    'Installation pompe à chaleur Belgique',
    'Réparation chaudière Bulex, Vaillant, Viessmann',
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'Agrément Cerga', credentialCategory: 'Certification professionnelle belge chauffage' },
    { '@type': 'EducationalOccupationalCredential', name: 'Certification Argb', credentialCategory: 'Accréditation gaz naturel Belgique' },
    { '@type': 'EducationalOccupationalCredential', name: 'Certification PEB', credentialCategory: 'Performance Énergétique des Bâtiments' },
  ],
  slogan: 'Votre chauffagiste agréé en Belgique — Intervention ≤ 24h',
  foundingDate: '2014',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 12 },
}
```

---

## §5. robots.txt AI Crawler Policy

### 5.1 Explicit AI Crawler Allowlist

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers
      { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/', '/_next/'] },
      // Explicitly allow AI crawlers — critical for GEO
      {
        userAgent: [
          'GPTBot',           // ChatGPT Search
          'OAI-SearchBot',    // OpenAI
          'PerplexityBot',    // Perplexity AI
          'ClaudeBot',        // Anthropic Claude
          'anthropic-ai',     // Anthropic
          'Googlebot',        // Google AI Overviews
          'Google-Extended',  // Google Gemini training
          'CCBot',            // Common Crawl (used by many AI systems)
          'cohere-ai',        // Cohere
          'Meta-ExternalAgent', // Meta AI
        ],
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: 'https://chauffagiste-belga.be/sitemap.xml',
  }
}
```

**Note**: `Google-Extended` allows Google to use content for AI training (Gemini). This is kept `allow: '/'` to maximize GEO reach. If the client prefers to opt out of AI training, set `disallow: ['/']` for `Google-Extended` only.

---

## §6. GEO Content Templates

### 6.1 FAQ Mandatory Topics (per commune page)

Every commune page FAQ must cover these topics — they map directly to queries AI systems are asked:

```typescript
export const MANDATORY_FAQ_TOPICS = [
  'urgence',           // "Intervenez-vous en urgence à [commune] ?"
  'prix',              // "Quel est le coût d'un dépannage à [commune] ?"
  'marques',           // "Quelles marques réparez-vous ?"
  'entretien-legal',   // "L'entretien annuel est-il obligatoire en Belgique ?"
  'delai',             // "Quel est votre délai d'intervention à [commune] ?"
] as const
```

### 6.2 GEO-Optimized FAQ Answer Template

AI systems extract FAQ answers best when they:
- Begin with a direct "Yes/No + detail" structure
- Include a specific number or fact in the first sentence
- Are 50–150 words long (not too short to seem sparse, not too long to dilute signal)

```typescript
// lib/seo/faq-templates.ts
export function buildUrgencyFAQ(commune: string): FAQItem {
  return {
    question: `Intervenez-vous en urgence à ${commune} ?`,
    answer: `Oui. Chauffagiste-Belga intervient en urgence à ${commune} 7 jours sur 7 et 24 heures sur 24. Pour les pannes graves (plus de chauffage en hiver, fuite de gaz détectée), notre délai d'intervention est garanti inférieur à 2 heures. Pour les urgences non-critiques, comptez un délai maximal de 24 heures. Appelez le 0475 12 34 56 pour une intervention immédiate.`,
  }
}

export function buildPriceFAQ(commune: string): FAQItem {
  return {
    question: `Quel est le prix d'un dépannage chaudière à ${commune} ?`,
    answer: `Le tarif de départ pour un dépannage chaudière à ${commune} est de 65 € (diagnostic et déplacement). Ce montant couvre l'identification de la panne. Si des pièces sont nécessaires, un devis détaillé est établi avant toute intervention — sans engagement. La main-d'œuvre est facturée séparément selon la complexité. Devis 100% gratuit et transparent.`,
  }
}
```

---

## §7. AI Search Answer Targeting

### 7.1 Target AI Queries per Commune

For each commune, the content should be optimized to appear when AI systems are asked:

```
Direct service queries:
- "chauffagiste [commune]"
- "dépannage chaudière [commune]"
- "entretien chaudière [commune] prix"
- "plombier urgence [commune]"
- "pompe à chaleur [commune]"

Informational queries (blog):
- "entretien chaudière obligatoire Belgique"
- "prime pompe à chaleur Wallonie 2026"
- "réglementation chaudière Bruxelles"
- "quelle marque chaudière choisir"
```

### 7.2 Content Depth Requirements for AI Citation

| Content Element | Minimum | Target | AI Citation Impact |
|----------------|---------|--------|-------------------|
| Word count | 600 | 900+ | Low below 400 |
| FAQ items | 4 | 6 | High — AI loves Q&A |
| Specific numbers | 3 | 8+ | Very high |
| Named certifications | 1 | 3 | High |
| Brand names mentioned | 3 | 8+ | Medium (builds expertise signals) |
| Geographic specificity points | 3 | 6 | Very high |

---

## §8. GEO Monitoring

### 8.1 Manual Citation Checks (Monthly)

Test these prompts in ChatGPT, Perplexity, and Claude:

```
"Quel chauffagiste intervient à Bruxelles ?"
"Dépannage chaudière urgence Liège, qui appeler ?"
"Meilleur chauffagiste Belgique"
"Entretien chaudière obligatoire Belgique qui contacter ?"
```

Track in `tracking/04-seo-kpi-tracker.md`:
- Was Chauffagiste-Belga cited? (Y/N)
- Which page was referenced?
- What text was quoted?
- Date of check

### 8.2 Automated GEO KPI Tracking

Log to `tracking/04-seo-kpi-tracker.md` monthly:

| AI Engine | Queries Tested | Citations | Citation Rate | Top Cited Page |
|-----------|---------------|-----------|--------------|---------------|
| ChatGPT Search | 10 | 0 | 0% | — |
| Perplexity | 10 | 0 | 0% | — |
| Claude | 10 | 0 | 0% | — |
| Google AI Overview | 10 | 0 | 0% | — |

**Target**: ≥ 30% citation rate on direct service queries within 6 months of launch.
