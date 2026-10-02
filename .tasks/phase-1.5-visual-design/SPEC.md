# Phase 1.5 — Visual design 적용

> 상태: 진행 중 (2026-09-10 승인). 브랜치 `feat/phase-1.5-visual`, base `feat/phase-1-scaffold`.

## 1. 배경

Phase 1은 스캐폴드·토큰 자리·Home/Tags 껍데기까지다. 토큰은 아직 paper `#FAFAF8` / sage accent `#3F6B5A`다.

2026-09-10 컨셉 [`.tasks/visual-concept-by-gpt-09-10.png`](../visual-concept-by-gpt-09-10.png)과 계약 [`docs/conventions/design.md`](../../docs/conventions/design.md)이 생긴다. 콘텐츠 이식(Phase 2) 전에 **보이는 페이지를 이 계약에 맞춘다.**

검토 결론 (구현은 계약 파일):

- 따뜻한 베이지 캔버스 + 민트 액센트 + 손글씨 디스플레이(희소) + Geist Mono — 컨셉과 문서가 같다.
- 컨셉 목업 헥스(`#FBF6EF`, `#10B981`, 카드 `#FFF`)는 Tailwind에 가깝다. 구현은 design.md (`#F7F5EE`, `#16A36A`, surface `#FCFBF7`).
- 컨셉·초안 design.md의 **다크 코드 블록은 버린다.** Prism.js + Vitesse Light 계열, 배경은 캔버스에 한 단계만 낮춘 `#F1EFE6`, 키워드는 액센트.

## 2. 목표

1. StyleX 시맨틱 토큰을 `docs/conventions/design.md` §3·§6·§7에 맞춘다. Phase 1 자리 토큰을 덮어쓴다.
2. 타이포: Pretendard/Noto Sans KR 본문, Geist Mono 코드·메타, 디스플레이 손글씨(히어로·기사 제목만).
3. Home을 컨셉 01에 가깝게: 손글씨 히어로, CTA, 최신글은 에디토리얼 리스트.
   **`three`를 이 Phase에서 설치**한다. Home 히어로만 `client:visible` island. 정적 SVG/CSS 폴백 필수. `prefers-reduced-motion`·좁은 뷰포트에서는 WebGL을 올리지 않는다. 기사·위키 페이지에는 Three를 넣지 않는다.
4. 목업 기사(`/articles/mock`)와 위키(`/til/mock` 또는 `/wiki/mock`): 우측 TOC / 좌측 사이드바, Callout, **Prism 코드 블록**. 실 Collections는 Phase 2.
5. 코드: `markdown.syntaxHighlight: 'prism'`, `@astrojs/prism`, `src/styles/prism-vitesse-light.css`를 `Base.astro`에서 로드. 다크 Prism 테마 금지.
6. 해당 UI `*.stories.ts` 갱신.

## 3. 비목표

- MDX 6편 이식, Collections, `colorway` 다중 테마 (Phase 2).
- Quiz, Pagefind, 다크모드.
- Three.js를 전 페이지·기사 본문 뒤에 깔기. Home 히어로 외 씬은 Phase 2+ 기사 단위.

## 4. 산출물

- 갱신된 `src/styles/tokens.stylex.ts`, `prism-vitesse-light.css`, `CodeBlock` (+ copy).
- `three` + Home `HeroVisual` island (폴백 포함).
- Home / mock article / mock wiki가 컨셉 레이아웃을 따른다.
- Storybook 스토리 갱신.

## 5. 종료 게이트

- [ ] `bun run check` · `bunx oxfmt --check .` · `bunx oxlint .` · `bunx vitest run` 그린.
- [ ] `bun run build` 그린. 런타임 스타일 주입 0. Prism 클래스가 HTML에 있고, 코드 `pre` 배경이 다크(`#171A18` 등)가 아님.
- [ ] Home·mock article Lighthouse a11y ≥ 95. `prefers-reduced-motion`에서 WebGL 미로드.
- [ ] `bun run build-storybook` 그린.
- [ ] 본문 대비: canvas 위 ink가 WCAG AA.

## 6. 리스크

- 웹폰트 + WebGL이 Lighthouse perf를 깎음 → 서브셋, lazy island, 모바일에서 WebGL 생략.
- Gmarket Sans 라이선스: 컨셉에만 등장. 구현은 라이선스 확인된 디스플레이 페이스(또는 시스템 손글씨 폴백).
