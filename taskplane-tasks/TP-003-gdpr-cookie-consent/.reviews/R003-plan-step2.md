# Review R003 — Plan Review: Step 2 (Gate GA on All Pages)

**Task:** TP-003 — GDPR Cookie Consent Banner (Google Analytics)
**Step:** Step 2: Gate GA on all pages
**Reviewer:** taskplane task-reviewer
**Date:** 2026-09-10

## Verdict: ❌ REVISE

Plan has one **blocking error**: case-study script path is one `../` short. If executed as written, the consent script will 404 on all 3 case-study pages. Fix before proceeding.

Everything else is sound.

---

## Blocking Issue

### Case-study pages are two levels deep, not one

PROMPT.md (line 90):

> case-study pages (**one level deep**) use `../assets/js/cookie-consent.js`

STATUS.md checkboxes:

> case-studies/electric/index.html — … (depth: `../`)

Actual directory layout:

```
assets/js/cookie-consent.js          ← target
case-studies/
  electric/
    index.html                       ← source (2 levels below root)
  schonfeld/
    index.html
  todaytix/
    index.html
```

Existing asset references in the case-study pages confirm the depth:

```html
<!-- case-studies/electric/index.html -->
<link rel="icon" href="../../assets/images/favicon-32x32.png">
<a href="../../index.html">Back to Home</a>
```

All root-level references from case-study pages use `../../` (two levels up).

**Impact if not fixed:** The `<script>` tag would resolve to `case-studies/assets/js/cookie-consent.js` — a 404. Consequences on all 3 case-study pages:

- No consent banner shown (violates "banner on all 8 pages")
- No `gtag` stub defined (form events on those pages would silently fail in try/catch — no crash, but no analytics queue either)
- GA never loads even after accept (script never runs)

**Fix — correct the path in two places:**

1. PROMPT.md line 90: change `one level deep` → `two levels deep`; change `../assets/js/cookie-consent.js` → `../../assets/js/cookie-consent.js`
2. STATUS.md checkboxes for the 3 case-study pages: change `(depth: ../)` → `(depth: ../../)`

The 5 root pages (index, contact, privacy, terms, 404) are correct as stated: `assets/js/cookie-consent.js`.

---

## Non-Blocking Observations

### 1. Script placement — recommend `<head>`, replacing GA snippet position

PROMPT says "in `<head>` (or just before `</body>` — pick one, use it on all pages)." Either works with `defer`. Placing it in `<head>` at the same location where the GA snippet was removed is the cleanest diff (one line out, one line in, same spot). Recommend the worker pick `<head>` and note the decision in STATUS.md.

### 2. Exact text to remove — both `<script>` tags

The GA snippet on every page is **two adjacent `<script>` tags** on the same line in `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C7YDJRDD8X"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C7YDJRDD8X');</script>
```

Both must go. The plan says to remove the loader script and the inline `gtag('config')` call, but the inline `<script>` also contains the `dataLayer`/`gtag` definition. Since `cookie-consent.js` provides the idempotent stub (`window.dataLayer = window.dataLayer || []` + `typeof window.gtag !== 'function'` guard), removing the entire inline script block on **all 8 pages** is correct and safe.

The plan already accounts for this ("if no other code references `dataLayer`/`gtag`, remove the inline snippet entirely"). The Step 0 notes confirm only `index.html:779` and `contact.html:34` reference `gtag` (inside form handlers, wrapped in try/catch). Those will work against the stub. No page needs to retain the inline block. Good.

### 3. No risk of `gtag` being undefined before `cookie-consent.js` runs

The `defer` script executes after DOM parsing. The form handlers in `index.html` and `contact.html` are inline `<script>` tags in `<body>` — they define functions during parsing, but only **call** `gtag('event', ...)` at event time (user submits form). By then, `cookie-consent.js` (deferred, runs before `DOMContentLoaded`) has already defined the stub. No race condition. The try/catch is a belt-and-suspenders backup, not a required safety net.

### 4. Verification check in Step 3 will catch the path error

The Step 3 grep check:

```
grep -rn "cookie-consent.js" *.html case-studies/*/index.html
```

will show the wrong path if the worker uses `../` instead of `../../`. But the grep doesn't verify the path is **correct**, only that it's **present**. Suggest the worker also manually verify one case-study page by opening it in a browser (or at least confirming `../../assets/js/cookie-consent.js` resolves to an existing file) before marking Step 2 complete.

---

## Requirement Checklist (from PROMPT.md Step 2)

| Requirement | Plan Coverage | Notes |
|---|---|---|
| Remove immediate GA loader script from `<head>` | ✅ | Both `<script>` tags identified; remove from all 8 pages |
| Remove inline `gtag('config')` call | ✅ | Removed as part of the inline script block |
| Keep `dataLayer` if other code references it | ✅ | Verified: only index/contact form handlers; stub from cookie-consent.js suffices |
| Add `<script src="..." defer></script>` | ✅ | Path correct for root pages; **wrong for case-study pages** (see above) |
| Use consistent placement across all 8 pages | ✅ | Plan says pick one, use everywhere |
| Repeat for all 8 pages | ✅ | STATUS.md has one checkbox per page |

---

## Summary

**REVISE.** One fix required before execution: correct the case-study script path from `../assets/js/cookie-consent.js` to `../../assets/js/cookie-consent.js` in both PROMPT.md and STATUS.md. The error stems from miscounting directory depth — `case-studies/<name>/index.html` is two levels below root, not one. Existing asset references in the same files (`../../assets/images/...`) confirm the correct depth.

After the path fix, the plan is complete and ready for execution. No other structural or logical issues found.
