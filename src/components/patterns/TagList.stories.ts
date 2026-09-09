import TagList from "./TagList.astro";

export default {
  title: "patterns/TagList",
  component: TagList,
};

export const Default = {
  args: {
    tags: [
      { slug: "astro", label: "Astro" },
      { slug: "stylex", label: "StyleX" },
      { slug: "web", label: "Web" },
    ],
  },
};

export const SingleTag = {
  args: {
    tags: [{ slug: "til", label: "TIL" }],
  },
};
