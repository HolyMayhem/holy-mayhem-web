import { projectData } from "@/content/projects";
import { locales } from "@/lib/i18n";
import type { Project } from "@/types/project";

/** Validate the content boundary once. A CMS adapter can supply this same shape. */
export function validateProjects(data: readonly Project[]): Project[] {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const fail = (id: string, field: string): never => {
    throw new Error(`Invalid project "${id}": ${field}`);
  };
  const text = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;
  for (const p of data) {
    if (!text(p.id) || ids.has(p.id))
      fail(p.id, "id must be unique and non-empty");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || slugs.has(p.slug))
      fail(p.id, "slug must be unique and URL-safe");
    if (
      !text(p.name) ||
      !Number.isFinite(p.order) ||
      typeof p.featured !== "boolean"
    )
      fail(p.id, "name, order, or featured");
    if (
      !["apps", "services"].includes(p.category) ||
      !["available", "development", "archived"].includes(p.status)
    )
      fail(p.id, "category or status");
    if (!/^#[a-fA-F0-9]{6}$/.test(p.accent))
      fail(p.id, "accent must be a six-digit hex color");
    for (const locale of locales) {
      const c = p.content?.[locale];
      if (
        !c ||
        !text(c.summary) ||
        !text(c.tagline) ||
        !Array.isArray(c.description) ||
        !c.description.length ||
        !c.description.every(text) ||
        !text(c.seo?.title) ||
        !text(c.seo?.description)
      )
        fail(p.id, `missing ${locale} content`);
      if (c.features?.some((f) => !text(f.title) || !text(f.description)))
        fail(p.id, `${locale} features`);
    }
    for (const image of [p.logo, p.cover, ...(p.screenshots ?? [])]) {
      if (
        image &&
        (!image.src.startsWith("/images/") ||
          image.src.includes("..") ||
          !(image.width > 0) ||
          !(image.height > 0) ||
          locales.some((l) => !text(image.alt?.[l])))
      )
        fail(p.id, "image path, dimensions, or localized alt");
    }
    for (const link of p.links ?? []) {
      if (!["website", "download", "github", "telegram"].includes(link.kind))
        fail(p.id, "link kind");
      try {
        if (new URL(link.url).protocol !== "https:")
          fail(p.id, "links must use HTTPS");
      } catch {
        fail(p.id, "invalid URL");
      }
    }
    if (p.platforms?.some((platform) => !text(platform)))
      fail(p.id, "platforms");
    ids.add(p.id);
    slugs.add(p.slug);
  }
  return [...data].sort((a, b) => a.order - b.order);
}
const projects = validateProjects(projectData);
export function getProjects(): readonly Project[] {
  return projects;
}
export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
