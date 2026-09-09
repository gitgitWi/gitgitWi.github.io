import { items as designSystemItems } from "../../content/quiz/design-system.ts";
import { items as refactoringItems } from "../../content/quiz/refactoring.ts";
import { items as tddItems } from "../../content/quiz/tdd.ts";
import { items as tsBasicsItems } from "../../content/quiz/ts-basics.ts";
import { quizDeckIds, type QuizDeckId, type QuizItem } from "../../content/quiz.ts";

export { quizDeckIds, type QuizDeckId, type QuizItem };

const deckCatalog: Record<QuizDeckId, QuizItem[]> = {
  "ts-basics": tsBasicsItems,
  tdd: tddItems,
  refactoring: refactoringItems,
  "design-system": designSystemItems,
};

export const deckLabels: Record<QuizDeckId, string> = {
  "ts-basics": "TypeScript 기초",
  tdd: "TDD",
  refactoring: "리팩토링",
  "design-system": "Design System",
};

export const getDeckItems = (deckId: QuizDeckId): QuizItem[] => deckCatalog[deckId];

export const getAllQuizItems = (): QuizItem[] => quizDeckIds.flatMap((id) => deckCatalog[id]);

export const isQuizDeckId = (value: string): value is QuizDeckId =>
  (quizDeckIds as readonly string[]).includes(value);
