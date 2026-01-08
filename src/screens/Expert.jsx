import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { TexturedButton } from "../components/TexturedButton";

export default function Expert({ setScreen, setSelectedHelmet }) {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState({ border: "", vent: "" });
  const [identifiedModel, setIdentifiedModel] = useState("");

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
    setStep(3); // On passe à l'écran de résultat
  };

  return (
    <div className="p-6 h-screen flex flex-col bg-[#2a2822] font-serif text-[#d0c7a8]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#8a7f5d] pb-4">
        <h2 className="text-xl font-black italic uppercase text-[#f0ede0]">
          Identification
        </h2>
        <button
          onClick={() => setScreen("home")}
          className="p-2 bg-[#3a3832] rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6 flex-grow flex flex-col justify-center max-w-sm mx-auto w-full">
        {step === 1 && (
          <>
            <p className="text-center text-amber-600 font-black text-xs uppercase tracking-[0.2em] mb-4">
              Étape 1 : La Bordure
            </p>
            <TexturedButton
              label="Bordure Retournée"
              onClick={() => {
                setChoices({ ...choices, border: "retournee" });
                setStep(2);
              }}
            />
            <TexturedButton
              label="Bordure Brute (M42)"
              variant="dark"
              onClick={() => {
                setChoices({ ...choices, border: "brute" });
                setStep(2);
              }}
            />
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-center text-amber-600 font-black text-xs uppercase tracking-[0.2em] mb-4">
              Étape 2 : Les Évents
            </p>
            <TexturedButton
              label="Évents Rivetés (M35)"
              onClick={() =>
                showResult(
                  choices.border === "retournee" ? "M35" : "M42 (Variante)"
                )
              }
            />
            <TexturedButton
              label="Évents Frappés (M40/M42)"
              variant="dark"
              onClick={() =>
                showResult(choices.border === "retournee" ? "M40" : "M42")
              }
            />
          </>
        )}

        {/* --- NOUVEL ÉCRAN DE RÉSULTAT --- */}
        {step === 3 && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="mb-6 p-8 bg-[#1a1812] border-4 border-amber-600 rounded-3xl shadow-2xl relative w-full text-center">
              <p className="text-[10px] uppercase font-black text-amber-600 mb-2 tracking-widest">
                Modèle Identifié
              </p>
              <h3 className="text-7xl font-black italic uppercase text-[#f0ede0] tracking-tighter">
                {identifiedModel}
              </h3>
            </div>

            <p className="text-sm italic text-center mb-8 opacity-70">
              Voulez-vous créer une archive pour cette pièce ?
            </p>

            <div className="space-y-3 w-full">
              <TexturedButton
                label="Lancer l'Archive"
                onClick={startArchiving}
              />
              <button
                onClick={() => setStep(1)}
                className="w-full py-3 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
              >
                Recommencer l'expertise
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Guide Visuel (masqué sur l'écran de résultat pour plus de clarté) */}
      {step < 3 && (
        <div className="mt-8 p-4 border border-[#3a3832] rounded-xl bg-[#1a1812]/50 opacity-40">
          <p className="text-[10px] uppercase font-black mb-2 text-amber-600">
            Rappel rapide
          </p>
          <div className="text-[8px] grid grid-cols-3 gap-2 text-center uppercase font-bold">
            <div>
              M35
              <br />
              Retourné + Riveté
            </div>
            <div>
              M40
              <br />
              Retourné + Frappé
            </div>
            <div>
              M42
              <br />
              Brut + Frappé
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
