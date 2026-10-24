import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getProject, getProjects } from "@/lib/projects";
import { ProjectPage } from "@/components/projects/project-page";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = getProject(slug);
  if (!isLocale(locale) || !p) notFound();
  const seo = p.content[locale].seo;
  return pageMetadata(locale, seo.title, seo.description, `/projects/${slug}`);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = getProject(slug);
  if (!isLocale(locale) || !p) notFound();
  return <ProjectPage project={p} locale={locale} />;
}
