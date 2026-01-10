import React from "react";
import monLogo from "../logo.jpg";
import { TexturedButton } from "../components/TexturedButton";
import {
  Search,
  Shield,
  PieChart,
  BookOpen,
  Layers,
  Database,
} from "lucide-react";

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

      <div className="space-y-4 w-full max-w-xs">
        {/* BOUTON PRINCIPAL : AJOUT / EXPERT */}
        <TexturedButton
          icon={<Search size={18} />}
          label="Expert / Ajouter"
          onClick={() => setScreen("expert")}
        />

        {/* MANUEL DE L'EXPERT */}
        <TexturedButton
          icon={<BookOpen size={18} />}
          label="Manuel de l'Expert"
          onClick={() => setScreen("handbook")}
          variant="dark"
        />

        {/* NOUVEAU BOUTON : RECHERCHE DE LOT */}
        <TexturedButton
          icon={<Database size={18} />}
          label="Recherche de Lot"
          onClick={() => setScreen("lotsearch")}
          variant="dark"
        />

        {/* REGISTRE */}
        <TexturedButton
          icon={<Shield size={18} />}
          label="Registre"
          onClick={() => setScreen("registry")}
          variant="dark"
        />

        {/* COMPARATEUR */}
        <TexturedButton
          icon={<Layers size={18} />}
          label="Comparer Insigne"
          onClick={() => setScreen("compare")}
          variant="dark"
        />

        {/* BOUTON STATISTIQUES EN BAS */}
        <button
          onClick={() => setScreen("stats")}
          className="w-full text-[10px] uppercase font-bold opacity-40 flex items-center justify-center gap-2 mt-4 hover:opacity-100 transition-opacity"
        >
          <PieChart size={14} /> Voir les statistiques
        </button>
      </div>
    </div>
  );
}
