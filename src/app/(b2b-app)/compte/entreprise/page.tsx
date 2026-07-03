import Link from "next/link";
import { getB2bOrders } from "@/lib/repository";
import { StatusBadge } from "@/components/b2b/status-badge";

const shortcuts = [
  { href: "/compte/entreprise/catalogue", label: "Commander", hint: "Catalogue pro" },
  { href: "/compte/entreprise/commandes", label: "Mes commandes", hint: "Historique & suivi" },
  { href: "/compte/entreprise/commandes", label: "Suivre une livraison", hint: "En temps réel" },
  { href: "/compte/entreprise/catalogue", label: "Réassort favoris", hint: "En un clic" },
];

export default async function DashboardPage() {
  const orders = await getB2bOrders();
  const enCours = orders.filter(
    (o) => o.status !== "livree" && o.status !== "annulee",
  );
  const livrees = orders.filter((o) => o.status === "livree");
  const totalHT = orders
    .filter((o) => o.status !== "annulee")
    .reduce((sum, o) => sum + o.totalHT, 0);
  const last = orders[0];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl text-ink">Bonjour, Maison Léa 👋</h1>
        <p className="mt-1 text-ink/50">Voici l&apos;activité de votre compte revendeur.</p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { v: enCours.length, l: "Commandes en cours" },
          { v: livrees.length, l: "Commandes livrées" },
          { v: `${totalHT.toFixed(0)} €`, l: "Total HT commandé" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-ink/10 bg-white/60 p-6"
          >
            <p className="font-display text-3xl text-clay">{s.v}</p>
            <p className="mt-1 text-sm text-ink/60">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Dernière commande */}
      {last && (
        <div className="mt-6 rounded-2xl border border-ink/10 bg-white/60 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-ink/40">
              Dernière commande
            </p>
            <StatusBadge status={last.status} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-2xl text-ink">{last.id}</p>
              <p className="text-sm text-ink/50">
                {new Date(last.date).toLocaleDateString("fr-FR")} ·{" "}
                {last.totalHT.toFixed(2)} € HT
              </p>
            </div>
            <Link
              href={`/compte/entreprise/commandes/${last.id}`}
              className="rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
            >
              Suivre la commande
            </Link>
          </div>
        </div>
      )}

      {/* Raccourcis */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shortcuts.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-2xl border border-ink/10 bg-sand/40 p-5 transition-all hover:-translate-y-1 hover:border-clay/30 hover:bg-white/70 hover:shadow-md"
          >
            <p className="font-medium text-ink">{s.label}</p>
            <p className="mt-1 text-sm text-ink/50">{s.hint}</p>
            <span className="mt-3 inline-block text-clay transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
