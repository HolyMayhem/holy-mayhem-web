import type { Localized } from "@/lib/i18n";
export type SocialIcon =
  "telegram" | "github" | "instagram" | "youtube" | "link";
export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: SocialIcon;
  description: Localized<string>;
}
export const socialLinks: SocialLink[] = [
  {
    id: "blog",
    name: "Telegram",
    handle: "@HolyMayhemBlog",
    url: "https://t.me/HolyMayhemBlog",
    icon: "telegram",
    description: {
      ru: "Проекты, обновления и процесс разработки.",
      en: "Projects, updates, and the work behind them.",
    },
  },
  {
    id: "github",
    name: "GitHub",
    handle: "HolyMayhem",
    url: "https://github.com/HolyMayhem",
    icon: "github",
    description: {
      ru: "Исходный код и репозитории проектов.",
      en: "Source code and project repositories.",
    },
  },
  {
    id: "contact",
    name: "Telegram",
    handle: "@holymayhem",
    url: "https://t.me/holymayhem",
    icon: "telegram",
    description: {
      ru: "Для вопросов, идей и личного общения.",
      en: "For questions, ideas, and conversations.",
    },
  },
];
