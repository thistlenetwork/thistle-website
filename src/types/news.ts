import type { Media } from "./media";

export type NewsType = "Announcement" | "Event";

/** A post as written in src/content/news.ts. */
export type NewsEntry = {
  id: string;
  postedAt: string;
  type: NewsType;
  body: string;
  image?: string;
  pinned?: boolean;
};

export type NewsPost = {
  id: string;
  postedAt: string;
  newsType: NewsType;
  postBody: string;
  postImage?: Media;
  pinned: boolean;
};
