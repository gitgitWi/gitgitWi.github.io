import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { articleSchema, tilSchema } from "./lib/content-schemas.ts";

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: articleSchema,
});

const til = defineCollection({
  loader: glob({ base: "./src/content/til", pattern: "**/*.{md,mdx}" }),
  schema: tilSchema,
});

export const collections = { articles, til };
