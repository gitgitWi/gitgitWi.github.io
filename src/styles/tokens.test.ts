import { describe, expect, it } from "vitest";

import { tokens } from "./tokens.stylex.ts";

const srgbToLinear = (channel: number) => {
  const value = channel / 255;
  if (value <= 0.04045) return value / 12.92;
  return ((value + 0.055) / 1.055) ** 2.4;
};

const luminanceOf = (hex: string) => {
  const value = hex.replace("#", "");
  const red = srgbToLinear(Number.parseInt(value.slice(0, 2), 16));
  const green = srgbToLinear(Number.parseInt(value.slice(2, 4), 16));
  const blue = srgbToLinear(Number.parseInt(value.slice(4, 6), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (foreground: string, background: string) => {
  const lighter = Math.max(luminanceOf(foreground), luminanceOf(background));
  const darker = Math.min(luminanceOf(foreground), luminanceOf(background));
  return (lighter + 0.05) / (darker + 0.05);
};

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

  it("primary 버튼 canvas 위 accentInk 대비가 AA(4.5:1) 이상이다", () => {
    expect(contrastRatio("#F7F5EE", "#087044")).toBeGreaterThanOrEqual(4.5);
  });

  it("inkTertiary는 canvas·muted surface 위에서 AA(4.5:1) 이상이다", () => {
    expect(contrastRatio("#555B56", "#F7F5EE")).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#555B56", "#EFEEE7")).toBeGreaterThanOrEqual(4.5);
  });
});
