import Image from "next/image";
import { getProProducts } from "@/lib/repository";
import { CATEGORY_LABELS, B2B_MIN_ORDER } from "@/types";

const filters = ["Tout", "Bougies", "Parfums d'intérieur", "Céramiques", "Diffuseurs"];

export default async function CataloguePage() {
  const products = await getProProducts();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">Catalogue pro</h1>
          <p className="mt-1 text-ink/50">
            Tarifs revendeurs — prix HT remisés.
          </p>
        </div>
        <div className="rounded-full bg-clay/10 px-4 py-2 text-sm text-clayDark">
          Minimum de commande : {B2B_MIN_ORDER} € HT
        </div>
      </div>

      {/* Filtres (démo) */}
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f, i) => (
          <span
            key={f}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm transition-colors ${
              i === 0
                ? "bg-ink text-cream"
                : "border border-ink/15 text-ink/60 hover:border-ink/40"
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Grille produits */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
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
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="w-16 rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-sm outline-none focus:border-clay"
              />
              <button className="flex-1 rounded-full bg-ink px-4 py-2 text-sm text-cream transition-colors hover:bg-clay">
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
