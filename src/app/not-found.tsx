import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-6 py-16 text-center">
      <Compass className="h-6 w-6 text-[var(--muted)]" aria-hidden="true" />
      <p className="text-sm font-medium text-[var(--foreground)]">Page not found</p>
      <p className="max-w-sm text-sm text-[var(--muted)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-1 inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
      >
        Back to overview
      </Link>
    </div>
  );
}
