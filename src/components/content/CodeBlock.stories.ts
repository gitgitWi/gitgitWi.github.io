import CodeBlock from "./CodeBlock.astro";

const sampleCode = `const accent = "#16A36A";

function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

export default {
  title: "content/CodeBlock",
  component: CodeBlock,
};

export const TypeScript = {
  args: {
    lang: "typescript",
    code: sampleCode,
    showCopy: true,
  },
};

export const WithoutCopy = {
  args: {
    lang: "bash",
    code: "bun run build",
    showCopy: false,
  },
};
