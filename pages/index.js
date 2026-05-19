/**
 * pages/index.js
 * Enhancements: category legend, area/price filters, buffer area note
 */
import Head from "next/head";
import { useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
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

  // Derive unique sorted Area options from the data
  const areaOptions = useMemo(() => {
    const areaKey = headers.find((h) => {
      const l = h.toLowerCase();
      return l.includes("area") && (l.includes("sq") || l.includes("sqft"));
    }) || headers.find((h) => h.toLowerCase().includes("area"));

    if (!areaKey) return [];
    const vals = [...new Set(plots.map((p) => p[areaKey]).filter(Boolean))];
    return vals.sort((a, b) => parseNumber(a) - parseNumber(b));
  }, [plots, headers]);

  // Derive unique sorted Price options from the data
  const priceOptions = useMemo(() => {
    const priceKey = headers.find((h) => h.toLowerCase().includes("total"))
      || headers.find((h) => h.toLowerCase().includes("price"));

    if (!priceKey) return [];
    const vals = [...new Set(plots.map((p) => p[priceKey]).filter(Boolean))];
    return vals.sort((a, b) => parseNumber(a) - parseNumber(b));
  }, [plots, headers]);

  const filteredPlots = useMemo(() => {
    let result = plots;

    if (filter !== "All") {
      result = result.filter((p) => p.status === filter);
    }

    // Area filter — match by value string
    if (areaFilter) {
      const areaKey = headers.find((h) => {
        const l = h.toLowerCase();
        return l.includes("area") && (l.includes("sq") || l.includes("sqft"));
      }) || headers.find((h) => h.toLowerCase().includes("area"));
      if (areaKey) result = result.filter((p) => p[areaKey] === areaFilter);
    }

    // Price filter — match by value string
    if (priceFilter) {
      const priceKey = headers.find((h) => h.toLowerCase().includes("total"))
        || headers.find((h) => h.toLowerCase().includes("price"));
      if (priceKey) result = result.filter((p) => p[priceKey] === priceFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((plot) =>
        Object.values(plot).some((v) => v && v.toString().toLowerCase().includes(q))
      );
    }

    return result;
  }, [plots, headers, filter, areaFilter, priceFilter, search]);

  return (
    <>
      <Head>
        <title>Tapovana Farmland – Live Plot Availability</title>
        <meta name="description" content="Live plot availability at Tapovana Farmland, Lingadahalli, Sagara, Karnataka"/>
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

            {/* Category legend */}
            {!loading && !error && (
              <section className="mb-5 animate-fade-in">
                <CategoryLegend/>
              </section>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 mb-4 sm:mb-5">
              <div className="flex-1 h-px bg-forest-100"/>
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-400">Plot Listings</span>
              <div className="flex-1 h-px bg-forest-100"/>
            </div>

            {/* Filters */}
            {!loading && !error && (
              <section className="mb-4 sm:mb-5 animate-fade-in">
                <FilterBar
                  filter={filter}        onFilter={setFilter}
                  search={search}        onSearch={setSearch}
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
                {/* Desktop table */}
                <div className="hidden md:block animate-slide-up">
                  <PlotTable plots={filteredPlots} headers={headers}/>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden animate-slide-up">
                  <PlotCards plots={filteredPlots} headers={headers}/>
                </div>

                {filteredPlots.length > 0 && (
                  <p className="mt-3 text-xs text-forest-400 text-right">
                    Showing {filteredPlots.length} of {plots.length} plots
                  </p>
                )}

                {/* Buffer Area Note — always shown after listings */}
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
