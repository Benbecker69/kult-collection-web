import React from "react";
import { Icon } from "./icon";

type HistorySectionProps = {
  iconSrc: string;
  title: string;
  paragraph: string;
};

export const HistorySection = ({
  iconSrc,
  title,
  paragraph,
}: HistorySectionProps) => {
  return (
    <div className="flex gap-2">
      <div>
        <Icon src={iconSrc} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-bleuPrincipal text-2xl">{title}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};
