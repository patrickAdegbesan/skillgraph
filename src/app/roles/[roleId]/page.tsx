"use client";

import { useParams } from "next/navigation";
import { Building2, GitBranch, ListChecks, TriangleAlert } from "lucide-react";

import { CareerPathVisualization } from "@/components/CareerPathVisualization";
import { CompanyList } from "@/components/CompanyList";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { CardSkeleton, TextSkeleton } from "@/components/LoadingSkeleton";
import { MatchProgress } from "@/components/MatchProgress";
import { SkillBadge } from "@/components/SkillBadge";
import { SkillGapList } from "@/components/SkillGapList";
import { useApiResource } from "@/lib/api/useApiResource";
import { DEFAULT_DEVELOPER_ID } from "@/lib/constants";
import type { RoleDetailForDeveloper } from "@/lib/types/graph";

export default function RoleDetailPage() {
  const params = useParams<{ roleId: string }>();
  const roleId = params.roleId;

  const detail = useApiResource<RoleDetailForDeveloper>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/roles/${roleId}`,
  );

  if (detail.status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <TextSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (detail.status === "error") {
    return (
      <ErrorState
        title={detail.httpStatus === 404 ? "Role not found" : undefined}
        message={detail.message}
        onRetry={detail.httpStatus === 404 ? undefined : detail.refetch}
      />
    );
  }

  const { role, requiredSkills, matchedSkills, missingSkills, matchPercentage, companies, careerPath } =
    detail.data;
  const matchedIds = new Set(matchedSkills.map((skill) => skill.id));

  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
              {role.title}
            </h1>
            <p className="text-sm text-[var(--muted)]">{role.seniority} level</p>
          </div>
          <p className="text-3xl font-bold tracking-tight text-[var(--accent)]">
            {matchPercentage}%
          </p>
        </div>
        <div className="mt-4">
          <MatchProgress percentage={matchPercentage} size="lg" />
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">
          You already match {matchedSkills.length} of {requiredSkills.length} required skills.
        </p>
      </header>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          <ListChecks className="h-4 w-4 text-[var(--success)]" aria-hidden="true" />
          Matched skills
        </h2>
        {matchedSkills.length === 0 ? (
          <EmptyState
            title="No matched skills"
            description="None of this developer's declared skills overlap with this role's requirements yet."
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill) => (
              <SkillBadge key={skill.id} name={skill.name} variant="matched" />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          <TriangleAlert className="h-4 w-4 text-[var(--warning)]" aria-hidden="true" />
          Skills you&apos;re missing
        </h2>
        {missingSkills.length === 0 ? (
          <EmptyState
            title="Nothing missing"
            description="This developer already meets every required skill for this role."
          />
        ) : (
          <SkillGapList skills={missingSkills} />
        )}
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
          All required skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill) => (
            <SkillBadge
              key={skill.id}
              name={skill.name}
              detail={skill.importance}
              variant={matchedIds.has(skill.id) ? "matched" : "missing"}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          <Building2 className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          Companies offering this role
        </h2>
        {companies.length === 0 ? (
          <EmptyState
            title="No companies listed yet"
            description="No companies in SkillGraph currently offer this role."
          />
        ) : (
          <CompanyList companies={companies} />
        )}
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          <GitBranch className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          Career path
        </h2>
        <CareerPathVisualization path={careerPath} roleTitle={role.title} />
      </section>
    </div>
  );
}
