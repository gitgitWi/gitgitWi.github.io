import { deckLabels, getDeckItemCounts, quizDeckIds } from "../../lib/quiz/decks.ts";

import { QuizDeck } from "./QuizDeck.tsx";

const deckCounts = getDeckItemCounts();

export default {
  title: "quiz/QuizDeck",
  component: QuizDeck,
  parameters: {
    docs: {
      description: {
        component:
          "Wiki flash card island. 덱 데이터는 loadDeckItems로 동적 import. 키보드 1–4·Enter·화살표, aria-live.",
      },
    },
  },
};

export const DeckPicker = {
  render: () => <QuizDeck deckIds={quizDeckIds} deckLabels={deckLabels} deckCounts={deckCounts} />,
};

export const ShortSession = {
  render: () => (
    <QuizDeck
      deckIds={quizDeckIds}
      deckLabels={deckLabels}
      deckCounts={deckCounts}
      sessionLimit={3}
    />
  ),
};
