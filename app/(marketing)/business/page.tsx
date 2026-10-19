import Link from "next/link";

const features = [
  { t: "Receive payments", d: "Accept payments from customers by username or wallet ID with clear confirmation." },
  { t: "Request money", d: "Create payment requests with descriptions and references for invoices and orders." },
  { t: "Pay suppliers", d: "Settle suppliers, contractors and delivery workers from the same wallet." },
  { t: "Track sales", d: "View transaction history, recent activity and repeat customer relationships." },
];

export default function BusinessPage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-charcoal-800 px-6 py-16 text-white md:px-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">For businesses</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Run everyday payments from one connected business wallet.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          LinkPay helps merchants, freelancers and service providers receive money, pay suppliers and manage transaction records without juggling disconnected tools.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/register" className="rounded-lg bg-gold-600 px-5 py-3 font-bold text-charcoal-900 hover:bg-gold-500">Open a business account</Link>
          <Link href="/login" className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20">Log in</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-2">
        <h2 className="text-3xl font-bold text-charcoal-800">Built for small business reality</h2>
        <p className="mt-3 max-w-3xl text-muted">
          Independent shops, wholesalers, freelancers and service providers need simple tools that work on a phone and keep records tidy.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-lg font-semibold text-charcoal-800">{f.t}</h3>
              <p className="mt-2 text-sm text-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-2">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-charcoal-800">Customers</h3>
            <p className="mt-2 text-sm text-muted">Customers can find your business by username and pay directly into your LinkPay wallet.</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-charcoal-800">Suppliers</h3>
            <p className="mt-2 text-sm text-muted">Pay wholesalers, delivery partners and workers from the same account with transaction references.</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-charcoal-800">Records</h3>
            <p className="mt-2 text-sm text-muted">Every payment has a reference, status and timestamp to support reconciliation and trust.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-charcoal-800">Trusted by the transaction chain</h2>
        <p className="mt-2 text-sm text-muted">Customer to merchant. Merchant to supplier. Supplier to worker. All in one network.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link href="/register" className="rounded-lg bg-charcoal-800 px-5 py-3 font-semibold text-white hover:bg-charcoal-700">Create business account</Link>
          <Link href="/how-it-works" className="rounded-lg border border-border px-5 py-3 font-semibold text-charcoal-700 hover:bg-surface-2">How it works</Link>
        </div>
      </section>
    </div>
  );
}