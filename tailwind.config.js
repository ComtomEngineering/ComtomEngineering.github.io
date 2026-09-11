/**
 * Tailwind config — theme migrated verbatim from the inline `tailwind.config`
 * script block that previously lived in every HTML page (TP-005).
 * Do not hand-edit theme values; this file is the source of truth.
 */
module.exports = {
  "content": [
    "*.html",
    "case-studies/**/index.html",
    "assets/js/cookie-consent.js"
  ],
  "darkMode": "class",
  "theme": {
    "extend": {
      "colors": {
        "surface": "#090D16",
        "on-primary-container": "#EEF2FF",
        "inverse-on-surface": "#2e3036",
        "inverse-primary": "#0053db",
        "tertiary-fixed-dim": "#93C5FD",
        "on-secondary-container": "#DCE7FE",
        "surface-container-lowest": "#06080f",
        "on-tertiary-container": "#1E3A8A",
        "inverse-surface": "#e2e2ea",
        "secondary-fixed-dim": "#93C5FD",
        "primary-fixed-dim": "#93C5FD",
        "on-secondary-fixed-variant": "#1E40AF",
        "on-background": "#e2e2ea",
        "outline": "#4B5563",
        "secondary-container": "#1D4ED8",
        "error": "#ffb4ab",
        "error-container": "#93000a",
        "surface-variant": "#131A2E",
        "on-tertiary-fixed-variant": "#1D4ED8",
        "surface-bright": "#1e293b",
        "on-error-container": "#ffdad6",
        "on-surface-variant": "#94A3B8",
        "surface-container-high": "#161F36",
        "surface-container-highest": "#1E293B",
        "surface-tint": "#60A5FA",
        "on-surface": "#F1F5F9",
        "surface-container": "#0F172A",
        "tertiary-container": "#1D4ED8",
        "primary-container": "#2563EB",
        "on-primary-fixed-variant": "#1E40AF",
        "secondary-fixed": "#DBEAFE",
        "primary": "#60A5FA",
        "tertiary": "#93C5FD",
        "on-secondary": "#0F172A",
        "tertiary-fixed": "#DBEAFE",
        "on-secondary-fixed": "#172554",
        "on-error": "#690005",
        "surface-container-low": "#0D1322",
        "background": "#090D16",
        "on-tertiary-fixed": "#172554",
        "surface-dim": "#090D16",
        "primary-fixed": "#DBEAFE",
        "on-tertiary": "#0F172A",
        "on-primary-fixed": "#172554",
        "on-primary": "#FFFFFF",
        "secondary": "#93C5FD",
        "outline-variant": "#1E293B"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "margin-desktop": "3rem",
        "space-lg": "1.5rem",
        "space-xs": "0.5rem",
        "space-sm": "0.75rem",
        "margin-mobile": "1.25rem",
        "gutter-lg": "2rem",
        "margin-tablet": "2rem",
        "space-xl": "2rem",
        "space-4xl": "6rem",
        "space-2xl": "3rem",
        "space-md": "1rem",
        "space-3xl": "4rem",
        "gutter-md": "1.5rem",
        "gutter-sm": "1rem",
        "space-2xs": "0.25rem"
      },
      "fontFamily": {
        "display-hero-mobile": [
          "Plus Jakarta Sans"
        ],
        "headline-md": [
          "Plus Jakarta Sans"
        ],
        "code-mono": [
          "JetBrains Mono",
          "Inter"
        ],
        "headline-sm": [
          "Plus Jakarta Sans"
        ],
        "label-sm": [
          "Inter"
        ],
        "display-hero": [
          "Plus Jakarta Sans"
        ],
        "headline-lg-mobile": [
          "Plus Jakarta Sans"
        ],
        "body-sm": [
          "Inter"
        ],
        "body-xl": [
          "Inter"
        ],
        "label-md": [
          "Inter"
        ],
        "headline-lg": [
          "Plus Jakarta Sans"
        ],
        "body-md": [
          "Inter"
        ]
      },
      "fontSize": {
        "display-hero-mobile": [
          "40px",
          {
            "lineHeight": "48px",
            "letterSpacing": "-0.025em",
            "fontWeight": "800"
          }
        ],
        "headline-md": [
          "30px",
          {
            "lineHeight": "38px",
            "letterSpacing": "-0.015em",
            "fontWeight": "600"
          }
        ],
        "code-mono": [
          "13px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.02em",
            "fontWeight": "500"
          }
        ],
        "headline-sm": [
          "22px",
          {
            "lineHeight": "30px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "label-sm": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.02em",
            "fontWeight": "500"
          }
        ],
        "display-hero": [
          "64px",
          {
            "lineHeight": "72px",
            "letterSpacing": "-0.03em",
            "fontWeight": "800"
          }
        ],
        "headline-lg-mobile": [
          "32px",
          {
            "lineHeight": "40px",
            "letterSpacing": "-0.015em",
            "fontWeight": "700"
          }
        ],
        "body-sm": [
          "13px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.005em",
            "fontWeight": "400"
          }
        ],
        "body-xl": [
          "18px",
          {
            "lineHeight": "28px",
            "letterSpacing": "-0.005em",
            "fontWeight": "400"
          }
        ],
        "label-md": [
          "14px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.01em",
            "fontWeight": "600"
          }
        ],
        "headline-lg": [
          "44px",
          {
            "lineHeight": "52px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "body-md": [
          "15px",
          {
            "lineHeight": "24px",
            "letterSpacing": "0em",
            "fontWeight": "400"
          }
        ]
      }
    }
  }
};
