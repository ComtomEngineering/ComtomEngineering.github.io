# Review R001 — Plan Review: Step 1 (Move the Testimonials Section)

**Task:** TP-004 — Move Testimonials Section Below How We Work
**Step:** Step 1: Move the testimonials section
**Reviewer:** taskplane task-reviewer
**Date:** 2026-09-10

## Verdict: ✅ APPROVE

Plan is sound, appropriately minimal for a trivial static reorder, and covers every requirement in PROMPT.md Step 1. Verified against the actual `index.html`: the move has been executed as a **pure block move** (commit `f8cac3c`) with correct final order, no content loss, and balanced tags. No blocking issues.

---

## Verification (against actual file, commit f8cac3c)

| Check | Result |
|---|---|
| Final DOM order | ✅ `solutions(123)` → `products(208)` → `case-studies(433)` → `how-we-work(483)` → `testimonials(570)` — strictly increasing, matches target |
| Each id exactly once | ✅ 5 target ids + `quote(675)` + 1 id-less header section = 7 `<section>` |
| Tag balance | ✅ 7 `<section>` / 7 `</section>` |
| Line count stable | ✅ 775 lines (unchanged) |
| git diff = pure block move | ✅ +93 / −93 lines; how-we-work block relocated, testimonials block untouched |
| Nav anchors resolve | ✅ `#solutions` `#products` `#case-studies` `#how-we-work` `#testimonials` all referenced (desktop/mobile/footer) and all present in body |
| Section classes preserved | ✅ testimonials tag intact: `py-space-3xl relative` |
| No other content disturbed | ✅ footer, other sections, `#quote` CTA unaffected |

---

## Notes (non-blocking)

### 1. Execution moved the *inverse* block — same result, fine

The plan frames the operation as "cut the testimonials section, paste it after `</section>` of how-we-work." The actual diff moves the **how-we-work** block up above testimonials (equivalent inverse transform). End state is identical and correct. No action needed — the plan's stated intent (final order) is what matters and it holds.

### 2. Background-tint caveat is moot for this section

The plan anticipates "if the moved section had a different background tint (e.g. `bg-surface-container-lowest/30`), keep that class." In reality the testimonials section has **no** bg tint class — only `py-space-3xl relative`. The `bg-surface-container-lowest/30` class belongs to **case-studies** (line 433), which was not moved. Worker correctly noted "section tag classes untouched." Nothing to preserve; visual rhythm holds (case-studies tinted → how-we-work plain → testimonials plain).

### 3. Pre-existing comment numbering collision — not introduced here, but worth logging

Both moved sections carry the `<!-- Section 4: … -->` label:
- `<!-- Section 4: How We Work (The Methodology) -->` (line 482)
- `<!-- Section 4: Customer Quotes (Testimonials) -->` (line 569)

Both comments traveled correctly with their respective sections (no breakage). The duplicate "Section 4" numbering is a **pre-existing** cosmetic inconsistency in the source, out of scope for this task ("Do NOT: Change section content"). Suggest worker logs it as a discovery in STATUS.md / CONTEXT.md and leaves it — fixing it is not part of this task and would violate the move-only constraint.

---

## Requirement Checklist (PROMPT.md Step 1)

| Requirement | Coverage | Notes |
|---|---|---|
| Cut complete testimonials element (open tag → matching `</section>`, incl. adjacent wrapper comment) | ✅ | Comment line `<!-- Section 4: Customer Quotes -->` moved with it |
| Paste immediately after how-we-work `</section>`, preserve section-level bg/spacing | ✅ | Classes untouched; no bg tint existed to preserve |
| Verify final DOM order | ✅ | Verified, strictly increasing |
| Verify no other content disturbed | ✅ | Line count stable, tags balanced, diff is pure block move |

---

## Summary

**APPROVE.** Plan is complete and correct for a low-blast-radius static reorder. The committed execution matches the plan's intent exactly: testimonials now render directly below How We Work, all ids/anchors intact, tags balanced, no collateral edits. The three notes above are observations for the worker's STATUS/CONTEXT logging (esp. #3 comment-numbering collision) — none change the plan or require a re-do.
