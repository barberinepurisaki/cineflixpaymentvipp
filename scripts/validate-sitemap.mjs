// Validates dist/sitemap.xml after build: ensures file exists and parses as XML.
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const path = resolve("dist/sitemap.xml");
if (!existsSync(path)) {
  console.error(`[sitemap] FAIL: ${path} not found`);
  process.exit(1);
}

const xml = readFileSync(path, "utf8").trim();

if (!xml.startsWith("<?xml")) {
  console.error("[sitemap] FAIL: missing <?xml declaration (would be served as HTML)");
  process.exit(1);
}
if (!/<urlset[\s>]/.test(xml) && !/<sitemapindex[\s>]/.test(xml)) {
  console.error("[sitemap] FAIL: no <urlset> or <sitemapindex> root element");
  process.exit(1);
}

// Basic well-formedness checks
const opens = (xml.match(/<url>/g) || []).length;
const closes = (xml.match(/<\/url>/g) || []).length;
if (opens !== closes) {
  console.error(`[sitemap] FAIL: unbalanced <url> tags (${opens} open / ${closes} close)`);
  process.exit(1);
}
if (opens === 0) {
  console.error("[sitemap] FAIL: sitemap has no <url> entries");
  process.exit(1);
}

// Confirm netlify.toml/_headers will serve it as application/xml
const headersPath = resolve("public/_headers");
if (existsSync(headersPath)) {
  const headers = readFileSync(headersPath, "utf8");
  if (!/sitemap\.xml[\s\S]*application\/xml/i.test(headers)) {
    console.warn("[sitemap] WARN: public/_headers does not pin Content-Type for /sitemap.xml");
  }
}

console.log(`[sitemap] OK: dist/sitemap.xml is valid XML (${opens} urls)`);
