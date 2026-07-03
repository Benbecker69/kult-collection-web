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
