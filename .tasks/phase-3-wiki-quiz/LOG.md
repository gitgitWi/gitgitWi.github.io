# Phase 3 LOG

- Harness: cursor
- Started: 2026-09-10
- Status: PR-DRAFT #60 (`feat/phase-3-quiz` → `feat/phase-2-content`). base #59 먼저 머지.

## Notes

- 스택: `feat/phase-2-content` ← `feat/phase-3-quiz`. 머지는 사람. #56 → #58 → #59 먼저.
- Quiz island는 Home three와 별개. `client:visible` Preact. JS 꺼져도 noscript 목록.

## 2026-09-10 implement

- 스키마 `src/content/quiz.ts` + 덱 4×5=20 (`ts-basics`, `tdd`, `refactoring`, `design-system`). til 3편 `quizRefs`.
- 엔진 `shuffle` / `grade`(NFKC+trim+lower+공백·마침표 제거) / `session` / `progress` — vitest 21 passed.
- UI `QuizDeck` Preact + `/wiki/quiz` (덱 picker, noscript 정적 목록, 키보드 1–4·Enter·←→, aria-live, reduced-motion 페이드).
- **Quiz island gzip** (`dist/_astro/` quiz 페이지 로드 청크 합): **13,608 bytes** (QuizDeck 3,702 + Preact shared). 목표 30KB 이내.
- PR: #60 draft. 게이트: check·oxlint·vitest·lint:stylex·build·build-storybook green. oxfmt는 base부터 `.tasks/**/PLAN.md` 2건 drift(phase-3 src 무관).
