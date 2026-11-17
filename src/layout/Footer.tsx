import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ThistleLogo from "@/components/brand/ThistleLogo";
import Contact from "@/components/home/Contact";
import { socialIcon } from "@/components/home/social-icons";
import { EMAIL, footerColumns, footerDescription, socials } from "@/content/site";
import type { ContactContent } from "@/types/home";

type FooterProps = {
  /** Passed on the homepage only, so the big contact band appears there. */
  contact?: ContactContent;
};

/** Shared footer: brand, socials, link columns and the copyright line. Always dark, in both themes. */
export default function Footer({ contact }: FooterProps) {
  const footerSocials = [{ id: "email", text: "Email us", link: `mailto:${EMAIL}`, platform: "email" as const }, ...socials];
  return (
    <footer id="contact" className="site-footer">
      {contact && <Contact content={contact} />}
      <Container className="footer-main">
        <div className="brand-col">
          <div className="brand-logo">
            <ThistleLogo tone="on-dark" />
          </div>
          <p className="brand-desc">{footerDescription}</p>
          <div className="social-icons">
            {footerSocials.map((social) => {
              const icon = socialIcon(social.platform);
              return (
                <a key={social.id} className="social-icon" href={social.link} aria-label={social.text}>
                  {icon && <Icon name={icon} />}
                </a>
              );
            })}
          </div>
        </div>

        {footerColumns.map((column) => (
          <div className="link-col" key={column.id}>
            <h4>{column.header}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.id}>
                  <Link href={link.link}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="footer-bottom">
        <span>© {new Date().getFullYear()} The Thistle Network. All rights reserved.</span>
        <span className="footer-bottom-end">
          Made by apprentices, for apprentices, in Scotland.
          <ThemeToggle className="footer-theme" />
        </span>
      </Container>
    </footer>
  );
}
