import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const colorwaySchema = z.enum(["canvas", "mint", "clay", "ink"]);

const articleThemeSchema = z.object({
  colorway: colorwaySchema.default("canvas"),
  layout: z.enum(["essay", "gallery", "docs"]).default("essay"),
  density: z.enum(["compact", "comfortable", "spacious"]).default("comfortable"),
});

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    theme: articleThemeSchema.default({
      colorway: "canvas",
      layout: "essay",
      density: "comfortable",
    }),
    cover: z.url().optional(),
  }),
});

const til = defineCollection({
  loader: glob({ base: "./src/content/til", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    domains: z.array(z.string()).optional(),
    visibility: z.enum(["public", "private"]).default("public"),
    quizRefs: z.array(z.string()).optional(),
  }),
});

export const collections = { articles, til };
