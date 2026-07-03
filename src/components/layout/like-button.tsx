import Image from "next/image";
type LikeButtonProps = {
  href: string;
};

export const LikeButton = ({ href }: LikeButtonProps) => {
  return (
    <span className="flex items-center justify-center rounded-full">
      <a
        href={href}
        className="font-bold text-red-400 leading-none tracking-normal flex items-center"
      >
        <Image src="/icons/like.png" alt="Icon 1" width={36} height={36} />
      </a>
    </span>
  );
};
