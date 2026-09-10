# TP-003: GDPR Cookie Consent Banner (Google Analytics) — Status

**Current Step:** Step 1: Create shared consent script
**Status:** 🟡 In Progress
**Last Updated:** 2026-09-10
**Review Level:** 2
**Review Counter:** 2
**Iteration:** 1
**Size:** M

> **Hydration:** Checkboxes represent meaningful outcomes, not individual code
> changes. Workers expand steps when runtime discoveries warrant it — aim for
> 2-5 outcome-level items per step, not exhaustive implementation scripts.

---

### Step 0: Preflight
**Status:** ✅ Complete

- [x] All 8 HTML pages listed in File Scope exist
- [x] GA loaded immediately via inline head snippet on every page (G-C7YDJRDD8X)

> Notes: GA snippet is one inline line in `<head>` on all 8 pages. `index.html:779` and `contact.html:34` call `gtag('event','contact_submit')` inside try/catch — global `gtag` stub must keep existing (provided by cookie-consent.js). No other `dataLayer`/`gtag` references.

---

### Step 1: Create shared consent script
**Status:** 🟨 In Progress

- [x] `assets/js/cookie-consent.js` created (banner + localStorage choice + GA gating)
- [x] Banner: fixed bottom bar, dialog aria, Accept/Decline buttons, privacy link with depth-correct path
- [x] GA loader (`G-C7YDJRDD8X`) injected only on accepted consent

> R001 plan review: APPROVE. Suggestions applied: #1 idempotent gtag/dataLayer stub guard; #2 privacy href computed from `location.pathname` (segments > 2 → `../../`); #3 try/catch around localStorage read+write; #4 JSON storage `{consent, ts}` with bare-string backward-compat.

---

### Step 2: Gate GA on all pages
**Status:** ⬜ Not Started

> ⚠️ Hydrate: one checkbox per page as each is done:

- [ ] index.html — immediate GA removed, script include added (depth: root)
- [ ] contact.html — immediate GA removed, script include added (depth: root)
- [ ] privacy.html — immediate GA removed, script include added (depth: root)
- [ ] terms.html — immediate GA removed, script include added (depth: root)
- [ ] 404.html — immediate GA removed, script include added (depth: root)
- [ ] case-studies/electric/index.html — immediate GA removed, script include added (depth: `../`)
- [ ] case-studies/schonfeld/index.html — immediate GA removed, script include added (depth: `../`)
- [ ] case-studies/todaytix/index.html — immediate GA removed, script include added (depth: `../`)

---

### Step 3: Testing & Verification
**Status:** ⬜ Not Started

- [ ] No page loads gtag directly (grep googletagmanager in HTML returns nothing)
- [ ] `cookie-consent.js` included exactly once per page with correct relative path
- [ ] `node --check assets/js/cookie-consent.js` passes
- [ ] Headless/manual verification of banner + consent flow (method logged)
- [ ] Privacy link resolves on root page and case-study page

---

### Step 4: Documentation & Delivery
**Status:** ⬜ Not Started

- [ ] CONTEXT.md Current State updated
- [ ] privacy.html consistency checked (no edits without approval; mismatches → tech debt)
- [ ] Discoveries logged

---

## Reviews

| # | Type | Step | Verdict | File |
|---|------|------|---------|------|

---

| 2026-09-10 13:18 | Task started | Runtime V2 lane-runner execution |
| 2026-09-10 13:18 | Step 0 started | Preflight |
| 2026-09-10 13:25 | Review R001 | plan Step 1: UNKNOWN |
| 2026-09-10 13:32 | Review R002 | code Step 1: UNKNOWN |
