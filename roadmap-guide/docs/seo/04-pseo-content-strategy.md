# 04 — pSEO Content Strategy & Architectural Blueprint
# Differentiating Major Cities (Authority Hubs) vs Small Communes (Dispatch Pages)
# Project: Chauffagiste-Belga

---

## §1. Executive Overview & Core Philosophy

To achieve #1 rankings across Belgium without triggering Google helpful content penalties or cannibalizing queries, the content strategy bifurcates into two distinct architectural page archetypes:

1. **Major City Commune Pages (Authority Hubs)**: Deep, comprehensive, multi-intent mini-portals (1,500 – 2,500 words) designed for high-density, highly competitive urban centers (e.g., Bruxelles, Liège, Charleroi, Namur).
2. **Small Commune Pages (Dispatch Pages)**: Streamlined, high-velocity, proximity-driven conversion pages (800 – 1,200 words) tailored for smaller local municipalities.

```
                  ┌─────────────────────────────────────────┐
                  │          NATIONAL SERVICE HUBS          │
                  │        (/nos-services/[service])        │
                  └────────────────────┬────────────────────┘
                                       │
                      ▲ Equity Flow    │ Topical Authority
                      │                ▼
                  ┌─────────────────────────────────────────┐
                  │         MAJOR CITY AUTHORITY HUBS       │
                  │   (/chauffagiste-[bruxelles|liege|...]) │
                  │     1,500 – 2,500 words | Multi-Intent  │
                  └────────────────────▲────────────────────┘
                                       │
                       ▲ Lateral & Up  │
                       │ Link Equity   │
     ┌─────────────────────────────────┴─────────────────────────────────┐
     │                                                                   │
┌────┴─────────────────────────────┐       ┌─────────────────────────────┴────┐
│      SMALL COMMUNE DISPATCH      │       │      SMALL COMMUNE DISPATCH      │
│     (/chauffagiste-[communeA])   │◄─────►│     (/chauffagiste-[communeB])   │
│  800 – 1,200 words | Proximity   │       │  800 – 1,200 words | Proximity   │
└──────────────────────────────────┘       └──────────────────────────────────┘
```

---

## §2. Major / Big City Commune Pages (Authority Hubs)

*Examples: Bruxelles, Liège, Charleroi, Namur, Mons, Ixelles, Uccle, Schaerbeek.*

Major cities are highly competitive. To rank #1, these pages cannot be thin spun content; they must act as comprehensive, authoritative "mini-hubs" that satisfy all stages of the customer journey (Transactional, Informational, Commercial).

### 2.1 Content & Sections Strategy

- **The "Hero" (Transactional/Emergency Intent):**
  - Immediate CTA (Click-to-Call + Sticky Call on Mobile).
  - Localized direct phone number routing.
  - Response time guarantee (e.g., *"Intervention à Liège en ≤ 2h"*).
  - Prominent trust badges: **Cerga** (gas authorization), **PEB** (energy performance certification), **VCA** (safety).

- **Service Hubbing (Mixed Intent Breakdown):**
  - **Emergency (Dépannage):** Focus on speed, 24/7 availability, safety protocols (gas leaks, carbon monoxide prevention, lack of heating in mid-winter).
  - **Maintenance (Entretien):** Focus on Belgian legal obligations (PEB regulations: biennial for gas boilers in Brussels & Wallonia, annual for oil/mazout), breakdown prevention, efficiency optimization, and boiler longevity.
  - **Installation & Modernization:** Focus on energy efficiency gains, hybrid systems, heat pumps (*pompe à chaleur*), and specific regional subsidies:
    - *Wallonie*: **Prime Habitation** (audit logement, primes audit et travaux).
    - *Bruxelles*: **Primes Renolution** (Catégories A, B, C de revenus).
    - *Brabant Flamand*: **Mijn VerbouwPremie**.

- **Symptoms, Causes & Solutions (Informational Long-Tail Capture):**
  - Directly addresses what the user experiences when troubleshooting in distress:
    - *"Baisse de pression chaudière (aiguille en dessous de 1 bar)"*
    - *"Chaudière en sécurité (codes erreur fréquents : Vaillant F28/F22, Bulex F1/F4, Viessmann F4)"*
    - *"Radiateur qui reste froid en bas ou fait un bruit d'écoulement d'eau (nécessité de purge ou désembouage)"*
    - *"Odeur suspecte ou fumées anormales"*
  - Explains the probable physical cause and details the step-by-step diagnostic process our certified technician executes on-site.

