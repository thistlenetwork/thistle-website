import type { Cta } from "./common";
import type { Media } from "./media";

/** Worked out from the date when the site builds: the soonest upcoming event is "next", the latest past one is "previous". */
export type EventStatus = "upcoming" | "next" | "previous" | "past";

export type Event = {
  id: string;
  title: string;
  description: string;
  place: string;
  /** YYYY-MM-DD, or undefined while the date is to be confirmed. */
  date?: string;
  attended?: number;
  status: EventStatus;
  cta: Cta;
  /** Photos from public/photos/events/<id>/, in file-name order. */
  photos: Media[];
};
