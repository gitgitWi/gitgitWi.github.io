import * as stylex from '@stylexjs/stylex';

import { tokens } from '../../styles/tokens.stylex.ts';

export const containerStyles = stylex.create({
  base: {
    width: '100%',
    marginInline: 'auto',
    paddingInline: tokens.space.md,
  },
  widthDefault: {
    maxWidth: '72rem',
  },
  widthNarrow: {
    maxWidth: '42rem',
  },
});
