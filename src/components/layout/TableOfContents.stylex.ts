import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const tocStyles = stylex.create({
  nav: {
    position: "sticky",
    top: tokens.space[8],
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.sans,
  },
  title: {
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.mono,
    fontWeight: 500,
    color: tokens.color.inkTertiary,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: tokens.space[4],
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.space[2],
  },
  link: {
    color: {
      default: tokens.color.inkSecondary,
      ":hover": tokens.color.accent,
    },
    textDecoration: "none",
    lineHeight: tokens.lineHeight.tight,
    transitionProperty: "color",
    transitionDuration: tokens.duration.fast,
  },
  linkActive: {
    color: tokens.color.accentInk,
    fontWeight: 500,
  },
  depth2: {
    paddingLeft: tokens.space[3],
  },
});
