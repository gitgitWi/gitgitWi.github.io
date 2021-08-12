// @ts-check
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMdx = require("@next/mdx")({
  extension: /\.mdx$/,
});

module.exports = withMdx({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
