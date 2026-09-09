# Phase 4 PLAN — Hardening + 운영

## 순서 (CI는 Phase 0 승인 즉시 선행 — stacked PR 전제조건)
0. CI 선행 구축 (`feat/ci-gates` → `main` 직행, 타 Phase보다 먼저):
   `.github/workflows/ci.yml` — `oven-sh/setup-bun@v2` + `bun install` 후 매트릭스 없이 순차 실행:
   `check` → `format` → `lint` → `test --passWithNoTests` → `links/schema/leak` (스크립트 부재 시 해당 잡은
   `exit 0` + TODO 주석. Phase별 스크립트 완성 시 활성화) → `build-storybook` (Phase 1 이후).
   branch protection: CI 그린 필수. `withastro/action@v6` (package-manager=bun 자동감지, node 24 기본).
1. 검색: `pagefind` (`bunx pagefind --site dist`) + `src/pages/search.astro` (Pagefind UI island) +
   빌드 후훅 `package.json: build: astro build && pagefind`. 제외: `/wiki/quiz` (동적), `draft`.
2. SEO: `@astrojs/sitemap` + `@astrojs/rss` (`/rss.xml`: articles+til, pubDate desc 30개) +
   `src/lib/og.ts` (1200×630 SVG→PNG 빌드 생성, 폴백 기본 이미지) + canonical/JSON-LD in `Base.astro`.
3. 404: `src/pages/404.astro` (인기글·태그·검색 링크). shim 매핑 누락분은 404에서 안내.
4. CI `.github/workflows/ci.yml` (PR+main): `astro check` · `eslint` (StyleX 포함) · `scripts/check-links.mjs` ·
   `scripts/check-schema.mjs` (`astro sync` + Zod 파싱) · `scripts/check-leak.mjs`
   (frontmatter `visibility!=public`·`raw/`·사내도메인·주민번호 패턴 차단 — llm-wiki `/publish` 게이트 이식).
5. 정리: `legacy-next/` 삭제, `gh-pages` 브랜치 삭제 (Pages Source=Actions 확인 후), 구 워크플로우 잔재 제거.
6. 성능: `astro:assets` 이미지 변환, 폰트 서브셋, 예산 체크 (`scripts/check-budget.mjs`: JS≤50KB/페이지).

## 검증
- CI 4가드 그린 캡처, RSS/sitemap/404/검색 Top-3 수동 체크, 구 배포경로 제거 확인 (`git branch -r`).

## 승인 요청
- [ ] Pagefind 동의? (Algolia 불필요 확인)
- [ ] OG 자동생성 vs 수동 — 선호?
