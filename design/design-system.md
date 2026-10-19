# LinkPay — Design System

> Premium, modern fintech identity for LinkPay. Deep charcoal, white, restrained gold.
> Companions: `moodboard.html` (visual) · `site-blueprint.md` (pages) · `README.md` (index).

---

## 1. Brand

| Attribute | Value |
|---|---|
| Name | LinkPay |
| Tagline | One network. Many transactions. |
| Personality | Trustworthy, calm, capable, premium. Everyday-friendly, merchant-powerful. |
| Voice | Plain, confident, never cute about money. |
| Mark | Wordmark in gold 600 over charcoal; optional monogram "LP" in gold on charcoal circle. |

**Core promise:** a single transaction experience across individuals, merchants, freelancers, suppliers and service providers.

---

## 2. Color tokens (CSS custom properties)

### Brand core
| Token | Hex | Use |
|---|---|---|
| `--charcoal-900` | `#0f1216` | Hero/footer darkest |
| `--charcoal-800` | `#111827` | Primary in-app action buttons |
| `--charcoal-700` | `#1f2937` | Brand surfaces, headings |
| `--charcoal-600` | `#374151` | Strong text on light |
| `--surface` | `#ffffff` | Cards, panels |
| `--bg` | `#f6f6f4` | App canvas (warm off-white) |
| `--border` | `#e6e6e3` | Dividers |
| `--gold-700` | `#6f5612` | Gold text (links, numbers) |
| `--gold-600` | `#8a6d1b` | Primary accent, logo, emphasis |
| `--gold-500` | `#a88526` | Gradient start |
| `--gold-400` | `#c9a64a` | Highlights, selection |
| `--gold-200` | `#d6c38a` | Borders on tinted cards |
| `--gold-100` | `#efe6c8` | Soft fills, avatars, focus ring |
| `--gold-50`  | `#f5f0e1` | Wash backgrounds |

### Status
| Token | Hex | Semantic |
|---|---|---|
| `--success` / soft | `#1e7f4f` / `#e7f3ec` | Completed, paid, incoming money |
| `--warning` / soft | `#9a6700` / `#fbf1dd` | Pending, attention |
| `--danger` / soft | `#b42318` / `#fbe9e7` | Failed, error, destructive |
| `--info` / soft | `#1d4ed8` / `#e8eefc` | Informational, refunded |

### Usage rules
1. **Gold is accent, not decoration.** One gold primary action per view. Primary money actions (Send/Pay/Confirm) are charcoal 800; gold marks trust moments, focus, key figures.
2. **Incoming = success green + `+`**; **outgoing = charcoal + `−`**. Always sign + status text, never color alone.
3. Status text labels are mandatory alongside color (Pending / Completed / Failed / Cancelled / Refunded).
4. Canvas is warm off-white `#f6f6f4`; pure white surfaces sit above it for elevation.
5. Minimum contrast: body text on white ≥ 4.5:1.

### Dark mode (optional, v2)
Map charcoal surfaces to white text; keep gold accent; reduce gold-50 washes. Flag as future work — not required for MVP.

---

## 3. Typography

| Role | Size / weight / tracking | Use |
|---|---|---|
| Display | 56–64px · 800 · -0.035em | Hero headlines |
| H1 | 36–40px · 700 · -0.028em | Page titles |
| H2 | 26–30px · 700 · -0.022em | Section titles |
| H3 | 18–20px · 600 | Card titles |
| H4 | 15–16px · 600 | Subheads |
| Body | 16px · 400 · 1.55 | Paragraphs |
| Body-sm | 14px · 400 | Secondary text |
| Caption | 12px · 500 · 0.04em | Labels, timestamps |
| Overline | 11px · 600 · 0.12em uppercase | Section eyebrows |
| Mono | 14px · 600 | References, IDs, usernames |
| Money | 16–48px · 700–800 · tabular | All currency amounts |

**Font family:** `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`
**Global feature:** `font-feature-settings: "tnum" 1;` (tabular numerals for money).

**Spacing scale:** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72 · 96 px (8px base).

**Radii:** xs 6 · sm 8 · md 12 · lg 16 · xl 20 · 2xl 24 · full 9999.

**Shadows:** `sm` hover surfaces · `md` cards · `lg` modals/device frames · `gold` premium CTAs.

**Motion:** fast 120ms · base 180ms · slow 280ms · ease `cubic-bezier(.2,.8,.2,1)`. Respect `prefers-reduced-motion`.

---

## 4. Layout

