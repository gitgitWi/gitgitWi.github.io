import { describe, expect, it } from "vitest";

import { gradeMCQ, gradeShort, normalizeShortAnswer } from "./grade.ts";

describe("normalizeShortAnswer", () => {
  it("NFKC·trim·소문자·공백/마침표를 제거한다", () => {
    expect(normalizeShortAnswer("  Readonly Record. ")).toBe("readonlyrecord");
    expect(normalizeShortAnswer("ＡＢＣ")).toBe("abc");
  });
});

describe("gradeMCQ", () => {
  it("선택 인덱스가 정답과 같으면 true", () => {
    expect(gradeMCQ({ pickedIndex: 2, answerIndex: 2 })).toBe(true);
  });

  it("선택 인덱스가 다르면 false", () => {
    expect(gradeMCQ({ pickedIndex: 0, answerIndex: 1 })).toBe(false);
  });
});

describe("gradeShort", () => {
  it("정규화 후 일치하면 true", () => {
    expect(gradeShort({ given: " ReadonlyRecord ", answer: "readonly record" })).toBe(true);
  });

  it("정규화 후 불일치하면 false", () => {
    expect(gradeShort({ given: "enum", answer: "ReadonlyRecord" })).toBe(false);
  });
});
