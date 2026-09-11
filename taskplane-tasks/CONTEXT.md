# General — Context

**Last Updated:** 2026-09-11
**Status:** Active
**Next Task ID:** TP-009

---

## Current State

This is the default task area for ComtomEngineering.github.io. Tasks that don't belong
to a specific domain area are created here.

Taskplane is configured and ready for task execution. Use `/orch all` for
parallel batch execution or `/orch <path/to/PROMPT.md>` for a single task.

**Completed (2026-09-10):**
- TP-002 — Homepage fixes: removed unused nav user button; fixed 3 mismatched testimonial names (Rohi Bagaria, Nathan Gould, Sofia Fernandez); split `#case-studies` (new section of 3 brief project cards: Electric AI, Schonfeld, Todaytix) from `#testimonials` (4 customer quotes). Homepage section order now: solutions → products → case-studies → testimonials → how-we-work.
- TP-003 — GDPR cookie consent banner: `assets/js/cookie-consent.js` injected on all 8 pages (defer, before `</body>`). GA (`G-C7YDJRDD8X`) is consent-gated — gtag loader injected only after Accept; consent persisted in `localStorage[comtom_cookie_consent]` (JSON `{consent, ts}`); banner is a fixed bottom bar with Accept/Decline; declined = no GA, no banner. **Cookie consent live; GA consent-gated site-wide.**
- TP-004 — Homepage section reorder: moved `#testimonials` (Customer Quotes, 4 quote cards) below `#how-we-work` (Methodology). Pure block move in `index.html`; all content, ids, anchors, and nav links intact. Homepage section order now: solutions → products → case-studies → how-we-work → testimonials.
- TP-005 — Tailwind Play CDN → build-time CSS: removed `<script src="https://cdn.tailwindcss.com">` + inline `tailwind-config` block from all 8 pages; each now links generated `assets/css/site.css` (purged, minified). Theme migrated verbatim to `tailwind.config.js`. Rebuild: `npm install && npm run build`.
- TP-007 — SEO metadata: canonical tags on all 8 pages (3 case-study pages were missing them; 404.html added); case-study titles rewritten to `«Brand» Case Study — Comtom Engineering` (Electric AI / Schonfeld / Todaytix) with matching og:title; descriptions rewritten as outcome statements (≤160 chars, from each page's Result copy); `og:site_name=Comtom Engineering` on all 8 pages; 404.html `noindex, follow` + fixed its stray homepage og:title/og:description; portfolio image alt texts made descriptive (3 case-study heroes + 3 index.html cards); sitemap lastmod → 2026-09-11, all 7 locs verified on disk, XML well-formed. No `twitter:site` (handle unverified). No visible copy/layout changes.
- TP-006 — Accessibility & image pass: `aria-hidden="true"` on all 47 decorative Material Symbols spans (8 pages); 5-star testimonial rows on index.html wrapped in `role="img" aria-label="Rated 5 out of 5"` containers; skip link (`#main-content`) + `id="main-content"` on all 8 pages; `autocomplete` on name/email inputs (contact.html + index modal); `prefers-reduced-motion` block + `sr-only`/skip-link CSS in per-page base style block (site.css is purged, so Tailwind CDN `sr-only` unavailable); `width`/`height` + `loading="lazy"` on all 13 below-fold raster images (portfolio cards, case-study heroes, testimonial avatars); consent banner now focuses Decline button on appearance (WCAG 2.4.3). html-validate count unchanged at 33 (baseline). No copy/layout/class changes.
- TP-008 — Brand hygiene: logo renamed `assets/images/sasscandy-logo.svg` → `assets/images/comtom-logo.svg` with Inkscape/Sodipodi metadata scrubbed (removed `inkscape:*`/`sodipodi:*` namespaces, `namedview`, `export-filename` local path leak, `nodetypes`/`connector` attrs; paths/transforms/fills untouched — visual output identical); inlined final-CTA SVG in index.html replaced with `<img src="assets/images/comtom-logo.svg">` (single source of truth); all 15 logo references (headers + footers) updated depth-correct; dynamic footer year — `© <span data-year>2026</span>` + inline script before `</body>` on all 7 footer-bearing pages (404.html has no footer) with literal `2026` no-JS fallback; dead `data-open-contact`/`data-contact-intent` attributes removed from contact/privacy/terms/3 case studies (only index.html retains them — it is the sole page with the modal handler); contact.html footer "Get a Custom Quote" / "Schedule a Discovery Call" changed from self-links to `href="#contact-form-card"` (id added to form card). html-validate unchanged at 33 (baseline).

**Build (added 2026-09-11, TP-005):**
This is a static GitHub Pages site with a build step. Before deploying: `npm install && npm run build` — this regenerates `assets/css/site.css` from `tailwind.config.js`. `assets/css/site.css` is **generated; do not hand-edit** (rebuild instead). `node_modules/` is git-ignored; the generated `site.css` is committed so the Pages deploy works without a build step.

**Pending work (2026-09-10, staged tasks):**
- **Note:** TP-005/007/008 all touch the same 8 HTML pages — orchestrator file-scope will serialize them on one lane. That is expected.

**Fixed directly (2026-09-10, commit `911dba1`, outside task pipeline):**
- `chonfeld` → `schonfeld` typo (sitemap, 404, case-study title/og/labels)
- Broken case-study footer links (`../../` prefixes + `#section` → `index.html#section`)
- Broken `chonfeld.jpg` image ref
- Contact modal: form permanently replaced after submit — `restoreForm()` added
- Testimonial name mismatches on case-study pages (David K./Sarah M. → Rohi Bagaria/Nathan Gould)
- Section numbering out of order (05 before 04)
- Copy: Steward broken sentence, NDA "guaranteed" → "available on request", CTA labels normalized, contact.html apostrophes normalized

---

## Key Files

| Category | Path |
|----------|------|
| Tasks | `taskplane-tasks/` |
| Config | `.pi/taskplane-config.json` |

---

## Technical Debt / Future Work

- [x] ~~**Stale testimonial names in case-study subpages**~~ — FIXED 2026-09-10 commit 911dba1 (direct fix, pre-TP-005)
- [ ] **html-validate no-inline-style errors** — 20+ pre-existing inline `font-variation-settings` styles on Material Symbols star spans in `index.html` testimonial cards. Cosmetic linter errors, not structural. (discovered during TP-002)
- [ ] **privacy.html Analytics wording predates consent gate** — policy says "analytics collection itself continues unless your browser blocks the script" and doesn't mention the consent banner or that GA is now gated on explicit Accept/Decline. Legal copy — needs approved rewrite before touching. (discovered during TP-003)
- [x] ~~**Broken footer links on case-study pages**~~ — FIXED 2026-09-10 commit 911dba1 (direct fix, pre-TP-005)
- [ ] **Form honeypot** — client-side honeypot needs the Vercel serverless endpoint repo (separate deploy) for server-side drop; not doable in this repo. (staged decision 2026-09-10)
- [ ] **Unverified telemetry claims** — hero widget (99.99% SLA, 3.8x, <100ms), EstimAItor "+94.2% Accuracy", Elemetric "120,000 req/sec" / "14ms", footer "All Systems Operational" badge: marketing/legal call needed — make real, label illustrative, or remove. Requires owner decision. (review 2026-09-10)
- [ ] **Unverified social handles** — Facebook slug `comtomengineeringok` looks like a typo; `twitter:site` not added anywhere until a real handle is confirmed. (staged for TP-007 Discoveries; **flagged in TP-007 — handle still unconfirmed, no `twitter:site` added**). Related: og:image is the same `assets/images/og.png` on all 8 pages — no case-study-specific share images exist (new TP-007 discovery).
- [ ] **Case-study pages lack opening `<body>` tag** — all 3 `case-studies/*/index.html` pages have no opening `<body>` (closing tag present; browsers infer it). Pre-existing, untouched by TP-005. Fix = structural markup change. (discovered during TP-005)
- [x] ~~**Consent banner focus management**~~ — FIXED in TP-006: `buildBanner()` focuses the Decline button (safe default) after `appendChild`. (noted during TP-003, R002)
- [ ] **Duplicate `<!-- Section 4: … -->` comment labels in index.html** — both How We Work and Customer Quotes/Testimonials are labeled "Section 4" in their section comments. Visible `04 //`/`05 //` labels were fixed in commit 911dba1; the HTML comments still need renumbering. Fix when `index.html` is next edited. (discovered during TP-004)
