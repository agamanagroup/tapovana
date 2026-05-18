/**
 * components/FilterBar.jsx
 * Status filter tabs + search input
 */

const FILTER_OPTIONS = [
  { value: "All", label: "All Plots" },
  { value: "Available", label: "Available" },
  { value: "Booked", label: "Booked" },
  { value: "Reserved", label: "Reserved" },
];

export default function FilterBar({ filter, onFilter, search, onSearch, totalFiltered }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilter(opt.value)}
            className={filter === opt.value ? "filter-btn-active" : "filter-btn"}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Right: search + count */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-forest-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search plot name or number…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-9 py-2 rounded-full border border-forest-200 bg-white
              text-sm text-forest-800 placeholder-forest-400
              focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400
              transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => onSearch("")}
              className="absolute inset-y-0 right-3 flex items-center text-forest-400 hover:text-forest-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Count */}
        <span className="text-xs text-forest-500 whitespace-nowrap hidden sm:block">
          {totalFiltered} plot{totalFiltered !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
