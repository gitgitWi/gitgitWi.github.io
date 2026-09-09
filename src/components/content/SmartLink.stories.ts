import SmartLink from "./SmartLink.astro";

export default {
  title: "content/SmartLink",
  component: SmartLink,
};

export const Internal = {
  args: {
    href: "/articles/hello",
    slots: {
      default: "내부 기사 링크",
    },
  },
};

export const External = {
  args: {
    href: "https://docs.astro.build",
    slots: {
      default: "Astro 문서",
    },
  },
};
