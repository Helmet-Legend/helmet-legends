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
import { translations } from "../data/translations";

const MANUFACTURERS = {
  ET: "Eisenhüttenwerke, Thale",
  Q: "F.W. Quist, Esslingen",
  SE: "Sächsische Emaillier-und Stanzwerke",
  NS: "Vereinigte Deutsche Nickelwerke",
  EF: "Emaillierwerke AG, Fulda",
  CKL: "Eisenhüttenwerke Thale (Late)",
  HKP: "SE (Late)",
};

// --- LOGIQUE D'EXPERTISE CENTRALISÉE BILINGUE ---
export const getExpertise = (helmet, lang) => {
  const lot = parseInt(helmet.lotNumber);
  const mkr = helmet.manufacturer?.toUpperCase();
  const mdl = helmet.model;
  const dec = helmet.decals;
  const isFr = lang === "fr";

  if (!lot || !mkr || !mdl)
    return isFr
      ? "Analyse en attente de données complètes (Usine + Lot)..."
      : "Analysis pending complete data (Factory + Lot)...";

  if (mdl.includes("M35")) {
    if (lot > 5500)
      return isFr
        ? `ALERTE : Lot #${lot} très élevé pour un M35. Transition M40 probable. Vérifiez les évents.`
        : `ALERT: Lot #${lot} is very high for an M35. M40 transition likely. Check the vents.`;
    return isFr
      ? "M35 : Standard double insignes. Vérifiez si reconditionnement tardif."
      : "M35: Standard double decals. Check for late-war refurbishment.";
  }

  if (mdl.includes("M40") && dec.includes("Double")) {
    return isFr
      ? "ANOMALIE : Décret Mars 1940 : fin du bouclier tricolore. M40 mono-insigne standard."
      : "ANOMALY: March 1940 Decree: end of tricolor shield. M40 is standard single decal.";
  }

  if (mdl.includes("M42")) {
    if (dec.includes("Double"))
      return isFr
        ? "ALERTE : Un M42 double insignes est historiquement aberrant. Risque de faux à 99%."
        : "ALERT: A double decal M42 is historically incorrect. 99% risk of being fake.";
  }

  return isFr
    ? "Configuration conforme aux standards de production majeurs."
    : "Configuration consistent with major production standards.";
};

