"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { wallet, requests, transactions } from "@/lib/api";

export default function ReceivePage() {
  const router = useRouter();
  const [w, setW] = useState<any>(null);
  const [incoming, setIncoming] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [me, setMe] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    (async () => {
      try {
        setMe(localStorage.getItem("me_username") || "");
        const [wd, txs, rqs] = await Promise.all([wallet.overview(), transactions.list(), requests.list()]);
        setW(wd);
        setIncoming((txs || []).filter((t: any) => t.recipient_username === localStorage.getItem("me_username")));
      } catch {}
    })();
  }, [router]);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Receive money</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Share these details to get paid</p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-xs text-slate-500">Username</p>
              <p className="font-semibold">@{w?.username || me}</p>
            </div>
            <button onClick={() => copy(w?.username || me || "")} className="text-sm font-semibold text-[#8a6d1b] hover:text-[#6f5612]">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-xs text-slate-500">Wallet ID</p>
              <p className="font-mono text-sm font-semibold">{w?.public_id}</p>
            </div>
            <button onClick={() => copy(w?.public_id || "")} className="text-sm font-semibold text-[#8a6d1b] hover:text-[#6f5612]">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400">Payers can find you by username or wallet ID on LinkPay. Test environment only.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Recent incoming payments</h3>
        {incoming.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No incoming payments yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {incoming.slice(0, 8).map((t: any) => (
              <li key={t.id} className="py-2">
                <a href={`/transactions/${t.reference}`} className="flex items-center justify-between hover:text-[#8a6d1b]">
                  <div>
                    <p className="text-sm font-medium">{t.sender_name}</p>
                    <p className="text-xs text-slate-500">{new Date(t.created_at).toLocaleDateString()} · {t.reference}</p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-600">+{Number(t.amount).toLocaleString()} {t.currency}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-center">
        <a href="/requests" className="text-sm font-semibold text-[#8a6d1b] hover:underline">Create a payment request →</a>
      </div>
    </div>
  );
}
