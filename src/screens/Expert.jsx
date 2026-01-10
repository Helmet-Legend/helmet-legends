import React, { useState } from "react";
// --- IMPORT DU FOND ---
import fondExpertise from "../assets/expert-bg.png";

import { X, Microscope, ArrowLeft } from "lucide-react";
import { TexturedButton } from "../components/TexturedButton";

export default function Expert({ setScreen, setSelectedHelmet, lang }) {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState({ border: "", vent: "" });
  const [identifiedModel, setIdentifiedModel] = useState("");
  const isFr = lang === "fr";

  // Étape finale : Préparation des données et basculement vers l'ajout
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

  // Calcul du résultat intermédiaire
  const showResult = (modelName) => {
    setIdentifiedModel(modelName);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1812] font-serif text-[#d0c7a8] relative overflow-hidden">
      {/* --- FOND D'ÉCRAN (LÉGÈREMENT ÉCLAIRCI) --- */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fondExpertise})`,
          // Passé de 0.35 à 0.5 pour éclaircir le fond
          filter: "brightness(0.5) contrast(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1812] via-transparent to-black/60"></div>
      </div>

      {/* --- CONTENU --- */}
      <div className="relative z-10 p-6 flex flex-col h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-amber-800 pb-4 shadow-xl backdrop-blur-md bg-black/20 p-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Microscope className="text-amber-500" size={24} />
            <h2 className="text-xl font-black italic uppercase tracking-tighter">
              {isFr ? "Identification" : "Identification"}
            </h2>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="p-2 bg-amber-900/40 rounded-full border border-amber-700/50 text-amber-500 active:scale-90 transition-transform"
          >
            <X size={20} />
          </button>
        </div>

        {/* Zone Centrale d'Analyse */}
        <div className="flex-grow flex flex-col justify-center max-w-sm mx-auto w-full space-y-6">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <p className="text-center text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-4">
                {isFr ? "Étape 1 : La Bordure" : "Step 1: The Edge"}
              </p>
              <TexturedButton
                label={isFr ? "Bordure Retournée" : "Rolled Edge"}
                onClick={() => {
                  setChoices({ ...choices, border: "retournee" });
                  setStep(2);
                }}
              />
              <TexturedButton
                label={isFr ? "Bordure Brute (M42)" : "Raw Edge (M42)"}
                variant="dark"
                onClick={() => {
                  setChoices({ ...choices, border: "brute" });
                  setStep(2);
                }}
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <p className="text-center text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-4">
                {isFr ? "Étape 2 : Les Évents" : "Step 2: The Vents"}
              </p>
              <TexturedButton
                label={
                  isFr ? "Évents Rivetés (M35)" : "Inward-Pressed Vents (M35)"
                }
                onClick={() =>
                  showResult(
                    choices.border === "retournee" ? "M35" : "M42 (Variante)"
                  )
                }
              />
              <TexturedButton
                label={
                  isFr ? "Évents Frappés (M40/M42)" : "Embossed Vents (M40/M42)"
                }
                variant="dark"
                onClick={() =>
                  showResult(choices.border === "retournee" ? "M40" : "M42")
                }
              />
            </div>
          )}

          {/* ÉCRAN DE RÉSULTAT */}
          {step === 3 && (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="mb-6 p-8 bg-black/60 backdrop-blur-xl border-4 border-amber-600 rounded-3xl shadow-[0_0_30px_rgba(217,119,6,0.3)] relative w-full text-center">
                <p className="text-[10px] uppercase font-black text-amber-500 mb-2 tracking-widest">
                  {isFr ? "Modèle Identifié" : "Identified Model"}
                </p>
                <h3 className="text-7xl font-black italic uppercase text-white tracking-tighter drop-shadow-lg">
                  {identifiedModel}
                </h3>
              </div>

              <p className="text-sm italic text-center mb-8 opacity-70 text-amber-100">
                {isFr
                  ? "Voulez-vous créer une archive pour cette pièce ?"
                  : "Do you want to create an archive for this piece?"}
              </p>

              <div className="space-y-3 w-full">
                <TexturedButton
                  label={isFr ? "Lancer l'Archive" : "Start Archiving"}
                  onClick={startArchiving}
                />
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity text-amber-200"
                >
                  {isFr ? "Recommencer l'expertise" : "Restart Expertise"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guide Visuel au bas de l'écran */}
        {step < 3 && (
          <div className="mt-auto p-4 border border-amber-900/30 rounded-xl bg-black/40 backdrop-blur-sm shadow-inner">
            <p className="text-[10px] uppercase font-black mb-2 text-amber-600">
              {isFr ? "Rappel rapide" : "Quick Reminder"}
            </p>
            <div className="text-[8px] grid grid-cols-3 gap-2 text-center uppercase font-bold text-white/60">
              <div className="p-1 border-r border-amber-900/20">
                M35
                <br />
                {isFr ? "Retourné + Riveté" : "Rolled + Pressed"}
              </div>
              <div className="p-1 border-r border-amber-900/20">
                M40
                <br />
                {isFr ? "Retourné + Frappé" : "Rolled + Embossed"}
              </div>
              <div className="p-1">
                M42
                <br />
                {isFr ? "Brut + Frappé" : "Raw + Embossed"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
