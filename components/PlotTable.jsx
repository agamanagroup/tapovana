/**
 * components/PlotTable.jsx
 * Desktop table view with sticky header, explicit column widths (no whitespace gap),
 * hover effects, and action column.
 */
import StatusBadge from "./StatusBadge";
import { buildWhatsAppUrl } from "../lib/fetchSheets";

/** Derive a sensible fixed width for each column based on its header name */
function colWidth(header) {
  const h = header.toLowerCase();
  if (h === "#")                                   return "36px";
  if (h.includes("no") || h.includes("num") || h.includes("sl") || h.includes("sr")) return "72px";
  if (h.includes("name"))                          return "140px";
  if (h.includes("sq") || h.includes("sqft"))      return "100px";
  if (h.includes("ac") || h.includes("acre"))      return "80px";
  if (h.includes("total") || h.includes("amount")) return "120px";
  if (h.includes("price") || h.includes("rate") || h.includes("cost")) return "100px";
  if (h.includes("area"))                          return "90px";
  if (h.includes("type") || h.includes("facing"))  return "90px";
  return "100px"; // safe default
}

function formatCell(value) {
  if (!value || value.toString().trim() === "")
    return <span className="text-forest-300 select-none">—</span>;
  return value;
}

export default function PlotTable({ plots, headers }) {
  if (plots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-forest-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-forest-600 font-medium text-lg font-display">No plots found</p>
        <p className="text-forest-400 text-sm mt-1">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-forest-100 shadow-table">
      <table
        className="divide-y divide-forest-100 bg-white"
        style={{ tableLayout: "fixed", width: "100%", minWidth: "700px" }}
      >
        {/* ── Explicit column widths — eliminates phantom whitespace ── */}
        <colgroup>
          {/* Row # */}
          <col style={{ width: "36px" }} />
          {/* One col per data header */}
          {headers.map((header) => (
            <col key={header} style={{ width: colWidth(header) }} />
          ))}
          {/* Status */}
          <col style={{ width: "110px" }} />
          {/* Action */}
          <col style={{ width: "100px" }} />
        </colgroup>

        {/* ── Sticky header ── */}
        <thead className="bg-forest-900 sticky top-0 z-10">
          <tr>
            <th className="table-header text-forest-300">#</th>
            {headers.map((header) => (
              <th key={header} className="table-header text-forest-300 truncate">
                {header}
              </th>
            ))}
            <th className="table-header text-forest-300">Status</th>
            <th className="table-header text-forest-300">Action</th>
          </tr>
        </thead>

        {/* ── Rows ── */}
        <tbody className="divide-y divide-forest-50">
          {plots.map((plot, idx) => (
            <tr
              key={plot._id}
              className={[
                "plot-row",
                plot.status === "Available"  ? "hover:bg-forest-50/50" : "",
                plot.status === "Booked"     ? "opacity-60 bg-red-50/30 hover:bg-red-50/50" : "",
                plot.status === "Reserved"   ? "bg-amber-50/20 hover:bg-amber-50/40" : "",
              ].join(" ")}
            >
              <td className="table-cell text-forest-400 font-mono text-xs">{idx + 1}</td>

              {headers.map((header) => (
                <td key={header} className="table-cell truncate" title={plot[header] || ""}>
                  {formatCell(plot[header])}
                </td>
              ))}

              <td className="table-cell">
                <StatusBadge status={plot.status} />
              </td>

              <td className="table-cell">
                {plot.status === "Available" ? (
                  <a
                    href={buildWhatsAppUrl(plot)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enquire-btn"
                  >
                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enquire
                  </a>
                ) : (
                  <span className="text-xs text-forest-300 italic">
                    {plot.status === "Booked" ? "Sold" : "On hold"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
