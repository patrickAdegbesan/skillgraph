"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--danger-soft)] px-6 py-10 text-center">
      <AlertTriangle className="h-6 w-6 text-[var(--danger)]" aria-hidden="true" />
      <p className="text-sm font-medium text-[var(--foreground)]">{title}</p>
      <p className="max-w-sm text-sm text-[var(--muted)]">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      ) : null}
    </div>
  );
}

/** Maps a known API error code to friendlier copy without leaking internals. */
export function friendlyErrorMessage(code: string, fallback: string): string {
  if (code === "SERVICE_UNAVAILABLE") {
    return "SkillGraph is temporarily unavailable. Please try again.";
  }
  if (code === "NOT_FOUND") {
    return fallback;
  }
  return fallback;
}
