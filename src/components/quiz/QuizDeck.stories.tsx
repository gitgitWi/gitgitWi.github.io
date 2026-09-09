import type { QuizDeckId } from "../../content/quiz.ts";
import { items as tsBasicsItems } from "../../content/quiz/ts-basics.ts";
import { deckLabels, getDeckItems, quizDeckIds } from "../../lib/quiz/decks.ts";

import { QuizDeck } from "./QuizDeck.tsx";

const allDecks = Object.fromEntries(
  quizDeckIds.map((deckId) => [deckId, getDeckItems(deckId)]),
) as Record<QuizDeckId, ReturnType<typeof getDeckItems>>;

export default {
  title: "quiz/QuizDeck",
  component: QuizDeck,
  parameters: {
    docs: {
      description: {
        component:
          "Wiki flash card island. 키보드 1–4·Enter·화살표, aria-live 피드백, prefers-reduced-motion 시 페이드.",
      },
    },
  },
};

export const TsBasics = {
  render: () => (
    <QuizDeck deckIds={quizDeckIds} deckLabels={deckLabels} decks={allDecks} sessionLimit={5} />
  ),
};

export const DeckPickerOnly = {
  render: () => (
    <QuizDeck
      deckIds={quizDeckIds}
      deckLabels={deckLabels}
      decks={{
        "ts-basics": tsBasicsItems,
        tdd: [],
        refactoring: [],
        "design-system": [],
      }}
      sessionLimit={5}
    />
  ),
};
