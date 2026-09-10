# Task: TP-005 - Replace Tailwind Play CDN with build-time CSS

**Created:** 2026-09-10
**Size:** L

## Review Level: 2 (Plan and Code)

**Assessment:** New build pipeline touching all 8 HTML pages; visual regression risk across entire site (CDN runtime JIT → static CSS). No security surface, but a wrong content glob silently drops utilities.
**Score:** 5/8 — Blast radius: 2, Pattern novelty: 2, Security: 0, Reversibility: 1

## Canonical Task Folder

```
taskplane-tasks/TP-005-tailwind-build/
├── PROMPT.md
├── STATUS.md
├── .reviews/
└── .DONE
```

## Mission

The site currently loads Tailwind via the Play CDN (`<script src="https://cdn.tailwindcss.com">`) on every page. That is runtime JS JIT: ~110KB script per page load, a console warning, no CSP friendliness, and a hard dependency on a dev-oriented CDN. Replace it with a build step that generates a purged static `site.css`, so pages link a plain stylesheet. All existing class names stay identical — this is a pipeline change, not a markup change.

## Dependencies

- **None**

## Context to Read First

**Tier 2 (area context):**
- `taskplane-tasks/CONTEXT.md`

**Tier 3 (load only if needed):**
- (none)

## Environment

- **Workspace:** repo root (static GitHub Pages site, no server)
- **Services required:** None (Node.js + npm available)

## File Scope

- `package.json` (new)
- `tailwind.config.js` (new)
- `assets/css/site.css` (new, generated)
- `index.html`
- `contact.html`
- `404.html`
- `privacy.html`
- `terms.html`
- `case-studies/electric/index.html`
- `case-studies/schonfeld/index.html`
- `case-studies/todaytix/index.html`
- `.gitignore` (append generated artifacts if any)

## Steps

> **Hydration:** STATUS.md tracks outcomes, not individual commands.

### Step 0: Preflight

- [ ] All 8 HTML pages present and reference `cdn.tailwindcss.com`
- [ ] Note the inline `tailwind-config` script block content (theme extend) for migration
- [ ] Baseline: run `npx -y html-validate index.html contact.html 404.html privacy.html terms.html case-studies/electric/index.html case-studies/schonfeld/index.html case-studies/todaytix/index.html` and record output in STATUS.md (20+ pre-existing inline-style errors on Material Symbols star spans are known — record count as baseline)

### Step 1: Scaffold build

- [ ] Create `package.json` with `tailwindcss` as devDependency and a `build` script using the Tailwind CLI
- [ ] Create `tailwind.config.js` migrating the ENTIRE inline `tailwind.config` theme from any page (colors, spacing, fontFamily, fontSize, borderRadius, `darkMode:"class"`) — copy values verbatim
- [ ] Set `content` globs to cover all class sources: `*.html`, `case-studies/**/index.html`, AND `assets/js/cookie-consent.js` (the consent banner is built in JS with Tailwind classes that only exist in that file's strings — omitting it silently breaks the banner)
- [ ] Add an output step writing to `assets/css/site.css` (purged; no preflight surprises — include `corePlugins.preflight: true` behavior as with CDN)

### Step 2: Generate & verify CSS coverage

- [ ] Run the build; `assets/css/site.css` is generated
- [ ] Coverage check — grep the generated CSS and confirm each of these is present (spot-check list, all are used by runtime-added or JS-built markup):
  - `.z-\[100\]`, `.z-\[90\]` (modal, banner)
  - `.bg-primary-container` and `shadow-[0_0_20px_rgba(37,99,235,0.45)]` (nav scroll-spy adds these at runtime; they exist in index.html source so must be generated)
  - `.font-body-md`, `.text-label-md` (used by contact-form success/error messages built in index.html JS strings)
  - `.px-space-md`, `.py-space-xs`, `.rounded-lg` (cookie banner, built in cookie-consent.js)
  - `.text-error` (form error message)
- [ ] If any are missing, fix content globs or config, rebuild, re-verify
- [ ] Targeted check: `node --check` any extracted JS is unchanged (no JS edits in this task)

### Step 3: Swap pages to static CSS

- [ ] On ALL 8 pages: remove `<script src="https://cdn.tailwindcss.com"></script>` and the `<script id="tailwind-config">…</script>` block
- [ ] Add `<link rel="stylesheet" href="assets/css/site.css">` (root pages) or `href="../../assets/css/site.css"` (case-study pages) where the removed scripts were
- [ ] Verify no page still references `cdn.tailwindcss.com` or `tailwind-config`
- [ ] Run targeted check: `npx -y html-validate` on all 8 pages — error count must equal Step 0 baseline (no new errors)

### Step 4: Testing & Verification

- [ ] Re-run `npx -y html-validate` on all 8 pages; error count equals Step 0 baseline
- [ ] `npm run build` exits 0 and is idempotent (second run no diff in `git status` for generated file — or note hash stability)
- [ ] Manual structural pass: one root page + one case-study page — head contains stylesheet link, no Tailwind scripts, body markup untouched (diff body against `git show HEAD:file` — bodies must be byte-identical)
- [ ] Verify the 8 relative-path stylesheet hrefs resolve to the generated file on disk

### Step 5: Documentation & Delivery

- [ ] "Must Update" docs modified
- [ ] Discoveries logged in STATUS.md

## Documentation Requirements

**Must Update:**
- `taskplane-tasks/CONTEXT.md` — add Completed entry for TP-005 (build step live, Play CDN removed)
- `README`-style notes: if none exists, add a short "Build" section in `taskplane-tasks/CONTEXT.md` under Current State: `npm install && npm run build` before deploying; `assets/css/site.css` is generated

**Check If Affected:**
- `taskplane-tasks/CONTEXT.md` — Technical Debt list (remove any items this task resolves)

## Completion Criteria

- [ ] All steps complete
- [ ] No page references the Play CDN; all 8 link the generated stylesheet
- [ ] html-validate error count unchanged from baseline
- [ ] Documentation updated

## Git Commit Convention

Commits happen at **step boundaries** (not after every checkbox). All commits
for this task MUST include the task ID for traceability:

- **Step completion:** `feat(TP-005): complete Step N — description`
- **Bug fixes:** `fix(TP-005): description`
- **Tests:** `test(TP-005): description`
- **Hydration:** `hydrate: TP-005 expand Step N checkboxes`

## Do NOT

- Expand task scope — add tech debt to CONTEXT.md instead
- Change any markup, class names, or inline JS — pipeline change only
- Edit `assets/js/cookie-consent.js` behavior (it is only a content-scan source here)
- Delete or hand-edit the generated `assets/css/site.css` (rebuild instead)
- Add new utilities or modify the theme values — migrate verbatim only
- Commit without the task ID prefix in the commit message

---

## Amendments (Added During Execution)

<!-- Workers add amendments here if issues discovered during execution.
     Format:
     ### Amendment N — YYYY-MM-DD HH:MM
     **Issue:** [what was wrong]
     **Resolution:** [what was changed] -->
