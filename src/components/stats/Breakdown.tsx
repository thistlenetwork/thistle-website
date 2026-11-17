const LABELS: Record<string, string> = { Other: "Other fields" };

/** Horizontal bars for one breakdown (sectors, places, providers). */
export default function Breakdown({ rows, tone = "purple" }: { rows: [string, number][]; tone?: "purple" | "green" }) {
  const max = Math.max(1, ...rows.map(([, n]) => n));
  return (
    <div className={`bars bars-${tone}`}>
      {rows.map(([name, count]) => (
        <div className="bar-row" key={name}>
          <span>{LABELS[name] ?? name}</span>
          <b>{count}</b>
          <div className="bar-track" aria-hidden="true">
            <i style={{ width: `${(count / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
