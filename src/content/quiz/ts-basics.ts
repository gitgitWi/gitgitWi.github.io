import { parseQuizItems, type QuizItem } from "../quiz.ts";

export const deckId = "ts-basics" as const;

export const items: QuizItem[] = parseQuizItems([
  {
    id: "ts-basics-01",
    deck: "ts-basics",
    type: "mcq",
    prompt: "TypeScript enum을 피하는 대표적인 이유는?",
    choices: [
      "tree-shaking이 어렵고 메모리 낭비가 생길 수 있다",
      "런타임에 enum 키를 동적으로 추가할 수 없다",
      "union 타입과 완전히 동일한 타입 추론을 제공한다",
      "class-validator에서 IsEnum과 함께 쓸 수 없다",
    ],
    answerIndex: 0,
    explanation:
      "enum은 transpile 후에도 객체로 남아 tree-shaking이 어렵고, 불필요한 메모리 사용으로 이어질 수 있다.",
    source: "/til/ts/enum-to-template-literal",
  },
  {
    id: "ts-basics-02",
    deck: "ts-basics",
    type: "short",
    prompt:
      "class-validator IsEnum에 넘기기 위해 enum 대신 쓰는 Readonly 객체 패턴의 핵심 타입 이름은?",
    answer: "ReadonlyRecord",
    explanation:
      "literal union 타입과 ReadonlyRecord로 key/value가 고정된 객체를 만들면 IsEnum에 넘길 수 있고 tree-shaking에도 유리하다.",
    source: "/til/ts/enum-to-template-literal",
  },
  {
    id: "ts-basics-03",
    deck: "ts-basics",
    type: "mcq",
    prompt:
      "서로 다른 두 enum 타입 PeriodA | PeriodCommon을 union하면 실무에서 어떤 문제가 생기는가?",
    choices: [
      "타입 에러 없이 선언되지만 실질적으로 사용할 수 없는 union이 된다",
      "자동으로 하나의 enum 객체로 merge된다",
      "intersection과 동일하게 never가 된다",
      "런타임에 PeriodA 값만 허용된다",
    ],
    answerIndex: 0,
    explanation:
      "enum끼리 union은 문법상 허용되지만 PeriodA | PeriodCommon처럼 실사용 불가능한 타입이 된다.",
    source: "/til/ts/enum-to-template-literal",
  },
  {
    id: "ts-basics-04",
    deck: "ts-basics",
    type: "short",
    prompt: "PeriodA와 PeriodCommon을 하나의 객체로 합칠 때 spread로 만든 상수 이름은?",
    answer: "Periods",
    explanation: "각 literal 타입별 ReadonlyRecord 객체를 spread해 Periods 하나로 합친다.",
    source: "/til/ts/enum-to-template-literal",
  },
  {
    id: "ts-basics-05",
    deck: "ts-basics",
    type: "mcq",
    prompt: "template literal 타입을 literal union과 함께 쓰면 얻는 이점은?",
    choices: [
      "MarketNames와 CategoryNames를 조합한 새 타입을 선언하기 쉽다",
      "enum union 문제를 자동으로 해결한다",
      "런타임 validation 없이 API 스키마를 생성한다",
      "class-validator 의존성을 제거한다",
    ],
    answerIndex: 0,
    explanation:
      "`${MarketNames}-${CategoryNames}`처럼 문자열 조합 타입을 선언·자동완성하기 편해진다.",
    source: "/til/ts/enum-to-template-literal",
  },
]);
