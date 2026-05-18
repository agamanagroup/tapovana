/**
 * components/Header.jsx
 * Premium hero header for Tapovana
 */
export default function Header({ lastUpdated, onRefresh, refreshing }) {
  return (
    <header className="relative overflow-hidden bg-forest-900 hero-texture">
      {/* Decorative leaf/nature silhouette */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <svg
          className="absolute right-0 top-0 h-full opacity-[0.04]"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M380 0C380 0 200 80 160 200C120 320 200 400 160 500C120 600 0 600 0 600H400V0H380Z"
            fill="white"
          />
          <path
            d="M300 100C280 160 220 180 200 250C180 320 220 380 200 440C180 500 120 520 100 560"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="200" cy="250" r="60" fill="white" opacity="0.5" />
          <circle cx="180" cy="380" r="40" fill="white" opacity="0.3" />
        </svg>
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Branding */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
                Live Availability
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight">
              Tapovana
              <span className="block text-cream-300 font-light italic mt-1">
                Plot Availability
              </span>
            </h1>

            <p className="mt-3 text-forest-200 text-base md:text-lg font-light max-w-xl leading-relaxed">
              Real-time farmland plot status in the heart of Malnad's pristine landscape.
              Secure your piece of nature.
            </p>
          </div>

          {/* Meta info */}
          <div className="flex flex-col items-start md:items-end gap-2">
            {/* Location badge */}
            <div className="flex items-center gap-2 text-forest-300 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Malnad, Karnataka</span>
            </div>

            {/* Last updated */}
            <div className="flex items-center gap-3 text-forest-400 text-xs">
              {lastUpdated && (
                <span>
                  Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20
                  border border-white/20 text-white/70 hover:text-white text-xs transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh data"
              >
                <svg
                  className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="h-1 bg-gradient-to-r from-forest-600 via-cream-400 to-forest-600" />
    </header>
  );
}
