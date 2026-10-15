"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { wallet, transactions, requests } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [walletData, setWalletData] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [pendingReqs, setPendingReqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <div className="py-16 text-center text-slate-500">Loading dashboard…</div>;
  if (error) return <p className="text-red-600">{error}</p>;

  const me = typeof window !== "undefined" ? localStorage.getItem("me_username") : null;
  const isBusiness = ["merchant", "freelancer", "service_provider", "supplier"].includes(walletData?.account_type);
  const incoming = txs.filter((t: any) => t.recipient_username === me && t.status === "completed");
  const outgoing = txs.filter((t: any) => t.sender_username === me && t.status === "completed");
  const totalIn = incoming.reduce((s, t) => s + Number(t.amount), 0);
  const totalOut = outgoing.reduce((s, t) => s + Number(t.amount), 0);
  const now = new Date();
  const todayKey = now.toDateString();
  const todayPayments = txs.filter((t: any) => t.status === "completed" && new Date(t.created_at).toDateString() === todayKey).length;
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

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Good to see you</p>
          <h1 className="text-3xl font-bold text-slate-900">{walletData?.display_name}</h1>
          <p className="text-sm text-slate-500">{walletData?.account_type?.replace("_", " ")} · {walletData?.public_id}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/send" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Send money</Link>
          <Link href="/receive" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Receive</Link>
          <Link href="/requests" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">New request</Link>
        </div>
      </div>

      {/* Balance + activity summary */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm text-slate-500">Available balance</p>
          <p className="mt-1 text-5xl font-bold tracking-tight text-slate-900 tabular-nums">
            {walletData?.currency} {Number(walletData?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-2 text-xs text-slate-400">Test balance (simulated). Not real money.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Received" value={`+${totalIn.toLocaleString()} ${walletData?.currency}`} tone="text-emerald-600" />
            <SummaryTile label="Sent" value={`-${totalOut.toLocaleString()} ${walletData?.currency}`} tone="text-slate-900" />
            <SummaryTile label="Transactions" value={txs.length} tone="text-slate-900" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Account</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Status" value={walletData?.is_verified ? "Verified" : "Unverified"} />
            <Row label="Currency" value={walletData?.currency} />
            <Row label="Public ID" value={walletData?.public_id} mono />
            <Row label="Joined" value={walletData?.created_at ? new Date(walletData.created_at).toLocaleDateString() : "—"} />
          </dl>
          {pendingReqs.length > 0 && (
            <div className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
              {pendingReqs.length} pending payment request{pendingReqs.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {isBusiness && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Business overview</h2>
            <Link href="/merchant" className="text-sm font-semibold text-[#8a6d1b] hover:text-[#6f5612]">Open merchant dashboard</Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Today's payments" value={todayPayments} tone="text-slate-900" />
            <SummaryTile label="Monthly volume" value={`${monthVolume.toLocaleString()} ${walletData?.currency}`} tone="text-slate-900" />
            <SummaryTile label="Outstanding invoices" value={pendingReqs.length} tone="text-slate-900" />
          </div>
          {frequentCustomers.length > 0 && (
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">Frequent customers</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {frequentCustomers.map((c: string) => (
                  <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-xs">@{c}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {frequentRecipients.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Frequent recipients</h2>
            <Link href="/send" className="text-sm font-semibold text-[#8a6d1b] hover:text-[#6f5612]">Send to one</Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {frequentRecipients.map((r: any) => (
              <Link
                key={r.username}
                href={`/send?to=${encodeURIComponent(r.username)}`}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition hover:border-[#d6c38a] hover:bg-[#f5f0e1]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#efe6c8] text-xs font-bold text-[#6f5612]">
                  {r.name?.[0]?.toUpperCase() || r.username[0].toUpperCase()}
                </span>
                <span className="font-medium">{r.name}</span>
                <span className="text-slate-400">@{r.username}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent transactions</h2>
            <Link href="/history" className="text-sm font-semibold text-[#8a6d1b] hover:text-[#6f5612]">View all</Link>
          </div>
          {txs.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No transactions yet. Send or receive your first payment.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {txs.slice(0, 6).map((t: any) => (
                <li key={t.id}>
                  <Link href={`/transactions/${t.reference}`} className="flex items-center justify-between py-3 hover:bg-slate-50 -mx-2 px-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${t.recipient_username === me ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {t.recipient_username === me ? "↓" : "↑"}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{t.transaction_type.replace("_", " ")}</p>
                        <p className="text-xs text-slate-500">{t.recipient_username === me ? t.sender_name : t.recipient_name} · {new Date(t.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold tabular-nums ${t.recipient_username === me ? "text-emerald-600" : "text-slate-900"}`}>
                        {t.recipient_username === me ? "+" : "-"}{Number(t.amount).toLocaleString()} {t.currency}
                      </p>
                      <p className="text-xs text-slate-400">{t.status}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Pending payment requests</h2>
            <Link href="/requests" className="text-sm font-semibold text-[#8a6d1b] hover:text-[#6f5612]">Manage</Link>
          </div>
          {pendingReqs.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No pending requests.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {pendingReqs.slice(0, 6).map((r: any) => (
                <li key={r.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{r.reference}</p>
                    <p className="text-xs text-slate-500">{r.merchant_name} · {r.amount} {r.currency}</p>
                  </div>
                  {r.merchant_username !== me && (
                    <button
                      onClick={async () => {
                        try { await requests.pay(r.reference); } catch {}
                        load();
                      }}
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      Pay
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Security note */}
      <div className="rounded-2xl border border-[#d6c38a] bg-[#f5f0e1] p-5 text-sm text-slate-900">
        <strong>Security tip:</strong> verify the recipient name and username before authorizing any payment. Report suspicious activity from the transaction detail page.
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: any; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className={`font-medium text-slate-900 ${mono ? "font-mono text-xs" : ""}`}>{value ?? "—"}</dd>
    </div>
  );
}

function SummaryTile({ label, value, tone }: { label: string; value: any; tone: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 font-bold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}
