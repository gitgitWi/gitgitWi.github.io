import { parseQuizItems, type QuizItem } from "../quiz.ts";

export const deckId = "tdd" as const;

export const items: QuizItem[] = parseQuizItems([
  {
    id: "tdd-01",
    deck: "tdd",
    type: "mcq",
    prompt: "글에서 정리한 테스트 구조의 given/when/then은 무엇을 검증하는가?",
    choices: [
      "주어진 상황에서 성공·실패 조건과 그 결과",
      "Mock 객체의 생성 순서",
      "E2E 시나리오의 UI 픽셀 단위 일치",
      "커버리지 100% 달성 여부",
    ],
    answerIndex: 0,
    explanation:
      "모든 테스트는 given 컨텍스트에서 when(성공/실패 조건)과 then(결과)을 검증한다고 정리했다.",
    source: "/til/tdd/fullstack-tdd-by-newbie",
  },
  {
    id: "tdd-02",
    deck: "tdd",
    type: "short",
    prompt: "단위 테스트에서 외부 의존을 Mock으로 대체하는 이유를 한 단어로?",
    answer: "가정",
    explanation:
      "단위 테스트는 함수/클래스 내부 동작만 보므로 외부는 정상 동작한다고 가정하고 Mock으로 분리한다.",
    source: "/til/tdd/fullstack-tdd-by-newbie",
  },
  {
    id: "tdd-03",
    deck: "tdd",
    type: "mcq",
    prompt: "파일럿 프로젝트에서 Frontend TDD가 실패한 주요 원인은?",
    choices: [
      "단위 테스트 범위를 넘는 e2e 성격의 검증을 하려 했다",
      "Jest 대신 Vitest를 쓰지 않았다",
      "Vue.js에서 TDD가 원천적으로 불가능하다",
      "MongoDB와 TypeORM 조합 때문이다",
    ],
    answerIndex: 0,
    explanation:
      "컴ponent 단위 테스트에서 이벤트·API 등 e2e에서 해야 할 것을 단위 테스트에서 하려다 혼란이 컸다.",
    source: "/til/tdd/fullstack-tdd-by-newbie",
  },
  {
    id: "tdd-04",
    deck: "tdd",
    type: "short",
    prompt: "통합·E2E 테스트가 단위 테스트와 달리 검증하는 범위를 한글 두 글자로?",
    answer: "기능",
    explanation: "E2E/통합 테스트는 내부 구현보다 end-to-end 기능과 input→output을 검증한다.",
    source: "/til/tdd/fullstack-tdd-by-newbie",
  },
  {
    id: "tdd-05",
    deck: "tdd",
    type: "mcq",
    prompt: "Nest.js 전환 후 TDD에 다시 관심을 갖게 된 계기는?",
    choices: [
      "수작업 회귀 확인이 반복되어 귀찮아졌기 때문",
      "Vue에서 React로 바꿨기 때문",
      "테스트 없는 리팩토링이 더 빠르다는 걸 깨달았기 때문",
      "Jest 공식 문서가 부족했기 때문",
    ],
    answerIndex: 0,
    explanation:
      "모노레포·Nest 전환 후 변경 검증을 손으로 반복하다 보니 TDD로 자동화하고 싶어졌다.",
    source: "/til/tdd/fullstack-tdd-by-newbie",
  },
]);
