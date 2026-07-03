import { Baniere } from "@/components/layout/baniere";
import { Bestsellers } from "@/components/layout/bestsellers/bestsellers";
import { ButtonPrincipal } from "@/components/layout/boutton-principal";
import { CollectionCard } from "@/components/layout/collections/collection-card";
import { Collections } from "@/components/layout/collections/collections";
import { HistoireSection } from "@/components/layout/histoire/histoire-section";
import { HistorySection } from "@/components/layout/history-section";
import { Icon } from "@/components/layout/icon";
import { TitleSection } from "@/components/layout/title-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-yellow-400">
      <main className="flex flex-1 w-full flex-col items-center justify-between sm:items-start">
        <Baniere />
        <Collections />
        <Bestsellers />
        <HistoireSection />
        <div className="bg-bleuClaire flex items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center py-10 gap-4 ">
            <TitleSection
              subtitle="Journal & Inspirations"
              title="Recevez nos inspirations de saison"
            />
            <p className="text-xl w-3/5 bg-white px-30 py-5 rounded-3xl">
              Nouvelles collections, coulisses de l'atelier, idées de mise en
              scène — chaque mois, une lettre douce pour vos sens.
            </p>

            <div className="w-4/8 p-4 flex gap-4 ">
              <input
                className="bg-white w-4/5 pl-20 text-2xl rounded-3xl "
                placeholder="votre adresse email"
              />{" "}
              <button className="w-1/5 bg-bleuPrincipal p-2 rounded-3xl text-beigeClaire">
                S'inscrire
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
}
