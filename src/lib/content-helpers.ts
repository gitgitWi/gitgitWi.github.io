export type ContentListItem = {
  id: string;
  title: string;
  summary: string;
  pubDate: Date;
  tags: string[];
  href: string;
  kind: "article" | "til";
};

export type TagIndexEntry = {
  slug: string;
  label: string;
  count: number;
};

export const sortByPubDateDesc = <T extends { data: { pubDate: Date } }>(a: T, b: T): number =>
  b.data.pubDate.getTime() - a.data.pubDate.getTime();

export const sortListItemsByPubDateDesc = (a: ContentListItem, b: ContentListItem): number =>
  b.pubDate.getTime() - a.pubDate.getTime();

const formatTagLabel = (slug: string): string =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const buildTagIndex = (items: ContentListItem[]): TagIndexEntry[] => {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, label: formatTagLabel(slug), count }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
};

export const filterByTag = (items: ContentListItem[], tagSlug: string): ContentListItem[] =>
  items.filter((item) => item.tags.includes(tagSlug));

export const formatDisplayDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};
