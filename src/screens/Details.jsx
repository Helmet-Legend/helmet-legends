import React from "react";
import {
  ChevronLeft,
  Edit3,
  Download,
  Printer,
  ShieldCheck,
  HardHat,
} from "lucide-react";
import { generateHelmetPDF } from "../utils/pdfGenerator";
import { translations } from "../data/translations";

export default function Details({ setScreen, helmet, onEdit, lang }) {
  const t = translations[lang].details;
  const labels = translations[lang].add;
  const isFr = lang === "fr";

  if (!helmet) return null;

  // Récupération des photos existantes
  const availablePhotos = Object.entries(helmet.images || {})
    .filter(([_, value]) => value !== null)
    .map(([key, value]) => ({ id: key, url: value }));

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1812] flex flex-col font-serif text-[#d0c7a8] overflow-hidden">
      {/* Header Flottant */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => setScreen("registry")}
          className="p-2 bg-[#2a2822]/80 rounded-full backdrop-blur-md border border-[#3a3832] active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-black italic uppercase text-[#f0ede0] leading-none">
            {helmet.model}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">
            {isFr ? "Fiche Technique" : "Technical Sheet"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 bg-amber-600 rounded-full text-[#1a1812] shadow-lg active:scale-95 transition-transform"
          >
            <Edit3 size={20} />
          </button>

          <button
            onClick={() => generateHelmetPDF(helmet, lang)}
            className="p-2 bg-amber-800 rounded-full text-[#f0ede0] shadow-lg active:scale-95 transition-transform"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Galerie Photo Plein Écran */}
      <div className="flex-grow flex items-center bg-black">
        <div className="flex overflow-x-auto snap-x snap-mandatory h-full w-full no-scrollbar">
          {availablePhotos.length > 0 ? (
            availablePhotos.map((photo) => (
              <div
                key={photo.id}
                className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center relative"
              >
                <img
                  src={photo.url}
                  alt={photo.id}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[10px] uppercase font-black tracking-widest opacity-60">
                  {isFr ? "Vue" : "View"} : {photo.id}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
              <HardHat size={64} />
              <p className="mt-4 uppercase font-black tracking-widest text-xs">
                {isFr ? "Aucun visuel" : "No visuals"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Panneau d'informations coulissant */}
      <div className="bg-[#2a2822] border-t-2 border-[#8a7f5d] p-6 pb-12 max-h-[50vh] overflow-y-auto shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {/* Grille des informations principales */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-[#1a1812] rounded-xl border border-[#3a3832]">
            <p className="text-[8px] uppercase font-black opacity-40 mb-1">
              {labels.labelFactory}
            </p>
            <p className="text-sm font-bold text-amber-500">
              {helmet.manufacturer || "N/A"}
            </p>
          </div>
          <div className="p-3 bg-[#1a1812] rounded-xl border border-[#3a3832]">
            <p className="text-[8px] uppercase font-black opacity-40 mb-1">
              {labels.labelLot}
            </p>
            <p className="text-sm font-bold text-amber-500">
              {helmet.lotNumber || "N/A"}
            </p>
          </div>
        </div>

        {/* Spécifications Techniques */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="p-2 bg-[#1a1812]/50 rounded-lg border border-[#3a3832] text-center">
            <p className="text-[7px] uppercase font-black opacity-40">
              {labels.labelSize}
            </p>
            <p className="text-xs font-bold">{helmet.shellSize || "-"}</p>
          </div>
          <div className="p-2 bg-[#1a1812]/50 rounded-lg border border-[#3a3832] text-center">
            <p className="text-[7px] uppercase font-black opacity-40">
              {isFr ? "Taille Coiffe" : "Liner Size"}
            </p>
            <p className="text-xs font-bold">{helmet.linerSize || "-"}</p>
          </div>
          <div className="p-2 bg-[#1a1812]/50 rounded-lg border border-[#3a3832] text-center">
            <p className="text-[7px] uppercase font-black opacity-40">
              {isFr ? "Poids" : "Weight"} (g)
            </p>
            <p className="text-xs font-bold">{helmet.weight || "-"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase font-black opacity-40 tracking-widest mb-1">
              {isFr ? "Notes & Histoire" : "Notes & History"}
            </p>
            <p className="text-sm italic leading-relaxed opacity-80 whitespace-pre-wrap">
              {helmet.description ||
                (isFr
                  ? "Aucun historique documenté pour cette pièce."
                  : "No documented history for this item.")}
            </p>
          </div>

          {/* Bouton Génération PDF */}
          <button
            onClick={() => generateHelmetPDF(helmet, lang)}
            className="w-full py-4 mt-4 border-2 border-[#8a7f5d] rounded-xl flex items-center justify-center gap-3 text-[10px] uppercase font-black tracking-widest text-[#f0ede0] bg-[#1a1812] hover:bg-amber-900 active:scale-95 transition-all shadow-xl"
          >
            <Printer size={18} className="text-amber-500" />
            {isFr
              ? "Générer la Fiche Technique (PDF)"
              : "Generate Technical Sheet (PDF)"}
          </button>

          <p className="text-[7px] text-center uppercase opacity-30 italic">
            {isFr
              ? "Document descriptif basé sur les données saisies par l'utilisateur"
              : "Descriptive document based on user-provided data"}
          </p>
        </div>
      </div>
    </div>
  );
}
