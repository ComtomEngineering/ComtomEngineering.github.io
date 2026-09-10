# Task: TP-006 - Accessibility & image loading pass

**Created:** 2026-09-10
**Size:** M

## Review Level: 2 (Plan and Code)

**Assessment:** Site-wide a11y attributes across 8 pages plus a shared inline-CSS change; low novelty (standard WCAG patterns) but high blast radius — one wrong aria-* edit degrades screen-reader output.
**Score:** 4/8 — Blast radius: 2, Pattern novelty: 1, Security: 0, Reversibility: 1

## Canonical Task Folder

```
taskplane-tasks/TP-006-a11y-image-pass/
├── PROMPT.md
├── STATUS.md
├── .reviews/
└── .DONE
```

## Mission

The site lacks basic screen-reader and motion-safety affordances: decorative Material Symbols icons are announced by name ("arrow forward", "star" ×5), star ratings have no text equivalent, there is no skip link, smooth scroll and pulsing animations ignore `prefers-reduced-motion`, and images have no intrinsic size hints or lazy loading. Fix these on all pages without changing any visual design or copy.

## Dependencies

- **None**

## Context to Read First

**Tier 2 (area context):**
- `taskplane-tasks/CONTEXT.md` — Technical Debt lists known a11y items (consent banner focus, html-validate baseline)

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
- `assets/js/cookie-consent.js` (banner focus only)

## Steps

> **Hydration:** STATUS.md tracks outcomes, not individual edits.

### Step 0: Preflight

- [ ] Confirm 8 HTML pages + `assets/js/cookie-consent.js` present
- [ ] Record `file` output dimensions for every `<img>` src (portfolio images, contact avatars, og.png not needed, logo is SVG)
- [ ] Record html-validate baseline (pre-existing inline-style errors on star spans are known)

### Step 1: Screen reader — icons & ratings

- [ ] Add `aria-hidden="true"` to EVERY decorative `.material-symbols-outlined` span across all 8 pages (nav arrow_back, arrow_forward in links, menu, close, stars, lock, schedule, engineering, verified, cloud_done, speed, bolt, neurology, hub, dynamic_form). The close button already has `aria-label` — hide its inner icon too.
- [ ] Wrap each 5-star row in testimonials in a container with `role="img" aria-label="Rated 5 out of 5"` (5 star spans per card, 4 cards on index.html)
- [ ] Verify no non-decorative icon loses its accessible name (button with `aria-label` = fine; plain icon-as-link would not be — verify none exist)

### Step 2: Keyboard & structure

- [ ] Add skip link as first focusable element after `<body>`: `<a class="sr-only focus:not-sr-only ..." href="#main-content">Skip to main content</a>` using an inline utility or extend the per-page `<style>@layer base` block with `.sr-only` styles (Tailwind Play CDN supports `sr-only`; keep it in the base style block so it survives)
- [ ] Add `id="main-content"` to each page's `<main>` element
- [ ] Add `autocomplete="name"` on name inputs and `autocomplete="email"` on email inputs (contact.html form + index.html modal form)

### Step 3: Motion

- [ ] In each page's `<style>@layer base` block, add: `@media (prefers-reduced-motion: reduce){ html{scroll-behavior:auto;} .animate-ping,.animate-pulse{animation:none;} *{transition-duration:0.01ms !important; scroll-behavior:auto !important;} }` (applies to the 2 animated hero dots, footer status pulse, mockup pulse)

### Step 4: Images

- [ ] Add `width`/`height` attributes (real pixel dimensions from Step 0) to every raster `<img>`: portfolio cards (index.html), case-study hero images, testimonial avatars (index.html + case-study pages), and the two case-study page hero images with `max-h-[420px]`
- [ ] Add `loading="lazy"` to below-the-fold images: all portfolio card images, all case-study hero images, testimonial avatars. Do NOT lazy-load header/logo images
- [ ] Verify attributes don't change rendered sizes (fixed `h-10 w-10`, `h-40`, `max-h-[420px] object-cover` classes already pin display size — attributes only prevent CLS)

### Step 5: Consent banner focus

- [ ] In `assets/js/cookie-consent.js`, after `document.body.appendChild(bar)` in `buildBanner()`, focus the Decline button (safe default per WCAG; banner is non-modal)
- [ ] Confirm banner still builds when reduced-motion is set (no JS dependency on motion)

### Step 6: Testing & Verification

- [ ] FULL validation: `npx -y html-validate` on all 8 pages — error count must equal Step 0 baseline
- [ ] `node --check assets/js/cookie-consent.js` passes
- [ ] Grep verification: count of `aria-hidden="true"` on material-symbols spans equals count of `material-symbols-outlined` spans on each page (0 un-hidden icons)
- [ ] Spot-check: one page renders (structure intact), skip link present, `id="main-content"` present on all 8 pages

### Step 7: Documentation & Delivery

- [ ] "Must Update" docs modified
- [ ] "Check If Affected" docs reviewed
- [ ] Discoveries logged in STATUS.md

## Documentation Requirements

**Must Update:**
- `taskplane-tasks/CONTEXT.md` — add Completed entry for TP-006; resolve the "Consent banner focus management" debt item

**Check If Affected:**
- `taskplane-tasks/CONTEXT.md` — Technical Debt (remove resolved items; add any new ones)

## Completion Criteria

- [ ] All steps complete
- [ ] html-validate error count unchanged from baseline
- [ ] Every decorative icon aria-hidden; ratings have text equivalent
- [ ] Skip link + main id on all 8 pages
- [ ] Reduced-motion block present on all 8 pages
- [ ] All raster images have width/height; below-fold images lazy
- [ ] Documentation updated

## Git Commit Convention

Commits happen at **step boundaries** (not after every checkbox). All commits
for this task MUST include the task ID for traceability:

- **Step completion:** `feat(TP-006): complete Step N — description`
- **Bug fixes:** `fix(TP-006): description`
- **Tests:** `test(TP-006): description`
- **Hydration:** `hydrate: TP-006 expand Step N checkboxes`

## Do NOT

- Expand task scope — add tech debt to CONTEXT.md instead
- Change any copy, class names, colors, or layout — attributes and a11y affordances only
- Add `aria-hidden` to icons that carry semantic meaning (star rows get a labeled container instead of raw hiding)
- Touch Tailwind config, build pipeline, or the contact form submission logic
- Commit without the task ID prefix in the commit message

---

## Amendments (Added During Execution)

<!-- Workers add amendments here if issues discovered during execution.
     Format:
     ### Amendment N — YYYY-MM-DD HH:MM
     **Issue:** [what was wrong]
     **Resolution:** [what was changed] -->
