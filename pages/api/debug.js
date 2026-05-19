/**
 * pages/api/debug.js
 * Visit /api/debug on your deployed app to see the raw headers & first 3 rows
 * from Google Sheets. Use this to diagnose column name issues.
 * DELETE this file once everything is working.
 */
import { SHEET_CSV_URL, parseCSV } from "../../lib/fetchSheets";

export default async function handler(req, res) {
  try {
    const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    const text     = await response.text();
    const rows     = parseCSV(text);

    const headers  = rows.length > 0 ? Object.keys(rows[0]) : [];

    // Show each header with its char codes to expose invisible characters
    const headerDetails = headers.map((h) => ({
      raw:       h,
      trimmed:   h.trim(),
      lower:     h.trim().toLowerCase(),
      charCodes: [...h].map((c) => c.charCodeAt(0)),
    }));

    res.status(200).json({
      totalRows:     rows.length,
      headers:       headers,
      headerDetails: headerDetails,
      firstThreeRows: rows.slice(0, 3),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
