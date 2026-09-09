import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");
const siteOrigin = "https://gitgitwi.github.io";

const walkHtml = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkHtml(fullPath)));
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
};

const stripBase = (href) => {
  if (href.startsWith(siteOrigin)) {
    return href.slice(siteOrigin.length) || "/";
  }
  return href;
};

const hrefToDistPath = (href) => {
  const pathOnly = stripBase(href.split("#")[0].split("?")[0]);
  if (!pathOnly.startsWith("/")) return null;
  const normalized = pathOnly.replace(/\/$/, "") || "/";
  if (normalized === "/") {
    const home = join(distDir, "index.html");
    return { direct: home, asIndex: home, anchor: null, pathOnly: normalized };
  }
  const direct = join(distDir, normalized.slice(1));
  const asIndex = join(direct, "index.html");
  return { direct, asIndex, anchor: href.includes("#") ? href.split("#")[1] : null, pathOnly };
};

const collectFromHtml = (html) => {
  const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);
  const srcs = [...html.matchAll(/\ssrc="([^"]+)"/g)].map((match) => match[1]);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  return { hrefs, srcs, ids };
};

const isInternal = (url) =>
  url.startsWith("/") ||
  url.startsWith(siteOrigin) ||
  (!url.includes("://") && !url.startsWith("mailto:") && !url.startsWith("tel:"));

const isIgnored = (url) =>
  url.startsWith("javascript:") || url.startsWith("data:") || url.endsWith(".pdf");

const errors = [];

const assertPathExists = async (target) => {
  const { direct, asIndex } = target;
  try {
    await readFile(direct);
    return direct;
  } catch {
    try {
      await readFile(asIndex);
      return asIndex;
    } catch {
      return null;
    }
  }
};

const run = async () => {
  let htmlFiles;
  try {
    htmlFiles = await walkHtml(distDir);
  } catch {
    console.error("dist/ not found — run `bun run build` first.");
    process.exit(1);
  }

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const relFile = file.slice(distDir.length + 1);
    const { hrefs, srcs, ids } = collectFromHtml(html);

    for (const href of hrefs) {
      if (isIgnored(href)) continue;

      if (href.startsWith("#")) {
        const anchor = href.slice(1);
        if (anchor && !ids.has(anchor)) {
          errors.push(`${relFile}: missing same-page anchor #${anchor}`);
        }
        continue;
      }

      if (!isInternal(href)) continue;

      const mapped = hrefToDistPath(href);
      if (!mapped) continue;
      const found = await assertPathExists(mapped);
      if (!found) {
        errors.push(`${relFile}: broken internal link ${href}`);
        continue;
      }
      if (mapped.anchor) {
        const targetHtml = await readFile(found, "utf8");
        const targetIds = collectFromHtml(targetHtml).ids;
        if (!targetIds.has(mapped.anchor)) {
          errors.push(`${relFile}: missing anchor #${mapped.anchor} in ${mapped.pathOnly}`);
        }
      }
    }

    for (const src of srcs) {
      if (!isInternal(src) || isIgnored(src)) continue;
      const mapped = hrefToDistPath(src);
      if (!mapped) continue;
      const found = await assertPathExists(mapped);
      if (!found) {
        errors.push(`${relFile}: broken image/asset ${src}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`check-links: ${errors.length} issue(s)`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exit(1);
  }

  console.log(`check-links: OK (${htmlFiles.length} html files scanned)`);
};

await run();
