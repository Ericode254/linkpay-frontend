import { cn } from "@/lib/utils";

export type CardVariant = "surface" | "elevated" | "tinted" | "dark";

export function Card({
  variant = "surface",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  const map: Record<CardVariant, string> = {
    surface: "bg-surface border border-border shadow-sm hover:shadow-md",
    elevated: "bg-surface border border-transparent shadow-md",
    tinted: "bg-gradient-to-b from-gold-50 to-white border border-gold-200 shadow-sm",
    dark: "bg-gradient-to-br from-charcoal-900 to-charcoal-700 text-white border-0 shadow-md",
  };
  return <div className={cn("rounded-lg p-5 transition-shadow duration-180", map[variant], className)} {...props} />;
}
