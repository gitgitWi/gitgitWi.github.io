# Phase 1 — Scaffold + Design System + Home/Tags + 배포

> 상태: SPEC+PLAN 작성됨 / 승인 대기.

## 1. 배경

Phase 0에서 툴체인이 고정되면, Next.js 잔재를 걷어내고 Astro static 스캐폴드 + StyleX 디자인시스템 +
1차 경로(Home, Tags) + GH Pages 배포를 한 번에 세운다.

## 2. 목표

1. Astro v7 (MCP 기준 최신) 스캐폴드: `output: 'static'`, `site: https://gitgitwi.github.io`, TS strict.
   - `base` 불필요 (유저 사이트 `*.github.io` 루트). CNAME 사용 시에도 루트 유지.
2. StyleX: `@stylexjs/unplugin` → `astro.config.mjs > vite.plugins`, `useCSSLayers: true`,
   `runtimeInjection: false`, `@stylexjs/eslint-plugin` (`valid-styles`, `no-unused` error).
   - 구조: `src/styles/tokens.stylex.ts` (`defineVars`: color/space/type/radius) →
     `src/components/ui/*` primitives (Text/Heading/Stack/Card/Tag/Divider/Prose) →
     patterns (SiteHeader/SiteFooter/TagList). Linear 교훈: 외부에서 재오픈 금지, 변형은 `variant` prop 계약으로만.
3. 라우트: `/` (Home: 소개+최근글+태그클라우드), `/tags`, `/tags/[tag]` (Phase 2에서 실데이터 연결, 1단계는 껍데기+목업).
4. 배포: `.github/workflows/deploy.yml` 교체 — `withastro/action` + `actions/deploy-pages` (Pages Sources=Actions).
   기존 `JamesIves/github-pages-deploy-action@4.1.4` + `gh-pages` 브랜치 푸시 제거.
5. 스타일: light minimalism — paper `#FAFAF8~#FFFFFF`, ink `#1A1A18`, hairline `#E8E6E1`, 단일 액센트.
   다크모드 Phase 4 이후 (토큰은 `createTheme` 확장 가능하게).

## 3. 비목표

- articles/til 본문 렌더 (Phase 2). quiz (Phase 3). 검색 (Phase 4).

## 4. 산출물

- `astro.config.mjs`, `src/{pages,layouts,components/ui,styles}`, 새 `deploy.yml`.
- Storybook (`storybook` + `@storybook/builder-vite` + `@storybook-astro/framework`, community):
  UI 컴포넌트마다 `*.stories.ts` 동반. 로컬 확인용 (`bun run storybook`, `:6006`).
  - `.astro` 컴포넌트는 Container API 경유 SSR 렌더 (dev에선 Controls 완전 동작, static build에선 사전렌더라 Controls 제한 — 로컬 dev 사용이 원칙).
  - 배포는 하지 않음 (당장은 local only). 블로그 내 `/components` 공개 페이지는 전 Phase 완료 후 별도 이슈로 (SSG 사전렌더 정적 스냅샷 방식 검토).
  - React/Preact island 컴포넌트(quiz 등)는 각 프레임워크 renderer로 동일 Storybook에서 프리뷰.

## 5. 종료 게이트 (공통 완료 게이트 — 전 Phase 동일 적용)

- [ ] `bun run check` (tsc + `astro check`) 그린.
- [ ] `bunx oxfmt --check .` 그린 (formatter).
- [ ] `bunx oxlint .` 그린 (linter). StyleX `valid-styles`는 `@stylexjs/eslint-plugin`을 별도 패스로 유지 (oxlint JS plugin은 alpha).
- [ ] `bunx vitest run` 그린 (해당 Phase 테스트; 테스트 없을 시 `--passWithNoTests`, 단 Phase 3는 필수).
- [ ] `main` 푸시 → Pages 자동배포 그린 (수동 `gh-pages` 푸시 없음).
- [ ] Lighthouse perf ≥ 90, a11y ≥ 95 (Home/Tags).
- [ ] 런타임 스타일 주입 0 (빌드 CSS만 존재).
- [ ] Storybook: 전 UI 컴포넌트 stories 존재 + `bun run build-storybook` 그린 (배포 제외, local 확인용).
