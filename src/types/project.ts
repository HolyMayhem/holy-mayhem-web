import type { Localized } from "@/lib/i18n";
export type Category = "apps" | "services";
export type ProjectStatus = "available" | "development" | "archived";
export type LinkKind = "website" | "download" | "github" | "telegram";
export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: Localized<string>;
}
export interface ProjectLink {
  kind: LinkKind;
  url: string;
}
export interface ProjectContent {
  summary: string;
  description: string[];
  tagline: string;
  features?: { title: string; description: string }[];
  seo: { title: string; description: string };
}
export interface Project {
  id: string;
  slug: string;
  name: string;
  category: Category;
  status: ProjectStatus;
  content: Localized<ProjectContent>;
  logo?: ProjectImage;
  cover?: ProjectImage;
  screenshots?: ProjectImage[];
  platforms?: string[];
  links?: ProjectLink[];
  accent: `#${string}`;
  featured: boolean;
  order: number;
  sources?: string[];
}
