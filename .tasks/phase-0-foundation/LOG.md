# Phase 0 LOG

- Harness: cursor (Grok parent, this session)
- Started: 2026-09-09
- Status: complete (2026-09-10). SPEC 종료 게이트 충족. `PR-DRAFT phase-0 feat/phase-0-foundation #55`

## Checklist (PLAN)

- [x] 1. GitHub default=`main`, `origin/HEAD`→`origin/main`. `master`는 열린 PR 때문에 삭제하지 않음.
- [x] 2. bun@1.4.2 pin + `bun.lock` (`bun --version` 1.4.2, yarn.lock는 Phase 1까지 유지)
- [x] 3a. Astro Docs MCP (Cursor `.cursor/mcp.json`)
- [x] 3b. Astro skill pin — `.agents/skills/astro-publish/` @ `5889789e`
- [x] 3c. AGENTS.md 스킬·금지패턴 + `CLAUDE.md` symlink (기존)
- [ ] 3d. CI 선행 — `feat/ci-gates` (Phase 0 종료 게이트 아님. Phase 4 PLAN §0, 다음 스택)
- [x] 4. StyleX spike → Phase 1 PLAN 첨부. sharp 설치+빌드 그린

## Notes

- bun·스킬·스파이크·default=`main`은 `origin/main`에 이미 들어가 있음 (`3939883`). 이 브랜치에 남은 것은 playbook draft→ready와 `docs/conventions/prs.md`.
- 스파이크 HTML이 `stylex.css`를 링크하지 않음 → Phase 1 Base.astro 필수.
- 2026-09-10 게이트 재실행: `bun run check` 스크립트 없음(Next 잔재). `oxfmt --check .` 40파일(vendored yarn·스킬 포함). `oxlint .` exit 0 (경고는 `.yarn/releases` 중심). `vitest run` 테스트 파일 0건 exit 1.
