import { ArrowRight, Milestone, Route } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import type { CareerPath } from "@/lib/types/graph";

interface CareerPathVisualizationProps {
  path: CareerPath | null;
  roleTitle: string;
}

export function CareerPathVisualization({ path, roleTitle }: CareerPathVisualizationProps) {
  if (!path) {
    return (
      <EmptyState
        icon={Route}
        title="No short learning path was found"
        description={`SkillGraph couldn't find a nearby skill connection to ${roleTitle} within its current skill graph. This doesn't mean the role is out of reach — just that no short related-skill chain exists yet.`}
      />
    );
  }

  const nodes = [...path.steps.map((step) => step.name), roleTitle];

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--foreground)]">Possible learning connection</p>
        <span className="rounded-[var(--radius-pill)] bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
          {path.hopCount} hop{path.hopCount === 1 ? "" : "s"}
        </span>
      </div>

      <div
        className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
        role="list"
        aria-label={`Skill path toward ${roleTitle}`}
      >
        {nodes.map((label, index) => {
          const isStart = index === 0;
          const isRole = index === nodes.length - 1;
          return (
            <div key={`${label}-${index}`} className="flex items-center gap-2 sm:gap-3">
              <div
                role="listitem"
                className="animate-fade-in-up flex items-center gap-2 rounded-[var(--radius-card)] border px-3 py-2 text-sm font-medium"
                style={{
                  animationDelay: `${index * 90}ms`,
                  borderColor: isRole ? "transparent" : "var(--border)",
                  background: isRole
                    ? "var(--accent)"
                    : isStart
                      ? "var(--accent-soft)"
                      : "var(--surface-muted)",
                  color: isRole ? "var(--accent-foreground)" : "var(--foreground)",
                }}
              >
                {isRole ? <Milestone className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                {label}
              </div>
              {index < nodes.length - 1 ? (
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-[var(--muted)] sm:rotate-0"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        This traces related skills already in SkillGraph — it represents a possible route to
        explore, not a guaranteed outcome or a substitute for real learning and practice.
      </p>
    </div>
  );
}
