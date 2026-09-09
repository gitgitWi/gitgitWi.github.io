import rss from "@astrojs/rss";

import {
  getPublishedArticles,
  getPublishedTil,
  sortListItemsByPubDateDesc,
  toArticleListItem,
  toTilListItem,
} from "../lib/content.ts";

export const GET = async (context: { site: URL | undefined }) => {
  const [articles, tilEntries] = await Promise.all([getPublishedArticles(), getPublishedTil()]);
  const items = [...articles.map(toArticleListItem), ...tilEntries.map(toTilListItem)]
    .sort(sortListItemsByPubDateDesc)
    .slice(0, 30);

  return rss({
    title: "gitgitWi",
    description: "Astro, TypeScript, 디자인 시스템에 관한 글과 위키",
    site: context.site ?? "https://gitgitwi.github.io",
    items: items.map((item) => ({
      title: item.title,
      description: item.summary,
      pubDate: item.pubDate,
      link: item.href,
    })),
  });
};
