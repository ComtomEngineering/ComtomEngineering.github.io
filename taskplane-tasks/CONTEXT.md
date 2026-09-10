# General — Context

**Last Updated:** 2026-09-10
**Status:** Active
**Next Task ID:** TP-005

---

## Current State

This is the default task area for ComtomEngineering.github.io. Tasks that don't belong
to a specific domain area are created here.

Taskplane is configured and ready for task execution. Use `/orch all` for
parallel batch execution or `/orch <path/to/PROMPT.md>` for a single task.

**Completed (2026-09-10):**
- TP-002 — Homepage fixes: removed unused nav user button; fixed 3 mismatched testimonial names (Rohi Bagaria, Nathan Gould, Sofia Fernandez); split `#case-studies` (new section of 3 brief project cards: Electric AI, Schonfeld, Todaytix) from `#testimonials` (4 customer quotes). Homepage section order now: solutions → products → case-studies → testimonials → how-we-work.
- TP-003 — GDPR cookie consent banner: `assets/js/cookie-consent.js` injected on all 8 pages (defer, before `</body>`). GA (`G-C7YDJRDD8X`) is consent-gated — gtag loader injected only after Accept; consent persisted in `localStorage[comtom_cookie_consent]` (JSON `{consent, ts}`); banner is a fixed bottom bar with Accept/Decline; declined = no GA, no banner. **Cookie consent live; GA consent-gated site-wide.**

**Pending work (2026-09-10):**
- (none)

---

## Key Files

| Category | Path |
|----------|------|
| Tasks | `taskplane-tasks/` |
| Config | `.pi/taskplane-config.json` |

---

## Technical Debt / Future Work

- [ ] **Stale testimonial names in case-study subpages** — `case-studies/*/index.html` pages still show the old placeholder names (e.g. "Sarah M." on `case-studies/electric/`); TP-002 was scoped to `index.html` only. Fix when subpages are next touched. (discovered during TP-002)
- [ ] **html-validate no-inline-style errors** — 20+ pre-existing inline `font-variation-settings` styles on Material Symbols star spans in `index.html` testimonial cards. Cosmetic linter errors, not structural. (discovered during TP-002)
- [ ] **privacy.html Analytics wording predates consent gate** — policy says "analytics collection itself continues unless your browser blocks the script" and doesn't mention the consent banner or that GA is now gated on explicit Accept/Decline. Legal copy — needs approved rewrite before touching. (discovered during TP-003)
- [ ] **Broken footer links on case-study pages** — `case-studies/*/index.html` footers link `href="privacy.html"` / `href="terms.html"` (missing `../../`), 404 on deployed site. Pre-existing; same depth bug class TP-003 fixed for the consent script. (discovered during TP-003)
- [ ] **Consent banner focus management** — banner shows without moving focus to a button (deliberate: non-modal bar). If a WCAG audit is planned, consider focusing the Decline button (safe default) on banner appearance. (noted during TP-003, R002)
