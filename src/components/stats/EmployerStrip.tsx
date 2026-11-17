import type { NetworkStats } from "@/types/stats";

/** A slow scrolling strip of the employers our members work at (only those with 2 or more members). */
export default function EmployerStrip({ stats }: { stats: NetworkStats }) {
  const more = stats.employers - stats.namedEmployers.length;
  const items = ["Our members work at", ...stats.namedEmployers, ...(more > 0 ? [`and ${more} more`] : [])];
  return (
    <div className="employer-strip" aria-label={`Our members work at ${stats.namedEmployers.join(", ")}${more > 0 ? ` and ${more} more employers` : ""}`}>
      <div className="employer-track" aria-hidden="true">
        {[0, 1].map((copy) =>
          items.map((item, i) => (
            <span key={`${copy}-${i}`} className={i === 0 ? "lead" : undefined}>
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
