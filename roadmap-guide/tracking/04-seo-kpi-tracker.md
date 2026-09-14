# 04 — SEO KPI Tracker
# Search Performance Dashboard & GEO Citation Monitoring
# Project: Chauffagiste-Belga

---

> **Update cadence**: Weekly for GSC metrics. Monthly for GEO citations. After each major deployment for Core Web Vitals.

---

## §1. Core Web Vitals Targets

| Metric | Target | Threshold (Fail) | Tool |
|--------|--------|-----------------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | > 4.0s | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | > 0.25 | PageSpeed Insights |
| INP (Interaction to Next Paint) | ≤ 200ms | > 500ms | PageSpeed Insights |
| FCP (First Contentful Paint) | ≤ 1.8s | > 3.0s | PageSpeed Insights |
| TTFB (Time to First Byte) | ≤ 800ms | > 1800ms | PageSpeed Insights |
| Lighthouse Mobile Score | ≥ 92 | < 80 | Lighthouse CLI |
| Lighthouse Desktop Score | ≥ 97 | < 90 | Lighthouse CLI |

### 1.1 Core Web Vitals Log

| Date | Page Tested | LCP | CLS | INP | Mobile Score | Desktop Score | Status |
|------|------------|-----|-----|-----|-------------|--------------|--------|
| — | — | — | — | — | — | — | ⬜ Not yet measured |

---

## §2. Google Search Console — Indexation Metrics

### 2.1 Indexation Targets

| Metric | Target (30 days post-launch) | Target (90 days post-launch) |
|--------|------------------------------|------------------------------|
| Commune pages indexed | 100% (580/580) | 100% |
| Service+Commune indexed | ≥ 80% (3,712/4,640) | 100% |
| Province hubs indexed | 100% (11/11) | 100% |
| Blog posts indexed | 100% | 100% |
| Sitemap errors | 0 | 0 |
| Crawl errors (4xx) | 0 | 0 |

### 2.2 GSC Weekly Log

| Week | Date Range | Total Clicks | Impressions | Avg CTR | Avg Position | Pages Indexed | Notes |
|------|-----------|-------------|-------------|---------|-------------|--------------|-------|
| W1 | — | — | — | — | — | — | Pre-launch |
| W2 | — | — | — | — | — | — | — |
| W3 | — | — | — | — | — | — | — |
| W4 | — | — | — | — | — | — | — |

### 2.3 Top Performing Pages Log

Track monthly. Pull from GSC → Performance → Pages sorted by Clicks:

| Month | Rank | Page URL | Clicks | Impressions | CTR | Avg Position |
|-------|------|---------|--------|-------------|-----|-------------|
| — | 1 | — | — | — | — | — |
| — | 2 | — | — | — | — | — |
| — | 3 | — | — | — | — | — |

---

## §3. Organic Traffic Goals

### 3.1 Monthly Traffic Milestones

| Milestone | Target | Metric | Status |
|-----------|--------|--------|--------|
| M1 (1 month post-launch) | 500 organic sessions | Google Analytics | ⬜ |
| M3 (3 months post-launch) | 3,000 organic sessions | Google Analytics | ⬜ |
| M6 (6 months post-launch) | 10,000 organic sessions | Google Analytics | ⬜ |
| M12 (12 months post-launch) | 30,000 organic sessions | Google Analytics | ⬜ |

### 3.2 Conversion Goals

| Conversion Event | GA4 Event Name | Target Rate | Current Rate |
|-----------------|----------------|-------------|-------------|
| Phone click (mobile) | `click_to_call` | ≥ 8% of mobile sessions | — |
| Lead form submission | `lead_submit` | ≥ 3% of all sessions | — |
| Postal code lookup | `postal_lookup` | ≥ 15% of homepage sessions | — |
| Thank you page reached | `thank_you_page_view` | — | — |

---

## §4. Keyword Ranking Tracker

### 4.1 Priority Keywords to Monitor

Track weekly via Semrush / Ahrefs Position Tracking (Belgium, FR language):

| Keyword | Current Position | Target Position | Status |
|---------|-----------------|-----------------|--------|
| chauffagiste bruxelles | — | Top 3 | ⬜ |
| dépannage chaudière bruxelles | — | Top 3 | ⬜ |
| chauffagiste liège | — | Top 3 | ⬜ |
| dépannage chaudière liège | — | Top 3 | ⬜ |
| entretien chaudière bruxelles prix | — | Top 5 | ⬜ |
| chauffagiste namur | — | Top 3 | ⬜ |
| installation chauffage bruxelles | — | Top 5 | ⬜ |
| pompe à chaleur bruxelles | — | Top 5 | ⬜ |
| entretien chaudière obligatoire belgique | — | Top 5 | ⬜ |
| chauffagiste urgence bruxelles | — | Top 3 | ⬜ |

---

## §5. GEO (Generative Engine Optimization) Citation Tracker

### 5.1 Monthly AI Citation Tests

Test the following prompts in each AI engine. Record result:

**Test prompts**:
```
1. "Qui répare les chaudières à Bruxelles ?"
2. "Dépannage chaudière urgence Liège, qui appeler ?"
3. "Meilleur chauffagiste Belgique"
4. "Entretien chaudière obligatoire Belgique — qui contacter ?"
5. "Chauffagiste agréé Cerga Belgique"
```

### 5.2 GEO Citation Log

| Month | Engine | Prompt # | Cited? | Page Cited | Text Quoted (excerpt) |
|-------|--------|---------|--------|-----------|----------------------|
| — | ChatGPT Search | 1 | — | — | — |
| — | ChatGPT Search | 2 | — | — | — |
| — | Perplexity | 1 | — | — | — |
| — | Perplexity | 2 | — | — | — |
| — | Claude (claude.ai) | 1 | — | — | — |
| — | Google AI Overview | 1 | — | — | — |
| — | Bing Copilot | 1 | — | — | — |

### 5.3 GEO Monthly Summary

| Month | Prompts Tested | Total Citations | Citation Rate | Best Engine | Best Page |
|-------|---------------|----------------|--------------|-------------|-----------|
| — | 25 | 0 | 0% | — | — |

**Target**: ≥ 30% citation rate on direct service queries within 6 months of launch.

---

## §6. Sitemap Submission Log

| Date | Sitemap URL | Submitted To | Pages in Sitemap | Status |
|------|------------|-------------|-----------------|--------|
| — | /sitemap.xml | Google Search Console | — | ⬜ Pending launch |
| — | /sitemap.xml | Bing Webmaster Tools | — | ⬜ Pending launch |

---

## §7. Technical SEO Audit Log

Run full technical audit monthly using Screaming Frog or Semrush Site Audit:

| Date | Tool | Pages Crawled | Errors | Warnings | Issues Resolved |
|------|------|--------------|--------|----------|-----------------|
| — | — | — | — | — | — |

### 7.1 Critical Technical SEO Checks

| Check | Target | Status |
|-------|--------|--------|
| All commune pages have canonical | 100% | ⬜ |
| All commune pages have JSON-LD | 100% | ⬜ |
| Zero duplicate `<h1>` per page | 100% | ⬜ |
| All images have `alt` text | 100% | ⬜ |
| No orphaned pages (0 internal links in) | 0 pages | ⬜ |
| Sitemap includes all published pages | 100% | ⬜ |
| robots.txt allows all AI crawlers | Verified | ⬜ |
| hreflang on all commune pages | 100% | ⬜ |
| Internal links obey silo rules | Verified | ⬜ |
| No 404s on internal links | 0 errors | ⬜ |
