import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { dictionaries } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/lib/i18n";
import { Shell } from "./shell";
export function MissingPage({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].error;
  return (
    <Shell locale={locale}>
      <div className="container missing-page">
        <span className="error-code">404</span>
        <h1>{d.missing}</h1>
        <p>{d.missingText}</p>
        <Link
          prefetch={false}
          className="button primary"
          href={localizedPath(locale)}
        >
          {d.home}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </Shell>
  );
}
