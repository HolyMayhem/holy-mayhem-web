export const site = {
  name: "Holy Mayhem",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, ""),
  copyrightYear: 2026,
  github: "https://github.com/HolyMayhem",
  support: "https://pay.cloudtips.ru/p/8b994ba5",
};
export function assetPath(path: string) {
  return `${site.basePath}${path}`;
}
export function absoluteUrl(path: string) {
  return `${site.url}${site.basePath}${path}`;
}
