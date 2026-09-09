import ColorwayShell from "./ColorwayShell.astro";
import Text from "../ui/Text.astro";

export default {
  title: "patterns/ColorwayShell",
  component: ColorwayShell,
};

export const Default = {
  args: {
    colorway: "canvas",
    slots: {
      default: {
        component: Text,
        props: { variant: "body" },
        slots: { default: "Canvas 컬러웨이 (#F7F5EE)" },
      },
    },
  },
};

export const Mint = {
  args: {
    colorway: "mint",
    slots: {
      default: {
        component: Text,
        props: { variant: "body" },
        slots: { default: "Mint 컬러웨이 (스텁)" },
      },
    },
  },
};
