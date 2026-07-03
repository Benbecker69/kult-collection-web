import { ORDER_STATUS_LABELS, type OrderStatus } from "@/types";

const styles: Record<OrderStatus, string> = {
  validee: "bg-kultBlue/10 text-kultBlue",
  preparation: "bg-gold/20 text-[#8a5e10]",
  expediee: "bg-clay/15 text-clayDark",
  en_livraison: "bg-olive/15 text-olive",
  livree: "bg-olive/25 text-[#4a5537]",
  annulee: "bg-ink/10 text-ink/50",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
