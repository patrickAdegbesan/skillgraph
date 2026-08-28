import type { DeveloperNode } from "@/lib/types/graph";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function DeveloperHeader({ developer }: { developer: DeveloperNode }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-lg font-semibold text-[var(--accent)]"
        aria-hidden="true"
      >
        {initials(developer.name)}
      </div>
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          {developer.name}
        </h1>
        <p className="text-sm font-medium text-[var(--accent)]">{developer.title}</p>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">{developer.bio}</p>
      </div>
    </div>
  );
}
