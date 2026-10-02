import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const smartLinkStyles = stylex.create({
  link: {
    color: tokens.color.accentInk,
    textDecoration: {
      default: "underline",
      ":hover": "none",
    },
    textUnderlineOffset: "3px",
  },
  external: {
    "::after": {
      content: '" ↗"',
      fontSize: "0.85em",
    },
  },
});
