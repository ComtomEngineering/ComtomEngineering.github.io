# TP-002: Homepage Fixes (Nav, Names, Case Studies Section) — Status

**Current Step:** Not Started
**Status:** 🔵 Ready for Execution
**Last Updated:** 2026-09-10
**Review Level:** 1
**Review Counter:** 0
**Iteration:** 0
**Size:** M

> **Hydration:** Checkboxes represent meaningful outcomes, not individual code
> changes. Workers expand steps when runtime discoveries warrant it — aim for
> 2-5 outcome-level items per step, not exhaustive implementation scripts.

---

### Step 0: Preflight
**Status:** ⬜ Not Started

- [ ] `index.html` exists at repo root
- [ ] Four work items confirmed present (person icon, 3 mismatched names, testimonials-in-case-studies layout)

---

### Step 1: Remove user button from top nav
**Status:** ⬜ Not Started

- [ ] Person-icon avatar div removed from fixed header
- [ ] Remaining nav layout intact

---

### Step 2: Fix testimonial names that don't match profile pictures
**Status:** ⬜ Not Started

- [ ] "David K." → "Rohi Bagaria" (name + alt)
- [ ] "Sarah M." → "Nathan Gould" (name + alt)
- [ ] "Marcus Vance" → "Sofia Fernandez" (name + alt)
- [ ] Grep confirms no stale names remain

---

### Step 3: Split Case Studies from customer quotes
**Status:** ⬜ Not Started

- [ ] New `<section id="case-studies">` with 3 brief project cards (Electric AI, Schonfeld, Todaytix) + subpage links + portfolio images
- [ ] Four quote cards moved into their own `<section id="testimonials">`; old zero-height anchor div removed
- [ ] Section order: solutions → products → case-studies → testimonials → how-we-work
- [ ] Nav + mobile menu links resolve to correct sections
- [ ] No duplicate ids / orphaned containers

---

### Step 4: Testing & Verification
**Status:** ⬜ Not Started

- [ ] Tag balance / HTML structure sanity check passes
- [ ] All section ids unique
- [ ] All anchor links resolve to existing ids
- [ ] All referenced image paths exist on disk
- [ ] No stale names: grep for old names returns nothing

---

### Step 5: Documentation & Delivery
**Status:** ⬜ Not Started

- [ ] CONTEXT.md Current State updated
- [ ] Discoveries logged

---

## Reviews

| # | Type | Step | Verdict | File |
|---|------|------|---------|------|

---
