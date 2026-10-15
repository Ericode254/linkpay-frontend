"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/api";
import { auth } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "", account_type: "individual", business_name: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res: any = await auth.register(form);
      setTokens(res.access, res.refresh);
      if (res.user?.username) localStorage.setItem("me_username", res.user.username);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[#8a6d1b]">Get started</span>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Create your LinkPay account</h2>
        <p className="mt-3 text-slate-600">
          Join individuals, merchants, freelancers and suppliers transacting in one network.
        </p>
        <div className="mt-6 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">What you get</p>
          <ul className="space-y-1.5">
            <li>• A wallet with a unique public identifier</li>
            <li>• Peer-to-peer and merchant payments</li>
            <li>• invoices and payment requests</li>
            <li>• Clear, tamper-evident transaction history</li>
          </ul>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Username">
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b] focus:ring-2 focus:ring-[#efe6c8]" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} required />
          </Field>
          <Field label="Email">
            <input type="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b] focus:ring-2 focus:ring-[#efe6c8]" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
          </Field>
        </div>
        <Field label="Password">
          <input type="password" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b] focus:ring-2 focus:ring-[#efe6c8]" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
        </Field>
        <Field label="Account type">
          <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b] focus:ring-2 focus:ring-[#efe6c8]" value={form.account_type} onChange={(e)=>setForm({...form,account_type:e.target.value})}>
            <option value="individual">Individual / Customer</option>
            <option value="merchant">Merchant / Small business</option>
            <option value="freelancer">Freelancer</option>
            <option value="service_provider">Service provider</option>
            <option value="supplier">Supplier</option>
          </select>
        </Field>
        {(form.account_type==="merchant"||form.account_type==="supplier") && (
          <Field label="Business name">
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#8a6d1b] focus:ring-2 focus:ring-[#efe6c8]" value={form.business_name} onChange={(e)=>setForm({...form,business_name:e.target.value})} />
          </Field>
        )}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-slate-900 py-2.5 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60">
          {loading ? "Creating account…" : "Sign up"}
        </button>
        <p className="text-center text-sm text-slate-500">
          Already have an account? <a href="/login" className="font-semibold text-[#8a6d1b] hover:text-[#6f5612]">Log in</a>
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {children}
    </label>
  );
}
