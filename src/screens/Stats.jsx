import React from "react";
// --- FOND D'ÉCRAN ---
import monFondExpert from "../assets/helmet-bg.png";

import {
  PieChart,
  ArrowLeft,
  Shield,
  TrendingUp,
  Factory,
  Layers,
  History,
} from "lucide-react";

export default function Stats({ setScreen, helmets = [], lang }) {
  const isFr = lang === "fr";

  // --- LOGIQUE DE CALCUL DES DONNÉES ---
  const total = helmets.length;

  const countByModel = helmets.reduce((acc, h) => {
    acc[h.model] = (acc[h.model] || 0) + 1;
    return acc;
  }, {});

  const countByMfr = helmets.reduce((acc, h) => {
    acc[h.manufacturer] = (acc[h.manufacturer] || 0) + 1;
    return acc;
  }, {});

  // Fonction pour calculer le pourcentage
  const getPercent = (value) => (total > 0 ? (value / total) * 100 : 0);

  return (
    <div className="min-h-screen bg-[#1a1812] text-[#d0c7a8] font-serif relative overflow-hidden">
      {/* BACKGROUND (FLOU À 5px COMME LES AUTRES) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.2) blur(5px)",
        }}
      ></div>

      <div className="relative z-10 p-6 max-w-2xl mx-auto h-screen overflow-y-auto pb-20">
        {/* HEADER STYLE "LABO" */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 backdrop-blur-md bg-black/20 p-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <PieChart className="text-amber-500" size={28} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              {isFr ? "Analyse Collection" : "Collection Analysis"}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* GRILLE DE STATS */}
        <div className="grid grid-cols-1 gap-6">
          {/* CARTE : TOTAL */}
          <div className="bg-black/60 backdrop-blur-xl border-2 border-amber-900/30 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield size={80} />
            </div>
            <p className="text-[10px] uppercase font-black text-amber-500 mb-2 tracking-[0.4em]">
              {isFr ? "Total Archives" : "Total Records"}
            </p>
            <h3 className="text-7xl font-black italic text-white drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]">
              {total.toString().padStart(2, "0")}
            </h3>
            <p className="text-xs italic opacity-50 mt-2">
              {isFr
                ? "Pièces expertisées et enregistrées"
                : "Expertly cataloged pieces"}
            </p>
          </div>

          {/* SECTION : RÉPARTITION PAR MODÈLE */}
          <div className="bg-black/40 backdrop-blur-md border border-amber-900/20 rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-amber-900/30 pb-3">
              <Layers className="text-amber-600" size={18} />
              <h4 className="text-xs font-black uppercase tracking-widest">
                {isFr ? "Répartition Modèles" : "Model Breakdown"}
              </h4>
            </div>

            <div className="space-y-5">
              {["M35", "M40", "M42"].map((model) => {
                const count = countByModel[model] || 0;
                const percent = getPercent(count);
                return (
                  <div key={model} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-black italic text-white">
                        {model}
                      </span>
                      <span className="text-[10px] font-bold text-amber-500">
                        {count} {isFr ? "UNITÉ(S)" : "UNIT(S)"}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-amber-900/20">
                      <div
                        className="h-full bg-gradient-to-r from-amber-900 via-amber-600 to-amber-400 transition-all duration-1000 shadow-[0_0_10px_rgba(217,119,6,0.5)]"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION : FABRICANTS PRINCIPAUX */}
          <div className="bg-black/40 backdrop-blur-md border border-amber-900/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 border-b border-amber-900/30 pb-3 mb-4">
              <Factory className="text-amber-600" size={18} />
              <h4 className="text-xs font-black uppercase tracking-widest">
                {isFr ? "Top Fabricants" : "Top Manufacturers"}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(countByMfr).length > 0 ? (
                Object.entries(countByMfr)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([mfr, count]) => (
                    <div
                      key={mfr}
                      className="bg-black/40 p-3 rounded-xl border border-amber-900/10 flex flex-col"
                    >
                      <span className="text-[10px] font-black text-amber-500 truncate">
                        {mfr}
                      </span>
                      <span className="text-xl font-black text-white italic">
                        {count}
                      </span>
                    </div>
                  ))
              ) : (
                <p className="text-[10px] italic opacity-40 col-span-2 text-center py-4">
                  {isFr ? "Données insuffisantes" : "Not enough data"}
                </p>
              )}
            </div>
          </div>

          {/* PETIT MESSAGE DE MOTIVATION */}
          <div className="flex items-center justify-center gap-2 opacity-30 py-4">
            <TrendingUp size={14} />
            <p className="text-[10px] uppercase font-bold tracking-[0.2em]">
              {isFr ? "Votre archive grandit" : "Your archive is growing"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
