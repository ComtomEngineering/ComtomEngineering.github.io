# TP-008: Brand hygiene — Status

**Current Step:** Complete
**Status:** 🟢 Done
**Last Updated:** 2026-09-11
**Review Level:** 1
**Review Counter:** 0
**Iteration:** 0
**Size:** S

> **Hydration:** Checkboxes represent meaningful outcomes, not individual edits.

---

### Step 0: Preflight
**Status:** ✅ Complete

- [x] Inkscape/sodipodi inventory recorded
- [x] All `sasscandy-logo.svg` references listed
- [x] Inlined SVG in index.html located
- [x] `data-open-contact` inventory (handler only on index.html)

---

### Step 1: Clean & rename logo
**Status:** ✅ Complete

- [x] SVG scrubbed (no inkscape/sodipodi), visual output identical
- [x] `git mv` → `comtom-logo.svg`
- [x] All references updated, depth-correct
- [x] Inlined index.html SVG replaced with `<img>` to renamed file
- [x] `sasscandy` / `Proyectos` / `inkscape` greps clean

**Artifacts:** `assets/images/comtom-logo.svg` (renamed+modified), 8 HTML files (modified)

---

### Step 2: Dynamic footer year
**Status:** ✅ Complete

- [x] `© <span data-year>2026</span>` on all footers
- [x] Year script before `</body>` on each page
- [x] No-JS fallback renders 2026

**Artifacts:** footer-bearing pages (modified)

---

### Step 3: Dead attributes & self-links
**Status:** ✅ Complete

- [x] `data-open-contact`/`data-contact-intent` removed everywhere except index.html
- [x] contact.html footer CTAs → `#contact-form-card` anchor (id added to form card)
- [x] index.html modal CTAs still wired

**Artifacts:** contact.html, case studies, privacy, terms (modified)

---

### Step 4: Testing & Verification
**Status:** ✅ Complete

- [x] sasscandy/inkscape greps clean
- [x] `data-open-contact` only on index.html
- [x] Logo srcs resolve on disk per depth
- [x] html-validate: no new errors vs baseline
- [x] Year script `node --check` clean

---

### Step 5: Documentation & Delivery
**Status:** ✅ Complete

- [x] "Must Update" docs modified
- [x] "Check If Affected" docs reviewed
- [x] Discoveries logged

---

## Reviews

| # | Type | Step | Verdict | File |
|---|------|------|---------|------|

---

## Discoveries

| Discovery | Disposition | Location |
|-----------|-------------|----------|
| Inlined final-CTA SVG in index.html was a different visual (blue #0055d4 circular icon, viewBox 0 0 32 32, white bolt paths) than the file logo (horizontal #5fa4fa wordmark, 162×32) — replaced per PROMPT spec with img to comtom-logo.svg; final CTA now shows the wordmark mark instead of the circular icon | Accepted per spec (single source of truth was the mission) | index.html final CTA |
| 404.html has no footer and no logo — Step 2/3 scope excludes it, verified by grep not assumed | Verified, excluded | 404.html |
| Case-study pages carry the logo twice (header + footer) — 15 total logo refs across 7 files, not 8 | Verified, all updated | case-studies/*/index.html, root pages |
| Honeypot technical-debt item confirmed present in CONTEXT.md (no action needed) | Confirmed | CONTEXT.md Technical Debt |

---

## Execution Log

| Timestamp | Action | Outcome |
|-----------|--------|---------|
| 2026-09-10 | Task staged | PROMPT.md and STATUS.md created |
| 2026-09-11 | Steps 0-1 | SVG scrubbed, git mv → comtom-logo.svg, 15 refs updated, inline SVG → img; greps clean |
| 2026-09-11 | Step 2 | data-year span + inline script on 7 footer-bearing pages; node --check OK |
| 2026-09-11 | Step 3 | Dead attrs stripped (index.html only keeps them); contact footer CTAs → #contact-form-card, id added |
| 2026-09-11 | Step 4 | html-validate 33 = TP-007 baseline (line-2 case-study parser error verified pre-existing, md5-identical to HEAD) |
| 2026-09-11 | Step 5 | CONTEXT.md completed entry added, pending entry removed, honeypot debt item confirmed present |

---

## Blockers

*None*

---

## Notes

*Reserved for execution notes*
