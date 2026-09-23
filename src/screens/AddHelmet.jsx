import React, { useState, useEffect } from "react";
import { X, ImageIcon, AlertTriangle, CheckCircle, Upload } from "lucide-react";
import { TexturedButton } from "../components/TexturedButton";
import { translations } from "../data/translations";
import { uploadToCloudinary } from "../utils/cloudinary";

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

const BRANCHES = ["Heer", "Luftwaffe", "Kriegsmarine", "Waffen-SS", "Polizei"];

// Compatibilité fabricant × branche, d'après l'Encyclopédie et Synthèse
// d'Expertise des Casques Allemands (1934-1945), chapitres 2, 4-8 et
// annexes A-D. "never" = aucun contrat d'usine documenté (faux quasi
// certain) ; "rare" = production limitée/tardive, à vérifier avec soin.
const BRANCH_COMPATIBILITY = {
  ET: { Heer: "ok", Luftwaffe: "ok", Kriegsmarine: "ok", "Waffen-SS": "ok", Polizei: "ok" },
  Q: { Heer: "ok", Luftwaffe: "ok", Kriegsmarine: "rare", "Waffen-SS": "ok", Polizei: "ok" },
  SE: { Heer: "ok", Luftwaffe: "ok", Kriegsmarine: "rare", "Waffen-SS": "never", Polizei: "ok" },
  HKP: { Heer: "ok", Luftwaffe: "ok", Kriegsmarine: "rare", "Waffen-SS": "never", Polizei: "ok" },
  NS: { Heer: "ok", Luftwaffe: "ok", Kriegsmarine: "never", "Waffen-SS": "never", Polizei: "ok" },
  EF: { Heer: "ok", Luftwaffe: "ok", Kriegsmarine: "ok", "Waffen-SS": "ok", Polizei: "ok" },
};

const BRANCH_MESSAGES = {
  never: {
    fr: (mkr, br) =>
      `INCOHÉRENCE MAJEURE : ${mkr} n'a jamais reçu de contrat d'usine pour la branche ${br}. Cette combinaison est statistiquement un faux ou un remontage, sauf provenance exceptionnellement documentée.`,
    en: (mkr, br) =>
      `MAJOR INCONSISTENCY: ${mkr} never held a factory contract for ${br}. This combination is statistically a fake or a composite, barring exceptionally documented provenance.`,
  },
  rare: {
    fr: (mkr, br) =>
      `VIGILANCE : la production ${mkr} pour la branche ${br} est rare/tardive et documentée de façon limitée. Vérifiez la cohérence d'ensemble (style d'insigne, modèle de coque, lot).`,
    en: (mkr, br) =>
      `CAUTION: ${mkr} production for ${br} is rare/late and only loosely documented. Check overall consistency (decal style, shell model, lot).`,
  },
};

// Fourchette de datation déduite de la configuration d'insigne, d'après
// la chronologie unifiée des ordres réglementaires (chapitre 4.1 / 2bis.5).
const getDateEstimate = (branch, decals, isFr) => {
  if (!branch || !decals) return null;
  if (branch === "Polizei") {
    return isFr
      ? "Police : le double insigne a été maintenu tout au long de la guerre — aucune date précise déductible de la seule configuration."
      : "Police: the double decal was retained throughout the war — no precise date can be inferred from configuration alone.";
  }
  const cutoff =
    branch === "Waffen-SS"
      ? isFr
        ? "oct.–nov. 1943"
        : "Oct–Nov 1943"
      : isFr
      ? "28 août 1943"
      : "Aug 28, 1943";
  if (decals.includes("Double"))
    return isFr
      ? "Datation estimée : antérieure à mars 1940 (configuration double insigne / Zweiemblem)."
      : "Estimated dating: prior to March 1940 (double-decal / Zweiemblem configuration).";
  if (decals.includes("Mono"))
    return isFr
      ? `Datation estimée : entre mars 1940 et ${cutoff} (insigne simple).`
      : `Estimated dating: between March 1940 and ${cutoff} (single decal).`;
  if (decals === "Aucun")
    return isFr
      ? `Datation estimée : postérieure au ${cutoff} (coque neutre, sans décalcomanie).`
      : `Estimated dating: after ${cutoff} (neutral shell, no decal).`;
  return null;
};

