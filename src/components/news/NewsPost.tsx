import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import EmojiSection from "./EmojiSection";
import type { NewsPost as NewsPostType } from "@/types/news";

/** One update: header, body, image, and the like and emoji footer. */
export default function NewsPost({ post }: { post: NewsPostType }) {
  return (
    <article className={`post${post.pinned ? " pinned" : ""} reveal`}>
      <PostHeader post={post} />
      <PostContent post={post} />
      <div className="post-footer">
        <PostActions postId={post.id} />
        <EmojiSection postId={post.id} />
      </div>
    </article>
  );
}
