# Task: TP-002 - Homepage Fixes (Nav, Names, Case Studies Section)

**Created:** 2026-09-10
**Size:** M

## Review Level: 1 (Plan Only)

**Assessment:** Single-page content/structure changes in one static HTML file. Moderate pattern novelty (restructuring sections) but no backend, no security surface.
**Score:** 3/8 — Blast radius: 1, Pattern novelty: 1, Security: 0, Reversibility: 1

## Canonical Task Folder

```
taskplane-tasks/TP-002-homepage-fixes/
├── PROMPT.md   ← This file (immutable above --- divider)
├── STATUS.md   ← Execution state (worker updates this)
├── .reviews/   ← Reviewer output (created by the orchestrator runtime)
└── .DONE       ← Created when complete
```

## Mission

Fix four issues on the homepage (`index.html`): (1) remove the unused "user button" (person-icon avatar) from the top nav; (2) correct three testimonial names that don't match their profile pictures; (3) restructure the current `#case-studies` section — which actually contains the customer quotes — into TWO separate sections: a genuine Case Studies collection of very brief project cards (sourced from the case-study subpages) and a Customer Quotes/Testimonials section, keeping the `#case-studies` anchor on the new case studies section so the existing nav link keeps working.

## Dependencies

- **None**

## Context to Read First

> Only list docs the worker actually needs. Less is better.

**Tier 2 (area context):**
- `taskplane-tasks/CONTEXT.md`

**Tier 3 (load only if needed):**
- `case-studies/electric/index.html` — source data for Electric AI card
- `case-studies/schonfeld/index.html` — source data for Schonfeld card
- `case-studies/todaytix/index.html` — source data for Todaytix card

## Environment

- **Workspace:** repo root (static site, no build step, no test runner)
- **Services required:** None

## File Scope

> The orchestrator uses this to avoid merge conflicts: tasks with overlapping
> file scope run on the same lane (serial), not in parallel. List the files and
> directories this task will create or modify. Use wildcards for directories.

- `index.html`

## Steps

### Step 0: Preflight

- [ ] `index.html` exists at repo root
- [ ] Confirm the four work items below are present as described (section ids, person icon, names)

### Step 1: Remove user button from top nav

- [ ] In the fixed `<header>` top nav, remove the unused person-icon avatar element: the `<div class="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 ...">` containing `<span class="material-symbols-outlined text-blue-300 text-[18px]">person</span>` (sits after the "Get a Custom Quote" button)
- [ ] Verify remaining nav layout intact (logo, nav links, mobile menu button, quote CTA)

**Artifacts:**
- `index.html` (modified)

### Step 2: Fix testimonial names that don't match profile pictures

The displayed name, `<img alt>` and role/company must match the actual person in the photo. Correct mapping (verified against the live site):

| Image file | Correct name | Correct role line (keep existing role text, only fix name where mismatched) |
|---|---|---|
| `assets/images/contact/russelbaker.jpeg` | Russell Baker | already correct — leave as is |
| `assets/images/contact/rohibagaria.jpeg` | **Rohi Bagaria** | VP of Engineering, Todaytix |
| `assets/images/contact/nathangould.jpeg` | **Nathan Gould** | Chief Technology Officer, Electric AI |
| `assets/images/contact/sofiafernandez.jpeg` | **Sofia Fernandez** | VP Operations, QM Equipment |

- [ ] Rename "David K." → "Rohi Bagaria" (display name div AND img alt for `rohibagaria.jpeg`)
- [ ] Rename "Sarah M." → "Nathan Gould" (display name div AND img alt for `nathangould.jpeg`)
- [ ] Rename "Marcus Vance" → "Sofia Fernandez" (display name div AND img alt for `sofiafernandez.jpeg`)
- [ ] Grep index.html to confirm no other stale references ("David K.", "Sarah M.", "Marcus Vance" must not remain)

**Artifacts:**
- `index.html` (modified)

### Step 3: Split Case Studies from customer quotes

Current state: a zero-height anchor `<div id="testimonials" class="h-0"></div>` immediately precedes `<section ... id="case-studies">`, and that section contains the four customer quote cards (the testimonials). The top-nav "Case Studies" link points to `#case-studies`.

