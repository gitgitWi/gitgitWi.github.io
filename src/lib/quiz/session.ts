import type { McqQuizItem, QuizItem } from "../../content/quiz.ts";

import { shuffle, type Rng } from "./shuffle.ts";

export type SessionMcqItem = McqQuizItem & {
  shuffledChoices: [string, string, string, string];
  shuffledAnswerIndex: number;
};

export type SessionItem = QuizItem | SessionMcqItem;

export const isSessionMcq = (item: SessionItem): item is SessionMcqItem =>
  item.type === "mcq" && "shuffledChoices" in item;

type BuildSessionArgs = {
  items: QuizItem[];
  mcqRatio?: number;
  limit?: number;
  rng?: Rng;
};

const shuffleMcqChoices = (item: McqQuizItem, rng: Rng): SessionMcqItem => {
  const order = shuffle([0, 1, 2, 3], rng);
  const shuffledChoices = order.map((index) => item.choices[index]) as [
    string,
    string,
    string,
    string,
  ];
  const shuffledAnswerIndex = order.indexOf(item.answerIndex);

  return {
    ...item,
    shuffledChoices,
    shuffledAnswerIndex: shuffledAnswerIndex >= 0 ? shuffledAnswerIndex : 0,
  };
};

export const buildSession = ({
  items,
  mcqRatio = 0.6,
  limit = 10,
  rng = Math.random,
}: BuildSessionArgs): SessionItem[] => {
  const mcqItems = items.filter((item): item is McqQuizItem => item.type === "mcq");
  const shortItems = items.filter((item) => item.type === "short");
  const mcqCount = Math.min(Math.round(limit * mcqRatio), mcqItems.length);
  const shortCount = Math.min(limit - mcqCount, shortItems.length);
  const adjustedMcqCount = Math.min(limit - shortCount, mcqCount);

  const selected = [
    ...shuffle(mcqItems, rng).slice(0, adjustedMcqCount),
    ...shuffle(shortItems, rng).slice(0, shortCount),
  ];

  return shuffle(selected, rng).map((item) =>
    item.type === "mcq" ? shuffleMcqChoices(item, rng) : item,
  );
};
