"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FolderOpen } from "lucide-react";
import type { Project, Category } from "@/types/project";
import type { Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { ProjectCard } from "./project-card";
export function Catalog({
  projects,
  locale,
}: {
  projects: readonly Project[];
  locale: Locale;
}) {
  const reducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<Category | "all">("all");
  const d = dictionaries[locale].projects;
  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter,
  );
  return (
    <>
      <div className="catalog-toolbar">
        <div className="filter-group" role="group" aria-label={d.categoryLabel}>
          {(["all", "apps", "services"] as const).map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {d.categories[c]}
              <span>
                {projects.filter((p) => c === "all" || p.category === c).length}
              </span>
            </button>
          ))}
        </div>
        <span className="catalog-count" aria-live="polite">
          {d.count}: {visible.length}
        </span>
      </div>
      <motion.div layout className="project-grid catalog-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: reducedMotion ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
            >
              <ProjectCard project={p} locale={locale} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {!visible.length && (
        <div className="empty-state">
          <FolderOpen size={30} />
          <p>{d.empty}</p>
          <button className="button secondary" onClick={() => setFilter("all")}>
            {d.clear}
          </button>
        </div>
      )}
    </>
  );
}
