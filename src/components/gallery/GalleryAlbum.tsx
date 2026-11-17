import GalleryGrid from "./GalleryGrid";
import { formatLongDate } from "@/lib/format";
import type { GalleryAlbum as GalleryAlbumType } from "@/types/gallery";

/** One album: title, meta line and the photo grid. Every photo opens in the lightbox. */
export default function GalleryAlbum({ album }: { album: GalleryAlbumType }) {
  const meta = [album.date && formatLongDate(album.date), album.place, album.attended && `${album.attended} came`].filter(Boolean).join(" · ");

  return (
    <article className="album-wrapper reveal" id={album.id}>
      <div className="album-header">
        <h2>{album.title}</h2>
        <span className="album-meta">{meta}</span>
      </div>
      <GalleryGrid images={album.images} albumTitle={album.title} />
    </article>
  );
}
