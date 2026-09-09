# Orchestrator Playbook

> Role docs: `.tasks/playbook/*.md`. Orchestrator = current session (this agent).
> CLI surface: Cline `team_*` tools + `herdr` CLI (inside Herdr pane, `HERDR_ENV=1` verified).
> Paseo is NOT used for this project (user decision).

## Topology

- One Herdr workspace per phase: `phase-N-*` (created on phase kickoff, closed on merge).
- Per phase, 3 agents (Herdr agent names, `[a-z0-9_-]{1,32}`):
  - `pN-leader` — kind: any interactive (default `cline`), model `muse-spark-1.3-contributor`
  - `pN-planner` — model `muse-spark-1.3-contributor`
  - `pN-developer` — model `glm-5.3-flash`
- Orchestrator never edits phase code directly; it spawns, routes reports, enforces gates, merges.

## Model pinning (cline CLI provider — verified 2026-09-10 via live spawn test)

| Role | Invocation | Rationale |
|---|---|---|
| leader | `-m cline-free/muse-spark-1.3-contributor --thinking xhigh` | continuity + judgment, max reasoning |
| planner | `-m cline-free/muse-spark-1.3-contributor --thinking xhigh` | spec reasoning + review depth |
| developer | `-m z-ai/glm-5.3-flash` | fast/cheap implementation throughput |

Provider is always `cline` (default; `-P cline`).

⚠️ Verified findings (herdr panes `wF:p4`/`wF:p5`, `pane run` + `wait-output`):
1. `cline-free/glm-5.3-flash` → `error: Free model promotion ended` (dead ID). BUT `z-ai/glm-5.3-flash`
   (no `cline:` prefix — that form 404s via Vercel gateway) → **`GLM-RETRY-OK` 반환 확인** ✅.
   Developer는 `z-ai/glm-5.3-flash` 사용.
2. spark-1.3 without `--thinking` → API 400 `Reasoning is mandatory` — **thinking 필수**.
   User decision: `xhigh` 고정 (leader/planner).
3. Non-fatal: `error: hook dispatch failed: session.hook requires a valid hook event payload` — headless 호출 시
   항상 선행 출력되나 실행은 계속됨. 무시 가능.
Fallback: spark-1.3 유료 전환 시 `cline auth`/모델픽터로 후속 선정, phase LOG에 기록.

## Spawn sequence (per phase — Herdr panes + cline CLI)

```bash
# 1. layout: 3 panes in phase workspace/tab (run from orchestrator pane)
herdr workspace create --name phase-N-<slug>            # parse .result.workspace/.result.tab/.result.root_pane
herdr pane split --current --direction right --cwd "$PWD" --no-focus   # pane A
herdr pane split --current --direction down --cwd "$PWD" --no-focus    # pane B
# 2. start cline CLI in each pane (panes must be at shell prompt; --auto-approve per role prompt)
# NOTE (verified 2026-09-10 via herdr test panes):
# - leader/planner: spark-1.3 REQUIRES --thinking (API 400 without it); level = xhigh per user.
# - developer: `-m z-ai/glm-5.3-flash` (NO cline: prefix — that form 404s). Verified GLM-RETRY-OK.
herdr pane run <pane0> 'cline --auto-approve true -m "cline-free/muse-spark-1.3-contributor" --thinking xhigh'
herdr pane run <paneA> 'cline --auto-approve true -m "cline-free/muse-spark-1.3-contributor" --thinking xhigh'
herdr pane run <paneB> 'cline --auto-approve true -m "z-ai/glm-5.3-flash"'
# 3. name + brief each role once interactive (see role files for brief text)
herdr agent start pN-leader --kind cline --pane <pane0>
herdr agent start pN-planner --kind cline --pane <paneA>
herdr agent start pN-developer --kind cline --pane <paneB>
herdr agent prompt pN-leader "<leader brief>" --wait --timeout 600000
```

Notes: `herdr agent start` only names/tracks an interactive agent already running in the pane —
step 2 must precede step 3. `--auto-approve true` matches the requested invocation
(`cline --auto-approve --model …`); all roles run in act mode (default, no `-p` flag) —
planner must edit PLAN.md, which plan mode forbids.
Full brief templates: `leader.md`, `planner.md`, `developer.md`.

## Message protocol

- leader → orchestrator: `DONE <phase> <branch> <PR#>` or `BLOCKED <phase> <reason> <needs>`.
- developer → leader (plan change needed): `PLAN-CHANGE <file> <reason> <proposal>`; leader approves or escalates.
- planner → leader: `REVIEW <verdict:APPROVE|CHANGES> <findings>`.
- All reports also appended to `.tasks/phase-N-*/LOG.md` by the sender.

## Gates (orchestrator enforces before merge)

1. Common done gates green (CI on the stacked PR).
2. `REVIEW=APPROVE` from planner recorded in LOG.
3. `DONE` from leader with branch + PR number.
4. Human final approval (orchestrator asks user, then merges stack bottom-up).

## Failure handling

- Agent `blocked` (approval UI): inspect via `herdr agent read`, ask user, never auto-approve destructive actions.
- Agent stall (`agent_prompt_stalled` / timeout): `herdr agent read`, then re-prompt or restart pane.
- Model unavailable: use fallback chain, log substitution.
