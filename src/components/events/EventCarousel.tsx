"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import EventPanel, { type PanelItem } from "./EventPanel";
import { withBase } from "@/lib/base-path";
import { formatLongDate } from "@/lib/format";
import type { Event } from "@/types/event";

const STATUS_LABEL: Record<Event["status"], string> = {
  upcoming: "Coming up",
  next: "Next event",
  previous: "Last event",
  past: "Past event",
};


type Slide =
  | { key: string; kind: "event"; event: Event; item: PanelItem; tilt: string }
  | { key: string; kind: "boundary"; item: PanelItem; tilt: string; symbol: string };

const UPCOMING_BOUNDARY: PanelItem = {
  id: "boundary-upcoming",
  title: "See all upcoming events",
  description: "Find your next social, trip or meet-up.",
  location: "Your next chapter starts here",
  dateLabel: "Events calendar",
  statusLabel: "Coming up",
  status: "upcoming",
  attendance: "",
  cta: { text: "See upcoming events", link: "/events" },
};

const PAST_BOUNDARY: PanelItem = {
  id: "boundary-past",
  title: "See all past events",
  description: "Photos and highlights from the Thistle Network community.",
  location: "Memories from the community",
  dateLabel: "Photo gallery",
  statusLabel: "The archive",
  status: "past",
  attendance: "",
  cta: { text: "Explore the gallery", link: "/gallery" },
};

function toPanelItem(event: Event): PanelItem {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.place,
    dateLabel: event.date ? formatLongDate(event.date) : "Date to be confirmed",
    statusLabel: STATUS_LABEL[event.status],
    status: event.status,
    attendance: event.attended ? `${event.attended} came` : "",
    cta: event.cta,
  };
}

type EventCarouselProps = {
  events: Event[];
  startIndex: number;
};

/**
 * The horizontal event carousel. It is ordered upcoming, next, previous, past,
 * and it always starts on the "next" event in the middle. Scrolling and
 * snapping are native (the track scrolls, nothing is transformed on each frame),
 * so it stays smooth on mid-range phones. Arrow buttons and arrow keys work too.
 */
export default function EventCarousel({ events, startIndex }: EventCarouselProps) {
  const slides: Slide[] = [
    { key: "boundary-upcoming", kind: "boundary", item: UPCOMING_BOUNDARY, tilt: "-1deg", symbol: "↗" },
    ...events.map((event, index) => ({
      key: event.id,
      kind: "event" as const,
      event,
      item: toPanelItem(event),
      tilt: index % 2 === 0 ? "-1deg" : "1deg",
    })),
    { key: "boundary-past", kind: "boundary", item: PAST_BOUNDARY, tilt: "1deg", symbol: "↙" },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<number | undefined>(undefined);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(startIndex + 1);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [announcement, setAnnouncement] = useState("");

  const slideCount = events.length + 2;

  const scrollToSlide = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    if (!track || index < 0 || index >= slideCount) return;
    const slide = track.querySelectorAll<HTMLElement>(".event-slide")[index];
    if (!slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trackCentre = track.getBoundingClientRect().left + track.clientWidth / 2;
    const slideCentre = slide.getBoundingClientRect().left + slide.getBoundingClientRect().width / 2;
    track.scrollBy({ left: slideCentre - trackCentre, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
    setActiveIndex(index);
  }, [slideCount]);

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const centre = track.getBoundingClientRect().left + track.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    track.querySelectorAll<HTMLElement>(".event-slide").forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const d = Math.abs(centre - (rect.left + rect.width / 2));
      if (d < distance) {
        distance = d;
        closest = index;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const frame = requestAnimationFrame(() => requestAnimationFrame(() => scrollToSlide(startIndex + 1, false)));

    const onScroll = () => {
      window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(updateActiveFromScroll, 80);
    };
    const onResize = () => scrollToSlide(activeIndexRef.current, false);

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(scrollTimer.current);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [scrollToSlide, startIndex, updateActiveFromScroll]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const onTrackKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToSlide(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToSlide(activeIndex + 1);
    }
  };

  const active = slides[activeIndex] ?? slides[startIndex + 1];
  const isLiked = Boolean(liked[active.item.id]);
  const toggleLike = () => {
    setLiked((current) => ({ ...current, [active.item.id]: !isLiked }));
    setAnnouncement(isLiked ? "Like removed" : "Event liked");
  };

  const share = async () => {
    const link = new URL(withBase(active.item.cta.link), window.location.href).href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
        setAnnouncement("Event link copied");
        return;
      }
    } catch {
      /* fall through to showing the link */
    }
    setAnnouncement(`Event link: ${link}`);
  };

  const previousDisabled = activeIndex === 0;
  const nextDisabled = activeIndex === slideCount - 1;

  return (
    <section className="instagram-carousel" aria-label="Thistle Network event carousel">
      <div className="insta-header" aria-live="polite" aria-atomic="true">
        <div className="avatar-wrap">
          <div className="insta-avatar" aria-hidden="true">TN</div>
        </div>
        <div>
          <div className="insta-author">thistlenetwork</div>
          <div className="insta-location">{active.item.location}</div>
        </div>
        <span className="header-marker" aria-hidden="true">•••</span>
      </div>

      <div className="photo-carousel">
        <button
          className="carousel-nav nav-prev"
          type="button"
          aria-label="Show previous event"
          aria-controls="photoTrack"
          disabled={previousDisabled}
          onClick={() => scrollToSlide(activeIndex - 1)}
        >
          <Icon name="carouselPrev" />
        </button>

        <div
          className="photo-track"
          id="photoTrack"
          ref={trackRef}
          role="region"
          aria-label="Event photos. Use the arrow buttons or left and right arrow keys to browse."
          tabIndex={0}
          onKeyDown={onTrackKey}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.key}
                type="button"
                className={`event-slide${slide.kind === "boundary" ? " boundary-slide" : ""}${isActive ? " is-active" : ""}`}
                data-index={index}
                style={{ "--tilt": slide.tilt } as CSSProperties}
                aria-label={`Show ${slide.item.title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToSlide(index)}
              >
                {slide.kind === "boundary" ? (
                  <>
                    <span className="boundary-symbol" aria-hidden="true">{slide.symbol}</span>
                    <span className="slide-caption">
                      <small>{slide.item.dateLabel}</small>
                      {slide.item.title}
                    </span>
                  </>
                ) : (
                  <>
                    <Image
                      src={slide.event.coverImage.url}
                      alt=""
                      width={slide.event.coverImage.width ?? 800}
                      height={slide.event.coverImage.height ?? 1000}
                      loading={isActive ? "eager" : "lazy"}
                    />
                    {slide.event.photos.length === 0 && (
                      <span className="slide-caption">
                        <small>{slide.item.dateLabel}</small>
                        {slide.item.title}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        <button
          className="carousel-nav nav-next"
          type="button"
          aria-label="Show next event"
          aria-controls="photoTrack"
          disabled={nextDisabled}
          onClick={() => scrollToSlide(activeIndex + 1)}
        >
          <Icon name="carouselNext" />
        </button>
      </div>

      <EventPanel item={active.item} liked={isLiked} onLike={toggleLike} onShare={share} />

      <p className="carousel-help">USE THE ARROWS OR SWIPE TO EXPLORE THE DIARY</p>
      <p className="visually-hidden" aria-live="polite">{announcement}</p>
    </section>
  );
}
