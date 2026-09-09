# Phase 4 — Hardening + 운영

> 상태: SPEC+PLAN 작성됨 / 승인 대기.

## 1. 배경

출시 전 검색·SEO·가드레일을 잠근다.

## 2. 목표

1. 검색: Pagefind (빌드 후 인덱싱, 한국어 형태소 한계 명시 — 제목/태그 가중 프리셋).
2. SEO: `@astrojs/sitemap`, RSS (`@astrojs/rss` — articles+til), OG 이미지 (동적 생성은 빌드 스크립트, 수동 폴백),
   canonical, JSON-LD (BlogPosting/TechArticle).
3. 404 + 구경로 안내.
4. 구 `gh-pages` 브랜치 삭제 + Pages Sources=Actions 확인 + 구 `deploy.yml` 잔재 제거.
5. 성능 예산: JS ≤ 50KB/페이지(islands 제외), 이미지 `astro:assets` 최적화, 폰트 서브셋+`font-display:swap`.
6. CI (Phase 0 승인 즉시 선행 구축 — stacked PR 전제조건):
   `.github/workflows/ci.yml` (PR+main): `bun run check` · `bunx oxfmt --check .` · `bunx oxlint .` ·
   `bunx vitest run` · `scripts/check-links.mjs` · `scripts/check-schema.mjs` (`astro sync` + Zod 파싱) ·
   `scripts/check-leak.mjs` (frontmatter `visibility!=public`·`raw/`·사내도메인·주민번호 패턴 차단 —
   llm-wiki-template `/publish` 게이트를 CI 스크립트로 이식) · `bun run build-storybook` 그린.
   - 공통 완료 게이트와 1:1 대응 (Phase 1 SPEC §5). CI 그린 없이 PR 머지 금지 (branch protection).

## 3. 종료 게이트

- [ ] CI 7잡 그린 (check / format / lint / test / links / schema / leak-guard + storybook build).
- [ ] RSS·sitemap·404 수동 검증.
- [ ] 검색 Top-3 적중 수동 체크리스트 통과.
- [ ] 구 배포 경로 완전 제거.
