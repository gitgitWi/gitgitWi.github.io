import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const tableCardStyles = stylex.create({
  wrapper: {
    overflowX: "auto",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.color.border,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.surface,
    marginBlock: tokens.space[6],
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.body,
  },
  cell: {
    padding: tokens.space[3],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.color.border,
    textAlign: "left",
    verticalAlign: "top",
  },
  headCell: {
    fontFamily: tokens.fontFamily.mono,
    fontSize: tokens.fontSize.sm,
    color: tokens.color.inkSecondary,
    backgroundColor: tokens.color.surfaceMuted,
  },
});
