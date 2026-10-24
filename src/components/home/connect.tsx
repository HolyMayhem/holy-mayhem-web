import { ArrowUpRight } from "lucide-react";
import { dictionaries } from "@/content/dictionaries";
import { socialLinks } from "@/config/socials";
import { ExternalLink } from "@/components/ui/external-link";
import { SocialIcon } from "@/components/ui/social-icon";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
export function Connect({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].connect;
  return (
    <section id="contact" className="container section connect">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="section-label">{d.label}</p>
            <h2>{d.title}</h2>
            <p className="section-description">{d.intro}</p>
          </div>
        </div>
        <div className="social-grid">
          {socialLinks.map((s) => (
            <ExternalLink key={s.id} href={s.url} className="social-card">
              <div className="social-card-top">
                <span className="social-icon">
                  <SocialIcon name={s.icon} />
                </span>
                <ArrowUpRight size={19} />
              </div>
              <h3>{s.id === "contact" ? d.direct : s.name}</h3>
              <span className="social-handle">{s.handle}</span>
              <p>{s.description[locale]}</p>
            </ExternalLink>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
