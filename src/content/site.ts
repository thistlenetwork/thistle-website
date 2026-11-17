import type { Cta, SocialLink } from "@/types/common";
import type { FooterColumn, NavLink } from "@/types/site";

/** Contact details and sign-up forms used across the site. */
export const EMAIL = "general@thistle.network";

export const FORMS = {
  current: "https://thistlenetwork.zite.so",
  aspiring: "https://thistleaspire.zite.so",
};

export const socials: SocialLink[] = [
  { id: "linkedin", text: "LinkedIn", link: "https://uk.linkedin.com/company/thistlenetwork", platform: "linkedin" },
  { id: "instagram", text: "Instagram", link: "https://www.instagram.com/thistlenetwork/", platform: "instagram" },
  { id: "tiktok", text: "TikTok", link: "https://www.tiktok.com/@thistlenetwork", platform: "tiktok" },
];

export const navLinks: NavLink[] = [
  { id: "aspiring", text: "Aspiring", link: "/aspiring" },
  { id: "current", text: "Current", link: "/current" },
  { id: "events", text: "Events", link: "/events" },
  { id: "gallery", text: "Gallery", link: "/gallery" },
  { id: "news", text: "News", link: "/news" },
  { id: "about", text: "About", link: "/about" },
];

export const navCta: Cta = { text: "Register", link: "/join" };

export const footerDescription = "A community-led network for current and aspiring apprentices across Scotland.";

export const footerColumns: FooterColumn[] = [
  {
    id: "network",
    header: "Network",
    links: [
      { id: "aspiring", text: "Aspiring apprentices", link: "/aspiring" },
      { id: "current", text: "Current apprentices", link: "/current" },
      { id: "events", text: "Events", link: "/events" },
      { id: "about", text: "About the network", link: "/about" },
    ],
  },
  {
    id: "get-involved",
    header: "Get involved",
    links: [
      { id: "register", text: "Register to join", link: "/join" },
      { id: "employers", text: "For employers", link: "/about#employers" },
      { id: "privacy", text: "Privacy notice", link: "/privacy" },
      { id: "contact", text: "Contact us", link: "/about#contact" },
    ],
  },
];
