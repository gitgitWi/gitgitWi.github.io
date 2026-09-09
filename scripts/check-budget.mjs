import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");
const MAX_BYTES = 50 * 1024;

const EXCLUDED_PAGE_PATTERNS = [/\/wiki\/quiz\/?(?:index\.html)?$/, /\/wiki\/quiz\.html$/];

const EXCLUDED_SCRIPT_PATTERNS = [/quiz/i, /three/i, /HeroCanvas/i, /pagefind/i];

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

const fileSize = async (path) => {
  try {
    const info = await stat(path);
    return info.size;
  } catch {
    return 0;
  }
};

const resolveAssetPath = (href) => {
  if (!href.startsWith("/")) return null;
  const normalized = href.split("?")[0].split("#")[0];
  return join(distDir, normalized.slice(1));
};

const isExcludedPage = (relPath) => EXCLUDED_PAGE_PATTERNS.some((pattern) => pattern.test(relPath));

const isExcludedScript = (src) => EXCLUDED_SCRIPT_PATTERNS.some((pattern) => pattern.test(src));

const run = async () => {
  let htmlFiles;
  try {
    htmlFiles = await walkHtml(distDir);
  } catch {
    console.error("check-budget: dist/ not found — run `bun run build` first.");
    process.exit(1);
  }

  const errors = [];

  for (const file of htmlFiles) {
    const relPath = file.slice(distDir.length + 1);
    if (isExcludedPage(relPath)) continue;

    const html = await readFile(file, "utf8");
    const scripts = [...html.matchAll(/\ssrc="([^"]+\.js[^"]*)"/g)].map((match) => match[1]);
    let total = 0;

    for (const src of scripts) {
      if (isExcludedScript(src)) continue;
      const assetPath = resolveAssetPath(src);
      if (!assetPath) continue;
      total += await fileSize(assetPath);
    }

    if (total > MAX_BYTES) {
      errors.push(
        `${relPath}: ${total} bytes JS (limit ${MAX_BYTES}; island/quiz/three/pagefind scripts excluded)`,
      );
    }
  }

  if (errors.length > 0) {
    console.error(`check-budget: ${errors.length} issue(s)`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exit(1);
  }

  console.log(
    `check-budget: OK (${htmlFiles.length} html files, ≤${MAX_BYTES} bytes non-island JS)`,
  );
};

await run();
