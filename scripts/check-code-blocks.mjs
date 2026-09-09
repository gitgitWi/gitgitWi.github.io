import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const articlePath = join(rootDir, "dist/articles/from-jekyll-to-nextjs/00/index.html");

const html = await readFile(articlePath, "utf8");

if (!/language-\w+/.test(html)) {
  console.error("check-code-blocks: missing language-* class in migrated article HTML");
  process.exit(1);
}

const codeTextMarkers = ["Markdown", "React"];
const hasCodeText = codeTextMarkers.some((marker) => html.includes(marker));

if (!hasCodeText) {
  console.error("check-code-blocks: fenced code body appears empty in from-jekyll article");
  process.exit(1);
}

console.log("check-code-blocks: OK (from-jekyll article has language class and code text)");
