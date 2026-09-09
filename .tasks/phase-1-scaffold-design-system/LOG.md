# Phase 1 LOG

- Harness: cursor (Grok parent + Composer implementer, verifier GPT 5.6 Sol medium)
- Started: 2026-09-10
- Status: in progress (human: phase 1 이어서, merge는 사람)

## Checklist (PLAN)

- [x] 0. oxfmt/oxlint 설정 + 기존 트리 포맷 (코드 작업 전) — 브랜치 선행 커밋
- [ ] 1. Next 보관 (`legacy-next/`) + yarn classic 잔재 제거
- [ ] 2. Astro static 스캐폴드 + StyleX Vite + `global.css` 엔트리 (`Base.astro` import)
- [ ] 3. StyleX DS (토큰/프리미티브/패턴) + `*.stories.ts` 동반 작성
- [ ] 4. Storybook 설치·설정 + `bun run build-storybook` (SPEC 게이트, 신규 번호 단계)
- [ ] 5. Home/Tags 목업 (`getStaticPaths` string params) + 빌드 CSS link/`@layer`
- [ ] 6. `deploy.yml` → `withastro/action@v6` + `deploy-pages@v5` (node 22, bun.lock 감지)
- [ ] 7. 게이트 + Lighthouse (local preview) + 런타임 주입 0
- [ ] 8. draft PR (`--base main`, `--assignee @me`, labels `phase-1` `astro`)

## Notes

- Phase 0 merged: #55. `feat/ci-gates`는 아직 없음 — Phase 1 브랜치 base=`main`.
- CI (`.github/workflows/ci.yml`)는 후속. 이 Phase 블로커 아님. 로컬 게이트는 필수.
- Collections / `src/content.config.ts`는 Phase 2. 이 Phase는 scaffold + DS + Home/Tags 목업 + deploy.
- Astro 설정: `astro.config.mjs` (공식 권장). collections 파일은 나중에 `src/content.config.ts`.
- 선행 커밋: oxc pin, oxfmt 63파일 `--check` 그린, oxlint correctness ignorePatterns 그린.
- Review: one Sol pass per PR. Usage in this LOG after review. OpenAI Cursor shutoff proposed 2026-11-12.
- Human merges. Do not `gh pr merge`.
- Pages Source=GitHub Actions는 사람 Settings 작업. live 배포 확인은 머지 후.

## Planner

- 2026-09-10 PLAN-READY phase-1 none
