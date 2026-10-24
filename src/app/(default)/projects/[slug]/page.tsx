import { notFound } from "next/navigation";
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return pageMetadata(
    "ru",
    p.content.ru.seo.title,
    p.content.ru.seo.description,
    `/projects/${slug}`,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return <ProjectPage project={p} locale="ru" />;
}
