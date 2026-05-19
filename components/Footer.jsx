/**
 * Footer.jsx — with Navodita credit (Fix 3)
 */
export default function Footer() {
  return (
    <footer className="mt-8 border-t border-forest-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-cream-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8C8 10 5.9 16.17 3.82 21.34"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8s-2 8-8 12"/>
              </svg>
            </div>
            <div>
              <p className="font-display text-forest-900 font-semibold text-sm">Tapovana Farmland</p>
              <p className="text-forest-400 text-xs">Lingadahalli, Sagara, Karnataka</p>
            </div>
          </div>

          {/* Right — sync info + Navodita credit */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center gap-1.5 text-forest-400 text-xs">
              <svg className="w-3 h-3 text-green-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3.067L19.933 0 12 7.667 4.067 0 1 3.067l11 11z"/>
                <path d="M1 20.933L4.067 24 12 16.333 19.933 24 23 20.933 12 9.933z"/>
              </svg>
              <span>Live from Google Sheets · Auto-refreshes every 60s</span>
            </div>

            {/* Navodita credit */}
            <p className="text-forest-400 text-xs">
              Designed &amp; Developed by{" "}
              <a
                href="https://navodita.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-700 hover:text-forest-900 underline underline-offset-2 font-semibold transition-colors duration-200"
              >
                Navodita
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
