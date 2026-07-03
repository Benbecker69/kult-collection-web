type TitleSectionProps = {
  subtitle: string;
  title: string;
};
export const TitleSection = ({ subtitle, title }: TitleSectionProps) => {
  return (
    <div>
      <p className="text-bleuPrincipal text-[16px] font-medium leading-5 tracking-[1.4px] uppercase">
        {subtitle}
      </p>
      <p className="text-bleuPrincipal text-[30px] font-[700px] leading-12.5 tracking-[1.4px] uppercase">
        {title}
      </p>
    </div>
  );
};
