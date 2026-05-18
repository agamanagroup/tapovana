/**
 * pages/index.js
 * Tapovana Live Plot Availability — Main page
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
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  // Apply filter + search
  const filteredPlots = useMemo(() => {
    let result = plots;

    // Status filter
    if (filter !== "All") {
      result = result.filter((p) => p.status === filter);
    }

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((plot) =>
        Object.values(plot).some((v) =>
          v && v.toString().toLowerCase().includes(q)
        )
      );
    }

    return result;
  }, [plots, filter, search]);

  return (
    <>
      <Head>
        <title>Tapovana – Live Plot Availability</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Hero Header */}
        <Header lastUpdated={lastUpdated} onRefresh={handleRefresh} refreshing={refreshing} />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Stats cards — always visible, show skeletons while loading */}
            <section className="mb-8 animate-slide-up">
              <StatsCards stats={stats} loading={loading} />
            </section>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-forest-100" />
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-400">
                Plot Listings
              </span>
              <div className="flex-1 h-px bg-forest-100" />
            </div>

            {/* Filter bar */}
            {!loading && !error && (
              <section className="mb-5 animate-fade-in">
                <FilterBar
                  filter={filter}
                  onFilter={setFilter}
                  search={search}
                  onSearch={setSearch}
                  totalFiltered={filteredPlots.length}
                />
              </section>
            )}

            {/* Content */}
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onRetry={handleRefresh} />
            ) : (
              <>
                {/* Desktop table (hidden on mobile) */}
                <div className="hidden md:block animate-slide-up">
                  <PlotTable plots={filteredPlots} headers={headers} />
                </div>

                {/* Mobile cards (hidden on desktop) */}
                <div className="md:hidden animate-slide-up">
                  <PlotCards plots={filteredPlots} headers={headers} />
                </div>

                {/* Result count */}
                {filteredPlots.length > 0 && (
                  <p className="mt-4 text-xs text-forest-400 text-right">
                    Showing {filteredPlots.length} of {plots.length} plots
                  </p>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
