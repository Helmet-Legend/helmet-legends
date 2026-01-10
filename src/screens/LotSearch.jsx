import React, { useState } from "react";
import {
  Search,
  Database,
  ArrowLeft,
  AlertCircle,
  Info,
  Shield,
  Ruler,
} from "lucide-react";
import { lotDatabase } from "../data/lotDatabase";
import { translations } from "../data/translations"; // Import des traductions

const LotSearch = ({ setScreen, lang }) => {
  const [usine, setUsine] = useState("ET");
  const [taille, setTaille] = useState("64");
  const [lot, setLot] = useState("");
  const [result, setResult] = useState(null);

  // Accès aux textes traduits
  const t = translations[lang].lotSearch;

  const handleSearch = () => {
    const num = parseInt(lot);
    const size = parseInt(taille);

    const found = lotDatabase.find((item) => {
      const matchUsine = item.usine === usine;
      const matchLot = num >= item.lotStart && num <= item.lotEnd;
      const matchTaille = item.taille ? item.taille === size : true;

      return matchUsine && matchLot && matchTaille;
    });

    setResult(found || "Inconnu");
  };

  return (
    <div className="min-h-screen bg-[#2a2822] text-[#d0c7a8] font-serif p-6 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4">
        <div className="flex items-center gap-3">
          <Database className="text-amber-500" size={28} />
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            {t.title}
          </h2>
        </div>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-amber-900/20 rounded-full border border-amber-700/50 active:scale-90 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs italic opacity-70 leading-relaxed">
            {lang === "fr"
              ? "Identifiez la configuration d'usine probable en croisant le code fabricant, la taille et le numéro de lot."
              : "Identify the probable factory configuration by crossing the manufacturer code, size, and lot number."}
          </p>
        </div>

        {/* Formulaire Expert */}
        <div className="space-y-4 bg-[#1a1812] p-6 rounded-3xl border-2 border-amber-900/30 shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-amber-600 mb-2 block">
                {t.factory}
              </label>
              <select
                value={usine}
                onChange={(e) => setUsine(e.target.value)}
                className="w-full p-3 bg-black/40 border border-amber-900/50 rounded-xl text-amber-500 font-bold outline-none focus:border-amber-500 transition-colors"
              >
                <option value="ET">ET / ckl (Thale)</option>
                <option value="Q">Q (Quist)</option>
                <option value="NS">NS (Schwerte)</option>
                <option value="EF">EF / FS (Fulda)</option>
                <option value="SE">SE / hkp (Lauter)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-amber-600 mb-2 block">
                {t.size}
              </label>
              <div className="relative">
                <select
                  value={taille}
                  onChange={(e) => setTaille(e.target.value)}
                  className="w-full p-3 bg-black/40 border border-amber-900/50 rounded-xl text-white font-bold outline-none focus:border-amber-500 transition-colors appearance-none"
                >
                  {[60, 62, 64, 66, 68, 70].map((tSize) => (
                    <option key={tSize} value={tSize}>
                      {tSize}
                    </option>
                  ))}
                </select>
                <Ruler
                  size={14}
                  className="absolute right-3 top-3.5 text-amber-900 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-amber-600 mb-2 block">
              {t.lotNumber}
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder={t.placeholder}
                value={lot}
                onChange={(e) => setLot(e.target.value)}
                className="w-full p-4 bg-black/40 border border-amber-900/50 rounded-2xl placeholder:text-amber-900 text-white font-bold outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2 p-2.5 bg-amber-600 rounded-xl text-black active:scale-90 transition-transform shadow-lg"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Résultats d'Expertise */}
        {result && result !== "Inconnu" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-600/10 border-2 border-amber-600 rounded-3xl p-6 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield size={80} />
              </div>

              <h4 className="text-amber-500 font-black uppercase text-xs mb-4 flex items-center gap-2">
                <Info size={14} /> {t.resultTitle}
              </h4>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b border-amber-600/20 pb-2">
                    <span className="text-[10px] uppercase opacity-60 block">
                      {lang === "fr" ? "Modèle" : "Model"}
                    </span>
                    <span className="font-bold text-white text-lg">
                      {result.modele}
                    </span>
                  </div>
                  <div className="border-b border-amber-600/20 pb-2">
                    <span className="text-[10px] uppercase opacity-60 block">
                      {lang === "fr" ? "Armée" : "Branch"}
                    </span>
                    <span className="font-bold text-white text-lg">
                      {/* On récupère la langue spécifique pour l'armée */}
                      {result.armee[lang]}
                    </span>
                  </div>
                </div>

                <div className="bg-black/20 p-4 rounded-2xl border border-amber-900/20">
                  <p className="text-xs italic leading-relaxed text-amber-100/90">
                    {/* On récupère la langue spécifique pour la note */}
                    {result.note[lang]}
                  </p>
                </div>

                {result.taille && (
                  <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest text-center">
                    {lang === "fr"
                      ? `Validation spécifique pour taille ${result.taille}`
                      : `Specific validation for size ${result.taille}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {result === "Inconnu" && (
          <div className="p-8 bg-red-900/10 border-2 border-red-600/30 rounded-3xl flex flex-col items-center text-center gap-4 animate-in shake duration-500">
            <AlertCircle className="text-red-600" size={40} />
            <div>
              <p className="text-sm font-black text-red-200 uppercase tracking-widest mb-1">
                {lang === "fr"
                  ? "Aucune Donnée Répertoriée"
                  : "No Registered Data"}
              </p>
              <p className="text-xs text-red-100/60 italic leading-relaxed">
                {t.unknown}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LotSearch;
