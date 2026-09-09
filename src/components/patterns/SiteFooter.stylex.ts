import * as stylex from '@stylexjs/stylex';

import { tokens } from '../../styles/tokens.stylex.ts';

export const siteFooterStyles = stylex.create({
  footer: {
    marginTop: tokens.space.xl,
    paddingBlock: tokens.space.lg,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.color.hairline,
    color: tokens.color.muted,
    fontSize: tokens.fontSize.sm,
    textAlign: 'center',
  },
});
