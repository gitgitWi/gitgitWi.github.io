# Phase 0 PLAN — Foundation

## 순서
1. `git branch -m master main && git push -u origin main` → GitHub Settings → Default branch=`main` →
   로컬 `git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main`, `master` 삭제.
   - Pages 설정이 `gh-pages` 브랜치를 바라보므로 전환 중 배포 영향 없음. README에 "개편 중" 배너는 선택.
2. bun 고정 (로컬 1.4.2 확인됨 ✓):
   - `package.json`에 `"packageManager": "bun@1.4.2"` 추가. 이후 첫 `bun install`이 `bun.lockb` 생성.
   - yarn classic 잔재는 Phase 1 스캐폴드 시 제거 (`.yarn/`, `.yarnrc`, `yarn.lock`) — Phase 0에서는 손대지 않음.
   - Node 22.23.2 병행 유지 (Astro 요구 ≥22.12). `bun run dev` 기본 동작=Node로 Astro 실행.
3. 지식기반:
   a. `claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp` (+ Cline MCP 설정에 동일 URL 등록).
   b. 스킬 평가: `spillwavesolutions/publishing-astro-websites-agentic-skill` clone → SKILL.md 품질 체크
      (Collections/MDX/SSG 커버 여부) → 통과 시 `.agents/skills/astro-publish/` 미러 + 커밋해시 기록, 탈락 시 `incluud/astro-agent-skills`로 교체.
   c. `AGENTS.md` 작성 (영어, 최소 유지 — 상세는 링크):
      MCP 우선조회·`bun astro add` 사용·`getStaticProps/next/link` 금지·StyleX ESLint 준수 +
      코드 스타일 링크 (`docs/conventions/code-style.md` — 사람·에이전트 공용).
      `CLAUDE.md`는 symlink (`ln -s AGENTS.md CLAUDE.md`).
   d. CI 선행 구축은 Phase 4 PLAN §0 참조 (`feat/ci-gates` → `main` 직행이 스택 최하단).
4. StyleX 스파이크 (임시 디렉토리, 본 repo 미오염):
   `bun create astro spike -- --template minimal` → `bun add -d @stylexjs/stylex @stylexjs/unplugin @stylexjs/eslint-plugin` →
   `astro.config.mjs`의 `vite.plugins`에 `stylex.vite({useCSSLayers:true, dev, runtimeInjection:false})` →
   토큰 1개+버튼 1개 렌더 → `bun run build` → `dist` CSS에 atomic 룰 존재 확인 → 로그를 Phase 1 PLAN에 첨부.
   - 보너스: `bun add sharp` 후 이미지 최적화 빌드 실증 (실패 시 SPEC §7 폴백 기록).

## 검증
- `git branch -a` / GitHub API default branch 확인.
- 스파이크 `bun run build` 그린 + 생성 CSS 샘플.

## 승인 요청
- [ ] pm = bun@1.4.2 확정? (유지 희망 시 코멘트)
- [ ] 스킬 1순위 채택 동의?
