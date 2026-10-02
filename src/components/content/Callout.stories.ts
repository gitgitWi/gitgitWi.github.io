import Callout from "./Callout.astro";

export default {
  title: "content/Callout",
  component: Callout,
};

export const Tip = {
  args: {
    variant: "tip",
    slots: {
      default: "Tip callout은 accent soft 배경으로 강조합니다.",
    },
  },
};

export const Note = {
  args: {
    variant: "note",
    slots: {
      default: "Note callout은 본문과 자연스럽게 이어집니다.",
    },
  },
};
