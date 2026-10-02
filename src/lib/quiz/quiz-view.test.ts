import { describe, expect, it } from "vitest";

import { quizView } from "./quiz-view.ts";

describe("quizView", () => {
  it("마지막 문제 제출 후 idx === total이면 finished를 반환한다", () => {
    expect(quizView({ idx: 5, total: 5, loading: false, hasCurrent: false })).toBe("finished");
  });

  it("finished 상태에서 loading·empty보다 finished가 우선한다", () => {
    expect(quizView({ idx: 3, total: 3, loading: false, hasCurrent: false })).toBe("finished");
  });

  it("진행 중이면 card를 반환한다", () => {
    expect(quizView({ idx: 2, total: 5, loading: false, hasCurrent: true })).toBe("card");
  });

  it("덱 로드 중이면 loading을 반환한다", () => {
    expect(quizView({ idx: 0, total: 5, loading: true, hasCurrent: false })).toBe("loading");
  });

  it("current가 없고 세션이 끝나지 않았으면 empty를 반환한다", () => {
    expect(quizView({ idx: 0, total: 0, loading: false, hasCurrent: false })).toBe("empty");
  });
});
