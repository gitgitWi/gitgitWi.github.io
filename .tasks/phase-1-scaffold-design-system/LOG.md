# Phase 1 LOG

- Harness: cursor (Grok parent + Composer implementer, verifier GPT 5.6 Sol medium)
- Started: 2026-09-10
- Status: in progress (human: phase 1 이어서, merge는 사람)

## Checklist (PLAN)

- [ ] 0. oxfmt/oxlint 설정 + 기존 트리 포맷 (코드 작업 전) — 브랜치 선행 커밋
- [ ] 1. 스캐폴드 (`legacy-next/`, yarn 제거, Astro static, StyleX vite)
- [ ] 2. StyleX DS + stories
- [ ] 3. Home/Tags 껍데기 + Base.astro에서 stylex.css 연결
- [ ] 4. deploy.yml → withastro/action@v6 + deploy-pages
- [ ] 5. 게이트 + Lighthouse + 런타임 주입 0

## Notes

- Phase 0 merged: #55. `feat/ci-gates`는 아직 없음 — Phase 1 브랜치 base=`main`.
- 선행 커밋: oxc pin, oxfmt 63파일 `--check` 그린, oxlint correctness ignorePatterns 그린.
- Review: one Sol pass per PR. Usage in this LOG after review. OpenAI Cursor shutoff proposed 2026-11-12.
- Human merges. Do not `gh pr merge`.
