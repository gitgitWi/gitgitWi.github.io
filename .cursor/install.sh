#!/usr/bin/env bash
set -euo pipefail

# Install the pinned bun (matches packageManager in package.json) if missing.
BUN_VERSION="1.4.2"
if ! command -v bun >/dev/null 2>&1; then
  curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"
fi
export PATH="$HOME/.bun/bin:$PATH"

bun install --frozen-lockfile
