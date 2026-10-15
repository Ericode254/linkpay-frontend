"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { transactions, users } from "@/lib/api";

function SendForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [lookup, setLookup] = useState<any[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const to = params.get("to");
    if (to) setUsername(to);
  }, [params]);

  async function doLookup(q: string) {
    setUsername(q);
    if (q.length < 2) { setLookup([]); return; }
    try {
      const res: any = await users.lookup(q);
      setLookup(res.results || []);
    } catch {}
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await transactions.transfer({ recipient_username: username, amount, description });
      setResult(res);
      setConfirming(false);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Payment sent</h2>
        <div className="mt-4 space-y-2 text-sm">
          <p><span className="text-slate-500">Reference:</span> {result.reference}</p>
          <p><span className="text-slate-500">Amount:</span> {result.amount} {result.currency}</p>
          <p><span className="text-slate-500">To:</span> {result.recipient_name} (@{result.recipient_username})</p>
          <p><span className="text-slate-500">Status:</span> {result.status}</p>
        </div>
        <div className="mt-5 flex gap-3">
          <LinkButton href={`/transactions/${result.reference}`}>View receipt</LinkButton>
          <button onClick={() => router.push("/dashboard")} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <h2 className="text-2xl font-bold">Send money</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <label className="text-sm font-medium">Recipient</label>
          <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b]" value={username} onChange={(e) => doLookup(e.target.value)} placeholder="Search by username" />
          {lookup.length > 0 && (
            <ul className="mt-1 rounded-lg border border-slate-200 bg-white shadow">
              {lookup.map((u: any) => (
                <li key={u.id} className="cursor-pointer px-3 py-2 hover:bg-slate-50" onClick={() => { setUsername(u.username); setLookup([]); }}>
                  {u.display_name} <span className="text-slate-400">@{u.username}</span> <span className="text-xs text-slate-400">{u.account_type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Amount (KES)</label>
          <input type="number" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b]" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Description (optional)</label>
          <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this for?" />
        </div>
      </div>

      {!confirming ? (
        <button onClick={() => setConfirming(true)} disabled={!username || !amount} className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
          Review payment
        </button>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold">Review</h3>
          <div className="mt-3 space-y-1 text-sm">
            <p><span className="text-slate-500">To:</span> @{username}</p>
            <p><span className="text-slate-500">Amount:</span> {amount} KES</p>
            {description && <p><span className="text-slate-500">Note:</span> {description}</p>}
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={submit} disabled={loading} className="flex-1 rounded-lg bg-slate-900 py-2.5 font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
              {loading ? "Sending…" : "Confirm & send"}
            </button>
            <button onClick={() => setConfirming(false)} className="flex-1 rounded-lg border border-slate-300 py-2.5 font-semibold hover:bg-white">
              Back
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  // eslint-disable-next-line @next/next/no-html-link-for-pages
  return <a href={href} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">{children}</a>;
}


export default function SendPage() {
  return (
    <Suspense fallback={<p className="text-muted">Loading…</p>}>
      <SendForm />
    </Suspense>
  );
}
