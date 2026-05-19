/**
 * components/FilterBar.jsx
 * Enhancements: Total Area + Total Price dropdowns added
 */

const STATUS_OPTIONS = [
  { value: "All",       label: "All Plots" },
  { value: "Available", label: "Available" },
  { value: "Booked",    label: "Booked"    },
  { value: "Reserved",  label: "Reserved"  },
];

const SELECT_CLS = `
  h-[44px] pl-3 pr-8 rounded-full border border-forest-200 bg-white
  text-sm text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-300
  focus:border-forest-400 transition-all duration-200 appearance-none cursor-pointer
  bg-no-repeat bg-right
`;

// Tiny chevron for selects
const CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23619e61' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

export default function FilterBar({
  filter, onFilter,
  search, onSearch,
  areaFilter,  onAreaFilter,  areaOptions,
  priceFilter, onPriceFilter, priceOptions,
  totalFiltered,
}) {
  return (
    <div className="flex flex-col gap-3">

      {/* Row 1 — Status filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilter(opt.value)}
            className={`shrink-0 min-h-[44px] px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest-300 active:scale-95
              ${filter === opt.value
                ? "bg-forest-700 text-white border border-forest-700"
                : "border border-forest-200 text-forest-700 bg-white hover:bg-forest-50 hover:border-forest-400"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Row 2 — Area + Price dropdowns */}
      <div className="flex flex-wrap gap-2">
        {/* Total Area filter */}
        {areaOptions && areaOptions.length > 0 && (
          <div className="relative">
            <select
              value={areaFilter}
              onChange={(e) => onAreaFilter(e.target.value)}
              className={SELECT_CLS}
              style={{ backgroundImage: CHEVRON, backgroundPosition: "calc(100% - 10px) center" }}
            >
              <option value="">All Areas</option>
              {areaOptions.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        )}

        {/* Total Price filter */}
        {priceOptions && priceOptions.length > 0 && (
          <div className="relative">
            <select
              value={priceFilter}
              onChange={(e) => onPriceFilter(e.target.value)}
              className={SELECT_CLS}
              style={{ backgroundImage: CHEVRON, backgroundPosition: "calc(100% - 10px) center" }}
            >
              <option value="">All Prices</option>
              {priceOptions.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        )}

        {/* Clear filters */}
        {(areaFilter || priceFilter) && (
          <button
            onClick={() => { onAreaFilter(""); onPriceFilter(""); }}
            className="min-h-[44px] px-3 py-2 rounded-full text-xs font-medium border border-red-200
              text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 active:scale-95"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Row 3 — Search + count */}
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
              focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400 transition-all duration-200"
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
