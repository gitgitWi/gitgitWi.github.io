import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";
import { parse as parseYaml } from "yaml";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = join(rootDir, "src/content");
const ogDir = join(rootDir, "public/og");

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

const walkContent = async (dir) => {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkContent(fullPath)));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
};

const parseFrontmatter = async (filePath) => {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(filePath, "utf8");
  const match = FRONTMATTER_RE.exec(source);
  if (!match) return null;
  return parseYaml(match[1]);
};

const buildOgSvg = ({ title, subtitle }) => {
  const escapeXml = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  const truncate = (value, max) => (value.length <= max ? value : `${value.slice(0, max - 1)}…`);
  const safeTitle = escapeXml(truncate(title, 72));
  const safeSubtitle = escapeXml(truncate(subtitle ?? "gitgitWi", 96));
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6f1e8"/>
      <stop offset="100%" stop-color="#e8f0ea"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="64" y="64" width="1072" height="502" rx="24" fill="#fffdf8" stroke="#d4c4b0" stroke-width="2"/>
  <text x="120" y="220" fill="#2b2118" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="56" font-weight="700">${safeTitle}</text>
  <text x="120" y="300" fill="#5c4f44" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="32">${safeSubtitle}</text>
  <text x="120" y="480" fill="#8a7a6c" font-family="Geist Mono, monospace" font-size="28">gitgitwi.github.io</text>
</svg>`;
};

const writePng = async (fileName, svg) => {
  const outputPath = join(ogDir, fileName);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(outputPath, png);
};

const run = async () => {
  await mkdir(ogDir, { recursive: true });

  await writePng(
    "default.png",
    buildOgSvg({ title: "gitgitWi", subtitle: "Technical blog · Astro · TypeScript" }),
  );

  const files = await walkContent(contentRoot);
  let generated = 1;

  for (const filePath of files) {
    const rel = relative(contentRoot, filePath);
    const [collection] = rel.split("/");
    if (collection !== "articles" && collection !== "til") continue;

    const data = await parseFrontmatter(filePath);
    if (!data?.title) continue;
    if (collection === "articles" && data.draft) continue;
    if (collection === "til" && data.visibility && data.visibility !== "public") continue;

    const id = rel.replace(/\.(md|mdx)$/i, "");
    const contentId = id.slice(collection.length + 1);
    const subtitle =
      collection === "articles" ? (data.description ?? "Article") : (data.summary ?? "Wiki");
    const fileName = `${collection}-${contentId.replaceAll("/", "-")}.png`;

    await writePng(fileName, buildOgSvg({ title: data.title, subtitle }));
    generated += 1;
  }

  console.log(`generate-og: OK (${generated} image(s) in public/og/)`);
};

await run();
