/**
 * lib/fetchSheets.js
 * Fetches plot data from a publicly published Google Sheet (CSV format).
 *
 * HOW TO SET UP:
 * 1. Open your Google Sheet
 * 2. File → Share → Publish to web
 * 3. Select: "Entire Document" → "Comma-separated values (.csv)"
 * 4. Click "Publish" and copy the URL
 * 5. Paste that URL in SHEET_CSV_URL below (or set NEXT_PUBLIC_SHEET_CSV_URL in .env.local)
 *
 * Alternatively use the gviz endpoint (works when sheet is shared publicly):
 *   https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}
 */

/**
 * Live CSV feed — Tapovana_Farmland_Pricelist (gid=195958657)
 * Derived from published sheet URL. Override via NEXT_PUBLIC_SHEET_CSV_URL in .env.local
 */
export const SHEET_CSV_URL =
  process.env.NEXT_PUBLIC_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRO7IDhnrIQq72uzYm7EZnmViBUsHvdWU_vqLWvBQD03DWrkZnx4u41mk_UiSHh-4rEFS03hyUO2jLp/pub?gid=195958657&single=true&output=csv";

/**
 * Parse CSV text into an array of objects.
 * Handles quoted fields and commas inside quotes.
 */
export function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const parseRow = (line) => {
    const result = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        result.push(field.trim());
        field = "";
      } else {
        field += ch;
      }
    }
    result.push(field.trim());
    return result;
  };

  const headers = parseRow(lines[0]).map((h) => h.replace(/^"|"$/g, "").trim());

  const rows = lines.slice(1).map((line) => {
    const values = parseRow(line).map((v) => v.replace(/^"|"$/g, "").trim());
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || "";
    });
    return obj;
  });

  // Filter out completely empty rows
  return rows.filter((row) =>
    Object.values(row).some((v) => v && v.trim() !== "")
  );
}

/**
 * Normalize status values from the sheet.
 * Accepts flexible casing and common synonyms.
 */
export function normalizeStatus(raw) {
  if (!raw) return "Available";
  const s = raw.toString().trim().toLowerCase();
  if (s === "booked" || s === "sold" || s === "not available") return "Booked";
  if (s === "reserved" || s === "hold" || s === "on hold") return "Reserved";
  return "Available";
}

/**
 * Fetch and parse plots from Google Sheets.
 * Returns { plots, headers, error }.
 */
export async function fetchPlots() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const rawRows = parseCSV(text);

    if (rawRows.length === 0) {
      return { plots: [], headers: [], error: null };
    }

    const headers = Object.keys(rawRows[0]);

    // Find the Status column (case-insensitive)
    const statusKey = headers.find((h) => h.toLowerCase() === "status") || null;

    const plots = rawRows.map((row, idx) => {
      // If sheet has a Status column, use it; otherwise default to Available
      const rawStatus = statusKey ? row[statusKey] : "";
      const status = normalizeStatus(rawStatus);
      return {
        _id: idx,
        ...row,
        status,
      };
    });

    // Return headers excluding "status" (we handle it separately in UI)
    const displayHeaders = headers.filter(
      (h) => h.toLowerCase() !== "status"
    );

    return { plots, headers: displayHeaders, error: null };
  } catch (err) {
    console.error("fetchPlots error:", err);
    return {
      plots: [],
      headers: [],
      error: err.message || "Failed to fetch data",
    };
  }
}

/**
 * Build a WhatsApp message URL for a plot.
 * Tries common column name patterns for plot name and number.
 */
export function buildWhatsAppUrl(plot, phoneNumber = "") {
  // Try to find plot name and number from common column variations
  const nameKeys = ["Plot Name", "plot name", "Plot", "Name", "PLOT NAME", "Plot No Name"];
  const numKeys = ["Plot No", "plot no", "Plot Number", "No", "Plot #", "PLOT NO", "Sr No", "Sr. No", "Sl No"];

  const findVal = (keys) => {
    for (const k of keys) {
      if (plot[k] && plot[k].toString().trim()) return plot[k].toString().trim();
    }
    // Fallback: look for partial match
    const allKeys = Object.keys(plot);
    for (const k of allKeys) {
      const kl = k.toLowerCase();
      if (keys.some((needle) => kl.includes(needle.toLowerCase().split(" ")[0]))) {
        if (plot[k] && plot[k].toString().trim()) return plot[k].toString().trim();
      }
    }
    return null;
  };

  const plotName = findVal(nameKeys) || "N/A";
  const plotNum = findVal(numKeys) || "N/A";

  const message = encodeURIComponent(
    `Hi, I'm interested in Plot ${plotName} - Plot No ${plotNum}. Please share more details.`
  );

  const phone = phoneNumber.replace(/\D/g, "");
  return phone
    ? `https://wa.me/${phone}?text=${message}`
    : `https://wa.me/?text=${message}`;
}

/**
 * Format a number as Indian currency (₹).
 */
export function formatINR(value) {
  if (!value) return value;
  const num = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return value;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}
