import React from "react";
import monLogo from "../logo.jpg";
import { TexturedButton } from "../components/TexturedButton";
import { Search, Shield, PieChart } from "lucide-react";

export default function Home({ setScreen }) {
  return (
    <div className="flex flex-col h-screen bg-[#2a2822] items-center justify-center p-6 text-[#d0c7a8]">
      {/* Logo propre */}
      <div className="h-48 flex items-center justify-center mb-8">
        <img
          src={monLogo}
          className="max-h-full w-auto drop-shadow-xl"
          alt="Logo"
        />
      </div>

      {/* NOTE : J'ai supprimé l'image "HELMET_HOME_IMG" qui causait 
         l'erreur Imgur visible sur votre écran.
      */}

      <div className="space-y-4 w-full max-w-xs">
        <TexturedButton
          icon={<Search size={18} />}
          label="Expert / Ajouter"
          onClick={() => setScreen("expert")}
        />
        <TexturedButton
          icon={<Shield size={18} />}
          label="Registre"
          onClick={() => setScreen("registry")}
          variant="dark"
        />
        <TexturedButton
          label="Comparer Insigne"
          onClick={() => setScreen("compare")}
          variant="dark"
        />
        <button
          onClick={() => setScreen("stats")}
          className="w-full text-[10px] uppercase font-bold opacity-40 flex items-center justify-center gap-2 mt-4"
        >
          <PieChart size={14} /> Voir les statistiques
        </button>
      </div>
    </div>
  );
}
