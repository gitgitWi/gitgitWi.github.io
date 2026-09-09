import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parse as parseYaml } from "yaml";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const scanRoots = [
  join(rootDir, "src/content"),
  join(rootDir, "src/pages"),
  join(rootDir, "public"),
];

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

const INTERNAL_DOMAIN_PATTERNS = [
  /\best\.(ai|co\.kr|works)\b/i,
  /\bworks@est\b/i,
  /\binternal\.(est|company)\b/i,
  /\bintra\./i,
  /\bvpn\./i,
];

const SSN_PATTERN = /\b(?:\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[-\s]?[1-4]\d{6})\b/;

const errors = [];

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "raw" || fullPath.includes(`${join("src", "content", "raw")}`)) {
        errors.push(`${relative(rootDir, fullPath)}: raw/ path is not publishable`);
      }
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

const scanText = (relPath, text) => {
  if (relPath.includes("/raw/") || relPath.includes("\\raw\\")) {
    errors.push(`${relPath}: raw/ path is not publishable`);
  }

  for (const pattern of INTERNAL_DOMAIN_PATTERNS) {
    if (pattern.test(text)) {
      errors.push(`${relPath}: possible internal company domain`);
      break;
    }
  }

  if (SSN_PATTERN.test(text)) {
    errors.push(`${relPath}: possible Korean resident registration number pattern`);
  }
};

const scanFrontmatter = (relPath, source) => {
  const match = FRONTMATTER_RE.exec(source);
  if (!match) return;

  let data;
  try {
    data = parseYaml(match[1]);
  } catch {
    return;
  }

  if (data?.visibility && data.visibility !== "public") {
    errors.push(`${relPath}: visibility=${data.visibility} (must be public for publish)`);
  }
};

const run = async () => {
  const files = [];
  for (const root of scanRoots) {
    try {
      files.push(...(await walk(root)));
    } catch {
      continue;
    }
  }

  for (const filePath of files) {
    const relPath = relative(rootDir, filePath);
    if (!/\.(md|mdx|astro|json|ts|tsx|js|mjs)$/i.test(filePath)) continue;

    const text = await readFile(filePath, "utf8");
    scanText(relPath, text);
    if (/\.(md|mdx)$/i.test(filePath)) {
      scanFrontmatter(relPath, text);
    }
  }

  if (errors.length > 0) {
    console.error(`check-leak: ${errors.length} issue(s)`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exit(1);
  }

  console.log(`check-leak: OK (${files.length} file(s) scanned)`);
};

await run();
