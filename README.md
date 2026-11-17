# Thistle Network website

The site for [thistle.network](https://thistle.network): one Next.js app, exported as plain files and hosted free on GitHub Pages. There is no server, database or CMS to run.

## Editing the site

Everything you're likely to change is in `src/content/`:

| File | What it holds |
| --- | --- |
| `events.ts` | Every event. Add new ones at the top. Leave `date` out until it's fixed; add `attended` afterwards. |
| `news.ts` | News posts. Copy a block to add one. |
| `home.ts` | Homepage copy, the join options and the FAQ. |
| `site.ts` | Email, sign-up form links, social links, menus. |
| `stats-snapshot.json` | Backup member numbers, used only if Zite can't be reached. |

Copy on the other pages (Aspiring, Current, About, Join, Privacy) is in `src/app/<page>/page.tsx`.

Edit a file on GitHub, commit to `main`, and the site rebuilds and goes live in about two minutes.

## Photos

Drop images into these folders. No code changes are needed. Keep each file under about 400 KB (export JPGs at around 1600px wide).

- `public/photos/hero/`: up to 8 photos for the homepage scrapbook. File names become the polaroid captions (`glasgow-2026.jpg` becomes "GLASGOW 2026").
- `public/photos/events/<event id>/`: photos for one event, e.g. `public/photos/events/flip-out/`. The first file is the cover in the events carousel, and the event appears in the Gallery automatically.
- `public/photos/news/`: images for news posts (set `image: "/photos/news/name.jpg"` on the post).

Until there are real photos, the site shows the purple-to-green placeholders.

## Live member numbers

The member numbers come from the Thistle Connect and Thistle Aspire sign-up forms in Zite. While the site builds, it asks Zite for totals only (never names, emails or phone numbers) using the SQL in `src/lib/stats.ts`.

To turn this on, create an API key in Zite (Account settings > Developer), then add it on GitHub as a repository secret named `ZITE_API_KEY` (Settings > Secrets and variables > Actions). Without the key the site uses `stats-snapshot.json`.

## Deploying

`.github/workflows/deploy.yml` builds and publishes the site:

- on every push to `main`
- every hour, to refresh the member numbers and move finished events into "past"
- whenever you press "Run workflow" in the Actions tab

One-time setup: in the repository's Settings > Pages, set Source to "GitHub Actions", and keep thistle.network as the custom domain.

GitHub pauses scheduled workflows in a repository with no commits for 60 days. If the numbers stop updating, re-enable the workflow in the Actions tab, or make any commit.

## Running it on your computer

You need Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Then open http://localhost:3000. To use live numbers locally, put `ZITE_API_KEY=...` in a file called `.env.local` (it's git-ignored). `npm run build` creates the finished site in `out/`.

## Once a year

The take-home pay calculator on the Current page uses Scottish income tax bands and National Insurance rates. Update them each April in `src/components/paths/PayCalculator.tsx`.

## How it's put together

- `src/app/`: one folder per page, plus `globals.css` (all styles; colours come from the light and dark theme tokens at the top).
- `src/components/`: the homepage sections, events carousel, gallery, news feed and the shared pieces.
- `src/lib/content.ts`: turns the content files and photo folders into what the pages show.
- `src/lib/stats.ts`: the Zite query.
