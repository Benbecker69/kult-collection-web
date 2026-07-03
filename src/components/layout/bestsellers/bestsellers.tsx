import { TitleSection } from "../title-section";
import { ButtonPrincipal } from "../boutton-principal";
import { ProductCard } from "../product/product-card";
import { getFeaturedProducts } from "@/lib/repository";

export const Bestsellers = async () => {
  const products = await getFeaturedProducts();

  return (
    <div className="sectionLayout">
      <div className=" ">
        <TitleSection subtitle="SÉLECTION" title="Nos incontournables" />
      </div>
      <div className="flex">
        <div className="flex flex-1 px-6 flex-wrap w-full ">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-60 ">
          <ButtonPrincipal href="/catalogue" name="voir plus" />
        </div>
      </div>
    </div>
  );
};
