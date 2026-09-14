# Skill: SEO Pre-Launch Audit & Crawler
# Quality Assurance Checklist for Programmatic SEO Deployments
# Project: Chauffagiste-Belga

---

## Purpose

Automate verification of technical SEO constraints before pushing to production or generating production sitemaps. Prevents indexing of incomplete pages, title truncations, broken internal links, or missing Schema markup.

---

## Core Audit Gates

| Check | Requirement | Fail Condition |
|-------|-------------|----------------|
| **Single H1** | Exactly 1 `<h1>` per page | 0 or > 1 `<h1>` elements |
| **Title Tag** | 50 – 60 characters with primary keyword | < 40 or > 65 characters |
| **Meta Description**| 145 – 155 characters with CTA & phone | < 120 or > 160 characters |
| **Canonical URL** | Explicit self-referencing canonical | Missing, relative, or HTTP |
| **Schema JSON-LD** | Valid `HVACBusiness` & `BreadcrumbList` | Syntax error or missing `@id` |
| **Internal Links** | Max crawl depth ≤ 2 hops; 0 404s | Dead links or orphan pages |

---

## Automated Verification Script

```typescript
// scripts/audit-seo.ts
import { getAllActiveCommuneSlugs, getCommuneBySlug } from '@/lib/supabase/communes'

interface AuditResult {
  slug: string
  passed: boolean
  errors: string[]
  warnings: string[]
}

export async function runSeoAudit(): Promise<{ total: number; passed: number; failed: number }> {
  const slugs = await getAllActiveCommuneSlugs()
  console.log(`🔍 Auditing ${slugs.length} pSEO communes...`)

  let passed = 0
  let failed = 0

  for (const slug of slugs) {
    const commune = await getCommuneBySlug(slug)
    const errors: string[] = []
    const warnings: string[] = []

    if (!commune) {
      errors.push(`Could not retrieve commune for slug: ${slug}`)
      failed++
      continue
    }

    // 1. Slug format validation
    if (!/^[a-z0-9-]+$/.test(commune.slug_fr)) {
      errors.push(`Invalid slug characters: ${commune.slug_fr}`)
    }

    // 2. Postal code validation
    if (!commune.postal_codes || commune.postal_codes.length === 0) {
      errors.push(`Missing postal codes for ${commune.name_fr}`)
    }

    // 3. Geo coordinates
    if (!commune.latitude || !commune.longitude) {
      errors.push(`Missing coordinates for ${commune.name_fr}`)
    }

    if (errors.length > 0) {
      console.error(`❌ [FAIL] ${slug}:`, errors)
      failed++
    } else {
      passed++
    }
  }

  console.log(`✅ Audit Completed: ${passed} passed, ${failed} failed.`)
  return { total: slugs.length, passed, failed }
}
```
