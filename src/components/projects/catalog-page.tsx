import type { Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { dictionaries } from "@/content/dictionaries";
import { Shell } from "@/components/layout/shell";
import { Catalog } from "./catalog";
export function CatalogPage({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].projects;
  return (
    <Shell locale={locale}>
      <section className="container catalog-page">
        <div className="page-heading">
          <p className="section-label">Holy Mayhem / {d.all}</p>
          <h1>
            {d.catalogTitle}
            <span className="title-period">.</span>
          </h1>
          <p>{d.catalogIntro}</p>
        </div>
        <Catalog locale={locale} projects={getProjects()} />
      </section>
    </Shell>
  );
}
