import { cn } from "@/lib/utils";

export function FormField({
  label,
  error,
  helper,
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  helper?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="relative">{children}</div>
      {error && (
        <p className="text-sm text-danger">
          <span className="font-medium">Error:</span> {error}
        </p>
      )}
      {helper && !error && <p className="text-sm text-muted">{helper}</p>}
    </div>
  );
}

export function PasswordInput({
  value,
  onChange,
  showPassword,
  setShowPassword,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean | ((prev: boolean) => boolean)) => void;
  className?: string;
}) {
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "w-full rounded-lg border border-border-strong px-4 py-3 pr-12 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]",
          className
        )}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={() => setShowPassword((v: boolean) => !v)}
        className="absolute inset-y-0 right-3 my-auto h-8 rounded-lg px-2 text-xs font-medium text-slate-500 transition hover:text-[#2563eb]"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export function PasswordStrength({ password }: { password: string }) {
  const checks = {
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;

  const label =
    score <= 1 ? "Very weak" :
    score === 2 ? "Weak" :
    score === 3 ? "Fair" :
    score === 4 ? "Good" : "Strong";

  const color =
    score <= 1 ? "text-danger" :
    score === 2 ? "text-warning" :
    score === 3 ? "text-gold-600" :
    score === 4 ? "text-gold-600" : "text-success";

  return (
    <div className="mt-1 space-y-1">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-muted">Password strength</span>
        <span className={cn("font-semibold", color)}>{label}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
        {[checks.length, checks.lower, checks.upper, checks.digit, checks.special].map((pass, i) => (
          <div
            key={i}
            className={cn("h-full", pass ? "bg-gold-600" : "bg-surface-3", `w-[20%]`)}
          />
        ))}
      </div>
    </div>
  );
}
