"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primary = [
  { href: "/compte/entreprise", label: "Tableau de bord" },
  { href: "/compte/entreprise/catalogue", label: "Catalogue pro" },
  { href: "/compte/entreprise/commandes", label: "Mes commandes" },
];

const secondary = [
  "Informations",
  "Adresses",
  "Réductions",
  "Moyens de paiement",
  "Favoris",
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/10 bg-sand/40 p-5 md:flex">
      <Link href="/entreprise" className="mb-8 font-display text-xl text-ink">
        KULT <span className="text-clay">Pro</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {primary.map((l) => {
          const active =
            l.href === "/compte/entreprise"
              ? pathname === l.href
              : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-xl px-4 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-clay text-cream"
                  : "text-ink/70 hover:bg-cream hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <p className="mb-2 mt-8 px-4 text-xs uppercase tracking-widest text-ink/40">
        Mon compte
      </p>
      <nav className="flex flex-col gap-1">
        {secondary.map((s) => (
          <span
            key={s}
            className="cursor-default rounded-xl px-4 py-2.5 text-sm text-ink/40"
          >
            {s}
          </span>
        ))}
      </nav>
    </aside>
  );
}
