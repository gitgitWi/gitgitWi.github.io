import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const containerStyles = stylex.create({
  base: {
    width: "100%",
    marginInline: "auto",
    paddingInline: tokens.space[5],
  },
  widthDefault: {
    maxWidth: tokens.layout.max,
  },
  widthNarrow: {
    maxWidth: tokens.layout.readingMax,
  },
  widthWide: {
    maxWidth: tokens.layout.wideReadingMax,
  },
});
