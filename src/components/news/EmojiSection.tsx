"use client";

import { usePersistedValue } from "@/lib/hooks/usePersistedValue";

const REACTIONS = ["🙌", "🎉", "🔥", "💜"];

/** Quick reactions. Each visitor's picks are remembered in their own browser. */
export default function EmojiSection({ postId }: { postId: string }) {
  const [value, setValue] = usePersistedValue(`news-react:${postId}`, "");
  const picked = new Set(value ? value.split(" ") : []);

  const toggle = (emoji: string) => {
    if (picked.has(emoji)) picked.delete(emoji);
    else picked.add(emoji);
    setValue([...picked].join(" "));
  };

  return (
    <div className="emoji-reactions" aria-label="Reactions">
      {REACTIONS.map((emoji) => {
        const isPicked = picked.has(emoji);
        return (
          <button
            key={emoji}
            type="button"
            className={`emoji-pill${isPicked ? " is-picked" : ""}`}
            aria-pressed={isPicked}
            aria-label={`React with ${emoji}`}
            onClick={() => toggle(emoji)}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}
