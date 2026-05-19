/**
 * components/Header.jsx
 * Enhancement: Download Layout Sketch button
 */

// PDF path — upload your PDF as /public/layout-sketch.pdf
// Override via NEXT_PUBLIC_LAYOUT_PDF_URL env variable
const LAYOUT_PDF_URL =
  process.env.NEXT_PUBLIC_LAYOUT_PDF_URL ||
  "https://raw.githubusercontent.com/agamanagroup/tapovana/main/Tapovana-Farmland-Sketch.pdf";

export default function Header({ lastUpdated, onRefresh, refreshing }) {
  return (
    <header className="relative overflow-hidden bg-forest-900 hero-texture">
      <div className="absolute inset-0 pointer-events-none select-none">
        <svg className="absolute right-0 top-0 h-full opacity-[0.04]" viewBox="0 0 400 600" fill="none">
          <path d="M380 0C380 0 200 80 160 200C120 320 200 400 160 500C120 600 0 600 0 600H400V0H380Z" fill="white"/>
          <path d="M300 100C280 160 220 180 200 250C180 320 220 380 200 440C180 500 120 520 100 560" stroke="white" strokeWidth="2" fill="none"/>
          <circle cx="200" cy="250" r="60" fill="white" opacity="0.5"/>
          <circle cx="180" cy="380" r="40" fill="white" opacity="0.3"/>
        </svg>
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* Top bar — Navodita credit */}
        <div className="flex justify-end mb-3">
          <span className="text-white/40 text-xs">
            Designed &amp; Developed by{" "}
            <a href="https://navodita.com/" target="_blank" rel="noopener noreferrer"
              className="text-cream-300 hover:text-white underline underline-offset-2 transition-colors duration-200">
              Navodita
            </a>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          {/* Branding + Download button */}
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"/>
              </span>
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Live Availability</span>
            </div>

            <h1 className="font-display font-semibold text-white leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Tapovana Farmland
              <span className="block text-cream-300 font-light italic mt-1 text-2xl sm:text-3xl md:text-4xl">
                Plot Availability
              </span>
            </h1>

            {/* Download Layout Sketch button */}
            <div className="mt-4">
              <a
                href={LAYOUT_PDF_URL}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-cream-300 hover:bg-cream-200 active:bg-cream-400
                  text-forest-900 font-medium text-sm
                  transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download Layout Sketch
              </a>
            </div>
          </div>

          {/* Meta / refresh */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2">
            <div className="flex items-center gap-1.5 text-forest-300 text-xs sm:text-sm">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Lingadahalli, Sagara, Karnataka</span>
            </div>

            <div className="flex items-center gap-2 text-forest-400 text-xs">
              {lastUpdated && (
                <span className="hidden sm:inline">
                  Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20
                  border border-white/20 text-white/70 hover:text-white text-xs transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <svg className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-forest-600 via-cream-400 to-forest-600"/>
    </header>
  );
}
