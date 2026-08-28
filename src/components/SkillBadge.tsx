import { Sparkles } from "lucide-react";

export type SkillBadgeVariant = "default" | "matched" | "missing" | "evidenced";

interface SkillBadgeProps {
  name: string;
  detail?: string;
  variant?: SkillBadgeVariant;
}

const VARIANT_CLASSES: Record<SkillBadgeVariant, string> = {
  default: "bg-[var(--surface-muted)] text-[var(--foreground)] border-[var(--border)]",
  matched: "bg-[var(--success-soft)] text-[var(--success)] border-transparent",
  missing: "bg-[var(--warning-soft)] text-[var(--warning)] border-transparent",
  evidenced: "bg-[var(--accent-soft)] text-[var(--accent)] border-transparent",
};

export function SkillBadge({ name, detail, variant = "default" }: SkillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium ${VARIANT_CLASSES[variant]}`}
    >
      {variant === "evidenced" ? <Sparkles className="h-3 w-3" aria-hidden="true" /> : null}
      {name}
      {detail ? <span className="text-[var(--muted)]">· {detail}</span> : null}
    </span>
  );
}
