import React, { useState, useEffect } from "react";
import { X, ImageIcon, AlertTriangle, CheckCircle } from "lucide-react";
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
  Si: "Gebrüder Gnüchtel, Lauter (Si)",
  BF: "F.C. Bellinger, Fulda (BF)",
  G: "Gebrüder Bing, Nuremberg (G)",
  TJ: "C. Thiel & Söhne, Lübeck (TJ)",
  W: "Hermann Weitemeyer (W)",
  AW: "A. Wegner, Berlin (AW)",
};

export const getExpertise = (helmet, lang) => {
  const lot = parseInt(helmet.lotNumber);
  const mkr = helmet.manufacturer?.toUpperCase();
  const mdl = helmet.model;
  const dec = helmet.decals;
  const isFr = lang === "fr";

  if (!mdl) return isFr ? "Sélectionnez un modèle..." : "Select a model...";

  // Logique Transition [cite: 8, 10, 80]
  if (
    mdl.includes("16") ||
    mdl.includes("17") ||
    mdl.includes("18") ||
    mdl.includes("Autrichien")
  ) {
    return isFr
      ? "TRANSITION : Vérifiez les insignes Pocher[cite: 80]. Souvent reconditionnés avec peinture mate à l'oxyde d'aluminium[cite: 101]."
      : "TRANSITION: Check for Pocher decals[cite: 80]. Often refurbished with matte aluminum oxide paint[cite: 101].";
  }

  if (!lot || !mkr)
    return isFr
      ? "Données manquantes (Usine + Lot)..."
      : "Missing data (Factory + Lot)...";

  // Logique M35 [cite: 10, 21, 66]
  if (mdl.includes("M35")) {
    if (lot > 5500)
      return isFr
        ? `ALERTE : Lot #${lot} élevé. Transition M40 probable[cite: 101].`
        : `ALERT: Lot #${lot} high. M40 transition likely[cite: 101].`;
    return isFr
      ? "M35 : Standard double insignes [cite: 41]."
      : "M35: Standard double decals[cite: 41].";
  }

  // Logique M40 & M42 [cite: 46, 51, 94]
  if (mdl.includes("M40") && dec.includes("Double"))
    return isFr
      ? "ANOMALIE : Décret Mars 1940 (M40 mono-insigne) [cite: 45, 46]."
      : "ANOMALY: March 1940 Decree (M40 single decal)[cite: 45, 46].";
  if (mdl.includes("M42") && dec.includes("Double"))
    return isFr
      ? "ALERTE : M42 double insignes aberrant (Risque de faux) [cite: 51, 158]."
      : "ALERT: M42 double decal is incorrect (Risk of fake)[cite: 51, 158].";

  return isFr
    ? "Configuration conforme aux standards."
    : "Configuration consistent with standards.";
};

export default function AddHelmet({ setScreen, onSave, helmet, lang }) {
  const t = translations[lang].add;
  const isFr = lang === "fr";

  // --- STRUCTURE DU SOUS-MENU (GROUPES) ---
  const MODEL_GROUPS = isFr
    ? [
        {
          label: "Modèles de Transition (WWI)",
          options: [
            "M16 (Transition)",
            "M17 (Transition)",
            "M18 (Transition)",
            "M18 Échancré (Ear)",
            "Autrichien (Transition)",
          ],
        },
        { label: "Modèles de Combat (WWII)", options: ["M35", "M40", "M42"] },
        {
          label: "Modèles Spécialisés",
          options: [
            "M38 (Parachutiste)",
            "Luftschutz (Gladiator)",
            "M34 Feuerwehr (Police)",
            "Autre",
          ],
        },
      ]
    : [
        {
          label: "Transition Models (WWI)",
          options: [
            "M16 (Transition)",
            "M17 (Transition)",
            "M18 (Transition)",
            "M18 Cut-out (Ear)",
            "Austrian (Transition)",
          ],
        },
        { label: "Combat Models (WWII)", options: ["M35", "M40", "M42"] },
        {
          label: "Specialized Models",
          options: [
            "M38 (Paratrooper)",
            "Luftschutz (Gladiator)",
            "M34 Feuerwehr (Police)",
            "Other",
          ],
        },
      ];

  const SHELL_SIZES = ["60", "62", "64", "66", "68", "70", "72", "74"];
  const LINER_SIZES = [
    "50",
    "51",
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
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
  ];
  const PAINT_OPTIONS = isFr
    ? ["100% (Stock)", "90%", "80%", "70%", "60%", "50%", "REPEINT", "ROUILLÉ"]
    : ["100% (Stock)", "90%", "80%", "70%", "60%", "50%", "REPAINTED", "RUSTY"];
  const DECAL_OPTIONS = isFr
    ? ["Aucun", "Mono-insigne", "Double insignes"]
    : ["None", "Single Decal", "Double Decals"];

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
    let color =
      msg.includes("ALERTE") ||
      msg.includes("ANOMALIE") ||
      msg.includes("ALERT")
        ? "text-orange-500"
        : "text-blue-400";
    setValidation({
      message: msg,
      color,
      icon:
        color === "text-orange-500" ? (
          <AlertTriangle size={14} />
        ) : (
          <CheckCircle size={14} />
        ),
    });
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
              <option value="">-- {isFr ? "Sélectionner" : "Select"} --</option>
              {MODEL_GROUPS.map((group) => (
                <optgroup
                  key={group.label}
                  label={group.label}
                  className="bg-[#2a2822] text-amber-500"
                >
                  {group.options.map((opt) => (
                    <option key={opt} value={opt} className="text-[#f0ede0]">
                      {opt}
                    </option>
                  ))}
                </optgroup>
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
              {Object.entries(MANUFACTURERS).map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
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

        <div
          className={`p-4 rounded-2xl bg-[#1a1812] border-2 ${validation.color.replace(
            "text",
            "border"
          )} bg-opacity-10 shadow-inner`}
        >
          <div
            className={`flex items-center gap-2 ${validation.color} font-black text-[10px] uppercase tracking-widest`}
          >
            {validation.icon} Expertise
          </div>
          <p className="text-xs text-[#f0ede0] leading-relaxed italic opacity-90">
            "{validation.message}"
          </p>
        </div>

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
              {isFr ? "Coiffe" : "Liner"}
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
            onSave({
              ...current,
              expertiseMessage: getExpertise(current, lang),
            });
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
