/**
 * components/PlotCards.jsx
 * Enhancement: category color strip on each card
 */
import StatusBadge from "./StatusBadge";
import { buildWhatsAppUrl, PLOT_CATEGORIES } from "../lib/fetchSheets";

const WA_ICON = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function PlotCards({ plots, headers }) {
  if (plots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-forest-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p className="text-forest-600 font-medium font-display text-lg">No plots found</p>
        <p className="text-forest-400 text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {plots.map((plot) => {
        const isBooked   = plot.status === "Booked";
        const isReserved = plot.status === "Reserved";
        const isAvail    = plot.status === "Available";
        const catKey     = plot.category;
        const cat        = catKey ? PLOT_CATEGORIES[catKey] : null;

        return (
          <div
            key={plot._id}
            className={`plot-card rounded-2xl overflow-hidden shadow-card transition-all duration-300
              ${isBooked   ? "border-2 border-red-300"   : ""}
              ${isReserved ? "border-2 border-amber-300" : ""}
              ${isAvail    ? "border border-forest-100"  : ""}
            `}
          >
            {/* Category color bar at top */}
            {cat && (
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: cat.color }}
              />
            )}

            {/* Card header */}
            <div className={`px-4 py-3 flex items-center justify-between
              ${isAvail    ? "bg-forest-900" : ""}
              ${isBooked   ? "bg-red-700"    : ""}
              ${isReserved ? "bg-amber-700"  : ""}
            `}>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-white font-display text-lg font-medium leading-tight truncate">
                  {plot["Plot Name"] || plot["Name"] || plot["Plot No"] || "Plot"}
                </span>
                {/* Category badge */}
                {cat && (
                  <span
                    className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: cat.color, color: cat.textColor }}
                  >
                    {cat.label}
                  </span>
                )}
              </div>
              <div className="shrink-0 ml-2">
                <StatusBadge status={plot.status}/>
              </div>
            </div>

            {/* Card body */}
            <div className={`px-4 py-4
              ${isBooked   ? "bg-red-50"      : ""}
              ${isReserved ? "bg-amber-50/60" : ""}
              ${isAvail    ? "bg-white"        : ""}
            `}>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                {headers.map((header) => {
                  const val = plot[header];
                  if (!val || val.trim() === "") return null;
                  return (
                    <div key={header} className="col-span-1 min-w-0">
                      <dt className={`text-xs font-semibold uppercase tracking-wide mb-0.5 truncate
                        ${isBooked ? "text-red-400" : "text-forest-400"}`}>
                        {header}
                      </dt>
                      <dd className={`text-sm font-medium break-words
                        ${isBooked ? "text-red-900" : "text-forest-800"}`}>
                        {val}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            {/* Action footer */}
            <div className={`px-4 pb-4
              ${isBooked   ? "bg-red-50"      : ""}
              ${isReserved ? "bg-amber-50/60" : ""}
              ${isAvail    ? "bg-white"        : ""}
            `}>
              {isAvail ? (
                <a
                  href={buildWhatsAppUrl(plot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl min-h-[48px]
                    bg-forest-700 text-white text-sm font-medium
                    hover:bg-forest-600 active:bg-forest-800 transition-all duration-200"
                >
                  {WA_ICON}
                  Enquire on WhatsApp
                </a>
              ) : isBooked ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl min-h-[48px]
                  bg-red-600 text-white text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                  </svg>
                  This Plot is Booked
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl min-h-[48px]
                  bg-amber-100 text-amber-800 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Currently Reserved
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
