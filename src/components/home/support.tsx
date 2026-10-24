import { ArrowUpRight, Heart } from "lucide-react";
import { dictionaries } from "@/content/dictionaries";
import { site } from "@/config/site";
import { ExternalLink } from "@/components/ui/external-link";
import type { Locale } from "@/lib/i18n";
export function Support({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].support;
  return (
    <section className="container support">
      <div className="support-inner">
        <div className="support-icon">
          <Heart size={25} strokeWidth={1.3} />
        </div>
        <div className="support-copy">
          <h2>{d.title}</h2>
          <p>{d.description}</p>
        </div>
        <div className="support-action">
          <ExternalLink href={site.support} className="button secondary">
            {d.button}
            <ArrowUpRight size={16} />
          </ExternalLink>
          <span>{d.note}</span>
        </div>
      </div>
    </section>
  );
}
