"use client";

import { useEffect, useRef } from "react";

/**
 * A number that counts up once it scrolls into view. The final value is in the HTML
 * from the start, so the number is always readable (and reduced-motion users never see it move).
 */
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / 1400);
          el.textContent = String(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
