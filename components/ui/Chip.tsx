import { cn } from "@/lib/utils";

export function Chip({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-full bg-surface border border-border text-sm font-medium transition-all duration-150 hover:border-gold-200 hover:bg-gold-50 hover:text-gold-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
