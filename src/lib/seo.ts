import type { Metadata } from "next";
import { site, absoluteUrl } from "@/config/site";
import { localizedPath, type Locale } from "@/lib/i18n";
export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: absoluteUrl(localizedPath("ru", path)),
        en: absoluteUrl(localizedPath("en", path)),
        "x-default": absoluteUrl(localizedPath("ru", path)),
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? "en_US" : "ru_RU",
      images: [
        {
          url: absoluteUrl(`/images/og-${locale}.png`),
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(`/images/og-${locale}.png`)],
    },
  };
}
