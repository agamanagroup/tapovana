/**
 * components/LoadingState.jsx
 * Skeleton loader while data is being fetched
 */
export default function LoadingState() {
  return (
    <div className="animate-fade-in">
      {/* Table skeleton */}
      <div className="rounded-xl border border-forest-100 overflow-hidden shadow-table bg-white">
        {/* Header row */}
        <div className="bg-forest-900 px-4 py-3 flex gap-4">
          {[40, 80, 120, 100, 90, 110, 80, 70].map((w, i) => (
            <div key={i} className="skeleton h-3 rounded" style={{ width: w, opacity: 0.3 }} />
          ))}
        </div>

        {/* Data rows */}
        {Array.from({ length: 8 }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="px-4 py-3 flex gap-4 items-center border-b border-forest-50 last:border-0"
            style={{ animationDelay: `${rowIdx * 50}ms` }}
          >
            {[40, 80, 120, 100, 90, 110, 80, 70].map((w, i) => (
              <div key={i} className="skeleton h-3 rounded" style={{ width: w }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
