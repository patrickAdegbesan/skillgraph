"use client";

import { Boxes, FolderGit2, Sparkles, Target } from "lucide-react";

import { CardSkeleton, MetricRowSkeleton, TextSkeleton } from "@/components/LoadingSkeleton";
import { DeveloperHeader } from "@/components/DeveloperHeader";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { MetricCard } from "@/components/MetricCard";
import { RoleMatchCard } from "@/components/RoleMatchCard";
import { useApiResource } from "@/lib/api/useApiResource";
import { DEFAULT_DEVELOPER_ID } from "@/lib/constants";
import type {
  DeveloperNode,
  DeveloperSkill,
  DeveloperSkillEvidence,
  ProjectNode,
  RoleMatchResult,
} from "@/lib/types/graph";

export default function OverviewPage() {
  const developer = useApiResource<DeveloperNode>(`/api/developers/${DEFAULT_DEVELOPER_ID}`);
  const skills = useApiResource<DeveloperSkill[]>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/skills`,
  );
  const evidence = useApiResource<DeveloperSkillEvidence>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/project-skills`,
  );
  const projects = useApiResource<ProjectNode[]>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/projects`,
  );
  const roles = useApiResource<RoleMatchResult[]>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/roles`,
  );

  if (developer.status === "error") {
    return (
      <ErrorState
        title={developer.httpStatus === 404 ? "Developer not found" : undefined}
        message={developer.message}
        onRetry={developer.httpStatus === 404 ? undefined : developer.refetch}
      />
    );
  }

  const bestMatch = roles.status === "success" ? roles.data[0] ?? null : null;
  const opportunityCount =
    roles.status === "success"
      ? roles.data.filter((role) => role.matchPercentage > 0).length
      : null;

  const metricsLoading =
    skills.status === "loading" ||
    evidence.status === "loading" ||
    projects.status === "loading" ||
    roles.status === "loading";

  return (
    <div className="flex flex-col gap-10">
      <section>
        {developer.status === "loading" ? (
          <TextSkeleton />
        ) : (
          <DeveloperHeader developer={developer.data} />
        )}
      </section>

      <section aria-label="Summary metrics">
        {metricsLoading ? (
          <MetricRowSkeleton />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard
              icon={Sparkles}
              label="Direct skills"
              value={skills.status === "success" ? skills.data.length : "—"}
              hint="Skills you've declared"
            />
            <MetricCard
              icon={Boxes}
              label="Seen in projects"
              value={
                evidence.status === "success"
                  ? evidence.data.projectDerivedOnlySkills.length
                  : "—"
              }
              hint="Beyond your declared skills"
            />
            <MetricCard
              icon={FolderGit2}
              label="Projects"
              value={projects.status === "success" ? projects.data.length : "—"}
            />
            <MetricCard
              icon={Target}
              label="Career opportunities"
              value={opportunityCount ?? "—"}
              hint="Roles with at least one skill match"
            />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-[var(--foreground)]">
          Your strongest match
        </h2>
        {roles.status === "loading" ? (
          <CardSkeleton />
        ) : roles.status === "error" ? (
          <ErrorState message={roles.message} onRetry={roles.refetch} />
        ) : bestMatch ? (
          <RoleMatchCard role={bestMatch} featured />
        ) : (
          <EmptyState
            title="No role matches yet"
            description="Once declared skills overlap with a role's requirements, the best match appears here."
          />
        )}
      </section>
    </div>
  );
}
