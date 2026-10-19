import { cn } from "@/lib/utils";

export function Avatar({
  name,
  username,
  size = "md",
  className,
}: {
  name?: string;
  username?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const initials = (name?.split(" ").map((n) => n[0]).join("") || username?.[0] || "?")
    .toUpperCase()
    .slice(0, 2);

  const sizes: Record<string, string> = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-border-strong bg-surface-2 font-semibold text-charcoal-700 shadow-sm",
        sizes[size],
        className
      )}
      aria-label={name || username || "User avatar"}
    >
      {initials}
    </div>
  );
}
