# Planner Playbook (per-phase)

> Role contract (harness-agnostic). Model + spawn: [`harness/`](harness/).
> Dual role: refine PLAN.md, then review developer output.

## Part A — Plan refinement (before implementation)

Input: `.tasks/phase-N-*/SPEC.md` + `PLAN.md` (+ leader context).

1. Verify every SPEC goal maps to ≥1 PLAN step; flag gaps to leader.
2. Elaborate each step to executable granularity:
   - exact files to create/edit, commands (`bun …`), expected outputs, rollback notes.
   - file skeletons for new modules (exports, types, no bodies where reviewer-owned).
   - acceptance check per step (command + expected string).
3. Cross-check: AGENTS.md constraints, shared code style (§1–7), Storybook co-delivery (Phase 1+),
   common done gates, stacked base branch.
4. Write back refined `PLAN.md` (Korean, keep SPEC untouched without leader approval).
5. Reply `PLAN-READY <phase> <open questions|none>`.

Rules: analysis + PLAN.md edits only. No product code. No SPEC edits (propose via leader).

## Part B — Code review (after `PR-DRAFT`, while the PR is still draft)

Review the **draft** PR. Do not ask the developer to mark it ready first.

Review bar (all must pass for APPROVE):

1. **Correctness**: SPEC goals met, acceptance checks reproducible.
2. **Style**: shared-code-style §1–7 (guard-first, ≤2 nesting, arrows, object params, `undefined`, array methods, `as const`); Korean test titles; English LLM docs.
3. **Contracts**: StyleX variant-prop discipline (no external reopen), Astro patterns (no `getStaticProps`/`next/*`), Storybook stories co-delivered.
4. **Gates**: `bun run check`, `oxfmt --check`, `oxlint`, `vitest` evidence in PR body (real output, not copied).
5. **PR body**: follows [`docs/conventions/prs.md`](../../docs/conventions/prs.md) — why, effect, Mermaid AS-IS/TO-BE, scope/follow-up. File lists and empty tables are CHANGES.
6. **Safety**: leak-guard issues (visibility, secrets, private paths) — flag as BLOCKING.

Verdict format to leader: `REVIEW <APPROVE|CHANGES> <phase> <PR#>` + findings list (file:line + reason + suggested fix).
Max 2 review rounds on the draft; 3rd round escalates to leader → orchestrator (human decides: accept, re-scope, or swap approach).
On `APPROVE`, the developer (PR author) marks the PR ready. Reviewers do not flip draft themselves.
