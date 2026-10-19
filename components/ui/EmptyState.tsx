import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("text-center py-10 px-4", className)}>
      <p className="text-sm font-semibold text-charcoal-700">{title}</p>
      {description && <p className="mt-1 text-sm text-muted max-w-sm mx-auto">{description}</p>}
      {children && <div className="mt-4 flex justify-center gap-2">{children}</div>}
    </div>
  );
}
