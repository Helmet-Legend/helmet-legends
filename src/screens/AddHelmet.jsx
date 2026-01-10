import React, { useState, useEffect } from "react";
import {
  X,
  ImageIcon,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { TexturedButton } from "../components/TexturedButton";
import { compressImage } from "../utils/imageCompressor";

const MANUFACTURERS = {
  ET: "Eisenhüttenwerke, Thale",
  Q: "F.W. Quist, Esslingen",
  SE: "Sächsische Emaillier-und Stanzwerke",
  NS: "Vereinigte Deutsche Nickelwerke",
  EF: "Emaillierwerke AG, Fulda",
  CKL: "Eisenhüttenwerke Thale (Tardif)",
  HKP: "SE (Tardif)",
};

const HELMET_MODELS = [
  "M35",
  "M40",
  "M42",
  "M38 (Parachutiste)",
  "Luftschutz (Gladiator)",
  "M34 Feuerwehr (Pompiers/Police)",
  "Autre / Prototype",
];

const SHELL_SIZES = ["60", "62", "64", "66", "68", "70", "72"];
const LINER_SIZES = [
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
];
const PAINT_OPTIONS = [
  "100% (Stock)",
  "90%",
  "80%",
  "70%",
  "60%",
  "50%",
  "40%",
  "30%",
  "20%",
  "10%",
  "REPEINT",
  "ROUILLÉ",
];
const DECAL_OPTIONS = ["Aucun", "Mono-insigne", "Double insignes"];

// --- LOGIQUE D'EXPERTISE CENTRALISÉE (LOTS + INSIGNES) ---
export const getExpertise = (helmet) => {
  const lot = parseInt(helmet.lotNumber);
  const mkr = helmet.manufacturer?.toUpperCase();
  const mdl = helmet.model;
  const dec = helmet.decals;

  if (!lot || !mkr || !mdl)
    return "Analyse en attente de données complètes (Usine + Lot)...";

  // Analyse M35
  if (mdl === "M35") {
    if (lot > 5500)
      return `ALERTE : Lot #${lot} très élevé pour un M35. Transition M40 probable. Vérifiez si les évents sont bien rivetés.`;
    return "M35 : Standard double insignes. Si aucun n'est présent, vérifiez s'il s'agit d'un reconditionnement tardif.";
  }

  // Analyse M40
  if (mdl === "M40") {
    if (dec === "Double insignes")
      return "ANOMALIE : Décret de Mars 1940 : arrêt du bouclier tricolore. Un M40 ne devrait être que mono-insigne (sauf Police/SS).";
  }

  // Analyse M42
  if (mdl === "M42") {
    if (dec === "Double insignes")
      return "ALERTE : Un M42 double insignes est historiquement aberrant (Décrets 1940/43). Risque de faux à 99%.";
    if (mkr === "ET")
      return "ANOMALIE : Thale utilisait le code 'ckl' pour les M42. Le marquage 'ET' est suspect sur ce modèle.";
  }

  // Analyse M38
  if (mdl === "M38 (Parachutiste)" && mkr !== "ET" && mkr !== "CKL") {
    return "ALERTE : Seule l'usine de Thale a produit des M38 authentiques. Risque de copie majeure.";
  }

  return "Configuration conforme aux standards de production majeurs.";
};

export default function AddHelmet({ setScreen, onSave, helmet }) {
  const [current, setCurrent] = useState(
    helmet || {
      id: null,
      model: "",
      manufacturer: "",
      lotNumber: "",
      provenance: "",
      description: "",
      shellSize: "",
      linerSize: "",
      weight: "",
      material: "",
      paintCondition: "",
      linerCondition: "",
      chinstrapState: "",
      decals: "",
      expertiseMessage: "",
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
    }
  );

  const [validation, setValidation] = useState({
    message: "",
    color: "text-gray-500",
    icon: null,
  });

  const isStandardMkr = Object.keys(MANUFACTURERS).includes(
    current.manufacturer
  );
  const isStandardShell = SHELL_SIZES.includes(current.shellSize);
  const isStandardLiner = LINER_SIZES.includes(current.linerSize);

  useEffect(() => {
    const msg = getExpertise(current);
    let color = "text-blue-400";
    let icon = <CheckCircle size={14} />;

    if (msg.includes("ALERTE") || msg.includes("ANOMALIE")) {
      color =
        msg.includes("faux") || msg.includes("M38")
          ? "text-red-500"
          : "text-orange-500";
      icon = <AlertTriangle size={14} />;
    } else if (msg.includes("attente")) {
      color = "text-gray-500";
      icon = <Info size={14} />;
    }
    setValidation({ message: msg, color, icon });
  }, [current.model, current.manufacturer, current.lotNumber, current.decals]);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setCurrent((prev) => ({
        ...prev,
        images: { ...prev.images, [type]: compressed },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 h-screen overflow-y-auto pb-32 bg-[#2a2822] font-serif text-[#d0c7a8]">
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#8a7f5d] pb-4">
        <h2 className="text-xl font-black italic uppercase">
          {current.id ? "Modification" : "Archivage"}
        </h2>
        <button
          onClick={() => setScreen("registry")}
          className="p-2 bg-[#3a3832] rounded-full"
        >
          <X />
        </button>
      </div>

      <div className="space-y-6">
        {/* MODÈLE ET INSIGNES */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              Modèle
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-black text-[#f0ede0] outline-none"
              value={current.model}
              onChange={(e) =>
                setCurrent({ ...current, model: e.target.value })
              }
            >
              <option value="">-- Sélectionner --</option>
              {HELMET_MODELS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              Insignes (Decals)
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-[#f0ede0] outline-none"
              value={current.decals}
              onChange={(e) =>
                setCurrent({ ...current, decals: e.target.value })
              }
            >
              <option value="">-- État des insignes --</option>
              {DECAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* USINE & LOT */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              Usine
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-amber-500 outline-none"
              value={
                isStandardMkr
                  ? current.manufacturer
                  : current.manufacturer === ""
                  ? ""
                  : "AUTRE"
              }
              onChange={(e) =>
                setCurrent({
                  ...current,
                  manufacturer:
                    e.target.value === "AUTRE" ? "SAISIE..." : e.target.value,
                })
              }
            >
              <option value="">-- Usine --</option>
              {Object.entries(MANUFACTURERS).map(([code]) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
              <option value="AUTRE">AUTRE</option>
            </select>
            {!isStandardMkr && current.manufacturer !== "" && (
              <input
                autoFocus
                className="w-full mt-2 bg-[#1a1812] border-2 border-amber-600/30 p-4 rounded-xl text-sm text-amber-500 uppercase"
                value={
                  current.manufacturer === "SAISIE..."
                    ? ""
                    : current.manufacturer
                }
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    manufacturer: e.target.value.toUpperCase(),
                  })
                }
              />
            )}
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              N° Lot
            </label>
            <input
              placeholder="ex: 1234"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm text-amber-500 font-bold h-[56px]"
              value={current.lotNumber}
              onChange={(e) =>
                setCurrent({ ...current, lotNumber: e.target.value })
              }
            />
          </div>
        </div>

        {/* BANDEAU D'EXPERTISE */}
        <div
          className={`p-4 rounded-2xl bg-[#1a1812] border-2 ${validation.color.replace(
            "text",
            "border"
          )} bg-opacity-10 flex flex-col gap-2 transition-all shadow-inner`}
        >
          <div
            className={`flex items-center gap-2 ${validation.color} font-black text-[11px] uppercase tracking-widest`}
          >
            {validation.icon} Rapport d'Expertise
          </div>
          <p className="text-[10px] text-[#f0ede0] leading-relaxed italic opacity-90">
            "{validation.message}"
          </p>
        </div>

        {/* TECHNIQUES */}
        <div className="space-y-4 border-t border-[#3a3832] pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
                Coque
              </label>
              <select
                className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-[#f0ede0] outline-none"
                value={
                  isStandardShell
                    ? current.shellSize
                    : current.shellSize === ""
                    ? ""
                    : "AUTRE"
                }
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    shellSize:
                      e.target.value === "AUTRE" ? "SAISIE..." : e.target.value,
                  })
                }
              >
                <option value="">-- Taille --</option>
                {SHELL_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                <option value="AUTRE">AUTRE</option>
              </select>
              {!isStandardShell && current.shellSize !== "" && (
                <input
                  autoFocus
                  className="w-full mt-2 bg-[#1a1812] border-2 border-amber-600/30 p-4 rounded-xl text-sm text-[#f0ede0]"
                  value={
                    current.shellSize === "SAISIE..." ? "" : current.shellSize
                  }
                  onChange={(e) =>
                    setCurrent({
                      ...current,
                      shellSize: e.target.value.toUpperCase(),
                    })
                  }
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
                Peinture
              </label>
              <select
                className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-amber-500 outline-none"
                value={current.paintCondition}
                onChange={(e) =>
                  setCurrent({ ...current, paintCondition: e.target.value })
                }
              >
                <option value="">-- État --</option>
                {PAINT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
                Coiffe
              </label>
              <select
                className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-[#f0ede0] outline-none"
                value={
                  isStandardLiner
                    ? current.linerSize
                    : current.linerSize === ""
                    ? ""
                    : "AUTRE"
                }
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    linerSize:
                      e.target.value === "AUTRE" ? "SAISIE..." : e.target.value,
                  })
                }
              >
                <option value="">-- Taille --</option>
                {LINER_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                <option value="AUTRE">AUTRE</option>
              </select>
              {!isStandardLiner && current.linerSize !== "" && (
                <input
                  autoFocus
                  className="w-full mt-2 bg-[#1a1812] border-2 border-amber-600/30 p-4 rounded-xl text-sm text-[#f0ede0]"
                  value={
                    current.linerSize === "SAISIE..." ? "" : current.linerSize
                  }
                  onChange={(e) =>
                    setCurrent({ ...current, linerSize: e.target.value })
                  }
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
                État Intérieur
              </label>
              <select
                className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-[#f0ede0] outline-none"
                value={current.linerCondition}
                onChange={(e) =>
                  setCurrent({ ...current, linerCondition: e.target.value })
                }
              >
                <option value="">-- État --</option>
                <option value="Neuve">Neuve</option>
                <option value="Légèrement portée">Légèrement portée</option>
                <option value="Usée">Usée</option>
                <option value="Restaurée">Restaurée</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              Jugulaire
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-[#f0ede0] outline-none"
              value={current.chinstrapState}
              onChange={(e) =>
                setCurrent({ ...current, chinstrapState: e.target.value })
              }
            >
              <option value="">-- État Jugulaire --</option>
              <option value="Présente">Présente</option>
              <option value="Manquante">Manquante</option>
              <option value="Détériorée">Détériorée</option>
              <option value="Remplacée">Remplacée (Repro)</option>
            </select>
          </div>
        </div>

        {/* IMAGES & NOTES */}
        <div className="pt-4 space-y-3">
          <UploadRow
            type="main"
            label="Vue Principale"
            current={current}
            onUpload={handleUpload}
            height="h-40"
          />
          <div className="grid grid-cols-4 gap-2">
            {[
              "front",
              "left",
              "right",
              "back",
              "bottom",
              "interior",
              "chinstrap",
            ].map((v) => (
              <UploadRow
                key={v}
                type={v}
                label={v}
                current={current}
                onUpload={handleUpload}
              />
            ))}
          </div>
        </div>

        <textarea
          rows="4"
          placeholder="Notes & Histoire..."
          className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm italic text-[#d0c7a8] resize-none outline-none"
          value={current.description}
          onChange={(e) =>
            setCurrent({ ...current, description: e.target.value })
          }
        />

        <TexturedButton
          label={current.id ? "Mettre à jour" : "Sceller l'Archive"}
          onClick={() => {
            const finalExpertise = getExpertise(current);
            const helmetToSave = {
              ...current,
              expertiseMessage: finalExpertise,
            };
            onSave(helmetToSave);
            setScreen("registry");
          }}
        />
      </div>
    </div>
  );
}

const UploadRow = ({ type, label, current, onUpload, height = "h-20" }) => (
  <label
    className={`relative flex flex-col items-center justify-center bg-[#1a1812] border-2 border-[#3a3832] border-dashed rounded-xl cursor-pointer overflow-hidden ${height}`}
  >
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => onUpload(e, type)}
    />
    {current.images[type] ? (
      <img
        src={current.images[type]}
        className="w-full h-full object-cover opacity-80"
        alt={label}
      />
    ) : (
      <div className="text-center">
        <ImageIcon size={16} className="mx-auto mb-1 opacity-20" />
        <span className="text-[7px] uppercase font-black opacity-40">
          {label}
        </span>
      </div>
    )}
  </label>
);