- [ ] Create a real `<section id="case-studies">` — "Case Studies" — containing a collection of **very brief project cards**, one per case study, each with: project/company name, one short headline line (taken from the subpage `<h1>`), one sentence of context, a "Read Case Study →" link to the subpage, using the portfolio images in `assets/images/portfolio/`. Use existing site design language (Tailwind classes, same card style family as other sections, dark theme).
  - **Electric AI** (`case-studies/electric/`): "ERP + mobile field operations, deployment time halved" — `assets/images/portfolio/electric.jpg`
  - **Schonfeld** (`case-studies/schonfeld/`): "Market data risk analysis platform for an institutional fund" — `assets/images/portfolio/schonfeld.jpg`
  - **Todaytix** (`case-studies/todaytix/`): "Elastic serverless ticketing pipeline under 4x peak load" — `assets/images/portfolio/todaytix.jpg`
- [ ] Move the four customer quote cards into their own `<section id="testimonials">` ("Customer Quotes" / "Testimonials" heading matching the nav "Testimonials" link), keeping the names fixed in Step 2. Remove the old zero-height `id="testimonials"` anchor div (the real section takes its place).
- [ ] Section order and anchors: `#solutions` → `#products` → `#case-studies` (new brief project cards) → `#testimonials` (quotes) → `#how-we-work`. Both `#case-studies` and `#testimonials` anchors must resolve to real, non-empty sections.
- [ ] Verify: top-nav links "Case Studies" (`#case-studies`) and "Testimonials" (`#testimonials`) both scroll to the correct sections; mobile menu links likewise
- [ ] Verify no duplicate section ids, no orphaned classes/containers from the restructure

**Artifacts:**
- `index.html` (modified)

### Step 4: Testing & Verification

> No build step or test runner exists for this static site. Verification is structural + manual.

- [ ] HTML structure sanity: each `<section>`/`<div>` opened is closed (e.g. `python3 -c "import html.parser,sys; ..."` or `npx html-validate` if available, else careful manual/`grep` check of tag balance)
- [ ] `grep -n 'id="' index.html` — all section ids unique
- [ ] `grep -n '#case-studies\|#testimonials' index.html` — nav, mobile menu, and footer links point to existing anchors
- [ ] All image `src` paths referenced exist on disk (`assets/images/portfolio/*.jpg`, `assets/images/contact/*.jpeg`)
- [ ] Open `index.html` locally (or render check) — no visible breakage in nav, case studies cards, quotes
- [ ] No stale names remain: `grep -E 'David K\.|Sarah M\.|Marcus Vance' index.html` returns nothing

**Artifacts:**
- None (verification only)

### Step 5: Documentation & Delivery

- [ ] Update `taskplane-tasks/CONTEXT.md` "Current State" with a note that homepage case-studies/testimonials sections were split
- [ ] Discoveries logged in STATUS.md

## Documentation Requirements

**Must Update:**
- `taskplane-tasks/CONTEXT.md` — Current State note (section restructure done)

**Check If Affected:**
- None

## Completion Criteria

- [ ] All steps complete
- [ ] Verification checks in Step 4 all pass
- [ ] Documentation updated
- [ ] All commits carry the `TP-002` task ID prefix

## Git Commit Convention

Commits happen at **step boundaries** (not after every checkbox). All commits
for this task MUST include the task ID for traceability:

- **Step completion:** `feat(TP-002): complete Step N — description`
- **Bug fixes:** `fix(TP-002): description`
- **Tests:** `test(TP-002): description`
- **Hydration:** `hydrate: TP-002 expand Step N checkboxes`

## Do NOT

- Expand task scope — add tech debt to CONTEXT.md instead
- Modify any other HTML page (contact/privacy/terms/404/case-study subpages)
- Change the GA/analytics scripts or cookie behavior (separate task)
- Modify assets/images files (use existing images only)
- Commit without the task ID prefix in the commit message

---

## Amendments (Added During Execution)

<!-- Workers add amendments here if issues discovered during execution.
     Format:
     ### Amendment N — YYYY-MM-DD HH:MM
     **Issue:** [what was wrong]
     **Resolution:** [what was changed] -->
