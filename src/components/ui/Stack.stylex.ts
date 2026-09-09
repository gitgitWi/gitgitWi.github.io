import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const stackStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  gapSm: {
    gap: tokens.space.sm,
  },
  gapMd: {
    gap: tokens.space.md,
  },
  gapLg: {
    gap: tokens.space.lg,
  },
});
