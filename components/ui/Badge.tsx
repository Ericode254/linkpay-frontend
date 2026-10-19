import { cn } from "@/lib/utils";

export type BadgeVariant = "success" | "warn" | "danger" | "info" | "neutral" | "gold";

export function Badge({
  variant = "neutral",
  className,
  children,
  dot = false,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant; dot?: boolean }) {
  const map: Record<BadgeVariant, string> = {
    success: "bg-success-soft text-success",
    warn: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
    info: "bg-info-soft text-info",
    neutral: "bg-surface-2 text-charcoal-600 border border-border",
    gold: "bg-gold-50 text-gold-700 border border-gold-200",
  };
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", map[variant], className)}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
