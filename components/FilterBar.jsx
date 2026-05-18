/**
 * components/FilterBar.jsx
 * Fix #9 — mobile responsive: full-width filter row, larger touch targets
 */

const FILTER_OPTIONS = [
  { value: "All",       label: "All Plots" },
  { value: "Available", label: "Available" },
  { value: "Booked",    label: "Booked"    },
  { value: "Reserved",  label: "Reserved"  },
];

export default function FilterBar({ filter, onFilter, search, onSearch, totalFiltered }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Filter tabs — scroll horizontally on very small screens */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilter(opt.value)}
            className={`shrink-0 min-h-[40px] px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-forest-300 active:scale-95
              ${filter === opt.value
                ? "bg-forest-700 text-white border border-forest-700"
                : "border border-forest-200 text-forest-700 bg-white hover:bg-forest-50 hover:border-forest-400"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Search row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-forest-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by plot name or number…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 min-h-[44px] rounded-full border border-forest-200 bg-white
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        <span className="text-xs text-forest-500 whitespace-nowrap shrink-0">
          {totalFiltered} plot{totalFiltered !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
