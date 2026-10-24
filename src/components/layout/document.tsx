import type { ReactNode } from "react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
export function Document({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <html
      lang={locale}
      className={`${body.variable} ${display.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
