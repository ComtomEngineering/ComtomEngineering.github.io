# TP-005: Tailwind build-time CSS — Status

**Current Step:** Not Started
**Status:** 🔵 Ready for Execution
**Last Updated:** 2026-09-10
**Review Level:** 2
**Review Counter:** 0
**Iteration:** 0
**Size:** L

> **Hydration:** Checkboxes represent meaningful outcomes, not individual code
> changes. Workers expand steps when runtime discoveries warrant it.

---

### Step 0: Preflight
**Status:** ⬜ Not Started

- [ ] All 8 pages present and reference the Play CDN
- [ ] Inline `tailwind-config` block captured for migration
- [ ] html-validate baseline recorded (count of pre-existing errors)

---

### Step 1: Scaffold build
**Status:** ⬜ Not Started

- [ ] `package.json` with tailwindcss devDep + `build` script
- [ ] `tailwind.config.js` with theme migrated verbatim (colors/spacing/fonts/borderRadius/darkMode)
- [ ] `content` globs include `*.html`, `case-studies/**/index.html`, `assets/js/cookie-consent.js`

**Artifacts:** `package.json`, `tailwind.config.js`

---

### Step 2: Generate & verify CSS coverage
**Status:** ⬜ Not Started

- [ ] Build produces `assets/css/site.css`
- [ ] Spot-check utilities present (z-[100]/z-[90], nav-spy shadow, form-result classes, banner classes, text-error)
- [ ] Globs/config fixed until all spot-checks pass

**Artifacts:** `assets/css/site.css` (generated)

---

### Step 3: Swap pages to static CSS
**Status:** ⬜ Not Started

- [ ] CDN script + inline config removed from all 8 pages
- [ ] Stylesheet `<link>` added with correct depth-relative href on all 8 pages
- [ ] Zero references to `cdn.tailwindcss.com` remain
- [ ] html-validate error count equals baseline

**Artifacts:** all 8 HTML files (modified)

---

### Step 4: Testing & Verification
**Status:** ⬜ Not Started

- [ ] FULL validation: html-validate on all 8 pages, count = baseline
- [ ] `npm run build` exits 0 and idempotent
- [ ] Body markup byte-identical to HEAD on 2 spot-checked pages
- [ ] Stylesheet hrefs resolve on disk

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
