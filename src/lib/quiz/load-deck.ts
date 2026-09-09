import type { QuizDeckId, QuizItem } from "../../content/quiz.ts";

type DeckModule = {
  items: QuizItem[];
};

const deckLoaders: Record<QuizDeckId, () => Promise<DeckModule>> = {
  "ts-basics": () => import("../../content/quiz/ts-basics.ts"),
  tdd: () => import("../../content/quiz/tdd.ts"),
  refactoring: () => import("../../content/quiz/refactoring.ts"),
  "design-system": () => import("../../content/quiz/design-system.ts"),
};

export const loadDeckItems = async (deckId: QuizDeckId): Promise<QuizItem[]> => {
  const mod = await deckLoaders[deckId]();
  return mod.items;
};
