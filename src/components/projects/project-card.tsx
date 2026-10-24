import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/types/project";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { assetPath } from "@/config/site";
import { ProjectArt } from "./project-art";
export function ProjectCard({
  project,
  locale,
  wide = false,
}: {
  project: Project;
  locale: Locale;
  wide?: boolean;
}) {
  const d = dictionaries[locale].projects;
  return (
    <Link
      prefetch={false}
      href={localizedPath(locale, `/projects/${project.slug}`)}
      className={`project-card ${wide ? "project-card-wide" : ""}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="project-card-content">
        <div className="project-card-top">
          {project.logo && (
            <div className="project-logo">
              <Image
                src={assetPath(project.logo.src)}
                alt=""
                width={project.logo.width}
                height={project.logo.height}
                sizes="44px"
              />
            </div>
          )}
          <span className="project-platform">
            {project.platforms?.[0] || d.categories[project.category]}
          </span>
          <span className="project-link-icon">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <div className="project-card-copy">
          <div className="project-category">
            {d.categories[project.category]}
          </div>
          <h3>{project.name}</h3>
          <p>{project.content[locale].summary}</p>
        </div>
        <div className="project-card-bottom">
          <span className={`project-status status-${project.status}`}>
            <i />
            {d.statuses[project.status]}
          </span>
          <span className="project-card-cta">
            {d.view}
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
      <ProjectArt project={project} locale={locale} />
    </Link>
  );
}
