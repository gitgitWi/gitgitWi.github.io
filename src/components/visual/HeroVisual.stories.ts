import HeroVisual from "./HeroVisual.astro";

export default {
  title: "visual/HeroVisual",
  component: HeroVisual,
  parameters: {
    docs: {
      description: {
        component:
          "SVG/CSS 폴백. Home은 이 컴포넌트 안에 HeroCanvas를 client:visible로 얹습니다. Storybook·reduced-motion·768px 이하는 WebGL을 올리지 않습니다.",
      },
    },
  },
};

/** SVG/CSS 폴백 — reduced-motion·좁은 뷰포트와 동일 */
export const Fallback = {
  args: {},
};
