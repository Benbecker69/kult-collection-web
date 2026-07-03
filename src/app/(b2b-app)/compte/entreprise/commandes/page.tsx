import Link from "next/link";
import { getB2bOrders } from "@/lib/repository";
import { StatusBadge } from "@/components/b2b/status-badge";

export default async function CommandesPage() {
  const orders = await getB2bOrders();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl text-ink">Mes commandes</h1>
        <p className="mt-1 text-ink/50">
          Suivez l&apos;état de vos commandes et de vos livraisons.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-white/60">
        <div className="hidden grid-cols-12 gap-4 border-b border-ink/10 px-6 py-3 text-xs uppercase tracking-widest text-ink/40 md:grid">
          <div className="col-span-3">N°</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-2">Montant</div>
          <div className="col-span-2">Statut</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {orders.map((o) => (
          <div
            key={o.id}
            className="grid grid-cols-2 items-center gap-3 border-b border-ink/5 px-6 py-4 transition-colors last:border-0 hover:bg-sand/30 md:grid-cols-12"
          >
            <div className="font-medium text-ink md:col-span-3">{o.id}</div>
            <div className="text-sm text-ink/60 md:col-span-3">
              {new Date(o.date).toLocaleDateString("fr-FR")}
            </div>
            <div className="text-sm text-ink md:col-span-2">
              {o.totalHT.toFixed(2)} € HT
            </div>
            <div className="md:col-span-2">
              <StatusBadge status={o.status} />
            </div>
            <div className="text-right md:col-span-2">
              <Link
                href={`/compte/entreprise/commandes/${o.id}`}
                className="text-sm text-clay hover:underline"
              >
                Détail →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
