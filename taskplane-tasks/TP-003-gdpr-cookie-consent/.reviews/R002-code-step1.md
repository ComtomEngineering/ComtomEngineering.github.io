# Review R002 — Code Review: Step 1 (Create Shared Consent Script)

**Task:** TP-003 — GDPR Cookie Consent Banner (Google Analytics)
**Step:** Step 1: Create shared consent script
**Reviewer:** taskplane task-reviewer
**Date:** 2026-09-10
**Commit reviewed:** `0cb7555` — `feat(TP-003): complete Step 1 — shared consent script`

## Verdict: ✅ APPROVE

`assets/js/cookie-consent.js` (146 lines) meets all Step 1 requirements. Syntax valid (`node --check` passes). All four R001 plan-review suggestions incorporated correctly. Design tokens, GA ID, storage key, aria attributes, and privacy-link depth logic all verified against the live Tailwind config and existing page markup.

One non-blocking observation noted below. No changes required.

---

## Requirement Checklist (from PROMPT.md Step 1)

| Requirement | Status | Notes |
|---|---|---|
| Storage key `comtom_cookie_consent` in `localStorage` | ✅ | JSON `{consent, ts}` format; bare-string backward-compat handled in `readConsent()` |
| No stored choice → show banner | ✅ | `init()` → `buildBanner()` |
| `"accepted"` → load GA | ✅ | `init()` → `loadGA()` |
| `"declined"` → load nothing, hide banner | ✅ | `init()` → no-op (banner never built) |
| Banner: fixed bottom bar, full-width | ✅ | `fixed bottom-0 left-0 right-0 w-full` |
| Dark theme matching site | ✅ | `bg-surface-container` (#0F172A), blue accents, matches existing CTA styles |
| `z-index` above content and footer | ✅ | `z-[100]` (see observation below) |
| `role="dialog" aria-label="Cookie consent"` | ✅ | Set on the banner `<div>` |
| Short text explaining analytics cookies | ✅ | One line + link |
| Link to `privacy.html` with correct relative path | ✅ | `privacyHref()` computes from `location.pathname` |
| **Accept** button (primary, blue) | ✅ | `bg-blue-600`, matches site CTA style exactly |
| **Decline** button (secondary/outline) | ✅ | `border border-blue-600/40`, transparent bg |
| Buttons store choice in `localStorage` + dismiss banner | ✅ | `writeConsent(choice)` + `bar.remove()` |
| `aria` attributes on buttons | ✅ | `aria-label` on both |
| Keyboard accessible | ✅ | Native `<button>` elements |
| GA loader injected ONLY on accepted consent | ✅ | `loadGA()` called only from `init()` (accepted branch) and button click (accepted branch) |
| Pre-consent `dataLayer` events remain queued | ✅ | `gtag` stub pushes to `dataLayer`; real gtag.js flushes queue on load |
| Inject banner at end of `<body>` | ✅ | `document.body.appendChild(bar)` |
| Must not break pages if JS disabled | ✅ | No inline markup; script is the only source of the banner |

---

## R001 Suggestions Verification

| # | Suggestion | Applied? | How |
|---|---|---|---|
| 1 | Idempotent gtag/dataLayer stub guard | ✅ | `window.dataLayer = window.dataLayer \|\| []` + `typeof window.gtag !== 'function'` guard |
| 2 | Privacy href from `location.pathname` | ✅ | `privacyHref()` — `segments.length > 2 → '../../'` |
| 3 | try/catch around localStorage read+write | ✅ | Both `readConsent()` and `writeConsent()` wrapped |
| 4 | JSON storage with backward-compat | ✅ | Write: `JSON.stringify({consent, ts})`; Read: `JSON.parse` → `parsed.consent`, fallback to bare string |

All four incorporated. Good.

---

## Design Token Verification

Confirmed all Tailwind classes used in `cookie-consent.js` exist in the site's `tailwind.config` (inline `<script id="tailwind-config">`):

- Colors: `surface-container` (#0F172A), `surface-container-highest` (#1E293B), `on-surface` (#F1F5F9), `blue-600`/`blue-500` (default palette) — ✅
- Spacing: `space-md` (1rem), `space-sm` (0.75rem), `space-xs` (0.5rem) — ✅
- Fonts: `body-sm` (13px Inter), `label-md` (14px Inter 600) — ✅
- The Accept button classes (`bg-blue-600 hover:bg-blue-500 text-white font-label-md text-label-md px-space-md py-space-xs rounded-lg font-semibold shadow-[0_0_25px...]`) are an exact match to the existing "Get a Custom Quote" CTA on the same page. Consistent.

---

## Privacy Link Path Verification

| Page | `location.pathname` | `split('/')` length | Computed href | Correct? |
|---|---|---|---|---|
| `index.html` | `/index.html` | 2 | `privacy.html` | ✅ |
| `contact.html` | `/contact.html` | 2 | `privacy.html` | ✅ |
| `404.html` | `/404.html` | 2 | `privacy.html` | ✅ |
| `case-studies/electric/index.html` | `/case-studies/electric/index.html` | 4 | `../../privacy.html` | ✅ |
| `case-studies/schonfeld/index.html` | `/case-studies/schonfeld/index.html` | 4 | `../../privacy.html` | ✅ |
| `case-studies/todaytix/index.html` | `/case-studies/todaytix/index.html` | 4 | `../../privacy.html` | ✅ |

Future-proof: any URL with more than 2 path segments gets `../../`. Correct for all current and foreseeable nesting.

---

## GA Gating Logic Verification

Flow for a **first-time visitor** (no stored consent):

1. `cookie-consent.js` loads (via `defer` in Step 2).
2. `window.dataLayer = []` and stub `window.gtag()` defined. No GA script loaded.
3. Banner appears. Page code (e.g. `index.html:779` contact form) calls `gtag('event','contact_submit')` → stub pushes to `dataLayer` array. Nothing sent.
4. User clicks **Accept** → `writeConsent('accepted')` → `bar.remove()` → `loadGA()`.
5. `loadGA()` injects `<script async src="https://www.googletagmanager.com/gtag/js?id=G-C7YDJRDD8X">`.
6. `onload` fires → `window.gtag('js', new Date())` + `window.gtag('config', GA_ID)`.
7. Real `gtag.js` has replaced the stub `window.gtag` and processes the `dataLayer` queue, flushing any pre-accept events.

Flow for a **returning accepted visitor**:

1. Script loads, `readConsent()` → `"accepted"` → `loadGA()` directly. No banner. Correct.

Flow for a **returning declined visitor**:

1. `readConsent()` → `"declined"` → no GA, no banner. Correct.

**No path leads to GA loading without explicit user acceptance.** ✅

---

## Observations (non-blocking)

### 1. `z-[100]` collision with contact modal (cosmetic)

The contact modal in `index.html:741` uses `z-[100]`, same as the cookie banner. Since the banner is appended to the end of `<body>` (later in DOM order than the modal's static markup), the banner paints **on top** of the modal backdrop at the viewport bottom when both are visible simultaneously.

This is visually harmless (banner is a thin bar at the bottom; modal is centered), but if a future change adds a taller modal footer, the overlap could look sloppy. Consider `z-[90]` for the banner (still above header `z-50`, below modal `z-[100]`) to ensure the modal always takes visual priority.

**Not a blocker.** No action required for Step 1. Flag for Step 3 testing (open contact modal on index with banner visible).

### 2. No `onerror` handler on GA script injection

`loadGA()` creates the gtag script element but has no `s.onerror` callback. If the googletagmanager.com CDN is unreachable, GA silently fails to load. The user clicked Accept, the banner dismissed, but no tracking occurs. This is acceptable for a static site (the page still works, no data is leaked), but an `onerror` console warning would aid debugging:

```js
s.onerror = function () { console.warn('GA loader failed to load'); };
```

**Not a blocker.** Optional hardening.

### 3. No focus management on banner appearance

When the banner appears, focus is not moved to it. For a non-modal bottom bar that doesn't block page interaction, this is a reasonable design choice — forcing focus to a consent bar on every page load would be jarring. The `role="dialog"` is used for semantic labeling, not modal behavior.

If strict WCAG 2.1 AA is required for the consent interaction, the first button (Decline — the safe default) should receive focus on banner appearance. **Not a blocker** for this task scope; note as potential follow-up if accessibility audit is planned.

---

## Code Quality Notes

- IIFE with `'use strict'` — no global leaks. ✅
- `var` used throughout — consistent with the rest of the site's inline JS style (e.g. `index.html` form handler). Appropriate for broad browser compat on a static site.
- No external dependencies beyond the GA CDN. ✅
- 146 lines, well-commented, single responsibility. ✅
- `bar.remove()` (modern API) — fine, supported in all browsers that support Tailwind CDN JIT.

---

## Summary

**APPROVE.** All Step 1 requirements met. All R001 suggestions applied. Design matches existing site tokens. GA gating logic is correct — no path to GA load without consent. Privacy link path computation is correct for all 8 pages. Code is clean and appropriately scoped.

The three observations above are non-blocking and do not require rework. The `z-[100]` overlap with the contact modal is worth verifying visually in Step 3 testing.
