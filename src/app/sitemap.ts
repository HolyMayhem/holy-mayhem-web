import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { locales, localizedPath } from "@/lib/i18n";
import { absoluteUrl } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    ...getProjects().map((p) => `/projects/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      alternates: {
        languages: {
          ru: absoluteUrl(localizedPath("ru", path)),
          en: absoluteUrl(localizedPath("en", path)),
        },
      },
    })),
  );
}
