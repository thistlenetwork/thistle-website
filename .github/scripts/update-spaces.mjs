// Fills in how many spaces are left for upcoming events that have a "spacesFrom" address in
// events.json (a Zite form's /api/getCapacity, which returns counts only, no names).
// Run by .github/workflows/deploy.yml before each deploy (every push and every hour).
// If a form can't be reached, that event simply shows no spaces line.
import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync("events.json", "utf8"));
const today = new Date(new Date().toDateString());
let changed = 0;

for (const event of data.events) {
  if (!event.spacesFrom) continue;
  if (event.date && new Date(event.date + "T23:59:59") < today) continue; // past events keep their attendance
  try {
    const res = await fetch(event.spacesFrom, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const body = await res.json();
    const activities = Array.isArray(body.activities) ? body.activities : [];
    if (!activities.length) throw new Error("no activities in the reply");
    const left = activities.reduce((sum, a) => sum + Math.max(0, Number(a.spotsLeft) || 0), 0);
    event.spaces = { left, full: activities.every((a) => a.isFull || Number(a.spotsLeft) <= 0), checked: new Date().toISOString() };
    changed += 1;
    console.log(`${event.title}: ${left} spaces left${event.spaces.full ? " (full)" : ""}.`);
  } catch (error) {
    console.log(`::warning::Couldn't check spaces for ${event.title}: ${error.message}`);
  }
}

if (changed) writeFileSync("events.json", JSON.stringify(data, null, 2) + "\n");
