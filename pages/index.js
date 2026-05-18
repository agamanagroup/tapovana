/**
 * pages/index.js
 * Fix #8 — title updated to Tapovana Farmland
 * Fix #9 — mobile-first padding and layout
 */
import Head from "next/head";
import { useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import FilterBar from "../components/FilterBar";
import PlotTable from "../components/PlotTable";
import PlotCards from "../components/PlotCards";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import Footer from "../components/Footer";
import { useSheetData } from "../lib/useSheetData";

export default function Home() {
  const { plots, headers, loading, error, stats, lastUpdated, refresh } = useSheetData();
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const filteredPlots = useMemo(() => {
    let result = plots;
    if (filter !== "All") {
      // Fix #3 — strict status comparison after normalization
      result = result.filter((p) => p.status === filter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((plot) =>
        Object.values(plot).some((v) => v && v.toString().toLowerCase().includes(q))
      );
    }
    return result;
  }, [plots, filter, search]);

  return (
    <>
      <Head>
        {/* Fix #8 */}
        <title>Tapovana Farmland – Live Plot Availability</title>
        <meta name="description" content="Live plot availability at Tapovana Farmland, Lingadahalli, Sagara, Karnataka"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header lastUpdated={lastUpdated} onRefresh={handleRefresh} refreshing={refreshing}/>

        <main className="flex-1">
          {/* Fix #9 — tighter mobile padding */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">

            <section className="mb-5 sm:mb-8 animate-slide-up">
              <StatsCards stats={stats} loading={loading}/>
            </section>

            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="flex-1 h-px bg-forest-100"/>
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-400">
                Plot Listings
              </span>
              <div className="flex-1 h-px bg-forest-100"/>
            </div>

            {!loading && !error && (
              <section className="mb-4 sm:mb-5 animate-fade-in">
                <FilterBar
                  filter={filter}
                  onFilter={setFilter}
                  search={search}
                  onSearch={setSearch}
                  totalFiltered={filteredPlots.length}
                />
              </section>
            )}

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

                {/* Mobile cards — Fix #9 */}
                <div className="md:hidden animate-slide-up">
                  <PlotCards plots={filteredPlots} headers={headers}/>
                </div>

                {filteredPlots.length > 0 && (
                  <p className="mt-4 text-xs text-forest-400 text-right">
                    Showing {filteredPlots.length} of {plots.length} plots
                  </p>
                )}
              </>
            )}
          </div>
        </main>

        <Footer/>
      </div>
    </>
  );
}
