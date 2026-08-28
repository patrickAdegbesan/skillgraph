import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-6 py-10 text-center">
      <Icon className="h-6 w-6 text-[var(--muted)]" aria-hidden="true" />
      <p className="text-sm font-medium text-[var(--foreground)]">{title}</p>
      <p className="max-w-sm text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}
