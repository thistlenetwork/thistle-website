import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { formatShortDate } from "@/lib/format";
import type { NewsPost } from "@/types/news";

/** The pinned badge, avatar, author, date and type tag. Every post is from the network account. */
export default function PostHeader({ post }: { post: NewsPost }) {
  return (
    <>
      {post.pinned && (
        <div className="pinned-badge">
          <Icon name="pinned" />
          Pinned update
        </div>
      )}
      <div className="post-header">
        <div className="avatar">
          <Image src="/brand/emblem-light.png" alt="" width={375} height={411} style={{ objectFit: "contain" }} />
        </div>
        <div className="meta">
          <div className="meta-top">
            <span className="author">Thistle Network</span>
            <span className="handle">@thistlenetwork</span>
            <time className="time" dateTime={post.postedAt}>· {formatShortDate(post.postedAt)}</time>
          </div>
        </div>
        <span className={`news-type-tag ${post.newsType === "Event" ? "type-event" : "type-announcement"}`}>{post.newsType}</span>
      </div>
    </>
  );
}
