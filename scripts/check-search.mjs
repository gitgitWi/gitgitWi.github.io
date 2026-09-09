import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pagefindDir = join(rootDir, "dist/pagefind");
const pagefindModulePath = join(pagefindDir, "pagefind.js");
const TOP_N = 3;

/**
 * Top-3 ranked search checklist — see .tasks/phase-4-hardening-ops/LOG.md
 * Uses Pagefind WASM ranking via dist/pagefind/pagefind.js (same as browser UI).
 */
const SEARCH_CASES = [
  {
    query: "리팩토링",
    expectPath: "/til/refactoring-javascript/01",
    note: "TIL — 리팩토링 시리즈 1편 (title 가중)",
  },
  {
    query: "Personal Design System",
    expectPath: "/articles/design-system/01",
    note: "articles — Design System 환경 설정 (distinctive title phrase)",
  },
  {
    query: "literal",
    expectPath: "/til/ts/enum-to-template-literal",
    note: "TIL — enum → literal 타입",
  },
];

const installFileFetchShim = () => {
  const nativeFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.startsWith("file://")) {
      const filePath = fileURLToPath(url.split("?")[0]);
      const body = await readFile(filePath);
      return new Response(body);
    }
    return nativeFetch(input, init);
  };
  return () => {
    globalThis.fetch = nativeFetch;
  };
};

const normalizePath = (url) => {
  if (!url) return "";
  const pathOnly = url
    .replace(/^\/file:[^/]*/, "")
    .split("#")[0]
    .split("?")[0];
  const withLeading = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
};

const rankedSearch = async (pagefind, query) => {
  const response = await pagefind.search(query);
  const ranked = response.results ?? [];
  const top = ranked.slice(0, TOP_N);
  const resolved = await Promise.all(top.map((result) => result.data()));
  return resolved.map((doc) => ({
    url: normalizePath(doc.raw_url ?? doc.url),
    title: doc.meta?.title ?? "",
    score: ranked.find((entry) => entry.id === doc.id)?.score,
  }));
};

const assertIndexPresent = async () => {
  try {
    const entry = JSON.parse(await readFile(join(pagefindDir, "pagefind-entry.json"), "utf8"));
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

  try {
    await readFile(pagefindModulePath);
  } catch {
    console.error("check-search: dist/pagefind/pagefind.js not found — run `bun run build` first.");
    process.exit(1);
  }
};

const run = async () => {
  await assertIndexPresent();

  const restoreFetch = installFileFetchShim();
  const pagefind = await import(pathToFileURL(pagefindModulePath).href);

  try {
    await pagefind.init();
    const errors = [];

    for (const { query, expectPath, note } of SEARCH_CASES) {
      const topResults = await rankedSearch(pagefind, query);
      const expected = normalizePath(expectPath);
      const urls = topResults.map((hit) => hit.url);
      const rank = urls.indexOf(expected);

      if (rank === -1) {
        const summary = topResults
          .map((hit, index) => `${index + 1}:${hit.url} (${hit.title.slice(0, 40)})`)
          .join(", ");
        errors.push(`"${query}" (${note}): expected ${expected} in top ${TOP_N}, got [${summary}]`);
      }
    }

    if (errors.length > 0) {
      console.error(`check-search: ${errors.length} issue(s)`);
      for (const message of errors) console.error(`  - ${message}`);
      process.exit(1);
    }

    console.log(
      `check-search: OK (${SEARCH_CASES.length} queries ranked top-${TOP_N} via Pagefind WASM)`,
    );
  } finally {
    if (typeof pagefind.destroy === "function") {
      await pagefind.destroy();
    }
    restoreFetch();
  }
};

await run();
