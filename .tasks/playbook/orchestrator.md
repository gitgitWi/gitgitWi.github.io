# Orchestrator Playbook

> Role contract (harness-agnostic). Spawn, isolation, and model IDs: [`harness/`](harness/).
> Orchestrator = the parent session that talks to the human.

## Topology (logical)

- One active phase per orchestrator session (Phase 3 and 4 may run in parallel only after Phase 2 is approved, and only if their files do not overlap).
- Sequence: leader tracks → planner refines PLAN → developer implements + **draft** stacked PR (`PR-DRAFT`) → verifier review → developer marks ready (`PR-READY`) → **human merges**. Orchestrator does not merge unless the human asked for that phase.
- Orchestrator never edits phase **product** code. It spawns, routes reports, enforces gates, and asks the human to merge.

Harness mapping (who is a process vs a fold) is **not** defined here. Cursor folds orchestrator+leader into the parent Grok chat; Cline+Herdr uses three named panes. See the harness file.

## Message protocol

- leader → orchestrator: `DONE <phase> <branch> <PR#>` or `BLOCKED <phase> <reason> <needs>`.
- developer → leader: `PLAN-CHANGE <file> <reason> <proposal>`; `PR-DRAFT <phase> <branch> <PR#>`; after review `PR-READY …`.
- planner → leader: `REVIEW <verdict:APPROVE|CHANGES> <findings>` (on the **draft**). Verifier (if spawned) uses the same verb.
- All reports also appended to `.tasks/phase-N-*/LOG.md` by the sender (include harness name + model IDs).

## Gates (before asking the human to merge)

1. Common done gates green (CI on the stacked PR).
2. `REVIEW=APPROVE` from planner (and verifier if used) recorded in LOG.
3. PR is **ready**, not draft.
4. `DONE` from leader with branch + PR number.
5. Human final approval. Merge stack bottom-up.

## Failure handling (generic)

- Agent blocked on a destructive or unclear approval: ask the human. Never auto-approve destructive actions.
- Stall / timeout: re-prompt or restart **using the harness doc**. Do not invent a second spawn protocol.
- Model unavailable: use that harness’s fallback chain and record the substitution in LOG.md.
