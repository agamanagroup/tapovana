/**
 * lib/useSheetData.js
 * Custom hook to fetch and auto-refresh Google Sheets plot data.
 */
import { useState, useEffect, useCallback } from "react";
import { fetchPlots } from "./fetchSheets";

const REFRESH_INTERVAL_MS = 60 * 1000; // Auto-refresh every 60 seconds

export function useSheetData() {
  const [plots, setPlots] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async () => {
    try {
      const { plots: p, headers: h, error: e } = await fetchPlots();
      if (e) {
        setError(e);
      } else {
        setPlots(p);
        setHeaders(h);
        setError(null);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [load]);

  const stats = {
    total: plots.length,
    available: plots.filter((p) => p.status === "Available").length,
    booked: plots.filter((p) => p.status === "Booked").length,
    reserved: plots.filter((p) => p.status === "Reserved").length,
  };

  return { plots, headers, loading, error, stats, lastUpdated, refresh: load };
}
