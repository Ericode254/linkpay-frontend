import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "success" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 ease-out active:translate-y-px focus:outline-none focus:ring-2 focus:ring-gold-100 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-charcoal-800 text-white hover:bg-charcoal-900 hover:shadow-md",
  accent: "bg-gradient-to-b from-gold-500 to-gold-600 text-white shadow-sm hover:brightness-105",
  secondary: "bg-surface text-charcoal-700 border border-border-strong hover:bg-surface-2 hover:border-charcoal-600",
  ghost: "bg-transparent text-gold-600 hover:bg-gold-50",
  success: "bg-success text-white hover:brightness-95",
  danger: "bg-danger text-white hover:brightness-95",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-xs",
  md: "px-4 py-2.5 text-sm rounded-sm",
  lg: "px-6 py-3 text-base rounded-md",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
