import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const articleLayoutStyles = stylex.create({
  grid: {
    display: "grid",
    gap: tokens.space[10],
    alignItems: "start",
  },
  gridWithToc: {
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 1024px)": "minmax(0, 1fr) 200px",
    },
  },
  main: {
    minWidth: 0,
  },
  toc: {
    display: {
      default: "none",
      "@media (min-width: 1024px)": "block",
    },
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space[2],
    alignItems: "center",
    fontFamily: tokens.fontFamily.mono,
    fontSize: tokens.fontSize.sm,
    color: tokens.color.inkTertiary,
    marginBottom: tokens.space[4],
  },
  title: {
    marginBottom: tokens.space[4],
  },
  description: {
    marginBottom: tokens.space[8],
  },
  gridDocs: {
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 1024px)": "200px minmax(0, 1fr)",
    },
  },
  tocLeft: {
    order: {
      default: 2,
      "@media (min-width: 1024px)": 0,
    },
    display: {
      default: "none",
      "@media (min-width: 1024px)": "block",
    },
  },
  essayMain: {
    maxWidth: tokens.layout.readingMax,
    marginInline: "auto",
    width: "100%",
  },
  coverGrid: {
    display: "grid",
    gap: tokens.space[6],
    marginBottom: tokens.space[8],
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 768px)": "minmax(180px, 280px) minmax(0, 1fr)",
    },
    alignItems: "start",
  },
  coverImage: {
    width: "100%",
    aspectRatio: "4 / 3",
    objectFit: "cover",
    borderRadius: tokens.radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.color.border,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space[2],
    marginTop: tokens.space[4],
  },
  densityCompact: {
    gap: tokens.space[6],
  },
  densitySpacious: {
    gap: tokens.space[12],
  },
  accentBarCanvas: {
    borderTopWidth: "3px",
    borderTopStyle: "solid",
    borderTopColor: tokens.color.accent,
    paddingTop: tokens.space[4],
  },
  accentBarMint: {
    borderTopWidth: "3px",
    borderTopStyle: "solid",
    borderTopColor: tokens.color.mintAccent,
    paddingTop: tokens.space[4],
  },
  accentBarClay: {
    borderTopWidth: "3px",
    borderTopStyle: "solid",
    borderTopColor: tokens.color.clayAccent,
    paddingTop: tokens.space[4],
  },
  accentBarInk: {
    borderTopWidth: "3px",
    borderTopStyle: "solid",
    borderTopColor: tokens.color.inkAccent,
    paddingTop: tokens.space[4],
  },
});
