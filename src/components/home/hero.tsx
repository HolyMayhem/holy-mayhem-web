import { Github } from "@/components/ui/brand-icons";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { Orbit } from "./orbit";
import { ExternalLink } from "@/components/ui/external-link";
import { dictionaries } from "@/content/dictionaries";
import { site } from "@/config/site";
import { localizedPath, type Locale } from "@/lib/i18n";
export function Hero({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].hero;
  return (
    <section className="hero container">
      <div className="hero-grid" aria-hidden="true" />
      <Orbit />
      <div className="hero-content">
        <p className="hero-eyebrow">
          <span className="status-dot" />
          {d.eyebrow}
        </p>
        <h1 className="hero-title">
          HOLY
          <span>
            MAYHEM<span className="title-period">.</span>
          </span>
        </h1>
        <p className="hero-description">{d.description}</p>
        <div className="hero-buttons">
          <Link
            prefetch={false}
            href={localizedPath(locale, "/projects")}
            className="button primary"
          >
            {d.explore}
            <ArrowUpRight size={17} />
          </Link>
          <ExternalLink href={site.github} className="button secondary">
            <Github size={18} />
            GitHub
          </ExternalLink>
        </div>
      </div>
      <div className="hero-bottom">
        <span>
          <Asterisk size={16} />
          {d.note}
        </span>
        <a href="#projects">
          {d.scroll}
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
