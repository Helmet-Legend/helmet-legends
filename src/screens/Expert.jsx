import React, { useState } from "react";
// --- IMPORT DU FOND ---
import fondExpertise from "../assets/expert-bg.png";

// --- IMPORT DES MINIATURES ÉTAPE 1 (BORDURES) ---
import rolledEdgeImg from "../assets/rolled-edge-small.png";
import rawEdgeImg from "../assets/raw-edge-small.png";

// --- NOUVEAU : IMPORT DES MINIATURES ÉTAPE 2 (ÉVENTS) ---
import bushingVentImg from "../assets/bushing-vent-small.png";
import stampedVentImg from "../assets/stamped-vent-small.png";
// -------------------------------------------------------

import { X, Microscope, ArrowLeft, ChevronRight } from "lucide-react";

export default function Expert({ setScreen, setSelectedHelmet, lang }) {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState({ border: "", vent: "" });
  const [identifiedModel, setIdentifiedModel] = useState("");
  const isFr = lang === "fr";

  const startArchiving = () => {
    setSelectedHelmet({
      id: null,
      model: identifiedModel,
      manufacturer: "",
      lotNumber: "",
      provenance: "",
      description: "",
      images: {
        main: null,
        front: null,
        left: null,
        right: null,
        back: null,
        bottom: null,
        interior: null,
        chinstrap: null,
      },
    });
    setScreen("add");
  };

  const showResult = (modelName) => {
    setIdentifiedModel(modelName);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1812] font-serif text-[#d0c7a8] relative overflow-hidden">
      {/* FOND D'ÉCRAN */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fondExpertise})`,
          filter: "brightness(0.5) contrast(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1812] via-transparent to-black/60"></div>
      </div>

      <div className="relative z-10 p-6 flex flex-col h-screen max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-amber-800 pb-4 shadow-xl backdrop-blur-md bg-black/20 p-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Microscope className="text-amber-500" size={24} />
            <h2 className="text-xl font-black italic uppercase tracking-tighter">
              {isFr ? "Laboratoire d'Expertise" : "Expertise Lab"}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow flex flex-col justify-start overflow-y-auto pb-10 custom-scrollbar">
          {/* ÉTAPE 1 : BORDURES */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
              <div className="text-center space-y-1">
                <p className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">
                  {isFr ? "Analyse de la structure" : "Structural Analysis"}
                </p>
                <h3 className="text-2xl font-black text-white italic uppercase">
                  {isFr ? "1. Le bord de la coque" : "1. The Shell Edge"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* CARTE BORDURE RETOURNÉE */}
                <button
                  onClick={() => {
                    setChoices({ ...choices, border: "retournee" });
                    setStep(2);
                  }}
                  className="group relative flex flex-col bg-black/40 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300 text-left"
                >
                  <img
                    src={rolledEdgeImg}
                    className="w-full h-48 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                    alt=""
                  />
                  <div className="p-4 bg-gradient-to-t from-black to-black/40">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-amber-500 font-black uppercase italic text-lg">
                          {isFr ? "Bord Retourné" : "Rolled Edge"}
                        </h4>
                        <p className="text-[10px] text-white/60 font-sans uppercase tracking-widest">
                          {isFr ? "Modèles M35 & M40" : "M35 & M40 Models"}
                        </p>
                      </div>
                      <ChevronRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>

                {/* CARTE BORDURE BRUTE */}
                <button
                  onClick={() => {
                    setChoices({ ...choices, border: "brute" });
                    setStep(2);
                  }}
                  className="group relative flex flex-col bg-black/40 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300 text-left"
                >
                  <img
                    src={rawEdgeImg}
                    className="w-full h-48 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                    alt=""
                  />
                  <div className="p-4 bg-gradient-to-t from-black to-black/40">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-amber-500 font-black uppercase italic text-lg">
                          {isFr ? "Bord Brut" : "Raw Edge"}
                        </h4>
                        <p className="text-[10px] text-white/60 font-sans uppercase tracking-widest">
                          {isFr ? "Modèle M42" : "M42 Model"}
                        </p>
                      </div>
                      <ChevronRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : ÉVENTS (MIS À JOUR AVEC IMAGES) */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-6 duration-500 space-y-6 pt-4 text-center">
              <div className="space-y-1 mb-6">
                <p className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">
                  {isFr ? "Détails de production" : "Production Details"}
                </p>
                <h3 className="text-2xl font-black text-white italic uppercase">
                  {isFr ? "2. Les Aérations" : "2. The Vents"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 text-left">
                {/* CARTE ÉVENT RIVETÉ (BUSHING) */}
                <button
                  onClick={() =>
                    showResult(
                      choices.border === "retournee" ? "M35" : "M42 (V)"
                    )
                  }
                  className="group relative flex flex-col bg-black/40 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300"
                >
                  <img
                    src={bushingVentImg}
                    className="w-full h-48 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                    alt=""
                  />
                  <div className="p-4 bg-gradient-to-t from-black to-black/40">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-amber-500 font-black uppercase italic text-lg">
                          {isFr ? "Évent Riveté" : "Bushing Vent"}
                        </h4>
                        <p className="text-[10px] text-white/60 font-sans uppercase tracking-widest">
                          {isFr
                            ? "Pièce séparée (M35)"
                            : "Separate piece (M35)"}
                        </p>
                      </div>
                      <ChevronRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>

                {/* CARTE ÉVENT FRAPPÉ (STAMPED) */}
                <button
                  onClick={() =>
                    showResult(choices.border === "retournee" ? "M40" : "M42")
                  }
                  className="group relative flex flex-col bg-black/40 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300"
                >
                  <img
                    src={stampedVentImg}
                    className="w-full h-48 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                    alt=""
                  />
                  <div className="p-4 bg-gradient-to-t from-black to-black/40">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-amber-500 font-black uppercase italic text-lg">
                          {isFr ? "Évent Frappé" : "Stamped Vent"}
                        </h4>
                        <p className="text-[10px] text-white/60 font-sans uppercase tracking-widest">
                          {isFr
                            ? "Embouti dans la masse (M40/42)"
                            : "Stamped into shell (M40/42)"}
                        </p>
                      </div>
                      <ChevronRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 mx-auto mt-6 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity text-amber-200"
              >
                <ArrowLeft size={14} />{" "}
                {isFr ? "Retour au bord" : "Back to edge"}
              </button>
            </div>
          )}

          {/* ÉTAPE 3 : RÉSULTAT FINAL */}
          {step === 3 && (
            <div className="flex flex-col items-center animate-in zoom-in duration-500 pt-10">
              <div className="mb-6 p-10 bg-black/60 backdrop-blur-xl border-4 border-amber-600 rounded-[40px] shadow-[0_0_50px_rgba(217,119,6,0.3)] relative w-full text-center">
                <p className="text-xs uppercase font-black text-amber-500 mb-4 tracking-[0.4em]">
                  {isFr ? "Verdict Expertise" : "Expert Verdict"}
                </p>
                <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter drop-shadow-2xl">
                  {identifiedModel}
                </h3>
              </div>

              <div className="space-y-4 w-full px-4">
                <button
                  onClick={startArchiving}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black py-5 rounded-2xl uppercase italic tracking-tighter shadow-xl active:scale-95 transition-all"
                >
                  {isFr ? "Enregistrer ce casque" : "Save this helmet"}
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setChoices({ border: "", vent: "" });
                  }}
                  className="w-full py-3 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity text-amber-200"
                >
                  {isFr
                    ? "Recommencer l'identification"
                    : "Restart identification"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
