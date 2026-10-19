import Link from "next/link";

const steps = [
  { n: "01", t: "Register & identify", d: "Create an account, choose whether you are an individual, merchant, freelancer or supplier, and get a unique LinkPay identifier." },
  { n: "02", t: "Discover", d: "Find people and businesses by username or QR code, and build trusted trading relationships." },
  { n: "03", t: "Transact", d: "Send, receive and request money with clear amounts, references, receipts and statuses." },
  { n: "04", t: "Track", d: "Review every payment, reconcile balances and keep a transparent history of business activity." },
];

export default function HowItWorksPage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-charcoal-800 px-6 py-16 text-white md:px-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">How LinkPay works</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">One connected network for the transactions that keep everyday commerce moving.</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          LinkPay connects individuals, merchants, freelancers, suppliers and service providers through identifiable wallets and a shared transaction experience.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/register" className="rounded-lg bg-gold-600 px-5 py-3 font-bold text-charcoal-900 hover:bg-gold-500">Get started</Link>
          <Link href="/login" className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20">Log in</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-2">
        <h2 className="text-3xl font-bold text-charcoal-800">Four simple steps</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="text-2xl font-bold text-gold-600">{s.n}</p>
              <h3 className="mt-3 text-lg font-semibold text-charcoal-800">{s.t}</h3>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-2">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-charcoal-800">Payments create relationships</h3>
            <p className="mt-3 text-sm text-muted">
              A customer pays a merchant, the merchant pays a supplier, and the supplier pays a worker. Each payment becomes part of one transparent history instead of scattered screenshots and manual records.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-charcoal-800">Clear statuses</h3>
            <p className="mt-3 text-sm text-muted">
              Every transaction shows pending, completed, failed or cancelled with references and timestamps, so people and businesses always know what happened.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-charcoal-800">Ready to try the testnet demo?</h2>
        <p className="mt-2 text-sm text-muted">Balances are simulated and clearly labelled. Not real money.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link href="/register" className="rounded-lg bg-charcoal-800 px-5 py-3 font-semibold text-white hover:bg-charcoal-700">Create account</Link>
          <Link href="/login" className="rounded-lg border border-border px-5 py-3 font-semibold text-charcoal-700 hover:bg-surface-2">Log in</Link>
        </div>
      </section>
    </div>
  );
}