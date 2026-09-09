import Stack from './Stack.astro';
import Text from './Text.astro';

export default {
  title: 'ui/Stack',
  component: Stack,
};

export const Default = {
  args: {
    gap: 'md',
    slots: {
      default: [
        { component: Text, props: { variant: 'body' }, slots: { default: '첫 번째' } },
        { component: Text, props: { variant: 'body' }, slots: { default: '두 번째' } },
      ],
    },
  },
};

export const LargeGap = {
  args: {
    gap: 'lg',
    slots: {
      default: [
        { component: Text, props: { variant: 'body' }, slots: { default: '위' } },
        { component: Text, props: { variant: 'muted' }, slots: { default: '아래' } },
      ],
    },
  },
};
