import React from "react";
import { X, Trash2, ChevronRight, Plus } from "lucide-react";
import { translations } from "../data/translations"; // Import des traductions

export default function Registry({
  setScreen,
  collection,
  remove,
  setSelectedHelmet,
  lang, // Nouvelle prop pour la langue
}) {
  // Accès au dictionnaire de traduction
  const t = translations[lang].registry;

  return (
    <div className="relative p-6 h-screen overflow-y-auto pb-32 bg-[#2a2822] font-serif text-[#d0c7a8]">
      {/* Header avec bouton retour */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#8a7f5d] pb-4">
        <h2 className="text-xl font-black italic uppercase tracking-wider text-[#f0ede0]">
          {t.title}
        </h2>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-[#3a3832] rounded-full hover:bg-[#4a4842] transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Compteur et Recherche rapide */}
      <div className="flex justify-between items-end mb-6">
        <div className="text-[10px] uppercase font-black opacity-50 tracking-[0.2em]">
          {lang === "fr"
            ? `Total : ${collection.length} PIÈCES ARCHIVÉES`
            : `Total: ${collection.length} ARCHIVED ITEMS`}
        </div>
      </div>

      {collection.length === 0 ? (
        <div className="text-center py-20 opacity-30 italic">
          <p>{t.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {collection.map((helmet) => (
            <div
              key={helmet.id}
              className="relative bg-[#1a1812] border-2 border-[#3a3832] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Image Principale */}
              <div
                className="h-48 w-full bg-[#111] cursor-pointer"
                onClick={() => setSelectedHelmet(helmet)}
              >
                {helmet.images && helmet.images.main ? (
                  <img
                    src={helmet.images.main}
                    alt={helmet.model}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-10">
                    <p className="text-xs italic uppercase">
                      {lang === "fr" ? "Sans Image" : "No Image"}
                    </p>
                  </div>
                )}
              </div>

              {/* Infos Clés */}
              <div className="p-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-black italic text-[#f0ede0] leading-none">
                      {helmet.model || (lang === "fr" ? "INCONNU" : "UNKNOWN")}
                    </span>
                    <span className="text-[10px] bg-amber-900/40 text-amber-500 px-2 py-0.5 rounded border border-amber-900/50 font-bold">
                      {helmet.manufacturer || "---"}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase font-black tracking-widest opacity-50">
                    {lang === "fr" ? "N° LOT" : "LOT N°"} :{" "}
                    {helmet.lotNumber ||
                      (lang === "fr" ? "NON RÉPERTORIÉ" : "NOT LISTED")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (window.confirm(t.deleteConfirm)) {
                        remove(helmet.id);
                      }
                    }}
                    className="p-2 text-red-900/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedHelmet(helmet)}
                    className="p-2 bg-[#8a7f5d] text-[#1a1812] rounded-lg shadow-lg active:scale-95 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOUTON FLOTTANT D'AJOUT */}
      <button
        onClick={() => {
          setSelectedHelmet(null);
          setScreen("add");
        }}
        className="fixed bottom-10 right-6 w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-[#1a1812] shadow-2xl active:scale-95 transition-all z-50 border-2 border-[#8a7f5d]"
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
}