export const getExpertise = (helmet, lang) => {
  const lot = parseInt(helmet.lotNumber);
  const mkr = helmet.manufacturer?.toUpperCase();
  const mdl = helmet.model;
  const dec = helmet.decals;
  const branch = helmet.branch;
  const isFr = lang === "fr";

  if (!mdl) return isFr ? "Sélectionnez un modèle..." : "Select a model...";

  const messages = [];

  if (
    mdl.includes("16") ||
    mdl.includes("17") ||
    mdl.includes("18") ||
    mdl.includes("Autrichien")
  ) {
    messages.push(
      isFr
        ? "TRANSITION : Vérifiez les insignes Pocher. Souvent reconditionnés avec peinture mate à l'oxyde d'aluminium."
        : "TRANSITION: Check for Pocher decals. Often refurbished with matte aluminum oxide paint."
    );
  } else if (!lot || !mkr) {
    messages.push(
      isFr
        ? "Données manquantes (Usine + Lot)..."
        : "Missing data (Factory + Lot)..."
    );
  } else if (mdl.includes("M35")) {
    messages.push(
      lot > 5500
        ? isFr
          ? `ALERTE : Lot #${lot} élevé. Transition M40 probable.`
          : `ALERT: Lot #${lot} high. M40 transition likely.`
        : isFr
        ? "M35 : Standard double insignes."
        : "M35: Standard double decals."
    );
  } else if (mdl.includes("M40") && dec.includes("Double")) {
    messages.push(
      isFr
        ? "ANOMALIE : Décret Mars 1940 (M40 mono-insigne)."
        : "ANOMALY: March 1940 Decree (M40 single decal)."
    );
  } else if (mdl.includes("M42") && dec.includes("Double")) {
    messages.push(
      isFr
        ? "ALERTE : M42 double insignes aberrant (Risque de faux)."
        : "ALERT: M42 double decal is incorrect (Risk of fake)."
    );
  } else {
    messages.push(
      isFr
        ? "Configuration conforme aux standards."
        : "Configuration consistent with standards."
    );
  }

  // Cohérence fabricant × branche (chapitres 2, 4-8, annexes A-D)
  const status = mkr && branch && BRANCH_COMPATIBILITY[mkr]?.[branch];
  if (status && status !== "ok") {
    const mkrName = MANUFACTURERS[mkr] || mkr;
    messages.push(BRANCH_MESSAGES[status][isFr ? "fr" : "en"](mkrName, branch));
  }

  // Datation estimée d'après la configuration d'insigne (chapitre 4.1 / 2bis.5)
  const dateMsg = getDateEstimate(branch, dec, isFr);
  if (dateMsg) messages.push(dateMsg);

  return messages.join(" — ");
};

