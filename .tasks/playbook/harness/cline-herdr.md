# Harness: Cline CLI + Herdr

> Status: **live** (spawn verified 2026-09-10). Roles: [`../`](../).
> Isolation: one Herdr workspace per phase, three named panes.
> Paseo is not used.

## When to use

- Human is in a Herdr pane (`HERDR_ENV=1`).
- Cline CLI is the agent runtime (`-P cline`).
- Prefer this when Cline free/paid models are available. If Cline free quota is exhausted, use [cursor.md](cursor.md) instead of mixing.

## Topology mapping

| Role         | Process                               | Notes                        |
| ------------ | ------------------------------------- | ---------------------------- |
| orchestrator | current Herdr pane (this session)     | does not edit product code   |
| leader       | Herdr agent `pN-leader`, kind `cline` | named long-lived worker      |
| planner      | `pN-planner`                          | act mode (must edit PLAN.md) |
| developer    | `pN-developer`                        | act mode                     |

Agent names: `[a-z0-9_-]{1,32}`. Workspace per phase: `phase-N-<slug>` (create on kickoff, close on merge).

## Isolation

Herdr workspace + pane cwd = repo root (or a worktree if the orchestrator created one). Do **not** run two Cline developers against the same checkout. Parallel phases need separate worktrees **and** separate Herdr workspaces.

## Model pinning (verified 2026-09-10)

| Role      | Invocation                                                  | Rationale               |
| --------- | ----------------------------------------------------------- | ----------------------- |
| leader    | `-m cline-free/muse-spark-1.3-contributor --thinking xhigh` | continuity + judgment   |
| planner   | `-m cline-free/muse-spark-1.3-contributor --thinking xhigh` | spec reasoning + review |
| developer | `-m z-ai/glm-5.3-flash`                                     | fast implementation     |

Provider is always Cline (default `-P cline`).

Verified findings:

1. `cline-free/glm-5.3-flash` → `error: Free model promotion ended` (dead ID). `z-ai/glm-5.3-flash` (no `cline:` prefix — that form 404s via Vercel gateway) returned `GLM-RETRY-OK`.
2. spark-1.3 without `--thinking` → API 400 `Reasoning is mandatory`. Level = `xhigh` (user decision).
3. Non-fatal: `error: hook dispatch failed: session.hook requires a valid hook event payload` on headless start — ignore.

Fallback: spark-1.3 paid / picker via `cline auth`; record the substitute in phase LOG. If Cline quota is gone, **switch the phase to Cursor** rather than inventing a fourth model ID in this file.

## Spawn sequence (per phase)

```bash
# 1. layout: 3 panes in phase workspace/tab (run from orchestrator pane)
herdr workspace create --name phase-N-<slug>            # parse .result.workspace/.result.tab/.result.root_pane
herdr pane split --current --direction right --cwd "$PWD" --no-focus   # pane A
herdr pane split --current --direction down --cwd "$PWD" --no-focus    # pane B
# 2. start cline CLI in each pane (panes must be at shell prompt)
herdr pane run <pane0> 'cline --auto-approve true -m "cline-free/muse-spark-1.3-contributor" --thinking xhigh'
herdr pane run <paneA> 'cline --auto-approve true -m "cline-free/muse-spark-1.3-contributor" --thinking xhigh'
herdr pane run <paneB> 'cline --auto-approve true -m "z-ai/glm-5.3-flash"'
# 3. name + brief each role (briefs: ../leader.md, ../planner.md, ../developer.md)
herdr agent start pN-leader --kind cline --pane <pane0>
herdr agent start pN-planner --kind cline --pane <paneA>
herdr agent start pN-developer --kind cline --pane <paneB>
herdr agent prompt pN-leader "<leader brief>" --wait --timeout 600000
```

Notes:

- `herdr agent start` only names an interactive agent already running — step 2 before step 3.
- `--auto-approve true` = act mode. Do **not** pass `-p` (plan mode forbids PLAN.md edits).
- Skill for the multiplexer: `herdr`.
- Developer opens `--draft` at phase complete (`PR-DRAFT`). Planner reviews the draft; on APPROVE the developer `gh pr ready` (`PR-READY`). This harness has no separate verifier process — planner Part B is the review.

## MCP / skills

Register the same Astro Docs MCP URL Cline uses for HTTP servers:

`https://mcp.docs.astro.build/mcp`

Exact Cline MCP JSON key names follow Cline’s current config; do not copy Cursor’s `.cursor/mcp.json` blindly.

## Failure handling

- Agent `blocked` (approval UI): `herdr agent read`, ask the human, never auto-approve destructive actions.
- Stall (`agent_prompt_stalled` / timeout): `herdr agent read`, then re-prompt or restart the pane.
- Model unavailable: fallback chain above; LOG the substitution.
