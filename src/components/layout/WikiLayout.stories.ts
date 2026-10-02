import WikiLayout from "./WikiLayout.astro";

export default {
  title: "layout/WikiLayout",
  component: WikiLayout,
};

export const Default = {
  args: {
    title: "Getting Started",
    summary: "위키 고정 레이아웃 — 제목·요약·메타·TOC·본문·prev/next.",
    pubDate: new Date("2023-06-01"),
    tags: ["wiki", "astro"],
    domains: ["dev"],
    headings: [
      { depth: 2, slug: "intro", text: "Intro" },
      { depth: 2, slug: "next", text: "Next" },
    ],
    prev: { href: "/til/mock", label: "이전 글" },
    next: { href: "/til/mock", label: "다음 글" },
    slots: {
      default: '<h2 id="intro">Intro</h2><p>WikiLayout 본문 슬롯.</p>',
    },
  },
};

export const WithQuizRefs = {
  args: {
    title: "Quiz refs 샘플",
    summary: "quizRefs 링크 목록이 하단에 표시됩니다.",
    pubDate: new Date("2023-06-01"),
    quizRefs: ["/quiz/sample-1", "/quiz/sample-2"],
    slots: {
      default: "<p>Phase 3 quiz UI 연결 전 placeholder.</p>",
    },
  },
};
