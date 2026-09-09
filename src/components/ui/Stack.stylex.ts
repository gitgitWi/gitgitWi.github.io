import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const stackStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  gapSm: {
    gap: tokens.space[2],
  },
  gapMd: {
    gap: tokens.space[4],
  },
  gapLg: {
    gap: tokens.space[6],
  },
  gapXl: {
    gap: tokens.space[10],
  },
});
