"use client";

import Link from "next/link";
import { useCart, countItems } from "@/stores/cart-store";
import { useAccount } from "@/stores/account-store";
import { useHydrated } from "@/lib/use-hydrated";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Topbar({ onBurger }: { onBurger?: () => void }) {
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const company = useAccount((s) => s.company);
  const count = hydrated ? countItems(items) : 0;

  return (
    <header className="flex h-16 items-center justify-between border-b border-ink/10 bg-cream px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBurger}
          aria-label="Ouvrir le menu"
          className="grid h-9 w-9 place-items-center rounded-lg text-ink/70 transition-colors hover:bg-sand/60 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="font-display text-lg font-semibold text-ink md:hidden">
          KULT <span className="text-clay">Pro</span>
        </div>
        <div className="hidden text-sm text-ink/50 md:block">
          Espace revendeur
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Link
          href="/compte/entreprise/panier"
          aria-label="Panier"
          className="relative grid h-9 w-9 place-items-center rounded-lg text-ink/70 transition-colors hover:bg-sand/60"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.4" fill="currentColor" />
            <circle cx="18" cy="20" r="1.4" fill="currentColor" />
          </svg>
          {hydrated && count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] font-medium text-cream">
              {count}
            </span>
          )}
        </Link>

        <div className="hidden text-right leading-tight sm:block">
          <p className="text-sm font-medium text-ink">
            {hydrated ? company : " "}
          </p>
          <p className="text-xs text-ink/40">Compte pro validé</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-clay text-sm font-medium text-cream">
          {hydrated ? initials(company) : ""}
        </div>
      </div>
    </header>
  );
}
