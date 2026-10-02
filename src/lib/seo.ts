import { DEFAULT_OG_PATH, ogImagePath } from "./og.ts";

const SITE_NAME = "gitgitWi";
const SITE_ORIGIN = "https://gitgitwi.github.io";
const AUTHOR_NAME = "gitgitWi";

export type JsonLd = Record<string, unknown>;

export type PageSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImagePath?: string;
  ogType?: "website" | "article";
  jsonLd?: JsonLd | JsonLd[];
  noindex?: boolean;
};

export const buildCanonicalUrl = (pathname: string): string => new URL(pathname, SITE_ORIGIN).href;

export const resolveOgImageUrl = (ogImagePath?: string): string =>
  new URL(ogImagePath ?? DEFAULT_OG_PATH, SITE_ORIGIN).href;

export const buildDefaultPageSeo = (
  title: string,
  description: string,
  pathname: string,
): PageSeo => ({
  title,
  description,
  canonicalPath: pathname,
  ogImagePath: DEFAULT_OG_PATH,
  ogType: "website",
});

type ArticleJsonLdInput = {
  title: string;
  description: string;
  pathname: string;
  pubDate: Date;
  updatedDate?: Date;
  ogImage?: string;
};

export const buildBlogPostingJsonLd = ({
  title,
  description,
  pathname,
  pubDate,
  updatedDate,
  ogImage,
}: ArticleJsonLdInput): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: pubDate.toISOString(),
  dateModified: (updatedDate ?? pubDate).toISOString(),
  author: { "@type": "Person", name: AUTHOR_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
  mainEntityOfPage: buildCanonicalUrl(pathname),
  image: resolveOgImageUrl(ogImage),
});

export const buildTechArticleJsonLd = ({
  title,
  description,
  pathname,
  pubDate,
  updatedDate,
  ogImage,
}: ArticleJsonLdInput): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description,
  datePublished: pubDate.toISOString(),
  dateModified: (updatedDate ?? pubDate).toISOString(),
  author: { "@type": "Person", name: AUTHOR_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
  mainEntityOfPage: buildCanonicalUrl(pathname),
  image: resolveOgImageUrl(ogImage),
});

export const ogPathForContent = (kind: "article" | "til", id: string): string =>
  ogImagePath(`${kind}-${id.replaceAll("/", "-")}`);
