import fs from "node:fs";
import path from "node:path";
import { events as eventEntries } from "@/content/events";
import { news } from "@/content/news";
import { FORMS } from "@/content/site";
import type { Event, EventStatus } from "@/types/event";
import type { GalleryAlbum } from "@/types/gallery";
import type { HeroPhoto } from "@/types/home";
import type { Media } from "@/types/media";
import type { NewsPost } from "@/types/news";

/**
 * Turns the files in src/content and the photos in public/photos into what the pages show.
 * Runs only while the site builds (it reads the file system), never in the browser.
 */

const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const PLACEHOLDER_EVENT = "/images/placeholders/event.png";
const PLACEHOLDER_HERO = (n: number) => `/images/placeholders/hero-${n}.png`;

/** Photos in a folder under public/, sorted by file name. Empty when the folder doesn't exist. */
function photosIn(folder: string, alt: string): Media[] {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => PHOTO_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((file, index) => ({
      id: `${folder}/${file}`,
      url: `/${folder}/${encodeURIComponent(file)}`,
      width: 1200,
      height: 900,
      alternativeText: `${alt} photo ${index + 1}`,
    }));
}

/** "glasgow-2026.jpg" becomes "GLASGOW 2026", used as the polaroid caption. */
function captionFromFile(url: string): string {
  const name = decodeURIComponent(url.split("/").pop() ?? "");
  return name.replace(/\.[a-z0-9]+$/i, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim().toUpperCase() || "THISTLE NETWORK";
}

const todayIso = () => new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });

/** Events with their status worked out from today's date (the site rebuilds every hour). */
export function getEvents(): Event[] {
  const today = todayIso();
  const isPast = (date?: string) => Boolean(date && date < today);

  const upcoming = eventEntries
    .filter((e) => !isPast(e.date))
    .sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999"));
  const past = eventEntries.filter((e) => isPast(e.date)).sort((a, b) => b.date!.localeCompare(a.date!));
  const statusOf = new Map<string, EventStatus>();
  upcoming.forEach((e, i) => statusOf.set(e.id, i === 0 ? "next" : "upcoming"));
  past.forEach((e, i) => statusOf.set(e.id, i === 0 ? "previous" : "past"));

  return eventEntries.map((entry) => {
    const photos = photosIn(`photos/events/${entry.id}`, entry.title);
    const status = statusOf.get(entry.id)!;
    const upcomingEvent = status === "next" || status === "upcoming";
    return {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      place: entry.place,
      date: entry.date,
      attended: entry.attended,
      status,
      photos,
      coverImage: photos[0] ?? { id: `${entry.id}-cover`, url: PLACEHOLDER_EVENT, width: 800, height: 1000, alternativeText: "" },
      cta: upcomingEvent
        ? { text: "Register interest", link: entry.registerUrl ?? FORMS.current }
        : photos.length > 0
          ? { text: "See the photos", link: `/gallery#${entry.id}` }
          : { text: "See all events", link: "/events" },
    };
  });
}

/** Up to eight scrapbook photos for the homepage hero: public/photos/hero, topped up with placeholders. */
export function getHeroPhotos(): HeroPhoto[] {
  const photos = photosIn("photos/hero", "").slice(0, 8);
  const filled: HeroPhoto[] = photos.map((image) => ({ id: image.id, caption: captionFromFile(image.url), image: { ...image, alternativeText: "" } }));
  for (let n = filled.length + 1; n <= 8; n++) {
    filled.push({ id: `placeholder-${n}`, caption: "THISTLE NETWORK", image: { id: `placeholder-${n}`, url: PLACEHOLDER_HERO(n), width: 400, height: 500, alternativeText: "" } });
  }
  return filled;
}

/** One album per event that has photos, newest first. */
export function getGalleryAlbums(): GalleryAlbum[] {
  return getEvents()
    .filter((event) => event.photos.length > 0)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .map((event) => ({ id: event.id, title: event.title, date: event.date, place: event.place, attended: event.attended, images: event.photos }));
}

export function getNewsPosts(): NewsPost[] {
  return news.map((entry) => ({
    id: entry.id,
    postedAt: entry.postedAt,
    newsType: entry.type,
    postBody: entry.body,
    pinned: Boolean(entry.pinned),
    postImage: entry.image ? { id: `${entry.id}-image`, url: entry.image, width: 900, height: 560, alternativeText: "" } : undefined,
  }));
}
