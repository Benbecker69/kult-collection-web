// Types de données partagés — KULT Collection
// Ces types décrivent le "contrat" de données consommé par les composants.
// Ils restent identiques que la donnée vienne du JSON (aujourd'hui) ou d'un CMS (demain).

export type Category = "bougies" | "parfums" | "ceramiques" | "diffuseurs";

export const CATEGORY_LABELS: Record<Category, string> = {
  bougies: "Bougies",
  parfums: "Parfums d'intérieur",
  ceramiques: "Céramiques",
  diffuseurs: "Diffuseurs",
};

export interface Collection {
  slug: string;
  name: string;
  image: string;
  description?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  /** Collection à laquelle appartient le produit (slug) */
  collectionSlug?: string;
  /** Prix TTC en euros */
  price: number;
  image: string;
  description?: string;
  /** Mis en avant dans la sélection / bestsellers de la home */
  featured?: boolean;
}

// ------------------------------------------------------------------
//  Espace B2B — commandes, livraison, catalogue pro
// ------------------------------------------------------------------

/** Produit vu côté pro : prix public + prix pro (remisé) */
export interface ProProduct extends Product {
  proPrice: number;
}

export type OrderStatus =
  | "validee"
  | "preparation"
  | "expediee"
  | "en_livraison"
  | "livree"
  | "annulee";

/** Étapes du suivi de commande, dans l'ordre. */
export const ORDER_STEPS: { key: OrderStatus; label: string }[] = [
  { key: "validee", label: "Validée" },
  { key: "preparation", label: "En préparation" },
  { key: "expediee", label: "Expédiée" },
  { key: "en_livraison", label: "En livraison" },
  { key: "livree", label: "Livrée" },
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  validee: "Validée",
  preparation: "En préparation",
  expediee: "Expédiée",
  en_livraison: "En livraison",
  livree: "Livrée",
  annulee: "Annulée",
};

export interface OrderItem {
  slug?: string;
  name: string;
  image: string;
  qty: number;
  /** Prix unitaire pro (HT) */
  unitPrice: number;
}

export interface DeliveryStep {
  label: string;
  date?: string;
  done: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  /** Total HT en euros */
  totalHT: number;
  carrier?: string;
  trackingNumber?: string;
  delivery: DeliveryStep[];
  address: string;
  payment: string;
}

/** Minimum de commande pour les comptes pro (HT). */
export const B2B_MIN_ORDER = 150;

/** Remise pro appliquée au prix public pour obtenir le prix pro. */
export const B2B_DISCOUNT = 0.4;
