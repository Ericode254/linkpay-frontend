import { cn } from "@/lib/utils";

export function AmountDisplay({
  amount,
  currency = "KES",
  sign,
  className,
  size = "md",
}: {
  amount: number | string;
  currency?: string;
  sign?: "+" | "-" | "auto";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const n = Number(amount);
  const formatted = (isNaN(n) ? "0.00" : n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-2xl", xl: "text-5xl" };
  const resolved =
    sign === "auto" ? (n >= 0 ? "+" : "-") : sign === "+" || sign === "-" ? sign : "";
  const color = resolved === "+" ? "text-success" : resolved === "-" ? "text-charcoal-900" : "";
  return (
    <span className={cn("font-bold tabular-nums tracking-tight", sizes[size], color, className)}>
      {resolved}
      {formatted} {currency}
    </span>
  );
}
