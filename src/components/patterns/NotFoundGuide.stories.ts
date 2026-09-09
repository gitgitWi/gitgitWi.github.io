import NotFoundGuide from "./NotFoundGuide.astro";

export default {
  title: "patterns/NotFoundGuide",
  component: NotFoundGuide,
};

export const Default = {
  args: {
    requestedPath: "/posts/hello",
    popularPosts: [
      {
        id: "hello",
        title: "Hello Astro",
        summary: "블로그 이전 첫 글",
        pubDate: new Date("2024-01-01"),
        tags: ["astro"],
        href: "/articles/hello",
        kind: "article",
      },
    ],
    tags: [{ slug: "astro", label: "Astro", count: 2 }],
  },
};
