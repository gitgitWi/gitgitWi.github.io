import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const codeBlockStyles = stylex.create({
  wrapper: {
    position: "relative",
    marginBlock: tokens.space[6],
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: tokens.space[2],
    paddingInline: tokens.space[4],
    backgroundColor: tokens.color.surfaceMuted,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.color.codeBorder,
    borderBottomWidth: 0,
    borderTopLeftRadius: tokens.radius.md,
    borderTopRightRadius: tokens.radius.md,
  },
  lang: {
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.mono,
    color: tokens.color.inkTertiary,
    textTransform: "lowercase",
  },
  copyButton: {
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.mono,
    color: {
      default: tokens.color.inkSecondary,
      ":hover": tokens.color.accentInk,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": tokens.color.accentSoft,
    },
    borderWidth: 0,
    cursor: "pointer",
    padding: tokens.space[1],
    borderRadius: tokens.radius.sm,
    transitionProperty: "color, background-color",
    transitionDuration: tokens.duration.fast,
  },
  pre: {
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
