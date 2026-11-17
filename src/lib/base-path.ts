/**
 * The folder the site is served from. Empty on thistle.network; "/thistle-website" when GitHub
 * Pages serves it at thistlenetwork.github.io/thistle-website/ (no custom domain attached).
 * The deploy workflow sets it from GitHub's Pages settings, so nothing here needs editing.
 *
 * Page links (next/link), styles and scripts pick it up automatically. Image paths don't,
 * so anything that points at a file in public/ goes through withBase().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** "/brand/emblem.png" becomes "/thistle-website/brand/emblem.png" when the site is in a folder. Full URLs are left alone. */
export function withBase(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${BASE_PATH}${path}` : path;
}
