import { ButtonPrincipal } from "../boutton-principal";
import type { Collection } from "@/types";

type CollectionCardProps = {
  collection: Collection;
};

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  return (
    <div
      className="flex h-full rounded-2xl flex-col items-start justify-end bg-black bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${collection.image})` }}
    >
      <div className="flex flex-col gap-3">
        <p className="text-titlePrincipal">{collection.name}</p>
        <div className="flex gap-2">
          <ButtonPrincipal
            href={`/collections/${collection.slug}`}
            name="Découvrir"
          />
        </div>
      </div>
    </div>
  );
};
