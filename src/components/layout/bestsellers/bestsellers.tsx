import React from "react";
import { TitleSection } from "../title-section";
import { CollectionCard } from "../collections/collection-card";
import { ButtonPrincipal } from "../boutton-principal";
import { ProductCard } from "../product/product-card";

export const Bestsellers = () => {
  return (
    <div className="sectionLayout">
      <div className=" ">
        <TitleSection subtitle="SÉLECTION" title="Nos incontournables" />
      </div>
      <div className="flex">
        {/* <div className="flex aspect-105/151 rounded-t-lg max-w-[315px] w-full bg-fuchsia-400 p-2"> */}
        <div className="flex flex-1 px-6 flex-wrap w-full ">
          <ProductCard
            image="/images/products/wakeUpIn.png"
            description="CALIFORNIA DREAMIN’"
          />
          <ProductCard
            image="/images/products/carafe.png"
            description="CALIFORNIA DREAMIN’"
          />
          <ProductCard
            image="/images/products/carafe.png"
            description="CALIFORNIA DREAMIN’"
          />
          <ProductCard
            image="/images/products/carafe.png"
            description="CALIFORNIA DREAMIN’"
          />
          <ProductCard
            image="/images/products/carafe.png"
            description="CALIFORNIA DREAMIN’"
          />
          <ProductCard
            image="/images/products/assietteCh.png"
            description="CALIFORNIA DREAMIN’"
          />
          <ProductCard
            image="/images/products/wakeUpIn.png"
            description="CALIFORNIA DREAMIN’"
          />
          <ProductCard
            image="/images/products/wakeUpIn.png"
            description="CALIFORNIA DREAMIN’"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-60 ">
          <ButtonPrincipal href="#" name="voir plus" />
        </div>
      </div>
    </div>
  );
};