export default function AddHelmet({ setScreen, onSave, helmet, lang }) {
  const t = translations[lang].add;
  const isFr = lang === "fr";

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
  // Correspondance taille de coque / tour de tête (chapitre 1.5 de l'Encyclopédie)
  const HEAD_CIRCUMFERENCE = {
    60: "53 cm",
    62: "55 cm",
    64: "57 cm",
    66: "59 cm",
    68: "61 cm",
    70: "63 cm",
  };
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

  // Types de jugulaire par période, d'après le chapitre 9 (Analyse forensique
  // des jugulaires) de l'Encyclopédie — cuir, boucle et fixations associés.
  const CHINSTRAP_OPTIONS = isFr
    ? [
        "1935–1940 : cuir de vachette, boucle aluminium",
        "1940–1943 : cuir de vachette, boucle acier zingué peinte Feldgrau",
        "1943–1945 : cuir de porc, boucle acier brossé/phosphaté",
        "Pressstoff / toile (fin de guerre)",
        "Inconnu / non documenté",
      ]
    : [
        "1935–1940: cowhide leather, aluminum buckle",
        "1940–1943: cowhide leather, Feldgrau-painted zinc-plated steel buckle",
        "1943–1945: pigskin leather, brushed/phosphated steel buckle",
        "Pressstoff / webbing (late war)",
        "Unknown / undocumented",
      ];

  const [current, setCurrent] = useState(
    helmet || {
      id: null,
      model: "",
      manufacturer: "",
      branch: "",
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
  const [uploading, setUploading] = useState({});
  const [saving, setSaving] = useState(false);
  const [validation, setValidation] = useState({
    message: "",
    color: "text-gray-500",
    icon: null,
  });

  useEffect(() => {
    const msg = getExpertise(current, lang);
    const isWarning = /ALERTE|ANOMALIE|ALERT|ANOMALY|INCOHÉRENCE|INCONSISTENCY|VIGILANCE|CAUTION/.test(
      msg
    );
    const color = isWarning ? "text-orange-500" : "text-blue-400";
    setValidation({
      message: msg,
      color,
      icon: isWarning ? (
        <AlertTriangle size={14} />
      ) : (
        <CheckCircle size={14} />
      ),
    });
  }, [
    current.model,
    current.manufacturer,
    current.branch,
    current.lotNumber,
    current.decals,
    lang,
  ]);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const url = await uploadToCloudinary(file);
      setCurrent((prev) => ({
        ...prev,
        images: { ...prev.images, [type]: url },
      }));
    } catch (error) {
      alert(isFr ? "Erreur upload image" : "Image upload error");
      console.error(error);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Sauvegarde — délègue à useCollection via onSave (évite le double upsert)
  const handleSave = async () => {
    setSaving(true);
    try {
      if (onSave)
        await onSave({
          ...current,
          expertiseMessage: getExpertise(current, lang),
        });
      setScreen("registry");
    } catch (error) {
      alert((isFr ? "Erreur sauvegarde : " : "Save error: ") + error.message);
      console.error(error);
    } finally {
      setSaving(false);
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

        <div className="space-y-2">
          <label className="text-[9px] uppercase font-black text-gray-500">
            {isFr ? "Branche / Arme" : "Branch / Service"}
          </label>
          <select
            className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-[#f0ede0] outline-none"
            value={current.branch || ""}
            onChange={(e) => setCurrent({ ...current, branch: e.target.value })}
          >
            <option value="">--</option>
            {BRANCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
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
            {HEAD_CIRCUMFERENCE[current.shellSize] && (
              <p className="text-[8px] text-amber-600/70 italic">
                ≈ {HEAD_CIRCUMFERENCE[current.shellSize]}{" "}
                {isFr ? "de tour de tête" : "head circumference"}
              </p>
            )}
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

        <div className="space-y-2">
          <label className="text-[9px] uppercase font-black text-gray-500">
            {t.labelStrap}
          </label>
          <select
            className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs text-[#f0ede0] outline-none"
            value={current.chinstrapState}
            onChange={(e) =>
              setCurrent({ ...current, chinstrapState: e.target.value })
            }
          >
            <option value="">--</option>
            {CHINSTRAP_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 space-y-3">
          <UploadRow
            type="main"
            label={isFr ? "Principale" : "Main"}
            current={current}
            onUpload={handleUpload}
            uploading={uploading}
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
                uploading={uploading}
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
          label={
            saving
              ? isFr
                ? "Sauvegarde..."
                : "Saving..."
              : current.id
              ? isFr
                ? "Mettre à jour"
                : "Update"
              : t.btnSave
          }
          onClick={handleSave}
          disabled={saving}
        />
      </div>
    </div>
  );
}

const UploadRow = ({
  type,
  label,
  current,
  onUpload,
  uploading,
  height = "h-16",
}) => (
  <label
    className={`relative flex flex-col items-center justify-center bg-[#1a1812] border-2 border-[#3a3832] border-dashed rounded-xl cursor-pointer overflow-hidden ${height}`}
  >
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => onUpload(e, type)}
    />
    {uploading[type] ? (
      <div className="flex flex-col items-center gap-1 opacity-60">
        <Upload size={14} className="animate-bounce" />
        <span className="text-[6px] uppercase font-black">Upload...</span>
      </div>
    ) : current.images[type] ? (
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
