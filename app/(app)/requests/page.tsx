"use client";
import { useEffect, useState } from "react";
import { requests } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/LayoutUI";

export default function RequestsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState("");

  async function load() {
    try {
      const res = await requests.list();
      setItems(res || []);
    } catch (e: any) { setError(e.message); }
  }
  useEffect(() => {
    setMe(localStorage.getItem("me_username") || "");
    if (localStorage.getItem("access_token")) load();
    else window.location.href = "/login";
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await requests.create({ amount, description, customer_username: customer || undefined });
      setAmount(""); setDescription(""); setCustomer(""); setShowCreate(false);
      await load();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function pay(ref: string) {
    setLoading(true);
    try {
      await requests.pay(ref);
      await load();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900">Payment requests</h2>
          <p className="text-sm text-muted">Create and manage payment requests to collect money from others.</p>
        </div>
        <Button variant="accent" size="sm" onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Cancel" : "New request"}
        </Button>
      </div>

      {error && (
        <p className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger flex items-center gap-2">
          <span>⚠</span> {error}
        </p>
      )}

      {showCreate && (
        <Card>
          <form onSubmit={create} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Amount (KES)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Description</label>
                <input
                  className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Web design deposit"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Customer username (optional)</label>
              <input
                className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="@johndoe"
              />
            </div>
            <div className="pt-2 flex gap-3">
              <Button variant="primary" size="sm" disabled={loading} onClick={create}>
                {loading ? "Creating…" : "Create request"}
              </Button>
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-lg border border-border-strong px-3 py-2 text-sm font-medium text-charcoal-700 transition hover:bg-surface-2">
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((r) => (
            <div key={r.id} className="rounded-xl border border-border-strong bg-surface p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-charcoal-600">
                    {r.reference?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal-900">{r.reference}</p>
                    <p className="text-xs text-muted">{r.description} · Merchant: {r.merchant_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-charcoal-900 tabular-nums">{r.amount} {r.currency}</p>
                  <span className={`inline-block mt-1 text-xs font-medium rounded-full px-2 py-0.5 ${
                    r.status === "pending" ? "bg-warning-soft text-warning" :
                    r.status === "paid" || r.status === "completed" ? "bg-success-soft text-success" :
                    r.status === "failed" || r.status === "declined" ? "bg-danger-soft text-danger" :
                    "bg-surface-2 text-charcoal-600"
                  }`}>
                    {r.status}
                  </span>
                </div>
              </div>
              {r.status === "pending" && r.merchant_username !== me && (
                <div className="mt-3 flex justify-end">
                  <Button variant="accent" size="sm" disabled={loading} onClick={() => pay(r.reference)}>
                    Pay request
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <EmptyState
            title="No payment requests yet"
            description="Create a payment request to ask someone to pay you, or wait for others to send you requests."
            icon={<div className="text-3xl">📋</div>}
            action={
              <div className="flex justify-center w-full">
                <Button variant="ghost" size="sm" onClick={() => setShowCreate(true)}>
                  Create first request
                </Button>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
