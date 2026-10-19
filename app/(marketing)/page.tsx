import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

const HERO_STATS: Stat[] = [
  { value: "5", label: "participant types" },
  { value: "∞", label: "connections" },
  { value: "24/7", label: "access" },
];

const FEATURES: Feature[] = [
  {
    icon: "💸",
    title: "Send money",
    description: "Pay anyone on the network by username or public ID — fast, clear, and reference-linked.",
    href: "/register",
  },
  {
    icon: "📥",
    title: "Receive payments",
    description: "Share your LinkPay ID and get paid by individuals, merchants, and businesses.",
    href: "/register",
  },
  {
    icon: "📋",
    title: "Request payments",
    description: "Issue payment requests and invoices, track status, and get notified when paid.",
    href: "/register",
  },
  {
    icon: "🏪",
    title: "Merchant tools",
    description: "Accept customer payments, issue receipts, and manage sales in one dashboard.",
    href: "/business",
  },
  {
    icon: "🔒",
    title: "Secure by design",
    description: "Recipient verification, transaction limits, and audit trails protect every payment.",
    href: "/security",
  },
  {
    icon: "📊",
    title: "Transaction history",
    description: "Complete, filterable records of every payment you send or receive.",
    href: "/register",
  },
];

const STEPS: Step[] = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up in under a minute. Choose your account type — individual, merchant, freelancer, supplier, or service provider.",
  },
  {
    number: "02",
    title: "Discover the network",
    description: "Find people and businesses by username or LinkPay ID, and start building trusted relationships.",
  },
  {
    number: "03",
    title: "Transact with confidence",
    description: "Send, receive, request, and invoice — every payment has a clear status, reference, and receipt.",
  },
];

export default function Home() {
  return (
    <div className="-mx-4">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-9a6d5f26e15d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-30" aria-hidden />
        <div className="absolute -left-20 top-24 h-80 w-80 rounded-full bg-gold-600/20 blur-[100px]" aria-hidden />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-white/10 blur-[100px]" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-sm">
                🧪 Testnet demo — Simulated balances · Not real money
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Move money<br />
                <span className="text-gold-400">on your terms.</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg text-slate-300 leading-relaxed">
                LinkPay connects individuals, merchants, freelancers, suppliers, and service providers on one interoperable wallet network. Send, receive, request, and invoice — every payment clear, reference-linked, and simple.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="rounded-xl bg-gold-500 px-8 py-4 font-bold text-white shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-gold-500/40"
                >
                  Get started — it's free
                </Link>
                <Link
                  href="/how-it-works"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30"
                >
                  How it works
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-gold-300 tabular-nums">{s.value}</p>
                    <p className="mt-1 text-xs text-slate-300">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual / mock product preview */}
            <div className="relative mx-auto max-w-md">
              <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-gold-600/20 blur-[80px]" aria-hidden />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md">
                <div className="rounded-[1.5rem] bg-white p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal-800 text-xs font-bold text-gold-400">LP</span>
                      <span className="text-sm font-bold text-charcoal-900">LinkPay</span>
                    </div>
                    <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold text-gold-700">Testnet</span>
                  </div>
                  <div className="rounded-[1rem] bg-charcoal-800 p-5 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-300">Available demo balance</p>
                      <button className="rounded-full p-1 text-slate-300 hover:text-white transition-colors" aria-label="Toggle balance visibility">👁</button>
                    </div>
                    <p className="mt-2 text-4xl font-bold tabular-nums">KES 24,850.00</p>
                    <p className="mt-1 text-[10px] text-slate-400">Demo data · Not real money</p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button className="rounded-lg bg-gold-500 py-2.5 text-center text-sm font-bold text-charcoal-900 hover:bg-gold-600 transition-colors">Send</button>
                      <button className="rounded-lg border border-white/20 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10 transition-colors">Receive</button>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border bg-surface-2 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">Received today</p>
                      <p className="mt-1 text-sm font-bold text-success">+ KES 1,500</p>
                    </div>
                    <div className="rounded-lg border border-border bg-surface-2 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">Sent today</p>
                      <p className="mt-1 text-sm font-bold text-charcoal-800">− KES 3,200</p>
                    </div>
                  </div>
                  <p className="mt-5 text-xs font-semibold text-charcoal-600">Recent activity</p>
                  <div className="mt-3 space-y-2">
                    {[
                      { name: "Green Basket Shop", detail: "Payment received · Today", amount: "+ KES 1,500", sign: "in" },
                      { name: "Studio Creative", detail: "Service payment · Yesterday", amount: "− KES 2,000", sign: "out" },
                      { name: "Quick Supplies", detail: "Supplier payment · Yesterday", amount: "− KES 850", sign: "out" },
                    ].map((tx) => (
                      <div key={tx.name} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-xs">
                          {tx.sign === "in" ? "↓" : "↑"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-charcoal-800">{tx.name}</p>
                          <p className="text-[10px] text-muted">{tx.detail}</p>
                        </div>
                        <p className={`text-xs font-semibold ${tx.sign === "in" ? "text-success" : "text-charcoal-800"}`}>{tx.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -left-3 bottom-6 rounded-xl border border-border bg-white px-3 py-2 shadow-lg animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <p className="text-[10px] font-semibold text-charcoal-800">Payment completed</p>
                  <p className="text-[10px] text-muted">KES 1,500 · Green Basket Shop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-charcoal-900">Built for every kind of participant</h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              Whether you're paying a friend, running a shop, or invoicing a client, LinkPay works the way you do.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "👤",
                title: "Individuals",
                description: "Pay friends, buy from merchants, receive money, save trusted recipients, and view full history.",
              },
              {
                icon: "🏪",
                title: "Merchants",
                description: "Accept payments, issue receipts and invoices, pay suppliers, and review daily sales.",
              },
              {
                icon: "💼",
                title: "Freelancers",
                description: "Request payment for completed work, issue invoices, and track earnings by client.",
              },
              {
                icon: "🏭",
                title: "Suppliers",
                description: "Receive business payments, maintain customer records, and settle distributors.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-surface-2 p-7 shadow-sm transition-all hover:border-gold-300 hover:-translate-y-1 hover:shadow-md group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 group-hover:bg-gold-600 transition-colors mb-4">
                  <span className="text-xl">{c.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-charcoal-900">{c.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-3 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-charcoal-900">Three steps to your first payment</h2>
            <p className="mt-3 text-muted">
              From sign-up to sent payment in minutes. Everything is clearly labeled and easy to reverse if something looks wrong.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.number} className="relative rounded-2xl border border-border bg-surface p-7 shadow-sm transition-all hover:border-gold-300 hover:shadow-md">
                <div className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold-600 text-white text-xs font-bold shadow-lg shadow-gold-600/30">
                  {s.number}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-charcoal-900">{s.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{s.description}</p>
                {s.number !== "03" && (
                  <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-gold-600">
                    Next step →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-charcoal-600">Encrypted in transit</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-charcoal-600">Recipient verification</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-charcoal-600">Clear audit trail</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-border-strong bg-charcoal-800 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to join the network?</h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto mb-8">
              Create your LinkPay wallet and start sending, receiving, and invoicing today. No setup fees. No hidden charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="rounded-xl bg-gold-500 px-8 py-4 font-bold text-white shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-600 hover:-translate-y-0.5"
              >
                Create free account
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white py-10 text-center text-xs text-slate-400">
        <p>LinkPay is a working name. Verify name, domain and trademark availability before committing.</p>
        <p className="mt-1">Test environment — balances are simulated, not real money.</p>
      </footer>
    </div>
  );
}
