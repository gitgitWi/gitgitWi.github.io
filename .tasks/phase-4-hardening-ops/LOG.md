# Phase 4 LOG

- Harness: cursor
- Started: 2026-09-10
- Status: PR-READY #61

## Notes

- 스택: `feat/phase-3-quiz` ← `feat/phase-4-hardening`. 머지는 사람. #56 → #58 → #59 → #60 먼저.
- `feat/ci-gates`는 만들지 않는다. CI 워크플로는 이 브랜치에 둔다 (이미 콘텐츠 스택 위).
- `gh-pages` 원격 브랜치 삭제는 하지 않는다. PR 본문에 사람이 Pages=Actions 확인 후 삭제하라고 적는다.
- `legacy-next/` 삭제는 이 Phase 범위.

## Implementation (2026-09-10)

- CI: `.github/workflows/ci.yml` — bun 1.4.2, Node 22, full gate chain.
- Pagefind: build 후 `bunx pagefind --site dist`, `/search`, quiz/draft 제외, title/tags 가중.
- SEO: `@astrojs/sitemap`, `/rss.xml` (articles+til 30), `scripts/generate-og.mjs` + `src/lib/og.ts`, Base canonical/JSON-LD.
- 404: `NotFoundGuide` — 인기글·태그·검색·구경로 안내.
- Guards: `check-schema`, `check-leak`, `check-budget`, `check-links` (canonical skip).
- Removed `legacy-next/`.

## Review fixes (2026-09-10, PR #61)

- `check-leak`: `src/components`, `src/layouts`, `src/lib` 포함 (stories/test 제외). secret 패턴(`sk-`, `ghp_`, `AKIA`, PEM 등) 추가.
- `check-search`: Pagefind WASM `search()` Top-3 게이트 — CI `build` 후 실행 (fragment substring 아님).

### Search Top-3 checklist (`scripts/check-search.mjs`)

`dist/pagefind/pagefind.js`를 Node에서 로드(file:// fetch shim) → `init()` → `search(query)` → `results.slice(0,3)`의 `data().raw_url`에 expected path 포함 여부.

| # | Query | Expected path (rank ≤3) | Source |
|---|-------|-------------------------|--------|
| 1 | `리팩토링` | `/til/refactoring-javascript/01/` | TIL — 리팩토링 시리즈 1편 |
| 2 | `Personal Design System` | `/articles/design-system/01/` | articles — Design System (Storybook은 tag 페이지가 1위) |
| 3 | `literal` | `/til/ts/enum-to-template-literal/` | TIL — enum → literal 타입 |

한국어 stemming 없음(Pagefind 한계). WASM 점수 순위 그대로 검증한다.

## 2026-09-10 review

- Sol `gpt-5.6-sol-medium`: leak 범위 → search substring → WASM Top-3. 최종 `REVIEW APPROVE phase-4 61`. usage: not visible.
- `gh pr ready 61`. 머지는 사람. 스택: #56 → #58 → #59 → #60 → #61.
- 사람 후속: Pages Source=Actions 확인 후 `gh-pages` 삭제, branch protection에 CI.

