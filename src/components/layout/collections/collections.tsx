import { CollectionCard } from "./collection-card";
import { ButtonPrincipal } from "../boutton-principal";
import { TitleSection } from "../title-section";
import { getCollections } from "@/lib/repository";

export const Collections = async () => {
  const collections = await getCollections();
  const left = collections.slice(0, 2);
  const right = collections.slice(2, 5);

  return (
    <div className="sectionLayout">
      <TitleSection subtitle="Collections" title="Explorer par ambiance" />
      <div>
        <div className="flex gap-4 aspect-201/181">
          <div className=" w-2/5 flex flex-col gap-4">
            {left.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>

          <div className="w-3/5 gap-4 flex flex-col">
            {right.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-60 ">
          <ButtonPrincipal href="/collections" name="voir plus" />
        </div>
      </div>
    </div>
  );
};
