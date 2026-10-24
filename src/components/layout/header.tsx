import { Github } from "@/components/ui/brand-icons";
import Link from "next/link";

import { Brand } from "@/components/ui/brand";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-menu";
import { ExternalLink } from "@/components/ui/external-link";
import { dictionaries } from "@/content/dictionaries";
import { site } from "@/config/site";
import { localizedPath, type Locale } from "@/lib/i18n";
export function Header({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].nav;
  return (
    <>
      <a className="skip-link" href="#main">
        {d.skip}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand locale={locale} />
          <nav className="desktop-nav" aria-label={d.mainLabel}>
            <Link prefetch={false} href={localizedPath(locale)}>
              {d.home}
            </Link>
            <Link prefetch={false} href={localizedPath(locale, "/projects")}>
              {d.projects}
            </Link>
            <Link prefetch={false} href={`${localizedPath(locale)}#about`}>
              {d.about}
            </Link>
            <Link prefetch={false} href={`${localizedPath(locale)}#contact`}>
              {d.contact}
            </Link>
          </nav>
          <div className="header-actions">
            <LanguageSwitch locale={locale} />
            <span className="header-separator" />
            <ExternalLink
              href={site.github}
              className="icon-button header-github"
              aria-label="GitHub HolyMayhem"
            >
              <Github size={19} />
            </ExternalLink>
            <MobileMenu locale={locale} />
          </div>
        </div>
      </header>
    </>
  );
}
