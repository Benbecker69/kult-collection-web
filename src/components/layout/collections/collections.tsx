import React from "react";
import { CollectionCard } from "./collection-card";
import { ButtonPrincipal } from "../boutton-principal";
import { TitleSection } from "../title-section";

export const Collections = () => {
  return (
    <div className="sectionLayout">
      <TitleSection subtitle="Collections" title="Explorer par ambiance" />
      <div>
        <div className="flex gap-4 aspect-201/181">
          <div className=" w-2/5 flex flex-col gap-4">
            <CollectionCard
              image="/images/collections/california_dreamin.jpeg"
              description="CALIFORNIA DREAMIN’"
            />
            <CollectionCard
              image="/images/collections/santa_barbara.jpeg"
              description="Santa Barbara bloom"
            />
          </div>

          <div className="w-3/5 gap-4 flex flex-col">
            <CollectionCard
              image="/images/collections/malibu.jpeg"
              description="CALIFORNIA DREAMIN’"
            />
            <CollectionCard
              image="/images/collections/palm_springs_escape.png"
              description="Santa Barbara bloom"
            />
            <CollectionCard
              image="/images/collections/mediterranean_club.jpeg"
              description="Mediterranean Club"
            />
          </div>
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
