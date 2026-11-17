// Rewrites stats.js with the latest network totals from Zite. Run by .github/workflows/deploy.yml
// before each deploy (every push and every hour). Zite runs the SQL below and sends back totals
// only: no names, emails or phone numbers reach this script or the site.
//
// Needs the ZITE_API_KEY repository secret. Without it, or if Zite can't be reached, stats.js
// is left as it is in the repo, so the site always has numbers to show.
import { writeFileSync } from "node:fs";

const ZITE_API = "https://tables.zite.com/api/v1";
const CONNECT_BASE = "1c5e979aea997150"; // Thistle Connect (current apprentices)
const ASPIRE_BASE = "89997b017e6613b8"; // Thistle Aspire (aspiring apprentices)

// Tidies the free-text answers (spellings of employers, places, providers). Employers with
// fewer than 2 members are counted but never named.
const CONNECT_SQL = String.raw`WITH raw AS (
  SELECT created_at,
    regexp_replace(TRIM(COALESCE("Company", '')), '\s+', ' ', 'g') AS c,
    LOWER(regexp_replace(TRIM(COALESCE("Location", '')), '\s+', ' ', 'g')) AS l,
    LOWER(regexp_replace(TRIM(COALESCE("Learning Provider", '')), '\s+', ' ', 'g')) AS p,
    LOWER(TRIM(COALESCE("Apprenticeship Role", ''))) AS r,
    LOWER(TRIM(COALESCE("How Did You Hear About Us", ''))) AS s,
    "Apprenticeship Type" AS route
  FROM "Members"
  WHERE LOWER(TRIM(COALESCE("Location", ''))) <> 'london'
), m AS (
  SELECT created_at, route,
    CASE
      WHEN c = '' OR c ~* '^(unknown|can.?t disclose|n/?a)$' THEN NULL
      WHEN UPPER(c) = 'MS' OR UPPER(c) LIKE '%MORGAN STANLEY%' THEN 'Morgan Stanley'
      WHEN regexp_replace(UPPER(c), '[.\s-]', '', 'g') LIKE 'JPMORGAN%' OR UPPER(c) = 'JPMC' THEN 'JP Morgan'
      WHEN UPPER(c) = 'SPEN' OR UPPER(c) LIKE '%SP ENERGY%' OR UPPER(c) LIKE '%SCOTTISH POWER%' OR UPPER(c) LIKE '%SCOTTISHPOWER%' THEN 'ScottishPower'
      WHEN UPPER(c) LIKE 'ABERDEEN%' THEN 'Aberdeen Group'
      WHEN UPPER(c) LIKE 'HERIOT%' THEN 'Heriot-Watt University'
      WHEN UPPER(c) LIKE 'DELOITTE%' THEN 'Deloitte'
      WHEN UPPER(c) LIKE 'NATWEST%' THEN 'NatWest'
      WHEN UPPER(c) LIKE 'LLOYDS%' THEN 'Lloyds Banking Group'
      WHEN UPPER(c) LIKE 'BAE%' THEN 'BAE Systems'
      WHEN UPPER(c) LIKE 'ATKINS%' THEN 'AtkinsRéalis'
      WHEN UPPER(c) LIKE '%LEIDOS%' THEN 'Leidos'
      ELSE c END AS company,
    CASE
      WHEN l = '' THEN NULL
      WHEN l = 'glasgow edinburgh' THEN 'Glasgow'
      WHEN l IN ('aberdeen', 'aberdeenshire') THEN 'Aberdeen'
      WHEN l IN ('larlhall', 'larkhall') THEN 'Larkhall'
      ELSE INITCAP(l) END AS place,
    CASE
      WHEN p = '' OR p ~ '^(n/?a|unknown)$' THEN NULL
      WHEN p LIKE '%strathclyde%' THEN 'University of Strathclyde'
      WHEN p = 'gcu' OR p LIKE '%caledonian%' THEN 'Glasgow Caledonian University'
      WHEN p IN ('glasgow university', 'university of glasgow') THEN 'University of Glasgow'
      WHEN p LIKE '%heriot%' THEN 'Heriot-Watt University'
      WHEN p = 'rgu' OR p LIKE '%robert gordon%' THEN 'Robert Gordon University'
      WHEN p LIKE 'uhi%' THEN 'UHI'
      WHEN p LIKE '%napier%' THEN 'Edinburgh Napier University'
      WHEN p LIKE 'carousel%' THEN 'Carousel Training'
      WHEN p = 'bpp' THEN 'BPP'
      WHEN p = 'qa' THEN 'QA'
      ELSE INITCAP(p) END AS provider,
    CASE
      WHEN r ~ '(software|technology|cyber security|developer|data |it support|systems engineer|program)' THEN 'Technology'
      WHEN r ~ '(accounting|accountancy|audit)' THEN 'Accountancy'
      WHEN r ~ '(finance|financial|investment|hedge fund)' THEN 'Finance'
      WHEN r ~ '(human resources|\mhr\M)' THEN 'HR'
      WHEN r ~ '(business|commercial|recruitment|operations|corporate services)' THEN 'Business'
      WHEN r ~ '(engineer|engineering|manufacturing|heating|electrical|mechanical|civil|technical|bio-medical)' THEN 'Engineering'
      ELSE 'Other' END AS sector,
    (s LIKE '%friend%' OR s LIKE '%colleague%') AS friend
  FROM raw
)
SELECT json_build_object(
  'updated', (SELECT to_char(MAX(created_at), 'YYYY-MM-DD') FROM m),
  'since', (SELECT to_char(MIN(created_at), 'YYYY-MM-DD') FROM m),
  'members', (SELECT COUNT(*) FROM m),
  'employers', (SELECT COUNT(DISTINCT LOWER(company)) FROM m WHERE company IS NOT NULL),
  'places', (SELECT COUNT(DISTINCT place) FROM m WHERE place IS NOT NULL),
  'providers', (SELECT COUNT(DISTINCT LOWER(provider)) FROM m WHERE provider IS NOT NULL),
  'last30', (SELECT COUNT(*) FROM m WHERE created_at > NOW() - INTERVAL '30 days'),
  'friendShare', (SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE friend) / NULLIF(COUNT(*), 0)) FROM m),
  'graduateShare', (SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE route = 'Graduate') / NULLIF(COUNT(*), 0)) FROM m),
  'growth', (SELECT json_agg(json_build_object('month', month, 'joined', n, 'total', total) ORDER BY month)
             FROM (SELECT month, n, SUM(n) OVER (ORDER BY month) AS total
                   FROM (SELECT to_char(created_at, 'YYYY-MM') AS month, COUNT(*) AS n FROM m GROUP BY 1) g) g2),
  'namedEmployers', (SELECT json_agg(name ORDER BY n DESC, name)
                     FROM (SELECT MIN(company) AS name, COUNT(*) AS n FROM m WHERE company IS NOT NULL GROUP BY LOWER(company) HAVING COUNT(*) >= 2) e),
  'topPlaces', (SELECT json_agg(json_build_array(place, n) ORDER BY n DESC, place)
                FROM (SELECT place, COUNT(*) AS n FROM m WHERE place IS NOT NULL GROUP BY place ORDER BY n DESC, place LIMIT 6) t),
  'topProviders', (SELECT json_agg(json_build_array(provider, n) ORDER BY n DESC, provider)
                   FROM (SELECT MIN(provider) AS provider, COUNT(*) AS n FROM m WHERE provider IS NOT NULL GROUP BY LOWER(provider) ORDER BY n DESC, MIN(provider) LIMIT 6) t),
  'sectors', (SELECT json_agg(json_build_array(sector, n) ORDER BY n DESC, sector)
              FROM (SELECT sector, COUNT(*) AS n FROM m GROUP BY sector) t),
  'routes', (SELECT json_agg(json_build_array(route, n) ORDER BY n DESC)
             FROM (SELECT route, COUNT(*) AS n FROM m WHERE route IS NOT NULL GROUP BY route) t)
) AS stats`;

