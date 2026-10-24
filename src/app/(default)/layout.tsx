import type { ReactNode } from "react";
import type { Metadata } from "next";
import { brandIcons } from "@/config/brand";
import { Document } from "@/components/layout/document";
import { absoluteUrl } from "@/config/site";
import "../globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  icons: brandIcons,
};
export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="ru">{children}</Document>;
}
