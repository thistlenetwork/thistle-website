import Link from "next/link";
import { FORMS } from "@/content/site";

/** The two ways into the network. Used on the homepage and the join page. */
export default function PathCards({ links = "pages" }: { links?: "pages" | "forms" }) {
  const toForms = links === "forms";
  return (
    <div className="path-grid">
      <Link className="path path-aspire reveal" href={toForms ? FORMS.aspiring : "/aspiring"}>
        <span className="pill pill-aspiring">Aspiring apprentices</span>
        <h3>Get application-ready</h3>
        <ul>
          <li>Insight days with Scottish employers</li>
          <li>Mentoring and mock interviews from current apprentices</li>
          <li>Clear guidance on routes and providers</li>
        </ul>
        <span className="go">{toForms ? "Register as aspiring" : "Explore the aspiring path"} →</span>
      </Link>
      <Link className="path path-current reveal" href={toForms ? FORMS.current : "/current"}>
        <span className="pill pill-current">Current apprentices</span>
        <h3>Find your people</h3>
        <ul>
          <li>Industry and regional WhatsApp groups</li>
          <li>Socials, trips and meet-ups</li>
          <li>Financial literacy sessions for early earners</li>
        </ul>
        <span className="go">{toForms ? "Register as current" : "Explore the current path"} →</span>
      </Link>
    </div>
  );
}
