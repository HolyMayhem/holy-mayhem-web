import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";

// Archive sources stay untouched. Generate delivery assets for the selected variant.
const registry = JSON.parse(
  await readFile("assets/brand/variants.json", "utf8"),
);
const variant = registry.active;
if (
  typeof variant !== "string" ||
  !/^[a-z0-9-]+$/.test(variant) ||
  !Object.hasOwn(registry.variants, variant)
) {
  throw new Error(`Unknown brand variant: ${variant}`);
}
const source = registry.variants[variant].source;
const destination = "public/images/brand";
await mkdir(destination, { recursive: true });
const trimmed = await sharp(source)
  .trim({ background: "#00000000", threshold: 1 })
  .toBuffer();
await sharp(trimmed)
  .resize({ height: 1200, withoutEnlargement: true })
  .png()
  .toFile(`${destination}/glass-cross-${variant}.png`);
await sharp(trimmed)
  .resize({ height: 192, withoutEnlargement: true })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(`${destination}/glass-cross-${variant}.webp`);
await sharp(trimmed)
  .resize(64, 64, { fit: "contain", background: "#00000000" })
  .png()
  .toFile(`${destination}/favicon-${variant}.png`);
await sharp(trimmed)
  .resize(180, 180, { fit: "contain", background: "#08090b" })
  .flatten({ background: "#08090b" })
  .png()
  .toFile(`${destination}/apple-touch-icon-${variant}.png`);
console.log(`Brand assets prepared: ${variant}. Archive sources preserved.`);
