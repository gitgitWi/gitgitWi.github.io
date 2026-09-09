export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const DEFAULT_OG_PATH = "/og/default.png";

export type OgImageInput = {
  title: string;
  subtitle?: string;
};

const escapeXml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const truncate = (value: string, max: number): string =>
  value.length <= max ? value : `${value.slice(0, max - 1)}…`;

export const ogImageId = (kind: "article" | "til", id: string): string => `${kind}-${id}`;

export const ogImagePath = (id?: string): string =>
  id ? `/og/${id.replaceAll("/", "-")}.png` : DEFAULT_OG_PATH;

export const buildOgSvg = ({ title, subtitle }: OgImageInput): string => {
  const safeTitle = escapeXml(truncate(title, 72));
  const safeSubtitle = escapeXml(truncate(subtitle ?? "gitgitWi", 96));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6f1e8"/>
      <stop offset="100%" stop-color="#e8f0ea"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="64" y="64" width="1072" height="502" rx="24" fill="#fffdf8" stroke="#d4c4b0" stroke-width="2"/>
  <text x="120" y="220" fill="#2b2118" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="56" font-weight="700">${safeTitle}</text>
  <text x="120" y="300" fill="#5c4f44" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="32">${safeSubtitle}</text>
  <text x="120" y="480" fill="#8a7a6c" font-family="Geist Mono, monospace" font-size="28">gitgitwi.github.io</text>
</svg>`;
};
