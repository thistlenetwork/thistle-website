import type { Metadata } from "next";
import Link from "next/link";
import GalleryAlbum from "@/components/gallery/GalleryAlbum";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { getGalleryAlbums } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from socials, trips and meet-ups across Scotland.",
};

export default function GalleryPage() {
  const albums = getGalleryAlbums();
  return (
    <>
      <PageHeader eyebrow="Gallery" header="Moments from the network." description="Socials, trips and meet-ups from across Scotland. New photos go up after every event." />
      <section className="gallery-page">
        <div className="gallery-container gallery-albums">
          {albums.length > 0 ? (
            albums.map((album) => <GalleryAlbum key={album.id} album={album} />)
          ) : (
            <div className="empty">
              Photos are on their way. In the meantime, see what&apos;s been happening on the <Link href="/events">events page</Link>.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
