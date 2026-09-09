import stylex from '@stylexjs/eslint-plugin';

export default [
  {
    files: ['src/**/*.{ts,tsx,js,jsx,astro}'],
    plugins: {
      '@stylexjs': stylex,
    },
    rules: {
      '@stylexjs/valid-styles': 'error',
      '@stylexjs/no-unused': 'error',
    },
  },
];
