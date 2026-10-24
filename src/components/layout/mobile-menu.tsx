"use client";
import { Github } from "@/components/ui/brand-icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { dictionaries } from "@/content/dictionaries";
import { site } from "@/config/site";
import { ExternalLink } from "@/components/ui/external-link";
export function MobileMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const d = dictionaries[locale].nav;
  useEffect(() => {
    if (!open) return;
    const trigger = toggle.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button,a")?.focus();
    function keydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items =
        panel.current?.querySelectorAll<HTMLElement>("a[href],button");
      if (!items?.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
      trigger?.focus();
    };
  }, [open]);
  const links = [
    { label: d.home, path: "" },
    { label: d.projects, path: "/projects" },
    { label: d.about, path: "#about" },
    { label: d.contact, path: "#contact" },
  ];
  return (
    <>
      <button
        className="icon-button mobile-toggle"
        ref={toggle}
        onClick={() => setOpen(true)}
        aria-label={d.menu}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: reducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              id="mobile-menu"
              className="mobile-panel"
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-label={d.menu}
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -12 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-panel-top">
                <span>HOLY MAYHEM</span>
                <button
                  className="icon-button"
                  onClick={() => setOpen(false)}
                  aria-label={d.close}
                >
                  <X />
                </button>
              </div>
              <nav>
                {links.map((link) => (
                  <Link
                    prefetch={false}
                    key={link.label}
                    href={
                      link.path.startsWith("#")
                        ? `${localizedPath(locale)}${link.path}`
                        : localizedPath(locale, link.path)
                    }
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                    <ArrowUpRight size={24} />
                  </Link>
                ))}
              </nav>
              <ExternalLink href={site.github} className="button secondary">
                <Github size={18} />
                GitHub
                <ArrowUpRight size={16} />
              </ExternalLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
