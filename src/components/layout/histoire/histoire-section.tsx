import React from "react";
import { ButtonPrincipal } from "../boutton-principal";
import { HistorySection } from "../history-section";
import { TitleSection } from "../title-section";

export const HistoireSection = () => {
  return (
    <div className="sectionLayout flex flex-row gap-4">
      <div className=" bg-bleuClaire flex flex-col w-180 rounded-4xl p-8">
        <TitleSection
          subtitle="notre histoire"
          title="L'art de vivre, façonné à la main"
        />
        <div className="text-xl">
          <p className="py-6">
            Chaque pièce naît de cette rencontre entre le savoir-faire artisanal
            andalou et l’esprit solaire de la Californie. Tournées, peintes et
            coulées à la main en petites séries, nos créations sont pensées pour
            durer et apporter chaleur et caractère au quotidien.
          </p>
          <div className="flex flex-1 items-center justify-between py-3 mb-2 text-lg">
            <div className="flex flex-col gap-8">
              <HistorySection
                iconSrc="/icons/matiere.png"
                title="Matières naturelles"
                paragraph="Argile, cire végétale, parfums naturels"
              />
              <HistorySection
                iconSrc="/icons/faitMain.png"
                title="Fabrication sur demande"
                paragraph="Commandes personnalisées pour les particuliers et les entreprises"
              />
            </div>
            <div className="flex flex-col gap-8">
              <HistorySection
                iconSrc="/icons/faitMain.png"
                title="Fait à la main"
                paragraph="Argile, cire végétale, parfums naturels 3"
              />
              <HistorySection
                iconSrc="/icons/livraison.png"
                title="Livraison à domicile"
                paragraph="Commandes personnalisées pour les particuliers et les entreprises 4"
              />
            </div>
          </div>
        </div>
        <div className="w-90">
          <ButtonPrincipal href="#" name="Découvrir nos collections" />
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div
          className="w-full aspect-174/233 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/images/histoire/histoire.png")`,
          }}
        ></div>
      </div>
    </div>
  );
};
