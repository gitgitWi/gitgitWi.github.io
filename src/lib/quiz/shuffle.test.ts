import { describe, expect, it } from "vitest";

import { createSeededRng, shuffle } from "./shuffle.ts";

describe("shuffle", () => {
  it("같은 seed면 동일한 순서를 반환한다", () => {
    const source = ["a", "b", "c", "d", "e"];
    const first = shuffle(source, createSeededRng(42));
    const second = shuffle(source, createSeededRng(42));
    expect(first).toEqual(second);
  });

  it("요소 개수와 멀티셋을 유지한다", () => {
    const source = [1, 2, 2, 3];
    const result = shuffle(source, createSeededRng(7));
    expect(result).toHaveLength(source.length);
    expect(result.sort()).toEqual(source.sort());
  });

  it("원본 배열을 변경하지 않는다", () => {
    const source = ["x", "y", "z"];
    const copy = [...source];
    shuffle(source, createSeededRng(1));
    expect(source).toEqual(copy);
  });
});

describe("createSeededRng", () => {
  it("0 이상 1 미만 값을 생성한다", () => {
    const rng = createSeededRng(99);
    Array.from({ length: 20 }, () => {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    });
  });
});
