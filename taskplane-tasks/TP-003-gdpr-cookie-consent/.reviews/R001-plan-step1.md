# Review R001 — Plan Review: Step 1 (Create Shared Consent Script)

**Task:** TP-003 — GDPR Cookie Consent Banner (Google Analytics)
**Step:** Step 1: Create shared consent script
**Reviewer:** taskplane task-reviewer
**Date:** 2026-09-10

## Verdict: ✅ APPROVE

The plan is structurally sound and covers all requirements specified in the PROMPT.md for Step 1. The `gtag` stub analysis from Step 0 was correctly carried into the Step 1 plan (global `gtag`/`dataLayer` stub provided by `cookie-consent.js`). GA gating logic (inject loader only on accepted consent) is correctly scoped. Design direction (dark bar, blue accents, Tailwind classes) matches the existing site.

No blocking issues. Four minor suggestions below — none change the plan structure.

---

## Detailed Assessment

### 1. `gtag` / `dataLayer` stub handling — Correct but needs idempotency made explicit

The plan correctly identifies that `index.html` (line 779) and `contact.html` (line 34) call `gtag('event','contact_submit')` inside `try/catch` in their form submit handlers. These calls are inside event handler function bodies, not executed at parse time, so the `defer`-loaded `cookie-consent.js` will have already defined the stub by the time any user can submit a form.

**Suggestion:** The plan should explicitly state that the stub setup uses the idempotent pattern:

```js
window.dataLayer = window.dataLayer || [];
if (typeof window.gtag !== 'function') {
  window.gtag = function() { window.dataLayer.push(arguments); };
}
```

This ensures correctness whether or not the Step 2 worker leaves the inline `dataLayer`/`gtag` definition on pages that keep it (index, contact) vs. removes it entirely (other 6 pages). Without the `typeof` guard, a double definition would overwrite the function — harmless here, but the guard makes intent clear.

### 2. Privacy link path — Decision needed, not "decide and implement"

The plan says: "the script must set the right href or the banner markup must be inserted with the correct path; **decide and implement one approach**."

This should be resolved in the plan, not deferred. Recommended approach — compute from `window.location.pathname` at banner-injection time:

```js
var segments = window.location.pathname.split('/');
// Root page:   /index.html                    → 2 segments → prefix = ''
// Case study:  /case-studies/electric/…       → 4 segments → prefix = '../../'
var prefix = segments.length > 2 ? '../../' : '';
// Use prefix + 'privacy.html' as href
```

This is future-proof if the site adds more nested directories and avoids hardcoding the `/case-studies/` string.

### 3. localStorage edge case — Add try/catch guard

The plan doesn't mention handling `localStorage` being unavailable (private browsing with storage disabled, `localStorage` blocked by an extension, etc.). A `try/catch` around both read and write is cheap and prevents the entire banner from breaking:

```js
var consent = null;
try { consent = localStorage.getItem('comtom_cookie_consent'); } catch (e) {}
```

On write failure: show the banner, let the user click a button, attempt the write — if it fails, the choice just won't persist (banner reappears next visit). This is the correct degraded behavior.

### 4. Storage format — Recommend JSON over bare string

The plan says `"accepted"` | `"declined"` with "optional timestamp." Recommend always storing JSON:

```json
{"consent":"accepted","ts":"2026-09-10T15:30:00Z"}
```

Rationale:
- Makes debugging/audit trivial in DevTools
- Adds timestamp for free (GDPR logs "when did the user consent")
- Extensible if a future task adds cookie categories (analytics vs. essential) without a format migration
- Read cost is one extra `JSON.parse()` — negligible

Read guard: if the stored value is a bare string (e.g., from a prior version), fall back gracefully:

```js
var raw = null;
try { raw = localStorage.getItem('comtom_cookie_consent'); } catch (e) {}
var choice = null;
if (raw) {
  try { choice = JSON.parse(raw).consent; }
  catch (e) { choice = raw; } // backward compat: bare "accepted"/"declined"
}
```

---

## Items Confirmed Correct in the Plan

- **GA gating:** gtag loader script + `gtag('config','G-C7YDJRDD8X')` injected only on `"accepted"`. Pre-consent events pushed to `dataLayer` remain queued, never flushed. Correct.
- **Banner DOM:** Injected at end of `<body>` via JS. No per-page markup needed. Correct.
- **Accessibility:** `role="dialog"`, `aria-label="Cookie consent"`, native `<button>` elements for keyboard support. Correct.
- **Design:** Dark bar (`surface-container` / `#0F172A`), blue accents, Tailwind CDN classes. Matches site. Correct.
- **No-JS fallback:** No banner, no GA, pages render normally. Correct and appropriately scoped.
- **Script loading:** `defer` in `<head>` ensures DOM is available when the script runs. Correct.
- **Measurement ID preserved:** `G-C7YDJRDD8X` — no change. Correct.

---

## Summary

Plan is approved. The four suggestions above are refinements, not structural changes. Worker should address #2 (privacy path) and #4 (JSON storage) during implementation. #1 and #3 are defensive coding — include if natural, don't block on them.
