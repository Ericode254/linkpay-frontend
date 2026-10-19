import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

export function Separator({ text, className }: { text?: string; className?: string }) {
  return (
    <div className={cn("relative flex items-center gap-3 my-6", className)}>
      <div className="flex-1 h-[1px] bg-border" />
      {text && <span className="text-xs font-semibold text-muted">{text}</span>}
      <div className="flex-1 h-[1px] bg-border" />
    </div>
  );
}

export function SocialLogin({
  provider,
  icon,
  disabled,
  onClick,
}: {
  provider: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm font-medium text-charcoal-700 transition-all hover:bg-surface-2 hover:border-charcoal-600 disabled:opacity-50 disabled:pointer-events-none",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className="h-5 w-5 flex items-center justify-center">{icon}</span>
      Continue with {provider}
    </button>
  );
}

export function WelcomeCard({
  greeting,
  name,
  message,
  actions,
}: {
  greeting?: string;
  name?: string;
  message?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border-strong bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          {greeting && <p className="text-sm text-muted">{greeting}</p>}
          {name && <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">{name}</h1>}
          {message && <p className="mt-2 text-sm text-muted">{message}</p>}
        </div>
        <div className="flex items-center gap-3">
          <Avatar name={name} size="lg" />
        </div>
      </div>
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-8", className)}>
      {icon && <div className="mb-4 p-3 rounded-xl bg-surface-3 border border-border text-charcoal-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-charcoal-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted max-w-md">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
