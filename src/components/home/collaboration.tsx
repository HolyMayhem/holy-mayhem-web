import { ArrowUpRight, Bot, Clapperboard, Globe, PenTool } from "lucide-react";
import { dictionaries } from "@/content/dictionaries";
import { socialLinks } from "@/config/socials";
import { ExternalLink } from "@/components/ui/external-link";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";

const serviceIcons = {
  bots: Bot,
  websites: Globe,
  motion: Clapperboard,
  graphics: PenTool,
};

export function Collaboration({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].collaboration;
  const contact = socialLinks.find((link) => link.id === "contact");

  return (
    <section
      id="collaboration"
      className="container section collaboration"
      aria-labelledby="collaboration-title"
    >
      <Reveal className="collaboration-layout">
        <div className="section-heading collaboration-heading">
          <div>
            <p className="section-label">{d.label}</p>
            <h2 id="collaboration-title">{d.title}</h2>
            <p className="section-description">{d.intro}</p>
            <p className="collaboration-terms">{d.terms}</p>
            {contact && (
              <ExternalLink href={contact.url} className="button primary">
                {d.button}
                <ArrowUpRight size={16} aria-hidden="true" />
              </ExternalLink>
            )}
            <p className="collaboration-note">{d.note}</p>
          </div>
        </div>
        <ul className="collaboration-services">
          {(Object.keys(serviceIcons) as Array<keyof typeof serviceIcons>).map(
            (id) => {
              const Icon = serviceIcons[id];
              const service = d.services[id];
              return (
                <li key={id} className="collaboration-service">
                  <Icon size={23} strokeWidth={1.4} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </li>
              );
            },
          )}
        </ul>
      </Reveal>
    </section>
  );
}
