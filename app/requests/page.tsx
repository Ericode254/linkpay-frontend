"use client";
import { useEffect, useState } from "react";
import { requests } from "@/lib/api";

export default function RequestsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const res = await requests.list();
      setItems(res || []);
    } catch (e: any) { setError(e.message); }
  }
  useEffect(() => { if (localStorage.getItem("access_token")) load(); else window.location.href="/login"; }, []);

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Payment requests</h2>
        <button onClick={()=>setShowCreate(!showCreate)} className="rounded bg-slate-900 px-3 py-1 text-white hover:bg-slate-800">
          {showCreate ? "Cancel" : "New request"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {showCreate && (
        <form onSubmit={create} className="space-y-3 rounded border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <label className="text-sm">Amount</label>
            <input type="number" className="mt-1 w-full rounded border px-3 py-2" value={amount} onChange={e=>setAmount(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <input className="mt-1 w-full rounded border px-3 py-2" value={description} onChange={e=>setDescription(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Customer username (optional)</label>
            <input className="mt-1 w-full rounded border px-3 py-2" value={customer} onChange={e=>setCustomer(e.target.value)} />
          </div>
          <button disabled={loading} className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50">
            {loading ? "Creating..." : "Create request"}
          </button>
        </form>
      )}
      <div className="space-y-2">
        {items.map((r:any)=>(
          <div key={r.id} className="rounded border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{r.reference} · {r.amount} {r.currency}</p>
                <p className="text-sm text-slate-500">{r.description} · Merchant: {r.merchant_name}</p>
                <p className="text-xs text-slate-400">Status: {r.status}</p>
              </div>
              {r.status === "pending" && r.merchant_username !== (typeof window !== "undefined" ? localStorage.getItem("me_username") : null) && (
                <button onClick={()=>pay(r.reference)} disabled={loading} className="rounded bg-slate-900 px-3 py-1 text-white hover:bg-slate-800 disabled:opacity-50">
                  Pay
                </button>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-500">No payment requests.</p>}
      </div>
    </div>
  );
}
