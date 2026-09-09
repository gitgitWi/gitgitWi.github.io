import { readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parse as parseYaml } from "yaml";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = join(rootDir, "src/content");
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

const syncResult = spawnSync("bun", ["run", "astro", "sync"], {
  cwd: rootDir,
  stdio: "inherit",
});
if (syncResult.status !== 0) {
  process.exit(syncResult.status ?? 1);
}

const { articleSchema, tilSchema } = await import("../src/lib/content-schemas.ts");

const walkContent = async (dir) => {
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

const errors = [];

const validateFile = async (filePath) => {
  const rel = relative(contentRoot, filePath);
  const [collection] = rel.split("/");
  if (collection !== "articles" && collection !== "til") return;

  const source = await readFile(filePath, "utf8");
  const match = FRONTMATTER_RE.exec(source);
  if (!match) {
    errors.push(`${rel}: missing YAML frontmatter`);
    return;
  }

  let data;
  try {
    data = parseYaml(match[1]);
  } catch (error) {
    errors.push(`${rel}: invalid YAML — ${error instanceof Error ? error.message : String(error)}`);
    return;
  }

  const schema = collection === "articles" ? articleSchema : tilSchema;
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    errors.push(`${rel}: ${parsed.error.message}`);
  }
};

const files = await walkContent(contentRoot);
for (const filePath of files) {
  await validateFile(filePath);
}

if (errors.length > 0) {
  console.error(`check-schema: ${errors.length} issue(s)`);
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

console.log(`check-schema: OK (${files.length} content file(s), astro sync passed)`);
