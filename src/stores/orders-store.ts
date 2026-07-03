import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types";
import { seedOrders } from "@/lib/repository";

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: seedOrders(),
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
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
