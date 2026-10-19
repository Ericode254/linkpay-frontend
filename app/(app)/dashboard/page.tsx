"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { wallet, transactions, requests } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/LayoutUI";
import { Avatar } from "@/components/ui/Avatar";
import { StatCard } from "@/components/ui/StatCard";
import { statusVariant } from "@/lib/status";

const QUICK_ACTIONS = [
  { label: "Send money", href: "/send", icon: "💸", variant: "accent" as const },
  { label: "Receive", href: "/receive", icon: "📥", variant: "secondary" as const },
  { label: "Request", href: "/requests", icon: "📋", variant: "secondary" as const },
  { label: "History", href: "/history", icon: "📜", variant: "ghost" as const },
];

const FILTERS = [
  { key: "all", label: "All transactions" },
  { key: "sent", label: "Sent" },
  { key: "received", label: "Received" },
  { key: "pending", label: "Pending" },
];

function WeeklyChart({ txs, me }: { txs: any[]; me: string | null }) {
  const now = new Date();
  const days = [];
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(d.toDateString());
  }

  const daily: Record<string, { in: number; out: number }> = {};
  days.forEach((ds) => { daily[ds] = { in: 0, out: 0 }; });

  txs.forEach((t) => {
    if (t.status !== "completed") return;
    const ds = new Date(t.created_at).toDateString();
    if (!daily[ds]) return;
    if (t.recipient_username === me) daily[ds].in += Number(t.amount);
    else if (t.sender_username === me) daily[ds].out += Number(t.amount);
  });

  const allValues = Object.values(daily).flatMap((v) => [v.in, v.out]);
  const max = Math.max(...allValues, 1);

  return (
    <Card className="h-64">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-charcoal-900">Weekly activity</h3>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
          <span className="text-xs text-muted">In</span>
          <span className="w-2 h-2 rounded-full bg-charcoal-800 inline-block"></span>
          <span className="text-xs text-muted">Out</span>
        </div>
      </div>
      <div className="flex items-end justify-between h-40 gap-1">
        {days.map((ds, i) => {
          const day = daily[ds];
          const inH = Math.max((day.in / max) * 100, 4);
          const outH = Math.max((day.out / max) * 100, 4);
          const label = labels[i];
          return (
            <div key={ds} className="flex flex-col items-center gap-1.5">
              <div className="flex flex-col gap-1">
                <div
                  className="h-[18px] w-full rounded-t-sm bg-success opacity-60"
                  style={{ height: `${inH}%` }}
                />
                <div
                  className="h-[18px] w-full rounded-b-sm bg-charcoal-800 opacity-60 mt-1"
                  style={{ height: `${outH}%` }}
                />
              </div>
              <span className="text-[10px] text-muted">{label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function AccountLimitsCard({ walletData }: { walletData: any }) {
  const isBusiness = ["merchant", "freelancer", "service_provider", "supplier"].includes(walletData?.account_type || "");
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-charcoal-900">Account & limits</h3>
        <Badge variant={walletData?.is_verified ? "success" : "warn"}>
          {walletData?.is_verified ? "Verified" : "Unverified"}
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Account type</p>
          <p className="mt-1 font-bold text-charcoal-900">{walletData?.account_type?.replace("_", " ") || "Individual"}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Currency</p>
          <p className="mt-1 font-bold text-charcoal-900">{walletData?.currency}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Daily limit</p>
          <p className="mt-1 font-bold text-charcoal-900">KES 50,000</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Monthly limit</p>
          <p className="mt-1 font-bold text-charcoal-900">KES 500,000</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Test environment</p>
          <p className="mt-1 font-bold text-charcoal-900">Simulated</p>
        </div>
        {isBusiness && (
          <div className="rounded-xl border border-border bg-gold-50 p-4">
            <p className="text-xs uppercase tracking-wide text-gold-700">Merchant features</p>
            <p className="mt-1 font-bold text-charcoal-900">Enabled</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function RecentContactsCard({ txs, me }: { txs: any[]; me: string | null }) {
  const contactsMap = new Map<string, { username: string; name: string; in: number; out: number; count: number; last: string }>();
  txs.forEach((t) => {
    if (t.status !== "completed") return;
    const other = t.recipient_username === me ? t.sender_username : t.recipient_username;
    const otherName = t.recipient_username === me ? t.sender_name : t.recipient_name;
    if (!other) return;
    const amt = Number(t.amount);
    const existing = contactsMap.get(other) || { username: other, name: otherName || other, in: 0, out: 0, count: 0, last: t.created_at };
    if (t.recipient_username === me) existing.in += amt;
    else existing.out += amt;
    existing.count += 1;
    if (t.created_at > existing.last) existing.last = t.created_at;
    contactsMap.set(other, existing);
  });
  const contacts = Array.from(contactsMap.values()).sort((a, b) => b.last.localeCompare(a.last)).slice(0, 5);

  if (contacts.length === 0) {
    return (
      <EmptyState
        title="No recent contacts"
        description="Send or receive a payment to start building your contact list."
        icon={<div className="text-2xl">👥</div>}
      />
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-charcoal-900">Recent contacts</h3>
        <Link href="/users/lookup" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
          View all →
        </Link>
      </div>
      <div className="space-y-2">
        {contacts.map((c) => (
          <div
            key={c.username}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-border hover:bg-surface-2 transition"
          >
            <div className="flex items-center gap-3">
              <Avatar name={c.name} username={c.username} size="sm" />
              <div>
                <p className="text-sm font-medium text-charcoal-900 leading-tight">{c.name}</p>
                <p className="text-xs text-slate-500">@{c.username}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-charcoal-900 tabular-nums">{c.count} payments</p>
              <p className="text-xs text-muted">
                {`↓ +${c.in.toLocaleString()} · ↑ ${c.out.toLocaleString()}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TransactionsFilters({ activeFilter, onChange }: { activeFilter: string; onChange: (key: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {FILTERS.map((f) => {
        const active = activeFilter === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              active
                ? "bg-charcoal-800 text-white shadow-sm"
                : "text-charcoal-600 hover:bg-surface-2 hover:border-charcoal-600 border border-transparent"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [walletData, setWalletData] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [pendingReqs, setPendingReqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [shownWelcome, setShownWelcome] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [w, t, r] = await Promise.all([wallet.overview(), transactions.list(), requests.list()]);
      setWalletData(w);
      setTxs(t || []);
      setPendingReqs((r || []).filter((x: any) => x.status === "pending"));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    load();
  }, [router]);

  const me = walletData?.username || (typeof window !== "undefined" ? localStorage.getItem("me_username") : null);
  const accountType = walletData?.account_type || localStorage.getItem("me_account_type") || "individual";
  const isBusiness = ["merchant", "freelancer", "service_provider", "supplier"].includes(accountType);

  useEffect(() => {
    if (walletData?.username && typeof window !== "undefined") {
      localStorage.setItem("me_username", walletData.username);
      localStorage.setItem("me_account_type", walletData.account_type);
    }
  }, [walletData?.username, walletData?.account_type]);

  // Apply filters
  let filteredTxs = txs;
  if (filter === "sent") filteredTxs = txs.filter((t) => t.sender_username === me);
  else if (filter === "received") filteredTxs = txs.filter((t) => t.recipient_username === me);
  else if (filter === "pending") filteredTxs = txs.filter((t) => t.status === "pending");

  const incoming = txs.filter((t: any) => t.recipient_username === me && t.status === "completed");
  const outgoing = txs.filter((t: any) => t.sender_username === me && t.status === "completed");
  const totalIn = incoming.reduce((s, t) => s + Number(t.amount), 0);
  const totalOut = outgoing.reduce((s, t) => s + Number(t.amount), 0);
  const now = new Date();
  const todayPayments = txs.filter((t: any) => t.status === "completed" && new Date(t.created_at).toDateString() === now.toDateString()).length;
  const monthVolume = txs
    .filter((t: any) => {
      const d = new Date(t.created_at);
      return t.status === "completed" && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((s: number, t: any) => s + Number(t.amount), 0);
  const frequentCustomers = Array.from(new Set(incoming.map((t: any) => t.sender_username))).slice(0, 6);
  const frequentRecipients = Array.from(
    new Map(
      txs
        .filter((t: any) => t.recipient_username && t.recipient_username !== me)
        .map((t: any) => [t.recipient_username, { username: t.recipient_username, name: t.recipient_name, count: 0 }])
    ).values()
  ).slice(0, 6);

  const firstTime = txs.length === 0 && !shownWelcome;

  if (loading) {
    return (
      <div className="py-16 text-center text-muted">
        <div className="mx-auto max-w-xs space-y-3">
          <div className="h-3 rounded bg-slate-200 animate-pulse" />
          <div className="h-3 rounded bg-slate-200 animate-pulse w-2/3 mx-auto" />
        </div>
      </div>
    );
  }
  if (error) return <p className="text-danger p-6 text-center">{error}</p>;

  const welcomeMessage = firstTime
    ? "Welcome to LinkPay! Your wallet is ready — send your first payment or request money from a contact."
    : "Good to see you";

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <Card variant="tinted" className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <span className="text-6xl">💳</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm text-muted">{welcomeMessage}</p>
            <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
              {walletData?.display_name}
            </h1>
            <p className="text-sm text-muted flex items-center gap-2">
              <Badge variant={walletData?.is_verified ? "success" : "warn"}>
                {walletData?.is_verified ? "Verified" : "Unverified"}
              </Badge>
              <span>{walletData?.public_id}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className={`rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all shadow-sm ${
                  a.variant === "accent"
                    ? "bg-gradient-to-b from-gold-500 to-gold-600 text-white hover:brightness-105 hover:shadow-md hover:-translate-y-0.5"
                    : a.variant === "secondary"
                    ? "border border-border-strong bg-surface text-charcoal-700 hover:bg-surface-2 hover:border-charcoal-600"
                    : "bg-transparent text-gold-600 hover:bg-gold-50"
                }`}
              >
                {a.icon} {a.label}
              </Link>
            ))}
          </div>
        </div>
      </Card>

      {/* Balance row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          variant="dark"
          className="lg:col-span-2"
          title="Available balance"
          value={`${walletData?.currency} ${Number(walletData?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          subtitle="Test balance (simulated). Not real money."
          icon={<div className="text-2xl">💰</div>}
          trend={{ label: "this month", value: `+${monthVolume.toLocaleString()}`, positive: monthVolume > 0 }}
        />
        <StatCard
          title="Received"
          value={`+${totalIn.toLocaleString()}` + ` ${walletData?.currency}`}
          subtitle={`${incoming.length} payments`}
          icon={<div className="text-2xl">↓</div>}
          trend={{ label: "vs last period", value: "+12%", positive: true }}
        />
        <StatCard
          title="Sent"
          value={`-${totalOut.toLocaleString()}` + ` ${walletData?.currency}`}
          subtitle={`${outgoing.length} payments`}
          icon={<div className="text-2xl">↑</div>}
          trend={{ label: "vs last period", value: "-8%", positive: false }}
        />
      </div>

      {/* Weekly chart + Account limits */}
      <div className="grid gap-6 lg:grid-cols-3">
        <WeeklyChart txs={txs} me={me} />
        <AccountLimitsCard walletData={walletData} />
      </div>

      {isBusiness && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal-900">Business overview</h2>
            <Link href="/merchant" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
              Open merchant dashboard →
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Today's payments</p>
              <p className="mt-1 font-bold tabular-nums text-charcoal-900">{todayPayments}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Monthly volume</p>
              <p className="mt-1 font-bold tabular-nums text-charcoal-900">
                {monthVolume.toLocaleString()} {walletData?.currency}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Outstanding requests</p>
              <p className="mt-1 font-bold tabular-nums text-charcoal-900">{pendingReqs.length}</p>
            </div>
          </div>
          {frequentCustomers.length > 0 && (
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">Frequent customers</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {frequentCustomers.map((c: string) => (
                  <Chip key={c}>
                    <Link href={`/send?to=${encodeURIComponent(c)}`} className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">
                        {c[0]?.toUpperCase()}
                      </span>
                      <span className="font-medium text-charcoal-900">@{c}</span>
                    </Link>
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {frequentRecipients.length > 0 && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal-900">Frequent recipients</h2>
            <Link href="/send" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
              Send to one →
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {frequentRecipients.map((r: any) => (
              <Chip key={r.username}>
                <Link href={`/send?to=${encodeURIComponent(r.username)}`} className="flex items-center gap-2">
                  <Avatar name={r.name} username={r.username} size="sm" />
                  <span className="font-medium text-charcoal-900">{r.name}</span>
                  <span className="text-slate-400">@{r.username}</span>
                </Link>
              </Chip>
            ))}
          </div>
        </Card>
      )}

      {/* Recent contacts */}
      <RecentContactsCard txs={txs} me={me} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-charcoal-900">Recent transactions</h2>
              <p className="text-sm text-muted">{filteredTxs.length} transaction{filteredTxs.length !== 1 ? "s" : ""}</p>
            </div>
            <TransactionsFilters activeFilter={filter} onChange={setFilter} />
          </div>
          {filteredTxs.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              description="Send or receive your first payment to see activity here."
              action={
                <div className="flex flex-col sm:flex-row gap-2 justify-center w-full">
                  <Link href="/send" className="flex-1 sm:flex-initial rounded-xl bg-charcoal-800 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-charcoal-700">
                    Send money
                  </Link>
                  <Link href="/receive" className="flex-1 sm:flex-initial rounded-xl border border-border-strong px-4 py-2.5 text-center text-sm font-semibold text-charcoal-700 hover:bg-surface-2">
                    Receive
                  </Link>
                </div>
              }
            />
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {filteredTxs.slice(0, 8).map((t: any) => (
                <li key={t.id}>
                  <Link
                    href={`/transactions/${t.reference}`}
                    className="flex items-center justify-between gap-3 py-3 -mx-2 px-2 rounded-md hover:bg-surface-2 transition"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                          t.recipient_username === me ? "bg-success-soft text-success" : "bg-surface-2 text-charcoal-600"
                        }`}
                      >
                        {t.recipient_username === me ? "↓" : "↑"}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-charcoal-900">{t.transaction_type.replace("_", " ")}</p>
                        <p className="text-xs text-muted">
                          {t.recipient_username === me ? t.sender_name : t.recipient_name} ·{" "}
                          {new Date(t.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`text-sm font-semibold tabular-nums ${t.recipient_username === me ? "text-success" : "text-charcoal-900"}`}>
                        {t.recipient_username === me ? "+" : "-"}
                        {Number(t.amount).toLocaleString()} {t.currency}
                      </p>
                      <span className={`inline-block mt-0.5 text-xs ${statusVariant(t.status) === "success" ? "text-success" : statusVariant(t.status) === "warn" ? "text-warning" : "text-muted"}`}>
                        {t.status}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              {filteredTxs.length > 8 && (
                <li className="py-3 -mx-2 px-2 text-center">
                  <Link href="/history" className="text-sm font-semibold text-gold-600 hover:text-gold-700">
                    View all {filteredTxs.length} transactions →
                  </Link>
                </li>
              )}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal-900">Pending payment requests</h2>
            <Link href="/requests" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
              Manage →
            </Link>
          </div>
          {pendingReqs.length === 0 ? (
            <EmptyState
              title="No pending requests"
              description="You haven't received any payment requests yet."
              icon={<div className="text-2xl">📭</div>}
              action={
                <div className="flex justify-center w-full">
                  <Link href="/requests" className="rounded-xl border border-border-strong px-4 py-2.5 text-center text-sm font-semibold text-charcoal-700 hover:bg-surface-2">
                    Create request
                  </Link>
                </div>
              }
            />
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {pendingReqs.slice(0, 6).map((r: any) => (
                <li key={r.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-charcoal-900">{r.reference}</p>
                    <p className="text-xs text-muted">{r.merchant_name} · {r.amount} {r.currency}</p>
                  </div>
                  {r.merchant_username !== me && (
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={async () => {
                        try { await requests.pay(r.reference); } catch {}
                        load();
                      }}
                    >
                      Pay
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card variant="tinted">
        <p className="text-sm text-charcoal-900 flex items-center gap-2">
          <span>🔒</span>
          <strong>Security tip:</strong> verify the recipient name and username before authorizing any payment. Report suspicious activity from the transaction detail page.
        </p>
      </Card>
    </div>
  );
}
