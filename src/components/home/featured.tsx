import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";
import { dictionaries } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/lib/i18n";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
export function Featured({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].projects;
  const projects = getFeaturedProjects();
  if (!projects.length) return null;
  return (
    <section id="projects" className="container section featured">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="section-label">{d.all}</p>
            <h2>{d.title}</h2>
          </div>
          <Link
            prefetch={false}
            href={localizedPath(locale, "/projects")}
            className="text-link"
          >
            {d.all}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Reveal>
      <div className="project-grid">
        {projects.map((p, i) => (
          <Reveal key={p.id} className={i === 0 ? "wide-cell" : ""}>
            <ProjectCard project={p} locale={locale} wide={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
