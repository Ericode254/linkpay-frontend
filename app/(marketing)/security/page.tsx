import Link from "next/link";

const items = [
  { t: "Authenticated access", d: "Protected routes require a valid session. Users only see their own wallet and transactions." },
  { t: "Recipient verification", d: "Payments show the recipient identity before authorization and are checked on the backend." },
  { t: "Balance safety", d: "Transfers are validated for sufficient balance and limits, with protected handling of concurrent updates." },
  { t: "Audit trail", d: "Every transaction has a reference, status, timestamp and linked records for reconciliation." },
  { t: "Testnet labeling", d: "Demo balances are always marked as simulated and are not presented as real money." },
  { t: "Separate layers", d: "Blockchain settlement is handled as a separate concern from application records and user experience." },
];

export default function SecurityPage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-charcoal-800 px-6 py-16 text-white md:px-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">Security & trust</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Built to treat payments like they matter.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          LinkPay is designed with clear authorization, validation, reconciliation and audit records so users and businesses can trust payment status and history.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/register" className="rounded-lg bg-gold-600 px-5 py-3 font-bold text-charcoal-900 hover:bg-gold-500">Create account</Link>
          <Link href="/how-it-works" className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20">How it works</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-2">
        <h2 className="text-3xl font-bold text-charcoal-800">Security practices</h2>
        <p className="mt-3 max-w-3xl text-muted">
          The prototype is designed to be safe to demonstrate while clearly distinguishing testnet activity from real financial services.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div key={i.t} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-charcoal-800">{i.t}</h3>
              <p className="mt-2 text-sm text-muted">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-charcoal-800">Testnet transparency</h2>
        <p className="mt-2 text-sm text-muted">
          Demo balances are simulated and clearly labelled. Do not use testnet tokens as real money.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link href="/" className="rounded-lg bg-charcoal-800 px-5 py-3 font-semibold text-white hover:bg-charcoal-700">Back to home</Link>
          <Link href="/login" className="rounded-lg border border-border px-5 py-3 font-semibold text-charcoal-700 hover:bg-surface-2">Log in</Link>
        </div>
      </section>
    </div>
  );
}