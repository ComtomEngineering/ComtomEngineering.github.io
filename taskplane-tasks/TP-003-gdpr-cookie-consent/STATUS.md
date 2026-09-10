# TP-003: GDPR Cookie Consent Banner (Google Analytics) — Status

**Current Step:** Not Started
**Status:** 🔵 Ready for Execution
**Last Updated:** 2026-09-10
**Review Level:** 2
**Review Counter:** 0
**Iteration:** 0
**Size:** M

> **Hydration:** Checkboxes represent meaningful outcomes, not individual code
> changes. Workers expand steps when runtime discoveries warrant it — aim for
> 2-5 outcome-level items per step, not exhaustive implementation scripts.

---

### Step 0: Preflight
**Status:** ⬜ Not Started

- [ ] All 8 HTML pages listed in File Scope exist
- [ ] GA loaded immediately via inline head snippet on every page (G-C7YDJRDD8X)

---

### Step 1: Create shared consent script
**Status:** ⬜ Not Started

- [ ] `assets/js/cookie-consent.js` created (banner + localStorage choice + GA gating)
- [ ] Banner: fixed bottom bar, dialog aria, Accept/Decline buttons, privacy link with depth-correct path
- [ ] GA loader (`G-C7YDJRDD8X`) injected only on accepted consent

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
