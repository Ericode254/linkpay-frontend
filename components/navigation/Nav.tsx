"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clearTokens } from "@/lib/api";
import { Avatar } from "@/components/ui/Avatar";

const APP_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/send", label: "Send", icon: "💸" },
  { href: "/receive", label: "Receive", icon: "📥" },
  { href: "/requests", label: "Requests", icon: "📋" },
  { href: "/merchant", label: "Merchant", icon: "🏪" },
  { href: "/history", label: "History", icon: "📜" },
];

const PUBLIC_NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/business", label: "For business" },
  { href: "/security", label: "Security" },
];

export default function Nav() {
  const [authed, setAuthed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setAuthed(!!localStorage.getItem("access_token"));
    setUserName(localStorage.getItem("me_username") || "");
  }, [pathname]);

  function logout() {
    clearTokens();
    setProfileOpen(false);
    window.location.href = "/";
  }

  return (
    <>
      <header className="border-b border-border bg-white/90 backdrop-blur-md md:sticky md:top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-charcoal-800">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal-800 text-gold-400 shadow-lg shadow-charcoal-800/20">
              LP
            </span>
            <span className="text-balance">LinkPay</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal-600 md:flex">
            {(!authed ? PUBLIC_NAV : []).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="transition-colors hover:text-gold-600"
              >
                {n.label}
              </Link>
            ))}
            {authed ? (
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="relative flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-3 py-1.5 text-charcoal-700 transition-all hover:bg-gold-50 hover:border-gold-300"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <Avatar name={userName} size="sm" />
                <span className="hidden sm:inline">{userName || "Account"}</span>
                <svg className="h-4 w-4 shrink-0 text-charcoal-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <>
                <Link href="/login" className="transition-colors hover:text-gold-600">Login</Link>
                <Link href="/register" className="rounded-lg bg-charcoal-800 px-4 py-1.5 text-white transition-all hover:bg-charcoal-700 hover:shadow-lg">Sign up</Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {authed ? (
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="relative rounded-lg border border-border-strong bg-surface px-3 py-1.5 text-sm text-charcoal-700 transition-all hover:bg-gold-50 hover:border-gold-300"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <Avatar name={userName} size="sm" />
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[#2563eb]">Login</Link>
                <Link href="/register" className="rounded-lg bg-charcoal-800 px-3 py-1.5 text-xs text-white transition-all hover:bg-charcoal-700">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {authed && (
        <>
          {/* Mobile bottom nav */}
          <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur md:hidden">
            <div className="grid grid-cols-5">
              {APP_NAV.map((n) => {
                const active = pathname === n.href || pathname?.startsWith(n.href + "/");
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 text-[10px] font-semibold transition-colors ${
                      active ? "text-[#2563eb]" : "text-charcoal-500 hover:text-[#2563eb]"
                    }`}
                  >
                    <span>{n.icon}</span>
                    <span>{n.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Profile dropdown */}
          {profileOpen && (
            <div className="fixed inset-0 z-50">
              <button
                onClick={() => setProfileOpen(false)}
                className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm transition-opacity"
                aria-label="Close profile menu"
              />
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border-strong bg-surface p-3 shadow-xl z-50">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-2 cursor-default">
                  <Avatar name={userName} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal-900">{userName || "Account"}</p>
                    <p className="text-xs text-muted">{localStorage.getItem("me_account_type") || "Individual"}</p>
                  </div>
                </div>
                <div className="border-t border-border mt-2"></div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-700 transition-all hover:bg-surface-2 hover:text-charcoal-900"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
