import type { NewsEntry } from "@/types/news";

/**
 * News posts, newest first. To add one, copy a block and change it.
 * - `type`: "Announcement" or "Event".
 * - `image` (optional): a file in public/photos/news/, e.g. "/photos/news/quiz.jpg".
 * - `pinned: true` keeps a post at the top.
 * Likes and reactions are remembered in each visitor's own browser, so there are no counts to manage.
 */
export const news: NewsEntry[] = [
  {
    id: "150-members",
    postedAt: "2026-10-22T09:00:00",
    type: "Announcement",
    pinned: true,
    body: "We've passed 150 members 🎉 Apprentices from 65 employers across 17 towns and cities have now registered. Thank you for bringing your friends and colleagues along.",
  },
  {
    id: "pub-quiz-soon",
    postedAt: "2026-10-20T12:00:00",
    type: "Event",
    body: "Pub quiz in Glasgow is next on the list. The date's coming soon, so keep an eye on the WhatsApp groups. Start forming your teams now 🧠",
  },
  {
    id: "flip-out-recap",
    postedAt: "2026-10-04T10:00:00",
    type: "Event",
    body: "That's a wrap on Flip Out plus food 🤸 29 of you came along for trampolines and dinner, our biggest night yet. Thanks to everyone who made it.",
  },
  {
    id: "conic-hill-recap",
    postedAt: "2026-08-30T10:00:00",
    type: "Event",
    body: "18 of us made it up Conic Hill on Saturday ⛰️ Great views over Loch Lomond and even better company.",
  },
];
