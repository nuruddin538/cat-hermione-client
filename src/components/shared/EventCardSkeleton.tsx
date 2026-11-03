type EventCardSkeletonProps = {
  count?: number;
};

export default function EventCardSkeleton({
  count = 6,
}: EventCardSkeletonProps) {
  return (
    <div
      aria-label="Loading events"
      aria-busy="true"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-[#172720]"
        >
          <div className="h-52 animate-pulse bg-gray-200 dark:bg-white/10" />

          <div className="space-y-4 p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-11 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
