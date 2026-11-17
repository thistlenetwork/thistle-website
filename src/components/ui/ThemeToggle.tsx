"use client";

import { useSyncExternalStore } from "react";

/**
 * Light / dark switch. The choice is saved in the browser and applied before the page paints
 * by the small script in app/layout.tsx. With no choice saved, the site follows the device setting.
 */
const listeners = new Set<() => void>();

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    listeners.delete(callback);
    media.removeEventListener("change", callback);
  };
}

export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "light" as const);
  const next = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private browsing: the choice lasts for this page only */
    }
    listeners.forEach((listener) => listener());
  };

  return (
    <button type="button" className={["theme-toggle", className].filter(Boolean).join(" ")} onClick={toggle} aria-label={`Switch to ${next} mode`}>
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
