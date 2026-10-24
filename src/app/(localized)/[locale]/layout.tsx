import type { ReactNode } from "react";
import type { Metadata } from "next";
import { brandIcons } from "@/config/brand";
import { notFound } from "next/navigation";
import { locales, isLocale } from "@/lib/i18n";
import { Document } from "@/components/layout/document";
import { absoluteUrl } from "@/config/site";
import "../../globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  icons: brandIcons,
};
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Document locale={locale}>{children}</Document>;
}
