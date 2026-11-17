/**
 * Every Thistle Network event. Add new ones at the top.
 *
 * - `date`: "YYYY-MM-DD". Leave it out while the date isn't fixed ("date to be confirmed").
 *   Whether an event shows as coming up or past is worked out from the date each time
 *   the site rebuilds (every hour), so you never need to move events around.
 * - `attended`: how many people came. Add it after the event.
 * - Photos: put them in public/photos/events/<id>/ (the id below). The first photo,
 *   by file name, is the cover. They also appear in the Gallery automatically.
 */
export type EventEntry = {
  id: string;
  title: string;
  place: string;
  date?: string;
  attended?: number;
  description: string;
  /** Where "Register interest" goes for upcoming events. Defaults to the current apprentice form. */
  registerUrl?: string;
};

export const events: EventEntry[] = [
  { id: "pub-quiz", title: "Pub quiz", place: "Glasgow", description: "A pub quiz night. Date coming soon." },
  { id: "flip-out", title: "Flip Out plus food", place: "Glasgow", date: "2026-10-03", attended: 29, description: "Trampolines at Flip Out, then food." },
  { id: "run-club", title: "Run Club", place: "Glasgow", date: "2026-09-21", attended: 6, description: "A group run." },
  { id: "fat-hippo", title: "Fat Hippo", place: "Edinburgh", date: "2026-09-19", attended: 7, description: "Burgers at Fat Hippo." },
  { id: "charcoals", title: "Charcoals", place: "Glasgow", date: "2026-09-19", attended: 20, description: "Dinner at Charcoals." },
  { id: "conic-hill", title: "Hiking", place: "Conic Hill", date: "2026-08-29", attended: 18, description: "A hike up Conic Hill above Loch Lomond." },
  { id: "incoming-connect", title: "Incoming Apprentice Connect", place: "Glasgow", date: "2026-08-28", attended: 19, description: "A meet-up for apprentices about to start." },
  { id: "fired-dough", title: "Fired Dough", place: "Edinburgh", date: "2026-08-08", attended: 26, description: "Dinner at Fired Dough." },
  { id: "games-grub", title: "Games and Grub", place: "Glasgow", date: "2026-07-11", attended: 27, description: "Games and food." },
  { id: "bella-italia", title: "Bella Italia", place: "Glasgow", date: "2026-06-06", attended: 25, description: "Dinner at Bella Italia." },
  { id: "bowling-bites", title: "Bowling n' Bites", place: "Glasgow", date: "2026-05-02", attended: 16, description: "Bowling, then food." },
];
