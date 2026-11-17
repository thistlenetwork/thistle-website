"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { formatShortDate } from "@/lib/format";
import type { Event } from "@/types/event";

/**
 * The events list with "coming up / past" and place filters. With `limit` (the homepage),
 * it shows that many events, drops the place filters and links to the full list.
 */
export default function EventsList({ events, limit }: { events: Event[]; limit?: number }) {
  const isPast = (e: Event) => e.status === "previous" || e.status === "past";
  const hasUpcoming = events.some((e) => !isPast(e));
  const [when, setWhen] = useState<"upcoming" | "past">(hasUpcoming ? "upcoming" : "past");
  const [place, setPlace] = useState("all");

  const places = [...new Set(events.map((e) => e.place))].sort(
    (a, b) => events.filter((e) => e.place === b).length - events.filter((e) => e.place === a).length
  );
  const rows = events
    .filter((e) => (when === "past") === isPast(e))
    .filter((e) => place === "all" || e.place === place)
    .sort((a, b) => {
      const da = a.date ?? "9999";
      const db = b.date ?? "9999";
      return when === "past" ? db.localeCompare(da) : da.localeCompare(db);
    })
    .slice(0, limit);

  return (
    <>
      <div className="toolbar">
        <div className="seg" role="group" aria-label="When">
          <button type="button" aria-pressed={when === "upcoming"} onClick={() => setWhen("upcoming")}>Coming up</button>
          <button type="button" aria-pressed={when === "past"} onClick={() => setWhen("past")}>Past</button>
        </div>
        {!limit && (
          <div className="chips" role="group" aria-label="Where">
            {[["all", "Everywhere"], ...places.map((p) => [p, p])].map(([value, label]) => (
              <button key={value} type="button" className="chip" aria-pressed={place === value} onClick={() => setPlace(value)}>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="event-list">
        {rows.length === 0 ? (
          <div className="empty">Nothing here yet. {when === "upcoming" ? "New dates are added often, so check back soon." : "Past events will show here."}</div>
        ) : (
          rows.map((e) => {
            const d = e.date ? new Date(`${e.date}T12:00:00Z`) : null;
            return (
              <article className="event-row" key={e.id}>
                <div className="event-date">
                  {d ? (
                    <>
                      <b>{d.getUTCDate()}</b>
                      <small>{formatShortDate(e.date!).split(" ").slice(1).join(" ")}</small>
                    </>
                  ) : (
                    <>
                      <b>TBC</b>
                      <small>Date soon</small>
                    </>
                  )}
                </div>
                <div className="event-body">
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                  <div className="event-meta">
                    <span className="pill pill-current">{e.place}</span>
                    <span className="pill pill-plain">{isPast(e) ? "Past" : d ? "Upcoming" : "Date to be confirmed"}</span>
                  </div>
                </div>
                <div className="event-status">
                  {isPast(e) ? (
                    e.attended ? <><b>{e.attended}</b> came</> : null
                  ) : (
                    <Link className="btn btn-outline" href={e.cta.link}>Register interest</Link>
                  )}
                  {isPast(e) && e.photos.length > 0 && <Link className="event-photos" href={`/gallery#${e.id}`}>Photos →</Link>}
                </div>
              </article>
            );
          })
        )}
      </div>
      {limit && (
        <div className="list-more">
          <Button href="/events" variant="outline">See all events</Button>
        </div>
      )}
    </>
  );
}
