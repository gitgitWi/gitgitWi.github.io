import * as stylex from '@stylexjs/stylex';

import { tokens } from '../../styles/tokens.stylex.ts';

export const tagStyles = stylex.create({
  base: {
    display: 'inline-block',
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.tight,
    paddingBlock: tokens.space.xs,
    paddingInline: tokens.space.sm,
    borderRadius: tokens.radius.sm,
    backgroundColor: tokens.color.hairline,
    color: tokens.color.ink,
    textDecoration: 'none',
  },
  interactive: {
    backgroundColor: {
      default: null,
      ':hover': tokens.color.accent,
    },
    color: {
      default: null,
      ':hover': tokens.color.accentInk,
    },
  },
});
