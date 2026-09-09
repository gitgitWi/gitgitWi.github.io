import { describe, expect, it } from "vitest";

import { tokens } from "./tokens.stylex.ts";

describe("tokens", () => {
  it("canvas·ink·accent 시맨틱 토큰 키가 존재한다", () => {
    expect(tokens.color.canvas).toBeDefined();
    expect(tokens.color.ink).toBeDefined();
    expect(tokens.color.accent).toBeDefined();
  });

  it("4px 기반 space 스케일 키가 존재한다", () => {
    expect(tokens.space[4]).toBeDefined();
    expect(tokens.space[8]).toBeDefined();
  });
});
