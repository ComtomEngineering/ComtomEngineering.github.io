# Task: TP-007 - SEO metadata fixes

**Created:** 2026-09-10
**Size:** S

## Review Level: 1 (Plan Only)

**Assessment:** Mechanical metadata edits (canonical, titles, og tags, sitemap) across 8 static pages — no JS, no layout risk. Plan review is enough to catch wrong URLs/brands.
**Score:** 3/8 — Blast radius: 2, Pattern novelty: 0, Security: 0, Reversibility: 1

## Canonical Task Folder

```
taskplane-tasks/TP-007-seo-metadata/
├── PROMPT.md
├── STATUS.md
├── .reviews/
└── .DONE
```

## Mission

Case-study pages ship with missing or wrong metadata: no canonical tags, titles read "chonfeld-era" lowercase brand names ("todaytix — Comtom Engineering"), the 404 page is indexable, og tags miss `og:site_name`, and image alt text is generic. Clean up so crawlers get correct, consistent metadata. No visual or copy changes to page content.

## Dependencies

- **None**

## Context to Read First

**Tier 2 (area context):**
- `taskplane-tasks/CONTEXT.md`

**Tier 3 (load only if needed):**
- (none)

## Environment

- **Workspace:** repo root (static site)
- **Services required:** None

## File Scope

- `index.html`
- `contact.html`
- `404.html`
- `privacy.html`
- `terms.html`
- `case-studies/electric/index.html`
- `case-studies/schonfeld/index.html`
- `case-studies/todaytix/index.html`
- `sitemap.xml`

## Steps

> **Hydration:** STATUS.md tracks outcomes, not individual edits.

### Step 0: Preflight

- [ ] All 8 pages + sitemap present
- [ ] Record current `<title>`, canonical, og:* per page (table in STATUS.md)
- [ ] Confirm sitemap URLs all resolve to files on disk (they should after TP-001-era `chonfeld` fix)

### Step 1: Case-study metadata

- [ ] Add `<link rel="canonical" href="https://comtom.engineering/case-studies/<slug>/">` to each case-study page (slugs: `electric`, `schonfeld`, `todaytix`)
- [ ] Rewrite titles with proper brand casing and pattern `«Brand» Case Study — Comtom Engineering`:
  - `Schonfeld Case Study — Comtom Engineering`
  - `Todaytix Case Study — Comtom Engineering`
  - `Electric AI Case Study — Comtom Engineering`
- [ ] Update each page's `og:title` and `og:url` to match (og:url must be the correct `schonfeld/` path)
- [ ] Rewrite `og:description` / `meta name="description"` per page to an outcome statement (keep ≤160 chars, reuse the page's Result copy, e.g. "Serverless ticketing pipeline handled 4x peak traffic with zero degradation.")

### Step 2: Site-wide metadata

- [ ] Add `<meta property="og:site_name" content="Comtom Engineering">` to all 8 pages
- [ ] 404.html: add `<meta name="robots" content="noindex, follow">`
- [ ] Case-study portfolio image alt text: replace "X project" with descriptive text (e.g. `Schonfeld case study — market data risk platform UI`); same for the 3 alt texts on index.html cards
- [ ] Do NOT add `twitter:site` — handle is unverified (Facebook slug `comtomengineeringok` looks like a typo; flag in Discoveries instead)

### Step 3: Sitemap

- [ ] Update all `lastmod` dates to today's date
- [ ] Verify every `<loc>` matches an on-disk path; keep priorities as-is

### Step 4: Testing & Verification

- [ ] `grep -c 'rel="canonical"'` = 1 on all 8 pages with correct href
- [ ] All case-study `og:url` values resolve to existing folders
- [ ] `python3 -c "import xml.dom.minidom;xml.dom.minidom.parse('sitemap.xml')"` passes (well-formed XML)
- [ ] No page title contains a lowercase brand ("todaytix", "electric", "chonfeld")
- [ ] `npx -y html-validate` on all 8 pages — no new errors vs pre-existing baseline (20+ known inline-style errors)

### Step 5: Documentation & Delivery

- [ ] "Must Update" docs modified
- [ ] Discoveries logged in STATUS.md

## Documentation Requirements

**Must Update:**
- `taskplane-tasks/CONTEXT.md` — add Completed entry for TP-007

**Check If Affected:**
- `taskplane-tasks/CONTEXT.md` — Technical Debt (add the unverified `twitter:site` handle / Facebook slug typo as a follow-up if flagged)

## Completion Criteria

- [ ] All steps complete
- [ ] Canonical + titles + og tags correct on all 8 pages
- [ ] 404 noindexed
- [ ] Sitemap well-formed, current, all URLs real
- [ ] Documentation updated

## Git Commit Convention

Commits happen at **step boundaries** (not after every checkbox). All commits
for this task MUST include the task ID for traceability:

- **Step completion:** `feat(TP-007): complete Step N — description`
- **Bug fixes:** `fix(TP-007): description`
- **Tests:** `test(TP-007): description`
- **Hydration:** `hydrate: TP-007 expand Step N checkboxes`

## Do NOT

- Expand task scope — add tech debt to CONTEXT.md instead
- Change visible page copy, H1s, or layout — head metadata + alt text only
- Add structured data (JSON-LD) — out of scope, separate decision
- Commit without the task ID prefix in the commit message

---

## Amendments (Added During Execution)

<!-- Workers add amendments here if issues discovered during execution.
     Format:
     ### Amendment N — YYYY-MM-DD HH:MM
     **Issue:** [what was wrong]
     **Resolution:** [what was changed] -->
