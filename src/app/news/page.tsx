import type { Metadata } from "next";
import NewsFeed from "@/components/news/NewsFeed";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { getNewsPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements and event updates from Thistle Network.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="News & announcements" header="What's happening in the network." description="Updates from the team. Tap a heart or a reaction on anything below." />
      <section className="feed-section">
        <NewsFeed posts={getNewsPosts()} emptyMessage="No news yet. Check back soon for updates from the network." />
      </section>
      <Footer />
    </>
  );
}
