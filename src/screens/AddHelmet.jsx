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

// Listes standards pour les tailles
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
      paintCondition: 50,
      linerCondition: "",
      chinstrapState: "",
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

  // Logique pour déterminer si les valeurs sont standards ou manuelles
  const isStandardMkr = Object.keys(MANUFACTURERS).includes(
    current.manufacturer
  );
  const isStandardShell = SHELL_SIZES.includes(current.shellSize);
  const isStandardLiner = LINER_SIZES.includes(current.linerSize);

  useEffect(() => {
    const lot = parseInt(current.lotNumber);
    const mkr = current.manufacturer?.toUpperCase();
    const mdl = current.model;
    if (!lot || !mkr || !mdl) {
      setValidation({
        message: "Saisissez l'usine et le lot pour analyse",
        color: "text-gray-500",
        icon: <Info size={12} />,
      });
      return;
    }
    if (mdl === "M35") {
      if (lot > 5500)
        setValidation({
          message:
            "Lot élevé pour un M35. Vérifiez s'il ne s'agit pas d'un M40.",
          color: "text-orange-500",
          icon: <AlertTriangle size={12} />,
        });
      else
        setValidation({
          message: "Plage de lot cohérente pour un M35.",
          color: "text-green-500",
          icon: <CheckCircle size={12} />,
        });
    } else if (mdl === "M42") {
      if (mkr === "ET")
        setValidation({
          message: "Anomalie : Thale utilisait le code 'CKL' pour les M42.",
          color: "text-red-500",
          icon: <AlertTriangle size={12} />,
        });
      else
        setValidation({
          message: "Configuration classique pour un modèle 1942.",
          color: "text-green-500",
          icon: <CheckCircle size={12} />,
        });
    } else {
      setValidation({
        message: "Données prêtes. Pas d'incohérence majeure détectée.",
        color: "text-blue-400",
        icon: <CheckCircle size={12} />,
      });
    }
  }, [current.model, current.manufacturer, current.lotNumber]);

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
        {/* MODÈLE */}
        <div className="space-y-2">
          <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
            Modèle de Casque
          </label>
          <select
            className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-black text-[#f0ede0] outline-none focus:border-amber-600"
            value={current.model}
            onChange={(e) => setCurrent({ ...current, model: e.target.value })}
          >
            <option value="">-- Sélectionner le Modèle --</option>
            {HELMET_MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* USINE & LOT */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              Usine
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-amber-500 outline-none focus:border-amber-600"
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
              {Object.entries(MANUFACTURERS).map(([code, name]) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
              <option value="AUTRE">AUTRE</option>
            </select>
            {!isStandardMkr && current.manufacturer !== "" && (
              <input
                autoFocus
                placeholder="Code usine..."
                className="w-full mt-2 bg-[#1a1812] border-2 border-amber-600/30 p-4 rounded-xl text-sm uppercase font-bold text-amber-500"
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
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-amber-500 outline-none h-[56px]"
              value={current.lotNumber}
              onChange={(e) =>
                setCurrent({ ...current, lotNumber: e.target.value })
              }
            />
          </div>
        </div>

        {/* BANDEAU D'EXPERTISE */}
        <div
          className={`p-3 rounded-lg bg-[#1a1812] border border-[#3a3832] flex items-center gap-2 ${validation.color} transition-all`}
        >
          {validation.icon}
          <span className="text-[10px] font-bold uppercase tracking-tight">
            {validation.message}
          </span>
        </div>

        {/* TAILLES COQUE & INTERIEURE */}
        <div className="space-y-4 border-t border-[#3a3832] pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
                Taille Coque
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
                <option value="">-- Coque --</option>
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
                  placeholder="Taille..."
                  className="w-full mt-2 bg-[#1a1812] border-2 border-amber-600/30 p-4 rounded-xl text-sm font-bold text-[#f0ede0]"
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
                Taille Coiffe
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
                <option value="">-- Coiffe --</option>
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
                  placeholder="Taille..."
                  className="w-full mt-2 bg-[#1a1812] border-2 border-amber-600/30 p-4 rounded-xl text-sm font-bold text-[#f0ede0]"
                  value={
                    current.linerSize === "SAISIE..." ? "" : current.linerSize
                  }
                  onChange={(e) =>
                    setCurrent({ ...current, linerSize: e.target.value })
                  }
                />
              )}
            </div>
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
          className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm italic outline-none text-[#d0c7a8] resize-none"
          value={current.description}
          onChange={(e) =>
            setCurrent({ ...current, description: e.target.value })
          }
        />

        <TexturedButton
          label={current.id ? "Mettre à jour" : "Sceller l'Archive"}
          onClick={() => {
            onSave(current);
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
