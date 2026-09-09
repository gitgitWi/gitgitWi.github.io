# Astro 마이그레이션 리서치 (배경 · 스킬/플러그인 판정 · 판단 근거)

> ROADMAP의 근거 문서. 사람·에이전트 공용. 최종 결정만 보고 싶으면 하단 [판단 요약](#판단-요약) 참조.
> 실측일: 2026-09-09/10.

## 현 상태 (2026-09-09 실측)

- 브랜치: `master` (default), `gh-pages` 배포용 잔존. Next.js 12 + React 17 + SCSS (`@next/mdx` 11계) — 4년 방치.
- 콘텐츠: `pages/` 아래 MD/MDX 6개 (`posts/hello`, `posts/design-system/01`, `posts/from-jekyll-to-nextjs-mdx/00`,
  `posts/til/tdd/*`, `posts/til/ts/*`, `study/refactoring-javascript/01`) + `index.tsx` 최소 홈.
- 배포: `.github/workflows/deploy.yml` — Node 14, `yarn build && next export` → `gh-pages` 브랜치 푸시 (전면 교체 대상).
- 참조: `gitgitWi/llm-wiki-template` — `raw/`(읽기전용 원본) / `notes/`(제안만) / `wiki/`(LLM 자유쓰기: `index/digests/concepts/entities/synthesis/meta`)
  + `tools/article_archive` + `/ingest /query /lint /publish` 커맨드. Phase 1에서 Astro+Pagefind+그래프뷰를 예고했으나 웹앱 미구현.

## 리서치 결론 (Agent skill / plugin)

| 후보 | 내용 | 판정 |
|---|---|---|
| **Astro Docs MCP** (`https://mcp.docs.astro.build/mcp`, Streamable HTTP) | 최신 Astro 문서 실시간 조회. `claude mcp add --transport http astro-docs …` / Codex·Cursor·VSCode 모두 지원. 에이전트의 구버전 API 환각 방지 | **채택 (Phase 0)** — Cline/MCP 설정 + `AGENTS.md`에 강제 참조 규칙 |
| `spillwavesolutions/publishing-astro-websites-agentic-skill` | SSG·Content Collections·MDX·배포 커버 종합 스킬 | **채택 검토 1순위** — Phase 0에서 평가 후 `.agents/skills/` 미러 또는 서브모듈 |
| `incluud/astro-agent-skills` | Astro 패턴·워크플로우 모음, Codex/Cursor/Claude 호환 | **차순위** — 위 스킬과 중복 비교 후 하나만 |
| Sungho Park `astro-agent-skill` (자blog 실전) | "에이전트가 Astro 코드를 반복적으로 틀리게 짠다" 문제의식에서 만든 스킬 | 참고 — 프로젝트 룰(`AGENTS.md`)에 anti-pattern 섹션으로 흡수 |
| Astro v6 Upgrade Skill (mcpmarket) | Content Layer·Zod 스키마 마이그레이션 특화 | 불필요 (신규 스캐폴드라 fresh install) |
| StyleX 공식 (`@stylexjs/unplugin` + `@stylexjs/eslint-plugin` + PostCSS) | Vite 네이티브 지원. Astro는 Vite 기반이라 `astro.config.mjs > vite.plugins`에 `stylex.vite()` 주입이 정석 | **채택 (Phase 1)** — `useCSSLayers: true`, `dev`/`runtimeInjection:false` |
| `firecrawl-developer-index` (보유) / `use-tinyfish` (보유) | 이슈·PR·문서 1차소스 검색 / 라이브 웹 리서치 | 구현 중 오류·API 규격 확인할 때 사용. 상시 스킬 아님 |
| Linear StyleX 글 교훈 | 빌드타임 추출(20–35% 메인스레드 절감), `styled(Button)`식 외부 재오픈 금지→명시적 스타일 계약, deterministic merge, ESLint로 강제 | 디자인시스템 원칙으로 직접 반영 (Phase 1 SPEC) |

> 설치형 플러그인(에디터 마켓플레이스)은 고정하지 않는다. 대신 **(1) Astro Docs MCP + (2) Astro 스킬 1개 + (3) StyleX ESLint**를 Phase 0 산출물로 고정하고,
> 버전은 각 Phase `PLAN.md`에 핀한다.

## 판단 요약

- **Astro + Content Collections + static 출력**: 대부분 MDX 정적 페이지라 Astro 선택. 근거: Astro Docs 마이그레이션 가이드, `withastro/action` bun 자동감지.
- **pm = bun 1.4.2** (yarn classic 1.22.17 잔재 제거). 상세 검토표: `.tasks/phase-0-foundation/SPEC.md` §7.
  Node 22 병행 유지 (Astro 요구 ≥22.12). ⚠️ sharp/Bun 이슈 가능성은 Phase 1 스파이크에서 실증.
- **Storybook = community `@storybook-astro/framework`** (공식 미지원). 로컬 확인용, 배포 없음.
  블로그 내 `/components` 공개는 전 Phase 완료 후 별도 이슈. 근거: Phase 1 SPEC §4.
- **Subagents = Cline CLI + Herdr (Paseo 미사용)**. 모델·spawn 커맨드는 실측 검증됨
  (`.tasks/playbook/orchestrator.md`): leader/planner = `cline-free/muse-spark-1.3-contributor --thinking xhigh`,
  developer = `z-ai/glm-5.3-flash`.
- **CI 선행 + stacked PR**: `feat/ci-gates`를 스택 최하단으로 먼저 머지 후 Phase별 PR에 CI 자동 실행.
