import Image from "next/image";
import type { NewsPost } from "@/types/news";

/** The post text and its optional image. */
export default function PostContent({ post }: { post: NewsPost }) {
  return (
    <>
      <div className="post-body">{post.postBody}</div>
      {post.postImage && (
        <Image
          src={post.postImage.url}
          alt={post.postImage.alternativeText || "Update image"}
          width={post.postImage.width ?? 900}
          height={post.postImage.height ?? 560}
          className="post-img"
        />
      )}
    </>
  );
}
