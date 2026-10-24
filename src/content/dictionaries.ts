import type { Localized } from "@/lib/i18n";
const ru = {
  nav: {
    mainLabel: "Основная навигация",
    footerLabel: "Навигация внизу страницы",
    home: "Главная",
    projects: "Проекты",
    about: "Обо мне",
    contact: "Связаться",
    menu: "Открыть меню",
    close: "Закрыть меню",
    language: "Язык сайта",
    skip: "Перейти к содержимому",
  },
  hero: {
    eyebrow: "Независимая разработка",
    description:
      "Приложения, инструменты и цифровые сервисы. От идеи до продукта, которым хочется пользоваться.",
    explore: "Смотреть проекты",
    note: "Сделано с вниманием к деталям",
    scroll: "Ниже — мои проекты",
  },
  projects: {
    categoryLabel: "Категория проекта",
    title: "Идеи, ставшие продуктами.",
    intro:
      "Собственные приложения и сервисы. Каждый — решение конкретной задачи.",
    all: "Все проекты",
    view: "О проекте",
    categories: { all: "Все", apps: "Приложения", services: "Сервисы" },
    statuses: {
      available: "Доступен",
      development: "В разработке",
      archived: "В архиве",
    },
    empty: "В этой категории пока нет проектов.",
    clear: "Показать все",
    catalogTitle: "Мои проекты",
    catalogIntro:
      "Приложения для большого экрана, инструменты для Mac и цифровые сервисы. Всё, над чем я работаю, — здесь.",
    count: "Проектов",
    other: "Другие проекты",
    back: "Все проекты",
    features: "Возможности",
    gallery: "Внутри приложения",
    platforms: "Платформы",
    detail: "О проекте",
    links: {
      website: "Сайт проекта",
      download: "Скачать",
      github: "GitHub",
      telegram: "Открыть в Telegram",
    },
  },
  about: {
    role: "Независимый разработчик",
    label: "За проектами",
    title: "Один разработчик.\nМного любопытства.",
    description:
      "Я — Holy Mayhem, независимый разработчик. Создаю собственные приложения, инструменты и цифровые сервисы.",
    second:
      "Мне нравится разбираться в технологиях и превращать сложные задачи в понятные интерфейсы. Здесь собраны продукты, которые я развиваю, и эксперименты, которые становятся чем-то большим.",
    note: "От первой строки кода до последней детали интерфейса.",
    values: [
      "Самостоятельные продукты",
      "Внимание к интерфейсу",
      "Интерес к технологиям",
    ],
  },
  connect: {
    label: "На связи",
    title: "Продолжим разговор.",
    intro: "Следите за разработкой, загляните в код или просто напишите.",
    direct: "Личный контакт",
  },
  support: {
    title: "Помочь идеям расти.",
    description:
      "Если мои проекты вам полезны, можно поддержать их дальнейшую разработку.",
    button: "Поддержать разработку",
    note: "Добровольно. С благодарностью.",
  },
  footer: {
    tagline: "Независимые идеи. Настоящие продукты.",
    rights: "Сделано Holy Mayhem.",
  },
  seo: {
    title: "Holy Mayhem — независимый разработчик",
    description:
      "Приложения, инструменты и цифровые сервисы независимого разработчика Holy Mayhem. TorrServe Silicon, TorrFrame и HolyVPN.",
    projects: "Проекты — Holy Mayhem",
  },
  error: {
    title: "Не удалось открыть страницу",
    description: "Попробуйте загрузить её ещё раз.",
    retry: "Попробовать снова",
    missing: "Страница не найдена",
    missingText:
      "Возможно, адрес изменился. Проекты и контакты есть на главной.",
    home: "На главную",
    loading: "Загрузка страницы",
  },
};
type Dictionary = typeof ru;
const en: Dictionary = {
  nav: {
    mainLabel: "Main navigation",
    footerLabel: "Footer navigation",
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
    language: "Website language",
    skip: "Skip to content",
  },
  hero: {
    eyebrow: "Independent development",
    description:
      "Apps, tools, and digital services. From an idea to a product you’ll want to use.",
    explore: "Explore projects",
    note: "Built with care for the details",
    scroll: "Discover my projects",
  },
  projects: {
    categoryLabel: "Project category",
    title: "Ideas, turned into products.",
    intro:
      "Independent apps and services. Each built to solve something specific.",
    all: "All projects",
    view: "Explore project",
    categories: { all: "All", apps: "Apps", services: "Services" },
    statuses: {
      available: "Available",
      development: "In development",
      archived: "Archived",
    },
    empty: "No projects in this category yet.",
    clear: "Show all",
    catalogTitle: "My projects",
    catalogIntro:
      "Apps for the big screen, tools for the Mac, and digital services. Everything I’m working on, in one place.",
    count: "Projects",
    other: "More to explore",
    back: "All projects",
    features: "What it does",
    gallery: "Inside the app",
    platforms: "Platforms",
    detail: "About the project",
    links: {
      website: "Visit website",
      download: "Download",
      github: "GitHub",
      telegram: "Open in Telegram",
    },
  },
  about: {
    role: "Independent developer",
    label: "Behind the projects",
    title: "One developer.\nPlenty of curiosity.",
    description:
      "I’m Holy Mayhem, an independent developer. I build my own apps, tools, and digital services.",
    second:
      "I like exploring technology and turning complex tasks into clear interfaces. This is a home for the products I’m developing and the experiments that grow into something more.",
    note: "From the first line of code to the last interface detail.",
    values: [
      "Independent products",
      "Care for the interface",
      "Curiosity about technology",
    ],
  },
  connect: {
    label: "Let’s connect",
    title: "Keep the conversation going.",
    intro: "Follow the development, explore the code, or just say hello.",
    direct: "Get in touch",
  },
  support: {
    title: "Help ideas grow.",
    description:
      "If my projects are useful to you, you can support their continued development.",
    button: "Support development",
    note: "Always optional. Always appreciated.",
  },
  footer: {
    tagline: "Independent ideas. Real products.",
    rights: "Made by Holy Mayhem.",
  },
  seo: {
    title: "Holy Mayhem — independent developer",
    description:
      "Apps, tools, and digital services by independent developer Holy Mayhem. TorrServe Silicon, TorrFrame, and HolyVPN.",
    projects: "Projects — Holy Mayhem",
  },
  error: {
    title: "Couldn’t open this page",
    description: "Try loading the page again.",
    retry: "Try again",
    missing: "Page not found",
    missingText:
      "The address may have changed. Find projects and contact details on the homepage.",
    home: "Back home",
    loading: "Loading page",
  },
};
export const dictionaries: Localized<Dictionary> = { ru, en };
export type { Dictionary };
