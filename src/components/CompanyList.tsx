import { Building2 } from "lucide-react";

import type { CompanyNode } from "@/lib/types/graph";

export function CompanyList({ companies }: { companies: CompanyNode[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {companies.map((company) => (
        <li
          key={company.id}
          className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-muted)] text-[var(--muted)]">
            <Building2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">{company.name}</p>
            <p className="text-xs text-[var(--muted)]">{company.industry}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
