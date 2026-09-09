# Harness docs

Each file in this folder is **one spawn protocol**. Role contracts stay in `../`.

## Rule

- One harness per phase (record it on the first LOG.md line).
- Do not mix spawn protocols on the same branch.
- Models are pinned **here**, not in SPEC/PLAN. Swap a model in the harness file + LOG; do not fork the phase SPEC.
- Isolation is opt-in except where the file says otherwise. Shared checkouts + parallel editors overwrite each other.

## Live vs stub

| File | Status | Promote when |
|---|---|---|
| [cline-herdr.md](cline-herdr.md) | live | already verified |
| [cursor.md](cursor.md) | live | already the default in this repo’s Cursor sessions |
| [claude.md](claude.md) | stub | first Claude Code phase |
| [codex.md](codex.md) | stub | first Codex phase |

## Adding a harness

1. Copy [_template.md](_template.md) to `harness/<name>.md`.
2. Fill spawn, isolation, model table, fallback, failure handling.
3. Add executable agent defs in that product’s folder if it has one (`.cursor/agents/`, `.claude/agents/`, `.codex/agents/`). Cursor reads all three.
4. Add a row to [../README.md](../README.md).
5. Leave role files untouched unless a new **verb** is required (then update all roles + every live harness).
