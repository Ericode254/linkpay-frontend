"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { wallet, requests, transactions } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

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
        const [wd, txs, rqs] = await Promise.all([wallet.overview(), transactions.list(), requests.list()]);
        setW(wd);
        const username = wd?.username || localStorage.getItem("me_username") || "";
        setMe(username);
        if (wd?.username) localStorage.setItem("me_username", wd.username);
        setIncoming((txs || []).filter((t: any) => t.recipient_username === username));
      } catch {}
    })();
  }, [router]);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal-900">Receive money</h2>
        <Link href="/dashboard" className="text-sm font-medium text-charcoal-500 hover:text-charcoal-700">← Back to dashboard</Link>
      </div>

      <Card variant="tinted" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="text-6xl">📥</span>
        </div>
        <div className="relative space-y-5">
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Share these details to get paid</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border-strong bg-surface px-4 py-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Username</p>
                <p className="font-semibold text-charcoal-900">@{w?.username || me}</p>
              </div>
              <button
                onClick={() => copy(w?.username || me || "")}
                className="flex items-center gap-1 rounded-lg border border-border-strong px-3 py-2 text-sm font-medium text-[#2563eb] transition hover:bg-gold-50 hover:text-[#2563eb]"
              >
                {copied ? "✅ Copied" : "Copy"}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border-strong bg-surface px-4 py-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Wallet ID</p>
                <p className="font-mono text-sm font-semibold text-charcoal-900">{w?.public_id}</p>
              </div>
              <button
                onClick={() => copy(w?.public_id || "")}
                className="flex items-center gap-1 rounded-lg border border-border-strong px-3 py-2 text-sm font-medium text-[#2563eb] transition hover:bg-gold-50 hover:text-[#2563eb]"
              >
                {copied ? "✅ Copied" : "Copy"}
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Payers can find you by username or wallet ID on LinkPay. Test environment only.
          </p>
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={() => router.push("/requests")}>
              Create a payment request →
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-charcoal-900">Recent incoming payments</h3>
        </div>
        {incoming.length === 0 ? (
          <div className="py-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl mb-3">📭</div>
            <p className="text-sm font-semibold text-charcoal-900">No incoming payments yet</p>
            <p className="mt-1 text-sm text-muted">When someone pays you, it will appear here.</p>
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-border">
            {incoming.slice(0, 8).map((t: any) => (
              <li key={t.id} className="flex items-center justify-between py-3 -mx-2 px-2 rounded-md hover:bg-surface-2 transition">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-soft text-success text-xs font-bold">
                    ↓
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal-900">{t.sender_name}</p>
                    <p className="text-xs text-muted">{new Date(t.created_at).toLocaleDateString()} · {t.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success tabular-nums">+{Number(t.amount).toLocaleString()} {t.currency}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
