import React from "react";
// Ajout de l'icône Printer pour le bouton du bas
import { ChevronLeft, Edit3, Download, Printer } from "lucide-react";
// Importation de votre utilitaire de génération PDF pro
import { generateHelmetPDF } from "../utils/pdfGenerator";

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
        {/* Bouton Retour (Gauche) */}
        <button
          onClick={() => setScreen("registry")}
          className="p-2 bg-[#2a2822]/80 rounded-full backdrop-blur-md border border-[#3a3832]"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Titre Central */}
        <div className="text-center">
          <h2 className="text-2xl font-black italic uppercase text-[#f0ede0] leading-none">
            {helmet.model}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">
            Fiche d'Expertise
          </p>
        </div>

        {/* Groupe de Boutons d'Action (Droite) */}
        <div className="flex gap-2">
          {/* Bouton Édition */}
          <button
            onClick={onEdit}
            className="p-2 bg-amber-600 rounded-full text-[#1a1812] shadow-lg active:scale-95 transition-transform"
          >
            <Edit3 size={20} />
          </button>

          {/* Bouton Téléchargement PDF Rapide */}
          <button
            onClick={() => generateHelmetPDF(helmet)}
            className="p-2 bg-amber-800 rounded-full text-[#f0ede0] shadow-lg active:scale-95 transition-transform"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Galerie Photo Plein Écran */}
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
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[10px] uppercase font-black tracking-widest opacity-60">
                Vue : {photo.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panneau d'informations coulissant */}
      <div className="bg-[#2a2822] border-t-2 border-[#8a7f5d] p-6 pb-12 max-h-[45vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-[#1a1812] rounded-xl border border-[#3a3832]">
            <p className="text-[8px] uppercase font-black opacity-40 mb-1">
              Fabricant / Usine
            </p>
            <p className="text-sm font-bold text-amber-500">
              {helmet.manufacturer || "N/A"}
            </p>
          </div>
          <div className="p-3 bg-[#1a1812] rounded-xl border border-[#3a3832]">
            <p className="text-[8px] uppercase font-black opacity-40 mb-1">
              Numéro de Lot
            </p>
            <p className="text-sm font-bold text-amber-500">
              {helmet.lotNumber || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase font-black opacity-40 tracking-widest mb-1">
              Notes & Histoire
            </p>
            <p className="text-sm italic leading-relaxed opacity-80">
              {helmet.description ||
                "Aucun historique documenté pour cette pièce."}
            </p>
          </div>

          {/* NOUVEAU : Grand bouton d'exportation pro en bas */}
          <button
            onClick={() => generateHelmetPDF(helmet)}
            className="w-full py-4 mt-4 border-2 border-[#8a7f5d] rounded-xl flex items-center justify-center gap-3 text-[10px] uppercase font-black tracking-widest text-[#f0ede0] bg-[#1a1812] hover:bg-amber-900 active:scale-95 transition-all shadow-xl"
          >
            <Printer size={18} className="text-amber-500" />
            Générer le Certificat d'Expertise (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
