interface SkeletonBlockProps {
  className?: string;
}

function Block({ className = "" }: SkeletonBlockProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[var(--surface-muted)] ${className}`}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5">
      <Block className="h-4 w-1/3" />
      <Block className="mt-3 h-3 w-2/3" />
      <div className="mt-4 flex gap-2">
        <Block className="h-6 w-16 rounded-full" />
        <Block className="h-6 w-20 rounded-full" />
        <Block className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function MetricRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <Block className="h-3 w-1/2" />
          <Block className="mt-3 h-6 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function TextSkeleton() {
  return (
    <div className="flex flex-col gap-2" role="status" aria-label="Loading">
      <Block className="h-4 w-1/4" />
      <Block className="h-3 w-full" />
      <Block className="h-3 w-5/6" />
    </div>
  );
}
