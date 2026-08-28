"use client";

import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { ListSkeleton } from "@/components/LoadingSkeleton";
import { RoleMatchCard } from "@/components/RoleMatchCard";
import { useApiResource } from "@/lib/api/useApiResource";
import { DEFAULT_DEVELOPER_ID } from "@/lib/constants";
import type { RoleMatchResult } from "@/lib/types/graph";

export default function RolesPage() {
  const roles = useApiResource<RoleMatchResult[]>(
    `/api/developers/${DEFAULT_DEVELOPER_ID}/roles`,
  );

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Recommended roles
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          Roles ranked by how many of their required skills you already have. Your strongest
          matches are listed first.
        </p>
      </header>

      {roles.status === "loading" ? (
        <ListSkeleton count={4} />
      ) : roles.status === "error" ? (
        <ErrorState message={roles.message} onRetry={roles.refetch} />
      ) : roles.data.length === 0 ? (
        <EmptyState
          title="No roles found"
          description="There are no roles in SkillGraph to compare against yet."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {roles.data.map((role, index) => (
            <RoleMatchCard key={role.id} role={role} featured={index === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
