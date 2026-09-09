# AGENTS.md — gitgitWi.github.io

> Canonical agent instructions. `CLAUDE.md` is a symlink to this file — do not edit it separately.
> This file stays minimal. Follow links for details. Language: English (repo convention).

## 1. Always read first

- `.tasks/ROADMAP.md` — roadmap, gates, approval flow (Korean).
- Current phase `.tasks/phase-N-*/SPEC.md` + `PLAN.md` — scope and steps.
- Multi-agent: `.tasks/playbook/README.md` (roles) + one file in `.tasks/playbook/harness/`.
- Code style: [`docs/conventions/code-style.md`](docs/conventions/code-style.md)
  (shared canonical + blog deltas). Do not edit inside the shared markers.
- Commits: [`docs/conventions/commits.md`](docs/conventions/commits.md)
- PRs: [`docs/conventions/prs.md`](docs/conventions/prs.md) (Korean, human-facing)

## 2. Hard constraints

- No work on unapproved phases (see ROADMAP approval flow).
- pm = bun (`bun install/add/run`), Node 22 kept for Astro runtime. Never reintroduce yarn/npm lockfiles.
- Astro Docs MCP first (`https://mcp.docs.astro.build/mcp`) — verify APIs there before coding.
- Astro skill: `.agents/skills/astro-publish/` (pinned in `PIN.md`). Prefer `bun astro add`. No `getStaticProps` / `next/link`.

## 3. Commands

`bun install` · `bun run dev|build|preview|check` · `bunx oxfmt --check .` · `bunx oxlint .` · `bunx vitest run`

## 4. Done gates (every change)

`check` + `format` + `lint` + `test` green → **draft** PR (`gh pr create --draft --assignee @me` + labels from [`prs.md`](docs/conventions/prs.md)). Reviewer/verifier on the draft; after `REVIEW APPROVE`, `gh pr ready`. CI (`.github/workflows/ci.yml`) enforces the same gates.

## 5. Workflow

- Branch per phase: `feat/phase-N-*`, stacked (`--base` = parent phase branch). Draft PR at phase complete; ready only after review. See ROADMAP.
- Multi-agent: role contracts in `.tasks/playbook/`; spawn/models in `.tasks/playbook/harness/` (one harness per phase). Cursor default: [harness/cursor.md](.tasks/playbook/harness/cursor.md).
- Commits: [`docs/conventions/commits.md`](docs/conventions/commits.md) — logical units, conventional, Korean. Body 1–2 lines, max 3.
- PRs: [`docs/conventions/prs.md`](docs/conventions/prs.md) — why / effect / design diagrams / scope. Assignee `@me`. Labels from that doc. Comments in Korean.
- Cursor review: GPT 5.6 Sol medium until OpenAI Cursor shutoff (**2026-11-12**). Then Grok. Human merges from Phase 1.
- Test titles in Korean (`describe` = symbol name).

## 6. Links

- Astro: https://docs.astro.build · StyleX: https://stylexjs.com · Storybook (Phase 1+): local `bun run storybook`
- Astro skill: `.agents/skills/astro-publish/` (`PIN.md`)
- `llm-wiki-template`: https://github.com/gitgitWi/llm-wiki-template (wiki content source, `visibility` gate applies)
