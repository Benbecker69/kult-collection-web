import Image from "next/image";
type ButtonPrincipalProps = {
  href: string;
  name: string;
};

export const ButtonPrincipal = ({ href, name }: ButtonPrincipalProps) => {
  return (
    <span className="flex items-center justify-center rounded-full font-Manrope bg-bleuPrincipal text-beigeClaire px-6 py-2 gap-2">
      <a
        href={href}
        className="font-bold text-[20px] leading-none tracking-normal flex items-center"
      >
        {name}
      </a>
      <Image src="/icons/rightArrow.png" alt="Icon 1" width={20} height={20} />
    </span>
  );
};
