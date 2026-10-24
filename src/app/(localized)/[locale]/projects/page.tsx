import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { CatalogPage } from "@/components/projects/catalog-page";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = dictionaries[locale];
  return pageMetadata(
    locale,
    d.seo.projects,
    d.projects.catalogIntro,
    "/projects",
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CatalogPage locale={locale} />;
}