- **Hyper-Local Contextual Anchors:**
  - Mentions of specific districts, neighborhoods, and arterial transit axes (e.g., for Bruxelles: Quartier Européen, Louise, Châtelain, Ring R0; for Liège: Guillemins, Outremeuse, Citadelle).
  - Local water hardness data (*titre hydrotimétrique / dureté de l'eau en °fH*), highlighting how limestone buildup damages heat exchangers and sanitary circuits in that specific city.

- **Social Proof & Structured FAQs:**
  - Real, geotagged customer reviews with timestamped service types.
  - Dynamic FAQ section answering high-intent local queries, marked up with `FAQPage` Schema.org.

### 2.2 NLP, LSI & Semantic Keywords Matrix

- **Keyword Variations:**
  - `plombier chauffagiste [commune]`
  - `technicien agréé gaz [commune]`
  - `réparateur chaudière [commune]`
  - `société de chauffage [commune]`
  - `artisan chauffagiste [commune]`
- **Entities & Recognized Brands:**
  - Regulatory: `Cerga`, `Technicien PEB`, `Bruxelles Environnement`, `SPW Énergie`, `Contrôle périodique`.
  - Manufacturers: `Vaillant`, `Bulex`, `Viessmann`, `Junkers / Bosch`, `ACV`, `Buderus`, `Chappée`, `Remeha`.
  - Fuels & Technologies: `gaz naturel`, `mazout / fioul`, `chaudière à condensation`, `pompe à chaleur (PAC air-eau)`, `chauffe-eau thermodynamique`.
- **High-Converting LSI Terms:**
  - `devis gratuit sans engagement`, `intervention rapide`, `fuite d'eau chaudière`, `thermostat d'ambiance connecté`, `purge radiateur`, `certificat de conformité`, `désembouage circuit de chauffe`, `vase d'expansion dégonflé`.

### 2.3 Word Count & Data Injection Standard

- **Target Word Count:** **1,500 – 2,500 words.**
- **The World-Class pSEO Secret — Real Data Injection:**
  Instead of generic spun text, each Major City page dynamically injects verified, data-backed tokens from the database:
  - Estimated technician dispatch count currently active in that operational sector.
  - City-specific water hardness rating and limescale risk profile.
  - Exact municipal postal codes and sub-neighborhoods.
  - Current regional subsidy amounts and application links.

---

## §3. Small Communes vs. Major Cities (Dispatch Pages)

*Examples: Grez-Doiceau, Chaudfontaine, Flobecq, Profondeville, Beauvechain, Wemmel, Kraainem.*

Smaller communes have substantially lower search volume and lower competitive barriers. Applying an exhaustive 2,500-word educational guide to a municipality of 5,000 residents creates unnatural topical footprints for Googlebot and exhausts crawl budget unnecessarily.

### 3.1 Content Focus: Proximity & Velocity

- **Target Word Count:** **800 – 1,200 words.** Keep copy punchy, direct, and strictly transactional.
- **Core Value Proposition:** Proximity, speed, and immediate local presence:
  *"Un chauffagiste certifié est à proximité immédiate de [Commune] pour une intervention d'urgence en 30 à 60 minutes."*
- **Educational De-scoping:** Detailed guides on boiler error codes, extensive maintenance legislation history, and deep-dive technical essays are omitted from these pages. Educational depth is left to the National Service pages and the Major City Authority Hubs.

### 3.2 Streamlined 4-Block Section Blueprint

1. **Hero with Emergency CTA:**
   - Urgent headline featuring `[Commune]`.
   - 24/7 Hotline phone number CTA + quick request form.
   - Core trust badges (Cerga, Agréé Région).
2. **Quick Services Grid:**
   - Dépannage d'urgence (panne, brûleur, fuite).
   - Entretien légal obligatoire & attestation PEB.
   - Remplacement et installation chaudière.
3. **Local Geographic Cluster ("Intervention à [Commune] et ses environs"):**
   - Contextual links to 5–8 neighboring sibling communes within a 10–15 km radius.
   - Highlights rapid road access via local highways/routes.
4. **Local FAQ & Dispatch Contact Form:**
   - 3–4 concise FAQs focused on response times, pricing transparency, and emergency dispatch procedures in `[Commune]`.

---

## §4. The "Hub and Spoke" Internal Link & Equity Flow

The relationship between Small Communes and Major Cities forms a coherent geographic link graph:

```
[Small Commune A] ──(lateral link)──► [Small Commune B]
       │                                     │
       └──(Upward Link - Passing Equity)────►│
                                             ▼
                                 [MAJOR CITY AUTHORITY HUB]
                                   (e.g., Liège / Namur)
                                             ▲
                                             │ (Topical Link)
                                 [NATIONAL SERVICE GUIDE]
```

1. **Lateral Geographic Clusters:** Small communes link sideways to immediately adjacent sibling communes, cementing local geographic relevance.
2. **Upward Link Equity Flow:** Every small commune page embeds a contextual link **UP** to its nearest Major City Authority Hub (e.g., *Chaudfontaine* links to *Liège*; *Wavre* or *Waterloo* link up to *Bruxelles* or *Brabant Wallon Hub*). This channels accumulated PageRank and relevance up to the high-competition city pages.
3. **No Downward Cannibalization:** Major cities link to national service guides and core surrounding hubs, never scattering their equity across 50 tiny villages in footer link farms.

---

## §5. Content Architecture Summary Matrix

| Metric / Dimension | Major City Authority Hub | Small Commune Dispatch Page |
|--------------------|--------------------------|-----------------------------|
| **Primary Intent** | Mixed (Emergency + Commercial + Informational) | Pure Transactional (Immediate Dispatch) |
| **Word Count** | **1,500 – 2,500 words** | **800 – 1,200 words** |
| **Symptoms & Diagnostic Section** | Included (Codes F28, F22, pressure drop, etc.) | Excluded (Linked to Service Guides) |
| **Subsidies & Grants Detail** | Full regional subsidy breakdown (Renolution / Habitation) | Brief mention + link to regional guide |
| **Local Landmarks & Roads** | Specific neighborhoods, avenues, ring roads | Nearby towns and primary access routes |
| **Internal Linking Role** | Receives equity from small communes; links to services | Links laterally to siblings + **UP** to Major Hub |
| **Schema.org Graph** | `HVACBusiness`, `FAQPage`, `BreadcrumbList`, `Review` | `HVACBusiness`, `FAQPage`, `BreadcrumbList` |
| **Target SERP Competition** | High (Aggregators, established local players) | Low to Medium (Local sole practitioners) |
