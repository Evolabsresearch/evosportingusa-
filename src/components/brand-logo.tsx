import Image from "next/image";

type BrandLogoProps = {
  idPrefix: string;
  tone?: "dark" | "light";
  compact?: boolean;
  title?: string;
};

export function BrandLogo({
  tone = "dark",
  compact = false,
  title = "EVO Sporting USA",
}: BrandLogoProps) {
  return (
    <span
      className={`evo-logo ${compact ? "evo-logo-compact" : "evo-logo-full"} evo-logo-${tone}`}
      role="img"
      aria-label={title}
    >
      <span className="evo-logo-mark-frame" aria-hidden="true">
        <Image
          src="/brand/evo-mark.svg"
          alt=""
          width={180}
          height={180}
          priority
          unoptimized
          aria-hidden="true"
        />
      </span>
      {!compact ? (
        <span className="evo-wordmark" aria-hidden="true">
          <strong>EVO</strong>
          <small>SPORTING USA</small>
        </span>
      ) : null}
    </span>
  );
}
