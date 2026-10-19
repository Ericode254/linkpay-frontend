"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setTokens } from "@/lib/api";
import { auth } from "@/lib/api";
import { Avatar } from "@/components/ui/Avatar";
import { FormField } from "@/components/ui/FormField";
import { PasswordInput } from "@/components/ui/FormField";
import { PasswordStrength } from "@/components/ui/FormField";

const ACCOUNT_TYPES = [
  { value: "individual", label: "Individual / Customer", desc: "Pay friends, shop, receive money" },
  { value: "merchant", label: "Merchant / Small business", desc: "Accept payments, issue receipts" },
  { value: "freelancer", label: "Freelancer", desc: "Invoice clients, track earnings" },
  { value: "service_provider", label: "Service provider", desc: "Bookings, service payments" },
  { value: "supplier", label: "Supplier / Business network", desc: "B2B payments, distributor payouts" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    account_type: "individual",
    business_name: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-0 rounded-3xl border border-border bg-white p-6 shadow-sm md:grid-cols-2 md:p-10 animate-fade-in-up">
      <div className="hidden md:flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-charcoal-800 text-gold-400 text-xl font-bold">LP</span>
          <span className="text-2xl font-bold text-charcoal-800">LinkPay</span>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gold-500/10 flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-charcoal-900">Create your account</h2>
          <p className="text-slate-600 text-center max-w-sm">
            Join individuals, merchants, freelancers, and suppliers transacting in one connected network.
          </p>
        </div>
        <div className="mt-auto p-6 rounded-2xl border border-border bg-surface-2">
          <p className="text-sm font-semibold text-charcoal-700">🧪 Test environment</p>
          <p className="mt-1 text-xs text-slate-500">Balances are simulated — not real money.</p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold-600">Get started</span>
            <h2 className="text-3xl font-bold text-charcoal-800">Join LinkPay</h2>
            <p className="text-slate-600">
              Create your wallet in under a minute. Choose the account type that fits you best.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <FormField label="Full name" required>
              <input
                type="text"
                autoComplete="name"
                className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Jane Wanjiku"
                required
              />
            </FormField>
            <FormField label="Email" required helper="We'll use this for login and receipts">
              <input
                type="email"
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </FormField>
            <FormField label="Password" required helper="At least 8 characters with a mix of letters and numbers">
              <PasswordInput
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <PasswordStrength password={form.password} />
            </FormField>
            <FormField label="Account type" required>
              <select
                className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                value={form.account_type}
                onChange={(e) => setForm({ ...form, account_type: e.target.value })}
              >
                {ACCOUNT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-muted">{ACCOUNT_TYPES.find((t) => t.value === form.account_type)?.desc}</p>
            </FormField>
            {(form.account_type === "merchant" || form.account_type === "supplier") && (
              <FormField label="Business name">
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                  value={form.business_name}
                  onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                  placeholder="Green Basket Shop"
                />
              </FormField>
            )}
            {error && (
              <p className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger flex items-center gap-2">
                <span>⚠</span> {error}
              </p>
            )}
            <button
              disabled={loading}
              className="w-full rounded-lg bg-charcoal-800 py-3.5 font-bold text-white transition-all hover:bg-charcoal-700 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-gold-600 hover:text-gold-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
