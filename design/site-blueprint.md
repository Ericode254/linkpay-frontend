# LinkPay — Site Design Blueprint (Page-by-Page)

> Full reference for designing and building the LinkPay website/app.
> Companion files: `moodboard.html` · `design-system.md`.

---

## 1. Information architecture

```
Public
├── Home (/)
├── Login (/login)
├── Register (/register)
├── About / Trust & security (/about or /trust)
└── Legal (/terms, /privacy)

Authenticated (wallet)
├── Dashboard (/dashboard)  ← home when signed in
├── Send (/send)  → confirm → success → receipt
├── Receive (/receive)
├── Request money (/requests) → create → detail
├── History (/history) → transaction detail (/transactions/[ref])
├── Settings & profile (/settings) [recommended new]
└── Help / Support (/help) [recommended]

Merchant & business (role-gated)
├── Merchant overview (/merchant)
├── Invoices/requests management (/merchant/requests)
├── Customers (/merchant/customers)
├── Suppliers & payouts (/merchant/suppliers)
├── Sales reports (/merchant/reports)
└── Business settings (/merchant/settings)

Admin (internal, optional)
└── User/transaction review (Django admin already exists)
```

Role switching: one app, views expand when `account_type` is merchant/freelancer/service_provider/supplier. Individual users never see merchant chrome.

---

## 2. Global shell

### Top nav (desktop, height 64px, sticky, blur)
- Left: `LinkPay` wordmark (gold 600, 800 weight).
- Center: Home · Send · Receive · Merchant · History (only when authed; else "How it works · Security · Pricing").
- Right: authed → avatar + name + "Log out" ghost; else "Log in" ghost + "Sign up" primary.

### Bottom nav (mobile, authed only, 5 items)
Home · Send · Receive · Merchant · History. Active gold. 44px min targets. Body bottom spacer 56px to avoid overlap.

### Footer (all pages)
"LinkPay is a working name…" disclaimer + test-environment label + links (Terms, Privacy, Support, Status). Caption muted.

---

## 3. Page blueprints

### 3.1 Home / Landing (`/`)

**Goal:** explain, build trust, convert to signup.

Layout (top to bottom):
1. **Hero** — dark charcoal gradient with gold radial. Badge "Testnet demo · Simulated balances". H1 "LinkPay: One network. Many transactions." Lead (2 sentences). CTAs: "Get started free" (gold) + "Log in" (outline light). Stat tiles row: Participant groups · Shared transaction experience · Repeat business relationships.
2. **What LinkPay does** (white) — H2 + lead + 4 cards (Individuals, Merchants, Freelancers, Suppliers). Hover lift.
3. **How the network works** (canvas) — 3 numbered steps (01 Register & identify, 02 Discover, 03 Transact). Gold step number.
4. **Trust, security, transparency** (white) — 2-col: left copy + bullet list; right "Statuses you can rely on" card with status pills.
5. **Roadmap** (canvas) — 3 cards (MVP / Integrations / Scale).
6. **Tech / credibility** (white) — H2 + paragraph + CTAs.
7. **Footer** disclaimer.

Responsive: cards stack at 768px; hero stats stack at 640px.

### 3.2 Login (`/login`)

2-col card (max 960px) on canvas:
- Left: eyebrow "Welcome back" · H2 · lead · test-environment panel with demo creds (monospace).
- Right: form — Email, Password, full-width primary "Sign in", link to register.
States: loading "Signing in…", error banner (red-50). Focus gold rings.

### 3.3 Register (`/register`)

Same 2-col shell:
- Left: eyebrow "Get started" · H2 · lead · "What you get" list.
- Right: form — Username, Email (2-col on ≥640), Password, Account type select, conditional Business name, "Sign up" primary, link to login.
Validation inline. Account type changes form (show business name for merchant/supplier).

### 3.4 Dashboard (`/dashboard`) — Wallet home

Auth guard → loading skeleton.

Sections, top to bottom:
1. **Welcome row**: greeting small-caps timestamp? · H2 display name · caption "account type · public id" · action group: Send money (primary) / Receive (secondary) / New request (secondary).
2. **Balance + account rail** (grid: 2/3 + 1/3):
   - Balance card (elevated): eyebrow "Available balance" · large money (48px) · "Test balance…" caption · 3 stat tiles (Received +green, Sent, Transactions).
   - Account card: Status (Verified badge), Currency, Public ID (mono), Joined. Pending requests alert (amber) if any.
