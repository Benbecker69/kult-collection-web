"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useOrders } from "@/stores/orders-store";
import { useCart } from "@/stores/cart-store";
import { useToasts } from "@/stores/toast-store";
import { useHydrated } from "@/lib/use-hydrated";
import { StatusBadge } from "@/components/b2b/status-badge";
import { OrderSteps } from "@/components/b2b/order-steps";
import { OrderTimeline } from "@/components/b2b/order-timeline";

function CommandeDetailContent() {
  const hydrated = useHydrated();
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const isNew = search.get("nouvelle") === "1";
  const orders = useOrders((s) => s.orders);
  const advance = useOrders((s) => s.advance);
  const add = useCart((s) => s.add);
  const pushToast = useToasts((s) => s.push);
  const router = useRouter();

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-2xl bg-sand/40" />;
  }

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Commande introuvable
        </h1>
        <Link
          href="/compte/entreprise/commandes"
          className="mt-4 inline-block text-sm text-clay hover:underline"
        >
          ← Retour à mes commandes
        </Link>
      </div>
    );
  }

  const activeOrder = order;

  function reorder() {
    activeOrder.items.forEach((it) =>
      add({
        slug: it.slug ?? it.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: it.name,
        image: it.image,
        proPrice: it.unitPrice,
      }),
    );
    pushToast("Produits ajoutés au panier");
    router.push("/compte/entreprise/panier");
  }

  function handleAdvance() {
    advance(activeOrder.id);
    pushToast("Suivi mis à jour", "info");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/compte/entreprise/commandes"
        className="text-sm text-ink/50 transition-colors hover:text-ink"
      >
        ← Mes commandes
      </Link>

      {isNew && (
        <div className="mt-4 animate-fade-up rounded-2xl bg-olive/15 px-5 py-4 text-sm text-[#3f5a3a]">
          ✓ Commande <span className="font-medium">{order.id}</span> confirmée —
          un récapitulatif vous a été envoyé par e-mail.
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Commande {order.id}
          </h1>
          <p className="text-sm text-ink/50">
            Passée le {new Date(order.date).toLocaleDateString("fr-FR")}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <section className="mt-8 rounded-2xl border border-ink/10 bg-white/60 p-6">
        <h2 className="mb-6 text-xs uppercase tracking-widest text-ink/40">
          Suivi de commande
        </h2>
        <OrderSteps status={order.status} />
        {order.status !== "livree" && order.status !== "annulee" && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAdvance}
              className="rounded-full border border-clay/40 px-4 py-2 text-sm text-clay transition-colors hover:bg-clay hover:text-cream"
            >
              Avancer le suivi (démo) →
            </button>
          </div>
        )}
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-ink/10 bg-white/60 p-6">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-ink/40">
            Articles
          </h2>
          <ul className="space-y-4">
            {order.items.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-sand/50">
                  <Image src={item.image} alt={item.name} width={44} height={44} />
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
            <span className="font-display text-xl font-semibold text-ink">
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
            <button
              onClick={reorder}
              className="rounded-full bg-clay px-4 py-2 text-sm text-cream transition-colors hover:bg-clayDark"
            >
              Recommander
            </button>
          </div>
        </section>

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

export default function CommandeDetailPage() {
  return (
    <Suspense
      fallback={<div className="h-96 animate-pulse rounded-2xl bg-sand/40" />}
    >
      <CommandeDetailContent />
    </Suspense>
  );
}
