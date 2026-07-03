"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, type ProProduct } from "@/types";
import { useFavorites } from "@/stores/favorites-store";
import { useCart } from "@/stores/cart-store";
import { useToasts } from "@/stores/toast-store";
import { useHydrated } from "@/lib/use-hydrated";

export function FavoritesClient({ products }: { products: ProProduct[] }) {
  const hydrated = useHydrated();
  const favs = useFavorites((s) => s.slugs);
  const toggle = useFavorites((s) => s.toggle);
  const add = useCart((s) => s.add);
  const pushToast = useToasts((s) => s.push);

  const items = useMemo(
    () => products.filter((p) => favs.includes(p.slug)),
    [products, favs],
  );

  function addAll() {
    items.forEach((p) =>
      add({ slug: p.slug, name: p.name, image: p.image, proPrice: p.proPrice }),
    );
    pushToast(`${items.length} produit(s) ajouté(s) au panier`);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Mes favoris
          </h1>
          <p className="mt-1 text-ink/50">
            Vos produits favoris, pour un réassort rapide.
          </p>
        </div>
        {hydrated && items.length > 0 && (
          <button
            onClick={addAll}
            className="rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
          >
            Tout ajouter au panier
          </button>
        )}
      </div>

      {!hydrated ? (
        <div className="mt-8 h-48 animate-pulse rounded-2xl bg-sand/40" />
      ) : items.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-ink/50">Vous n&apos;avez pas encore de favoris.</p>
          <Link
            href="/compte/entreprise/catalogue"
            className="mt-4 inline-block rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
          >
            Parcourir le catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div
              key={p.slug}
              className="group rounded-2xl border border-ink/10 bg-white/60 p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-sand/50">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={150}
                  height={150}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-clay">
                {CATEGORY_LABELS[p.category]}
              </p>
              <h3 className="mt-1 text-sm font-medium text-ink">{p.name}</h3>
              <p className="mt-1 text-ink">
                {p.proPrice.toFixed(2)} €{" "}
                <span className="text-xs text-ink/40">HT</span>
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    add({
                      slug: p.slug,
                      name: p.name,
                      image: p.image,
                      proPrice: p.proPrice,
                    });
                    pushToast(`${p.name} ajouté au panier`);
                  }}
                  className="flex-1 rounded-full bg-clay px-4 py-2 text-sm text-cream transition-colors hover:bg-clayDark"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => {
                    toggle(p.slug);
                    pushToast("Retiré des favoris", "info");
                  }}
                  className="rounded-full border border-ink/15 px-3 py-2 text-sm text-ink/60 transition-colors hover:border-ink/40"
                  aria-label="Retirer des favoris"
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
