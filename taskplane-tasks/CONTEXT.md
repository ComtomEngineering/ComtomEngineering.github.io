# General — Context

**Last Updated:** 2026-09-10
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

**Pending work (2026-09-10, staged tasks):**
- TP-005 — Tailwind Play CDN → build-time `assets/css/site.css` (L, Level 2)
- TP-006 — Accessibility + image loading pass: aria-hidden icons, rating labels, skip link, reduced-motion, img width/height + lazy, consent-banner focus (M, Level 2)
- TP-007 — SEO metadata: case-study canonicals/titles/og, og:site_name, 404 noindex, sitemap lastmod, descriptive alts (S, Level 1)
- TP-008 — Brand hygiene: SVG metadata scrub + rename `comtom-logo.svg`, inline SVG dedupe, dynamic © year, dead `data-open-contact` cleanup (S, Level 1)
- **Note:** TP-005/006/007/008 all touch the same 8 HTML pages — orchestrator file-scope will serialize them on one lane. That is expected.

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
- [ ] **Unverified social handles** — Facebook slug `comtomengineeringok` looks like a typo; `twitter:site` not added anywhere until a real handle is confirmed. (staged for TP-007 Discoveries)
- [ ] **Consent banner focus management** — banner shows without moving focus to a button (deliberate: non-modal bar). If a WCAG audit is planned, consider focusing the Decline button (safe default) on banner appearance. (noted during TP-003, R002)
- [ ] **Duplicate `<!-- Section 4: … -->` comment labels in index.html** — both How We Work and Customer Quotes/Testimonials are labeled "Section 4" in their section comments. Visible `04 //`/`05 //` labels were fixed in commit 911dba1; the HTML comments still need renumbering. Fix when `index.html` is next edited. (discovered during TP-004)
