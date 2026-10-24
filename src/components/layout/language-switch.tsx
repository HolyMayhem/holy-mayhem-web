"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { site } from "@/config/site";
import { dictionaries } from "@/content/dictionaries";
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const withoutBase =
    site.basePath && pathname.startsWith(site.basePath)
      ? pathname.slice(site.basePath.length)
      : pathname;
  const suffix = withoutBase
    .replace(/^\/(ru|en)(?=\/|$)/, "")
    .replace(/\/$/, "");
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={dictionaries[locale].nav.language}
    >
      {locales.map((l) => (
        <Link
          prefetch={false}
          key={l}
          href={`/${l}${suffix}/`}
          lang={l}
          hrefLang={l}
          aria-current={locale === l ? "true" : undefined}
          onClick={() => {
            try {
              localStorage.setItem("holy-locale", l);
            } catch {}
          }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
