"use client";

import { useState } from "react";

const ROUTES = [
  { id: "foundation", name: "Foundation", good: "Trying a sector before you leave school.", who: "Pupils in S5 and S6", how: "Taken alongside your school subjects, with time at college and with an employer.", level: "SCQF level 6, around Higher level" },
  { id: "modern", name: "Modern", good: "Earning a wage while you get qualified.", who: "Anyone aged 16 or over", how: "A paid job with training. You learn on the job and with a college or training provider.", level: "From SCQF level 5 upwards, depending on the role" },
  { id: "graduate", name: "Graduate", good: "A degree with no tuition fees, and years of experience by the end.", who: "School leavers and people already in work", how: "Study for a degree with a university while you work for an employer.", level: "Degree level, SCQF 8 to 11" },
];

/** Scotland's three apprenticeship routes, one at a time. */
export default function RouteTabs() {
  const [active, setActive] = useState("modern");
  const route = ROUTES.find((r) => r.id === active)!;
  return (
    <>
      <div className="chips" role="group" aria-label="Apprenticeship route">
        {ROUTES.map((r) => (
          <button key={r.id} type="button" className="chip" aria-pressed={r.id === active} onClick={() => setActive(r.id)}>
            {r.name}
          </button>
        ))}
      </div>
      <div className="route-panel" aria-live="polite">
        <div className="stack">
          <span className="pill pill-aspiring">{route.name} apprenticeship</span>
          <h3>{route.good}</h3>
        </div>
        <dl>
          <div><dt>Who it&apos;s for</dt><dd>{route.who}</dd></div>
          <div><dt>How it works</dt><dd>{route.how}</dd></div>
          <div><dt>Level</dt><dd>{route.level}</dd></div>
        </dl>
      </div>
    </>
  );
}
