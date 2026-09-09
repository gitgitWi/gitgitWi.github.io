# Developer Playbook (per-phase)

> Role contract (harness-agnostic). Model + spawn: [`harness/`](harness/).
> Implements the refined PLAN.md, opens a **draft** stacked PR, then marks it ready after review.

## Startup brief (leader sends this)

```text
You are developer for Phase N (<name>), branch feat/phase-N-<slug> (base: <parent>).
Harness: <cline-herdr | cursor | claude | codex> — isolation rules in .tasks/playbook/harness/<that>.md.
1. Read .tasks/phase-N-*/SPEC.md + refined PLAN.md + AGENTS.md + shared-code-style (7 rules) + docs/conventions/prs.md.
2. Implement PLAN steps in order on your branch (create via `git checkout -b <branch> <parent>` unless the harness already isolated a worktree on that branch).
3. Per step: run its acceptance check; on failure, fix or send PLAN-CHANGE (see below).
4. Co-deliver *.stories.ts for UI components (Phase 1+); keep commits Korean messages.
5. Open a **draft** stacked PR immediately: `gh pr create --draft --base <parent> --body-file` following `docs/conventions/prs.md` (Korean, real gate outputs).
6. Reply `PR-DRAFT <phase> <branch> <PR#>`. Do not mark the PR ready yet.
7. After planner (and verifier, if the harness has one) `REVIEW APPROVE`: `gh pr ready <PR#>` then `PR-READY <phase> <branch> <PR#>`.
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

## PR requirements

Canonical: [`docs/conventions/prs.md`](../../docs/conventions/prs.md). Read it before `gh pr create`.

- Why / effect / design change / scope — not a file list. Mermaid carries the body; no tables.
- Real gate outputs from this HEAD: `bun run check`, `bunx oxfmt --check .`, `bunx oxlint .`, `bunx vitest run`.
- Stacked base correct; `--body-file`; always `--draft` on create. Ready is a post-review step.

## Done

Reply `PR-DRAFT` as soon as the draft exists. After `REVIEW APPROVE`, mark ready (`gh pr ready`) and reply `PR-READY`.
If the developer session has ended, the leader may run `gh pr ready`.
Address planner/verifier `CHANGES` on the draft (still draft) within 1 round; 2nd CHANGES round → leader decides.
