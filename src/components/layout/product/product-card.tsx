import { ButtonPrincipal } from "../boutton-principal";
import Image from "next/image";
import { LikeButton } from "../like-button";
import { CartButton } from "../cart-button";
type ProductCardProps = {
  image: string;
  description: string;
};

export const ProductCard = ({ image, description }: ProductCardProps) => {
  return (
    <div className="flex  md:w-1/3 lg:w-1/4 p-2 rounded-2xl ">
      <div className="flex flex-1 w-full flex-col rounded-2xl bg-bleuClaire p-4 ">
        <div className="flex flex-1 flex-col justify-between items-center aspect-315/328">
          <div className="flex w-full items-center justify-between">
            <ButtonPrincipal href="#" name="Découvrir" />
            <LikeButton href="#" />
          </div>
          <div className="flex items-center  justify-center py-10">
            <Image
              src={image}
              alt="Product Image"
              width={120}
              height={120}
              className="rounded-2xl bg-cover bg-center flex"
            />
          </div>
        </div>
        <div className="aspect-105/43 -m-4 rounded-b-2xl bg-white">
          <div className="flex flex-col w-full gap-2 p-2">
            <div className="text-titlePrincipal text-[12px] font-normal leading-5 tracking-[1.4px] uppercase">
              something
            </div>
            <span className="flex flex-1   text-[18px] font-normal leading-5 tracking-[1.4px] uppercase">
              Assiette “Wake sdfsdfsfsdf ”
            </span>
            <div className="flex items-center justify-between text-[20px]">
              <div>23.00 €</div>
              <CartButton href="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
