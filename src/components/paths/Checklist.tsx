"use client";

import { usePersistedValue } from "@/lib/hooks/usePersistedValue";

const ITEMS: [string, string][] = [
  ["Pick two or three sectors you'd like to work in", "Engineering, digital, finance, construction…"],
  ["Write a CV that fits on one page", "Include part-time jobs, clubs and volunteering"],
  ["Find five employers that hire apprentices", "Check apprenticeships.scot and company careers pages"],
  ["Note the application deadlines", "Many big employers open in autumn and close by spring"],
  ["Draft an answer to 'why this apprenticeship?'", "Be specific about the company and the role"],
  ["Do a practice interview", "Ask a Thistle mentor to run one with you"],
  ["Prepare two questions to ask the interviewer", "About the training, the team or the day to day"],
  ["Go to an insight day or open evening", "See the workplace before you commit"],
];

/** Application-readiness checklist, saved in the visitor's own browser. */
export default function Checklist() {
  const [value, setValue] = usePersistedValue("checklist", "");
  const done = new Set(value ? value.split(",").map(Number) : []);
  const toggle = (i: number) => {
    if (done.has(i)) done.delete(i);
    else done.add(i);
    setValue([...done].sort((a, b) => a - b).join(","));
  };
  return (
    <div>
      <div className="meter">
        <span>{done.size} of {ITEMS.length} done</span>
        <div className="bar-track" aria-hidden="true">
          <i style={{ width: `${(done.size / ITEMS.length) * 100}%` }} />
        </div>
      </div>
      <div className="checklist">
        {ITEMS.map(([title, hint], i) => (
          <label className="check" key={title}>
            <input type="checkbox" id={`check-${i}`} checked={done.has(i)} onChange={() => toggle(i)} />
            <span>
              <b>{title}</b>
              <small>{hint}</small>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
