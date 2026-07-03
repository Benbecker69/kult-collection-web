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
import type { Category, Collection, Product } from "@/types";

const collections = collectionsData as Collection[];
const products = productsData as Product[];

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
