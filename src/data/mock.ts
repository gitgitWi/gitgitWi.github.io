export const mockPosts = [
  {
    slug: 'hello-astro',
    title: 'Astro로 블로그를 옮기는 중',
    date: '2026-09-01',
    tags: ['astro', 'migration'],
    summary: 'Next.js에서 Astro static으로 전환하는 Phase 1 기록입니다.',
  },
  {
    slug: 'stylex-tokens',
    title: 'StyleX 토큰으로 디자인 경계 고정하기',
    date: '2026-09-05',
    tags: ['stylex', 'design-system'],
    summary: 'variant prop 계약과 토큰 레이어로 UI 프리미티브를 정리했습니다.',
  },
  {
    slug: 'tags-shell',
    title: 'Tags 껍데기를 먼저 연다',
    date: '2026-09-10',
    tags: ['astro', 'tags'],
    summary: 'Collections 전에 mock 데이터로 Home과 Tags 라우트를 검증합니다.',
  },
] as const;

export const mockTags = [
  { slug: 'astro', label: 'Astro' },
  { slug: 'stylex', label: 'StyleX' },
  { slug: 'design-system', label: 'Design System' },
  { slug: 'migration', label: 'Migration' },
  { slug: 'tags', label: 'Tags' },
] as const;

export type MockPost = (typeof mockPosts)[number];
export type MockTag = (typeof mockTags)[number];

type FilterPostsByTagArgs = {
  tagSlug: string;
};

export const filterPostsByTag = ({ tagSlug }: FilterPostsByTagArgs) =>
  mockPosts.filter((post) => post.tags.some((slug) => slug === tagSlug));
