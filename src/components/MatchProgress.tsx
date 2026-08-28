interface MatchProgressProps {
  percentage: number;
  size?: "sm" | "lg";
}

export function MatchProgress({ percentage, size = "sm" }: MatchProgressProps) {
  const clamped = Math.max(0, Math.min(100, percentage));
  const height = size === "lg" ? "h-2.5" : "h-1.5";

  return (
    <div className="w-full">
      <div
        className={`w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-muted)] ${height}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${clamped}% skill match`}
      >
        <div
          className="h-full rounded-[var(--radius-pill)] bg-[var(--accent)] transition-[width] duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
