"use client";

import Icon from "@/components/ui/Icon";
import { usePersistedValue } from "@/lib/hooks/usePersistedValue";

/** The like button. Remembered in the visitor's own browser; there is no shared count to maintain. */
export default function PostActions({ postId }: { postId: string }) {
  const [value, setValue] = usePersistedValue(`news-like:${postId}`, "0");
  const liked = value === "1";

  return (
    <button
      type="button"
      className={`action-btn like-btn${liked ? " liked" : ""}`}
      aria-pressed={liked}
      aria-label={liked ? "Unlike this update" : "Like this update"}
      onClick={() => setValue(liked ? "0" : "1")}
    >
      <Icon name="newsLike" />
      <span className="like-count">{liked ? "Liked" : "Like"}</span>
    </button>
  );
}
