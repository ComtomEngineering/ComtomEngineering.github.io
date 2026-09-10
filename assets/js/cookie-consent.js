/**
 * GDPR cookie-consent gate for Google Analytics (Comtom Engineering).
 *
 * - Storage key: localStorage["comtom_cookie_consent"]
 *   Value: JSON {"consent":"accepted"|"declined","ts":"<ISO timestamp>"}
 *   (bare "accepted"/"declined" strings from older versions are also honored)
 * - No stored choice  → banner shown at bottom of viewport; GA NOT loaded.
 * - "accepted"        → gtag.js loader injected + gtag('config', ...) fired.
 *   A global gtag()/dataLayer stub is always defined so pre-existing page
 *   code (e.g. contact form gtag('event',...)) keeps working; pre-consent
 *   events stay queued in window.dataLayer and are flushed only when the
 *   real gtag.js loader loads (after accept).
 * - "declined"        → nothing loaded, no banner.
 * - JS disabled       → no banner, no GA; pages render normally.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'comtom_cookie_consent';
  var GA_ID = 'G-C7YDJRDD8X';
  var LOADER_SRC = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;

  // --- Global gtag/dataLayer stub (idempotent) -----------------------------
  // Kept even when consent is declined so page code referencing gtag()
  // never throws; pushes simply queue in memory and are never sent.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  function readConsent() {
    var raw = null;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage blocked */ }
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed.consent === 'string') return parsed.consent;
      return null;
    } catch (e) {
      // Backward compat: bare string stored by an older version.
      if (raw === 'accepted' || raw === 'declined') return raw;
      return null;
    }
  }

  function writeConsent(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        consent: choice,
        ts: new Date().toISOString()
      }));
    } catch (e) {
      // Storage unavailable (private mode / blocked). Choice applies for
      // this session only; banner reappears next visit. Acceptable degraded
      // behavior — GA is still correctly gated by the in-session check.
    }
  }

  function loadGA() {
    // Only called after explicit accept. Loader injects real gtag and
    // flushes the queued dataLayer; config fires once loader is ready.
    var s = document.createElement('script');
    s.async = true;
    s.src = LOADER_SRC;
    s.onload = function () {
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
    };
    s.onerror = function () { console.warn('GA loader failed to load'); };
    document.head.appendChild(s);
  }

  // Correct privacy.html link regardless of page depth
  // (root pages vs /case-studies/<name>/ pages vs deeper nesting).
  function privacyHref() {
    var segments = window.location.pathname.split('/');
    return (segments.length > 2 ? '../../' : '') + 'privacy.html';
  }

  function buildBanner() {
    var bar = document.createElement('div');
    bar.id = 'cookie-consent-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.className = [
      'fixed bottom-0 left-0 right-0 z-[90] w-full', // below contact modal (z-[100]), above header (z-50)
      'bg-surface-container border-t border-blue-600/30',
      'shadow-[0_-10px_40px_rgba(0,0,0,0.45)]',
      'px-space-md py-space-sm sm:px-space-lg'
    ].join(' ');

    bar.innerHTML =
      '<div class="mx-auto max-w-5xl flex flex-col sm:flex-row items-center gap-space-xs sm:gap-space-md">' +
        '<p class="flex-1 font-body-sm text-body-sm text-on-surface/90 leading-snug">' +
          'We use <strong class="text-blue-300">Google Analytics</strong> cookies to understand how visitors use this site. ' +
          'No analytics data is collected until you accept. ' +
          '<a class="text-blue-400 hover:text-blue-300 underline underline-offset-2" href="' + privacyHref() + '">Privacy policy</a>' +
        '</p>' +
        '<div class="flex items-center gap-space-xs shrink-0">' +
          '<button type="button" data-cookie-choice="declined" ' +
            'aria-label="Decline analytics cookies" ' +
            'class="font-label-md text-label-md px-space-md py-space-xs rounded-lg border border-blue-600/40 text-blue-300 ' +
            'bg-surface-container-highest/50 hover:border-blue-500/70 hover:text-blue-200 transition-colors">' +
            'Decline' +
          '</button>' +
          '<button type="button" data-cookie-choice="accepted" ' +
            'aria-label="Accept analytics cookies" ' +
            'class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white ' +
            'font-label-md text-label-md px-space-md py-space-xs rounded-lg font-semibold ' +
            'shadow-[0_0_25px_-5px_rgba(37,99,235,0.55)] hover:shadow-[0_0_30px_rgba(37,99,235,0.75)] ' +
            'transition-all duration-200">' +
            'Accept' +
          '</button>' +
        '</div>' +
      '</div>';

    bar.querySelectorAll('[data-cookie-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var choice = btn.getAttribute('data-cookie-choice');
        writeConsent(choice);
        bar.remove();
        if (choice === 'accepted') loadGA();
      });
    });

    document.body.appendChild(bar);
  }

  function init() {
    var choice = readConsent();
    if (choice === 'accepted') {
      loadGA();
    } else if (choice === 'declined') {
      // Load nothing, hide banner.
    } else {
      buildBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
