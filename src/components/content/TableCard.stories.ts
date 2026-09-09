import TableCard from "./TableCard.astro";

export default {
  title: "content/TableCard",
  component: TableCard,
};

export const Default = {
  args: {
    slots: {
      default: `<thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>StyleX</td><td>토큰 기반 스타일</td></tr><tr><td>Astro</td><td>정적 콘텐츠 렌더</td></tr></tbody>`,
    },
  },
};
