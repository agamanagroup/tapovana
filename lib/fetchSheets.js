/**
 * lib/fetchSheets.js
 * Fix #3 — robust status detection with trim/lowercase + \r handling
 * Fix #4 — WhatsApp number hardcoded to +917090644644
 */

export const SHEET_CSV_URL =
  process.env.NEXT_PUBLIC_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRO7IDhnrIQq72uzYm7EZnmViBUsHvdWU_vqLWvBQD03DWrkZnx4u41mk_UiSHh-4rEFS03hyUO2jLp/pub?gid=195958657&single=true&output=csv";

// Fix #4 — hardcoded WhatsApp number
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917090644644";

export function parseCSV(csvText) {
  // Fix #3 — strip \r so status values don't have invisible trailing chars
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
    headers.forEach((header, i) => { obj[header] = values[i] || ""; });
    return obj;
  });

  return rows.filter((row) => Object.values(row).some((v) => v && v.trim() !== ""));
}

// Fix #3 — broader status matching, trims all whitespace and \r
export function normalizeStatus(raw) {
  if (!raw) return "Available";
  const s = raw.toString().replace(/\r/g, "").trim().toLowerCase();
  if (["booked", "sold", "not available", "booking", "booked "].includes(s) || s.startsWith("book")) return "Booked";
  if (["reserved", "hold", "on hold", "blocked", "reserved "].includes(s) || s.startsWith("reserv")) return "Reserved";
  return "Available";
}

export async function fetchPlots() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const rawRows = parseCSV(text);

    if (rawRows.length === 0) return { plots: [], headers: [], error: null };

    const headers = Object.keys(rawRows[0]);

    // Fix #3 — find status column with aggressive trim + case-insensitive match
    const statusKey = headers.find((h) => h.replace(/\r/g, "").trim().toLowerCase() === "status") || null;

    const plots = rawRows.map((row, idx) => {
      const rawStatus = statusKey ? row[statusKey] : "";
      const status = normalizeStatus(rawStatus);
      return { _id: idx, ...row, status };
    });

    // Exclude status column from display headers; also exclude empty-header columns
    const displayHeaders = headers.filter(
      (h) => h.replace(/\r/g, "").trim().toLowerCase() !== "status" && h.trim() !== ""
    );

    return { plots, headers: displayHeaders, error: null };
  } catch (err) {
    console.error("fetchPlots error:", err);
    return { plots: [], headers: [], error: err.message || "Failed to fetch data" };
  }
}

// Fix #4 — always uses the hardcoded +917090644644
export function buildWhatsAppUrl(plot) {
  const nameKeys = ["Plot Name", "plot name", "Plot", "Name", "PLOT NAME"];
  const numKeys  = ["Plot No", "plot no", "Plot Number", "No", "Plot #", "PLOT NO", "Sr No", "Sr. No", "Sl No"];

  const findVal = (keys) => {
    for (const k of keys) {
      if (plot[k] && plot[k].toString().trim()) return plot[k].toString().trim();
    }
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
  const plotNum  = findVal(numKeys)  || "N/A";

  const message = encodeURIComponent(
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
