import React from "react";
import { X, Edit3, Printer } from "lucide-react";

export default function Details({ setScreen, helmet, onEdit }) {
  if (!helmet) return null;

  return (
    <div className="h-screen overflow-y-auto p-6 bg-[#2a2822] text-[#d0c7a8] pb-24 font-serif">
      <div className="flex justify-between items-center mb-6 border-b border-[#8a7f5d]/30 pb-2">
        <button
          onClick={() => setScreen("registry")}
          className="text-xs font-bold uppercase bg-[#3a3832] px-3 py-1 rounded-lg"
        >
          ← Retour
        </button>
        <button
          onClick={onEdit}
          className="text-xs font-bold uppercase text-amber-600 flex items-center gap-1 border border-amber-600 px-3 py-1 rounded-lg"
        >
          <Edit3 size={12} /> Modifier
        </button>
      </div>

      <div className="text-center mb-8">
        {helmet.images.main && (
          <img
            src={helmet.images.main}
            className="w-full max-h-72 object-contain drop-shadow-2xl mb-6 mx-auto"
            alt="helmet"
          />
        )}
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-[#f0ede0]">
          {helmet.model}{" "}
          <span className="text-amber-600">({helmet.manufacturer})</span>
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6 p-3 bg-[#1a1812]/50 rounded-2xl border border-[#3a3832]">
        {[
          "front",
          "left",
          "right",
          "back",
          "bottom",
          "interior",
          "chinstrap",
        ].map(
          (view) =>
            helmet.images[view] && (
              <div
                key={view}
                className="relative rounded-lg overflow-hidden border border-[#5a523d]"
              >
                <img
                  src={helmet.images[view]}
                  className="w-full h-16 object-cover"
                  alt={view}
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[6px] uppercase p-0.5 text-center font-black">
                  {view}
                </div>
              </div>
            )
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-[#1a1812]/80 p-4 rounded-xl border border-[#3a3832]">
          <p className="text-[10px] uppercase font-black text-amber-600 mb-1">
            Marquages
          </p>
          <p className="text-sm">
            Lot :{" "}
            <span className="text-white font-mono">
              {helmet.lotNumber || "N/A"}
            </span>
          </p>
        </div>
        <div className="bg-[#1a1812]/80 p-5 rounded-xl border-2 border-[#3a3832]">
          <p className="text-[10px] uppercase font-black text-amber-600 mb-2">
            Notes Historiques
          </p>
          <p className="text-sm italic opacity-90 whitespace-pre-wrap">
            {helmet.description || "Aucune note."}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="w-full mt-4 p-4 border-2 border-[#3a3832] rounded-xl text-[10px] font-bold uppercase flex items-center justify-center gap-3"
        >
          <Printer size={16} /> Imprimer la fiche
        </button>
      </div>
    </div>
  );
}
