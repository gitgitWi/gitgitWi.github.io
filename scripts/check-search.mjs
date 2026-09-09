import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pagefindDir = join(rootDir, "dist/pagefind");
const fragmentDir = join(pagefindDir, "fragment");
const FRAGMENT_PREFIX = "pagefind_dcd";

/** Top-3 manual checklist — see .tasks/phase-4-hardening-ops/LOG.md */
const SEARCH_CASES = [
  {
    query: "리팩토링",
    expectPath: "/til/refactoring-javascript/01",
    note: "TIL 위키 — 리팩토링 시리즈 1편",
  },
  {
    query: "Storybook",
    expectPath: "/articles/design-system/01",
    note: "articles — Design System 환경 설정 글",
  },
  {
    query: "literal",
    expectPath: "/til/ts/enum-to-template-literal",
    note: "TIL — enum → literal 타입 글",
  },
];

const loadFragments = async () => {
  let names;
  try {
    names = await readdir(fragmentDir);
  } catch {
    console.error("check-search: dist/pagefind/fragment not found — run `bun run build` first.");
    process.exit(1);
  }

  const docs = [];
  for (const name of names) {
    if (!name.endsWith(".pf_fragment")) continue;
    const compressed = await readFile(join(fragmentDir, name));
    const text = gunzipSync(compressed).toString("utf8");
    if (!text.startsWith(FRAGMENT_PREFIX)) {
      console.error(`check-search: unexpected fragment prefix in ${name}`);
      process.exit(1);
    }
    docs.push(JSON.parse(text.slice(FRAGMENT_PREFIX.length)));
  }

  if (docs.length === 0) {
    console.error("check-search: no Pagefind fragments found");
    process.exit(1);
  }

  return docs;
};

const matchesQuery = (doc, query) => {
  const q = query.toLowerCase();
  const haystacks = [doc.content ?? "", doc.meta?.title ?? "", doc.meta?.tags ?? ""].map((value) =>
    String(value).toLowerCase(),
  );
  return haystacks.some((text) => text.includes(q));
};

const normalizePath = (url) => {
  if (!url) return "";
  const pathOnly = url.split("#")[0].split("?")[0];
  return pathOnly.endsWith("/") ? pathOnly : `${pathOnly}/`;
};

const run = async () => {
  const entryPath = join(pagefindDir, "pagefind-entry.json");
  try {
    const entry = JSON.parse(await readFile(entryPath, "utf8"));
    const pageCount = entry.languages?.ko?.page_count ?? 0;
    if (pageCount < 10) {
      console.error(`check-search: suspicious page_count=${pageCount} in pagefind-entry.json`);
      process.exit(1);
    }
  } catch {
    console.error(
      "check-search: dist/pagefind/pagefind-entry.json not found — run `bun run build` first.",
    );
    process.exit(1);
  }

  const fragments = await loadFragments();
  const errors = [];

  for (const { query, expectPath, note } of SEARCH_CASES) {
    const hits = fragments.filter((doc) => matchesQuery(doc, query));
    const urls = hits.map((doc) => normalizePath(doc.url));
    const expected = normalizePath(expectPath);
    const matched = urls.includes(expected);

    if (!matched) {
      errors.push(
        `"${query}" (${note}): expected ${expected} in index hits, got [${urls.slice(0, 5).join(", ")}]`,
      );
    }
  }

  if (errors.length > 0) {
    console.error(`check-search: ${errors.length} issue(s)`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exit(1);
  }

  console.log(
    `check-search: OK (${SEARCH_CASES.length} queries, ${fragments.length} fragments, ko index)`,
  );
};

await run();
