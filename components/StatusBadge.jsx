/**
 * components/StatusBadge.jsx
 * Renders a colored status badge for a plot row.
 */

const CONFIG = {
  Available: {
    cls: "badge-available",
    dot: "bg-forest-500",
    label: "Available",
  },
  Booked: {
    cls: "badge-booked",
    dot: "bg-red-500",
    label: "Booked",
  },
  Reserved: {
    cls: "badge-reserved",
    dot: "bg-amber-500",
    label: "Reserved",
  },
};

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] || CONFIG["Available"];
  return (
    <span className={cfg.cls}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
