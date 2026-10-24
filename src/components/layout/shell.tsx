import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { Header } from "./header";
import { Footer } from "./footer";
export function Shell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Header locale={locale} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
