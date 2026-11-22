// Sets each page's <lastmod> in sitemap.xml to the date its content last changed, taken from
// the git history. Pages that show events (the next-event box or the events list) also count
// changes to events.json. Run by .github/workflows/deploy.yml before each publish.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const lastChanged = (files) => {
  const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files.filter(existsSync)], { encoding: "utf8" }).trim();
  return out || null;
};

let xml = readFileSync("sitemap.xml", "utf8");
xml = xml.replace(/<url><loc>https:\/\/thistle\.network\/([^<]*)<\/loc><lastmod>[^<]*<\/lastmod><\/url>/g, (whole, path) => {
  const page = !path ? "index.html" : path.endsWith(".html") ? path : `${path}.html`;
  const files = [page];
  if (existsSync(page) && readFileSync(page, "utf8").includes("data-next-event")) files.push("events.json");
  const date = lastChanged(files);
  return date ? whole.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${date}</lastmod>`) : whole;
});
writeFileSync("sitemap.xml", xml);
console.log(xml.match(/<url>.*?<\/url>/g).map((u) => u.replace(/<\/?(url|loc|lastmod)>/g, " ").trim()).join("\n"));
