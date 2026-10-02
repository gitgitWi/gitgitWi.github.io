import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const tagStyles = stylex.create({
  base: {
    display: "inline-block",
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.mono,
    lineHeight: tokens.lineHeight.tight,
    paddingBlock: tokens.space[1],
    paddingInline: tokens.space[2],
    borderRadius: tokens.radius.pill,
    backgroundColor: tokens.color.surfaceMuted,
    color: tokens.color.ink,
    textDecoration: "none",
  },
  interactive: {
    backgroundColor: {
      default: null,
      ":hover": tokens.color.accentSoft,
    },
    color: {
      default: null,
      ":hover": tokens.color.accentInk,
    },
  },
});
