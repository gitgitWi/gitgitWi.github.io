import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const calloutStyles = stylex.create({
  base: {
    padding: tokens.space[4],
    marginBlock: tokens.space[6],
    borderRadius: tokens.radius.md,
    borderWidth: "1px",
    borderStyle: "solid",
    borderLeftWidth: "3px",
  },
  note: {
    backgroundColor: tokens.color.surface,
    borderColor: tokens.color.border,
    borderLeftColor: tokens.color.borderStrong,
  },
  tip: {
    backgroundColor: tokens.color.accentSoft,
    borderColor: tokens.color.accentSoft,
    borderLeftColor: tokens.color.accent,
  },
  warning: {
    backgroundColor: "#FEF3E7",
    borderColor: "#F5E6D3",
    borderLeftColor: "#D97706",
  },
  title: {
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.mono,
    fontWeight: 500,
    color: tokens.color.ink,
    marginBottom: tokens.space[2],
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  body: {
    fontSize: tokens.fontSize.md,
    color: tokens.color.inkSecondary,
    lineHeight: tokens.lineHeight.body,
    fontFamily: tokens.fontFamily.sans,
  },
});
