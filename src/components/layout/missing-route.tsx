"use client";
import { useEffect, useSyncExternalStore } from "react";
import { site } from "@/config/site";
import { type Locale } from "@/lib/i18n";
import { MissingPage } from "./missing-page";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}
function getLocale(): Locale {
  const path = window.location.pathname.slice(site.basePath.length);
  return /^\/en(?:\/|$)/.test(path) ? "en" : "ru";
}
export function MissingRoute() {
  const locale = useSyncExternalStore(
    subscribe,
    getLocale,
    () => "ru" as Locale,
  );
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return <MissingPage locale={locale} />;
}
