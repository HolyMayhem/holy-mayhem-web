import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import type { Project } from "@/types/project";
import type { Locale } from "@/lib/i18n";
import { assetPath } from "@/config/site";
export function ProjectArt({
  project,
  locale,
  priority = false,
}: {
  project: Project;
  locale: Locale;
  priority?: boolean;
}) {
  if (project.cover)
    return (
      <div
        className={`project-art ${project.platforms?.some((p) => p.startsWith("macOS")) ? "art-desktop" : "art-tv"}`}
      >
        <div className="art-grid" />
        <div className="screen-frame">
          <div className="screen-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{project.name}</span>
          </div>
          <Image
            src={assetPath(project.cover.src)}
            alt={project.cover.alt[locale]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 700px) 90vw, (max-width: 1100px) 75vw, 700px"
            priority={priority}
          />
        </div>
      </div>
    );
  return (
    <div className="project-art art-service" aria-hidden="true">
      <div className="service-grid" />
      <div className="shield-ring ring-one" />
      <div className="shield-ring ring-two" />
      <div className="shield-ring ring-three" />
      <div className="shield-core">
        <ShieldCheck size={66} strokeWidth={1} />
      </div>
      <span className="service-node node-one" />
      <span className="service-node node-two" />
      <span className="service-node node-three" />
    </div>
  );
}
