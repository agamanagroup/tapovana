/**
 * components/PhaseMessage.jsx
 * Subtle Phase 1 closure announcement — shown between stats and category legend.
 * Controlled via NEXT_PUBLIC_SHOW_PHASE_MESSAGE env variable.
 */
export default function PhaseMessage() {
  return (
    <div className="animate-fade-in">
      <div className="flex gap-4 items-start p-4 sm:p-5 rounded-2xl
        bg-forest-50 border border-forest-200">

        {/* Leaf icon */}
        <div className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-forest-900
          flex items-center justify-center">
          <svg className="w-4 h-4 text-cream-300" fill="none" stroke="currentColor"
            strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
              11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29
              9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-forest-800 mb-1">
            Phase 1 Bookings Successfully Closed
          </p>
          <p className="text-sm text-forest-600 leading-relaxed font-light italic font-display">
            Thank you for the overwhelming response and trust in Tapovana.
            50% of Tapovana Farmland has now been booked by our early members.
            We are deeply grateful for your trust, enthusiasm, and belief in this vision.
          </p>
        </div>

      </div>
    </div>
  );
}
