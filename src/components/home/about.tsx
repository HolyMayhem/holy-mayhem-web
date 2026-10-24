import { Code2, Layers3, Sparkles } from "lucide-react";
import { dictionaries } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { BrandMark } from "@/components/ui/brand";
import { Reveal } from "@/components/motion/reveal";
export function About({ locale }: { locale: Locale }) {
  const d = dictionaries[locale].about;
  const icons = [Layers3, Code2, Sparkles];
  return (
    <section id="about" className="container section about">
      <Reveal className="about-layout">
        <div>
          <p className="section-label">{d.label}</p>
          <h2 className="about-title">{d.title}</h2>
          <div className="about-signature">
            <BrandMark />
            <span>
              Holy Mayhem<span>{d.role}</span>
            </span>
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">{d.description}</p>
          <p>{d.second}</p>
          <div className="about-values">
            {d.values.map((value, i) => {
              const Icon = icons[i];
              return (
                <span key={value}>
                  <Icon size={16} strokeWidth={1.5} />
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      </Reveal>
      <div className="about-note">
        <span className="small-cross">+</span>
        {d.note}
        <span className="small-cross">+</span>
      </div>
    </section>
  );
}
