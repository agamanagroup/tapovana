/**
 * components/VideoSection.jsx
 * 16:9 landscape video + 9:16 Shorts — side by side on desktop, stacked on mobile
 */
export default function VideoSection() {
  return (
    <section className="mb-6 animate-fade-in">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-cream-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </div>
        <h2 className="font-display text-xl font-semibold text-forest-900">Tapovana Videos</h2>
      </div>

      {/* Video grid — 3:2 split on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-start">

        {/* 16:9 landscape — takes 3/5 width on desktop */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl overflow-hidden border border-forest-100 shadow-card bg-forest-950">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/cbKXfkBi_sQ?rel=0&modestbranding=1"
                title="Tapovana Farmland — Project Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="px-4 py-3 bg-white flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-forest-800">Project Walkthrough</p>
                <p className="text-xs text-forest-500 mt-0.5">A detailed tour of Tapovana Farmland</p>
              </div>
              <a
                href="https://www.youtube.com/watch?v=cbKXfkBi_sQ"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium
                  border border-red-200 transition-all duration-200"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>

        {/* 9:16 Shorts — takes 2/5 width on desktop, portrait */}
        <div className="lg:col-span-2 flex justify-center lg:justify-start">
          <div className="w-full" style={{ maxWidth: "300px" }}>
            <div className="rounded-2xl overflow-hidden border border-forest-100 shadow-card bg-forest-950">
              <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                <iframe
                  src="https://www.youtube.com/embed/0hhUeOokxow?rel=0&modestbranding=1"
                  title="Tapovana Farmland — Quick Teaser"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <div className="px-4 py-3 bg-white flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-forest-800 truncate">Quick Teaser</p>
                  <p className="text-xs text-forest-500 mt-0.5">YouTube Shorts</p>
                </div>
                <a
                  href="https://www.youtube.com/shorts/0hhUeOokxow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium
                    border border-red-200 transition-all duration-200"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  Shorts
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
