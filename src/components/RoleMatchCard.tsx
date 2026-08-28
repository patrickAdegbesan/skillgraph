import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MatchProgress } from "@/components/MatchProgress";
import { SkillBadge } from "@/components/SkillBadge";
import type { RoleMatchResult } from "@/lib/types/graph";

interface RoleMatchCardProps {
  role: RoleMatchResult;
  featured?: boolean;
}

export function RoleMatchCard({ role, featured = false }: RoleMatchCardProps) {
  return (
    <div
      className={`animate-fade-in-up rounded-[var(--radius-card)] border p-5 transition-shadow hover:shadow-md ${
        featured
          ? "border-[var(--accent)]/40 bg-[var(--accent-soft)]"
          : "border-[var(--border)] bg-[var(--surface)]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {featured ? (
            <span className="mb-1 inline-block rounded-[var(--radius-pill)] bg-[var(--accent)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-foreground)]">
              Best match
            </span>
          ) : null}
          <h3 className="text-base font-semibold text-[var(--foreground)]">{role.title}</h3>
          <p className="text-xs text-[var(--muted)]">{role.seniority} level</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {role.matchPercentage}%
          </p>
          <p className="text-xs text-[var(--muted)]">
            {role.matchedSkillCount} of {role.requiredSkillCount} skills
          </p>
        </div>
      </div>

      <div className="mt-3">
        <MatchProgress percentage={role.matchPercentage} />
      </div>

      {role.matchedSkills.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {role.matchedSkills.map((skill) => (
            <SkillBadge key={skill.id} name={skill.name} variant="matched" />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-xs text-[var(--muted)]">No shared skills yet.</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-[var(--muted)]">
          {role.missingSkillCount === 0
            ? "No missing skills"
            : `${role.missingSkillCount} skill${role.missingSkillCount === 1 ? "" : "s"} to close the gap`}
        </p>
        <Link
          href={`/roles/${role.id}`}
          className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-[var(--foreground)] px-3 py-1.5 text-xs font-medium text-[var(--background)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Explore this role
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
