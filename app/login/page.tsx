"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/api";
import { auth } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res: any = await auth.login({ email, password });
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
        <span className="text-sm font-semibold uppercase tracking-wider text-[#8a6d1b]">Welcome back</span>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Sign in to LinkPay</h2>
        <p className="mt-3 text-slate-600">
          Access your wallet, send and receive payments, and stay on top of every transaction.
        </p>
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Test environment</p>
          <p className="mt-1">Balances are simulated and clearly labeled. Not real money.</p>
          <p className="mt-2">Demo: <span className="font-mono">alice@test.com</span> / <span className="font-mono">Strong!pass123</span></p>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-[#8a6d1b] focus:ring-2 focus:ring-[#efe6c8]" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input type="password" className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-[#8a6d1b] focus:ring-2 focus:ring-[#efe6c8]" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-slate-900 py-2.5 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-sm text-slate-500">
          New to LinkPay? <a href="/register" className="font-semibold text-[#8a6d1b] hover:text-[#6f5612]">Create an account</a>
        </p>
      </form>
    </div>
  );
}
