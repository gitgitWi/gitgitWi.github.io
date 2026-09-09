import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const buttonStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.space[2],
    paddingBlock: tokens.space[2],
    paddingInline: tokens.space[4],
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.sans,
    fontWeight: 500,
    lineHeight: tokens.lineHeight.tight,
    borderRadius: tokens.radius.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: tokens.duration.fast,
  },
  primary: {
    backgroundColor: {
      default: tokens.color.accentInk,
      ":hover": tokens.color.ink,
    },
    color: tokens.color.canvas,
    borderColor: tokens.color.accentInk,
  },
  secondary: {
    backgroundColor: {
      default: "transparent",
      ":hover": tokens.color.accentSoft,
    },
    color: tokens.color.accentInk,
    borderColor: tokens.color.border,
  },
});
