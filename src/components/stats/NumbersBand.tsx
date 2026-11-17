import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import GrowthChart from "./GrowthChart";
import { formatLongDate } from "@/lib/format";
import type { NetworkStats } from "@/types/stats";

const monthYear = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

/** The big "network today" numbers on the homepage, from the live Zite totals. */
export default function NumbersBand({ stats }: { stats: NetworkStats }) {
  const first = stats.growth[0]?.total ?? 0;
  return (
    <section className="numbers" aria-labelledby="numbers-title">
      <div className="wrap numbers-inner">
        <div className="numbers-top">
          <div>
            <span className="eyebrow" id="numbers-title">The network today</span>
            <div className="mega">
              <CountUp value={stats.members} />
              <span className="plus">+</span>
            </div>
            <p className="mega-label">
              apprentices have joined since <em>{monthYear(stats.since)}</em>. We started with {first}.
            </p>
            {stats.aspiring > 0 && (
              <p className="mega-sub">
                Plus <b>{stats.aspiring}</b> aspiring apprentices getting application-ready.
              </p>
            )}
          </div>
          <figure className="growth">
            <div className="growth-head">
              <b>Total members, month by month</b>
              {stats.last30 > 0 && <span className="chip-up">+{stats.last30} in the last 30 days</span>}
            </div>
            <GrowthChart growth={stats.growth} />
            <figcaption>Live from our sign-up forms. Latest sign-up: {formatLongDate(stats.updated)}.</figcaption>
          </figure>
        </div>
        <div className="figs">
          <div className="fig">
            <b><CountUp value={stats.employers} /></b>
            <span>employers, from banks and broadcasters to distilleries</span>
          </div>
          <div className="fig">
            <b><CountUp value={stats.places} /></b>
            <span>towns and cities across Scotland</span>
          </div>
          <div className="fig">
            <b><CountUp value={stats.providers} /></b>
            <span>universities, colleges and training providers</span>
          </div>
          <div className="fig">
            <b><CountUp value={stats.friendShare} />%</b>
            <span>joined because a friend or colleague told them</span>
          </div>
        </div>
        <div>
          <Button href="/about#numbers" variant="outline">See who&apos;s in the network</Button>
        </div>
      </div>
    </section>
  );
}
