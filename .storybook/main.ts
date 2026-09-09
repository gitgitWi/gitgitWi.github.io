import type { StorybookConfig } from '@storybook-astro/framework';
import stylex from '@stylexjs/unplugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook-astro/framework',
    options: {},
  },
  async viteFinal(config) {
    config.plugins = config.plugins ?? [];
    config.plugins.unshift(
      stylex.vite({
        useCSSLayers: true,
        runtimeInjection: false,
      }),
    );
    return config;
  },
};

export default config;
