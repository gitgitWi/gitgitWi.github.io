import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const searchPanelStyles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.space[4],
  },
  note: {
    color: tokens.color.inkTertiary,
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.body,
  },
  mount: {
    minHeight: "12rem",
  },
});