- Marketing max width: **1280px** centered, 28px side padding (16px mobile).
- App max width: **1120px** centered.
- Grids: 12-column mental model; common splits 1/2, 1/3, 1/4, 2/3 + 1/3 (account rail).
- Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280`.
- Mobile: bottom fixed nav (5 items), 44px min touch targets, no horizontal scroll.

---

## 5. Components

### Buttons
Variants: `primary` (charcoal 800), `accent` (gold gradient), `secondary` (outline), `ghost`, `success`, `danger`.
Sizes: `sm` (7/12px), `md` (11/18px default), `lg` (14/24px).
States: hover (lift 1px + shadow), active (press), disabled (opacity .5), loading (spinner + "…"). Focus ring 3px gold-100.
Rules: one primary/accent per view; destructive uses `danger` + confirm modal.

### Cards
Variants: `surface` (default), `elevated` (modal/feature), `tinted` (gold wash, for security tips), `dark` (asides/summary rails).
Padding 20px default (16px compact). Hover: shadow-md.

### Inputs
Height 42px, radius sm, 1px border-strong. Focus: gold-600 border + 3px gold-100 ring. Always paired label (above) + placeholder. Error: border-danger + red-50 helper text.

### Badges (status)
`success` Completed/Paid · `warn` Pending · `danger` Failed · `neutral` Cancelled · `info` Refunded · `gold` Verified/Premium/Testnet.
Always text + color (dot optional). Minimum 12px font.

### Avatar
Circular, gold-100 bg, gold-700 initials. Sizes 24/32/40/56. Used in chips and transaction rows.

### Chips (frequent recipients)
Pill: 8px 14px, surface + border. Hover → gold-50 + gold border. Inline avatar + name + @username.

### Transaction row
Icon circle (in=success soft, out=slate 50) · title (14px 600) · subtitle (12px muted: counterparty · date · #ref) · amount tabular (±x,xxx.xx) · status badge.
Mobile: stack into card (reference pill, status pill, amount larger).

### Empty state
Centered icon (line, slate-300), 14px title, 12px muted description, optional single CTA. Never blank panels.

### Modal
Elevated card, max 480–560px, 24px padding, scrim `rgba(15,18,22,.45)` + backdrop blur. Focus trap, ESC to close.

### Toast
Bottom-right (mobile: bottom-full-width above nav). 4s auto-dismiss, status icon + message. Max 2 stacked.

### Bottom nav (mobile)
5 items: Home, Send, Receive, Merchant, History. 44px min target, active gold. Requires `h-14` spacer.

### Top nav (desktop)
Brand (gold wordmark) · nav links · auth actions. Sticky with blur.

### Skeleton
Surface-2 bars, 8–12px radius, pulse 1.4s. Used for dashboard load.

### Chart/sparkline (optional)
1.5px gold-600 line on surface-2 area. Used for merchant volume only; keep minimal.

---

## 6. Iconography

Use **Lucide** (stroke, 1.75px, rounded). Sizes 16 / 20 / 24. Color follows text color. Custom only for payment status arrow icons (↓↑) and brand mark. Avoid emoji in UI.

---

## 7. Money formatting

- Always show currency code: `KES 12,480.50` (code before amount, space).
- Incoming: `+2,000.00 KES` success green.
- Outgoing: `-450.00 KES` charcoal.
- Tabular numerals, 2 decimals.
- Large balance: 48–56px 800 on dashboard, 26px in mini.
- Never scientific notation or truncated decimals.

## 8. Accessibility checklist

- [ ] All body text ≥ 4.5:1 on surfaces.
- [ ] Focus ring visible on every interactive element.
- [ ] Status conveyed by text, not color.
- [ ] Keyboard: tab order logical, modals trap focus, ESC closes.
- [ ] `prefers-reduced-motion` disables lifts/transitions.
- [ ] 44px min touch targets on mobile.
- [ ] Forms: labels, autocomplete, error messages associated.
- [ ] Live regions for transaction result toasts.

---

## 9. Test-environment labeling

Every screen touching balances must display a small, non-dismissable label: **"Test environment — balances are simulated, not real money."** in caption-muted style. Also surface on login/register and footer.

---

## 10. Asset checklist

- `logo.svg` (wordmark + monogram)
- `hero.jpg` (existing, reviewed: keep or replace with charcoal abstract gradient)
- Favicon (current)
- Empty-state illustrations (3 line-art): no transactions, no requests, no customers
- Avatar fallback (initials, no image dependency)
- OG image 1200×630
