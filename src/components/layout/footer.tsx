import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { ExternalLink } from "@/components/ui/external-link";
import { socialLinks } from "@/config/socials";
import { site } from "@/config/site";
import { dictionaries } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/lib/i18n";
export function Footer({ locale }: { locale: Locale }) {
  const d = dictionaries[locale];
  return (
    <footer className="container footer">
      <div className="footer-top">
        <div>
          <Brand locale={locale} />
          <p>{d.footer.tagline}</p>
        </div>
        <nav aria-label={d.nav.footerLabel}>
          <Link prefetch={false} href={localizedPath(locale, "/projects")}>
            {d.nav.projects}
          </Link>
          <Link prefetch={false} href={`${localizedPath(locale)}#about`}>
            {d.nav.about}
          </Link>
          <Link prefetch={false} href={`${localizedPath(locale)}#contact`}>
            {d.nav.contact}
          </Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {site.copyrightYear} {d.footer.rights}
        </span>
        <div>
          {socialLinks
            .filter((s) => s.id !== "contact")
            .map((s) => (
              <ExternalLink key={s.id} href={s.url}>
                {s.name}
                <ArrowUpRight size={13} />
              </ExternalLink>
            ))}
        </div>
        <span className="footer-location">Holy Mayhem</span>
      </div>
    </footer>
  );
}
