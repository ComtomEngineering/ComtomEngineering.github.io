# R005 — Code Review: Step 2 (Gate GA on all pages)

**Reviewer:** taskplane
**Step:** Step 2: Gate GA on all pages
**Baseline:** `0cb7555dd5644972571194d9f28abfdf7079699b`
**Date:** 2026-09-10

---

## Verdict: APPROVE

No blocking issues found. All 8 pages correctly modified.

---

## Checks

### 1. GA immediate load removed from all 8 pages ✅

`grep -rn "googletagmanager" *.html case-studies/*/index.html` returns **no matches**. The old inline `<script async src="https://www.googletagmanager.com/gtag/js?id=G-C7YDJRDD8X"></script>` + `<script>window.dataLayer=...;gtag('config',...);</script>` pair is gone from every page's `<head>`.

### 2. No residual dataLayer definitions in HTML ✅

`grep -l "dataLayer" *.html case-studies/*/index.html` → no matches. The old inline `window.dataLayer=window.dataLayer||[];function gtag(){...}` is fully stripped. The stub now lives exclusively in `cookie-consent.js` (idempotent, verified in Step 1 review).

### 3. cookie-consent.js included exactly once per page with correct paths ✅

| Page | src path | Count |
|------|----------|-------|
| index.html | `assets/js/cookie-consent.js` | 1 |
| contact.html | `assets/js/cookie-consent.js` | 1 |
| privacy.html | `assets/js/cookie-consent.js` | 1 |
| terms.html | `assets/js/cookie-consent.js` | 1 |
| 404.html | `assets/js/cookie-consent.js` | 1 |
| case-studies/electric/index.html | `../../assets/js/cookie-consent.js` | 1 |
| case-studies/schonfeld/index.html | `../../assets/js/cookie-consent.js` | 1 |
| case-studies/todaytix/index.html | `../../assets/js/cookie-consent.js` | 1 |

Depth-correct: root pages use relative `assets/...`, case-study pages use `../../assets/...` (matching existing `../../assets/images/...` references in those files).

### 4. Consistent script placement ✅

All 8 pages place `<script src="…cookie-consent.js" defer></script>` immediately before `</body></html>`. Per R004 observation #2 decision. Consistent across all pages.

### 5. Surgical diff — no unrelated changes ✅

`git diff --stat` confirms exactly **2 lines changed per page** (head line: GA snippet removed; closing line: script tag added). Total: 16 insertions, 16 deletions across 8 files. No reformatting, no unrelated markup touched.

### 6. Pre-existing gtag call sites preserved and safe ✅

- `index.html:779` — `gtag('event','contact_submit',{intent:...})` inside try/catch.
- `contact.html:34` — `gtag('event','contact_submit')` inside try/catch.

Both fire only on user form submission (always after DOM parse → after `defer` script has executed → `window.gtag` stub exists). The try/catch is belt-and-suspenders. No change needed.

### 7. Commit message ✅

`feat(TP-003): complete Step 2 — gate GA on all 8 pages` — follows the `feat(TP-003):` convention.

### 8. node --check passes ✅

`node --check assets/js/cookie-consent.js` → OK.

---

## Observations (non-blocking)

1. **`defer` on a before-`</body>` script is a no-op.** The HTML spec says `defer` causes scripts to execute after document parsing; a script just before `</body>` already runs at end-of-parse. Behavior is identical with or without `defer`. Harmless; not worth a fix commit.

2. **`privacyHref()` segments check.** `location.pathname.split('/')` for a case-study page like `/case-studies/electric/` yields `['', 'case-studies', 'electric', '']` — 4 segments → `../../privacy.html`. Correct. For root `/index.html` → `['', 'index.html']` — 2 segments → `privacy.html`. Correct. Edge case: if site is served at a path prefix (e.g., `/comtom/index.html`), segments = 3 → would incorrectly produce `../../privacy.html`. Not a real concern for GitHub Pages domain root; noted for awareness only.

3. **No JS-disabled fallback for consent banner.** Documented in STATUS.md and in the script header comment: JS disabled → no banner, no GA, pages render. Acceptable per prompt.

---

## No changes required.

Step 2 is correctly implemented. Ready for Step 3 (testing & verification).
