# Phase 0 — Foundation: 브랜치·툴체인·지식기반

> 상태: SPEC+PLAN 작성됨 / 승인 대기. **승인 전까지 구현 명령 실행 금지.**

## 1. 배경
Next.js 12 잔재 위에서 Astro 이주를 시작할 수 없다. default branch(`master`), Node 14 워크플로우,
에이전트 지식(구 Astro API 환각) 문제를 먼저 제거해야 한다.
패키지매니저는 **yarn classic 1.22.17 → bun 1.4.2**로 전환한다 (아래 검토 결론).

## 2. 목표
1. `master` → `main` rename + GitHub default 전환 (+ 로컬 HEAD 동기화).
2. 런타임·패키지매니저: **bun 1.4.2** 고정 (로컬 설치 확인됨). `packageManager: bun@1.4.2` 핀 + `bun.lockb` 커밋.
   - yarn classic 잔재 제거: `.yarn/releases/yarn-1.22.17.cjs`, `.yarnrc`(yarn-path), `yarn.lock` (Phase 1 스캐폴드 시).
   - Node 22.23.2는 Astro 빌드 요구조건으로 병행 유지 (Astro는 Node ≥22.12 요구. `bunx --bun astro dev`는 선택, 기본 `bun run dev`는 Node로 Astro 실행).
3. 지식기반 고정: **Astro Docs MCP** (`https://mcp.docs.astro.build/mcp`) + Astro 스킬 1개
   (1순위 `spillwavesolutions/publishing-astro-websites-agentic-skill`, 탈락 시 `incluud/astro-agent-skills`) +
   `AGENTS.md` 룰 (MCP 우선 조회, `astro add` 사용, 구 `getStaticProps/Link` 금지 + 아래 §7 코드 스타일).
4. StyleX 스파이크: 빈 Astro+Vite 스캐폴드에 `@stylexjs/unplugin` 주입 → atomic CSS 추출 확인.
   (StyleX 공식 Bun 가이드 존재 — unplugin esbuild 어댑터 + Bun 플러그인 엔트리포인트. 본 프로젝트는
   Astro/Vite 파이프라인이라 `stylex.vite()` 사용, 패키지 설치·스크립트 실행만 bun.)
## 3. 비목표
- 기존 Next.js 코드 삭제/마이그레이션 (Phase 1).
- 디자인 토큰 확정 (Phase 1).
- 콘텐츠 이식 (Phase 2).

## 4. 산출물
- GitHub: default=`main`, `master` 브랜치 삭제(또는 archive 태그 후 삭제).
- `AGENTS.md` (MCP·스킬·금지패턴), `.agents/skills/` 미러 또는 참조 기록.
- 스파이크 리포트 (빌드 로그 + 생성 CSS 샘플) → Phase 1 PLAN 입력.

## 5. 종료 게이트
- [ ] `git symbolic-ref refs/remotes/origin/HEAD` → `origin/main`.
- [ ] `bun --version` 1.4.x + `packageManager: bun@1.4.2` 핀 + `bun.lockb` 커밋 (Node 22.x 병행 유지).
- [ ] 스킬 1개 핀 (repo+commit hash 기록).
- [ ] StyleX 스파이크 `bun run build` 그린.

## 6. 리스크
- Pages 소스가 `gh-pages` 브랜치에 묶여 있어 default 전환 직후 배포 공백 → Phase 1까지 읽기전용 기간으로 공지(README 배너).
- `spillwavesolutions` 스킬 품질 미달 → 차순위로 교체 (PLAN에 평가 기준 명시).

## 7. bun 전환 검토 결론 (2026-09-10 실측)

| 항목 | 결과 | 근거 |
|---|---|---|
| pm 전환 가능 여부 | **가능 — 권장** | Astro 공식 `bun create astro` + `bun install/add/run dev/build` 전구간 지원. `withastro/action`이 lockfile로 bun 자동감지 (`npm\|yarn\|pnpm\|bun\|deno`). `oven-sh/setup-bun`으로 CI 설치 |
| 현 상태 정정 | yarn berry 아님, **yarn classic 1.22.17** (`.yarn/releases/*.cjs` + `.yarnrc` yarn-path + lockfile v1). PnP 아님 | `.yarnrc`/`yarn.lock` 헤더 실측 |
| 런타임 | **bun=pm+스크립트러너, Node 22=Astro 실행** | Astro 요구 Node ≥22.12. `bun run dev`는 기본 Node로 Astro 실행, `--bun` 플래그는 선택. SSR 어댑터 불필요 (static 출력) |
| StyleX | 문제없음 | StyleX 공식 Bun 가이드 (unplugin esbuild 어댑터 + Bun 플러그인). 본 프로젝트는 Astro/Vite 파이프라인이라 `stylex.vite()` 그대로 |
| sharp (`astro:assets`) | **주의**: Bun NAPI/sharp 이슈 보고 잔존. Phase 1 스파이크에서 `bun install sharp && bun run build`로 이미지 최적화 실증 필수, 실패 시 폴백=Node로 빌드만 수행 | lovell/sharp#3511, Astro Bun 레시피 "rough edges" 명시 |
| 테스트 (Phase 3) | `bun test` 내장 가능하나 기존 PLAN의 vitest 유지 권장 (Astro 생태계 표준, seeded RNG 테스트 이식성) | Astro Bun 레시피 Testing절 |
| husky/lint-staged | `npx pretty-quick` → `bunx`로 교체 필요 (Phase 1) | `.husky/pre-commit` 실측 |

## 8. 코드 스타일 적용 (본 Phase 산출물)

`AGENTS.md`는 코드 스타일 링크 (`docs/conventions/code-style.md` — 사람·에이전트 공용).
언어: LLM 문서 영어 / 커밋·PR·주석·테스트 타이틀 한국어 (`describe`=심볼명).
