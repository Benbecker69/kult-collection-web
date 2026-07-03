import React from "react";
import { ButtonPrincipal } from "../boutton-principal";
import Image from "next/image";

type CollectionCardProps = {
  image: string;
  description: string;
};

export const CollectionCard = ({ image, description }: CollectionCardProps) => {
  return (
    <div
      className="flex h-full rounded-2xl flex-col items-start justify-end bg-black bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex flex-col gap-3">
        <p className="text-titlePrincipal">{description}</p>
        <div className="flex gap-2">
          <ButtonPrincipal href="#" name="Découvrir" />
        </div>
      </div>
    </div>
  );
};
