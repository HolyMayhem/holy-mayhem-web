"use client";
import { useParams } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
export function ErrorState({ reset }: { reset: () => void }) {
  const params = useParams();
  const value = params?.locale;
  const locale = typeof value === "string" && isLocale(value) ? value : "ru";
  const d = dictionaries[locale].error;
  return (
    <main id="main" className="container missing-page">
      <h1>{d.title}</h1>
      <p>{d.description}</p>
      <button className="button primary" onClick={reset}>
        {d.retry}
      </button>
    </main>
  );
}
