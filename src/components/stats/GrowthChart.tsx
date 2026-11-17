import type { NetworkStats } from "@/types/stats";

const W = 640;
const H = 250;
const PAD = { left: 34, right: 50, top: 34, bottom: 30 };

const monthLabel = (month: string) => new Date(`${month}-15T12:00:00Z`).toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" });

/** Total members month by month, drawn as an SVG at build time (no chart library). */
export default function GrowthChart({ growth }: { growth: NetworkStats["growth"] }) {
  const max = Math.max(...growth.map((p) => p.total));
  const top = Math.ceil(max / 50) * 50;
  const x = (i: number) => PAD.left + (i * (W - PAD.left - PAD.right)) / Math.max(1, growth.length - 1);
  const y = (v: number) => PAD.top + (1 - v / top) * (H - PAD.top - PAD.bottom);
  const line = growth.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.total).toFixed(1)}`).join("");
  const area = `${line}L${x(growth.length - 1)},${y(0)}L${x(0)},${y(0)}Z`;
  const ticks = Array.from({ length: top / 50 + 1 }, (_, i) => i * 50);
  const first = growth[0];
  const last = growth[growth.length - 1];

  return (
    <svg className="growth-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Members grew from ${first.total} in ${monthLabel(first.month)} to ${last.total} in ${monthLabel(last.month)}`}>
      <defs>
        <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="g-stop-top" />
          <stop offset="1" className="g-stop-bottom" />
        </linearGradient>
      </defs>
      {ticks.map((v) => (
        <g key={v}>
          <line className="g-grid" x1={PAD.left} x2={W - PAD.right + 10} y1={y(v)} y2={y(v)} />
          <text className="g-label" x={PAD.left - 8} y={y(v) + 4} textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      <path className="g-area" d={area} />
      <path className="g-line" d={line} pathLength={1} />
      {growth.map((p, i) => (
        <text key={p.month} className="g-label" x={x(i)} y={H - 6} textAnchor="middle">
          {monthLabel(p.month)}
        </text>
      ))}
      <circle className="g-dot" cx={x(growth.length - 1)} cy={y(last.total)} r={7} />
      <text className="g-end" x={x(growth.length - 1) + 12} y={y(last.total) - 10}>
        {last.total}
      </text>
    </svg>
  );
}
