import React, { useState } from "react";
import monFondExpert from "../assets/helmet-bg.png";
import { ArrowLeft, Search, Database, Ruler, Factory } from "lucide-react";

export default function LotSearch({ setScreen, lang }) {
  const isFr = lang === "fr";
  const [lotNumber, setLotNumber] = useState("");

  // Dictionnaire de traduction interne
  const t = {
    title: isFr ? "Recherche par Lot" : "Lot Search Expert",
    subtext: isFr
      ? "Identifiez la configuration d'usine probable en croisant le code fabricant, la taille et le numéro de lot."
      : "Identify the probable factory configuration by crossing the manufacturer code, size, and lot number.",
    labelFabricant: isFr ? "FABRICANT" : "MANUFACTURER",
    labelTaille: isFr ? "TAILLE COQUE" : "SHELL SIZE",
    labelLot: isFr ? "NUMÉRO DE LOT" : "LOT NUMBER",
    placeholderLot: isFr ? "Ex: 4520" : "Ex: 4520",
    btnBack: isFr ? "Retour" : "Back",
  };

  return (
    <div className="min-h-screen bg-[#1a1812] text-[#d0c7a8] font-serif relative overflow-hidden">
      {/* IMAGE DE FOND COHÉRENTE */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.3) blur(10px)",
        }}
      ></div>

      {/* CONTENU */}
      <div className="relative z-10 p-6 max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 backdrop-blur-sm bg-black/20 p-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <Database className="text-amber-500" size={28} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              {t.title}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="flex items-center gap-1 px-4 py-1.5 bg-amber-900/40 rounded-full border border-amber-700/50 text-[10px] uppercase font-black active:scale-90 transition-transform"
          >
            <ArrowLeft size={14} /> {t.btnBack}
          </button>
        </div>

        <p className="text-xs italic opacity-70 mb-8 leading-relaxed">
          {t.subtext}
        </p>

        {/* FORMULAIRE DE RECHERCHE */}
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-3xl border-2 border-amber-900/30 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FABRICANT */}
            <div>
              <label className="text-[10px] font-black text-amber-600 uppercase mb-2 flex items-center gap-2">
                <Factory size={12} /> {t.labelFabricant}
              </label>
              <select className="w-full bg-[#1a1812] border border-amber-900/40 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 text-white font-bold">
                <option>ET / ckl (Thale)</option>
                <option>Q (Quist)</option>
                <option>NS (Schwerte)</option>
                <option>SE / hkp (Sächsische)</option>
                <option>EF / FS (Fulda)</option>
              </select>
            </div>

            {/* TAILLE */}
            <div>
              <label className="text-[10px] font-black text-amber-600 uppercase mb-2 flex items-center gap-2">
                <Ruler size={12} /> {t.labelTaille}
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="64"
                  className="w-full bg-[#1a1812] border border-amber-900/40 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 text-white font-bold"
                />
                <Ruler
                  className="absolute right-3 top-3 opacity-20"
                  size={16}
                />
              </div>
            </div>
          </div>

          {/* NUMÉRO DE LOT */}
          <div>
            <label className="text-[10px] font-black text-amber-600 uppercase mb-2 flex items-center gap-2">
              {t.labelLot}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                placeholder={t.placeholderLot}
                className="flex-1 bg-[#1a1812] border border-amber-900/40 rounded-xl p-4 text-lg focus:outline-none focus:border-amber-500 text-white font-black tracking-widest placeholder:opacity-20"
              />
              <button className="bg-amber-600 hover:bg-amber-500 text-black p-4 rounded-xl transition-all active:scale-95">
                <Search size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* ZONE DE RÉSULTATS (Vide par défaut) */}
        <div className="mt-8 text-center opacity-20 italic text-sm">
          {isFr
            ? "Entrez un numéro de lot pour lancer l'expertise"
            : "Enter a lot number to start expertise"}
        </div>
      </div>
    </div>
  );
}
