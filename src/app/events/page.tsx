import type { Metadata } from "next";
import Events from "@/components/home/Events";
import EventsList from "@/components/events/EventsList";
import Button from "@/components/ui/Button";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { home } from "@/content/home";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Food nights, games, hikes and days out for apprentices across Scotland.",
};

export default function EventsPage() {
  const events = getEvents();
  const past = events.filter((e) => e.status === "previous" || e.status === "past");
  const came = past.reduce((sum, e) => sum + (e.attended ?? 0), 0);
  const biggest = past.reduce<(typeof past)[number] | undefined>((top, e) => ((e.attended ?? 0) > (top?.attended ?? 0) ? e : top), undefined);
  const firstDate = past.map((e) => e.date!).sort()[0];
  const since = firstDate ? new Date(`${firstDate}T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }) : "";

  return (
    <>
      <PageHeader
        eyebrow="Events"
        header="Turn up on your own. Leave knowing people."
        description="Food nights, games, hikes and days out across Scotland. Most events are free, and some have a small ticket fee."
      >
        {came > 0 && (
          <p className="proof">
            <b>{came}</b> apprentices through the door at <b>{past.length}</b> events since {since}.
          </p>
        )}
      </PageHeader>

      <Events content={home.eventsSection} events={events} />

      <section className="band">
        <div className="wrap">
          <EventsList events={events} />
        </div>
      </section>

      {past.length > 0 && (
        <section className="band">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">So far</span>
              <h2>How our events have gone</h2>
            </div>
            <div className="stats three">
              <div className="stat"><b>{past.length}</b><span>events run since {since}</span></div>
              <div className="stat"><b>{came}</b><span>apprentices through the door</span></div>
              {biggest && <div className="stat"><b>{biggest.attended}</b><span>at our biggest night, {biggest.title}</span></div>}
            </div>
          </div>
        </section>
      )}

      <section className="band">
        <div className="wrap">
          <div className="cta-panel">
            <div>
              <h2>Want to run one with us?</h2>
              <p>Employers can host insight days, sponsor a social or take a stall. Apprentices can pitch an idea for the next trip.</p>
            </div>
            <Button href="/about#contact">Get in touch</Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
