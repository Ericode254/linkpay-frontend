# LinkPay — Design Package (Complete)

Premium, modern fintech identity for LinkPay: deep charcoal, white, restrained gold.
Built for everyday users **and** for merchants, freelancers, suppliers and service providers.

## Package contents

| File | What's inside |
|---|---|
| `moodboard.html` | Interactive visual moodboard — palette, typography, buttons, cards, inputs, badges, transaction rows, landing page, wallet dashboard, merchant dashboard, mobile nav. Open in a browser. |
| `design-system.md` | Design tokens (color, type, spacing, radii, shadows, motion), layout, component specs, money formatting, accessibility checklist. |
| `site-blueprint.md` | Information architecture, global shell, page-by-page blueprints (public + wallet + merchant), component inventory, user flows, responsive matrix, microcopy, implementation notes. |

## Recommended usage

1. **Before development:** review `moodboard.html` for visual direction; lock palette + type from `design-system.md`.
2. **While building:** use `site-blueprint.md` page blueprints and component inventory; keep names consistent.
3. **Before shipping:** run through the accessibility checklist and test-environment labeling rules.

## Identity summary

- **Colors:** charcoal `#111827`/`#1f2937`, white, restrained gold `#8a6d1b` + scale, warm canvas `#f6f6f4`, muted status palette.
- **Type:** Inter, tabular numerals for money, tight tracking on headings.
- **Grid:** 8px, generous spacing; trust-first, clarity over cleverness.
- **Money:** `KES 12,480.50`, `+` green incoming, `−` charcoal outgoing, always code + decimals.

## Notes

- Existing app lives in `../linkpay-frontend` (Next.js 16 + Tailwind 4) and `../linkpay/backend` (Django DRF).
- Design tokens in `design-system.md` should be merged into `linkpay-frontend/app/globals.css` `@theme`.
- Test environment labels are mandatory wherever balances are shown.