export default function AddHelmet({ setScreen, onSave, helmet, lang }) {
  const t = translations[lang].add;
  const isFr = lang === "fr";

  // --- OPTIONS DES MENUS ---
  const HELMET_MODELS = isFr
    ? [
        "M35",
        "M40",
        "M42",
        "M38 (Parachutiste)",
        "Luftschutz (Gladiator)",
        "M34 Feuerwehr (Police)",
        "Autre",
      ]
    : [
        "M35",
        "M40",
        "M42",
        "M38 (Paratrooper)",
        "Luftschutz (Gladiator)",
        "M34 Feuerwehr (Police)",
        "Other",
      ];

  // Graduation de 100% à 10% + REPEINT/ROUILLÉ
  const PAINT_OPTIONS = isFr
    ? [
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
      ]
    : [
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
        "REPAINTED",
        "RUSTY",
      ];

  const DECAL_OPTIONS = isFr
    ? ["Aucun", "Mono-insigne", "Double insignes"]
    : ["None", "Single Decal", "Double Decals"];

  const LINER_STATES = isFr
    ? ["Neuve", "Légèrement portée", "Usée", "Restaurée", "Absente"]
    : ["New", "Lightly worn", "Worn", "Restored", "Missing"];

  const CHINSTRAP_STATES = isFr
    ? ["Présente (Originale)", "Manquante", "Détériorée", "Remplacée (Repro)"]
    : ["Present (Original)", "Missing", "Deteriorated", "Replaced (Repro)"];

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

  const [current, setCurrent] = useState(
    helmet || {
      id: null,
      model: "",
      manufacturer: "",
      lotNumber: "",
      description: "",
      shellSize: "",
      linerSize: "",
      paintCondition: "",
      linerCondition: "",
      chinstrapState: "",
      decals: "",
      images: {
        main: null,
        front: null,
        left: null,
        right: null,
        interior: null,
      },
    }
  );

  const [validation, setValidation] = useState({
    message: "",
    color: "text-gray-500",
    icon: null,
  });

  useEffect(() => {
    const msg = getExpertise(current, lang);
    let color = "text-blue-400";
    let icon = <CheckCircle size={14} />;
    if (
      msg.includes("ALERTE") ||
      msg.includes("ALERT") ||
      msg.includes("ANOMALIE")
    ) {
      color = "text-orange-500";
      icon = <AlertTriangle size={14} />;
    }
    setValidation({ message: msg, color, icon });
  }, [
    current.model,
    current.manufacturer,
    current.lotNumber,
    current.decals,
    lang,
  ]);

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
          {current.id
            ? isFr
              ? "Modification"
              : "Edit"
            : isFr
            ? "Archivage"
            : "Archive"}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {t.labelModel}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-black text-[#f0ede0] outline-none"
              value={current.model}
              onChange={(e) =>
                setCurrent({ ...current, model: e.target.value })
              }
            >
              <option value="">--</option>
              {HELMET_MODELS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {t.labelDecal}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-[#f0ede0] outline-none"
              value={current.decals}
              onChange={(e) =>
                setCurrent({ ...current, decals: e.target.value })
              }
            >
              <option value="">--</option>
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
            <label className="text-[9px] uppercase font-black text-gray-500">
              {t.labelFactory}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-amber-500 outline-none"
              value={current.manufacturer}
              onChange={(e) =>
                setCurrent({ ...current, manufacturer: e.target.value })
              }
            >
              <option value="">--</option>
              {Object.keys(MANUFACTURERS).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {t.labelLot}
            </label>
            <input
              placeholder="ex: 1234"
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs text-amber-500 font-bold h-[52px] outline-none"
              value={current.lotNumber}
              onChange={(e) =>
                setCurrent({ ...current, lotNumber: e.target.value })
              }
            />
          </div>
        </div>

        {/* RAPPORT EXPERTISE */}
        <div
          className={`p-4 rounded-2xl bg-[#1a1812] border-2 ${validation.color.replace(
            "text",
            "border"
          )} bg-opacity-10 shadow-inner`}
        >
          <div
            className={`flex items-center gap-2 ${validation.color} font-black text-[10px] uppercase tracking-widest`}
          >
            {validation.icon} {isFr ? "Expertise" : "Expertise"}
          </div>
          <p className="text-[10px] text-[#f0ede0] leading-relaxed italic opacity-90">
            "{validation.message}"
          </p>
        </div>

        {/* TAILLES ET PEINTURE */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {t.labelSize}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs text-white outline-none"
              value={current.shellSize}
              onChange={(e) =>
                setCurrent({ ...current, shellSize: e.target.value })
              }
            >
              <option value="">--</option>
              {SHELL_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {isFr ? "Taille Coiffe" : "Liner Size"}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs text-white outline-none"
              value={current.linerSize}
              onChange={(e) =>
                setCurrent({ ...current, linerSize: e.target.value })
              }
            >
              <option value="">--</option>
              {LINER_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {t.labelPaint}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-amber-500 outline-none"
              value={current.paintCondition}
              onChange={(e) =>
                setCurrent({ ...current, paintCondition: e.target.value })
              }
            >
              <option value="">--</option>
              {PAINT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ÉTAT INTÉRIEUR & JUGULAIRE */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {isFr ? "État de l'intérieur" : "Interior State"}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-[#f0ede0] outline-none"
              value={current.linerCondition}
              onChange={(e) =>
                setCurrent({ ...current, linerCondition: e.target.value })
              }
            >
              <option value="">--</option>
              {LINER_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">
              {isFr ? "État de la Jugulaire" : "Chinstrap State"}
            </label>
            <select
              className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-[#f0ede0] outline-none"
              value={current.chinstrapState}
              onChange={(e) =>
                setCurrent({ ...current, chinstrapState: e.target.value })
              }
            >
              <option value="">--</option>
              {CHINSTRAP_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* IMAGES & NOTES */}
        <div className="pt-4 space-y-3">
          <UploadRow
            type="main"
            label={isFr ? "Principale" : "Main"}
            current={current}
            onUpload={handleUpload}
            height="h-32"
          />
          <div className="grid grid-cols-4 gap-2">
            {["front", "left", "right", "interior"].map((v) => (
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
          placeholder={t.labelNote}
          className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs italic text-[#d0c7a8] outline-none"
          value={current.description}
          onChange={(e) =>
            setCurrent({ ...current, description: e.target.value })
          }
        />

        <TexturedButton
          label={current.id ? (isFr ? "Mettre à jour" : "Update") : t.btnSave}
          onClick={() => {
            const finalExp = getExpertise(current, lang);
            onSave({ ...current, expertiseMessage: finalExp });
            setScreen("registry");
          }}
        />
      </div>
    </div>
  );
}

const UploadRow = ({ type, label, current, onUpload, height = "h-16" }) => (
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
        className="w-full h-full object-cover"
        alt={label}
      />
    ) : (
      <div className="text-center opacity-20">
        <ImageIcon size={14} className="mx-auto" />
        <span className="text-[6px] uppercase font-black">{label}</span>
      </div>
    )}
  </label>
);
