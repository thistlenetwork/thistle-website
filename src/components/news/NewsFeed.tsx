"use client";

import { useState } from "react";
import NewsPost from "./NewsPost";
import type { NewsPost as NewsPostType, NewsType } from "@/types/news";

type Filter = "All" | NewsType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "All", label: "All updates" },
  { value: "Announcement", label: "Announcements" },
  { value: "Event", label: "Events" },
];

type NewsFeedProps = {
  posts: NewsPostType[];
  emptyMessage: string;
};

/** The filterable feed. Pinned posts come first, then newest first. */
export default function NewsFeed({ posts, emptyMessage }: NewsFeedProps) {
  const [filter, setFilter] = useState<Filter>("All");

  const sorted = [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });
  const visible = filter === "All" ? sorted : sorted.filter((post) => post.newsType === filter);

  return (
    <div className="main-container">
      <div className="feed" id="feedContainer">
        {visible.length === 0 ? <p className="feed-empty">{emptyMessage}</p> : visible.map((post) => <NewsPost key={post.id} post={post} />)}
      </div>

      <aside className="sidebar">
        <div className="filter-box">
          <div className="filter-title">Filter updates</div>
          <div className="feed-filters" role="group" aria-label="Filter updates">
            {FILTERS.map((option) => {
              const count = option.value === "All" ? posts.length : posts.filter((p) => p.newsType === option.value).length;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`filter-btn${filter === option.value ? " active" : ""}`}
                  aria-pressed={filter === option.value}
                  onClick={() => setFilter(option.value)}
                >
                  {option.label} <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
