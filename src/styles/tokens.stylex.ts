import * as stylex from '@stylexjs/stylex';

export const tokens = stylex.unstable_defineVarsNested({
  color: {
    paper: '#FAFAF8',
    ink: '#1A1A18',
    muted: '#6B6964',
    hairline: '#E8E6E1',
    accent: '#3F6B5A',
    accentInk: '#FAFAF8',
  },
  space: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2.5rem' },
  fontSize: { sm: '0.875rem', md: '1rem', lg: '1.25rem', xl: '1.75rem', '2xl': '2.25rem' },
  radius: { sm: '4px', md: '8px' },
  lineHeight: { tight: '1.25', body: '1.6' },
} as const);
