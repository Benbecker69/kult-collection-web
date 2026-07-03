import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  showPro?: boolean;
  onClick?: () => void;
  /** hauteur du logo */
  size?: "sm" | "md";
};

/**
 * Logo KULT présenté dans un écusson cobalt (le wordmark est clair, donc mis
 * en valeur sur fond coloré). Utilisé dans le header, la sidebar et la topbar.
 */
export function BrandLogo({
  href,
  showPro = true,
  onClick,
  size = "md",
}: BrandLogoProps) {
  const h = size === "sm" ? "h-4" : "h-5";

  const inner = (
    <span className="flex items-center gap-2">
      <span className="inline-flex items-center rounded-lg bg-clay px-2.5 py-1.5 shadow-sm">
        <Image
          src="/icons/logo.png"
          alt="KULT Collection"
          width={92}
          height={26}
          className={`${h} w-auto`}
          priority
        />
      </span>
      {showPro && (
        <span className="text-sm font-medium text-ink/50">Pro</span>
      )}
    </span>
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="KULT Collection — Espace pro"
      className="inline-flex"
    >
      {inner}
    </Link>
  );
}
