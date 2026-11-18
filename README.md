# Thistle Network website

The site for [thistle.network](https://thistle.network): plain HTML, CSS and JavaScript, hosted free on GitHub Pages. There is nothing to build or install.

## How changes go live

1. **Make changes on the `beta` branch**, never straight on `main`.
2. **Check them on the preview:** https://thistle-beta.pages.dev. Cloudflare Pages rebuilds it from `beta` about a minute after every push. Search engines are told not to list it.
3. **Ashraf and Zie both check the preview** before anything goes live.
4. **Run the pre-launch check** on the final version (accessibility, links, phone layout, spelling, and anything the site says that might not be true).
5. **Merge `beta` into `main`** with a pull request once you're both happy: https://github.com/thistlenetwork/thistle-website/compare/main...beta
6. **GitHub publishes `main` to thistle.network** in about a minute (see "Live member numbers" below for what else that run does).

## Editing the site

| File | What it holds |
| --- | --- |
| `events.json` | Every event. Leave `date` as `null` until it's fixed, and add `attended` (how many came) afterwards. |
| `index.html`, `aspiring.html`, `current.html`, `events.html`, `about.html`, `join.html` | The words on each page. |
| `site.js` | The menu and footer shared by every page, and the code that fills in the numbers and events. |
| `site.css` | All the styles, with the light and dark colours at the top. |
| `assets/` | The logos. |
| `privacy.html` | The privacy notice. Update the date at the top whenever it changes. |

Edit a file on GitHub, commit to `main`, and the site updates in about a minute.

## Live member numbers

`stats.js` holds the member totals shown on the site. Every hour, and on every change, `.github/workflows/deploy.yml` runs `.github/scripts/update-stats.mjs`, which asks Zite for fresh totals (never names, emails or phone numbers) and publishes them.

This needs a repository secret named `ZITE_API_KEY` (Settings > Secrets and variables > Actions), holding an API key from Zite (Account settings > Developer). Without it, or if Zite can't be reached, the site shows the numbers saved in `stats.js`.

GitHub pauses hourly workflows in a repository with no commits for 60 days. If the numbers stop updating, re-enable the workflow in the Actions tab, or make any commit.

## One-time setup

In the repository's Settings > Pages, set Source to "GitHub Actions" and set the custom domain to `thistle.network`.

## Previewing on your computer

The events list is loaded from `events.json`, which browsers block when a page is opened straight from a file. Run this in the folder, then open http://localhost:8000:

```bash
python3 -m http.server
```
