# GitHub Blog 전면 개편 — ROADMAP

> Jekyll → (중단된 Next.js 12 시도) → **Astro 기반**으로 전면 개편.
> `master` → `main` 전환 포함. 이 문서는 전체 로드맵 + Phase별 목표/지표(게이트)를 정의한다.
> 각 Phase 폴더의 `SPEC.md` (무엇을) + `PLAN.md` (어떻게/순서)를 검토·승인받은 뒤에만 구현 착수.

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
> 버전은 `ROADMAP`이 아닌 각 Phase `PLAN.md`에 핀한다.

## 정보구조 (1차 범위)

- `/` 홈페이지 · `/articles` + `/articles/[...slug]` · `/til` + `/til/[...slug]` (=wiki, 동일 템플릿) · `/tags` + `/tags/[tag]`
- 고도화: `/wiki/quiz` — flash cards, 랜덤 객관식/주관식 (Phase 3, islands)
- `articles`: 페이지별 자유 구성 — frontmatter(`theme`, `layout`, `colorway`, `components`)로 컬러셋·레이아웃 분기, MDX 안에서 자유 조립
- `til`/`wiki`: 단일 `WikiLayout` + 단일 스키마로 통일감
- 스타일: minimalism + light theme + "적당한 고급스러움" (타이포·여백·헤어라인·절제된 액센트)
- UI: 재활용 가능한 design-system 컴포넌트, **StyleX** 기반 (`tokens → primitives → patterns`)

## 코드 스타일 (전 Phase 공통)

출처: `~/Codes/works@est/est-work/wiki/conventions/shared-code-style.md` (정본, 7건).
`AGENTS.md`에 아래 마커 블록을 verbatim 삽입하고, 제품 레포 규칙은 마커 밖에 둔다:

- **마커 안 (공통, 수정 금지)**: early return/guard 우선 · 중첩 최대 2레벨 초과 시 named helper 추출 ·
  arrow function 기본 (`function`은 React 컴포넌트·generator만) · 3+ 인자는 단일 object + named type ·
  `undefined` 우선 (`null`은 서드파티 API 강제 시만) · `for` 대신 array methods (순차 `await`·개별 cleanup 예외) ·
  리터럴 타입에 `as const`.
- **마커 밖 (본 블로그 전용 델타)**:
  - Timers: `window.setTimeout/clearTimeout` (`number` 반환, web 규칙).
  - Barrel exports: 사용 — `index.ts` per-feature re-export (web 규칙). 단 UI 패키지 공개경계는 추후 확정.
  - Astro 컴포넌트: `---` fence 안 로직도 동일 규칙 (guard 우선, helper 추출).
- **언어 규칙 (마커 밖)**: LLM 문서(영어) ⟷ 커밋·PR·이슈·코드주석(한국어) ⟷ 테스트 타이틀(한국어, `describe`=심볼명).
  본 `.tasks/*.md`는 협업 문서이므로 한국어 유지 + 코드 식별자는 원문.

## Phase 개요

| Phase | 이름 | 목표 | 종료 게이트(지표) |
|---|---|---|---|
| 0 | Foundation: 브랜치·툴체인·지식기반 | `main` 전환, Node 22 + **bun** 고정 (yarn classic 잔재 제거), Astro Docs MCP + Astro 스킬 1개 + StyleX ESLint 룰 확정, StyleX 스파이크(o) | `main`이 default, `bun run dev`+StyleX 샘플 빌드 그린, 스킬 목록 `SPEC`에 핀 |
| 1 | Scaffold + Design System + Home/Tags 껍데기 + 배포 | Astro v7 스캐폴드(static), StyleX 토큰/프리미티브, Home·Tags 라우트, GH Pages Actions 배포 | `main` 푸시→Pages 자동배포, Lighthouse perf≥90·a11y≥95, 스타일런타임 주입 0 |
| 2 | Content Routes + MDX 마이그레이션 | `articles`(가변 테마) + `til`(통일) + `tags/[tag]`, Content Collections(Zod), 기존 6개 + `llm-wiki-template/wiki` 선별 이식 | 기존글 100% 렌더(깨진 링크 0), 스키마 위반 0, articles≥2 colorway 데모 |
| 3 | Wiki Quiz (flash cards) | 랜덤 객관식/주관식, 덱·세션·채점·localStorage 진척, island로 SSG 무해화 | 퀴즈 20문항 시드, 키보드 조작·채점 단위테스트 그린 |
| 4 | Hardening + 운영 | Pagefind 검색, SEO/RSS/OG/sitemap, 404, CI 가드(lint·link·schema·공개안전), 구 `gh-pages` 정리 | 검색 Top-3 적중 수동체크, CI 그린, 구배포 경로 제거 |

의존성: 0 → 1 → 2 → 3 → 4 순차. 3·4는 2 승인 후 병렬 검토 가능.

## 브랜치 전략 (stacked PR)

- Phase 0에서 `master`→`main` (이력 유지 rename, GitHub default 전환, Pages 소스 재지정, `deploy.yml`의 `branches:[master]` 제거가 Phase 1에서).
- Phase별 스택 (base 체인, 아래→위 순서로 머지):
  `main` ← `feat/ci-gates` ← `feat/phase-0-foundation` ← `feat/phase-1-scaffold` ← `feat/phase-2-content` ←
  `feat/phase-3-quiz` ← `feat/phase-4-hardening`
  - 생성: `gh pr create --base <parent-branch>` 로 스택. CI는 PR마다 자동 실행 (CI 선행 머지 후).
  - 머지는 아래부터 순서대로 (GitHub "Merge" + base 자동전환 확인). `gh` 2.100.0 설치 확인됨.
  - 본 로드맵 문서 작업(`.tasks/`, `AGENTS.md`)은 스택 밖 — 별도 `docs/tasks-setup` PR 또는 Phase 0에 포함 (승인 시 결정).
- Subagents (Cline CLI + Herdr, **no Paseo**, **no opencode-go models**): orchestrator = current session.
  leader/planner: `cline --auto-approve true -m cline-free/muse-spark-1.3-contributor --thinking xhigh` ·
  developer: `cline --auto-approve true -m z-ai/glm-5.3-flash` (both verified live 2026-09-10).
  Roles/protocols: `.tasks/playbook/{orchestrator,leader,planner,developer}.md`.
  Flow: leader tracks → planner refines PLAN + reviews → developer implements + stacked PR → human merges.
  Herdr workspaces per phase; `pane run cline …` then `herdr agent start/prompt/wait` (skill: `herdr`).

## 승인 플로우

1. `.tasks/ROADMAP.md` + 각 `phase-N/SPEC.md` + `PLAN.md` 생성 (본 작업).
2. 사용자가 Phase별 승인 (코멘트 or 체크).
3. 승인된 Phase만 구현 착수. 무승인 착수 금지.
