import React, { useState } from "react"; // Ajout de useState
import monFondExpert from "../assets/helmet-bg.png";
import {
  Plus,
  Trash2,
  ChevronRight,
  Shield,
  ArrowLeft,
  Database,
  Info,
  Download, // Nouvel import
  Check, // Nouvel import
  Loader2, // Pour l'animation de chargement
} from "lucide-react";

export default function Registry({
  setScreen = () => {},
  helmets = [],
  onDelete = () => {},
  onEdit = () => {},
  lang = "fr",
}) {
  const isFr = lang === "fr";

  // États pour le feedback de téléchargement
  const [downloadingId, setDownloadingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  // Fonction de simulation du téléchargement PDF
  const handleDownloadPDF = async (helmet) => {
    setDownloadingId(helmet.id);

    try {
      // Simule le délai de génération du PDF (2 secondes)
      // Remplacez ce délai par votre véritable logique jsPDF/html2canvas si nécessaire
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setDownloadingId(null);
      setSuccessId(helmet.id);

      // Faire disparaître le message de succès après 3 secondes
      setTimeout(() => setSuccessId(null), 3000);
    } catch (error) {
      console.error("Erreur lors du téléchargement", error);
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1812] text-[#d0c7a8] font-serif relative overflow-hidden">
      {/* --- IMAGE DE FOND --- */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${monFondExpert})`,
          filter: "brightness(0.3) blur(5px)",
        }}
      ></div>

      <div className="relative z-10 p-6 pb-32 max-w-2xl mx-auto h-screen overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-amber-800 pb-4 shadow-xl backdrop-blur-md bg-black/30 p-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Shield className="text-amber-500" size={28} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              {isFr ? "Registre d'Archives" : "Archive Registry"}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* BOUTON AJOUTER */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => onEdit(null)}
            className="flex-1 bg-amber-600 hover:bg-amber-500 text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-900/20 uppercase text-xs"
          >
            <Plus size={18} /> {isFr ? "Ajouter une pièce" : "Add New Piece"}
          </button>
        </div>

        {/* LISTE */}
        <div className="space-y-4">
          {!helmets || helmets.length === 0 ? (
            <div className="text-center py-20 bg-black/40 backdrop-blur-md rounded-2xl border border-dashed border-amber-900/30">
              <Database size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm italic opacity-50">
                {isFr ? "Aucune archive enregistrée..." : "No records found..."}
              </p>
            </div>
          ) : (
            helmets.map((h) => (
              <div
                key={h.id || Math.random()}
                className="group relative bg-black/60 backdrop-blur-lg border-2 border-amber-900/20 rounded-2xl overflow-hidden hover:border-amber-600/50 transition-all duration-300 shadow-2xl"
              >
                <div className="flex p-4 gap-4">
                  {/* Miniature Image */}
                  <div className="w-24 h-24 bg-[#1a1812] rounded-lg overflow-hidden border border-amber-900/30 flex-shrink-0 shadow-inner">
                    {h.images?.main ? (
                      <img
                        src={h.images.main}
                        alt="Helmet"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        <Shield size={24} />
                      </div>
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-black text-amber-500 italic leading-tight truncate">
                        {h.model}{" "}
                        <span className="text-[10px] text-white/50 not-italic ml-1">
                          #{h.lotNumber}
                        </span>
                      </h3>

                      {/* BOUTONS D'ACTION (Delete & Download) */}
                      <div className="flex gap-3">
                        {/* Bouton Téléchargement avec Feedback */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPDF(h);
                          }}
                          disabled={downloadingId === h.id}
                          className={`p-1 transition-colors ${
                            successId === h.id
                              ? "text-green-500"
                              : "text-amber-700 hover:text-amber-400"
                          }`}
                        >
                          {downloadingId === h.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : successId === h.id ? (
                            <Check size={16} />
                          ) : (
                            <Download size={16} />
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(h.id);
                          }}
                          className="p-1 text-red-900/50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] uppercase font-bold text-white/70 mt-1 flex items-center gap-1">
                      <Info size={10} className="text-amber-700" />{" "}
                      {h.manufacturer} • {h.shellSize}/{h.linerSize}
                    </p>

                    <div className="mt-3 flex justify-between items-end">
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 bg-amber-900/30 border border-amber-700/30 rounded text-[9px] font-bold text-amber-200 uppercase">
                          {h.decals}
                        </span>
                      </div>

                      {/* Indicateur textuel de succès éphémère */}
                      {successId === h.id && (
                        <span className="text-[9px] text-green-500 font-bold animate-pulse">
                          {isFr ? "PDF PRÊT" : "PDF READY"}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onEdit(h)}
                    className="self-center p-2 bg-amber-900/20 rounded-full text-amber-600 hover:bg-amber-600 hover:text-black transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
