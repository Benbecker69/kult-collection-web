import Image from "next/image";

export const Icon = ({ src }: { src: string }) => {
  return (
    <div>
      <div className="bg-beigeClaire p-2 w-fit rounded-2xl">
        <Image src={src} alt="Icon 1" width={24} height={24} />
      </div>
    </div>
  );
};
