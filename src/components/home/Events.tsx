import EventsList from "@/components/events/EventsList";
import type { Event } from "@/types/event";
import type { EventsSectionContent } from "@/types/home";

type EventsProps = {
  content: EventsSectionContent;
  events: Event[];
};

/** The homepage events section: a few events, with a link to the full list on the Events page. */
export default function Events({ content, events }: EventsProps) {
  return (
    <section id="events" className="band" aria-labelledby="events-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="events-title">{content.header}</h2>
          <p>{content.description}</p>
        </div>
        <EventsList events={events} limit={3} />
      </div>
    </section>
  );
}
