import type { Metadata } from "next";
import { brandIcons } from "@/config/brand";
import { Document } from "@/components/layout/document";
import { MissingRoute } from "@/components/layout/missing-route";
import "./globals.css";
export const metadata: Metadata = {
  title: "404 — Holy Mayhem",
  icons: brandIcons,
  robots: { index: false, follow: false },
};
export default function GlobalNotFound() {
  return (
    <Document locale="ru">
      <MissingRoute />
    </Document>
  );
}
