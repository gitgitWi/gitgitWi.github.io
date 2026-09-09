# Phase 2 LOG

- Harness: cursor
- Started: 2026-09-10
- Status: PR-DRAFT #59
- Base: `feat/phase-1.5-visual` (#58)

## Notes

- 콘텐츠 원본: `legacy-next/pages/posts/**`, `legacy-next/pages/study/**`.
- `llm-wiki-template` clone(`/tmp/llm-wiki-template`) 확인 — wiki 페이지 21개 존재하나 공개안전 선별·frontmatter 매핑 작업량 대비 Phase 2 게이트(6편) 충족으로 **이식 생략**. 후속 PR 가능.
- StyleX `@stylexjs/babel-plugin` 0.19: `createThemeNested`에 비어 있지 않은 오버라이드 객체를 넣으면 빌드 실패. **대안**: `tokens.color.mintCanvas` 등 팔레트 토큰 + `ColorwayShell`/`ArticleLayout` variant style로 colorway 시각 차등 (mint vs canvas 확인 가능).
- `hello.mdx`는 `draft: true` — PROD 빌드 `dist/articles/hello` 없음 확인.
- articles colorway: clay(design-system), mint(hello draft/dev), canvas(from-jekyll). layout: docs, gallery, essay 각 1편 이상.

## Gates (HEAD 84f7576)

- `bun run check` — 0 errors
- `bunx oxfmt --check .` — OK
- `bunx oxlint .` — OK
- `bunx vitest run` — 8 passed
- `bun run lint:stylex` — OK
- `bun run build` — 33 pages
- `bun run build-storybook` — OK
- `bun run check-links` — 33 html OK
