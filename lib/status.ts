import type { BadgeVariant } from "@/components/ui/Badge";

export function statusVariant(status: string): BadgeVariant {
  const s = (status || "").toLowerCase();
  if (["completed", "paid", "success"].includes(s)) return "success";
  if (["pending", "processing"].includes(s)) return "warn";
  if (["failed", "error", "declined"].includes(s)) return "danger";
  if (["refunded"].includes(s)) return "info";
  return "neutral";
}
