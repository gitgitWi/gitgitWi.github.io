import { parseQuizItems, type QuizItem } from "../quiz.ts";

export const deckId = "design-system" as const;

export const items: QuizItem[] = parseQuizItems([
  {
    id: "design-system-01",
    deck: "design-system",
    type: "mcq",
    prompt: "GetIt-UI monorepo에서 Atomic Design으로 구성한 패키지 깊이는?",
    choices: [
      "atoms, molecules, organisms 정도",
      "atoms만",
      "templates까지 전부",
      "pages 레벨까지",
    ],
    answerIndex: 0,
    explanation: "컴포넌트 라이브러리이므로 atoms·molecules·organisms 정도까지만 구성한다.",
    source: "/articles/design-system/01",
  },
  {
    id: "design-system-02",
    deck: "design-system",
    type: "short",
    prompt: "Storybook으로 컴포넌트 결과를 별도 페이지 없이 확인할 때 강조한 개발 경험(영문)?",
    answer: "HMR",
    explanation: "별도 페이지 구성 없이 HMR로 컴포넌트 구현 결과를 바로 볼 수 있다.",
    source: "/articles/design-system/01",
  },
  {
    id: "design-system-03",
    deck: "design-system",
    type: "mcq",
    prompt: "스타일링에 CSS Module을 선호한 이유로 맞는 것은?",
    choices: [
      "CSS 그대로 쓰면서 className을 JS로 제어할 수 있다",
      "styled-components보다 타입 추론이 강하다",
      "Storybook과만 호환된다",
      "IE에서 grid를 쓸 수 없어서",
    ],
    answerIndex: 0,
    explanation: "CSS-in-JS 대신 CSS Module로 className 적용을 컨트롤하는 방식을 선호했다.",
    source: "/articles/design-system/01",
  },
  {
    id: "design-system-04",
    deck: "design-system",
    type: "short",
    prompt: "monorepo workspace에 쓴 Yarn berry 기능 이름(영문 두 단어)?",
    answer: "PnP",
    explanation: "Yarn berry PnP 모드에서 workspace 플러그인으로 monorepo를 구성했다.",
    source: "/articles/design-system/01",
  },
  {
    id: "design-system-05",
    deck: "design-system",
    type: "mcq",
    prompt: "Vite 라이브러리 모드에서 CSS Module 스타일이 다른 패키지에 안 먹힐 때 쓴 해결책은?",
    choices: [
      "vite-plugin-css-injected-by-js",
      "styled-components 테마 provider",
      "Webpack 5로 전환",
      "CSS layers만 켜기",
    ],
    answerIndex: 0,
    explanation:
      "라이브러리 빌드 시 CSS import가 빠지는 문제를 css-injected-by-js 플러그인으로 해결했다.",
    source: "/articles/design-system/01",
  },
]);
