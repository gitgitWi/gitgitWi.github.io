import { quizDeckIds, type QuizDeckId } from "../../content/quiz.ts";

export { quizDeckIds, type QuizDeckId };

export const deckLabels: Record<QuizDeckId, string> = {
  "ts-basics": "TypeScript 기초",
  tdd: "TDD",
  refactoring: "리팩토링",
  "design-system": "Design System",
};

export const isQuizDeckId = (value: string): value is QuizDeckId =>
  (quizDeckIds as readonly string[]).includes(value);
