import { Github, Instagram, Youtube } from "@/components/ui/brand-icons";
import { Send, Link as LinkIcon } from "lucide-react";
import type { SocialIcon as IconName } from "@/config/socials";
const icons = {
  github: Github,
  instagram: Instagram,
  youtube: Youtube,
  telegram: Send,
  link: LinkIcon,
};
export function SocialIcon({
  name,
  size = 21,
}: {
  name: IconName;
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
