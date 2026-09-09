# Phase 3 PLAN — Wiki Quiz

## 순서
1. 스키마: `src/content/quiz.ts` (Zod) + `src/content/quiz/*.ts` 덱 4개
   (`ts-basics`, `tdd`, `refactoring`, `design-system`) × 5문항 = 20 시드.
   필드: `{id, deck, type:'mcq'|'short', prompt, choices?, answerIndex?, answer?, explanation, source}`.
2. 출제 엔진 `src/lib/quiz/{shuffle.ts, grade.ts, session.ts}` (프레임워크 무의존, vitest 유지 — SPEC Phase 0 §7):
   스타일: arrow 기본 (§3 — `function`은 컴포넌트·generator만), 3+인자 object (§4), `undefined` 우선 (§5),
   `for` 대신 array methods (§6, seeded RNG 순회 등 순차 의존 로직만 예외).
   - `shuffle(arr, rng?)` Fisher–Yates (seeded RNG 주입 가능 → 테스트 결정성).
   - `gradeMCQ / gradeShort(normalize: NFKC+trim+lower+공백/마침표 제거)`.
   - `buildSession(deck, {mcqRatio:0.6, limit:10})` — 타입 믹스 + 보기 셔플.
3. UI `src/components/quiz/QuizDeck.tsx` (Preact island, `client:visible`):
   - 상태: `order, idx, picked, revealed, score, history` + `localStorage['quiz-progress-v1']`.
   - 카드: 앞면 prompt → 뒤집기 → 객관식 버튼 / 주관식 input → 제출 → explanation + source 링크.
   - 키보드: `1-4/Enter/←→`. `aria-live="polite"` 피드백. `prefers-reduced-motion` 시 플립→페이드.
   - 라우트: `src/pages/wiki/quiz.astro` (덱 선택 + `<QuizDeck client:visible/>` + noscript 정적 목록).
4. 검증: `bunx vitest run` (셔플 분포·채점 경계·세션 불변식 — 테스트 타이틀 한국어, `describe`=심볼명), `bun run build` 번들 리포트 (gzip ≤30KB),
   키보드/스크린리더 수동 체크리스트.

## 승인 요청
- [ ] island = Preact 동의? (React 유지 희망 시 코멘트)
- [ ] 주관식 정규화 수준 동의?
