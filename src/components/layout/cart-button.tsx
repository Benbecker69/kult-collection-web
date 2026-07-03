import Image from "next/image";
type CartButtonProps = {
  href: string;
};

export const CartButton = ({ href }: CartButtonProps) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-bleuPrincipal px-6 py-1.5 tracking-normal">
      <a href={href}>
        <Image src="/icons/cartIcon.png" alt="Icon 1" width={20} height={20} />
      </a>
    </div>
  );
};
