# Task: TP-008 - Brand hygiene: logo cleanup, dynamic year, dead attributes

**Created:** 2026-09-10
**Size:** S

## Review Level: 1 (Plan Only)

**Assessment:** Small mechanical hygiene: SVG metadata scrub + file rename with reference updates, dynamic footer year, dead `data-open-contact` attributes. No behavior or layout risk.
**Score:** 3/8 — Blast radius: 2 (all pages reference the logo), Pattern novelty: 0, Security: 0, Reversibility: 1

## Canonical Task Folder

```
taskplane-tasks/TP-008-brand-hygiene/
├── PROMPT.md
├── STATUS.md
├── .reviews/
└── .DONE
```

## Mission

Three hygiene problems: (1) `assets/images/sasscandy-logo.svg` carries an old brand name in the filename AND Inkscape metadata leaking a local machine path (`/home/comtom/Proyectos/TechSupport/...`) to every visitor — the same SVG is also inlined in index.html's final CTA; (2) footer copyright year is hardcoded `© 2026` on every page; (3) `data-open-contact` attributes exist on pages with no modal script (contact.html, case studies, privacy, terms) — inert, and on contact.html "Get a Custom Quote" navigates to the page itself. Fix all three.

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

- `assets/images/sasscandy-logo.svg` (rename → `assets/images/comtom-logo.svg`)
- `index.html`
- `contact.html`
- `404.html`
- `privacy.html`
- `terms.html`
- `case-studies/electric/index.html`
- `case-studies/schonfeld/index.html`
- `case-studies/todaytix/index.html`

## Steps

> **Hydration:** STATUS.md tracks outcomes, not individual edits.

### Step 0: Preflight

- [ ] Open `assets/images/sasscandy-logo.svg`; record all `inkscape:*`, `sodipodi:*` namespaces/attributes and `export-filename` values
- [ ] List every reference to `sasscandy-logo.svg` (expect: 8 pages, 1 each, correct relative depth per page)
- [ ] Locate the inlined SVG copy in index.html (final CTA section, has Inkscape transform matrix + export metadata)
- [ ] List every `data-open-contact` occurrence and which pages have a modal handler (only `index.html` does)

### Step 1: Clean & rename logo

- [ ] Scrub the SVG: remove `inkscape:*` and `sodipodi:*` namespaces, attributes, and `xmlns:inkscape`/`xmlns:sodipodi` declarations; keep rendering output identical (paths, transforms, fill)
- [ ] `git mv assets/images/sasscandy-logo.svg assets/images/comtom-logo.svg`
- [ ] Update every reference found in Step 0 (depth-correct: `assets/images/comtom-logo.svg` at root, `../../assets/images/comtom-logo.svg` on case studies; 404.html has no logo — verify rather than assume)
- [ ] Replace the INLINED SVG in index.html's final CTA with `<img src="assets/images/comtom-logo.svg" alt="" width="64" height="64" class="h-14 w-auto">` (single source of truth; decorative — alt empty, wrapper span keeps size). Keep the surrounding layout divs.
- [ ] Verify: `grep -r sasscandy .` returns nothing outside `taskplane-tasks/` and `.git`; `grep -r 'Proyectos\|inkscape' assets/ *.html case-studies/*/index.html` returns nothing

### Step 2: Dynamic footer year

- [ ] On all pages with a footer (index, contact, 404 if it has one, privacy, terms, 3 case studies): change `© 2026` to `© <span data-year>2026</span>`
- [ ] Add before `</body>` (with the existing defer scripts): `<script>document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear();});</script>` — static `2026` text stays as no-JS fallback
- [ ] Verify the span renders the current year and no page shows "undefined" (no-JS fallback = literal 2026 in markup)

### Step 3: Dead attributes & self-links

- [ ] Remove `data-open-contact` / `data-contact-intent` attributes from ALL pages EXCEPT index.html (the only page with the modal handler)
- [ ] On contact.html footer: "Get a Custom Quote" and "Schedule a Discovery Call" links point at `contact.html` (self). Change both to `href="#contact-form-card"` and add that id to the form's card container div (the `bg-surface-container/60 ... rounded-xl` wrapper holding `#contact-form`) so the link scrolls to the form
- [ ] On case-study / privacy / terms footers: keep `href` targets as-is (they're valid page links), only strip the dead attributes
- [ ] Verify index.html still opens the modal from header, mobile menu, hero, final CTA, and footer CTAs (attributes intact there)

### Step 4: Testing & Verification

- [ ] `grep -r sasscandy --include='*.html' --include='*.svg' --include='*.xml' .` → nothing outside taskplane/.pi
- [ ] `grep -rn 'data-open-contact' *.html case-studies/*/index.html` → only index.html matches
- [ ] All pages: footer year markup correct; footer logo src exists on disk at the given relative path
- [ ] `npx -y html-validate` on all 8 pages — no new errors vs pre-existing baseline (20+ known inline-style errors)
- [ ] Node check on any touched inline scripts: extract and `node --check` (the year script)

### Step 5: Documentation & Delivery

- [ ] "Must Update" docs modified
- [ ] Discoveries logged in STATUS.md

## Documentation Requirements

**Must Update:**
- `taskplane-tasks/CONTEXT.md` — add Completed entry for TP-008 (logo renamed to comtom-logo.svg, inline SVG deduped, dynamic year, dead attributes removed)

**Check If Affected:**
- `taskplane-tasks/CONTEXT.md` — Technical Debt: confirm the honeypot item exists (client honeypot requires the Vercel serverless repo for server-side drop — flag there if missing)

## Completion Criteria

- [ ] All steps complete
- [ ] Zero Inkscape/metadata leaks, zero `sasscandy` references in site output
- [ ] Dynamic year on all footers with no-JS fallback
- [ ] `data-open-contact` only where a handler exists
- [ ] html-validate: no new errors
- [ ] Documentation updated

## Git Commit Convention

Commits happen at **step boundaries** (not after every checkbox). All commits
for this task MUST include the task ID for traceability:

- **Step completion:** `feat(TP-008): complete Step N — description`
- **Bug fixes:** `fix(TP-008): description`
- **Tests:** `test(TP-008): description`
- **Hydration:** `hydrate: TP-008 expand Step N checkboxes`

## Do NOT

- Expand task scope — add tech debt to CONTEXT.md instead
- Redesign or recolor the logo — scrub metadata only, keep visual output identical
- Add form honeypot fields — requires the serverless endpoint repo (separate deploy), not this repo
- Change modal behavior in index.html
- Commit without the task ID prefix in the commit message

---

## Amendments (Added During Execution)

<!-- Workers add amendments here if issues discovered during execution.
     Format:
     ### Amendment N — YYYY-MM-DD HH:MM
     **Issue:** [what was wrong]
     **Resolution:** [what was changed] -->
