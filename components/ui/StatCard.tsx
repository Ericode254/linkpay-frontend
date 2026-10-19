import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "surface",
  className,
}: {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { label: string; value: string; positive: boolean };
  variant?: "surface" | "elevated" | "tinted" | "dark";
  className?: string;
}) {
  const map: Record<string, string> = {
    surface: "bg-surface border border-border shadow-sm",
    elevated: "bg-surface border border-transparent shadow-sm",
    tinted: "bg-gradient-to-b from-gold-50 to-white border border-gold-200",
    dark: "bg-gradient-to-br from-charcoal-900 to-charcoal-700 text-white border-0",
  };

  const trendColor = trend?.positive ? "text-success" : "text-charcoal-500";

  return (
    <div
      className={cn("rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5", map[variant], className)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-xs uppercase tracking-wider text-muted">{title}</p>
          {trend && (
            <span className={`flex items-center gap-1 text-xs font-medium rounded-full bg-opacity-10 px-2 py-0.5 ${trendColor} ${trend.positive ? "bg-success-soft" : "bg-surface-2"}`}>
              {trend.value} {trend.label}
            </span>
          )}
        </div>
        {icon && <div className="p-2 rounded-lg bg-surface-3 text-charcoal-500">{icon}</div>}
      </div>
      <div className="text-2xl sm:text-3xl font-bold tabular-nums text-charcoal-900">{value}</div>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}
