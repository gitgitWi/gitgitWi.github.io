import { parseQuizItems, type QuizItem } from "../quiz.ts";

export const deckId = "refactoring" as const;

export const items: QuizItem[] = parseQuizItems([
  {
    id: "refactoring-01",
    deck: "refactoring",
    type: "mcq",
    prompt: "리팩토링의 핵심 정의로 맞는 것은?",
    choices: [
      "동작을 유지하면서 코드 품질을 향상하는 것",
      "새 기능을 추가하면서 테스트를 작성하는 것",
      "인터페이스(동작)를 변경해 API를 개선하는 것",
      "성능만 최적화하고 동작은 바꿀 수 있는 것",
    ],
    answerIndex: 0,
    explanation: "리팩토링의 요점은 행동을 유지하면서 품질을 향상하는 것이다.",
    source: "/til/refactoring-javascript/01",
  },
  {
    id: "refactoring-02",
    deck: "refactoring",
    type: "short",
    prompt: "테스트 없이 리팩토링할 수 없다는 문장에서 '없다' 앞에 오는 조건(한글)?",
    answer: "거치지않은",
    explanation: "「테스트를 거치지 않은 코드는 리팩토링할 수 없다」는 원칙을 강조한다.",
    source: "/til/refactoring-javascript/01",
  },
  {
    id: "refactoring-03",
    deck: "refactoring",
    type: "mcq",
    prompt: "다음 중 리팩토링이 아닌 것은?",
    choices: [
      "새로운 코드와 기능을 만드는 것",
      "함수와 모듈을 추출해 인터페이스를 단순화하는 것",
      "변수·함수 이름을 개선하는 것",
      "구현 세부 사항만 바꾸는 것",
    ],
    answerIndex: 0,
    explanation:
      "새 코드·기능 추가는 리팩토링이 아니며, 인터페이스 변경은 테스트를 깨뜨릴 수 있다.",
    source: "/til/refactoring-javascript/01",
  },
  {
    id: "refactoring-04",
    deck: "refactoring",
    type: "short",
    prompt: "number * 2 대신 number << 1로 바꿀 때 주의해야 하는 것(한글 두 단어)?",
    answer: "구현세부사항",
    explanation: "곱셈과 비트 시프트는 구현 세부 사항이며, 큰 수에서는 동작이 달라질 수 있다.",
    source: "/til/refactoring-javascript/01",
  },
  {
    id: "refactoring-05",
    deck: "refactoring",
    type: "mcq",
    prompt: "코드 품질 원칙 예시로 글에 나온 것은?",
    choices: ["SOLID", "CAP", "ACID", "CRUD"],
    answerIndex: 0,
    explanation: "SOLID, DRY, KISS, GRASP, YAGNI 등 품질 원칙을 나열한다.",
    source: "/til/refactoring-javascript/01",
  },
]);
