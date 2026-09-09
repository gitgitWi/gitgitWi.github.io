# GitHub Blog 전면 개편 — ROADMAP

> Jekyll → (중단된 Next.js 12 시도) → **Astro 기반**으로 전면 개편.
> `master` → `main` 전환 포함. 이 문서는 전체 로드맵 + Phase별 목표/지표(게이트)를 정의한다.
> 각 Phase 폴더의 `SPEC.md` (무엇을) + `PLAN.md` (어떻게/순서)를 검토·승인받은 뒤에만 구현 착수.
> 배경·리서치·판단 근거는 [`docs/research/astro-migration.md`](../docs/research/astro-migration.md) 참조.

## Phase 개요

| Phase | 이름 | 목표 | 종료 게이트(지표) | 문서 |
|---|---|---|---|---|
| 0 | Foundation: 브랜치·툴체인·지식기반 | `main` 전환, Node 22 + **bun** 고정 (yarn classic 잔재 제거), Astro Docs MCP + Astro 스킬 1개 + StyleX ESLint 룰 확정, StyleX 스파이크(o) | `main`이 default, `bun run dev`+StyleX 샘플 빌드 그린, 스킬 목록 `SPEC`에 핀 | [SPEC](phase-0-foundation/SPEC.md) · [PLAN](phase-0-foundation/PLAN.md) |
| 1 | Scaffold + Design System + Home/Tags 껍데기 + 배포 | Astro v7 스캐폴드(static), StyleX 토큰/프리미티브, Home·Tags 라우트, GH Pages Actions 배포 | `main` 푸시→Pages 자동배포, Lighthouse perf≥90·a11y≥95, 스타일런타임 주입 0 | [SPEC](phase-1-scaffold-design-system/SPEC.md) · [PLAN](phase-1-scaffold-design-system/PLAN.md) |
| 2 | Content Routes + MDX 마이그레이션 | `articles`(가변 테마) + `til`(통일) + `tags/[tag]`, Content Collections(Zod), 기존 6개 + `llm-wiki-template/wiki` 선별 이식 | 기존글 100% 렌더(깨진 링크 0), 스키마 위반 0, articles≥2 colorway 데모 | [SPEC](phase-2-content-routes/SPEC.md) · [PLAN](phase-2-content-routes/PLAN.md) |
| 3 | Wiki Quiz (flash cards) | 랜덤 객관식/주관식, 덱·세션·채점·localStorage 진척, island로 SSG 무해화 | 퀴즈 20문항 시드, 키보드 조작·채점 단위테스트 그린 | [SPEC](phase-3-wiki-quiz/SPEC.md) · [PLAN](phase-3-wiki-quiz/PLAN.md) |
| 4 | Hardening + 운영 | Pagefind 검색, SEO/RSS/OG/sitemap, 404, CI 가드(lint·link·schema·공개안전), 구 `gh-pages` 정리 | 검색 Top-3 적중 수동체크, CI 그린, 구배포 경로 제거 | [SPEC](phase-4-hardening-ops/SPEC.md) · [PLAN](phase-4-hardening-ops/PLAN.md) |

의존성: 0 → 1 → 2 → 3 → 4 순차. 3·4는 2 승인 후 병렬 검토 가능.

## 정보구조 (1차 범위)

- `/` 홈페이지 · `/articles` + `/articles/[...slug]` · `/til` + `/til/[...slug]` (=wiki, 동일 템플릿) · `/tags` + `/tags/[tag]`
- 고도화: `/wiki/quiz` — flash cards, 랜덤 객관식/주관식 (Phase 3, islands)
- `articles`: 페이지별 자유 구성 — frontmatter(`theme`, `layout`, `colorway`, `components`)로 컬러셋·레이아웃 분기, MDX 안에서 자유 조립
- `til`/`wiki`: 단일 `WikiLayout` + 단일 스키마로 통일감
- 스타일: minimalism + light theme + "적당한 고급스러움" (타이포·여백·헤어라인·절제된 액센트)
- UI: 재활용 가능한 design-system 컴포넌트, **StyleX** 기반 (`tokens → primitives → patterns`)

## 코드 스타일 (전 Phase 공통)

`docs/conventions/code-style.md` 준수 (공유 정본 + 블로그 델타). 상세 규칙은 해당 문서 참조.

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
