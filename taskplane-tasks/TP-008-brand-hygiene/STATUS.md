# TP-008: Brand hygiene — Status

**Current Step:** Not Started
**Status:** 🔵 Ready for Execution
**Last Updated:** 2026-09-10
**Review Level:** 1
**Review Counter:** 0
**Iteration:** 0
**Size:** S

> **Hydration:** Checkboxes represent meaningful outcomes, not individual edits.

---

### Step 0: Preflight
**Status:** ⬜ Not Started

- [ ] Inkscape/sodipodi inventory recorded
- [ ] All `sasscandy-logo.svg` references listed
- [ ] Inlined SVG in index.html located
- [ ] `data-open-contact` inventory (handler only on index.html)

---

### Step 1: Clean & rename logo
**Status:** ⬜ Not Started

- [ ] SVG scrubbed (no inkscape/sodipodi), visual output identical
- [ ] `git mv` → `comtom-logo.svg`
- [ ] All references updated, depth-correct
- [ ] Inlined index.html SVG replaced with `<img>` to renamed file
- [ ] `sasscandy` / `Proyectos` / `inkscape` greps clean

**Artifacts:** `assets/images/comtom-logo.svg` (renamed+modified), 8 HTML files (modified)

---

### Step 2: Dynamic footer year
**Status:** ⬜ Not Started

- [ ] `© <span data-year>2026</span>` on all footers
- [ ] Year script before `</body>` on each page
- [ ] No-JS fallback renders 2026

**Artifacts:** footer-bearing pages (modified)

---

### Step 3: Dead attributes & self-links
**Status:** ⬜ Not Started

- [ ] `data-open-contact`/`data-contact-intent` removed everywhere except index.html
- [ ] contact.html footer CTAs → `#contact-form-card` anchor (id added to form card)
- [ ] index.html modal CTAs still wired

**Artifacts:** contact.html, case studies, privacy, terms (modified)

---

### Step 4: Testing & Verification
**Status:** ⬜ Not Started

- [ ] sasscandy/inkscape greps clean
- [ ] `data-open-contact` only on index.html
- [ ] Logo srcs resolve on disk per depth
- [ ] html-validate: no new errors vs baseline
- [ ] Year script `node --check` clean

---

### Step 5: Documentation & Delivery
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
