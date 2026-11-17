import type { Media } from "./media";

/** One gallery album: an event that has photos in public/photos/events/<id>/. */
export type GalleryAlbum = {
  id: string;
  title: string;
  date?: string;
  place: string;
  attended?: number;
  images: Media[];
};
