import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const wikiLayoutStyles = stylex.create({
  grid: {
    display: "grid",
    gap: tokens.space[8],
    alignItems: "start",
  },
  gridWithSidebar: {
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 768px)": "200px minmax(0, 1fr)",
    },
  },
  sidebar: {
    display: {
      default: "none",
      "@media (min-width: 768px)": "block",
    },
  },
  main: {
    minWidth: 0,
  },
});
