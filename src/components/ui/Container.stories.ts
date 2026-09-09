import Container from "./Container.astro";
import Text from "./Text.astro";

export default {
  title: "ui/Container",
  component: Container,
};

export const Default = {
  args: {
    width: "default",
    slots: {
      default: {
        component: Text,
        props: { variant: "body" },
        slots: { default: "기본 너비 컨테이너" },
      },
    },
  },
};

export const Narrow = {
  args: {
    width: "narrow",
    slots: {
      default: {
        component: Text,
        props: { variant: "body" },
        slots: { default: "좁은 컨테이너" },
      },
    },
  },
};
