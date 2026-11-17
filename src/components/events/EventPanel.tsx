import Icon from "@/components/ui/Icon";

export type PanelItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  dateLabel: string;
  statusLabel: string;
  status: "upcoming" | "next" | "previous" | "past";
  /** "29 came", or empty for events that haven't happened. */
  attendance: string;
  cta: { text: string; link: string };
};

type EventPanelProps = {
  item: PanelItem;
  liked: boolean;
  onLike: () => void;
  onShare: () => void;
};

/** The details under the carousel. The heart is remembered for this visit only; nothing is stored. */
export default function EventPanel({ item, liked, onLike, onShare }: EventPanelProps) {
  return (
    <article className="insta-details" aria-label="Selected event details">
      <div className="insta-action-row">
        <button
          className={`icon-button${liked ? " is-liked" : ""}`}
          type="button"
          aria-label={liked ? "Unlike this event" : "Like this event"}
          aria-pressed={liked}
          onClick={onLike}
        >
          <Icon name="eventLike" />
        </button>
        <button className="icon-button" type="button" aria-label="Copy link to this event" onClick={onShare}>
          <Icon name="eventShare" />
        </button>
      </div>

      {item.attendance && <div className="insta-likes">{item.attendance}</div>}
      <h3 className="insta-title">{item.title}</h3>
      <p className="insta-desc">
        <strong>thistlenetwork</strong>
        {item.description}
      </p>
      <div className="post-meta">
        <span className="post-date">{item.dateLabel}</span>
        <span className={`status-tag status-${item.status}`}>{item.statusLabel}</span>
      </div>
      <a className="insta-cta" href={item.cta.link}>
        {item.cta.text} <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
