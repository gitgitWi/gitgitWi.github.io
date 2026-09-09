import Tag from './Tag.astro';

export default {
  title: 'ui/Tag',
  component: Tag,
};

export const Default = {
  args: {
    href: '/tags/astro',
    slots: {
      default: 'Astro',
    },
  },
};

export const Static = {
  args: {
    slots: {
      default: '비활성 태그',
    },
  },
};
