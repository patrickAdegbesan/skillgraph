"use client";

import { useState } from "react";

import { CareerPathVisualization } from "@/components/CareerPathVisualization";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { CardSkeleton, TextSkeleton } from "@/components/LoadingSkeleton";
import { useApiResource } from "@/lib/api/useApiResource";
import { DEFAULT_DEVELOPER_ID } from "@/lib/constants";
import type { CareerPath, RoleMatchResult } from "@/lib/types/graph";

export default function CareerPathPage() {
  const roles = useApiResource<RoleMatchResult[]>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/roles`,
  );
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [defaultApplied, setDefaultApplied] = useState(false);

  // Default the picker to the developer's best match once roles load, using
  // React's "adjust state while rendering" pattern instead of an Effect.
  if (roles.status === "success" && !defaultApplied && roles.data.length > 0) {
    setDefaultApplied(true);
    setSelectedRoleId(roles.data[0].id);
  }

  const path = useApiResource<{ found: boolean; path: CareerPath | null }>(
    selectedRoleId
      ? `/api/developers/${DEFAULT_DEVELOPER_ID}/roles/${selectedRoleId}/path`
      : null,
  );

  const selectedRole =
    roles.status === "success"
      ? roles.data.find((role) => role.id === selectedRoleId) ?? null
      : null;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Career path
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          See how your current skills connect to a target role through SkillGraph&apos;s related
          skills — a possible learning connection, not a guaranteed outcome.
        </p>
      </header>

      {roles.status === "loading" ? (
        <TextSkeleton />
      ) : roles.status === "error" ? (
        <ErrorState message={roles.message} onRetry={roles.refetch} />
      ) : roles.data.length === 0 ? (
        <EmptyState
          title="No roles available"
          description="There are no roles in SkillGraph to build a career path toward."
        />
      ) : (
        <div className="flex flex-col gap-1">
          <label htmlFor="role-select" className="text-sm font-medium text-[var(--foreground)]">
            Target role
          </label>
          <select
            id="role-select"
            value={selectedRoleId ?? ""}
            onChange={(event) => setSelectedRoleId(event.target.value)}
            className="w-full max-w-sm rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {roles.data.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title} ({role.matchPercentage}% match)
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedRole ? (
        path.status === "loading" ? (
          <CardSkeleton />
        ) : path.status === "error" ? (
          <ErrorState
            message={path.message}
            onRetry={path.httpStatus === 404 ? undefined : path.refetch}
          />
        ) : (
          <CareerPathVisualization path={path.data.path} roleTitle={selectedRole.title} />
        )
      ) : null}
    </div>
  );
}
