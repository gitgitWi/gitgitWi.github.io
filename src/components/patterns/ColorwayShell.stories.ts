import ColorwayShell from './ColorwayShell.astro';
import Text from '../ui/Text.astro';

export default {
  title: 'patterns/ColorwayShell',
  component: ColorwayShell,
};

export const Default = {
  args: {
    colorway: 'paper',
    slots: {
      default: {
        component: Text,
        props: { variant: 'body' },
        slots: { default: 'Paper 컬러웨이' },
      },
    },
  },
};

export const Sage = {
  args: {
    colorway: 'sage',
    slots: {
      default: {
        component: Text,
        props: { variant: 'body' },
        slots: { default: 'Sage 컬러웨이 (스텁)' },
      },
    },
  },
};
