import { getProProducts } from "@/lib/repository";
import { CatalogueClient } from "@/components/b2b/catalogue-client";

export default async function CataloguePage() {
  const products = await getProProducts();
  return <CatalogueClient products={products} />;
}
