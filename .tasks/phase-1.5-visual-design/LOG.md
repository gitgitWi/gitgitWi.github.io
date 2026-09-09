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
