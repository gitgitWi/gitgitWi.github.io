# Commit Convention

> English document (LLM-facing). Commit **messages** are Korean — see Language in [`code-style.md`](code-style.md).
> Agents: one logical unit per commit. Do not squash unrelated files into one commit.

## Rules

1. **Atomic** — one reason to change. Split playbook vs convention vs CI pins. Do not use `git add -p`; split at file groups.
2. **Conventional Commits** — `type(scope): subject`
   - `type`: `feat` · `fix` · `docs` · `refactor` · `test` · `chore` · `perf` · `ci` · `style` · `build`
   - `scope`: optional, short (`playbook`, `phase-1`, `conventions`)
   - subject: Korean, imperative, **why** not a file list
3. **Body** — omit when the subject is enough. Otherwise **1–2 lines, max 3**. What changed, not a diary.

## Layout

```text
docs(playbook): 하니스별 오케스트레이션을 분리한다

역할 계약은 공용으로 두고 스폰·모델만 harness/에 둔다.
```

## Examples

```text
# Good
docs(conventions): 커밋 규칙을 문서로 고정한다

에이전트가 논리 단위와 짧은 본문을 같은 기준으로 쓰게 한다.

# Bad — file dump, English subject, long body
docs: update AGENTS.md and playbook and ROADMAP

- added commits.md
- changed prettier to oxfmt
- also fixed bun.lockb
- updated phase 1 and 4
```

`fix:` when behavior was wrong or missing. `feat:` only for a capability that did not exist. Docs/tooling pins are `docs:` or `chore:`.
