import ArticleLayout from "./ArticleLayout.astro";

export default {
  title: "layout/ArticleLayout",
  component: ArticleLayout,
};

export const Essay = {
  args: {
    title: "에세이 레이아웃 샘플",
    description: "Prose 중앙 정렬과 우측 TOC를 확인하는 짧은 기사입니다.",
    pubDate: new Date("2022-03-01"),
    tags: ["astro", "migration"],
    colorway: "canvas",
    layout: "essay",
    headings: [
      { depth: 2, slug: "intro", text: "소개" },
      { depth: 2, slug: "next", text: "다음" },
    ],
    slots: {
      default: '<h2 id="intro">소개</h2><p>본문 슬롯입니다.</p>',
    },
  },
};

export const DocsClay = {
  args: {
    title: "Docs + clay colorway",
    description: "좌측 TOC와 clay accent bar 조합.",
    pubDate: new Date("2022-02-03"),
    colorway: "clay",
    layout: "docs",
    headings: [{ depth: 2, slug: "setup", text: "설정" }],
    slots: {
      default: '<h2 id="setup">설정</h2><p>docs 레이아웃 본문.</p>',
    },
  },
};

export const GalleryMint = {
  args: {
    title: "Gallery + mint colorway",
    description: "커버 그리드 상단 배치.",
    pubDate: new Date("2022-01-15"),
    colorway: "mint",
    layout: "gallery",
    cover:
      "https://user-images.githubusercontent.com/57997672/156254919-f4795507-1ecf-4e88-b8ef-a037ab071169.gif",
    slots: {
      default: "<p>gallery 본문 슬롯.</p>",
    },
  },
};
