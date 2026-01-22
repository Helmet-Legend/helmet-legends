import React, { useState } from "react";
import monFondExpert from "../assets/helmet-bg.png";
import {
  Plus,
  Trash2,
  ChevronRight,
  Shield,
  ArrowLeft,
  Database,
  Info,
  Download,
  Check,
  Loader2,
} from "lucide-react";

export default function Registry({
  setScreen = () => {},
  helmets = [],
  onDelete = () => {},
  onEdit = () => {},
  lang = "fr",
}) {
  const isFr = lang === "fr";
  const [downloadingId, setDownloadingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  const handleDownloadPDF = async (helmet) => {
    setDownloadingId(helmet.id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDownloadingId(null);
      setSuccessId(helmet.id);
      setTimeout(() => setSuccessId(null), 3000);
    } catch (error) {
      console.error("Erreur lors du téléchargement", error);
      setDownloadingId(null);
    }
  };

  return (
    // On change min-h-screen et on enlève overflow-hidden pour permettre le scroll naturel
    <div className="min-h-screen bg-[#1a1812] text-[#d0c7a8] font-serif relative">
      {/* --- IMAGE DE FOND FIXE --- */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.2) blur(8px)", // Légèrement plus sombre pour la lisibilité
        }}
      ></div>

      {/* CONTENEUR PRINCIPAL : On enlève h-screen ici */}
      <div className="relative z-10 p-4 md:p-8 pb-32 max-w-5xl mx-auto">
        {/* HEADER FIXE OU STICKY POUR ORDINATEUR */}
        <div className="sticky top-0 z-20 flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 backdrop-blur-xl bg-black/40 p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <Shield className="text-amber-500" size={28} />
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
              {isFr ? "Registre d'Archives" : "Archive Registry"}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 hover:bg-amber-600 hover:text-black transition-all"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* BOUTON AJOUTER */}
        <button
          onClick={() => onEdit(null)}
          className="w-full mb-8 bg-amber-600 hover:bg-amber-500 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg uppercase text-sm tracking-widest"
        >
          <Plus size={20} />{" "}
          {isFr ? "Ajouter une nouvelle pièce" : "Add New Piece"}
        </button>

        {/* LISTE EN GRILLE (1 col mobile, 2 cols desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {!helmets || helmets.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-black/40 backdrop-blur-md rounded-2xl border border-dashed border-amber-900/30">
              <Database size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm italic opacity-50">
                {isFr ? "Aucune archive enregistrée..." : "No records found..."}
              </p>
            </div>
          ) : (
            helmets.map((h) => (
              <div
                key={h.id || Math.random()}
                className="group bg-black/60 backdrop-blur-lg border border-amber-900/30 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex h-32 shadow-xl"
              >
                {/* Miniature : Taille fixe pour éviter l'envahissement de l'écran */}
                <div className="w-32 h-full bg-black flex-shrink-0 border-r border-amber-900/20">
                  {h.images?.main ? (
                    <img
                      src={h.images.main}
                      alt="Helmet"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <Shield size={32} />
                    </div>
                  )}
                </div>

                {/* Infos */}
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="truncate">
                      <h3 className="text-amber-500 font-black uppercase italic truncate text-base">
                        {h.model}
                      </h3>
                      <p className="text-[10px] text-white/40 font-bold tracking-widest">
                        LOT #{h.lotNumber}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPDF(h);
                        }}
                        className="p-1.5 text-amber-700 hover:text-amber-400"
                      >
                        {downloadingId === h.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Download size={16} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(h.id);
                        }}
                        className="p-1.5 text-red-900/40 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[9px] bg-amber-900/20 px-2 py-0.5 rounded border border-amber-900/40 text-amber-200">
                      {h.manufacturer || "N/A"}
                    </span>
                    <button
                      onClick={() => onEdit(h)}
                      className="flex items-center gap-1 text-[10px] font-bold text-amber-500 hover:text-white transition-colors uppercase"
                    >
                      {isFr ? "Détails" : "Details"} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
