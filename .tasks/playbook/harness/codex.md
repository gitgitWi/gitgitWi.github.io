# Harness: Codex

> Status: **stub**. Do not spawn a phase on this harness until this file is filled and marked live.
> Roles (already valid): [`../`](../). Cursor will also load `.codex/agents/` if you add them.

## When to use

- Human is in Codex (CLI or IDE), not Cursor and not Cline.
- Promote this stub on the first such phase: copy [_template.md](_template.md), fill spawn from current Codex agent docs, then replace this page.

## Known mapping (not yet verified)

| Role | Likely process | Notes |
|---|---|---|
| orchestrator | parent Codex session | |
| leader | folded into parent **or** a named agent | pick one when promoting |
| planner | `.codex/agents/planner.md` | |
| developer | `.codex/agents/implementer.md` | worktree if Codex parallel agents share a checkout |

MCP: register `https://mcp.docs.astro.build/mcp` with whatever Codex MCP config is current when promoting.

## Blocker until live

No model pins, no spawn script. Using this harness now would invent protocol. Switch to [cursor.md](cursor.md) or [cline-herdr.md](cline-herdr.md).
