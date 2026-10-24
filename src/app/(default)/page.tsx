import { HomePage } from "@/components/home/home-page";
import { LocalePreference } from "@/components/layout/locale-preference";
import { dictionaries } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "ru",
  dictionaries.ru.seo.title,
  dictionaries.ru.seo.description,
);
export default function Page() {
  return (
    <>
      <LocalePreference />
      <HomePage locale="ru" />
    </>
  );
}
