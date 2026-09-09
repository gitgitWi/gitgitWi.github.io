import Button from "./Button.astro";

export default {
  title: "ui/Button",
  component: Button,
};

export const Primary = {
  args: {
    variant: "primary",
    slots: { default: "Browse posts" },
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    slots: { default: "Wiki" },
  },
};
