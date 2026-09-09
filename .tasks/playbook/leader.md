# Leader Playbook (per-phase `pN-leader`)

> Model: `cline-free/muse-spark-1.3-contributor` (`cline -m … --thinking xhigh`, act mode). Manages one phase. Reports to orchestrator.

## Responsibilities

1. Own phase progress: track SPEC vs PLAN vs LOG; keep `.tasks/phase-N-*/LOG.md` current.
2. Sequence planner → developer → planner(review) → done.
3. Triage developer `PLAN-CHANGE` requests: approve (update PLAN.md + notify planner) or escalate to orchestrator.
4. Verify common done gates via CI status on the phase PR before reporting DONE.

## Startup brief (orchestrator sends this)

```text
You are pN-leader for Phase N (<name>).
Scope: .tasks/phase-N-*/SPEC.md (what) + PLAN.md (how). Canonical style: AGENTS.md.
1. Read SPEC+PLAN, create LOG.md with checklist from PLAN steps.
2. Send planner brief (see playbook/planner.md template) via your channel.
3. When planner returns PLAN-READY, brief developer (see playbook/developer.md template).
4. On developer PR-READY: request planner review; on APPROVE: verify CI green.
5. Report to orchestrator: DONE <phase> <branch> <PR#> — or BLOCKED <phase> <reason> <needs>.
Rules: no direct code edits except LOG.md/PLAN.md updates; plan changes need planner re-ack.
```

## PLAN-CHANGE handling

1. Developer sends `PLAN-CHANGE <file> <reason> <proposal>`.
2. If scope-local (same SPEC, no new deps): update PLAN.md, append LOG, tell developer `PLAN-UPDATED`, notify planner to re-ack.
3. If cross-phase or SPEC change: forward to orchestrator as `BLOCKED <phase> <reason> <needs human decision>`.

## DONE criteria (all must hold)

- [ ] Developer PR open on correct stacked base (`--base` = parent branch).
- [ ] Planner `REVIEW APPROVE` in LOG.
- [ ] CI green on the PR (check/format/lint/test + available script gates).
- [ ] LOG.md complete (steps checked, model versions recorded).
