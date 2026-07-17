/**
 * pages/index.js
 *
 * CURRENT: Price hidden (Total Price + Per Acre columns), Phase message visible
 * In October — Claude will give you a new index.js with price back on
 */
import Head from "next/head";
import { useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import PhaseMessage from "../components/PhaseMessage";
import FilterBar from "../components/FilterBar";
import PlotTable from "../components/PlotTable";
import PlotCards from "../components/PlotCards";
import CategoryLegend from "../components/CategoryLegend";
import BufferAreaNote from "../components/BufferAreaNote";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import Footer from "../components/Footer";
import { useSheetData } from "../lib/useSheetData";
import { parseNumber } from "../lib/fetchSheets";

// ── Hardcoded flags — change these in October ────────────────────────────────
const SHOW_PRICE         = false;  // ← set to true in October to restore pricing
const SHOW_PHASE_MESSAGE = true;   // ← set to false in October to hide the message

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatLakhsLabel(raw) {
  const num = parseNumber(raw);
  if (!num) return raw;
  const l = num / 100000;
  return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
}

function findTotalAreaKey(headers) {
  const c = h => h.toLowerCase().replace(/\s+/g, " ").trim();
  return (
    headers.find(h => c(h) === "total area") ||
    headers.find(h => c(h).includes("total") && c(h).includes("area") && !c(h).includes("buffer")) ||
    headers.find(h => c(h).includes("area") && !c(h).includes("buffer")) ||
    null
  );
}

function findTotalPriceKey(headers) {
  const c = h => h.toLowerCase().replace(/\s+/g, " ").trim();
  return (
    headers.find(h => c(h).includes("total") && c(h).includes("price")) ||
    headers.find(h => c(h).includes("price") && !c(h).includes("acre") && !c(h).includes("per")) ||
    null
  );
}

/** Finds the Per Acre price column — matches "per acre (₹)", "per acre", "per ac" etc. */
function findPerAcreKey(headers) {
  const c = h => h.toLowerCase().replace(/\s+/g, " ").trim();
  return (
    headers.find(h => c(h) === "per acre (₹)") ||
    headers.find(h => c(h).includes("per ac")) ||
    headers.find(h => c(h).includes("per") && c(h).includes("acre")) ||
    null
  );
}

/** Returns headers with all price-related columns removed */
function stripPriceColumns(headers) {
  const totalPriceKey = findTotalPriceKey(headers);
  const perAcreKey    = findPerAcreKey(headers);
  const priceKeys     = new Set([totalPriceKey, perAcreKey].filter(Boolean));
  return headers.filter(h => !priceKeys.has(h));
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { plots, headers, loading, error, stats, lastUpdated, refresh } = useSheetData();
  const [filter,      setFilter]      = useState("All");
  const [search,      setSearch]      = useState("");
  const [areaFilter,  setAreaFilter]  = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [refreshing,  setRefreshing]  = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  // Strip Total Price + Per Acre columns when price is hidden
  const displayHeaders = useMemo(() => {
    if (SHOW_PRICE) return headers;
    return stripPriceColumns(headers);
  }, [headers]);

  // Area filter options
  const areaOptions = useMemo(() => {
    const key = findTotalAreaKey(headers);
    if (!key) return [];
    const vals = [...new Set(plots.map(p => p[key]).filter(Boolean))];
    return vals.sort((a, b) => parseNumber(a) - parseNumber(b));
  }, [plots, headers]);

  // Price filter options — hidden when SHOW_PRICE is false
  const priceOptions = useMemo(() => {
    if (!SHOW_PRICE) return [];
    const key = findTotalPriceKey(headers);
    if (!key) return [];
    const vals = [...new Set(plots.map(p => p[key]).filter(Boolean))];
    return vals
      .sort((a, b) => parseNumber(a) - parseNumber(b))
      .map(v => ({ value: v, label: formatLakhsLabel(v) }));
  }, [plots, headers]);

  const filteredPlots = useMemo(() => {
    let result = plots;
    if (filter !== "All") result = result.filter(p => p.status === filter);
    if (areaFilter) {
      const key = findTotalAreaKey(headers);
      if (key) result = result.filter(p => p[key] === areaFilter);
    }
    if (priceFilter && SHOW_PRICE) {
      const key = findTotalPriceKey(headers);
      if (key) result = result.filter(p => p[key] === priceFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(plot =>
        Object.values(plot).some(v => v && v.toString().toLowerCase().includes(q))
      );
    }
    return result;
  }, [plots, headers, filter, areaFilter, priceFilter, search]);

  return (
    <>
      <Head>
        <title>Tapovana Farmland – Inventory &amp; Plot Availability Tracker</title>
        <meta name="description" content="Live plot inventory and availability at Tapovana Farmland, Lingadahalli, Sagara, Karnataka"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header lastUpdated={lastUpdated} onRefresh={handleRefresh} refreshing={refreshing}/>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">

            {/* Stats */}
            <section className="mb-5 sm:mb-6 animate-slide-up">
              <StatsCards stats={stats} loading={loading}/>
            </section>

            {/* Phase 1 closure message */}
            {SHOW_PHASE_MESSAGE && !loading && !error && (
              <section className="mb-5 animate-fade-in">
                <PhaseMessage/>
              </section>
            )}

            {/* Category legend */}
            {!loading && !error && (
              <section className="mb-5 animate-fade-in">
                <CategoryLegend/>
              </section>
            )}

            {/* Plot listings divider */}
            <div className="flex items-center gap-4 mb-4 sm:mb-5">
              <div className="flex-1 h-px bg-forest-100"/>
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-400">
                Plot Listings
              </span>
              <div className="flex-1 h-px bg-forest-100"/>
            </div>

            {/* Filters */}
            {!loading && !error && (
              <section className="mb-4 sm:mb-5 animate-fade-in">
                <FilterBar
                  filter={filter}           onFilter={setFilter}
                  search={search}           onSearch={setSearch}
                  areaFilter={areaFilter}   onAreaFilter={setAreaFilter}   areaOptions={areaOptions}
                  priceFilter={priceFilter} onPriceFilter={setPriceFilter} priceOptions={priceOptions}
                  totalFiltered={filteredPlots.length}
                />
              </section>
            )}

            {/* Content */}
            {loading ? (
              <LoadingState/>
            ) : error ? (
              <ErrorState error={error} onRetry={handleRefresh}/>
            ) : (
              <>
                <div className="hidden md:block animate-slide-up">
                  <PlotTable plots={filteredPlots} headers={displayHeaders}/>
                </div>
                <div className="md:hidden animate-slide-up">
                  <PlotCards plots={filteredPlots} headers={displayHeaders}/>
                </div>
                {filteredPlots.length > 0 && (
                  <p className="mt-3 text-xs text-forest-400 text-right">
                    Showing {filteredPlots.length} of {plots.length} plots
                  </p>
                )}
                <BufferAreaNote/>
              </>
            )}
          </div>
        </main>

        <Footer/>
      </div>
    </>
  );
}
