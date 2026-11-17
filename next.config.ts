import type { NextConfig } from "next";

/**
 * The site is exported as plain HTML, CSS and JS (the `out` folder) and hosted on
 * GitHub Pages, so there is no server to run or maintain.
 * Static export cannot resize images on request, so images are served as they are:
 * keep photos you add to public/photos reasonably small (under ~400 KB each).
 *
 * basePath comes from GitHub Pages at build time (see .github/workflows/deploy.yml): empty
 * on thistle.network, "/thistle-website" if the site is ever served without its domain.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
