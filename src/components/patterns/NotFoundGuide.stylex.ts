import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const notFoundGuideStyles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.space[8],
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.space[3],
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  legacyNote: {
    padding: tokens.space[4],
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.surfaceMuted,
    color: tokens.color.inkTertiary,
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.body,
  },
});
