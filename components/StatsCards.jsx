/**
 * components/StatsCards.jsx
 * Dynamic summary cards calculated from Google Sheets data
 */

const CARDS = [
  {
    key: "total",
    label: "Total Plots",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: "text-forest-700",
    bg: "bg-forest-50",
    border: "border-forest-100",
    accent: "bg-forest-700",
  },
  {
    key: "available",
    label: "Available",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-forest-700",
    bg: "bg-forest-50",
    border: "border-forest-100",
    accent: "bg-forest-500",
  },
  {
    key: "booked",
    label: "Booked",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-100",
    accent: "bg-red-500",
  },
  {
    key: "reserved",
    label: "Reserved",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-100",
    accent: "bg-amber-500",
  },
];

function StatCard({ card, value, loading }) {
  return (
    <div
      className={`stat-card border ${card.border} animate-fade-in group cursor-default`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${card.accent} rounded-t-2xl`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500 mb-1">
            {card.label}
          </p>
          {loading ? (
            <div className="skeleton h-9 w-14 mt-1" />
          ) : (
            <p className={`text-4xl font-display font-semibold ${card.color} leading-none`}>
              {value}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} transition-transform duration-200 group-hover:scale-110`}>
          {card.icon}
        </div>
      </div>

      {/* Progress bar */}
      {!loading && card.key !== "total" && (
        <div className="mt-4">
          <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${card.accent} transition-all duration-700`}
              style={{
                width: value > 0 ? "100%" : "0%",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function StatsCards({ stats, loading }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CARDS.map((card) => (
        <StatCard
          key={card.key}
          card={card}
          value={stats[card.key]}
          loading={loading}
        />
      ))}
    </div>
  );
}
