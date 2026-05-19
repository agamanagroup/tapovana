/**
 * lib/fetchSheets.js
 *
 * KEY FIXES from screenshot:
 *  - Column H is "Category"       → read value directly (Classic/Signature/Preferred)
 *  - Column I is "Booking Status" → "status" exact-match would never find this!
 *
 * Status finder now uses multi-strategy (contains "status" catches "Booking Status").
 * Category is read straight from the sheet — no price calculation at all.
 */

export const SHEET_CSV_URL =
  process.env.NEXT_PUBLIC_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRO7IDhnrIQq72uzYm7EZnmViBUsHvdWU_vqLWvBQD03DWrkZnx4u41mk_UiSHh-4rEFS03hyUO2jLp/pub?gid=195958657&single=true&output=csv";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917090644644";

/* ─── Category definitions (color comes from here, name comes from sheet) ── */
export const PLOT_CATEGORIES = {
  Signature: { label: "Signature", color: "#b6e658", textColor: "#2d4a00" },
  Preferred: { label: "Preferred", color: "#ffcb11", textColor: "#5a3e00" },
  Classic:   { label: "Classic",   color: "#ffb19d", textColor: "#6b1f00" },
};

/**
 * Map whatever the sheet says → one of our 3 canonical keys.
 * Case-insensitive, trims whitespace & invisible chars.
 */
function normalizeCategoryName(raw) {
  if (!raw) return null;
  const s = raw.toString().replace(/\r|\n|\t/g, "").trim().toLowerCase();
  if (s === "signature") return "Signature";
  if (s === "preferred") return "Preferred";
  if (s === "classic")   return "Classic";
  return null; // unknown / blank → no badge
}

/* ─── CSV Parser ─────────────────────────────────────────────────────────── */
export function parseCSV(csvText) {
  const lines = csvText
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n");
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

/* ─── Status Column Finder (4 strategies) ────────────────────────────────── */
function findStatusKey(headers, rows) {
  const clean = (h) => h.replace(/\r|\n|\t/g, "").trim().toLowerCase();

  // Strategy 1: exact "status"
  let key = headers.find((h) => clean(h) === "status");
  if (key) return key;

  // Strategy 2: contains "status"  ← catches "Booking Status" ✓
  key = headers.find((h) => clean(h).includes("status"));
  if (key) return key;

  // Strategy 3: synonym column names
  const synonyms = ["booking", "availability", "avail", "sale status"];
  key = headers.find((h) => synonyms.some((s) => clean(h).includes(s)));
  if (key) return key;

  // Strategy 4: value inspection — whichever column's cells read like status words
  const statusWords = new Set([
    "available", "booked", "reserved", "sold",
    "hold", "on hold", "blocked", "not available", "booking",
  ]);
  key = headers.find((h) => {
    const vals = rows
      .map((r) => (r[h] || "").replace(/\r|\n/g, "").trim().toLowerCase())
      .filter((v) => v.length > 0 && v.length < 30);
    if (!vals.length) return false;
    const hits = vals.filter(
      (v) => statusWords.has(v) || v.startsWith("book") || v.startsWith("reserv") || v.startsWith("avail")
    );
    return hits.length / vals.length >= 0.3;
  });
  if (key) return key;

  console.warn("[Tapovana] ⚠ No status column found. Headers:", headers);
  return null;
}

/* ─── Category Column Finder ─────────────────────────────────────────────── */
function findCategoryKey(headers) {
  const clean = (h) => h.replace(/\r|\n|\t/g, "").trim().toLowerCase();
  // Exact match first, then partial
  return (
    headers.find((h) => clean(h) === "category") ||
    headers.find((h) => clean(h).includes("category")) ||
    null
  );
}

/* ─── Status Normalizer ──────────────────────────────────────────────────── */
export function normalizeStatus(raw) {
  if (!raw) return "Available";
  const s = raw.toString().replace(/\r|\n|\t/g, "").trim().toLowerCase();
  if (!s) return "Available";
  if (s === "booked" || s === "sold" || s === "booking" ||
      s === "not available" || s.startsWith("book")) return "Booked";
  if (s === "reserved" || s === "hold" || s === "on hold" ||
      s === "blocked" || s.startsWith("reserv")) return "Reserved";
  return "Available";
}

/* ─── Numeric Parser ─────────────────────────────────────────────────────── */
export function parseNumber(val) {
  if (!val) return 0;
  return parseFloat(val.toString().replace(/[^0-9.]/g, "")) || 0;
}

/* ─── Main Fetch ─────────────────────────────────────────────────────────── */
export async function fetchPlots() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();

    if (text.trim().startsWith("<")) {
      throw new Error("Sheet returned HTML — ensure it is published as CSV");
    }

    const rawRows = parseCSV(text);
    if (rawRows.length === 0) return { plots: [], headers: [], error: null };

    const headers     = Object.keys(rawRows[0]);
    const statusKey   = findStatusKey(headers, rawRows);   // e.g. "Booking Status"
    const categoryKey = findCategoryKey(headers);           // e.g. "Category"

    console.log("[Tapovana] headers:",     headers);
    console.log("[Tapovana] statusKey:",   statusKey);
    console.log("[Tapovana] categoryKey:", categoryKey);

    const plots = rawRows.map((row, idx) => {
      // ── Status ────────────────────────────────────────────────────────────
      const rawStatus = statusKey ? (row[statusKey] || "") : "";
      const status    = normalizeStatus(rawStatus);

      // ── Category — read directly from sheet, map to canonical key ─────────
      const rawCategory = categoryKey ? (row[categoryKey] || "") : "";
      const category    = normalizeCategoryName(rawCategory); // "Signature" | "Preferred" | "Classic" | null

      if (idx < 3) {
        console.log(`[Tapovana] Row ${idx}: status="${rawStatus}"→"${status}" | category="${rawCategory}"→"${category}"`);
      }

      return { _id: idx, ...row, status, category };
    });

    // Exclude status + category columns from the visible table headers
    const hiddenCols = new Set(
      [statusKey, categoryKey].filter(Boolean).map((k) => k.trim().toLowerCase())
    );
    const displayHeaders = headers.filter(
      (h) => h.trim() !== "" && !hiddenCols.has(h.trim().toLowerCase())
    );

    return { plots, headers: displayHeaders, error: null };
  } catch (err) {
    console.error("[Tapovana] fetchPlots error:", err);
    return { plots: [], headers: [], error: err.message || "Failed to fetch data" };
  }
}

/* ─── WhatsApp ───────────────────────────────────────────────────────────── */
export function buildWhatsAppUrl(plot) {
  const nameKeys = ["Plot Name", "plot name", "Plot", "Name", "PLOT NAME"];
  const numKeys  = ["Plot No", "plot no", "Plot Number", "No", "Plot #", "PLOT NO", "Sr No", "Sr. No", "Sl No"];

  const findVal = (keys) => {
    for (const k of keys) {
      if (plot[k] && plot[k].toString().trim()) return plot[k].toString().trim();
    }
    for (const k of Object.keys(plot)) {
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

/* ─── Currency ───────────────────────────────────────────────────────────── */
export function formatINR(value) {
  if (!value) return value;
  const num = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return value;
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(num);
}
