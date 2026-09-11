# TP-005: Tailwind build-time CSS — Status

**Current Step:** Complete
**Status:** ✅ Done
**Last Updated:** 2026-09-11
**Review Level:** 2
**Review Counter:** 0
**Iteration:** 0
**Size:** L

> **Hydration:** Checkboxes represent meaningful outcomes, not individual code
> changes. Workers expand steps when runtime discoveries warrant it.

---

### Step 0: Preflight
**Status:** ✅ Complete

- [x] All 8 pages present and reference the Play CDN
- [x] Inline `tailwind-config` block captured for migration (identical across all 8 pages — md5-verified)
- [x] html-validate baseline recorded: **33 errors** (pre-existing: crossorigin attribute-empty-style, no-inline-style on Material Symbols spans, unique-landmark, no-raw-characters)

---

### Step 1: Scaffold build
**Status:** ✅ Complete

- [x] `package.json` with tailwindcss devDep + `build` script
- [x] `tailwind.config.js` with theme migrated verbatim (colors/spacing/fonts/borderRadius/darkMode) — extracted programmatically from index.html inline block, not retyped
- [x] `content` globs include `*.html`, `case-studies/**/index.html`, `assets/js/cookie-consent.js`
- [x] Tailwind v3.4 pinned (Play CDN parity; v3 config API). Preflight on by default = CDN behavior, no `corePlugins` override needed

**Artifacts:** `package.json`, `tailwind.config.js`

---

### Step 2: Generate & verify CSS coverage
**Status:** ✅ Complete

- [x] Build produces `assets/css/site.css` (26.5KB minified)
- [x] Spot-check utilities present: `z-[100]`, `z-[90]`, `bg-primary-container`, `shadow-[0_0_20px_rgba(37,99,235,0.45)]` (minified as `\2c` comma escapes — verify accordingly), `font-body-md`, `text-label-md`, `px-space-md`, `py-space-xs`, `rounded-lg`, `text-error`
- [x] Globs cover cookie-consent.js banner classes (px-space-md/py-space-xs/rounded-lg confirmed generated from JS source only)

**Artifacts:** `assets/css/site.css` (generated)

---

### Step 3: Swap pages to static CSS
**Status:** ✅ Complete

- [x] CDN script + inline config removed from all 8 pages
- [x] Stylesheet `<link>` added with correct depth-relative href on all 8 pages (root: `assets/css/site.css`; case-studies: `../../assets/css/site.css`)
- [x] Zero references to `cdn.tailwindcss.com` remain (outside `.worktrees/`)
- [x] html-validate error count = 33 = baseline

**Artifacts:** all 8 HTML files (modified)

---

### Step 4: Testing & Verification
**Status:** ✅ Complete

- [x] FULL validation: html-validate 33 errors = baseline (33)
- [x] `npm run build` exits 0; idempotent (md5 `06171fd52ed506ffb1a79e3376c693c9` stable across runs)
- [x] Body markup byte-identical: for all 8 pages, `HEAD file` with the script block regex-replaced by the exact `<link>` equals the working file — the swap is the ONLY change in each file
- [x] All 8 stylesheet hrefs resolve on disk
- [x] `node --check assets/js/cookie-consent.js` passes; file untouched

---

### Step 5: Documentation & Delivery
**Status:** ✅ Complete

- [x] `taskplane-tasks/CONTEXT.md` — Completed entry for TP-005 + "Build" section under Current State
- [x] Technical Debt list reviewed — no item resolved by this task
- [x] Discoveries logged below

---

## Reviews

| # | Type | Step | Verdict | File |
|---|------|------|---------|------|

---

## Discoveries

| Discovery | Disposition | Location |
|-----------|-------------|----------|
| All 3 case-study pages have **no opening `<body>` tag** (closing `</body></html>` present; browsers infer it). Pre-existing in HEAD, untouched by this task. html-validate does not flag it under current config. | Log as tech debt candidate (would need structural markup change — out of scope for TP-005) | `case-studies/*/index.html` |
| Minified CSS escapes arbitrary-value commas as `\2c` and dots as `\.` — grep spot-checks for arbitrary utilities must use fixed-string or regex-escaped patterns, not the literal class name | Note for future CSS coverage checks | `assets/css/site.css` |
| `.worktrees/comtom-20260910T233501/lane-1/` still holds a full old copy of the site with Play CDN refs (stale worktree from earlier batch, git-ignored) | Ignore — not part of live site | `.worktrees/` |

---

## Execution Log

| Timestamp | Action | Outcome |
|-----------|--------|---------|
| 2026-09-10 | Task staged | PROMPT.md and STATUS.md created |
| 2026-09-11 | Step 0 preflight | 8/8 pages confirmed; inline config identical (md5) across pages; baseline 33 html-validate errors |
| 2026-09-11 | Step 1 scaffold | package.json + tailwind.config.js (programmatic migration, verbatim) |
| 2026-09-11 | Step 2 build | site.css generated (26.5KB); all 10 spot-check utilities present |
| 2026-09-11 | Step 3 swap | 8/8 pages swapped; only-diff proof vs HEAD per file |
| 2026-09-11 | Step 4 verify | html-validate 33=33; build idempotent; JS untouched; hrefs resolve |
| 2026-09-11 | Step 5 docs | CONTEXT.md updated; STATUS.md finalized |

---

## Blockers

*None*

---

## Notes

*Executed directly (no orchestrator). Tailwind pinned to v3.4 for Play-CDN behavioral parity.*
