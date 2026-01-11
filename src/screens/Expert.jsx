import React, { useState } from "react";
// --- FOND D'ÉCRAN ---
import fondExpertise from "../assets/expert-bg.png";

// --- MINIATURES DE SÉLECTION (Étapes 1 & 2) ---
import rolledEdgeImg from "../assets/rolled-edge-small.png";
import rawEdgeImg from "../assets/raw-edge-small.png";
import bushingVentImg from "../assets/bushing-vent-small.png";
import stampedVentImg from "../assets/stamped-vent-small.png";

// --- IMAGES HERO DYNAMIQUES (Étape 3) ---
import m35HeroImg from "../assets/m35-hero.png";
import m40HeroImg from "../assets/m40-hero.png";
import m42HeroImg from "../assets/m42-hero.png";

import { X, Microscope, ArrowLeft, ChevronRight } from "lucide-react";

export default function Expert({ setScreen, setSelectedHelmet, lang }) {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState({ border: "", vent: "" });
  const [identifiedModel, setIdentifiedModel] = useState("");
  const isFr = lang === "fr";

  // Fonction pour récupérer l'image globale selon le résultat
  const getHeroImage = (model) => {
    if (model.includes("M35")) return m35HeroImg;
    if (model.includes("M40")) return m40HeroImg;
    if (model.includes("M42")) return m42HeroImg;
    return m40HeroImg; // Repli par défaut
  };

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
      {/* BACKGROUND OPTIMISÉ */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fondExpertise})`,
          filter: "brightness(0.4) contrast(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1812] via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 p-6 flex flex-col h-screen max-w-2xl mx-auto w-full">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-amber-800 pb-4 shadow-xl backdrop-blur-md bg-black/20 p-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Microscope className="text-amber-500" size={24} />
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
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
          {/* ÉTAPE 1 : LE BORD (CARTES LARGES) */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
              <div className="text-center">
                <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                  Analyse Structurelle
                </p>
                <h3 className="text-2xl font-black text-white italic uppercase">
                  {isFr ? "1. Le bord de la coque" : "1. The Shell Edge"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => {
                    setChoices({ ...choices, border: "retournee" });
                    setStep(2);
                  }}
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300"
                >
                  <img
                    src={rolledEdgeImg}
                    className="w-full h-44 object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    alt=""
                  />
                  <div className="p-4 bg-black/60 backdrop-blur-md flex justify-between items-center">
                    <div>
                      <h4 className="text-amber-500 font-black uppercase italic">
                        {isFr ? "Bord Retourné" : "Rolled Edge"}
                      </h4>
                      <p className="text-[9px] text-white/50 uppercase">
                        {isFr ? "M35 & M40 : Replié" : "M35 & M40: Folded"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" />
                  </div>
                </button>

                <button
                  onClick={() => {
                    setChoices({ ...choices, border: "brute" });
                    setStep(2);
                  }}
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300"
                >
                  <img
                    src={rawEdgeImg}
                    className="w-full h-44 object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    alt=""
                  />
                  <div className="p-4 bg-black/60 backdrop-blur-md flex justify-between items-center">
                    <div>
                      <h4 className="text-amber-500 font-black uppercase italic">
                        {isFr ? "Bord Brut" : "Raw Edge"}
                      </h4>
                      <p className="text-[9px] text-white/50 uppercase">
                        {isFr
                          ? "M42 : Évasé / Tranchant"
                          : "M42: Flared / Sharp"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : LES ÉVENTS (CARTES LARGES) */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-6 duration-500 space-y-6">
              <div className="text-center">
                <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                  Détails de Production
                </p>
                <h3 className="text-2xl font-black text-white italic uppercase">
                  {isFr ? "2. Les Aérations" : "2. The Vents"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() =>
                    showResult(
                      choices.border === "retournee" ? "M35" : "M42 (V)"
                    )
                  }
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300"
                >
                  <img
                    src={bushingVentImg}
                    className="w-full h-44 object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    alt=""
                  />
                  <div className="p-4 bg-black/60 backdrop-blur-md flex justify-between items-center">
                    <div>
                      <h4 className="text-amber-500 font-black uppercase italic">
                        {isFr ? "Évent Riveté" : "Bushing Vent"}
                      </h4>
                      <p className="text-[9px] text-white/50 uppercase">
                        {isFr
                          ? "Pièce rapportée (M35)"
                          : "Separate piece (M35)"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" />
                  </div>
                </button>

                <button
                  onClick={() =>
                    showResult(choices.border === "retournee" ? "M40" : "M42")
                  }
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300"
                >
                  <img
                    src={stampedVentImg}
                    className="w-full h-44 object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    alt=""
                  />
                  <div className="p-4 bg-black/60 backdrop-blur-md flex justify-between items-center">
                    <div>
                      <h4 className="text-amber-500 font-black uppercase italic">
                        {isFr ? "Évent Frappé" : "Stamped Vent"}
                      </h4>
                      <p className="text-[9px] text-white/50 uppercase">
                        {isFr
                          ? "Embouti (M40 / M42)"
                          : "Integrated (M40 / M42)"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" />
                  </div>
                </button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 mx-auto mt-4 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity text-amber-200"
              >
                <ArrowLeft size={14} />{" "}
                {isFr ? "Retour au bord" : "Back to edge"}
              </button>
            </div>
          )}

          {/* ÉTAPE 3 : RÉSULTAT FINAL (DYNAMIQUE) */}
          {step === 3 && (
            <div className="flex flex-col items-center animate-in zoom-in duration-700">
              <div className="mb-8 w-full overflow-hidden rounded-[3rem] border-4 border-amber-600 bg-black/60 shadow-[0_0_50px_rgba(217,119,6,0.3)] backdrop-blur-xl relative group">
                {/* Image Hero Dynamique */}
                <div className="relative h-80 w-full bg-gradient-to-b from-black/40 to-black/90 flex items-center justify-center p-4">
                  <img
                    src={getHeroImage(identifiedModel)}
                    alt={identifiedModel}
                    className="h-full w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Texte Verdict */}
                <div className="relative z-10 bg-black pb-8 pt-2 px-6 text-center">
                  <p className="text-[10px] uppercase font-black text-amber-500 mb-2 tracking-[0.4em] opacity-80">
                    {isFr ? "Verdict Expertise" : "Expert Verdict"}
                  </p>
                  <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter leading-none">
                    {identifiedModel}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 w-full">
                <button
                  onClick={startArchiving}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black py-5 rounded-2xl uppercase italic tracking-tighter shadow-xl active:scale-95 transition-all text-xl"
                >
                  {isFr ? "Enregistrer ce casque" : "Save this helmet"}
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setChoices({ border: "", vent: "" });
                  }}
                  className="w-full py-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity text-amber-200"
                >
                  <ArrowLeft size={12} />{" "}
                  {isFr ? "Nouvelle identification" : "New identification"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
