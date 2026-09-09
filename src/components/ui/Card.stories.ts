import Card from './Card.astro';
import Text from './Text.astro';

export default {
  title: 'ui/Card',
  component: Card,
};

export const Default = {
  args: {
    padding: 'md',
    slots: {
      default: {
        component: Text,
        props: { variant: 'body' },
        slots: { default: '카드 본문입니다.' },
      },
    },
  },
};

export const Compact = {
  args: {
    padding: 'sm',
    slots: {
      default: {
        component: Text,
        props: { variant: 'muted' },
        slots: { default: '작은 패딩 카드' },
      },
    },
  },
};
