"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { transactions, reports } from "@/lib/api";

export default function HistoryPage() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    (async () => {
      try { setItems(await transactions.list() || []); }
      catch (e: any) { setError(e.message); }
    })();
  }, [router]);

  const me = typeof window !== "undefined" ? localStorage.getItem("me_username") : null;
  const filtered = useMemo(() => {
    return items.filter((t: any) => {
      const q = query.toLowerCase();
      const hit = !q || [t.reference, t.description, t.sender_name, t.recipient_name, t.status]
        .some((v: any) => String(v || "").toLowerCase().includes(q));
      if (!hit) return false;
      if (filter === "in") return t.recipient_username === me;
      if (filter === "out") return t.sender_username === me;
      return true;
    });
  }, [items, query, filter, me]);

  async function report(t: any) {
    const reason = prompt("Reason for report?");
    if (!reason) return;
    const otherId = t.recipient_username !== me ? t.recipient : t.sender;
    try {
      await reports.create({ reported_user: otherId, transaction: t.id, reason });
      alert("Report submitted");
    } catch (e: any) { alert(e.message); }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-800">Transaction history</h2>
          <p className="text-sm text-slate-500">Search, filter and review every payment.</p>
        </div>
        <div className="flex gap-2">
          {(["all", "in", "out"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === f ? "bg-charcoal-800 text-white" : "border border-border-strong text-slate-700 hover:bg-surface-2"}`}
            >
              {f === "all" ? "All" : f === "in" ? "Received" : "Sent"}
            </button>
          ))}
        </div>
      </div>
      <input
        className="w-full rounded-lg border border-border-strong px-4 py-2.5 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
        placeholder="Search by reference, name or status..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {filtered.length === 0 ? (
        <p className="text-slate-500">No transactions match.</p>
      ) : (
        <>
        <div className="space-y-3 sm:hidden">
        {filtered.map((t: any) => {
          const incoming = t.recipient_username === (typeof window !== "undefined" ? localStorage.getItem("me_username") : null);
          return (
            <a key={t.id} href={`/transactions/${t.reference}`} className="block rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-[#2563eb]">{t.reference}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  t.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                  t.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                }`}>{t.status}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{incoming ? `From ${t.sender_name}` : `To ${t.recipient_name}`}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className={`text-lg font-bold tabular-nums ${incoming ? "text-emerald-600" : "text-charcoal-800"}`}>
                  {incoming ? "+" : "-"}{Number(t.amount).toLocaleString()} {t.currency}
                </p>
                <p className="text-xs text-slate-400">{new Date(t.created_at).toLocaleDateString()}</p>
              </div>
            </a>
          );
        })}
      </div>
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:block">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Counterparty</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t: any) => {
                const incoming = t.recipient_username === me;
                return (
                  <tr key={t.id} className="hover:bg-surface-2">
                    <td className="px-4 py-3 font-mono text-xs"><a href={`/transactions/${t.reference}`} className="text-[#2563eb] hover:text-[#2563eb]">{t.reference}</a></td>
                    <td className="px-4 py-3">{incoming ? t.sender_name : t.recipient_name}</td>
                    <td className="px-4 py-3 text-slate-500">{t.transaction_type.replace("_", " ")}</td>
                    <td className={`px-4 py-3 text-right font-semibold tabular-nums ${incoming ? "text-emerald-600" : "text-charcoal-800"}`}>
                      {incoming ? "+" : "-"}{Number(t.amount).toLocaleString()} {t.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        t.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                        t.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                      }`}>{t.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-slate-500">{new Date(t.created_at).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
}
