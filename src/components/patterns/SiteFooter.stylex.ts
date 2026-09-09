import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const siteFooterStyles = stylex.create({
  footer: {
    marginTop: tokens.space[16],
    paddingBlock: tokens.space[8],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.color.border,
    color: tokens.color.inkTertiary,
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.sans,
    textAlign: "center",
  },
});
