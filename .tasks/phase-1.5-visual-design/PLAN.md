# Phase 1.5 PLAN — Visual design 적용

> 상태: SPEC 대응 초안. 브랜치 `feat/phase-1.5-visual`, **base = `feat/phase-1-scaffold`**.

정본: [`docs/conventions/design.md`](../../docs/conventions/design.md).
목업: [`.tasks/visual-concept-by-gpt-09-10.png`](../visual-concept-by-gpt-09-10.png).

## 순서

1. **토큰** — `src/styles/tokens.stylex.ts`를 design.md §3·6·7로 교체 (canvas, surface, ink, accent `#16A36A`, space 4px, radius). Phase 1 `#3F6B5A` / `#FAFAF8` 제거. 컴포넌트가 시맨틱 토큰만 쓰게 맞춤.
   - 수용: `bun run check` 그린, Storybook에서 paper가 `#F7F5EE`에 가깝다.
2. **폰트** — Pretendard 또는 Noto Sans KR, Geist Mono. 디스플레이는 라이선스 확인 후 1개만(히어로·기사 제목). `Base.astro`에서 로드. 본문·nav에 손글씨 금지.
3. **Prism** — `bun add @astrojs/prism prismjs`. `astro.config.mjs` `markdown: { syntaxHighlight: 'prism' }`. `src/styles/prism-vitesse-light.css` (design.md §11 토큰). `Base.astro`에서 import. `src/components/content/CodeBlock` (lang, copy). 다크 테마 CSS 없음.
   - 수용: 빌드 HTML에 `class="language-*"`, `pre` 배경이 `#F1EFE6` 근처. `grep -l okaidia` 없음.
4. **Home** — 컨셉 01: 작은 라벨, 손글씨 문장, 짧은 소개, CTA, 반대편 장식(WebGL island 또는 CSS 폴백). 최신글은 리스트(날짜·제목·요약·태그). `prefers-reduced-motion`이면 정적 민트 형태만.
5. **목업 기사·위키** — `src/pages/articles/mock.astro`, `src/pages/til/mock.astro` (Phase 2 라우트와 맞출 이름). 기사: 메타 + 손글씨 제목 + 본문 폭 `--reading-max` + 우측 TOC(데스크탑) + Prism 예시 + Tip callout. 위키: 좌측 가벼운 사이드바 + 본문. Collections 없음.
6. **스토리** — 토큰·CodeBlock·Header·PostCard 갱신. `bun run build-storybook`.
7. **게이트** — `check` / oxfmt / oxlint / vitest / build / Lighthouse Home+mock article / 런타임 JS 스타일 주입 0.
8. **draft PR** — `--base feat/phase-1-scaffold --assignee @me --label phase-1.5 --label astro --label conventions`. 머지는 사람. Phase 1(#56)이 먼저 머지돼야 디프가 맞다.

## 검증

- Prism: mock 페이지 소스에 `token keyword` 등이 있고, 스크린샷에서 코드 블록이 베이지다 (차콜 아님).
- `bunx oxfmt --check .` · `bunx oxlint .` 그린.

## 승인 요청

- [ ] 다크 코드 블록을 버리고 Prism Vitesse Light 계열로 가는 것 동의?
- [ ] 실 콘텐츠 없이 mock article/wiki로 레이아웃을 먼저 고정하는 것 동의? (Phase 2에서 교체)
