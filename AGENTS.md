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

## 2. Hard constraints

- No work on unapproved phases (see ROADMAP approval flow).
- pm = bun (`bun install/add/run`), Node 22 kept for Astro runtime. Never reintroduce yarn/npm lockfiles.
- Astro Docs MCP first (`https://mcp.docs.astro.build/mcp`) — verify APIs there before coding.

## 3. Commands

`bun install` · `bun run dev|build|preview|check` · `bunx prettier --check .` · `bunx eslint .` · `bunx vitest run`

## 4. Done gates (every change)

`check` + `format` + `lint` + `test` green → then PR. CI (`.github/workflows/ci.yml`) enforces the same.

## 5. Workflow

- Branch per phase: `feat/phase-N-*`, stacked (`--base` = parent phase branch). See ROADMAP.
- Multi-agent: role contracts in `.tasks/playbook/`; spawn/models in `.tasks/playbook/harness/` (one harness per phase). Cursor default: [harness/cursor.md](.tasks/playbook/harness/cursor.md).
- Commits: [`docs/conventions/commits.md`](docs/conventions/commits.md) — logical units, conventional, Korean. Body 1–2 lines, max 3.
- PRs/comments in Korean. Test titles in Korean (`describe` = symbol name).

## 6. Links

- Astro: https://docs.astro.build · StyleX: https://stylexjs.com · Storybook (Phase 1+): local `bun run storybook`
- `llm-wiki-template`: https://github.com/gitgitWi/llm-wiki-template (wiki content source, `visibility` gate applies)
