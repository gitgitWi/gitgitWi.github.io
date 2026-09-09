import { getCollection, type CollectionEntry } from "astro:content";

import {
  type ContentListItem,
  sortByPubDateDesc,
  sortListItemsByPubDateDesc,
} from "./content-helpers.ts";

export type { ContentListItem, TagIndexEntry } from "./content-helpers.ts";
export {
  buildTagIndex,
  filterByTag,
  formatDisplayDate,
  sortByPubDateDesc,
  sortListItemsByPubDateDesc,
} from "./content-helpers.ts";

export type ArticleEntry = CollectionEntry<"articles">;
export type TilEntry = CollectionEntry<"til">;

export const isPublished = (
  entry: CollectionEntry<"articles"> | CollectionEntry<"til">,
): boolean => {
  if (import.meta.env.PROD) {
    if ("draft" in entry.data && entry.data.draft) return false;
    if ("visibility" in entry.data && entry.data.visibility !== "public") return false;
  }
  return true;
};

export const getPublishedArticles = async (): Promise<ArticleEntry[]> => {
  const entries = await getCollection("articles");
  return entries.filter(isPublished).sort(sortByPubDateDesc);
};

export const getPublishedTil = async (): Promise<TilEntry[]> => {
  const entries = await getCollection("til");
  return entries.filter(isPublished).sort(sortByPubDateDesc);
};

export const toArticleListItem = (entry: ArticleEntry): ContentListItem => ({
  id: entry.id,
  title: entry.data.title,
  summary: entry.data.description,
  pubDate: entry.data.pubDate,
  tags: entry.data.tags,
  href: `/articles/${entry.id}`,
  kind: "article",
});

export const toTilListItem = (entry: TilEntry): ContentListItem => ({
  id: entry.id,
  title: entry.data.title,
  summary: entry.data.summary,
  pubDate: entry.data.pubDate,
  tags: entry.data.tags,
  href: `/til/${entry.id}`,
  kind: "til",
});

export const getRecentPosts = async (limit = 6): Promise<ContentListItem[]> => {
  const [articles, tilEntries] = await Promise.all([getPublishedArticles(), getPublishedTil()]);
  return [...articles.map(toArticleListItem), ...tilEntries.map(toTilListItem)]
    .sort(sortListItemsByPubDateDesc)
    .slice(0, limit);
};

export const getAllTaggedItems = async (): Promise<ContentListItem[]> => {
  const [articles, tilEntries] = await Promise.all([getPublishedArticles(), getPublishedTil()]);
  return [...articles.map(toArticleListItem), ...tilEntries.map(toTilListItem)].sort(
    sortListItemsByPubDateDesc,
  );
};

export const findAdjacentTil = (
  entries: TilEntry[],
  currentId: string,
): { prev?: TilEntry; next?: TilEntry } => {
  const sorted = [...entries].sort(sortByPubDateDesc);
  const index = sorted.findIndex((entry) => entry.id === currentId);
  if (index === -1) return {};
  return {
    prev: sorted[index - 1],
    next: sorted[index + 1],
  };
};
