import { items as designSystemItems } from "../../content/quiz/design-system.ts";
import { items as refactoringItems } from "../../content/quiz/refactoring.ts";
import { items as tddItems } from "../../content/quiz/tdd.ts";
import { items as tsBasicsItems } from "../../content/quiz/ts-basics.ts";
import type { QuizDeckId, QuizItem } from "../../content/quiz.ts";

export { deckLabels, isQuizDeckId, quizDeckIds, type QuizDeckId } from "./deck-meta.ts";
export type { QuizItem } from "../../content/quiz.ts";

const deckCatalog: Record<QuizDeckId, QuizItem[]> = {
  "ts-basics": tsBasicsItems,
  tdd: tddItems,
  refactoring: refactoringItems,
  "design-system": designSystemItems,
};

export const getDeckItems = (deckId: QuizDeckId): QuizItem[] => deckCatalog[deckId];

export const getAllQuizItems = (): QuizItem[] =>
  (Object.keys(deckCatalog) as QuizDeckId[]).flatMap((id) => deckCatalog[id]);

export const getDeckItemCounts = (): Record<QuizDeckId, number> =>
  Object.fromEntries(
    (Object.keys(deckCatalog) as QuizDeckId[]).map((id) => [id, deckCatalog[id].length]),
  ) as Record<QuizDeckId, number>;
