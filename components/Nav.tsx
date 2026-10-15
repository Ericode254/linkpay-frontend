"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearTokens } from "@/lib/api";

const NAV = [
  { href: "/dashboard", label: "Home" },
  { href: "/send", label: "Send" },
  { href: "/receive", label: "Receive" },
  { href: "/merchant", label: "Merchant" },
  { href: "/history", label: "History" },
];

export default function Nav() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => setAuthed(!!localStorage.getItem("access_token")), []);

  function logout() { clearTokens(); window.location.href = "/"; }

  return (
    <>
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur md:sticky md:top-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-bold text-[#8a6d1b]">LinkPay</Link>
          <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-[#8a6d1b]">{n.label}</Link>
            ))}
            {authed ? (
              <button onClick={logout} className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200">Logout</button>
            ) : (
              <>
                <Link href="/login" className="hover:text-[#8a6d1b]">Login</Link>
                <Link href="/register" className="rounded-lg bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800">Sign up</Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            {authed ? (
              <button onClick={logout} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm">Logout</button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[#8a6d1b]">Login</Link>
                <Link href="/register" className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {authed && (
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="flex min-h-[44px] flex-col items-center justify-center py-2 text-[11px] font-medium text-slate-600 hover:text-[#8a6d1b]">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
      {authed && <div className="h-14 md:hidden" aria-hidden />}
    </>
  );
}
