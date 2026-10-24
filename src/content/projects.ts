import type { Project, ProjectImage } from "@/types/project";
const siliconScreen: ProjectImage = {
  src: "/images/projects/silicon-library.webp",
  width: 1800,
  height: 1196,
  alt: {
    ru: "Библиотека TorrServe Silicon на macOS",
    en: "TorrServe Silicon library on macOS",
  },
};
const frameCatalog: ProjectImage = {
  src: "/images/projects/frame-catalog.webp",
  width: 1800,
  height: 1013,
  alt: {
    ru: "Каталог фильмов и сериалов TorrFrame",
    en: "TorrFrame movie and series catalog",
  },
};
export const projectData = [
  {
    id: "torrserve-silicon",
    slug: "torrserve-silicon",
    name: "TorrServe Silicon",
    category: "apps",
    status: "available",
    accent: "#9693f9",
    featured: true,
    order: 10,
    logo: {
      src: "/images/projects/silicon-logo.webp",
      width: 256,
      height: 256,
      alt: { ru: "Логотип TorrServe Silicon", en: "TorrServe Silicon logo" },
    },
    cover: {
      ...siliconScreen,
      src: "/images/projects/silicon-cover.webp",
      width: 900,
      height: 598,
    },
    screenshots: [siliconScreen],
    platforms: ["macOS"],
    links: [
      {
        kind: "website",
        url: "https://holymayhem.github.io/TorrServe-Silicon/",
      },
      {
        kind: "download",
        url: "https://github.com/HolyMayhem/TorrServe-Silicon/releases/latest",
      },
      {
        kind: "github",
        url: "https://github.com/HolyMayhem/TorrServe-Silicon",
      },
    ],
    sources: ["https://holymayhem.github.io/TorrServe-Silicon/"],
    content: {
      ru: {
        summary:
          "TorrServer в нативном интерфейсе Mac. Библиотека, управление сервером и просмотр — в одном приложении.",
        tagline: "TorrServer. По-настоящему для Mac.",
        description: [
          "Нативное приложение для macOS, которое объединяет управление TorrServer, библиотеку торрентов и запуск просмотра в привычном интерфейсе.",
          "Добавляйте magnet-ссылки или торрент-файлы, выбирайте видео и открывайте его в своём плеере. Приложение умеет загрузить подходящую версию TorrServer и следить за обновлениями.",
        ],
        features: [
          {
            title: "Управление сервером",
            description:
              "Запуск, остановка, состояние и основные настройки TorrServer прямо в приложении.",
          },
          {
            title: "Ваша библиотека",
            description:
              "Торренты с названиями, размером и статусом собраны в одном месте.",
          },
          {
            title: "Поиск через Jackett",
            description:
              "Необязательное подключение своего Jackett для поиска раздач.",
          },
          {
            title: "Офлайн-просмотр",
            description:
              "Сохранение выбранного видео на Mac для просмотра без подключения к сети.",
          },
        ],
        seo: {
          title: "TorrServe Silicon — TorrServer для macOS",
          description:
            "Нативное приложение для macOS: управление TorrServer, библиотека торрентов, поиск через Jackett и сохранение видео для офлайн-просмотра.",
        },
      },
      en: {
        summary:
          "TorrServer, at home on your Mac. Your library, server controls, and playback in one native app.",
        tagline: "TorrServer. Right at home on Mac.",
        description: [
          "A native macOS app that brings TorrServer management, your torrent library, and playback together in a familiar interface.",
          "Add magnet links or torrent files, select a video, and open it in your preferred player. The app can download a suitable TorrServer version and check for updates.",
        ],
        features: [
          {
            title: "Server controls",
            description:
              "Start and stop TorrServer, check its status, and adjust core settings in the app.",
          },
          {
            title: "Your library",
            description:
              "Keep torrents together with their titles, sizes, and statuses.",
          },
          {
            title: "Search with Jackett",
            description:
              "Optionally connect your own Jackett instance to find torrents.",
          },
          {
            title: "Offline viewing",
            description:
              "Save selected videos to your Mac to watch without an internet connection.",
          },
        ],
        seo: {
          title: "TorrServe Silicon — TorrServer for macOS",
          description:
            "A native macOS app for TorrServer management, your torrent library, optional Jackett search, and saving videos for offline viewing.",
        },
      },
    },
  },
  {
    id: "torrframe",
    slug: "torrframe",
    name: "TorrFrame",
    category: "apps",
    status: "available",
    accent: "#b7a0f9",
    featured: true,
    order: 20,
    logo: {
      src: "/images/projects/frame-logo.webp",
      width: 256,
      height: 128,
      alt: { ru: "Логотип TorrFrame", en: "TorrFrame logo" },
    },
    cover: {
      ...frameCatalog,
      src: "/images/projects/frame-cover.webp",
      width: 900,
      height: 507,
    },
    screenshots: [
      frameCatalog,
      {
        src: "/images/projects/frame-library.webp",
        width: 1800,
        height: 1013,
        alt: {
          ru: "Медиатека TorrFrame на Android TV",
          en: "TorrFrame library on Android TV",
        },
      },
    ],
    platforms: ["Android TV 8.0+", "ARM64 / ARMv7"],
    links: [
      { kind: "website", url: "https://holymayhem.github.io/TorrFrame/" },
      {
        kind: "download",
        url: "https://github.com/HolyMayhem/TorrFrame/releases/latest",
      },
      { kind: "github", url: "https://github.com/HolyMayhem/TorrFrame" },
    ],
    sources: ["https://holymayhem.github.io/TorrFrame/"],
    content: {
      ru: {
        summary:
          "Каталог, медиатека и TorrServer. Всё для просмотра на большом экране с управлением с пульта.",
        tagline: "Ваш вечер. Ваш большой экран.",
        description: [
          "Приложение для телевизоров и приставок на Android TV. Выбирайте фильмы и сериалы в каталоге, находите раздачи и запускайте просмотр с помощью TorrServer.",
          "TorrServer встроен и запускается автоматически. Интерфейс рассчитан на пульт, а Phone Remote позволяет искать фильмы и управлять встроенным плеером из браузера телефона в той же домашней сети.",
        ],
        features: [
          {
            title: "Каталог и медиатека",
            description:
              "Фильмы и сериалы, избранное, список «Смотреть позже» и материалы из TorrServer.",
          },
          {
            title: "Поиск раздач",
            description:
              "TorrentSearch или необязательное подключение собственного Jackett.",
          },
          {
            title: "Встроенный плеер",
            description:
              "Выбор дорожек, субтитры и продолжение с места остановки. Доступен и внешний плеер.",
          },
          {
            title: "Phone Remote",
            description:
              "Поиск, добавление magnet-ссылок и управление встроенным плеером через браузер телефона.",
          },
        ],
        seo: {
          title: "TorrFrame — приложение для Android TV",
          description:
            "Каталог, медиатека, встроенный TorrServer и Phone Remote. Приложение для телевизоров и приставок на Android TV 8.0+.",
        },
      },
      en: {
        summary:
          "A catalog, a library, and TorrServer. Made for the big screen and your TV remote.",
        tagline: "Your evening. Your big screen.",
        description: [
          "An app for Android TV televisions and streaming boxes. Browse movies and series, find torrents, and start watching with TorrServer.",
          "TorrServer is built in and starts automatically. The interface is designed for a TV remote. Phone Remote lets you search and control the built-in player from your phone browser on the same home network.",
        ],
        features: [
          {
            title: "Catalog and library",
            description:
              "Movies and series, favorites, a watch-later list, and your TorrServer media.",
          },
          {
            title: "Torrent search",
            description:
              "Search with TorrentSearch or optionally connect your own Jackett.",
          },
          {
            title: "Built-in player",
            description:
              "Select audio tracks and subtitles, and resume playback. External players are also supported.",
          },
          {
            title: "Phone Remote",
            description:
              "Search, add magnet links, and control the built-in player from a phone browser.",
          },
        ],
        seo: {
          title: "TorrFrame — an app for Android TV",
          description:
            "A catalog, library, built-in TorrServer, and Phone Remote. An app for televisions and streaming boxes running Android TV 8.0+.",
        },
      },
    },
  },
  {
    id: "holyvpn",
    slug: "holyvpn",
    name: "HolyVPN",
    category: "services",
    status: "available",
    accent: "#8cacf4",
    featured: true,
    order: 30,
    logo: {
      src: "/images/projects/vpn-logo.webp",
      width: 256,
      height: 256,
      alt: { ru: "Логотип HolyVPN", en: "HolyVPN logo" },
    },
    platforms: ["Telegram"],
    links: [{ kind: "telegram", url: "https://t.me/holymayhemserviceBot" }],
    sources: [
      "https://t.me/holymayhemserviceBot",
      "https://telegra.ph/Holy-VPN--vsyo-chto-nuzhno-znat-09-02",
    ],
    content: {
      ru: {
        summary:
          "VPN-сервис HolyVPN. Подключение к сервису — через Telegram-бота.",
        tagline: "Подключение начинается в Telegram.",
        description: [
          "HolyVPN — независимый VPN-сервис с подключением через Telegram-бота. После активации доступа вы получаете персональную ссылку подписки: добавьте её в совместимое VPN-приложение, выберите сервер и подключитесь.",
          "Одна ссылка объединяет доступные страны, серверы и варианты подключения. Когда список серверов или настройки меняются, достаточно обновить подписку в приложении — добавлять каждую конфигурацию вручную не нужно.",
          "Оплата проходит через Tribute, после успешного платежа доступ активируется или продлевается автоматически. Актуальные тарифы и условия доступны в боте. Если возникнут вопросы или проблемы с подключением, можно обратиться в поддержку напрямую.",
        ],
        features: [
          {
            title: "Одна подписка",
            description:
              "Доступные серверы и способы подключения собраны в одной персональной ссылке.",
          },
          {
            title: "Выбор серверов",
            description:
              "Можно переключаться между доступными странами и серверами, выбирая подходящее подключение.",
          },
          {
            title: "Несколько технологий подключения",
            description:
              "В зависимости от сервера доступны VLESS, Trojan и Hysteria2; используются транспорты gRPC, RAW и XHTTP. На части подключений применяется REALITY.",
          },
          {
            title: "Безлимитный трафик",
            description:
              "Подписка не ограничена пакетами гигабайт: не нужно следить за остатком трафика.",
          },
          {
            title: "Обновление настроек",
            description:
              "Обновите подписку в VPN-приложении, чтобы получить актуальный список серверов и конфигураций.",
          },
          {
            title: "Автоматическая активация",
            description:
              "После успешной оплаты через Tribute система активирует или продлевает доступ без ручного подтверждения.",
          },
        ],
        seo: {
          title: "HolyVPN — VPN-сервис в Telegram",
          description:
            "Независимый VPN-сервис: одна ссылка подписки, выбор серверов, разные протоколы и безлимитный трафик. Подключение через Telegram-бота.",
        },
      },
      en: {
        summary: "The HolyVPN service. Get started through the Telegram bot.",
        tagline: "Your connection starts in Telegram.",
        description: [
          "HolyVPN is an independent VPN service accessible through a Telegram bot. Once access is activated, you receive a personal subscription link. Add it to a compatible VPN app, select a server, and connect.",
          "One link contains the available countries, servers, and connection options. When servers or settings change, refresh the subscription in your app to load the current configurations without adding each one manually.",
          "Payments are processed through Tribute. Access is activated or extended automatically after a successful payment. Find current plans and terms in the bot, or contact support directly if you have questions or connection issues.",
        ],
        features: [
          {
            title: "One subscription",
            description:
              "Available servers and connection options are collected in a single personal subscription link.",
          },
          {
            title: "Server selection",
            description:
              "Switch between the available countries and servers to find a suitable connection.",
          },
          {
            title: "Multiple connection technologies",
            description:
              "Depending on the server, VLESS, Trojan, and Hysteria2 are available, with gRPC, RAW, and XHTTP transports. Some connections use REALITY.",
          },
          {
            title: "Unlimited traffic",
            description:
              "The subscription has no gigabyte allowance to keep track of.",
          },
          {
            title: "Configuration updates",
            description:
              "Refresh the subscription in your VPN app to get the current server list and configurations.",
          },
          {
            title: "Automatic activation",
            description:
              "After a successful payment through Tribute, the system activates or extends access without manual confirmation.",
          },
        ],
        seo: {
          title: "HolyVPN — VPN service on Telegram",
          description:
            "An independent VPN service with one subscription link, server selection, multiple protocols, and unlimited traffic. Get started through the Telegram bot.",
        },
      },
    },
  },
] satisfies Project[];
