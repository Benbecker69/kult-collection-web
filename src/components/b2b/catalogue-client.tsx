"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CATEGORY_LABELS,
  B2B_MIN_ORDER,
  type Category,
  type ProProduct,
} from "@/types";
import { useCart } from "@/stores/cart-store";

const filters: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "bougies", label: "Bougies" },
  { key: "parfums", label: "Parfums d'intérieur" },
  { key: "ceramiques", label: "Céramiques" },
  { key: "diffuseurs", label: "Diffuseurs" },
];

export function CatalogueClient({ products }: { products: ProProduct[] }) {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [query, setQuery] = useState("");
  const [qtys, setQtys] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<string | null>(null);
  const add = useCart((s) => s.add);

  const visible = useMemo(
    () =>
      products.filter(
        (p) =>
          (filter === "all" || p.category === filter) &&
          p.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [products, filter, query],
  );

  function handleAdd(p: ProProduct) {
    const qty = qtys[p.slug] ?? 1;
    add(
      { slug: p.slug, name: p.name, image: p.image, proPrice: p.proPrice },
      qty,
    );
    setAdded(p.slug);
    setTimeout(() => setAdded((s) => (s === p.slug ? null : s)), 1300);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Catalogue pro
          </h1>
          <p className="mt-1 text-ink/50">Tarifs revendeurs — prix HT remisés.</p>
        </div>
        <div className="rounded-full bg-clay/10 px-4 py-2 text-sm text-clayDark">
          Minimum de commande : {B2B_MIN_ORDER} € HT
        </div>
      </div>

      {/* Recherche + filtres */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === f.key
                  ? "bg-ink text-cream"
                  : "border border-ink/15 text-ink/60 hover:border-ink/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un produit…"
          className="w-full rounded-full border border-ink/15 bg-white/70 px-4 py-2 text-sm outline-none transition-colors focus:border-clay md:w-64"
        />
      </div>

      {/* Grille produits */}
      {visible.length === 0 ? (
        <p className="mt-16 text-center text-ink/50">
          Aucun produit ne correspond à votre recherche.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const qty = qtys[p.slug] ?? 1;
            return (
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
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-medium text-ink">
                    {p.proPrice.toFixed(2)} €
                    <span className="ml-1 text-xs text-ink/40">HT</span>
                  </span>
                  <span className="text-sm text-ink/40 line-through">
                    {p.price.toFixed(2)} €
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center rounded-lg border border-ink/15">
                    <button
                      onClick={() =>
                        setQtys((q) => ({
                          ...q,
                          [p.slug]: Math.max(1, qty - 1),
                        }))
                      }
                      className="grid h-9 w-8 place-items-center text-ink/60 hover:text-ink"
                      aria-label="Diminuer"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button
                      onClick={() =>
                        setQtys((q) => ({ ...q, [p.slug]: qty + 1 }))
                      }
                      className="grid h-9 w-8 place-items-center text-ink/60 hover:text-ink"
                      aria-label="Augmenter"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleAdd(p)}
                    className={`flex-1 rounded-full px-4 py-2 text-sm transition-colors ${
                      added === p.slug
                        ? "bg-olive text-cream"
                        : "bg-clay text-cream hover:bg-clayDark"
                    }`}
                  >
                    {added === p.slug ? "Ajouté ✓" : "Ajouter"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
