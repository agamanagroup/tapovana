/**
 * components/Header.jsx
 * Fix 3: WhatsApp Contact Agamana Developers button
 * Fix 6: Updated title to "Tapovana Farmland / Inventory & Plot Availability Tracker"
 */

const LAYOUT_PDF_URL =
  process.env.NEXT_PUBLIC_LAYOUT_PDF_URL ||
  "https://raw.githubusercontent.com/agamanagroup/tapovana/main/Tapovana-Farmland-Sketch.pdf";

const WA_CONTACT_URL = "https://wa.me/917090644644?text=" +
  encodeURIComponent("Hi, I would like to know more about Tapovana Farmland plots. Please share details.");

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

        {/* Navodita credit */}
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
          {/* Branding + CTA buttons */}
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"/>
              </span>
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Live Availability</span>
            </div>

            {/* Fix 6 — Updated title */}
            <h1 className="font-display font-semibold text-white leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Tapovana Farmland
              <span className="block text-cream-300 font-light italic mt-1 text-xl sm:text-2xl md:text-3xl">
                Inventory &amp; Plot Availability Tracker
              </span>
            </h1>

            {/* Fix 3 — Two CTA buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              {/* Download Layout Sketch */}
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

              {/* Download 2D Sketch */}
              <a
                href="https://raw.githubusercontent.com/agamanagroup/tapovana/main/Tapovana-2D-Sketch.jpg"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-white/15 hover:bg-white/25 active:bg-white/30
                  text-white font-medium text-sm border border-white/30
                  transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Download 2D Sketch
              </a>

              {/* Download Brochure */}
              <a
                href="https://raw.githubusercontent.com/agamanagroup/tapovana/main/Tapovana-Farmland-Brochure-Digital-Version.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-white/15 hover:bg-white/25 active:bg-white/30
                  text-white font-medium text-sm border border-white/30
                  transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download Brochure
              </a>

              {/* Fix 3 — Contact Agamana Developers WhatsApp */}
              <a
                href={WA_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-[#25D366] hover:bg-[#1fba58] active:bg-[#18a34e]
                  text-white font-medium text-sm
                  transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact Agamana Developers
              </a>
            </div>
          </div>

          {/* Location + refresh */}
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
