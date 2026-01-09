import React from "react";
import { X, Edit3, ChevronLeft } from "lucide-react";

export default function Details({ setScreen, helmet, onEdit }) {
  if (!helmet) return null;

  // On récupère uniquement les photos qui existent vraiment
  const availablePhotos = Object.entries(helmet.images)
    .filter(([_, value]) => value !== null)
    .map(([key, value]) => ({ id: key, url: value }));

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1812] flex flex-col font-serif text-[#d0c7a8] overflow-hidden">
      {/* Header Flottant */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => setScreen("registry")}
          className="p-2 bg-[#2a2822]/80 rounded-full backdrop-blur-md border border-[#3a3832]"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-black italic uppercase text-[#f0ede0] leading-none">
            {helmet.model}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">
            Fiche d'Expertise
          </p>
        </div>
        <button
          onClick={onEdit}
          className="p-2 bg-amber-600 rounded-full text-[#1a1812] shadow-lg"
        >
          <Edit3 size={20} />
        </button>
      </div>

      {/* Galerie Photo Plein Écran (Défilement Horizontal) */}
      <div className="flex-grow flex items-center bg-black">
        <div className="flex overflow-x-auto snap-x snap-mandatory h-full w-full no-scrollbar">
          {availablePhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center relative"
            >
              <img
                src={photo.url}
                alt={photo.id}
                className="w-full h-full object-contain"
              />
              {/* Étiquette d'angle de vue */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[10px] uppercase font-black tracking-widest opacity-60">
                Vue : {photo.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panneau d'informations coulissant (bas de page) */}
      <div className="bg-[#2a2822] border-t-2 border-[#8a7f5d] p-6 pb-12 max-h-[40vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-[#1a1812] rounded-xl border border-[#3a3832]">
            <p className="text-[8px] uppercase font-black opacity-40 mb-1">Fabricant / Usine</p>
            <p className="text-sm font-bold text-amber-500">{helmet.manufacturer || "N/A"}</p>
          </div>
          <div className="p-3 bg-[#1a1812] rounded-xl border border-[#3a3832]">
            <p className="text-[8px] uppercase font-black opacity-40 mb-1">Numéro de Lot</p>
            <p className="text-sm font-bold text-amber-500">{helmet.lotNumber || "N/A"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase font-black opacity-40 tracking-widest">Notes & Histoire</p>
          <p className="text-sm italic leading-relaxed opacity-80">
            {helmet.description || "Aucun historique documenté pour cette pièce."}
          </p>
        </div>
      </div>
    </div>
  );
}