3. **Business overview** (only if business role): tiles (Today's payments, Monthly volume, Outstanding invoices) + frequent customers chips + "Open merchant dashboard" link.
4. **Frequent recipients** chips (only if any).
5. **Recent transactions** (2-col with pending requests): last 6 txs with "View all" link. Empty state + CTA.
6. **Pending payment requests** panel with inline Pay (non-merchant) button.
7. **Security tip** tinted (gold-50) card at the bottom.

Empty states: first-time user → "Send or receive your first payment" with Send/Receive CTAs.

### 3.5 Send (`/send`)

Single column, max 560px.
1. H2 "Send money".
2. Card form: Recipient (search with live lookup dropdown) · Amount (KES) · Description.
3. Primary "Review payment" (disabled until recipient + amount).
4. Review panel: To @user · Amount · Note · "Confirm & send" + "Back".
5. **Success state** (replaces form): "Payment sent" + reference/amount/to/status + "View receipt" + "Dashboard". Confirmation uses card-elevated success tint.

States: lookup dropdown (avatar-less text rows), no results (subtle empty), error banner.

### 3.6 Receive (`/receive`)

1. H2 "Receive money".
2. Card "Share these details": Username row (copy button) · Wallet ID row (mono, copy).
3. Caption "Payers find you by username or wallet ID. Test environment only."
4. Card "Recent incoming payments" (last 8) or empty state.
5. Link "Create a payment request →".

### 3.7 Request money (`/requests`)

1. Header row: H2 "Payment requests" + "New request" toggle.
2. Create form card (collapsible): Amount, Description, Customer username (optional) + Create.
3. List: cards with reference · amount · description · merchant · status; pending requests addressed to user show "Pay" button.
4. Empty state.

### 3.8 History (`/history`)

1. Header: H2 + caption + filter pill group (All / Received / Sent).
2. Search input (full width) with icon.
3. Mobile cards (sm only): reference pill, status pill, counterparty, amount, date.
4. Desktop table: Reference (gold link) · Counterparty · Type · Amount (tabular, color) · Status badge · Date.
5. Report action hidden behind row hover / detail page.

### 3.9 Transaction detail (`/transactions/[ref]`) [recommended strengthen]

New/refreshed screen:
- Receipt card: reference (mono, large) · status badge · amount (large, signed) · from/to (name + @username) · type · description · currency · created_at · fees (if any).
- Actions: "Report this transaction" (danger ghost), "Copy reference", "Back to history".
- Timeline (optional): Created → Completed with timestamps.

### 3.10 Settings & profile (`/settings`) [recommended new]

Tabs: Profile (name, username, phone, avatar initials), Security (password change, 2FA placeholder, active sessions), Limits (daily send limit, daily receive), Preferences (currency, notifications), Danger zone (delete account). Mobile: accordion instead of tabs.

### 3.11 Merchant overview (`/merchant`)

1. Header: H2 "Merchant dashboard" + "New request" primary.
2. Stat grid (4): Total sales, Completed payments, Pending requests, Paid requests.
3. 2-col: Payment requests list (8) + Customers & suppliers (customers chips, supplier payments list).
4. Full-width "Recent sales" list (10) with links to receipts.
Role gate: individuals redirected to dashboard with info toast.

### 3.12 Merchant requests management (`/merchant/requests`) [recommended new]

Full CRUD: create invoice with line items, due date, customer, optional QR code PNG, share link, mark as paid, cancel/void. Status filters. Download PDF invoice (future).

### 3.13 Customers (`/merchant/customers`)

Table: avatar · name · @username · account type · total paid · last payment · "Send reminder" action. Empty state with illustration.

### 3.14 Suppliers & payouts (`/merchant/suppliers`)

List of suppliers (saved), quick pay form (recipient + amount + reference), recent supplier payments. Confirm screen mandatory.

### 3.15 Sales reports (`/merchant/reports`) [recommended new]

Date range picker, totals (volume, count, avg ticket), breakdown by customer, CSV export. Charts minimal (gold sparkline). Empty state.

### 3.16 Help / Support (`/help`)

FAQ accordion, contact form (subject, message), status of test environment. Trust & security page content.

---

## 4. Reusable component inventory (canonical names)

| Component | File (suggested) | Used by |
|---|---|---|
| `TopNav` | `components/TopNav.tsx` | shell |
| `BottomNav` | `components/BottomNav.tsx` | shell mobile |
| `Footer` | `components/Footer.tsx` | shell |
| `Button` | `components/ui/Button.tsx` | all |
| `Card` | `components/ui/Card.tsx` | all |
| `Badge` | `components/ui/Badge.tsx` | all |
| `Avatar` | `components/ui/Avatar.tsx` | chips, tx |
| `Input`/`Field` | `components/ui/Field.tsx` | forms |
| `Chip` | `components/ui/Chip.tsx` | recipients |
| `TxRow` | `components/ui/TxRow.tsx` | dashboard, history, merchant |
| `StatTile` | `components/ui/StatTile.tsx` | dashboard, merchant |
| `EmptyState` | `components/ui/EmptyState.tsx` | all lists |
| `Skeleton` | `components/ui/Skeleton.tsx` | loading |
| `Modal` | `components/ui/Modal.tsx` | confirms |
| `Toast` | `components/ui/ToastProvider.tsx` | global |
| `Tabs`/`Accordion` | `components/ui/Tabs.tsx` | settings, help |
| `Table` | `components/ui/Table.tsx` | history, customers |
| `PillGroup` | `components/ui/PillGroup.tsx` | filters |
| `CopyField` | `components/ui/CopyField.tsx` | receive |
| `AmountDisplay` | `components/ui/AmountDisplay.tsx` | money anywhere |
| `StatusBadge` map | `lib/status.ts` | badge helper |

Consolidation note: today's code has many inline Tailwind classes; these should be extracted into these primitives to keep the system consistent.

---

## 5. Key user flows

### Flow A — First payment (individual)
Register → Email verified (optional) → Dashboard (empty) → Send → search recipient → amount + note → review → confirm → success → view receipt → appears in history & recipient's incoming.

### Flow B — Merchant sale
Merchant logs in → Merchant dashboard → New request (amount, description, customer) → share link/QR → customer pays → status Paid → sales list updates → reports reflect.

### Flow C — Request money
Receive page → create request OR Requests page → create → customer sees pending → Pay → both dashboards update.

### Flow D — Dispute / report
Transaction detail → Report (reason + optional evidence) → admin review → status unchanged (immutable reference preserved).

---

## 6. Responsive behavior matrix

| Pattern | Desktop (≥1024) | Tablet (768–1023) | Mobile (<768) |
|---|---|---|---|
| Top nav | full links | condensed | brand + auth only |
| Bottom nav | hidden | hidden | fixed 5 items |
| History | table | table (horizontal scroll) | stacked cards |
| Dashboard balance | 2/3 + 1/3 rail | stacked | stacked |
| Merchant stats | 4-col | 2-col | 1-col |
| Modals | centered | centered | bottom sheet |
| Touch targets | 36px ok | 40px | 44px min |

---

## 7. Content & microcopy guidelines

- Currency always: `KES 12,480.50`.
- Never say "free money" or obscure test nature.
- Buttons are verbs: "Send money", "Confirm & send", "Create request", "Copy".
- Destructive: "Cancel request", "Log out" (not "Destroy").
- Empty states explain next step, not just "no data".
- Errors: what happened + what to do next. No raw HTTP codes to users.
- References: always copyable, format `LP-XXXXXX`.

---

## 8. Implementation notes for Next.js + Tailwind v4

- Migrate inline hex (e.g. `#8a6d1b`, `#6f5612`, `#d6c38a`, `#efe6c8`, `#f5f0e1`) into design tokens in `globals.css` `@theme` block; prefer utility classes `text-accent`, `bg-accent-soft` over arbitrary values.
- Add missing tokens for gold scale (currently only `--accent` and `--accent-dark`); extend theme.
- Add status color tokens (`--success`, `--warning`, `--danger`, `--info`) to `@theme` so Tailwind generates `bg-success`, `text-danger`, etc.
- Extract primitives listed in §4 into `components/ui/*` for reuse.
- Add `prefers-reduced-motion` guard in globals.css.
- Keep tabular numerals global (`html { font-feature-settings: "tnum" 1; }` already set — retain).
- Add a `lib/status.ts` mapping status → badge variant.
- All money values route through `AmountDisplay` to keep formatting consistent.

---

## 9. Recommended additions vs. current codebase

1. Transaction detail page styling/consolidation (`/transactions/[ref]`).
2. Settings & profile page (not present).
3. Merchant requests management, customers, suppliers, reports pages (partially missing).
4. Standardize auth guard via a `RequireAuth` wrapper instead of per-page localStorage checks.
5. Token storage hardening review (httpOnly cookies preferred for production; out of scope for design but note).
6. Loading skeletons on dashboard/merchant/history.
7. Empty-state components with illustrations.
8. Confirm modals for pay/cancel/delete.
9. Mobile bottom-sheet modals.
10. OG image + favicon polish.

---

## 10. Deliverable index

| File | Purpose |
|---|---|
| `README.md` | Index + how to use |
| `moodboard.html` | Visual moodboard: palette, type, components, screens |
| `design-system.md` | Tokens, typography, layout, components, a11y |
| `site-blueprint.md` | IA, page-by-page layouts, flows, responsive matrix |

Open `moodboard.html` in a browser (or via preview) to view the full visual direction.
