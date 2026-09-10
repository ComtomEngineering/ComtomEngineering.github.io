# Task: TP-003 - GDPR Cookie Consent Banner (Google Analytics)

**Created:** 2026-09-10
**Size:** M

## Review Level: 2 (Plan and Code)

**Assessment:** Touches every page of the site (8 HTML files) and changes how Google Analytics is loaded — consent must genuinely gate GA tracking, which has privacy/GDPR implications. Pattern is standard, but blast radius is site-wide.
**Score:** 5/8 — Blast radius: 2, Pattern novelty: 1, Security: 1, Reversibility: 1

## Canonical Task Folder

```
taskplane-tasks/TP-003-gdpr-cookie-consent/
├── PROMPT.md   ← This file (immutable above --- divider)
├── STATUS.md   ← Execution state (worker updates this)
├── .reviews/   ← Reviewer output (created by the orchestrator runtime)
└── .DONE       ← Created when complete
```

## Mission

Add a GDPR cookie-consent dialog to the bottom of the screen on every page so users can consent to Google Analytics cookies. Until the user accepts, Google Analytics must NOT be loaded and no analytics cookies may be set. On decline, GA stays off for the session/visitor (persisted). The banner appears on every visit until a choice is made.

## Dependencies

- **None** (runs serially after TP-002 on the same lane due to shared `index.html`)

## Context to Read First

> Only list docs the worker actually needs. Less is better.

**Tier 2 (area context):**
- `taskplane-tasks/CONTEXT.md`

**Tier 3 (load only if needed):**
- `privacy.html` — only if updating the privacy policy reference wording is decided (see Step 5)

## Environment

- **Workspace:** repo root (static site, no build step, no test runner)
- **Services required:** None

## File Scope

> The orchestrator uses this to avoid merge conflicts: tasks with overlapping
> file scope run on the same lane (serial), not in parallel. List the files and
> directories this task will create or modify. Use wildcards for directories.

- `index.html`
- `contact.html`
- `privacy.html`
- `terms.html`
- `404.html`
- `case-studies/electric/index.html`
- `case-studies/schonfeld/index.html`
- `case-studies/todaytix/index.html`
- `assets/js/cookie-consent.js` (new)

## Steps

### Step 0: Preflight

- [ ] All 8 HTML pages listed in File Scope exist
- [ ] Confirm each page currently loads GA immediately via inline snippet in `<head>`: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-C7YDJRDD8X"></script>` + `window.dataLayer...gtag('config','G-C7YDJRDD8X')` (measurement ID is `G-C7YDJRDD8X` on all pages)

### Step 1: Create shared consent script

- [ ] Create `assets/js/cookie-consent.js`:
  - Storage key `comtom_cookie_consent` in `localStorage`, value JSON or simple string: `"accepted"` | `"declined"` (plus optional timestamp)
  - On page load: if no stored choice → show the banner (only then); if `"accepted"` → load GA; if `"declined"` → load nothing, hide banner
  - **Banner**: fixed to the bottom of the viewport, full-width bar (not a centered modal), dark theme matching the site (`bg-[#0F172A]`/`surface-container` colors, blue accents, rounded top or full bar — match existing design language), `z-index` above content and footer, `role="dialog" aria-label="Cookie consent"`, with:
    - Short text: one or two lines explaining analytics cookies (Google Analytics) are used to understand site usage
    - Link to `privacy.html` (correct the relative path on case-study pages: `../privacy.html` vs `privacy.html` on root pages — the script must set the right href or the banner markup must be inserted with the correct path; decide and implement one approach)
    - **Accept** button (primary, blue — matches site CTA style) and **Decline** button (secondary/outline)
    - Buttons store the choice in `localStorage` and dismiss the banner
    - `aria` attributes on buttons; keyboard accessible (Enter/Space work natively on `<button>`)
  - **GA gating (critical)**: the script injects the gtag loader script + `gtag('config','G-C7YDJRDD8X')` ONLY when consent is accepted. Pre-consent `dataLayer` events pushed by page code should remain queued but never flushed (i.e., do not load the gtag.js loader until accept).
  - Inject the banner DOM at end of `<body>` (append before/after existing content, appended element) so the page doesn't need per-page markup.
  - Must not break pages if JS is disabled (pages still render; simply no banner, no GA — acceptable, note in STATUS.md).