const ASPIRE_SQL = `SELECT COUNT(*) AS aspiring FROM "Members"`;

async function runSql(base, sql, key) {
  const res = await fetch(`${ZITE_API}/bases/${base}/sql`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, statementTimeoutMs: 20000 }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Zite returned ${res.status}`);
  return res.json();
}

const key = process.env.ZITE_API_KEY;
if (!key) {
  console.log("::warning::ZITE_API_KEY is not set, so stats.js keeps the numbers in the repo.");
  process.exit(0);
}

try {
  const [connect, aspire] = await Promise.all([runSql(CONNECT_BASE, CONNECT_SQL, key), runSql(ASPIRE_BASE, ASPIRE_SQL, key)]);
  const raw = connect.rows?.[0]?.stats;
  const stats = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!stats || !(stats.members > 0) || !Array.isArray(stats.growth) || stats.growth.length === 0) {
    throw new Error("Zite returned no member totals");
  }
  stats.aspiring = Number(aspire.rows?.[0]?.aspiring ?? 0);
  const header = "/* Network totals from the Thistle Connect and Thistle Aspire sign-up forms in Zite. Totals only, no member records. Refreshed hourly by .github/scripts/update-stats.mjs. */";
  writeFileSync("stats.js", `${header}\nwindow.TN_STATS = ${JSON.stringify(stats, null, 2)};\n`);
  console.log(`stats.js updated: ${stats.members} members, ${stats.aspiring} aspiring, latest sign-up ${stats.updated}.`);
} catch (error) {
  console.log(`::warning::Kept the numbers in the repo: ${error.message}`);
}
