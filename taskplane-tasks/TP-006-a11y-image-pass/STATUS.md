# TP-006: Accessibility & image pass — Status

**Current Step:** Not Started
**Status:** 🔵 Ready for Execution
**Last Updated:** 2026-09-10
**Review Level:** 2
**Review Counter:** 0
**Iteration:** 0
**Size:** M

> **Hydration:** Checkboxes represent meaningful outcomes, not individual edits.

---

### Step 0: Preflight
**Status:** ⬜ Not Started

- [ ] Files present
- [ ] Image dimensions recorded (`file` output per src)
- [ ] html-validate baseline recorded

---

### Step 1: Screen reader — icons & ratings
**Status:** ⬜ Not Started

- [ ] `aria-hidden="true"` on all decorative Material Symbols spans (8 pages)
- [ ] Star rows wrapped in `role="img" aria-label="Rated 5 out of 5"`
- [ ] No semantic icon left without accessible name

**Artifacts:** all 8 HTML files (modified)

---

### Step 2: Keyboard & structure
**Status:** ⬜ Not Started

- [ ] Skip link + `id="main-content"` on all 8 pages
- [ ] `autocomplete` on name/email inputs (contact.html + index modal)

**Artifacts:** all 8 HTML files (modified)

---

### Step 3: Motion
**Status:** ⬜ Not Started

- [ ] `prefers-reduced-motion` block added to per-page base style (8 pages)

**Artifacts:** all 8 HTML files (modified)

---

### Step 4: Images
**Status:** ⬜ Not Started

- [ ] `width`/`height` on all raster images
- [ ] `loading="lazy"` on below-fold images (not header/logo)
- [ ] Display sizes unchanged

**Artifacts:** all 8 HTML files (modified)

---

### Step 5: Consent banner focus
**Status:** ⬜ Not Started

- [ ] Decline button focused when banner appears
- [ ] Banner behavior unchanged otherwise

**Artifacts:** `assets/js/cookie-consent.js` (modified)

---

### Step 6: Testing & Verification
**Status:** ⬜ Not Started

- [ ] html-validate count = baseline (all 8 pages)
- [ ] `node --check` cookie-consent.js passes
- [ ] Icon aria-hidden count check passes per page
- [ ] Skip link + main id present on all 8 pages

---

### Step 7: Documentation & Delivery
**Status:** ⬜ Not Started

- [ ] "Must Update" docs modified
- [ ] "Check If Affected" docs reviewed
- [ ] Discoveries logged

---

## Reviews

| # | Type | Step | Verdict | File |
|---|------|------|---------|------|

---

## Discoveries

| Discovery | Disposition | Location |
|-----------|-------------|----------|

---

## Execution Log

| Timestamp | Action | Outcome |
|-----------|--------|---------|
| 2026-09-10 | Task staged | PROMPT.md and STATUS.md created |

---

## Blockers

*None*

---

## Notes

*Reserved for execution notes*