**Artifacts:**
- `assets/js/cookie-consent.js` (new)

### Step 2: Gate GA on all pages

For **each** of the 8 HTML pages (index, contact, privacy, terms, 404, case-studies/electric, case-studies/schonfeld, case-studies/todaytix):

- [ ] Remove the **immediate** GA load from `<head>`: drop `<script async src="https://www.googletagmanager.com/gtag/js?id=G-C7YDJRDD8X"></script>` and the inline `gtag('config', ...)` call (keep nothing that auto-fires). The page may keep an empty `window.dataLayer` queue definition if any other inline code references it — verify per page; if no other code references `dataLayer`/`gtag`, remove the inline snippet entirely.
- [ ] Add `<script src="assets/js/cookie-consent.js" defer></script>` in `<head>` (or just before `</body>` — pick one, use it on all pages). **Relative path differs by page depth**: root pages use `assets/js/cookie-consent.js`; case-study pages (one level deep) use `../assets/js/cookie-consent.js`.
- [ ] Repeat for all 8 pages (list each page explicitly in STATUS.md as you go)

**Artifacts:**
- 8 HTML files (modified)

### Step 3: Testing & Verification

> No build/test runner. Verify structurally + with a headless check where possible.

- [ ] `grep -rn "googletagmanager" *.html case-studies/*/index.html` — no page loads gtag directly anymore (only the JS file may reference it)
- [ ] `grep -rn "cookie-consent.js" *.html case-studies/*/index.html` — present exactly once per page, with correct relative path per depth
- [ ] `node --check assets/js/cookie-consent.js` — syntax valid
- [ ] If a headless browser is available (e.g. `npx playwright` — install only if quick): load `file://` index page, assert banner visible with no stored choice, assert clicking Accept stores `comtom_cookie_consent` and GA script appears, assert reload hides banner; if not feasible in reasonable time, do a careful manual code review instead and log the method in STATUS.md
- [ ] Privacy link in banner resolves correctly on a root page AND a case-study page

**Artifacts:**
- None (verification only)

### Step 4: Documentation & Delivery

- [ ] Update `taskplane-tasks/CONTEXT.md` Current State (cookie consent live, GA consent-gated)
- [ ] Check `privacy.html` — if it describes analytics/cookies, verify wording is consistent with consent-gated GA; do NOT rewrite the policy, just note any mismatch as tech debt in CONTEXT.md (policy text is legal copy — don't change without approval)
- [ ] Discoveries logged in STATUS.md

## Documentation Requirements

**Must Update:**
- `taskplane-tasks/CONTEXT.md` — Current State note

**Check If Affected:**
- `privacy.html` — consistency check only, no edits without user approval

## Completion Criteria

- [ ] All steps complete
- [ ] No page loads Google Analytics before consent
- [ ] Banner shows until a choice is made, on all 8 pages, correct link paths
- [ ] Verification checks in Step 3 pass
- [ ] Documentation updated
- [ ] All commits carry the `TP-003` task ID prefix

## Git Commit Convention

Commits happen at **step boundaries** (not after every checkbox). All commits
for this task MUST include the task ID for traceability:

- **Step completion:** `feat(TP-003): complete Step N — description`
- **Bug fixes:** `fix(TP-003): description`
- **Tests:** `test(TP-003): description`
- **Hydration:** `hydrate: TP-003 expand Step N checkboxes`

## Do NOT

- Expand task scope — add tech debt to CONTEXT.md instead
- Modify sections of `index.html` unrelated to the GA snippet / script include (another task owns nav/sections — do not reformat or reflow unrelated markup)
- Change the GA measurement ID (`G-C7YDJRDD8X`)
- Edit legal text in `privacy.html` / `terms.html`
- Commit without the task ID prefix in the commit message

---

## Amendments (Added During Execution)

<!-- Workers add amendments here if issues discovered during execution.
     Format:
     ### Amendment N — YYYY-MM-DD HH:MM
     **Issue:** [what was wrong]
     **Resolution:** [what was changed] -->
