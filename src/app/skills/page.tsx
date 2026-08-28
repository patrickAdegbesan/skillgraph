"use client";

import { FolderGit2, Sparkles } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { ListSkeleton, TextSkeleton } from "@/components/LoadingSkeleton";
import { SkillBadge } from "@/components/SkillBadge";
import { useApiResource } from "@/lib/api/useApiResource";
import { DEFAULT_DEVELOPER_ID } from "@/lib/constants";
import type { DeveloperSkill, DeveloperSkillEvidence, ProjectNode } from "@/lib/types/graph";

export default function SkillsPage() {
  const skills = useApiResource<DeveloperSkill[]>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/skills`,
  );
  const evidence = useApiResource<DeveloperSkillEvidence>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/project-skills`,
  );
  const projects = useApiResource<ProjectNode[]>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/projects`,
  );

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Skill evidence
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          SkillGraph distinguishes skills you&apos;ve declared from skills your project work
          demonstrates, even when you haven&apos;t added them yourself.
        </p>
      </header>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          <Sparkles className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          Direct skills
        </h2>
        {skills.status === "loading" ? (
          <TextSkeleton />
        ) : skills.status === "error" ? (
          <ErrorState message={skills.message} onRetry={skills.refetch} />
        ) : skills.data.length === 0 ? (
          <EmptyState
            title="No declared skills yet"
            description="This developer hasn't added any direct skills. Skills evidenced through project work may still appear below."
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.data.map((skill) => (
              <SkillBadge
                key={skill.id}
                name={skill.name}
                detail={`${skill.level} · ${skill.years}y`}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          <FolderGit2 className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          Seen in your projects
        </h2>
        <p className="mb-3 text-sm text-[var(--muted)]">
          These skills show up in the technologies your projects actually used. They&apos;re
          evidence of exposure, not a claim of declared proficiency.
        </p>
        {evidence.status === "loading" ? (
          <TextSkeleton />
        ) : evidence.status === "error" ? (
          <ErrorState message={evidence.message} onRetry={evidence.refetch} />
        ) : evidence.data.projectDerivedOnlySkills.length === 0 ? (
          <EmptyState
            title="Nothing new here"
            description="Every skill used in this developer's projects is already part of their declared skills."
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {evidence.data.projectDerivedOnlySkills.map((skill) => (
              <SkillBadge key={skill.id} name={skill.name} variant="evidenced" />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">Projects</h2>
        {projects.status === "loading" ? (
          <ListSkeleton count={2} />
        ) : projects.status === "error" ? (
          <ErrorState message={projects.message} onRetry={projects.refetch} />
        ) : projects.data.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Once projects are linked to this developer, they'll appear here as context for their project-derived skills."
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {projects.data.map((project) => (
              <li
                key={project.id}
                className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <p className="text-sm font-medium text-[var(--foreground)]">{project.name}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
