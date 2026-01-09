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

  // --- LOGIQUE D'EXPERTISE AUTOMATIQUE ---
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

        {/* IDENTIFICATION */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500 ml-1">
              Usine
            </label>
            <input
              placeholder="ex: ET"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-amber-500 outline-none"
              value={current.manufacturer}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  manufacturer: e.target.value.toUpperCase(),
                })
              }
            />
            {MANUFACTURERS[current.manufacturer] && (
              <p className="text-[9px] text-amber-500 font-bold ml-1">
                {MANUFACTURERS[current.manufacturer]}
              </p>
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

        {/* SPÉCIFICATIONS TECHNIQUES COMPLÈTES */}
        <div className="space-y-4 border-t border-[#3a3832] pt-4">
          <h3 className="text-[10px] uppercase font-black text-[#8a7f5d]">
            Spécifications Techniques
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="TAILLE COQUE"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-[#f0ede0] outline-none"
              value={current.shellSize}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  shellSize: e.target.value.toUpperCase(),
                })
              }
            />
            <input
              placeholder="TAILLE COIFFE"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-[#f0ede0] outline-none"
              value={current.linerSize}
              onChange={(e) =>
                setCurrent({ ...current, linerSize: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="POIDS (g)"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm font-bold text-[#f0ede0] outline-none"
              value={current.weight}
              onChange={(e) =>
                setCurrent({ ...current, weight: e.target.value })
              }
            />
            <input
              placeholder="MATÉRIAU"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-sm uppercase font-bold text-[#f0ede0] outline-none"
              value={current.material}
              onChange={(e) =>
                setCurrent({ ...current, material: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 bg-[#1a1812] p-4 rounded-xl border-2 border-[#3a3832]">
            <label className="text-[9px] uppercase font-black text-gray-500">
              État Peinture : {current.paintCondition}%
            </label>
            <input
              type="range"
              className="w-full accent-amber-600"
              value={current.paintCondition}
              onChange={(e) =>
                setCurrent({ ...current, paintCondition: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-3 rounded-xl text-xs font-bold text-[#f0ede0] outline-none"
              value={current.linerCondition}
              onChange={(e) =>
                setCurrent({ ...current, linerCondition: e.target.value })
              }
            >
              <option value="">ÉTAT COIFFE</option>
              <option value="Neuve">Neuve</option>
              <option value="Légèrement portée">Légèrement portée</option>
              <option value="Usée">Usée</option>
              <option value="Restaurée">Restaurée</option>
            </select>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-3 rounded-xl text-xs font-bold text-[#f0ede0] outline-none"
              value={current.chinstrapState}
              onChange={(e) =>
                setCurrent({ ...current, chinstrapState: e.target.value })
              }
            >
              <option value="">JUGULAIRE</option>
              <option value="Présente">Présente</option>
              <option value="Manquante">Manquante</option>
              <option value="Restituée">Restituée</option>
            </select>
          </div>
        </div>

        {/* SECTION IMAGES */}
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
