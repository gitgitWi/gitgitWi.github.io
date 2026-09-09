# Phase 2 PLAN — Content Routes + MDX 마이그레이션

## 순서

1. `src/content.config.ts` (Astro v6+ Content Layer, Zod + `glob` loader):
   `articles` / `til` 콜렉션 정의 (SPEC §2.1 필드). `astro sync` 그린 확인.
2. 라우트: `articles/index, articles/[...slug], til/index, til/[...slug], tags/[tag]` 실데이터 연결
   (`getCollection` + pubDate desc 정렬 + draft 필터 + 태그 역인덱스).
3. 레이아웃:
   - `ArticleLayout.astro`: `theme{colorway,layout}` 분기 → `createTheme` 오버라이드 + 슬롯 순서 변경
     (`essay`: Prose 중앙 / `gallery`: 커버 그리드 상단 / `docs`: 좌 TOC).
   - `WikiLayout.astro`: 고정 구조 (제목·요약·메타·TOC·본문·prev/next·quizRefs 링크). 변형 prop 없음.
   - MDX 매핑: `components` prop으로 `a→SmartLink, pre→CodeBlock, table→TableCard` 주입.
4. 콘텐츠 이식 (파일별):
   1. `pages/posts/hello.mdx` → `src/content/articles/hello.mdx` (+frontmatter 신규).
   2. `pages/posts/design-system/01.md` → `articles/design-system/01.md` (이미지 외부 URL 유지).
   3. `pages/posts/from-jekyll-to-nextjs-mdx/00.mdx` → `articles/from-jekyll-to-nextjs/00.mdx`
      (`@/components` 임포트 → `Heading` 교체).
   4. `pages/posts/til/tdd/fullstack-tdd-by-newbie.mdx` → `til/tdd/fullstack-tdd-by-newbie.mdx`.
   5. `pages/posts/til/ts/enum-to-template-literal.mdx` → `til/ts/enum-to-template-literal.mdx`.
   6. `pages/study/refactoring-javascript/01.mdx` → `til/refactoring-javascript/01.mdx`.
   7. `llm-wiki-template/wiki/{digests,concepts,entities,synthesis}` 목록화 → 공개안전检수(회사정보·개인정보·저작권) →
      통과분만 `til/`로 (출처 표기 유지). `raw/notes`는 이식 금지.
5. 구경로: `src/pages/posts/[...slug].astro` + `src/pages/study/[...slug].astro` shim에서 신 경로로
   `<meta http-equiv=refresh>` + canonical (GH Pages는 서버 리다이렉트 불가). 매핑표 `public/redirects.json` 동봉.
6. 검증: `astro check`, 링크 검사 스크립트 (`scripts/check-links.mjs` — 내부 링크/앵커/이미지),
   colorway×layout 데모 4페이지 캡처, draft 제외 확인 (`grep draft dist`).

## 승인 요청

- [ ] 구경로 shim 방식 동의? (vs 404 안내)
- [ ] llm-wiki 선별 기준(공개안전) 동의?
