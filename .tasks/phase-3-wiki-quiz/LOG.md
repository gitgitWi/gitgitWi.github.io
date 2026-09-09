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

## 2026-09-10 review fix @ `61bfae5`

- **Island always ship:** `quiz.astro`가 SSG `searchParams`로 island 분기하던 문제 수정 → `<QuizDeck client:visible />` 항상 + 전 덱 props. 덱 선택은 island 내부(`history.replaceState`).
- **dist 증명:** `rg dist/wiki/quiz/index.html` → `astro-island` + `component-url="/_astro/QuizDeck.*.js"`.
- **Scoring:** `snapshots[idx]` per card — 재방문 시 picked/revealed freeze, `recordDeckAnswer`/`score` 중복 없음.
- **oxfmt:** `bunx oxfmt .` — PLAN 2건 포함 green.
- **번들 회귀:** 전 덱 props 인라인으로 QuizDeck chunk gzip **31,247 bytes** (목표 30KB 초과 → lazy deck import 후속).

## 2026-09-10 lazy deck @ `8b194ac`

- `loadDeckItems()` — `import()` per deck module; island props = `deckIds` + `deckLabels` + `deckCounts` only.
- **QuizDeck entry gzip:** **4,511 bytes** (`dist/_astro/QuizDeck.*.js`). 덱 청크는 별도 lazy (예: ts-basics ~1,167 gzip).
- vitest `loadDeckItems` 2건 추가 (총 23 passed). dist HTML: `astro-island` + `component-url` 유지.

## 2026-09-10 finished view @ `e20f48a`

- `quizView()` — `finished` → `loading` → `empty` → `card` 순서. `idx === total`일 때 완료 UI·다시 풀기 표시.
- vitest `quizView` 5건 (총 28 passed). QuizDeck entry gzip **4,610 bytes**. dist: `astro-island` 유지.
