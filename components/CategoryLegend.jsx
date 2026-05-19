/**
 * components/CategoryLegend.jsx
 * Color key for the 3 plot categories — colors from PLOT_CATEGORIES, names from sheet.
 */
import { PLOT_CATEGORIES } from "../lib/fetchSheets";

export default function CategoryLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 sm:p-4 rounded-xl bg-white border border-forest-100 shadow-card">
      <span className="text-xs font-semibold uppercase tracking-widest text-forest-500 shrink-0">
        Plot Categories
      </span>
      <div className="flex flex-wrap gap-2">
        {Object.values(PLOT_CATEGORIES).map((cat) => (
          <span
            key={cat.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: cat.color,
              color: cat.textColor,
              border: `1.5px solid ${cat.color}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: cat.textColor, opacity: 0.4 }}
            />
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
}
