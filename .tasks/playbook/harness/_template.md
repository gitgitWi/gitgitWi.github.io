# Harness template

> Copy to `harness/<name>.md`. Delete this callout. Status: stub until spawn is verified live — then change to `live` and date the pin.

## When to use

- Product / CLI:
- Session entry (what the human opens):

## Topology mapping

Map **logical roles** (`../orchestrator.md` …) onto this product’s processes. Folding is allowed; dropping LOG/gates is not.

| Role | This harness | Notes |
|---|---|---|
| orchestrator | | |
| leader | | |
| planner | | |
| developer | | |
| (optional) verifier | | |

## Isolation

- Default checkout:
- Parallel work:
- Cloud / remote:

## Model pinning

| Role | ID / invocation | Rationale | Verified |
|---|---|---|---|
| leader | | | |
| planner | | | |
| developer | | | |

Fallback if a pin 404s or quota-exhausts: … (log substitution in LOG.md).

## Spawn sequence

```text
# numbered steps the orchestrator actually runs
# must include: developer opens --draft (PR-DRAFT) → review → gh pr ready (PR-READY)
```

## MCP / skills this harness must load

- Astro Docs MCP: `https://mcp.docs.astro.build/mcp` — how this product registers it:

## Failure handling

- Blocked approval UI:
- Stall / timeout:
- Quota / model dead:

## Do not

- Invent a second multiplexer.
- Edit role contracts here — link them.
