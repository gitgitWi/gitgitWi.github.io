# Phase 1.5 LOG

- Harness: cursor
- Started: 2026-09-10
- Status: 승인됨 (2026-09-10). Prism 라이트 + mock 레이아웃 + Home-only `three`.

## Notes

- 컨셉 PNG와 `docs/conventions/design.md`를 대조해 코드 블록만 라이트 Prism으로 뒤집음.
- 스택: `feat/phase-1-scaffold` ← `feat/phase-1.5-visual`.
- Three.js: 설치함. 전 페이지가 아니라 Home 히어로만. 폴백·reduced-motion 필수.

## 2026-09-10 implementer

- 토큰: canvas `#F7F5EE`, accent `#16A36A`, 4px space·radius design.md §3·6·7.
- 폰트: Pretendard·Geist Mono·Caveat(OFL) fontsource self-host, Base.astro.
- Prism: `@astrojs/prism`, `prism-vitesse-light.css`, CodeBlock lang+copy.
- HeroVisual: vanilla three dynamic import, SVG 폴백, 768px/reduced-motion skip.
- 페이지: Home 컨셉 01, `/articles/mock`, `/til/mock`.
- 게이트: check·oxfmt·oxlint·vitest·lint:stylex·build·build-storybook green.
- BLOCKED: Lighthouse a11y ≥95 — cloud 환경 CHROME_INTERSTITIAL_ERROR.
- Draft PR: #58

## 2026-09-10 REVIEW CHANGES

- Sol `gpt-5.6-sol-medium`: `REVIEW CHANGES phase-1.5 58`. usage: not visible.
- 지적: Lighthouse 미측정, HeroVisual 인라인 observer, Pretendard Latin-only, primary 버튼 surface-on-accent ~3.1:1.

## 2026-09-10 CHANGES 반영 (parent, implementer 세션 종료 후)

- Preact `@astrojs/preact` + Home `HeroCanvas` `client:visible={{ rootMargin: '100px' }}`. SVG 폴백은 `.astro`.
- `@fontsource/noto-sans-kr` korean 400/500/600.
- primary: canvas on `accentInk`. `inkTertiary` `#555B56`. Prism comment/string/function AA.
- Copy 버튼 visible name과 aria-label 불일치 제거.
- 게이트 HEAD `e09393b`:
  - `bun run check` — 80 files, 0 errors
  - `bunx oxfmt --check .` — green
  - `bunx oxlint .` — green
  - `bunx vitest run` — 4 passed (1 file)
  - `bun run lint:stylex` — green
  - `bun run build` — 9 pages
  - `bun run build-storybook` — green
  - Lighthouse a11y (preview `:4321`, desktop): Home **100**, `/articles/mock` **100**
