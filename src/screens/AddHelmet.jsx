import React, { useState, useEffect } from "react";
import { X, ImageIcon, AlertTriangle, CheckCircle, Upload } from "lucide-react";
import { X, ImageIcon, AlertTriangle, CheckCircle, Upload } from "lucide-react";
import { TexturedButton } from "../components/TexturedButton";
import { translations } from "../data/translations";
import { supabase } from "../supabaseClient";

const CLOUD_NAME = "dmdoihdah";
const UPLOAD_PRESET = "helmet_legends_unsigned";
import { supabase } from "../supabaseClient";

const CLOUD_NAME = "dmdoihdah";
const UPLOAD_PRESET = "helmet_legends_unsigned";

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

  if (
    mdl.includes("16") ||
    mdl.includes("17") ||
    mdl.includes("18") ||
    mdl.includes("Autrichien")
  ) {
  if (mdl.includes("16") || mdl.includes("17") || mdl.includes("18") || mdl.includes("Autrichien")) {
    return isFr
      ? "TRANSITION : Vérifiez les insignes Pocher. Souvent reconditionnés avec peinture mate à l'oxyde d'aluminium."
      : "TRANSITION: Check for Pocher decals. Often refurbished with matte aluminum oxide paint.";
      ? "TRANSITION : Vérifiez les insignes Pocher. Souvent reconditionnés avec peinture mate à l'oxyde d'aluminium."
      : "TRANSITION: Check for Pocher decals. Often refurbished with matte aluminum oxide paint.";
  }

  if (!lot || !mkr) return isFr ? "Données manquantes (Usine + Lot)..." : "Missing data (Factory + Lot)...";

  if (mdl.includes("M35")) {
    if (lot > 5500)
      return isFr
        ? `ALERTE : Lot #${lot} élevé. Transition M40 probable.`
        : `ALERT: Lot #${lot} high. M40 transition likely.`;
    return isFr
      ? "M35 : Standard double insignes."
      : "M35: Standard double decals.";
    if (lot > 5500) return isFr ? `ALERTE : Lot #${lot} élevé. Transition M40 probable.` : `ALERT: Lot #${lot} high. M40 transition likely.`;
    return isFr ? "M35 : Standard double insignes." : "M35: Standard double decals.";
  }

  if (mdl.includes("M40") && dec.includes("Double"))
    return isFr ? "ANOMALIE : Décret Mars 1940 (M40 mono-insigne)." : "ANOMALY: March 1940 Decree (M40 single decal).";
    return isFr
      ? "ANOMALIE : Décret Mars 1940 (M40 mono-insigne)."
      : "ANOMALY: March 1940 Decree (M40 single decal).";
  if (mdl.includes("M42") && dec.includes("Double"))
    return isFr
      ? "ALERTE : M42 double insignes aberrant (Risque de faux)."
      : "ALERT: M42 double decal is incorrect (Risk of fake).";
    return isFr ? "ALERTE : M42 double insignes aberrant (Risque de faux)." : "ALERT: M42 double decal is incorrect (Risk of fake).";

  return isFr ? "Configuration conforme aux standards." : "Configuration consistent with standards.";
};

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
  const data = await res.json();
  if (!data.secure_url) throw new Error("Upload échoué");
  return data.secure_url;
};

// Upload vers Cloudinary via fetch (sans widget externe)
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (!data.secure_url) throw new Error("Upload échoué");
  return data.secure_url;
};

