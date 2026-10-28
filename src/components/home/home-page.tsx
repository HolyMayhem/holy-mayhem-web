import type { Locale } from "@/lib/i18n";
import { Shell } from "@/components/layout/shell";
import { Hero } from "./hero";
import { Featured } from "./featured";
import { About } from "./about";
import { Collaboration } from "./collaboration";
import { Connect } from "./connect";
import { Support } from "./support";
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <Shell locale={locale}>
      <Hero locale={locale} />
      <Featured locale={locale} />
      <About locale={locale} />
      <Collaboration locale={locale} />
      <Connect locale={locale} />
      <Support locale={locale} />
    </Shell>
  );
}
