import registry from "../../assets/brand/variants.json";
import { absoluteUrl } from "@/config/site";

const variant = registry.active;
if (
  !/^[a-z0-9-]+$/.test(variant) ||
  !Object.hasOwn(registry.variants, variant)
) {
  throw new Error(`Unknown brand variant: ${variant}`);
}

export const brandAssets = {
  variant,
  mark: `/images/brand/glass-cross-${variant}.webp`,
  png: `/images/brand/glass-cross-${variant}.png`,
  favicon: `/images/brand/favicon-${variant}.png`,
  apple: `/images/brand/apple-touch-icon-${variant}.png`,
};

export const brandIcons = {
  icon: absoluteUrl(brandAssets.favicon),
  apple: absoluteUrl(brandAssets.apple),
};
