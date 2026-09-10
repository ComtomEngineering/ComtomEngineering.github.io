# Task: TP-004 - Move Testimonials Section Below How We Work

**Created:** 2026-09-10
**Size:** S

## Review Level: 1 (Plan Only)

**Assessment:** Pure section reordering in one static HTML file. No new content, no logic. Low blast radius, trivial reversibility.
**Score:** 2/8 — Blast radius: 1, Pattern novelty: 0, Security: 0, Reversibility: 1

## Canonical Task Folder

```
taskplane-tasks/TP-004-move-testimonials/PROMPT.md   ← This file
```

## Mission

Move the Testimonials section (customer quote cards, `<section id="testimonials">`) in `index.html` to sit AFTER the How We Work section (`<section id="how-we-work">`). Current section order in the page body: solutions → products → case-studies → testimonials → how-we-work. Target order: solutions → products → case-studies → how-we-work → testimonials. All ids, anchors, nav links, and internal content must remain intact.

## Dependencies

- **None**

## Context to Read First

**Tier 2 (area context):**
- `taskplane-tasks/CONTEXT.md`

## Environment

- **Workspace:** repo root (static site, no build step, no test runner)
- **Services required:** None

## File Scope

- `index.html`

## Steps

### Step 0: Preflight

- [ ] `index.html` exists; confirm current section order: `#solutions`, `#products`, `#case-studies`, `#testimonials`, `#how-we-work` (grep the section open tags in order)
- [ ] Confirm the `<section id="testimonials">` element (full `<section>...</section>` including its content wrappers) and the `<section id="how-we-work">` element boundaries

### Step 1: Move the testimonials section

- [ ] Cut the complete testimonials section element (from its opening `<section ... id="testimonials">` through its matching closing `</section>`, including any directly-adjacent wrapper comments/divs that belong to it)
- [ ] Paste it immediately after the closing `</section>` of the how-we-work section, preserving any section-level background classes/spacing so the visual rhythm of the page doesn't break (if the moved section had a different background tint (e.g. `bg-surface-container-lowest/30`), keep that class on the section itself so it still stands out in its new position)
- [ ] Verify final DOM order: `#solutions` → `#products` → `#case-studies` → `#how-we-work` → `#testimonials`
- [ ] Verify no other content (footer, other sections) was disturbed

**Artifacts:**
- `index.html` (modified)

### Step 2: Testing & Verification

> No build/test runner. Structural verification only.

- [ ] `grep -n 'id="solutions"\|id="products"\|id="case-studies"\|id="how-we-work"\|id="testimonials"' index.html` — ids appear exactly once each, in the target order (line numbers increasing)
- [ ] Nav links (`#testimonials`, `#case-studies`, etc. in desktop nav, mobile menu, footer) still point to existing ids
- [ ] Tag balance sanity check (sections opened = closed)
- [ ] No duplicate ids, no orphaned containers

**Artifacts:**
- None (verification only)

### Step 3: Documentation & Delivery

- [ ] Update `taskplane-tasks/CONTEXT.md` Current State (section order changed)
- [ ] Discoveries logged in STATUS.md

## Documentation Requirements

**Must Update:**
- `taskplane-tasks/CONTEXT.md` — Current State note

**Check If Affected:**
- None

## Completion Criteria

- [ ] Testimonials section rendered after How We Work
- [ ] All anchors/nav links resolve
- [ ] Verification checks pass
- [ ] All commits carry the `TP-004` task ID prefix

## Git Commit Convention

- **Step completion:** `feat(TP-004): complete Step N — description`
- **Bug fixes:** `fix(TP-004): description`
- **Hydration:** `hydrate: TP-004 expand Step N checkboxes`

## Do NOT

- Change section content, order of other sections, or any other file
- Add/remove sections — move only
- Commit without the task ID prefix in the commit message

---

## Amendments (Added During Execution)

<!-- Workers add amendments here if issues discovered during execution. -->
