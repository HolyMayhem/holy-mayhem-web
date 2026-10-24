import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/config/site";
import { brandAssets } from "@/config/brand";
import { localizedPath, type Locale } from "@/lib/i18n";
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Image
      className={`brand-mark ${className}`}
      src={assetPath(brandAssets.mark)}
      width={32}
      height={44}
      alt=""
      sizes="32px"
      loading="eager"
      aria-hidden="true"
    />
  );
}
export function Brand({ locale }: { locale: Locale }) {
  return (
    <Link
      prefetch={false}
      href={localizedPath(locale)}
      className="brand"
      aria-label="Holy Mayhem"
    >
      <BrandMark />
      <span>
        HOLY MAYHEM<span className="brand-dot">✳</span>
      </span>
    </Link>
  );
}
