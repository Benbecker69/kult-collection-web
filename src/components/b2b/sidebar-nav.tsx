"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./brand-logo";

const primary = [
  { href: "/compte/entreprise", label: "Tableau de bord" },
  { href: "/compte/entreprise/catalogue", label: "Catalogue pro" },
  { href: "/compte/entreprise/commandes", label: "Mes commandes" },
  { href: "/compte/entreprise/panier", label: "Panier" },
];

const account = [
  { href: "/compte/entreprise/informations", label: "Informations" },
  { href: "/compte/entreprise/adresses", label: "Adresses" },
  { href: "/compte/entreprise/favoris", label: "Favoris" },
];

const soon = ["Réductions", "Moyens de paiement"];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/compte/entreprise"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8">
        <BrandLogo href="/entreprise" onClick={onNavigate} />
      </div>

      <nav className="flex flex-col gap-1">
        {primary.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            className={`rounded-xl px-4 py-2.5 text-sm transition-colors ${
              isActive(l.href)
                ? "bg-clay text-cream"
                : "text-ink/70 hover:bg-cream hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <p className="mb-2 mt-8 px-4 text-xs uppercase tracking-widest text-ink/40">
        Mon compte
      </p>
      <nav className="flex flex-col gap-1">
        {account.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            className={`rounded-xl px-4 py-2.5 text-sm transition-colors ${
              isActive(l.href)
                ? "bg-clay text-cream"
                : "text-ink/70 hover:bg-cream hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        ))}
        {soon.map((s) => (
          <span
            key={s}
            className="cursor-default rounded-xl px-4 py-2.5 text-sm text-ink/30"
          >
            {s}
          </span>
        ))}
      </nav>
    </div>
  );
}
