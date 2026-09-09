import MdxPre from "./MdxPre.astro";

export default {
  title: "content/MdxPre",
  component: MdxPre,
};

export const TypeScript = {
  args: {
    class: "language-typescript",
    slots: {
      default: '<code class="language-typescript">const hello = () =&gt; `World!`;</code>',
    },
  },
};

export const Bash = {
  args: {
    class: "language-bash",
    slots: {
      default: '<code class="language-bash">bun run dev\nbun run build</code>',
    },
  },
};
