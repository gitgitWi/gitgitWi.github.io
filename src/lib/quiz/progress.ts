import type { QuizDeckId } from "../../content/quiz.ts";

export const QUIZ_PROGRESS_KEY = "quiz-progress-v1";

export type DeckProgress = {
  seen: number;
  correct: number;
};

export type QuizProgressStore = Partial<Record<QuizDeckId, DeckProgress>>;

export const readQuizProgress = (): QuizProgressStore => {
  if (typeof localStorage === "undefined") return {};

  try {
    const raw = localStorage.getItem(QUIZ_PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as QuizProgressStore;
  } catch {
    return {};
  }
};

export const writeQuizProgress = (store: QuizProgressStore): void => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(store));
};

type RecordAnswerArgs = {
  deckId: QuizDeckId;
  correct: boolean;
};

export const recordDeckAnswer = ({ deckId, correct }: RecordAnswerArgs): DeckProgress => {
  const store = readQuizProgress();
  const current = store[deckId] ?? { seen: 0, correct: 0 };
  const next: DeckProgress = {
    seen: current.seen + 1,
    correct: current.correct + (correct ? 1 : 0),
  };
  writeQuizProgress({ ...store, [deckId]: next });
  return next;
};
