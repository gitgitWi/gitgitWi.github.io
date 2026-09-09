# Harness: Claude Code

> Status: **stub**. Do not spawn a phase on this harness until this file is filled and marked live.
> Roles (already valid): [`../`](../). Cursor will also load `.claude/agents/` if you add them.

## When to use

- Human is in Claude Code (CLI or desktop), not Cursor and not Cline.
- Promote this stub on the first such phase: copy [_template.md](_template.md), fill spawn from current Claude Code Task / subagent docs, then replace this page.

## Known mapping (not yet verified)

| Role | Likely process | Notes |
|---|---|---|
| orchestrator | parent Claude Code session | |
| leader | folded into parent **or** a named subagent | pick one when promoting |
| planner | `.claude/agents/planner.md` | keep `readonly` if the product supports it |
| developer | `.claude/agents/implementer.md` | isolate via git worktree |

MCP: `claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp` (Phase 0 PLAN). Re-verify the flag names when promoting.

## Blocker until live

No model pins, no spawn script. Using this harness now would invent protocol. Switch to [cursor.md](cursor.md) or [cline-herdr.md](cline-herdr.md).
