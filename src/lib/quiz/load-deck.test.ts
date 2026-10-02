import { describe, expect, it } from "vitest";

import { loadDeckItems } from "./load-deck.ts";

describe("loadDeckItems", () => {
  it("ts-basics 덱 5문항을 동적 import로 로드한다", async () => {
    const items = await loadDeckItems("ts-basics");
    expect(items).toHaveLength(5);
    expect(items[0]?.deck).toBe("ts-basics");
  });

  it("design-system 덱 source가 기사 경로를 가리킨다", async () => {
    const items = await loadDeckItems("design-system");
    expect(items.every((item) => item.source.startsWith("/articles/"))).toBe(true);
  });
});
