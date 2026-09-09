# Phase 0 LOG

- Harness: cursor (Grok parent, this session)
- Started: 2026-09-09
- Status: in progress (human: "phase0 부터 진행")

## Checklist (PLAN)

- [x] 1. GitHub default=`main`, `origin/HEAD`→`origin/main`. `master`는 열린 PR 때문에 삭제하지 않음.
- [x] 2. bun@1.4.2 pin + `bun.lock` (`bun --version` 1.4.2, yarn.lock는 Phase 1까지 유지)
- [x] 3a. Astro Docs MCP (Cursor `.cursor/mcp.json`)
- [x] 3b. Astro skill pin — `.agents/skills/astro-publish/` @ `5889789e`
- [x] 3c. AGENTS.md 스킬·금지패턴 + `CLAUDE.md` symlink (기존)
- [ ] 3d. CI 선행 — `feat/ci-gates` (main 생성 후)
- [x] 4. StyleX spike → Phase 1 PLAN 첨부. sharp 설치+빌드 그린

## Notes

- `docs/tasks-setup` 푸시 후 이 브랜치 `feat/phase-0-foundation`.
- 스파이크 HTML이 `stylex.css`를 링크하지 않음 → Phase 1 Base.astro 필수.
