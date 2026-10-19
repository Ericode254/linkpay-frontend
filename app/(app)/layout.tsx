"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import { wallet } from "@/lib/api";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
      return;
    }
    setReady(true);
    wallet
      .overview()
      .then((w: any) => {
        if (w?.username) localStorage.setItem("me_username", w.username);
        if (w?.account_type) localStorage.setItem("me_account_type", w.account_type);
      })
      .catch(() => {});
  }, [router]);

  if (!ready) {
    return (
      <div className="grid gap-6 md:grid-cols-[15rem_1fr]">
        <div className="hidden md:block">
          <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[15rem_1fr]">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="min-w-0 space-y-6 overflow-x-hidden">
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-charcoal-700 shadow-sm transition hover:bg-surface-2"
            aria-label="Open navigation"
          >
            <span aria-hidden>☰</span>
            Menu
          </button>
        </div>
        {children}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <div className="relative h-full w-72 max-w-[80vw] overflow-y-auto bg-surface p-3 shadow-xl">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-500 hover:text-charcoal-900"
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
