"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThistleLogo from "@/components/brand/ThistleLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navCta, navLinks } from "@/content/site";

/**
 * The site header. On the homepage it stays hidden while the scrapbook hero is on screen
 * and fades in once the hero has left (an IntersectionObserver, so nothing runs per frame).
 * On every other page it is always shown.
 */
export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/index.html";
  const [open, setOpen] = useState(false);
  const [heroOnScreen, setHeroOnScreen] = useState(true);

  useEffect(() => {
    const hero = isHome ? document.getElementById("hero") : null;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      setHeroOnScreen(entry.isIntersecting);
      if (entry.isIntersecting) setOpen(false);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const visible = !isHome || !heroOnScreen;
  const close = () => setOpen(false);

  return (
    <nav
      className={`site-nav${visible ? " is-visible" : ""}`}
      aria-label="Main navigation"
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="site-nav-inner">
        <Link className="nav-brand" href="/" aria-label="Thistle Network home" onClick={close}>
          <ThistleLogo priority />
        </Link>

        <div className="nav-tools">
          <ThemeToggle />
          <button
            className="nav-menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="siteNavLinks"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`site-nav-links${open ? " is-open" : ""}`} id="siteNavLinks">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.link} onClick={close} aria-current={pathname === link.link ? "page" : undefined}>
              {link.text}
            </Link>
          ))}
          <Link className="nav-register" href={navCta.link} onClick={close}>
            {navCta.text} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
