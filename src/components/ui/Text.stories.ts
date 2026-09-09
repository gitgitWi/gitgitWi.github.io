import Text from './Text.astro';

export default {
  title: 'ui/Text',
  component: Text,
};

export const Default = {
  args: {
    variant: 'body',
    slots: {
      default: '본문 텍스트입니다.',
    },
  },
};

export const Muted = {
  args: {
    variant: 'muted',
    slots: {
      default: '보조 설명 텍스트입니다.',
    },
  },
};
