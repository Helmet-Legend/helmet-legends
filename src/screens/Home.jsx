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
import { translations } from "../data/translations";

export default function Home({ setScreen, lang, setLang }) {
  const t = translations[lang].home;

  return (
    <div className="flex flex-col h-screen bg-[#2a2822] items-center justify-center p-6 text-[#d0c7a8] relative">
      {/* --- SÉLECTEUR MINIATURE (Version Compacte) --- */}
      <div className="absolute top-6 right-6 flex items-center gap-2 z-50 bg-[#1a1812]/90 p-1.5 px-3 rounded-full border border-amber-900/30 backdrop-blur-md shadow-lg">
        {/* Drapeau FR Miniature */}
        <div
          onClick={() => setLang("fr")}
          className={`cursor-pointer transition-all duration-300 ${
            lang === "fr"
              ? "saturate-100 scale-105"
              : "saturate-0 opacity-20 hover:opacity-100"
          }`}
        >
          <img
            src="https://flagcdn.com/w40/fr.png"
            alt="FR"
            className="w-4 h-3 object-cover rounded-[1px] shadow-sm"
          />
        </div>

        {/* Le Toggle (Plus petit et plus fin) */}
        <div
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="relative w-9 h-4.5 bg-black rounded-full border border-amber-900/40 cursor-pointer flex items-center shadow-inner"
        >
          {/* Le Curseur (Knob) réduit */}
          <div
            className={`absolute w-3.5 h-3.5 bg-gradient-to-br from-amber-400 to-amber-700 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.5)] transition-all duration-300 ease-in-out transform ${
              lang === "fr" ? "translate-x-0.5" : "translate-x-[1.15rem]"
            }`}
          ></div>
        </div>

        {/* Drapeau EN Miniature */}
        <div
          onClick={() => setLang("en")}
          className={`cursor-pointer transition-all duration-300 ${
            lang === "en"
              ? "saturate-100 scale-105"
              : "saturate-0 opacity-20 hover:opacity-100"
          }`}
        >
          <img
            src="https://flagcdn.com/w40/gb.png"
            alt="EN"
            className="w-4 h-3 object-cover rounded-[1px] shadow-sm"
          />
        </div>
      </div>

      {/* --- LOGO ET MENU --- */}
      <div className="h-48 flex items-center justify-center mb-8">
        <img
          src={monLogo}
          className="max-h-full w-auto drop-shadow-xl"
          alt="Logo"
        />
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <TexturedButton
          icon={<Search size={18} />}
          label={t.expert}
          onClick={() => setScreen("expert")}
        />
        <TexturedButton
          icon={<BookOpen size={18} />}
          label={t.handbook}
          onClick={() => setScreen("handbook")}
          variant="dark"
        />
        <TexturedButton
          icon={<Database size={18} />}
          label={t.lotSearch}
          onClick={() => setScreen("lotsearch")}
          variant="dark"
        />
        <TexturedButton
          icon={<Shield size={18} />}
          label={t.registry}
          onClick={() => setScreen("registry")}
          variant="dark"
        />
        <TexturedButton
          icon={<Layers size={18} />}
          label={t.compare}
          onClick={() => setScreen("compare")}
          variant="dark"
        />

        <button
          onClick={() => setScreen("stats")}
          className="w-full text-[10px] uppercase font-bold opacity-40 flex items-center justify-center gap-2 mt-4 hover:opacity-100 transition-opacity"
        >
          <PieChart size={14} /> {t.stats}
        </button>
      </div>
    </div>
  );
}
