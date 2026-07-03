import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderStatus } from "@/types";
import { seedOrders } from "@/lib/repository";

const FLOW: OrderStatus[] = [
  "validee",
  "preparation",
  "expediee",
  "en_livraison",
  "livree",
];

function nowLabel() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function randomTracking() {
  return "XY" + Math.floor(100000000 + Math.random() * 900000000) + "FR";
}

/** Fait avancer une commande d'une étape (statut + suivi de livraison). */
function advanceOne(o: Order): Order {
  if (o.status === "annulee") return o;
  const i = FLOW.indexOf(o.status);
  if (i < 0 || i >= FLOW.length - 1) return o;
  const nextStatus = FLOW[i + 1];
  const delivery = o.delivery.map((s) => ({ ...s }));
  const firstUndone = delivery.findIndex((s) => !s.done);
  if (firstUndone >= 0) {
    delivery[firstUndone].done = true;
    delivery[firstUndone].date = nowLabel();
  }
  const trackingNumber =
    nextStatus === "expediee" && !o.trackingNumber
      ? randomTracking()
      : o.trackingNumber;
  return { ...o, status: nextStatus, delivery, trackingNumber };
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  advance: (id: string) => void;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: seedOrders(),
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
      advance: (id) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? advanceOne(o) : o)),
        })),
    }),
    { name: "kult-b2b-orders", version: 1 },
  ),
);

/** Génère le prochain identifiant de commande (KP-xxxx). */
export function nextOrderId(orders: Order[]): string {
  const nums = orders
    .map((o) => parseInt(o.id.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1042;
  return `KP-${max + 1}`;
}
