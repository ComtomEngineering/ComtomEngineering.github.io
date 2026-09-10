# TP-002: Homepage Fixes (Nav, Names, Case Studies Section) — Status

**Current Step:** Step 3: Split Case Studies from customer quotes
**Status:** 🟡 In Progress
**Last Updated:** 2026-09-10
**Review Level:** 1
**Review Counter:** 0
**Iteration:** 1
**Size:** M

> **Hydration:** Checkboxes represent meaningful outcomes, not individual code
> changes. Workers expand steps when runtime discoveries warrant it — aim for
> 2-5 outcome-level items per step, not exhaustive implementation scripts.

---

### Step 0: Preflight
**Status:** ✅ Complete

- [x] `index.html` exists at repo root
- [x] Four work items confirmed present (person icon, 3 mismatched names, testimonials-in-case-studies layout)

---

### Step 1: Remove user button from top nav
**Status:** ✅ Complete

- [x] Person-icon avatar div removed from fixed header
- [x] Remaining nav layout intact

---

### Step 2: Fix testimonial names that don't match profile pictures
**Status:** ✅ Complete

- [x] "David K." → "Rohi Bagaria" (name + alt)
- [x] "Sarah M." → "Nathan Gould" (name + alt)
- [x] "Marcus Vance" → "Sofia Fernandez" (name + alt)
- [x] Grep confirms no stale names remain (exit=1, no matches)

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

| 2026-09-10 13:11 | Task started | Runtime V2 lane-runner execution |
| 2026-09-10 13:11 | Step 0 started | Preflight |
| 2026-09-10 13:15 | Steps 0-2 complete | Preflight, person icon removed, names fixed (commit eac5e9b + pending) |