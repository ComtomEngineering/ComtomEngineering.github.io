# Review R004 — Plan Review: Step 2 (Gate GA on All Pages) — Re-review after R003

**Task:** TP-003 — GDPR Cookie Consent Banner (Google Analytics)
**Step:** Step 2: Gate GA on all pages
**Reviewer:** taskplane task-reviewer
**Date:** 2026-09-10

## Verdict: ✅ APPROVE

R003's single blocking issue (case-study script path depth) is fixed. No new blocking issues. Plan is ready to execute. Two non-blocking notes below — one is a real execution hazard worth heeding even though it doesn't block approval.

---

## R003 Blocking Issue — Verified Fixed

| Location | Before | Now | Status |
|---|---|---|---|
| PROMPT.md Step 2 | `one level deep` / `../assets/js/cookie-consent.js` | `two levels deep` / `../../assets/js/cookie-consent.js` (with R003 attribution) | ✅ |
| STATUS.md checkboxes (3 case-study pages) | `(depth: ../)` | `(depth: ../../)` | ✅ |
| Amendment log | — | Amendment 1 records issue + resolution | ✅ |

Cross-checked against reality: `case-studies/electric/index.html` sits two levels below root and already references `../../assets/images/...` and `../../index.html`. Correct depth confirmed.

Also re-verified the surrounding premises still hold against the working tree:

- All 8 pages carry exactly one `googletagmanager` reference each, all inside the two adjacent GA `<script>` tags in `<head>`. No page loads gtag anywhere else.
- `assets/js/cookie-consent.js` exists, passes `node --check`, and provides the idempotent `window.dataLayer`/`window.gtag` stub (R001 #1) — so removing the **entire** inline snippet on all 8 pages is safe. The only other `gtag` call sites (`index.html:779`, `contact.html:34`, both in form submit handlers inside `try/catch`) fire at user-event time, long after the deferred script has defined the stub (R003 obs. 3 analysis still valid).
- `gtag('js', new Date())` + `gtag('config', GA_ID)` re-fire on loader `onload` inside `cookie-consent.js`, so nothing in the inline snippet is functionally lost.
- GA measurement ID unchanged (`G-C7YDJRDD8X`).

---

## Non-Blocking Observations

### 1. Execution hazard: the GA snippet shares a line with the rest of `<head>` — remove the tags, not the line

On every page, line 2 of the file contains the `<title>`, all meta/OG/canonical tags, favicon links, **and** the two GA `<script>` tags, all on a single physical line. R003 obs. 2 correctly identifies *what* to remove (both `<script>` tags). This review adds the mechanical hazard: a line-oriented edit (sed by line number, or "delete the line containing googletagmanager") will destroy the entire head content of that page — title, meta, favicon, canonical — not just the GA snippet.

Worker should target the two `<script>...</script>` strings themselves (e.g. exact-string replace of the adjacent two-tag sequence: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-C7YDJRDD8X"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C7YDJRDD8X');</script>`), and then verify per page that the `<title>` and meta tags survived. Suggest adding to Step 3's verification: `grep -c "<title>" *.html case-studies/*/index.html` → 1 per file, plus spot-check one page's head renders its meta tags.

### 2. Pin the script placement decision in STATUS.md (R003 obs. 1, still open)

R003 recommended choosing `<head>` (GA snippet's old position) and logging the decision. The revised STATUS.md plan still leaves placement uncommitted ("script include added"). Not a correctness issue — the plan explicitly says pick one, use on all pages — but consistency across 8 pages matters more here than anywhere else, and a logged decision makes the Step 3 grep check sharper. Recommend the worker write "placement: `<head>`, replacing GA snippet position" into the Step 2 notes before executing.

---

## Requirement Checklist (PROMPT.md Step 2)

| Requirement | Plan Coverage | Notes |
|---|---|---|
| Remove immediate GA loader script | ✅ | Two-tag block identified; all 8 pages |
| Remove inline `gtag('config')` / dataLayer snippet | ✅ | Full inline script removed on all pages; stub in cookie-consent.js covers `index.html:779` + `contact.html:34` |
| Correct relative path per depth | ✅ | Root: `assets/js/...`; case-study: `../../assets/js/...` (fixed) |
| `<script ... defer>` include, one placement used everywhere | ✅ | Placement to be pinned per obs. 2 |
| All 8 pages, each tracked | ✅ | One checkbox per page in STATUS.md, depth annotated |
| No unrelated markup touched | ✅ | PROMPT "Do NOT" covers; obs. 1 adds verification hook |

## Granularity

One checkbox per page is the right level for a mechanical 8-file change — each checkbox is a verifiable outcome (GA gone + include present with correct path), not a keystroke. Matches what R003 accepted.

---

## Summary

**APPROVE.** R003 fix verified in both PROMPT.md and STATUS.md, premises re-verified against working tree. Proceed with execution. Heed obs. 1 (surgical tag removal — the snippet shares a line with the page's title/meta) and log the placement decision per obs. 2.
