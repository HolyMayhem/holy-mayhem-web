"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { localizedPath } from "@/lib/i18n";
export function LocalePreference() {
  const router = useRouter();
  useEffect(() => {
    try {
      if (localStorage.getItem("holy-locale") === "en")
        router.replace(localizedPath("en"));
    } catch {}
  }, [router]);
  return null;
}
