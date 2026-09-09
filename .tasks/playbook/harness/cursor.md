# Harness: Cursor (Grok parent + Composer implementer)

> Status: **live**. Roles: [`../`](../). Executable defs: [`.cursor/agents/`](../../../.cursor/agents/).
> Isolation is **opt-in**. Local subagents share the parent checkout unless you ask for a worktree or `/in-cloud`.

## When to use

- Human is in Cursor Agent (this repo’s default while Cline free quota is exhausted).
- Parent model: **Grok 4.6** (orchestrator + leader; planner inherits unless you skip the child).
- Implementer model: **Composer 2.5**.

Do not recreate three Herdr panes. Cursor has no wait/prompt protocol between named long-lived workers.

## Topology mapping

| Role | This harness | Notes |
|---|---|---|
| orchestrator | parent Agent chat (Grok 4.6) | only human-facing session |
| leader | **folded into the parent** | same duties + LOG as `../leader.md` |
| planner | subagent `.cursor/agents/planner.md` | `model: inherit` (Grok). PLAN.md/LOG.md only — not `readonly` because Part A writes PLAN.md |
| developer | subagent `.cursor/agents/implementer.md` | `model: composer-2.5` · **own worktree** |
| verifier | subagent `.cursor/agents/verifier.md` | `readonly: true`, `model: inherit` — run after `PR-READY` |

Small phases may skip spawning planner and refine PLAN.md in the parent. Still write `PLAN-READY` into LOG.md.

### Alternate (two pinned chats)

Agents Window: Chat A = Grok (plan/ask), Chat B = Composer + `/worktree`. The **human** is the bus. Use this when you want to watch implementation without Task-tool folding. Same role contracts.

## Isolation

| Mode | Use |
|---|---|
| Shared parent checkout | verifier (readonly); planner may share because it only writes PLAN.md/LOG.md |
| Git worktree | implementer on product code (`/worktree`, Agents Window, or `agent --worktree`) |
| `/in-cloud` | long implementer runs; own VM + branch. Cloud MCP ≠ local `.cursor/mcp.json` |
| `/best-of-n` | competing implementations, **not** a role team |
| `/multitask` | only when file sets do not overlap |

Never two write-capable agents on the same checkout.

## Model pinning

| Role | Pin | Rationale |
|---|---|---|
| orchestrator / leader | Grok 4.6 in the parent picker | long tool loops, instruction following |
| planner | `inherit` | same judgment as parent |
| developer | `composer-2.5` (`composer-2.5-fast` if the Fast variant is the picker name) | edits + terminal |
| verifier | `inherit` | skeptical review matches planner Part B |

On **legacy request-based plans without Max Mode**, Cursor may ignore `model:` and run subagents as Composer. If that happens, run planner/verifier in the parent Grok chat instead of Task, and LOG the fallback.

If Grok quota is exhausted: keep this harness, switch the **parent** picker to whatever reasoning model is available, and LOG it. Do not silently start Cline panes from a Cursor session.

## Spawn sequence (per phase)

1. Parent (Grok) reads SPEC + PLAN + this file. Creates or updates `.tasks/phase-N-*/LOG.md` (leader duties).
2. `Use the planner subagent` (or `/planner`) with the Part A brief. Wait for `PLAN-READY`. Human may still be asked to approve PLAN deltas. Planner is **not** `readonly` (it writes PLAN.md); treat product-code edits as a bug.
3. After PLAN-READY: `Run the implementer subagent on Composer in its own worktree` with the developer brief (`../developer.md`). Isolation phrase is mandatory.
4. On `PR-READY`: `Use the planner subagent` for Part B, or `/verifier` for gate evidence. Prefer planner for SPEC/style; verifier for “did they actually run the commands”.
5. Parent records `REVIEW` + CI, then `DONE` / `BLOCKED` to the human. Human merges.

Parent prompt (copy):

```text
Harness: cursor. Fold leader into this chat.
Use the planner subagent first (readonly). After PLAN-READY and human ack,
run the implementer subagent on Composer in its own worktree.
Then run verifier (and planner review if the diff is non-trivial).
Do not implement product code in this chat.
```

Invoke explicitly with `/planner`, `/implementer`, `/verifier` when automatic delegation picks the wrong child.

## MCP / skills

Project MCP: [`.cursor/mcp.json`](../../../.cursor/mcp.json) — Astro Docs at `https://mcp.docs.astro.build/mcp`.

Parent and **local** subagents inherit it. Cloud children do not; register the same URL as a Team MCP if implementer is `/in-cloud`.

## Failure handling

- Approval / destructive: parent asks the human (Cursor Run Mode). Never tell implementer to `--force` git or skip hooks.
- Stall: Stop, or resume the child by agent ID (`Resume agent <id> …`).
- Implementer dirty-tree conflict: stop, move to a worktree, do not rebase the human’s checkout.
- Nested spawn: main + direct children only (no grandchild Task). If implementer needs search, it uses built-in Explore — it must not spawn another implementer.

## Do not

- Pin muse-spark / glm-5.3-flash in this file.
- Treat `/best-of-n` as leader/planner/developer.
- Assume cloud children see local MCP or Herdr.
