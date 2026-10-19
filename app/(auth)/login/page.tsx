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
import { SocialLogin } from "@/components/ui/LayoutUI";
import { Separator } from "@/components/ui/LayoutUI";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      setError(err.message || "Login failed. Please try again.");
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
            <div className="w-32 h-32 rounded-full bg-gold-500/10 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full border-4 border-gold-500/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-charcoal-800">👋</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-charcoal-900">Welcome back</h2>
          <p className="text-slate-600 text-center max-w-sm">
            Sign in to access your wallet, send and receive payments, and review your transaction history.
          </p>
        </div>
        <div className="mt-auto p-6 rounded-2xl border border-border bg-surface-2">
          <p className="text-sm font-semibold text-charcoal-700">🧪 Test environment</p>
          <p className="mt-1 text-xs text-slate-500">Balances are simulated — not real money.</p>
          <p className="mt-2 flex items-center gap-1 text-xs font-mono text-charcoal-600">
            Demo: <span className="text-charcoal-900">alice@test.com</span> &nbsp; / &nbsp; <span className="text-charcoal-900">Strong!pass123</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold-600">Sign in</span>
            <h2 className="text-3xl font-bold text-charcoal-800">Access your LinkPay wallet</h2>
            <p className="text-slate-600">
              Enter your email and password to continue.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <FormField label="Email" required>
              <input
                type="email"
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-border-strong px-4 py-3 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </FormField>
            <FormField label="Password" required>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </FormField>
            {error && (
              <p className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger flex items-center gap-2">
                <span>⚠</span> {error}
              </p>
            )}
            <button
              disabled={loading}
              className="w-full rounded-lg bg-charcoal-800 py-3.5 font-bold text-white transition-all hover:bg-charcoal-700 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <Separator text="Or continue with" />
          <div className="grid grid-cols-2 gap-3">
            <SocialLogin
              provider="Google"
              icon={<svg className="text-charcoal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09zM12 4.94c-3.66 0-6.63 2.66-6.99 6.04l-5.49.05v1.64h6.03l.29-1.64h2.88l.29 1.64h3.51c.36-2.15.64-4.38.64-6.04zM2.58 14.56v-2.04l6.76-1.03 1.93 5.37H7.32zM12 19.44c-3.66 0-6.63-2.66-6.99-6.04l5.49-.05v-1.64h-2.88l-.29 1.64h-3.51c-.36 2.15-.64 4.38-.64 6.04zM19.32 16.47c0-1.74-.2-3.48-.64-5.19l3.56-2.78c.77 1.48 1.21 3.15 1.21 5.02 0 1.17-.09 2.32-.26 3.47h-3.37c-.28-.43-.47-.94-.5-1.49H17.2v-.63h-1.82l-.07-.32c-.01-.06-.03-.11-.05-.17l-1.48-4.22h-2.37v-1.64h2.78l1.03-2.87H20.4c-1.15 2.42-3.18 4.06-5.71 4.06z" /></svg>}
              disabled
              onClick={() => {}}
            />
            <SocialLogin
              provider="Apple"
              icon={<svg className="text-charcoal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.29 0H4.71C2.11 0 0 2.11 0 4.71v14.58C0 21.89 2.11 24 4.71 24h14.58c2.6 0 4.71-2.11 4.71-4.71V4.71C24 2.11 21.89 0 19.29 0zm-3.96 17.76c-.51 0-1-.12-1.48-.37-.53-.31-.92-.98-1.13-1.77-.27-1.06-.35-2.27-.24-3.59l.01-.24.01-.24c0-.18-.02-.36-.06-.53-.08-.33-.26-.64-.54-.9-.37-.35-.91-.54-1.54-.54-1.04 0-1.84.38-2.32 1.03-.57.77-.85 1.72-.85 2.79 0 1.2.25 2.36.74 3.45.29.64.68 1.14 1.19 1.5.56.4 1.26.64 2.1.64.53 0 1-.13 1.44-.4.46-.28.84-.71 1.11-1.3.24-.52.38-1.15.38-1.84 0-.27-.03-.54-.08-.81-.04-.17-.12-.33-.19-.49l-.17-.32c-.17-.31-.47-.54-.89-.68-.5-.16-1.09-.15-1.69.01zm-.48-6.5c.08.28.13.58.13.91 0 .67-.17 1.28-.5 1.81-.24.4-.6.7-1.07.9-.65.27-1.43.4-2.33.4s-1.68-.13-2.33-.4c-.47-.2-.83-.5-1.07-.9-.33-.53-.5-1.14-.5-1.81 0-.33.05-.63.13-.91.08-.26.21-.5.38-.71.24-.31.62-.54 1.1-.68.55-.17 1.2-.16 1.83.02.44.12.82.33 1.11.62.21.21.35.52.42.84zm5.44-1.9c0 .26-.03.51-.08.75-.04.17-.12.33-.19.49l-.17.32c-.17.31-.47.54-.89.68-.5.16-1.09.15-1.69-.01-.43-.11-.81-.34-1.1-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68-.55-.17-1.2-.16-1.83.02-.44.12-.82.33-1.11.62-.21.21-.35.52-.42.84-.08.26-.21.5-.38.71-.24.31-.62.54-1.1.68-.55.17-1.2.16-1.83-.02-.44-.12-.82-.33-1.11-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68-.55.17-1.2.16-1.83-.02-.44-.12-.82-.33-1.11-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68-.55.17-1.2.16-1.83-.02-.44-.12-.82-.33-1.11-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68-.55-.17-1.2-.16-1.83-.02-.44-.12-.82-.33-1.11-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68-.55-.17-1.2-.16-1.83-.02-.44-.12-.82-.33-1.11-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68-.55-.17-1.2-.16-1.83-.02-.44-.12-.82-.33-1.11-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68-.55-.17-1.2-.16-1.83-.02-.44-.12-.82-.33-1.11-.62-.21-.21-.35-.52-.42-.84-.08-.26-.21-.5-.38-.71-.24-.31-.62-.54-1.1-.68z" /></svg>}
              disabled
              onClick={() => {}}
            />
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-center text-sm text-slate-500">
            New to LinkPay?{" "}
            <Link href="/register" className="font-semibold text-gold-600 hover:text-gold-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
