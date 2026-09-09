import { describe, expect, it } from "vitest";

import {
  buildTagIndex,
  filterByTag,
  formatDisplayDate,
  sortByPubDateDesc,
  type ContentListItem,
} from "./content-helpers.ts";

describe("sortByPubDateDesc", () => {
  it("최신 pubDate가 앞에 온다", () => {
    const older = { data: { pubDate: new Date("2022-01-01") } };
    const newer = { data: { pubDate: new Date("2023-01-01") } };
    expect(sortByPubDateDesc(older, newer)).toBeGreaterThan(0);
    expect(sortByPubDateDesc(newer, older)).toBeLessThan(0);
  });
});

describe("buildTagIndex", () => {
  it("태그 slug별 count를 집계한다", () => {
    const items: ContentListItem[] = [
      {
        id: "a",
        title: "A",
        summary: "s",
        pubDate: new Date("2022-01-01"),
        tags: ["astro", "mdx"],
        href: "/articles/a",
        kind: "article",
      },
      {
        id: "b",
        title: "B",
        summary: "s",
        pubDate: new Date("2022-02-01"),
        tags: ["astro"],
        href: "/articles/b",
        kind: "article",
      },
    ];
    const index = buildTagIndex(items);
    expect(index.find((tag) => tag.slug === "astro")?.count).toBe(2);
    expect(index.find((tag) => tag.slug === "mdx")?.count).toBe(1);
  });
});

describe("filterByTag", () => {
  it("지정 slug를 포함한 글만 남긴다", () => {
    const items: ContentListItem[] = [
      {
        id: "a",
        title: "A",
        summary: "s",
        pubDate: new Date("2022-01-01"),
        tags: ["astro"],
        href: "/articles/a",
        kind: "article",
      },
      {
        id: "b",
        title: "B",
        summary: "s",
        pubDate: new Date("2022-02-01"),
        tags: ["til"],
        href: "/til/b",
        kind: "til",
      },
    ];
    expect(filterByTag(items, "astro")).toHaveLength(1);
    expect(filterByTag(items, "missing")).toHaveLength(0);
  });
});

describe("formatDisplayDate", () => {
  it("YYYY.MM.DD 형식으로 포맷한다", () => {
    expect(formatDisplayDate(new Date("2022-03-01T12:00:00Z"))).toMatch(/^2022\.03\.01$/);
  });
});
