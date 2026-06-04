import Head from "next/head";
import Link from "next/link";

export default function Videos() {
  return (
    <>
      <Head>
        <title>Tapovana Videos – Farmland Walkthrough &amp; Teaser</title>
        <meta name="description" content="Watch Tapovana Farmland videos — project walkthrough and quick teaser"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
      </Head>

      <div className="min-h-screen flex flex-col bg-[#f7f5f0]">

        {/* Page header */}
        <header className="bg-forest-900 hero-texture">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Link href="/"
                  className="inline-flex items-center gap-2 text-forest-300 hover:text-white text-sm mb-4 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Back to Plot Listings
                </Link>
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Videos</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight">
                  Tapovana Videos
                  <span className="block text-cream-300 font-light italic mt-1 text-xl sm:text-2xl">
                    See the land, feel the vision
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-forest-600 via-cream-400 to-forest-600"/>
        </header>

        {/* Videos */}
        <main className="flex-1">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

              {/* 16:9 landscape — 3/5 width on desktop */}
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
                  <div className="px-5 py-4 bg-white">
                    <p className="text-base font-semibold text-forest-800">Project Walkthrough</p>
                    <p className="text-sm text-forest-500 mt-1">A detailed tour of Tapovana Farmland — explore the land, infrastructure, and surroundings.</p>
                    <a
                      href="https://www.youtube.com/watch?v=cbKXfkBi_sQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full
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

              {/* 9:16 Shorts — 2/5 width on desktop */}
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
                    <div className="px-5 py-4 bg-white">
                      <p className="text-base font-semibold text-forest-800">Quick Teaser</p>
                      <p className="text-sm text-forest-500 mt-1">A short glimpse of Tapovana's natural beauty.</p>
                      <a
                        href="https://www.youtube.com/shorts/0hhUeOokxow"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full
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
              </div>

            </div>

            {/* Back link */}
            <div className="mt-10 pt-6 border-t border-forest-100">
              <Link href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-forest-700 hover:bg-forest-600 text-white text-sm font-medium
                  transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Plot Listings
              </Link>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-forest-100 bg-white py-5 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-forest-900 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-cream-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8C8 10 5.9 16.17 3.82 21.34"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8s-2 8-8 12"/>
                </svg>
              </div>
              <div>
                <p className="font-display text-forest-900 font-semibold text-sm">Tapovana Farmland</p>
                <p className="text-forest-400 text-xs">Lingadahalli, Sagara, Karnataka</p>
              </div>
            </div>
            <p className="text-forest-400 text-xs">
              Designed &amp; Developed by{" "}
              <a href="https://navodita.com/" target="_blank" rel="noopener noreferrer"
                className="text-forest-700 hover:text-forest-900 underline underline-offset-2 font-semibold transition-colors duration-200">
                Navodita
              </a>
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
