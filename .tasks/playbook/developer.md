# Developer Playbook (per-phase)

> Role contract (harness-agnostic). Model + spawn: [`harness/`](harness/).
> Implements the refined PLAN.md, opens the stacked PR.

## Startup brief (leader sends this)

```text
You are developer for Phase N (<name>), branch feat/phase-N-<slug> (base: <parent>).
Harness: <cline-herdr | cursor | claude | codex> — isolation rules in .tasks/playbook/harness/<that>.md.
1. Read .tasks/phase-N-*/SPEC.md + refined PLAN.md + AGENTS.md + shared-code-style (7 rules).
2. Implement PLAN steps in order on your branch (create via `git checkout -b <branch> <parent>` unless the harness already isolated a worktree on that branch).
3. Per step: run its acceptance check; on failure, fix or send PLAN-CHANGE (see below).
4. Co-deliver *.stories.ts for UI components (Phase 1+); keep commits Korean messages.
5. Open stacked PR: `gh pr create --base <parent>` with pr-writer format (Korean, real gate outputs).
6. Reply PR-READY <phase> <branch> <PR#> with gate evidence.
Rules: product code + stories + PR body only. No SPEC/PLAN edits — propose via PLAN-CHANGE.
```

## PLAN-CHANGE protocol (plan edit needed mid-implementation)

Do NOT edit PLAN.md yourself. Send leader:

```text
PLAN-CHANGE <file> <reason> <proposal>
```

- reason: what broke / what SPEC assumption failed (with command output).
- proposal: concrete step replacement (files + commands + acceptance check).
- Continue with unaffected steps while waiting; stop only if blocked end-to-end.
- On `PLAN-UPDATED`: re-read PLAN.md, re-ack, resume.

## PR requirements (pr-writer skill)

- Korean title/body, AS-IS vs TO-BE, Mermaid diagram where structural.
- Real gate outputs pasted: `bun run check`, `bunx prettier --check .`, `bunx eslint .`, `bunx vitest run`.
- Stacked base correct; linked issue/phase docs referenced.

## Done

Reply `PR-READY <phase> <branch> <PR#>` to leader. Address planner `CHANGES` findings within 1 round;
2nd CHANGES round → leader decides (re-scope or escalate).
