import React from "react";
// --- ÉTAPE 1 : IMPORT DE L'IMAGE DEPUIS ASSETS ---
import monFondExpert from "../assets/helmet-bg.png";

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
    <div className="flex flex-col h-screen bg-[#1a1812] items-center justify-center p-6 text-[#d0c7a8] relative overflow-hidden">
      {/* --- ÉTAPE 2 : LE FOND D'ÉCRAN --- */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          // On assombrit légèrement l'image elle-même pour le style
          filter: "brightness(0.7) contrast(1.1)",
        }}
      >
        {/* Overlay : Vignettage profond pour faire ressortir le menu central */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a1812]/40 to-[#1a1812] shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
      </div>

      {/* --- ÉTAPE 3 : LE CONTENU (Z-INDEX 10) --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
        {/* SÉLECTEUR MINIATURE */}
        <div className="absolute -top-16 right-0 flex items-center gap-2 z-50 bg-black/60 p-1.5 px-3 rounded-full border border-amber-900/30 backdrop-blur-md shadow-lg">
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
              className="w-4 h-3 object-cover rounded-[1px]"
            />
          </div>

          <div
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="relative w-9 h-4.5 bg-black rounded-full border border-amber-900/40 cursor-pointer flex items-center shadow-inner"
          >
            <div
              className={`absolute w-3.5 h-3.5 bg-gradient-to-br from-amber-400 to-amber-700 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.5)] transition-all duration-300 ease-in-out transform ${
                lang === "fr" ? "translate-x-0.5" : "translate-x-[1.15rem]"
              }`}
            ></div>
          </div>

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
              className="w-4 h-3 object-cover rounded-[1px]"
            />
          </div>
        </div>

        {/* LOGO (avec ombre portée plus forte pour décoller du fond) */}
        <div className="h-44 flex items-center justify-center mb-8">
          <img
            src={monLogo}
            className="max-h-full w-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.9)]"
            alt="Logo"
          />
        </div>

        {/* MENU */}
        <div className="space-y-4 w-full">
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
            className="w-full text-[10px] uppercase font-bold opacity-60 flex items-center justify-center gap-2 mt-6 hover:opacity-100 transition-opacity text-amber-200"
          >
            <PieChart size={14} /> {t.stats}
          </button>
        </div>
      </div>
    </div>
  );
}
