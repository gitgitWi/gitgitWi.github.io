import { deckLabels } from "../../lib/quiz/decks.ts";
import { items as tsBasicsItems } from "../../content/quiz/ts-basics.ts";

import { QuizDeck } from "./QuizDeck.tsx";

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
    <QuizDeck
      deckId="ts-basics"
      deckLabel={deckLabels["ts-basics"]}
      items={tsBasicsItems}
      sessionLimit={5}
    />
  ),
};

export const ShortSession = {
  render: () => (
    <QuizDeck
      deckId="ts-basics"
      deckLabel={deckLabels["ts-basics"]}
      items={tsBasicsItems.slice(0, 3)}
      sessionLimit={3}
    />
  ),
};
