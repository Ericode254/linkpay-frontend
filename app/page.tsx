import Link from "next/link";

export default function Home() {
  return (
    <div className="-mx-4">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/78 to-slate-900/55" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,144,70,0.28),transparent_45%)]" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Testnet demo · Simulated balances · Not real money
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            LinkPay: One network. Many transactions.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            An interoperable wallet network connecting individuals, merchants, freelancers, suppliers and
            service providers through a common transaction experience.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">
            Discover one another, send and receive payments, issue invoices, request money, view transaction
            histories and build repeat business relationships — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg hover:bg-slate-800">
              Get started free
            </Link>
            <Link href="/login" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20">
              Log in
            </Link>
          </div>
          <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { k: "5", v: "Participant groups" },
              { k: "1", v: "Shared transaction experience" },
              { k: "∞", v: "Repeat business relationships" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">{s.k}</p>
                <p className="text-sm text-slate-300">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">What LinkPay does</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-slate-600">
            LinkPay is a proposed interoperable wallet network. Stellar provides blockchain settlement
            capabilities for supported assets, while the application backend manages identity, business logic,
            transaction workflows and records.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Individuals", d: "Pay other users, buy from merchants, receive money, view history and save trusted recipients." },
              { t: "Merchants", d: "Accept payments, issue payment requests, create invoices, pay suppliers and review sales." },
              { t: "Freelancers", d: "Request payment for work, receive earnings, issue invoices and pay collaborators." },
              { t: "Suppliers", d: "Receive payments, maintain customer records and settle workers and distributors." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-900">{c.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">How the network works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Register & identify", d: "Sign up, verify email or phone, create a unique username and choose an account type." },
              { n: "02", t: "Discover", d: "Find participants by username or QR code and build trusted trading relationships." },
              { n: "03", t: "Transact", d: "Send, receive, request money and issue invoices with clear status and references." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#8a6d1b]">{s.n}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Trust, security and transparency</h2>
            <p className="mt-3 text-slate-600">
              Verify recipients before payment, apply transaction limits, protect accounts and provide a way to
              report suspicious activity. Financial records are clear, reference-linked and never silently
              rewritten.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li>• Clear recipient identity before every payment</li>
              <li>• Transaction limits and account protection</li>
              <li>• Immutable references, audit trails and reporting</li>
              <li>• Strong contrast, keyboard navigation and clear errors</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Statuses you can rely on</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Pending", "Completed", "Failed", "Cancelled", "Refunded"].map((s) => (
                <span key={s} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Status is communicated through clear text labels as well as color.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">Roadmap and long-term vision</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: "Release 1 – MVP", d: "Prove the transaction network: registered participants pay one another, confirm receipt and inspect records." },
              { t: "Release 2 – Integrations", d: "Regulated fiat funding, mobile-money integrations and business APIs." },
              { t: "Scale", d: "Cross-border transactions, additional markets and a broader participant network." },
            ].map((r) => (
              <div key={r.t} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{r.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">Built with proven technology</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Next.js for a responsive web application, Django REST Framework and PostgreSQL for identity,
            business logic and records, with Stellar blockchain integration for supported asset settlement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800">Create account</Link>
            <Link href="/login" className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">Log in</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
        LinkPay is a working name. Verify name, domain and trademark availability before committing.
        Test environment — balances are simulated, not real money.
      </footer>
    </div>
  );
}
