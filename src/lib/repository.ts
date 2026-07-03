// ⭐ COUCHE D'ACCÈS AUX DONNÉES — point de bascule unique vers un futur CMS.
//
// Aujourd'hui : lit les données mockées en JSON (src/data/*.json).
// Demain : ces mêmes fonctions appelleront l'API d'un CMS / commerce headless
//          (Shopify, Sanity…), SANS que les composants changent.
//
// Règle d'or : AUCUN composant n'importe un fichier de src/data/ directement.
// Tout passe par ce fichier. (cf. docs/note-recommandation-technique.md)

import collectionsData from "@/data/collections.json";
import productsData from "@/data/products.json";
import b2bOrdersData from "@/data/b2b-orders.json";
import { B2B_DISCOUNT } from "@/types";
import type {
  Category,
  Collection,
  Order,
  Product,
  ProProduct,
} from "@/types";

const collections = collectionsData as Collection[];
const products = productsData as Product[];
const b2bOrders = b2bOrdersData as unknown as Order[];

// --- Collections ---

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | undefined> {
  return collections.find((c) => c.slug === slug);
}

// --- Produits ---

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(
  category: Category,
): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}

export async function getProductsByCollection(
  collectionSlug: string,
): Promise<Product[]> {
  return products.filter((p) => p.collectionSlug === collectionSlug);
}

/** Produits mis en avant dans la sélection / bestsellers de la home. */
export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

// --- Espace B2B ---

function toProPrice(price: number): number {
  return Math.round(price * (1 - B2B_DISCOUNT) * 100) / 100;
}

/** Catalogue vu côté pro : chaque produit reçoit son prix pro (remisé). */
export async function getProProducts(): Promise<ProProduct[]> {
  return products.map((p) => ({ ...p, proPrice: toProPrice(p.price) }));
}

export async function getB2bOrders(): Promise<Order[]> {
  return b2bOrders;
}

export async function getB2bOrderById(id: string): Promise<Order | undefined> {
  return b2bOrders.find((o) => o.id === id);
}
