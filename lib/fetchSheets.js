/**
 * lib/fetchSheets.js
 */

export const SHEET_CSV_URL =
  process.env.NEXT_PUBLIC_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRO7IDhnrIQq72uzYm7EZnmViBUsHvdWU_vqLWvBQD03DWrkZnx4u41mk_UiSHh-4rEFS03hyUO2jLp/pub?gid=195958657&single=true&output=csv";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917090644644";

export function parseCSV(csvText) {
  const lines = csvText.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  if (lines.length < 2) return [];

  const parseRow = (line) => {
    const result = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(field.trim()); field = "";
      } else { field += ch; }
    }
    result.push(field.trim());
    return result;
  };

  const headers = parseRow(lines[0]).map((h) => h.replace(/^"|"$/g, "").trim());
  const rows = lines.slice(1).map((line) => {
    const values = parseRow(line).map((v) => v.replace(/^"|"$/g, "").trim());
    const obj = {};
    headers.forEach((header, i) => { obj[header] = values[i] || ""; });
    return obj;
  });
  return rows.filter((row) => Object.values(row).some((v) => v && v.trim() !== ""));
}

export function normalizeStatus(raw) {
  if (!raw) return "Available";
  const s = raw.toString().replace(/\r/g, "").trim().toLowerCase();
  if (["booked","sold","not available","booking"].includes(s) || s.startsWith("book")) return "Booked";
  if (["reserved","hold","on hold","blocked"].includes(s) || s.startsWith("reserv")) return "Reserved";
  return "Available";
}

/**
 * Parse numeric value from formatted strings like "₹20,40,000" or "2,400"
 */
export function parseNumber(val) {
  if (!val) return 0;
  return parseFloat(val.toString().replace(/[^0-9.]/g, "")) || 0;
}

/**
 * Determine plot category from per-acre price.
 * Checks dedicated column first, then calculates from Total Price / Area(Acres).
 * Categories:
 *   Signature  → 62,00,000/acre  (#b6e658)
 *   Preferred  → 60,00,000/acre  (#ffcb11)
 *   Classic    → 58,00,000/acre  (#ffb19d)
 */
export const PLOT_CATEGORIES = {
  Signature: { label: "Signature", color: "#b6e658", textColor: "#2d4a00", price: 6200000 },
  Preferred: { label: "Preferred", color: "#ffcb11", textColor: "#5a3e00", price: 6000000 },
  Classic:   { label: "Classic",   color: "#ffb19d", textColor: "#6b1f00", price: 5800000 },
};

export function getPlotCategory(plot) {
  const keys = Object.keys(plot);

  // 1. Look for an explicit per-acre price column
  const acreKey = keys.find((k) => {
    const l = k.toLowerCase().replace(/\s+/g, " ");
    return (
      l.includes("per acre") || l.includes("price/acre") ||
      l.includes("rate/acre") || l.includes("acre price") ||
      l === "per acre" || l === "rate per acre"
    );
  });

  let perAcrePrice = 0;

  if (acreKey) {
    perAcrePrice = parseNumber(plot[acreKey]);
  }

  // 2. Calculate from Total Price ÷ Area (Acres)
  if (!perAcrePrice) {
    const totalKey = keys.find((k) => k.toLowerCase().includes("total"));
    const acresKey = keys.find((k) => {
      const l = k.toLowerCase();
      return (l.includes("ac") && !l.includes("sq")) || l === "acres";
    });
    if (totalKey && acresKey) {
      const total = parseNumber(plot[totalKey]);
      const acres = parseNumber(plot[acresKey]);
      if (acres > 0 && total > 0) perAcrePrice = total / acres;
    }
  }

  // 3. Calculate from Price/Sq.Ft × 43560
  if (!perAcrePrice) {
    const sqftKey = keys.find((k) => {
      const l = k.toLowerCase();
      return l.includes("price") && (l.includes("sq") || l.includes("/"));
    });
    if (sqftKey) {
      const ppsf = parseNumber(plot[sqftKey]);
      if (ppsf > 0) perAcrePrice = ppsf * 43560;
    }
  }

  if (!perAcrePrice) return null;

  // Match with ±3 lakh tolerance
  const TOLERANCE = 300000;
  for (const [key, cat] of Object.entries(PLOT_CATEGORIES)) {
    if (Math.abs(perAcrePrice - cat.price) <= TOLERANCE) return key;
  }
  return null;
}

export async function fetchPlots() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const rawRows = parseCSV(text);

    if (rawRows.length === 0) return { plots: [], headers: [], error: null };

    const headers = Object.keys(rawRows[0]);
    const statusKey = headers.find((h) => h.replace(/\r/g, "").trim().toLowerCase() === "status") || null;

    const plots = rawRows.map((row, idx) => {
      const rawStatus = statusKey ? row[statusKey] : "";
      const status    = normalizeStatus(rawStatus);
      const category  = getPlotCategory(row);
      return { _id: idx, ...row, status, category };
    });

    const displayHeaders = headers.filter(
      (h) => h.replace(/\r/g, "").trim().toLowerCase() !== "status" && h.trim() !== ""
    );

    return { plots, headers: displayHeaders, error: null };
  } catch (err) {
    console.error("fetchPlots error:", err);
    return { plots: [], headers: [], error: err.message || "Failed to fetch data" };
  }
}

export function buildWhatsAppUrl(plot) {
  const nameKeys = ["Plot Name","plot name","Plot","Name","PLOT NAME"];
  const numKeys  = ["Plot No","plot no","Plot Number","No","Plot #","PLOT NO","Sr No","Sr. No","Sl No"];

  const findVal = (keys) => {
    for (const k of keys) {
      if (plot[k] && plot[k].toString().trim()) return plot[k].toString().trim();
    }
    const allKeys = Object.keys(plot);
    for (const k of allKeys) {
      const kl = k.toLowerCase();
      if (keys.some((n) => kl.includes(n.toLowerCase().split(" ")[0]))) {
        if (plot[k] && plot[k].toString().trim()) return plot[k].toString().trim();
      }
    }
    return null;
  };

  const plotName = findVal(nameKeys) || "N/A";
  const plotNum  = findVal(numKeys)  || "N/A";
  const message  = encodeURIComponent(
    `Hi, I'm interested in Plot ${plotName} - Plot No ${plotNum}. Please share more details.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function formatINR(value) {
  if (!value) return value;
  const num = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return value;
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
}
