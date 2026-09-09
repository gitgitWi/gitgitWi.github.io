# Playbook — roles vs harnesses

> Roles (what each agent owes) are harness-agnostic.
> Spawn, isolation, and model pins live under `harness/` so Cline, Cursor, Claude, Codex, or a later tool can run the same phase without rewriting SPEC/PLAN.

## How to start a session

1. Read `.tasks/ROADMAP.md` + the current phase `SPEC.md` / `PLAN.md`.
2. Read the **role** files below (contracts + report verbs).
3. Pick **one** harness for this phase. Read only that file in `harness/`.
4. Do not mix spawn protocols in one phase (e.g. Herdr panes + Cursor Task on the same branch).

## Roles (shared)

| Role         | Doc                                | Owns                                          | Must not                       |
| ------------ | ---------------------------------- | --------------------------------------------- | ------------------------------ |
| orchestrator | [orchestrator.md](orchestrator.md) | spawn, routing, gates, ask human to merge     | product code                   |
| leader       | [leader.md](leader.md)             | phase LOG, sequence, PLAN-CHANGE triage       | product code (except LOG/PLAN) |
| planner      | [planner.md](planner.md)           | refine PLAN.md, review draft PR               | product code, SPEC edits       |
| developer    | [developer.md](developer.md)       | implement PLAN, draft PR → ready after review | SPEC/PLAN edits                |

Message verbs (`DONE`, `BLOCKED`, `PLAN-CHANGE`, `PLAN-READY`, `PR-DRAFT`, `PR-READY`, `REVIEW`) are identical across harnesses. Append every report to `.tasks/phase-N-*/LOG.md`.

PR lifecycle: developer opens `--draft` immediately at phase complete (`PR-DRAFT`) → verifier review (Cursor: GPT 5.6 Sol medium) → on `REVIEW APPROVE`, `gh pr ready` (`PR-READY`) → **human merges**.

A harness **may fold** orchestrator + leader into one parent session (Cursor default). That is a mapping, not a license to drop LOG or gates.

## Harnesses (spawn + models)

| Harness                                 | Status                     | Isolation                        | Default models (pinned in that file)                                            |
| --------------------------------------- | -------------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| [Cline + Herdr](harness/cline-herdr.md) | live (verified 2026-09-10) | Herdr workspace + panes          | leader/planner: muse-spark-1.3 · developer: glm-5.3-flash                       |
| [Cursor](harness/cursor.md)             | live                       | worktree or `/in-cloud` (opt-in) | parent+planner: Grok 4.6 · developer: Composer 2.5 · review: GPT 5.6 Sol medium |
| [Claude Code](harness/claude.md)        | stub                       | TBD                              | fill when first used                                                            |
| [Codex](harness/codex.md)               | stub                       | TBD                              | fill when first used                                                            |

Add a new harness by copying [harness/_template.md](harness/_template.md). Do not copy role contracts into the harness file — link them.

**Not used:** Paseo, opencode-go models (user decision).

## Executable agent defs (Cursor)

Cursor loads project subagents from `.cursor/agents/` (checked in). Those files wrap the shared roles with Cursor frontmatter (`model`, `readonly`). Other harnesses should add their own defs (`.claude/agents/`, `.codex/agents/`) when that stub is promoted — Cursor already reads those folders if present.
