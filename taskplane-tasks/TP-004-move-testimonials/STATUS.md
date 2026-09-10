# TP-004: Move Testimonials Section Below How We Work — Status

**Current Step:** Step 0: Preflight
**Status:** 🟡 In Progress
**Last Updated:** 2026-09-10
**Review Level:** 1
**Review Counter:** 0
**Iteration:** 1
**Size:** S

> **Hydration:** Checkboxes represent meaningful outcomes, not individual code
> changes. Workers expand steps when runtime discoveries warrant it.

---

### Step 0: Preflight
**Status:** 🟨 In Progress

- [x] `index.html` exists; current order confirmed: solutions → products → case-studies → testimonials → how-we-work
- [x] Testimonials + how-we-work section boundaries located

---

### Step 1: Move the testimonials section
**Status:** 🟨 In Progress

- [x] Full `<section id="testimonials">` element moved to directly after `#how-we-work` closing tag (incl. its `<!-- Section 4: Customer Quotes -->` comment line)
- [x] Section-level background/spacing classes preserved (section tag classes untouched: `py-space-3xl relative`)
- [x] Final DOM order: solutions(123) → products(208) → case-studies(433) → how-we-work(483) → testimonials(570)
- [x] No other content disturbed (line count 775 unchanged; all tag pairs balanced; git diff = pure block move)

---

### Step 2: Testing & Verification
**Status:** ⬜ Not Started

- [ ] 5 section ids appear once each, in target order (line numbers increasing)
- [ ] Nav/mobile/footer links resolve to existing ids
- [ ] Tag balance OK (sections opened = closed)
- [ ] No duplicate ids / orphaned containers

---

### Step 3: Documentation & Delivery
**Status:** ⬜ Not Started

- [ ] CONTEXT.md Current State updated
- [ ] Discoveries logged

---

## Reviews

| # | Type | Step | Verdict | File |
|---|------|------|---------|------|

---

| 2026-09-10 14:16 | Task started | Runtime V2 lane-runner execution |
| 2026-09-10 14:16 | Step 0 started | Preflight |