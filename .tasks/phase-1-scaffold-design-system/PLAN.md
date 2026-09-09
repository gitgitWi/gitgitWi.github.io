# Phase 1 PLAN — Scaffold + Design System + Home/Tags + 배포

## 순서
1. 스캐폴드 (별도 브랜치 `feat/phase-1-scaffold`):
   - 기존 Next 잔재는 삭제하지 않고 `legacy-next/`로 이동 보관 (Phase 2 이식 완료 후 삭제) — 이력 보존 + 빌드 충돌 방지.
   - yarn classic 잔재 제거: `.yarn/`, `.yarnrc`, `yarn.lock` 삭제 + `.gitignore` 정리.
   - `bun create astro@latest . -- --template minimal --typescript strict` 상당 수동 구성:
     `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/check` + `sharp`
     + `oxfmt` + `oxlint` (전부 `bun add`). `bun install` → `bun.lock` 커밋.
   - `astro.config.mjs`: `output:'static'`, `site:'https://gitgitwi.github.io'`, `integrations:[mdx()]`,
     `vite:{plugins:[stylex.vite({useCSSLayers:true, runtimeInjection:false})]}`.
   - `package.json` scripts는 `bun run` 기준 (`dev: astro dev`, `build: astro build`, `check: astro check`).
     husky pre-commit의 `npx` → `bunx oxfmt --check .` + `bunx oxlint .`.
2. StyleX 디자인시스템 (공유 코드 스타일 §1–7 준수 — guard 우선, 중첩 ≤2, arrow 기본, 3+인자 object, `undefined` 우선):
   - `src/styles/tokens.stylex.ts`: `defineVars({color:{paper,ink,muted,hairline,accent,accentInk}, space, fontSize, radius, lineHeight})`.
   - `src/styles/themes.ts`: `createTheme` 자리만 (paper/sage/clay/ink — 실값은 Phase 2).
   - primitives: `Text, Heading, Stack, Cluster, Card, Tag, Divider, Prose, Container` (`.astro` + `.stylex.ts` 동거,
     variant prop 계약, `styled()`식 외부 재오픈 금지 — Linear 교훈). **각 컴포넌트마다 `*.stories.ts` 동반 작성**
     (SPEC §4 Storybook — `bun run storybook` :6006 로컬 확인이 완료 게이트).
   - patterns: `SiteHeader, SiteFooter, TagList, ColorwayShell`.
   - `@stylexjs/eslint-plugin` 설정 (`valid-styles:error`, `no-unused:error`) — oxlint와 별도 StyleX 패스.
3. 페이지: `src/pages/index.astro` (Hero+최근글+태그클라우드 — Phase 2 데이터 연동 전 목업),
   `src/pages/tags/index.astro`, `src/pages/tags/[tag].astro` (껍데기).
   `src/layouts/Base.astro` (head/meta/폰트) + `Page.astro`.
4. 배포 교체: `.github/workflows/deploy.yml`를 `withastro/action@v6` + `actions/deploy-pages@v4`로 교체
   (트리거 `main`, `oven-sh/setup-bun@v2`로 bun 설치 → `bun install` → `bun run build` → `dist` 업로드 → deploy).
   Settings → Pages Source=GitHub Actions로 변경.
   기존 `JamesIves/...@4.1.4` + Node14 매트릭스 삭제.
5. 검증: `bun run check && bun run build`, Lighthouse (Home/Tags), oxlint, 런타임 CSS 주입 0 확인
   (`dist` 내 stylex 런타임 스크립트 부재). StyleX CSS는 `dist/assets/stylex.css` — Astro는 Vite `transformIndexHtml`을 안 타므로 `Base.astro`에서 명시 연결.

## 파일 스켈레톤
`astro.config.mjs, src/{layouts,pages,components/ui,styles}, .github/workflows/deploy.yml, AGENTS.md` 업데이트.

## Phase 0 StyleX 스파이크 (2026-09-09, `/tmp/stylex-spike`, 본 repo 미오염)

- Astro **7.3.2** (create-astro minimal) + `@stylexjs/{stylex,unplugin,eslint-plugin}@0.19.0`
- `stylex.vite({ useCSSLayers: true, runtimeInjection: false })` → `bun run build` 그린
- 산출: `dist/assets/stylex.css` (`@layer priority1..3`, atomic class `xdhsmyj` …). HTML 버튼 class는 추출됨, **런타임 스크립트 0**
- 구멍: 정적 HTML에 stylesheet link가 없음. Phase 1 `Base.astro`에서 CSS 연결 필수
- `bun add sharp@0.35.4` 후 재빌드 그린 (이미지 변환은 미사용, 설치·빌드만 실증)

CSS 샘플:

```css
@layer priority1 {
  :root, .xibpiy1 {
    --x13fv976: #fafaf8;
    --xk3gggj: #1a1a18;
  }
}
@layer priority3 {
  .xdhsmyj { background-color: var(--x13fv976); }
}
```

## 승인 요청
- [ ] `legacy-next/` 임시보관 전략 동의?
- [ ] light 단일테마 출발 동의? (다크는 Phase 4 이후)
