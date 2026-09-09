import Heading from "./Heading.astro";

export default {
  title: "ui/Heading",
  component: Heading,
};

export const Default = {
  args: {
    level: 1,
    slots: {
      default: "페이지 제목",
    },
  },
};

export const Level3 = {
  args: {
    level: 3,
    slots: {
      default: "섹션 제목",
    },
  },
};
