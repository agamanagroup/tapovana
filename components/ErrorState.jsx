/**
 * components/ErrorState.jsx
 * Displayed when the Google Sheet cannot be fetched
 */
export default function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="font-display text-2xl text-forest-800 font-medium mb-2">
        Could not load plot data
      </p>
      <p className="text-forest-500 text-sm max-w-md mb-2">
        {error || "Unable to fetch data from Google Sheets."}
      </p>
      <p className="text-forest-400 text-xs max-w-sm mb-6">
        Please ensure the Google Sheet is published and the SHEET_CSV_URL is correct.
        Check the README for setup instructions.
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-full bg-forest-700 text-white text-sm font-medium
          hover:bg-forest-600 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Try Again
      </button>
    </div>
  );
}
