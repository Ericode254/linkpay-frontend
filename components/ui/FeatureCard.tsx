import Link from "next/link";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}) {
  const base = cn(
    "group block rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:border-gold-300 hover:bg-gold-50 hover:-translate-y-1 hover:shadow-md",
    className
  );
  if (!href) {
    return (
      <div className={base}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-charcoal-900">{title}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
    );
  }
  return (
    <Link
      href={href}
      className={base}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 group-hover:bg-gold-600 transition-colors mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-charcoal-900 group-hover:text-charcoal-800 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </Link>
  );
}

export function FeatureGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>{children}</div>
  );
}
