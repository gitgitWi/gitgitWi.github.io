import PostCard from "./PostCard.astro";

export default {
  title: "content/PostCard",
  component: PostCard,
};

export const Default = {
  args: {
    title: "StyleX 토큰으로 디자인 경계 고정하기",
    date: "2026-09-05",
    summary: "variant prop 계약과 토큰 레이어로 UI 프리미티브를 정리했습니다.",
    tags: ["stylex", "design-system"],
    readingTime: "5 min read",
  },
};
