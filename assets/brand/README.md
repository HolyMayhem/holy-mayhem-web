# Holy Mayhem — варианты бренда

Основной вариант, выбранный пользователем: **cinematic**, файл `variants/02-cinematic.png`. Это тот же PNG, который был выбран в переписке; источник не перерисовывается при подготовке файлов сайта.

Все варианты сохраняются в проекте. Выбор нового основного варианта не должен удалять остальные исходники.

| ID | Вариант | Исходный PNG |
| --- | --- | --- |
| `original` | Исходное стекло | `glass-cross-source.png` |
| `clean-glass` | Чистое стекло | `variants/01-clean-glass.png` |
| `cinematic` | Кинематографичный — основной | `variants/02-cinematic.png` |
| `sculptural` | Скульптурный | `variants/03-minimal-monolith.png` |

## Как переключить вариант

1. В `assets/brand/variants.json` измените только поле `active` на один из ID выше.
2. Выполните `npm run build` или перезапустите `npm run dev`.

Подготовка размеров запускается автоматически перед build/dev. Отдельная команда: `npm run brand:prepare`.

`scripts/prepare-brand.mjs` читает выбранный исходник, обрезает только прозрачные поля и создаёт PNG, WebP, favicon и Apple Touch в `public/images/brand/`. Имена файлов содержат ID варианта, чтобы браузер не показывал закэшированную предыдущую иконку. Прозрачность PNG, WebP и favicon сохраняется. Apple Touch получает тёмную подложку сайта.

`src/config/brand.ts` задаёт общие пути для компонентов и метаданных. Шапка, подвал, блок «Обо мне» и иконки страниц используют одну настройку. Исходники PNG и промпты находятся вне папки публикации и остаются в исходном проекте.

## Происхождение

Изображения подготовлены встроенным ImageGen по пользовательскому референсу. Исходное выделение креста — `glass-cross-source.png`; три варианта упрощения и ракурса — `variants/`. Промпты трёх вариантов сохранены в `variants/prompts.json`. Копии первоначальных вариантов и промптов также оставлены в `design/logo-variants/`, чтобы прежние ссылки на них продолжали работать.

## Промпт исходного выделения креста

Use case: background-extraction. Asset type: transparent PNG brand symbol for the Holy Mayhem developer portfolio. Input image: the attached square artwork is the edit target. Extract ONLY the single glass cross from this exact artwork. Faithfully preserve its silhouette, proportions, orientation, tilt, camera perspective, bevels, dark optical-glass body, thin bright silver/cyan refractive edges and restrained spectral reflections. The reference has a longer downward stem and a shorter upward stem: preserve that exact geometry; do not invert or rotate it. Remove ALL typography, including every part of the words Holy Mayhem seen in front of or through the glass, reconstructing clean dark glass in those areas. Remove the black/blue background, ground plane, cast shadow and atmospheric glow entirely. Output a single isolated complete glass cross, centered with a small even transparent margin, all extremities fully visible. The surrounding background must have genuine alpha transparency, not black or a checkerboard. Preserve dark smoky glass faces so that the symbol reads well on a nearly black website. No letters, no extra symbols, no scenery, no additional objects. This is an extraction/restoration of the reference cross, not a redesigned cross.
