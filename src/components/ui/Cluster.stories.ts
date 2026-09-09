import Cluster from './Cluster.astro';
import Tag from './Tag.astro';

export default {
  title: 'ui/Cluster',
  component: Cluster,
};

export const Default = {
  args: {
    gap: 'sm',
    slots: {
      default: [
        { component: Tag, props: { href: '/tags/astro' }, slots: { default: 'Astro' } },
        { component: Tag, props: { href: '/tags/stylex' }, slots: { default: 'StyleX' } },
        { component: Tag, slots: { default: 'Draft' } },
      ],
    },
  },
};

export const LargeGap = {
  args: {
    gap: 'lg',
    slots: {
      default: [
        { component: Tag, props: { href: '/tags/web' }, slots: { default: 'Web' } },
        { component: Tag, props: { href: '/tags/css' }, slots: { default: 'CSS' } },
      ],
    },
  },
};
