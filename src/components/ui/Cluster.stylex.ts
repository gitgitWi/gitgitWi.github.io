import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const clusterStyles = stylex.create({
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
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
});
