# Phase 2 — Content Routes + MDX 마이그레이션

> 상태: SPEC+PLAN 작성됨 / 승인 대기.

## 1. 배경
껍데기가 서면 진짜 콘텐츠를 얹는다. 기존 6개 MD/MDX + `llm-wiki-template/wiki` 선별분을
Astro Content Collections로 정규화하고, articles(자유)와 til(통일)을 서로 다른 렌더 계약으로 제공한다.

## 2. 목표
1. Collections (`src/content/config.ts`, Zod):
   - `articles`: `title, description, pubDate, updatedDate?, tags[], draft?, theme{colorway, layout, density}, cover?`
   - `til` (=wiki): `title, summary, pubDate, updatedDate?, tags[], domains[]?, visibility='public', quizRefs?`
   - 공통 remark: `remark-gfm`, `remark-smartypants`; rehype: `rehype-slug`, `rehype-autolink-headings`, `rehype-external-links`.
2. 라우트: `/articles`, `/articles/[...slug]`, `/til`, `/til/[...slug]`, `/tags/[tag]` 실데이터 연결.
3. `ArticleLayout` (가변): `colorway` (예: `paper/sage/clay/ink`) × `layout` (`essay/gallery/docs`) 조합.
   frontmatter 선언 → 토큰 오버라이드(`createTheme`) + 슬롯 순서 변경. MDX 안에서 primitives 자유 조립 가능.
4. `WikiLayout` (통일): 고정 헤더(제목·요약·메타·목차· prev/next) + `Prose` 단일 타이포 스케일. 변형 금지.
5. 마이그레이션 매핑 (현 `pages/` → `src/content/`):
   - `posts/hello.mdx` → `articles/hello` · `posts/design-system/01.md` → `articles/design-system/01`
   - `posts/from-jekyll-to-nextjs-mdx/00.mdx` → `articles/from-jekyll-to-nextjs/00`
   - `posts/til/**` → `til/**` · `study/refactoring-javascript/01.mdx` → `til/refactoring-javascript/01`
   - `@/components` 임포트 제거 → Astro components 매핑. `TitleTexts`는 `Heading` primitive로 대체.
   - `llm-wiki-template/wiki/{digests,concepts,entities,synthesis}` 중 공개 가능분 선별 → `til/` (visibility 검수).
6. 리다이렉트: 구 Next 경로(`/posts/*`, `/study/*`) → 신 경로 매핑표 + `public/_redirects` 불가(GH Pages)하므로
   구 경로별 `src/pages/posts/...` shim 또는 404 안내 중 택1 (PLAN에서 결정).

## 3. 비목표
- quiz UI (Phase 3). 검색 인덱스 (Phase 4).

## 4. 종료 게이트
- [ ] 기존글 6개 100% 렌더, 깨진 링크/이미지 0 (`astro check` + 링크 스크립트).
- [ ] 콜렉션 스키마 위반 0 (`astro sync` 그린).
- [ ] articles colorway ≥ 2 + layout ≥ 2 실제 데모 페이지 존재.
- [ ] `draft:true`는 프로덕션 빌드 미포함.
