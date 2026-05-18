/**
 * components/Footer.jsx
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-forest-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center">
              <svg className="w-4 h-4 text-cream-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-.03C6.85 20.13 9 13.41 17 8z"/>
                <path d="M17 8c0 0-2 8-8 12"/>
              </svg>
            </div>
            <div>
              <p className="font-display text-forest-900 font-semibold text-sm">Tapovana</p>
              <p className="text-forest-400 text-xs">Premium Farmland, Malnad Karnataka</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-forest-400 text-xs">
            <span>Plot data synced live from</span>
            <svg className="w-3 h-3 mx-0.5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3.067L19.933 0 12 7.667 4.067 0 1 3.067l11 11z"/>
              <path d="M1 20.933L4.067 24 12 16.333 19.933 24 23 20.933 12 9.933z"/>
            </svg>
            <span>Google Sheets</span>
            <span className="mx-2">·</span>
            <span>Auto-refreshes every 60 seconds</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
