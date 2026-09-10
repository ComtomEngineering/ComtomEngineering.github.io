# General — Context

**Last Updated:** 2026-09-10
**Status:** Active
**Next Task ID:** TP-004

---

## Current State

This is the default task area for ComtomEngineering.github.io. Tasks that don't belong
to a specific domain area are created here.

Taskplane is configured and ready for task execution. Use `/orch all` for
parallel batch execution or `/orch <path/to/PROMPT.md>` for a single task.

**Completed (2026-09-10):**
- TP-002 — Homepage fixes: removed unused nav user button; fixed 3 mismatched testimonial names (Rohi Bagaria, Nathan Gould, Sofia Fernandez); split `#case-studies` (new section of 3 brief project cards: Electric AI, Schonfeld, Todaytix) from `#testimonials` (4 customer quotes). Homepage section order now: solutions → products → case-studies → testimonials → how-we-work.

**Pending work (2026-09-10):**
- TP-003 — GDPR cookie consent banner on all pages; Google Analytics load gated on consent

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
