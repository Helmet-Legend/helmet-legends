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
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${fondExpertise})`,
          filter: "brightness(0.3) contrast(1.1) blur(2px)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1812] via-transparent to-black/90"></div>
      </div>

      <div className="relative z-10 p-4 flex flex-col h-screen max-w-2xl mx-auto w-full">
        {/* HEADER FIXE */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-amber-800 pb-4 shadow-xl backdrop-blur-md bg-black/20 p-4 rounded-t-2xl shrink-0">
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

        {/* ZONE SCROLLABLE */}
        <div className="flex-grow overflow-y-auto pb-10 custom-scrollbar pr-1">
          {/* ÉTAPE 1 : LE BORD */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-8 py-4">
              <div className="text-center">
                <p className="text-amber-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
                  Analyse Structurelle
                </p>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                  1. Le bord de la coque
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <button
                  onClick={() => {
                    setChoices({ ...choices, border: "retournee" });
                    setStep(2);
                  }}
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-[2.5rem] overflow-hidden hover:border-amber-500 transition-all duration-300 shadow-2xl"
                >
                  <img
                    src={rolledEdgeImg}
                    className="w-full h-56 object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
                    alt=""
                  />
                  <div className="p-6 bg-black/60 backdrop-blur-md flex justify-between items-center border-t border-amber-900/20">
                    <div>
                      <h4 className="text-amber-500 text-lg font-black uppercase italic tracking-tighter">
                        {isFr ? "Bord Retourné" : "Rolled Edge"}
                      </h4>
                      <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">
                        {isFr ? "M35 & M40 : Replié" : "M35 & M40: Folded"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" size={28} />
                  </div>
                </button>

                <button
                  onClick={() => {
                    setChoices({ ...choices, border: "brute" });
                    setStep(2);
                  }}
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-[2.5rem] overflow-hidden hover:border-amber-500 transition-all duration-300 shadow-2xl"
                >
                  <img
                    src={rawEdgeImg}
                    className="w-full h-56 object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
                    alt=""
                  />
                  <div className="p-6 bg-black/60 backdrop-blur-md flex justify-between items-center border-t border-amber-900/20">
                    <div>
                      <h4 className="text-amber-500 text-lg font-black uppercase italic tracking-tighter">
                        {isFr ? "Bord Brut" : "Raw Edge"}
                      </h4>
                      <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">
                        {isFr
                          ? "M42 : Évasé / Tranchant"
                          : "M42: Flared / Sharp"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" size={28} />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : LES ÉVENTS */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-6 duration-500 space-y-8 py-4">
              <div className="text-center">
                <p className="text-amber-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
                  Détails de Production
                </p>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                  2. Les Aérations
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <button
                  onClick={() =>
                    showResult(
                      choices.border === "retournee" ? "M35" : "M42 (V)"
                    )
                  }
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-[2.5rem] overflow-hidden hover:border-amber-500 transition-all duration-300 shadow-2xl"
                >
                  <img
                    src={bushingVentImg}
                    className="w-full h-56 object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
                    alt=""
                  />
                  <div className="p-6 bg-black/60 backdrop-blur-md flex justify-between items-center border-t border-amber-900/20">
                    <div>
                      <h4 className="text-amber-500 text-lg font-black uppercase italic tracking-tighter">
                        {isFr ? "Évent Riveté" : "Bushing Vent"}
                      </h4>
                      <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">
                        {isFr
                          ? "Pièce rapportée (M35)"
                          : "Separate piece (M35)"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" size={28} />
                  </div>
                </button>

                <button
                  onClick={() =>
                    showResult(choices.border === "retournee" ? "M40" : "M42")
                  }
                  className="group relative flex flex-col bg-black/50 border-2 border-amber-900/30 rounded-[2.5rem] overflow-hidden hover:border-amber-500 transition-all duration-300 shadow-2xl"
                >
                  <img
                    src={stampedVentImg}
                    className="w-full h-56 object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
                    alt=""
                  />
                  <div className="p-6 bg-black/60 backdrop-blur-md flex justify-between items-center border-t border-amber-900/20">
                    <div>
                      <h4 className="text-amber-500 text-lg font-black uppercase italic tracking-tighter">
                        {isFr ? "Évent Frappé" : "Stamped Vent"}
                      </h4>
                      <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">
                        {isFr
                          ? "Embouti (M40 / M42)"
                          : "Integrated (M40 / M42)"}
                      </p>
                    </div>
                    <ChevronRight className="text-amber-500" size={28} />
                  </div>
                </button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-3 mx-auto mt-6 text-xs font-black uppercase opacity-40 hover:opacity-100 transition-opacity text-amber-200 py-4 px-8 border border-transparent hover:border-amber-900/30 rounded-full"
              >
                <ArrowLeft size={16} />{" "}
                {isFr ? "Retour au choix du bord" : "Back to edge choice"}
              </button>
            </div>
          )}

          {/* ÉTAPE 3 : RÉSULTAT FINAL AGRANDI */}
          {step === 3 && (
            <div className="flex flex-col items-center animate-in zoom-in duration-700 py-6">
              <div className="mb-12 w-full overflow-hidden rounded-[4rem] border-4 border-amber-600 bg-black/60 shadow-[0_0_80px_rgba(217,119,6,0.4)] backdrop-blur-xl relative group">
                {/* Image Hero Massive */}
                <div className="relative h-[28rem] w-full bg-gradient-to-b from-black/20 to-black/90 flex items-center justify-center p-6">
                  <img
                    src={getHeroImage(identifiedModel)}
                    alt={identifiedModel}
                    className="h-full w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Texte Verdict Immense */}
                <div className="relative z-10 bg-black pb-12 pt-4 px-8 text-center border-t border-amber-900/30">
                  <p className="text-sm uppercase font-black text-amber-500 mb-2 tracking-[0.5em] opacity-90">
                    {isFr ? "Verdict Expertise" : "Expert Verdict"}
                  </p>
                  <h3 className="text-[9rem] font-black italic uppercase text-white tracking-tighter leading-none drop-shadow-2xl">
                    {identifiedModel}
                  </h3>
                </div>
              </div>

              {/* Actions de fin */}
              <div className="space-y-6 w-full px-2">
                <button
                  onClick={startArchiving}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black py-8 rounded-[2.5rem] uppercase italic tracking-tighter shadow-[0_20px_40px_rgba(217,119,6,0.2)] active:scale-95 transition-all text-2xl border-b-4 border-amber-800"
                >
                  {isFr ? "Enregistrer ce casque" : "Save this helmet"}
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setChoices({ border: "", vent: "" });
                  }}
                  className="w-full py-4 flex items-center justify-center gap-3 text-sm font-black uppercase opacity-40 hover:opacity-100 transition-opacity text-amber-200 italic tracking-widest"
                >
                  <ArrowLeft size={18} />{" "}
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
