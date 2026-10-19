"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { transactions, users } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-xl bg-charcoal-800 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-charcoal-700 hover:shadow-lg"
    >
      {children}
    </Link>
  );
}

export default function SendPage() {
  return (
    <Suspense fallback={<p className="text-muted py-8 text-center">Loading…</p>}>
      <SendForm />
    </Suspense>
  );
}

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
  const [showLookup, setShowLookup] = useState(false);

  useEffect(() => {
    const to = params.get("to");
    if (to) setUsername(to);
  }, [params]);

  async function doLookup(q: string) {
    setUsername(q);
    if (q.length < 2) { setLookup([]); setShowLookup(false); return; }
    try {
      const res: any = await users.lookup(q);
      setLookup(res.results || []);
      setShowLookup((res.results || []).length > 0);
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
      <div className="mx-auto max-w-lg">
        <Card variant="tinted" className="text-center">
          <div className="mb-4 p-4 rounded-2xl bg-gold-100 text-gold-700">✅</div>
          <h2 className="text-2xl font-bold text-charcoal-900">Payment sent</h2>
          <p className="mt-2 text-slate-600">Your payment has been submitted successfully.</p>
          <div className="mt-6 rounded-xl border border-border bg-surface p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Reference</span>
              <span className="font-mono font-medium text-charcoal-900">{result.reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Amount</span>
              <span className="font-bold text-charcoal-900">{result.amount} {result.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">To</span>
              <span className="font-medium text-charcoal-900">{result.recipient_name} (@{result.recipient_username})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Status</span>
              <span className="text-success font-medium">{result.status}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <LinkButton href={`/transactions/${result.reference}`}>View receipt</LinkButton>
            <button onClick={() => router.push("/dashboard")} className="rounded-xl border border-border-strong px-4 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:bg-surface-2">
              Back to dashboard
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal-900">Send money</h2>
        <Link href="/dashboard" className="text-sm font-medium text-charcoal-500 hover:text-charcoal-700">← Back to dashboard</Link>
      </div>

      <Card>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Recipient username or name</label>
            <input
              type="text"
              autoComplete="off"
              className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
              value={username}
              onChange={(e) => { setUsername(e.target.value); doLookup(e.target.value); }}
              placeholder="Search by username or name"
            />
            {showLookup && lookup.length > 0 && (
              <ul className="mt-1 rounded-xl border border-border-strong bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                {lookup.map((u: any) => (
                  <li
                    key={u.id}
                    className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-surface-2 border-b border-border/50 last:border-0"
                    onClick={() => { setUsername(u.username); setLookup([]); setShowLookup(false); }}
                  >
                    <Avatar name={u.display_name} username={u.username} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-charcoal-900 leading-tight">{u.display_name}</p>
                      <p className="text-xs text-slate-500">@{u.username} · {u.account_type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Amount (KES)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Description</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this for?"
              />
            </div>
          </div>
          {error && (
            <p className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger flex items-center gap-2">
              <span>⚠</span> {error}
            </p>
          )}
          <div className="mt-6">
            {!confirming ? (
              <Button
                variant="accent"
                size="lg"
                disabled={!username || !amount}
                className="w-full"
                onClick={() => setConfirming(true)}
              >
                Review payment
              </Button>
            ) : (
              <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">To</span>
                  <span className="font-medium text-charcoal-900">@{username}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Amount</span>
                  <span className="font-bold text-charcoal-900">{amount} KES</span>
                </div>
                {description && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Note</span>
                    <span className="text-charcoal-700">{description}</span>
                  </div>
                )}
                <div className="pt-3 flex gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="flex-1"
                    onClick={submit}
                  >
                    {loading ? "Sending…" : "Confirm & send"}
                  </Button>
                  <button
                    onClick={() => setConfirming(false)}
                    className="flex-1 rounded-xl border border-border-strong px-4 py-3 text-sm font-semibold text-charcoal-700 transition hover:bg-surface-2"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
