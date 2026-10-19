"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { wallet, transactions, requests } from "@/lib/api";

export default function MerchantPage() {
  const router = useRouter();
  const [txs, setTxs] = useState<any[]>([]);
  const [rqs, setRqs] = useState<any[]>([]);
  const [w, setW] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    (async () => {
      try {
        const [wd, t, r] = await Promise.all([wallet.overview(), transactions.list(), requests.list()]);
        setW(wd); setTxs(t || []); setRqs(r || []);
      } catch (e: any) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [router]);

  if (loading) return <p className="text-muted">Loading merchant dashboard…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const me = w?.username || (typeof window !== "undefined" ? localStorage.getItem("me_username") : null);
  const sales = txs.filter((t: any) => t.recipient_username === me && t.status === "completed");
  const totalSales = sales.reduce((s: number, t: any) => s + Number(t.amount), 0);
  const pendingReqs = rqs.filter((r: any) => r.status === "pending");
  const paidReqs = rqs.filter((r: any) => r.status === "paid");
  const supplierPayments = txs.filter((t: any) => t.sender_username === me && t.status === "completed");

  const customers = Array.from(new Set(sales.map((t: any) => t.sender_username))).slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Merchant dashboard</h2>
        <a href="/requests" className="rounded-lg bg-charcoal-800 px-4 py-2 text-sm font-semibold text-white hover:bg-charcoal-700">New request</a>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Total sales" value={`${Number(totalSales).toLocaleString()} ${w?.currency}`} />
        <Stat label="Completed payments" value={sales.length} />
        <Stat label="Pending requests" value={pendingReqs.length} />
        <Stat label="Paid requests" value={paidReqs.length} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Payment requests</h3>
          {rqs.length === 0 ? <p className="mt-3 text-sm text-slate-500">No requests yet.</p> : (
            <ul className="mt-3 divide-y divide-slate-100">
              {rqs.slice(0, 8).map((r: any) => (
                <li key={r.id} className="py-2 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{r.reference} · {r.amount} {r.currency}</p>
                    <p className="text-xs text-slate-500">{r.description || "No description"} · {r.status}</p>
                  </div>
                  <span className={r.status === "paid" ? "text-emerald-600 text-xs font-semibold" : r.status === "pending" ? "text-amber-600 text-xs font-semibold" : "text-slate-400 text-xs"}>
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Customers & suppliers</h3>
          <div className="mt-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Customers (paid you)</p>
            {customers.length === 0 ? <p className="mt-1 text-sm text-slate-500">None yet.</p> : (
              <div className="mt-1 flex flex-wrap gap-2">
                {customers.map((c: string) => <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-xs">@{c}</span>)}
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Supplier payments (you paid)</p>
            {supplierPayments.length === 0 ? <p className="mt-1 text-sm text-slate-500">None yet.</p> : (
              <ul className="mt-1 divide-y divide-slate-100">
                {supplierPayments.slice(0, 5).map((t: any) => (
                  <li key={t.id} className="py-1.5 text-sm flex justify-between">
                    <span>{t.recipient_name}</span>
                    <span className="text-slate-500">{Number(t.amount).toLocaleString()} {t.currency}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Recent sales</h3>
        {sales.length === 0 ? <p className="mt-3 text-sm text-slate-500">No completed sales yet.</p> : (
          <ul className="mt-3 divide-y divide-slate-100">
            {sales.slice(0, 10).map((t: any) => (
              <li key={t.id} className="py-2">
                <a href={`/transactions/${t.reference}`} className="flex items-center justify-between text-sm hover:text-[#2563eb]">
                  <div>
                    <p className="font-medium">{t.sender_name} <span className="text-slate-400">@{t.sender_username}</span></p>
                    <p className="text-xs text-slate-500">{new Date(t.created_at).toLocaleString()} · {t.reference}</p>
                  </div>
                  <p className="font-semibold text-emerald-600">+{Number(t.amount).toLocaleString()} {t.currency}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
