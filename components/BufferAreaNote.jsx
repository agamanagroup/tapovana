/**
 * components/BufferAreaNote.jsx
 * Buffer Area Inclusion note shown at the bottom of the plot listings.
 */

const POINTS = [
  "The buffer area has been thoughtfully allocated to ensure shared access to essential community and ecological infrastructure within Tapovana.",
  "A 30 Guntas farm pond will be developed, with easement rights provided collectively to all plot owners.",
  "Common civic amenities such as internal roads, Dhyana Mandira, badminton courts, and other shared spaces will be proportionately accessible to every plot owner.",
  "This allocation is intended to enhance the overall living experience, sustainability, and long-term value of the community.",
];

export default function BufferAreaNote() {
  return (
    <div className="mt-8 rounded-2xl overflow-hidden border border-forest-200 shadow-card">
      {/* Header */}
      <div className="bg-forest-900 px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white tracking-tight">
            Buffer Area Inclusion
          </h2>
          <p className="text-forest-300 text-xs mt-0.5">Shared community & ecological infrastructure</p>
        </div>
      </div>

      {/* Points */}
      <div className="bg-white px-5 py-5">
        <ul className="space-y-4">
          {POINTS.map((point, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 w-5 h-5 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500"/>
              </span>
              <p className="text-sm text-forest-700 leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-forest-600 via-cream-400 to-forest-600"/>
    </div>
  );
}
