"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { transactions } from "@/lib/api";

export default function TransactionDetailPage() {
  const [ref, setRef] = useState("");
  const router = useRouter();
  const [t, setT] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    const r = window.location.pathname.split("/").filter(Boolean).pop() || "";
    setRef(r);
    if (!r) return;
    (async () => {
      try {
        setT(await transactions.byRef(r));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [ref, router]);

  if (loading) return <p className="text-muted">Loading receipt…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!t) return <p className="text-slate-500">Transaction not found.</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button onClick={() => router.back()} className="text-sm font-semibold text-[#8a6d1b] hover:underline">← Back</button>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">Transaction</p>
            <h2 className="text-2xl font-bold">{t.reference}</h2>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.status === "completed" ? "bg-emerald-100 text-emerald-700" : t.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
            {t.status}
          </span>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">
          <p className="text-sm text-slate-500">Amount</p>
          <p className="mt-1 text-4xl font-bold tracking-tight">
            {Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xl font-semibold text-slate-500">{t.currency}</span>
          </p>
        </div>

        <dl className="mt-6 divide-y divide-slate-100 text-sm">
          {[
            ["Type", t.transaction_type.replace("_", " ")],
            ["Sender", `${t.sender_name} (@${t.sender_username})`],
            ["Recipient", `${t.recipient_name} (@${t.recipient_username})`],
            ["Date", new Date(t.created_at).toLocaleString()],
            ["Reference", t.reference],
            ["Related invoice", t.invoice_reference || "—"],
            ["Description", t.description || "—"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2">
              <dt className="text-slate-500">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="text-center">
        <button
          onClick={async () => {
            const reason = prompt("Reason for report?");
            if (!reason) return;
            const otherId = t.recipient_username !== localStorage.getItem("me_username") ? t.recipient : t.sender;
            try {
              await (await import("@/lib/api")).reports.create({ reported_user: otherId, transaction: t.id, reason });
              alert("Report submitted");
            } catch (e: any) { alert(e.message); }
          }}
          className="text-sm font-semibold text-red-600 hover:underline"
        >
          Report this transaction
        </button>
      </div>
    </div>
  );
}