export default function AddHelmet({ setScreen, onSave, helmet, lang }) {
  const t = translations[lang].add;
  const isFr = lang === "fr";

  // ✅ LE TRADUCTEUR : Initialisation du State avec transformation des données Supabase
  const [current, setCurrent] = useState(() => {
    if (helmet) {
      return {
        ...helmet,
        lotNumber: helmet.lot_number || "", // Traduit lot_number (DB) vers lotNumber (React)
        images: {
          main: helmet.image_url_main || null, // Traduit les colonnes plates vers l'objet images
          front: helmet.image_url_front || null,
          left: helmet.image_url_left || null,
          right: helmet.image_url_right || null,
          interior: helmet.image_url_interior || null,
        },
      };
    }
    return {
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
      decals: "",
      images: { main: null, front: null, left: null, right: null, interior: null },
    };
  });

  const [uploading, setUploading] = useState({});
  const [saving, setSaving] = useState(false);
  const [validation, setValidation] = useState({ message: "", color: "text-gray-500", icon: null });

  const MODEL_GROUPS = isFr
    ? [
        { label: "Modèles de Transition (WWI)", options: ["M16 (Transition)", "M17 (Transition)", "M18 (Transition)", "M18 Échancré (Ear)", "Autrichien (Transition)"] },
        { label: "Modèles de Combat (WWII)", options: ["M35", "M40", "M42"] },
        { label: "Modèles Spécialisés", options: ["M38 (Parachutiste)", "Luftschutz (Gladiator)", "M34 Feuerwehr (Police)", "Autre"] },
      ]
    : [
        { label: "Transition Models (WWI)", options: ["M16 (Transition)", "M17 (Transition)", "M18 (Transition)", "M18 Cut-out (Ear)", "Austrian (Transition)"] },
        { label: "Combat Models (WWII)", options: ["M35", "M40", "M42"] },
        { label: "Specialized Models", options: ["M38 (Paratrooper)", "Luftschutz (Gladiator)", "M34 Feuerwehr (Police)", "Other"] },
      ];

  const SHELL_SIZES = ["60", "62", "64", "66", "68", "70", "72", "74"];
  const LINER_SIZES = ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67"];
  const PAINT_OPTIONS = isFr ? ["100% (Stock)", "90%", "80%", "70%", "60%", "50%", "REPEINT", "ROUILLÉ"] : ["100% (Stock)", "90%", "80%", "70%", "60%", "50%", "REPAINTED", "RUSTY"];
  const DECAL_OPTIONS = isFr ? ["Aucun", "Mono-insigne", "Double insignes"] : ["None", "Single Decal", "Double Decals"];
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
    const color =
      msg.includes("ALERTE") ||
      msg.includes("ANOMALIE") ||
      msg.includes("ALERT")
        ? "text-orange-500"
        : "text-blue-400";
    const color = msg.includes("ALERTE") || msg.includes("ANOMALIE") || msg.includes("ALERT") ? "text-orange-500" : "text-blue-400";
    setValidation({
      message: msg,
      color,
      icon: color === "text-orange-500" ? <AlertTriangle size={14} /> : <CheckCircle size={14} />,
    });
  }, [current.model, current.manufacturer, current.lotNumber, current.decals, lang]);

  // Upload image vers Cloudinary
  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, [type]: true }));
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const url = await uploadToCloudinary(file);
      const url = await uploadToCloudinary(file);
      setCurrent((prev) => ({
        ...prev,
        images: { ...prev.images, [type]: url },
        images: { ...prev.images, [type]: url },
      }));
    } catch (error) {
      alert(isFr ? "Erreur upload image" : "Image upload error");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // ✅ SAUVEGARDE : Mapping des données du State vers le format plat de Supabase
  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const helmetData = {
        user_id: user.id,
        model: current.model,
        manufacturer: current.manufacturer,
        lot_number: current.lotNumber, // Retourne au format SQL snake_case
        description: current.description,
        shell_size: current.shellSize,
        liner_size: current.linerSize,
        paint_condition: current.paintCondition,
        liner_condition: current.linerCondition,
        chinstrap_state: current.chinstrapState,
        decals: current.decals,
        expertise_message: getExpertise(current, lang),
        // On "aplatit" l'objet images pour correspondre aux colonnes SQL
        image_url_main: current.images.main,
        image_url_front: current.images.front,
        image_url_left: current.images.left,
        image_url_right: current.images.right,
        image_url_interior: current.images.interior,
      };

      if (current.id) helmetData.id = current.id;

      const { error } = await supabase.from("helmets").upsert(helmetData, { onConflict: "id" });

      if (error) throw error;
      if (onSave) onSave(); // Déclenche le rechargement de la collection
      setScreen("registry");
    } catch (error) {
      alert((isFr ? "Erreur sauvegarde : " : "Save error: ") + error.message);
    } finally {
      setSaving(false);
      alert(isFr ? "Erreur upload image" : "Image upload error");
      console.error(error);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Sauvegarde dans Supabase
  const handleSave = async () => {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const helmetData = {
        user_id: user.id,
        model: current.model,
        manufacturer: current.manufacturer,
        lot_number: current.lotNumber,
        description: current.description,
        shell_size: current.shellSize,
        liner_size: current.linerSize,
        paint_condition: current.paintCondition,
        liner_condition: current.linerCondition,
        chinstrap_state: current.chinstrapState,
        decals: current.decals,
        expertise_message: getExpertise(current, lang),
        image_url_main: current.images.main,
        image_url_front: current.images.front,
        image_url_left: current.images.left,
        image_url_right: current.images.right,
        image_url_interior: current.images.interior,
      };

      // Ajout de l'id si modification
      if (current.id) helmetData.id = current.id;

      const { error } = await supabase
        .from("helmets")
        .upsert(helmetData, { onConflict: "id" });

      if (error) throw error;

      // Callback pour mise à jour UI locale
      if (onSave)
        onSave({ ...current, expertiseMessage: getExpertise(current, lang) });
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
          {current.id ? (isFr ? "Modification" : "Edit") : (isFr ? "Archivage" : "Archive")}
        </h2>
        <button onClick={() => setScreen("registry")} className="p-2 bg-[#3a3832] rounded-full">
          <X />
        </button>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">{t.labelModel}</label>
            <select className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-black text-[#f0ede0] outline-none" value={current.model} onChange={(e) => setCurrent({ ...current, model: e.target.value })}>
              <option value="">-- {isFr ? "Sélectionner" : "Select"} --</option>
              {MODEL_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label} className="bg-[#2a2822] text-amber-500">
                  {group.options.map((opt) => (
                    <option key={opt} value={opt} className="text-[#f0ede0]">{opt}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">{t.labelDecal}</label>
            <select className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-[#f0ede0] outline-none" value={current.decals} onChange={(e) => setCurrent({ ...current, decals: e.target.value })}>
              <option value="">--</option>
              {DECAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">{t.labelFactory}</label>
            <select className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-amber-500 outline-none" value={current.manufacturer} onChange={(e) => setCurrent({ ...current, manufacturer: e.target.value })}>
              <option value="">--</option>
              {Object.entries(MANUFACTURERS).map(([code, name]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">{t.labelLot}</label>
            <input placeholder="ex: 1234" className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs text-amber-500 font-bold h-[52px] outline-none" value={current.lotNumber} onChange={(e) => setCurrent({ ...current, lotNumber: e.target.value })} />
          </div>
        </div>

        <div className={`p-4 rounded-2xl bg-[#1a1812] border-2 ${validation.color.replace("text", "border")} bg-opacity-10 shadow-inner`}>
          <div className={`flex items-center gap-2 ${validation.color} font-black text-[10px] uppercase tracking-widest`}>
            {validation.icon} Expertise
          </div>
          <p className="text-xs text-[#f0ede0] leading-relaxed italic opacity-90">"{validation.message}"</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">{t.labelSize}</label>
            <select className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs text-white outline-none" value={current.shellSize} onChange={(e) => setCurrent({ ...current, shellSize: e.target.value })}>
              <option value="">--</option>
              {SHELL_SIZES.map((s) => ( <option key={s} value={s}>{s}</option> ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">{isFr ? "Coiffe" : "Liner"}</label>
            <select className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs text-white outline-none" value={current.linerSize} onChange={(e) => setCurrent({ ...current, linerSize: e.target.value })}>
              <option value="">--</option>
              {LINER_SIZES.map((s) => ( <option key={s} value={s}>{s}</option> ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black text-gray-500">{t.labelPaint}</label>
            <select className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs font-bold text-amber-500 outline-none" value={current.paintCondition} onChange={(e) => setCurrent({ ...current, paintCondition: e.target.value })}>
              <option value="">--</option>
              {PAINT_OPTIONS.map((opt) => ( <option key={opt} value={opt}>{opt}</option> ))}
            </select>
          </div>
        </div>

        {/* Zone Upload Photos */}
        <div className="pt-4 space-y-3">
          <UploadRow type="main" label={isFr ? "Principale" : "Main"} current={current} onUpload={handleUpload} uploading={uploading} height="h-32" />
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
              <UploadRow key={v} type={v} label={v} current={current} onUpload={handleUpload} uploading={uploading} />
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

        <textarea rows="4" placeholder={t.labelNote} className="w-full bg-[#1a1812] border-2 border-[#3a3832] p-4 rounded-xl text-xs italic text-[#d0c7a8] outline-none" value={current.description} onChange={(e) => setCurrent({ ...current, description: e.target.value })} />

        <TexturedButton 
          label={saving ? (isFr ? "Sauvegarde..." : "Saving...") : current.id ? (isFr ? "Mettre à jour" : "Update") : t.btnSave} 
          onClick={handleSave} 
          disabled={saving} 
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
const UploadRow = ({ type, label, current, onUpload, uploading, height = "h-16" }) => (
  <label className={`relative flex flex-col items-center justify-center bg-[#1a1812] border-2 border-[#3a3832] border-dashed rounded-xl cursor-pointer overflow-hidden ${height}`}>
    <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(e, type)} />
    {uploading[type] ? (
      <div className="flex flex-col items-center gap-1 opacity-60">
        <Upload size={14} className="animate-bounce" />
        <span className="text-[6px] uppercase font-black">Upload...</span>
      </div>
    ) : current.images[type] ? (
      <img src={current.images[type]} className="w-full h-full object-cover" alt={label} />
    ) : (
      <div className="text-center opacity-20">
        <ImageIcon size={14} className="mx-auto" />
        <span className="text-[6px] uppercase font-black">{label}</span>
      </div>
    ) : current.images[type] ? (
      <img src={current.images[type]} className="w-full h-full object-cover" alt={label} />
    ) : (
      <ImageIcon size={14} />
    )}
  </label>
);