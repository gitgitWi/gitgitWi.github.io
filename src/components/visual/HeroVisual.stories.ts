import HeroVisual from "./HeroVisual.astro";

export default {
  title: "visual/HeroVisual",
  component: HeroVisual,
  parameters: {
    docs: {
      description: {
        component:
          "WebGL은 prefers-reduced-motion·768px 이하에서 생략됩니다. Storybook에서는 SVG 폴백만 표시됩니다.",
      },
    },
  },
};

/** SVG/CSS 폴백 — reduced-motion·좁은 뷰포트와 동일 */
export const Fallback = {
  args: {},
};
