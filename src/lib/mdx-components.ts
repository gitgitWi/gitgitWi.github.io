import MdxPre from "../components/content/MdxPre.astro";
import SmartLink from "../components/content/SmartLink.astro";
import TableCard from "../components/content/TableCard.astro";

export const mdxComponents = {
  a: SmartLink,
  pre: MdxPre,
  table: TableCard,
} as const;
