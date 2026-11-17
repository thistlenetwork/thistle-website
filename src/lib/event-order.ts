import type { Event, EventStatus } from "@/types/event";

/**
 * Carousel order, left to right: upcoming -> next (centre) -> previous -> past.
 * Within each group the events closest to "next" sit nearest to it, so every group is
 * sorted latest-first. Events without a date yet count as the furthest in the future.
 */
const GROUP_ORDER: EventStatus[] = ["upcoming", "next", "previous", "past"];

export function arrangeEvents(events: Event[]): Event[] {
  const time = (e: Event) => (e.date ? new Date(e.date).getTime() : Number.MAX_SAFE_INTEGER);
  return [...events].sort((a, b) => {
    const groupDiff = GROUP_ORDER.indexOf(a.status) - GROUP_ORDER.indexOf(b.status);
    if (groupDiff !== 0) return groupDiff;
    return time(b) - time(a);
  });
}

/** Index of the "next" event, which is always the starting slide. */
export function startingIndex(events: Event[]): number {
  const next = events.findIndex((e) => e.status === "next");
  if (next >= 0) return next;
  const previous = events.findIndex((e) => e.status === "previous");
  return previous >= 0 ? previous : 0;
}
