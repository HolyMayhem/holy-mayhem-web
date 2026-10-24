import { Github } from "@/components/ui/brand-icons";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Check, Download } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/types/project";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { dictionaries } from "@/content/dictionaries";
import { assetPath } from "@/config/site";
import { Shell } from "@/components/layout/shell";
import { ExternalLink } from "@/components/ui/external-link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "./project-card";
import { ProjectArt } from "./project-art";
export function ProjectPage({
  project: p,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const d = dictionaries[locale].projects;
  const c = p.content[locale];
  const others = getProjects()
    .filter((other) => other.id !== p.id)
    .slice(0, 2);
  return (
    <Shell locale={locale}>
      <article
        className="container project-page"
        style={{ "--project-accent": p.accent } as CSSProperties}
      >
        <Link
          prefetch={false}
          className="text-link back-link"
          href={localizedPath(locale, "/projects")}
        >
          <ArrowLeft size={16} />
          {d.back}
        </Link>
        <header className="project-hero">
          <div className="project-hero-copy">
            {p.logo && (
              <div className="detail-logo">
                <Image
                  src={assetPath(p.logo.src)}
                  alt={p.logo.alt[locale]}
                  width={p.logo.width}
                  height={p.logo.height}
                  sizes="72px"
                  priority
                />
              </div>
            )}
            <div className="detail-badges">
              <span>{d.categories[p.category]}</span>
              <span className={`project-status status-${p.status}`}>
                <i />
                {d.statuses[p.status]}
              </span>
            </div>
            <h1>{p.name}</h1>
            <p className="detail-tagline">{c.tagline}</p>
            <p className="detail-summary">{c.summary}</p>
            {!!p.links?.length && (
              <div className="project-buttons">
                {p.links.map((link, i) => (
                  <ExternalLink
                    key={link.kind}
                    href={link.url}
                    className={`button ${i === 0 ? "primary" : "secondary"}`}
                  >
                    {link.kind === "github" ? (
                      <Github size={17} />
                    ) : link.kind === "download" ? (
                      <Download size={17} />
                    ) : null}
                    {d.links[link.kind]}
                    {link.kind !== "github" && link.kind !== "download" && (
                      <ArrowUpRight size={16} />
                    )}
                  </ExternalLink>
                ))}
              </div>
            )}
          </div>
          <div className="project-hero-art">
            <ProjectArt project={p} locale={locale} priority />
          </div>
        </header>
        <Reveal>
          <section className="detail-overview">
            <h2>{d.detail}</h2>
            <div>
              {c.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {!!p.platforms?.length && (
                <div className="platform-list">
                  <h3>{d.platforms}</h3>
                  {p.platforms.map((platform) => (
                    <span key={platform}>{platform}</span>
                  ))}
                </div>
              )}
            </div>
          </section>
        </Reveal>
        {!!c.features?.length && (
          <Reveal>
            <section className="detail-section">
              <h2>{d.features}</h2>
              <div className="feature-grid">
                {c.features.map((feature) => (
                  <div className="feature" key={feature.title}>
                    <Check size={18} />
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}
        {!!p.screenshots?.length && (
          <section className="detail-section gallery">
            <h2>{d.gallery}</h2>
            {p.screenshots.map((image, i) => (
              <Reveal key={image.src}>
                <figure>
                  <Image
                    src={assetPath(image.src)}
                    alt={image.alt[locale]}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 1200px) 92vw, 1144px"
                    loading="lazy"
                  />
                  <figcaption>
                    {image.alt[locale]}
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </section>
        )}
        {!!others.length && (
          <section className="detail-section related-projects">
            <div className="section-heading">
              <h2>{d.other}</h2>
              <Link
                prefetch={false}
                className="text-link"
                href={localizedPath(locale, "/projects")}
              >
                {d.all}
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="project-grid">
              {others.map((other) => (
                <ProjectCard key={other.id} project={other} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </article>
    </Shell>
  );
}
