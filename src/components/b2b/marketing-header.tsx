import Link from "next/link";
import { BrandLogo } from "./brand-logo";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <BrandLogo href="/entreprise" />

        <nav className="hidden items-center gap-8 text-sm text-ink/70 md:flex">
          <a href="#secteurs" className="transition-colors hover:text-clay">
            Secteurs
          </a>
          <a href="#services" className="transition-colors hover:text-clay">
            Services
          </a>
          <a href="#devis" className="transition-colors hover:text-clay">
            Devis
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/connexion"
            className="text-sm text-ink/70 transition-colors hover:text-ink"
          >
            Connexion
          </Link>
          <Link
            href="/entreprise/inscription"
            className="rounded-full bg-clay px-4 py-2 text-sm text-cream transition-colors hover:bg-clayDark"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </header>
  );
}
