"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, totalItems } from "@/stores/cart-store";
import { useOrders, nextOrderId } from "@/stores/orders-store";
import { useAccount } from "@/stores/account-store";
import { useHydrated } from "@/lib/use-hydrated";
import { B2B_MIN_ORDER, type Order } from "@/types";

const PAYMENTS = ["Virement", "Carte bancaire", "Paiement à 30 jours"];

export default function PanierPage() {
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const addresses = useAccount((s) => s.addresses);
  const orders = useOrders((s) => s.orders);
  const addOrder = useOrders((s) => s.addOrder);
  const router = useRouter();

  const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0];
  const [addressId, setAddressId] = useState<string>("");
  const [payment, setPayment] = useState(PAYMENTS[0]);

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-2xl bg-sand/40" />;
  }

  const total = totalItems(items);
  const reached = total >= B2B_MIN_ORDER;
  const currentAddress =
    addresses.find((a) => a.id === (addressId || defaultAddr?.id)) ?? defaultAddr;

  function confirm() {
    if (!reached || items.length === 0) return;
    const id = nextOrderId(orders);
    const order: Order = {
      id,
      date: new Date().toISOString().slice(0, 10),
      status: "validee",
      items: items.map((i) => ({
        name: i.name,
        image: i.image,
        qty: i.qty,
        unitPrice: i.proPrice,
      })),
      totalHT: Math.round(total * 100) / 100,
      carrier: "Chronopost",
      delivery: [
        { label: "Commande préparée", done: false },
        { label: "Expédiée", done: false },
        { label: "En transit", done: false },
        { label: "En cours de livraison", done: false },
        { label: "Livrée", done: false },
      ],
      address: currentAddress
        ? `${currentAddress.label} — ${currentAddress.line}, ${currentAddress.city}`
        : "—",
      payment,
    };
    addOrder(order);
    clear();
    router.push(`/compte/entreprise/commandes/${id}?nouvelle=1`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-ink/50">
          Parcourez le catalogue pro pour composer votre commande.
        </p>
        <Link
          href="/compte/entreprise/catalogue"
          className="mt-6 inline-block rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
        >
          Aller au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="animate-fade-up font-display text-3xl font-semibold text-ink">
        Panier pro
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        {/* Articles */}
        <div className="space-y-3">
          {items.map((i) => (
            <div
              key={i.slug}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/60 p-4"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-sand/50">
                <Image src={i.image} alt={i.name} width={48} height={48} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{i.name}</p>
                <p className="text-xs text-ink/50">
                  {i.proPrice.toFixed(2)} € HT / unité
                </p>
              </div>
              <div className="flex items-center rounded-lg border border-ink/15">
                <button
                  onClick={() => setQty(i.slug, i.qty - 1)}
                  className="grid h-9 w-8 place-items-center text-ink/60 hover:text-ink"
                  aria-label="Diminuer"
                >
                  −
                </button>
                <span className="w-7 text-center text-sm">{i.qty}</span>
                <button
                  onClick={() => setQty(i.slug, i.qty + 1)}
                  className="grid h-9 w-8 place-items-center text-ink/60 hover:text-ink"
                  aria-label="Augmenter"
                >
                  +
                </button>
              </div>
              <div className="hidden w-20 text-right text-sm font-medium text-ink sm:block">
                {(i.proPrice * i.qty).toFixed(2)} €
              </div>
              <button
                onClick={() => remove(i.slug)}
                className="text-ink/30 transition-colors hover:text-clay"
                aria-label="Retirer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Récap / validation */}
        <div className="h-fit space-y-4 rounded-2xl border border-ink/10 bg-white/60 p-5 lg:sticky lg:top-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink/60">Sous-total HT</span>
            <span className="font-display text-xl font-semibold text-ink">
              {total.toFixed(2)} €
            </span>
          </div>

          {!reached && (
            <div className="rounded-xl bg-clay/10 px-3 py-2 text-xs text-clayDark">
              Minimum {B2B_MIN_ORDER} € HT — il manque{" "}
              {(B2B_MIN_ORDER - total).toFixed(2)} €.
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest text-ink/40">
              Adresse de livraison
            </label>
            <select
              value={addressId || defaultAddr?.id || ""}
              onChange={(e) => setAddressId(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-clay"
            >
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} — {a.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest text-ink/40">
              Moyen de paiement
            </label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-clay"
            >
              {PAYMENTS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <button
            onClick={confirm}
            disabled={!reached}
            className={`w-full rounded-full px-6 py-3 text-sm font-medium transition-colors ${
              reached
                ? "bg-clay text-cream hover:bg-clayDark"
                : "cursor-not-allowed bg-ink/10 text-ink/40"
            }`}
          >
            Confirmer la commande
          </button>
          <Link
            href="/compte/entreprise/catalogue"
            className="block text-center text-sm text-ink/50 transition-colors hover:text-ink"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}
