import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const wikiSidebarStyles = stylex.create({
  aside: {
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
    gap: tokens.space[1],
  },
  link: {
    display: "block",
    paddingBlock: tokens.space[2],
    paddingInline: tokens.space[3],
    color: {
      default: tokens.color.inkSecondary,
      ":hover": tokens.color.accentInk,
    },
    backgroundColor: {
      default: null,
      ":hover": tokens.color.accentSoft,
    },
    textDecoration: "none",
    borderRadius: tokens.radius.sm,
    transitionProperty: "color, background-color",
    transitionDuration: tokens.duration.fast,
  },
  linkActive: {
    color: tokens.color.accentInk,
    backgroundColor: tokens.color.accentSoft,
    fontWeight: 500,
  },
});
