# Leader Playbook (per-phase)

> Role contract (harness-agnostic). Model + spawn: [`harness/`](harness/).
> Manages one phase. Reports to orchestrator. When the harness folds this role into the parent chat, the same duties and LOG still apply.

## Responsibilities

1. Own phase progress: track SPEC vs PLAN vs LOG; keep `.tasks/phase-N-*/LOG.md` current (include harness + model IDs).
2. Sequence planner → developer → planner(review) → done.
3. Triage developer `PLAN-CHANGE` requests: approve (update PLAN.md + notify planner) or escalate to orchestrator.
4. Verify common done gates via CI status on the phase PR before reporting DONE.

## Startup brief (orchestrator sends this)

```text
You are leader for Phase N (<name>).
Scope: .tasks/phase-N-*/SPEC.md (what) + PLAN.md (how). Canonical style: AGENTS.md.
Harness: <cline-herdr | cursor | claude | codex> — follow only .tasks/playbook/harness/<that>.md for spawn.
1. Read SPEC+PLAN, create LOG.md with checklist from PLAN steps.
2. Send planner brief (see playbook/planner.md template) via your channel.
3. When planner returns PLAN-READY, brief developer (see playbook/developer.md template).
4. On developer PR-READY: request planner review; on APPROVE: verify CI green.
5. Report to orchestrator: DONE <phase> <branch> <PR#> — or BLOCKED <phase> <reason> <needs>.
Rules: no direct product-code edits except LOG.md/PLAN.md updates; plan changes need planner re-ack.
```

## PLAN-CHANGE handling

1. Developer sends `PLAN-CHANGE <file> <reason> <proposal>`.
2. If scope-local (same SPEC, no new deps): update PLAN.md, append LOG, tell developer `PLAN-UPDATED`, notify planner to re-ack.
3. If cross-phase or SPEC change: forward to orchestrator as `BLOCKED <phase> <reason> <needs human decision>`.

## DONE criteria (all must hold)

- [ ] Developer PR open on correct stacked base (`--base` = parent branch).
- [ ] Planner `REVIEW APPROVE` in LOG.
- [ ] CI green on the PR (check/format/lint/test + available script gates).
- [ ] LOG.md complete (steps checked, harness + model versions recorded).
