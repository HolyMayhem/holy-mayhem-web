import { CatalogPage } from "@/components/projects/catalog-page";
import { dictionaries } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "ru",
  dictionaries.ru.seo.projects,
  dictionaries.ru.projects.catalogIntro,
  "/projects",
);
export default function Page() {
  return <CatalogPage locale="ru" />;
}
