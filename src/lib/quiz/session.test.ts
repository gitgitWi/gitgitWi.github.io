import { describe, expect, it } from "vitest";

import type { QuizItem } from "../../content/quiz.ts";

import { createSeededRng } from "./shuffle.ts";
import { buildSession, isSessionMcq } from "./session.ts";

const sampleItems: QuizItem[] = [
  {
    id: "m1",
    deck: "ts-basics",
    type: "mcq",
    prompt: "Q1",
    choices: ["a", "b", "c", "d"],
    answerIndex: 1,
    explanation: "e1",
    source: "/til/ts/enum-to-template-literal",
  },
  {
    id: "m2",
    deck: "ts-basics",
    type: "mcq",
    prompt: "Q2",
    choices: ["a", "b", "c", "d"],
    answerIndex: 0,
    explanation: "e2",
    source: "/til/ts/enum-to-template-literal",
  },
  {
    id: "s1",
    deck: "ts-basics",
    type: "short",
    prompt: "Q3",
    answer: "foo",
    explanation: "e3",
    source: "/til/ts/enum-to-template-literal",
  },
  {
    id: "s2",
    deck: "ts-basics",
    type: "short",
    prompt: "Q4",
    answer: "bar",
    explanation: "e4",
    source: "/til/ts/enum-to-template-literal",
  },
];

describe("buildSession", () => {
  it("limit 이하 개수를 반환한다", () => {
    const session = buildSession({ items: sampleItems, limit: 3, rng: createSeededRng(1) });
    expect(session.length).toBeLessThanOrEqual(3);
  });

  it("mcq 항목은 보기 순서가 셔플된다", () => {
    const session = buildSession({
      items: sampleItems,
      limit: 4,
      mcqRatio: 1,
      rng: createSeededRng(5),
    });
    const mcq = session.filter(isSessionMcq);
    expect(mcq.length).toBeGreaterThan(0);
    mcq.forEach((item) => {
      expect(item.shuffledChoices).toHaveLength(4);
      expect(item.shuffledAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(item.shuffledAnswerIndex).toBeLessThanOrEqual(3);
      expect(item.shuffledChoices[item.shuffledAnswerIndex]).toBe(item.choices[item.answerIndex]);
    });
  });

  it("같은 seed면 동일한 세션 순서를 만든다", () => {
    const first = buildSession({ items: sampleItems, limit: 4, rng: createSeededRng(11) });
    const second = buildSession({ items: sampleItems, limit: 4, rng: createSeededRng(11) });
    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id));
  });
});

describe("isSessionMcq", () => {
  it("mcq 세션 항목만 true", () => {
    const session = buildSession({ items: sampleItems, limit: 4, rng: createSeededRng(3) });
    session.forEach((item) => {
      if (item.type === "mcq") {
        expect(isSessionMcq(item)).toBe(true);
      } else {
        expect(isSessionMcq(item)).toBe(false);
      }
    });
  });
});
