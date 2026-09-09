import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const cardStyles = stylex.create({
  base: {
    backgroundColor: tokens.color.paper,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.color.hairline,
    borderRadius: tokens.radius.md,
  },
  paddingSm: {
    padding: tokens.space.sm,
  },
  paddingMd: {
    padding: tokens.space.md,
  },
});
