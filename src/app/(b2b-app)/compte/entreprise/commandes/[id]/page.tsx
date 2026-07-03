import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getB2bOrders, getB2bOrderById } from "@/lib/repository";
import { StatusBadge } from "@/components/b2b/status-badge";
import { OrderSteps } from "@/components/b2b/order-steps";
import { OrderTimeline } from "@/components/b2b/order-timeline";

export async function generateStaticParams() {
  const orders = await getB2bOrders();
  return orders.map((o) => ({ id: o.id }));
}

export default async function CommandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getB2bOrderById(id);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/compte/entreprise/commandes"
        className="text-sm text-ink/50 transition-colors hover:text-ink"
      >
        ← Mes commandes
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 animate-fade-up">
        <div>
          <h1 className="font-display text-3xl text-ink">Commande {order.id}</h1>
          <p className="text-sm text-ink/50">
            Passée le {new Date(order.date).toLocaleDateString("fr-FR")}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Suivi de commande */}
      <section className="mt-8 rounded-2xl border border-ink/10 bg-white/60 p-6">
        <h2 className="mb-6 text-xs uppercase tracking-widest text-ink/40">
          Suivi de commande
        </h2>
        <OrderSteps status={order.status} />
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Articles */}
        <section className="rounded-2xl border border-ink/10 bg-white/60 p-6">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-ink/40">
            Articles
          </h2>
          <ul className="space-y-4">
            {order.items.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-sand/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={44}
                    height={44}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {item.name}
                  </p>
                  <p className="text-xs text-ink/50">
                    {item.qty} × {item.unitPrice.toFixed(2)} € HT
                  </p>
                </div>
                <p className="text-sm text-ink">
                  {(item.qty * item.unitPrice).toFixed(2)} €
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
            <span className="text-sm text-ink/60">Total HT</span>
            <span className="font-display text-xl text-ink">
              {order.totalHT.toFixed(2)} €
            </span>
          </div>
          <div className="mt-4 space-y-1 text-sm text-ink/60">
            <p>
              <span className="text-ink/40">Livraison :</span> {order.address}
            </p>
            <p>
              <span className="text-ink/40">Paiement :</span> {order.payment}
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            <button className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-ink/40">
              Télécharger la facture
            </button>
            <button className="rounded-full bg-clay px-4 py-2 text-sm text-cream transition-colors hover:bg-clayDark">
              Recommander
            </button>
          </div>
        </section>

        {/* Suivi de livraison */}
        <section className="rounded-2xl border border-ink/10 bg-white/60 p-6">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-ink/40">
            Suivi de livraison
          </h2>
          {order.carrier && (
            <div className="mb-5 rounded-xl bg-sand/40 px-4 py-3 text-sm">
              <p className="text-ink/60">
                Transporteur :{" "}
                <span className="font-medium text-ink">{order.carrier}</span>
              </p>
              {order.trackingNumber && (
                <p className="text-ink/60">
                  N° de suivi :{" "}
                  <span className="font-medium text-ink">
                    {order.trackingNumber}
                  </span>
                </p>
              )}
            </div>
          )}
          <OrderTimeline steps={order.delivery} />
          {order.trackingNumber && (
            <button className="mt-4 w-full rounded-full border border-ink/15 px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink/40">
              Suivre chez le transporteur ↗
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
