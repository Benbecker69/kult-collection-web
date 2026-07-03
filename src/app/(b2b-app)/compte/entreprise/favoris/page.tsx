import { getProProducts } from "@/lib/repository";
import { FavoritesClient } from "@/components/b2b/favorites-client";

export default async function FavorisPage() {
  const products = await getProProducts();
  return <FavoritesClient products={products} />;
}
